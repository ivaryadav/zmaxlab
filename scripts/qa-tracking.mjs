// Tracking QA: proves every event fires exactly once, with no data sent anywhere.
//
// Builds a QA bundle (debug_mode on, placeholder Ads/Meta IDs), serves it locally and drives it in
// Chrome. Every request to Google Analytics, Google Ads, Meta and Formspree is intercepted, recorded
// and answered locally - nothing reaches the real accounts and no emails are sent.
//
// Usage: CHROME_PATH=... node scripts/qa-tracking.mjs

import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { execSync } from 'child_process'
import { readFile, stat } from 'fs/promises'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'dist-qa')
const PORT = 4174
const BASE = `http://localhost:${PORT}`

console.log('Building QA bundle...')
execSync('npx vite build --outDir dist-qa --emptyOutDir', {
  cwd: root, stdio: 'ignore',
  env: {
    ...process.env,
    VITE_ANALYTICS_DEBUG: 'true',
    VITE_GADS_ID: 'AW-000000000', VITE_GADS_LEAD_LABEL: 'qaLead', VITE_GADS_BOOKING_LABEL: 'qaBooking',
    VITE_META_PIXEL_ID: '1234567890123456', VITE_CLARITY_ID: 'qaclarity',
  },
})

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json' }
const shell = await readFile(join(out, 'index.html'))
const server = createServer(async (req, res) => {
  const file = join(out, decodeURIComponent(req.url.split('?')[0]))
  try { if ((await stat(file)).isFile()) { res.setHeader('Content-Type', MIME[extname(file)] || 'application/octet-stream'); return res.end(await readFile(file)) } } catch { /* SPA */ }
  res.setHeader('Content-Type', 'text/html'); res.end(shell)
})
await new Promise(r => server.listen(PORT, r))

const browser = await puppeteer.launch({ headless: true, executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] })

let hits = []
let formspree = { status: 200, bodies: [] }

function record(url, postData) {
  const u = new URL(url)
  // GA4 hits go to analytics.google.com / *.google-analytics.com (stats.g.doubleclick.net is the Signals ping).
  if ((/google-analytics\.com$/.test(u.hostname) || u.hostname === 'analytics.google.com') && u.pathname === '/g/collect' && new URLSearchParams(u.search).get('tid')?.startsWith('G-')) {
    const lines = postData ? postData.split('\n').filter(Boolean) : ['']
    for (const line of lines) {
      const p = new URLSearchParams(u.search.slice(1) + '&' + line)
      hits.push({ to: 'GA4', name: p.get('en'), eventId: p.get('ep.event_uid'), path: p.get('ep.page_path'), debug: p.get('_dbg') || p.get('ep.debug_mode') })
    }
  } else if (u.hostname.endsWith('facebook.com') && u.pathname === '/tr/') {
    hits.push({ to: 'Meta', name: u.searchParams.get('ev'), eventId: u.searchParams.get('eid') })
  } else if (/\/pagead\/(viewthrough)?conversion\//.test(u.pathname) || /\/pagead\/1p-conversion\//.test(u.pathname)) {
    const label = u.searchParams.get('label')
    // One conversion can produce several requests; count each transaction id (oid) once.
    const oid = u.searchParams.get('oid')
    if (label && !hits.some(h => h.to === 'Ads' && h.name === label && h.eventId === oid)) hits.push({ to: 'Ads', name: label, eventId: oid })
  }
}

async function newPage({ prerender = false } = {}) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  if (prerender) await page.evaluateOnNewDocument(() => { window.__PRERENDER__ = true })
  await page.setRequestInterception(true)
  page.on('request', async r => {
    const url = r.url()
    const host = new URL(url).hostname
    if (host === 'localhost') return r.continue()
    if (host === 'formspree.io') {
      const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type, accept', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }
      if (r.method() === 'OPTIONS') return r.respond({ status: 204, headers: cors, body: '' })
      formspree.bodies.push(JSON.parse(r.postData() || '{}'))
      return r.respond({ status: formspree.status, contentType: 'application/json', headers: cors, body: JSON.stringify(formspree.status === 200 ? { ok: true } : { error: 'fail' }) })
    }
    // Let the tag libraries load so they run for real; record + swallow every beacon they send.
    if (/googletagmanager\.com$|connect\.facebook\.net$/.test(host)) return r.continue()
    record(url, r.postData())
    return r.respond({ status: 204, body: '' })
  })
  return page
}

const count = (to, name) => hits.filter(h => h.to === to && h.name === name).length
const settle = ms => new Promise(r => setTimeout(r, ms))
const results = []
function check(label, actual, expected) {
  const pass = actual === expected
  results.push({ label, actual, expected, pass })
}

// 1. Load, gtag once, one page_view
let page = await newPage()
await page.goto(`${BASE}/?utm_source=google&utm_medium=cpc&utm_campaign=qa&gclid=QA-GCLID-123`, { waitUntil: 'networkidle0' })
await settle(4000)
check('GA4 gtag.js loaded once', await page.$$eval('script[src*="gtag/js?id=G-"]', s => s.length), 1)
check('page_view on first load (/)', count('GA4', 'page_view'), 1)
check('Meta PageView on first load', count('Meta', 'PageView'), 1)
check('debug_mode present on GA4 hits', hits.filter(h => h.to === 'GA4').every(h => h.debug) ? 1 : 0, 1)
check('attribution stored (utm_source + gclid)', await page.evaluate(() => { const a = JSON.parse(localStorage.getItem('zx_attribution') || '{}').data || {}; return a.utm_source === 'google' && a.gclid === 'QA-GCLID-123' ? 1 : 0 }), 1)

// 2. Client-side navigation: exactly one page_view per route change
hits = []
await page.click('a[href="/services"]')
await settle(2500)
check('page_view after navigating to /services', count('GA4', 'page_view'), 1)
check('Meta PageView after navigation', count('Meta', 'PageView'), 1)

// 3. Hero form success, with a double submit
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' }); await settle(3000)
hits = []; formspree = { status: 200, bodies: [] }
await page.type('#intake input[autocomplete="name"]', 'QA Test Lead')
await page.type('#intake input[type="tel"]', '5550102233')
await page.evaluate(() => { const b = document.querySelector('#intake button[type="submit"]'); b.click(); b.click() })
await settle(7000)
const ga = hits.filter(h => h.to === 'GA4' && h.name === 'generate_lead')
const meta = hits.filter(h => h.to === 'Meta' && h.name === 'Lead')
const ads = hits.filter(h => h.to === 'Ads' && h.name === 'qaLead')
check('Formspree requests for one form (double click)', formspree.bodies.length, 1)
check('GA4 generate_lead after success', ga.length, 1)
check('Meta Lead after success', meta.length, 1)
check('Google Ads lead conversion after success', ads.length, 1)
check('shared event_id GA4 = Meta', ga[0] && meta[0] && ga[0].eventId === meta[0].eventId ? 1 : 0, 1)
check('shared event_id GA4 = Ads transaction_id', ga[0] && ads[0] && ga[0].eventId === ads[0].eventId ? 1 : 0, 1)
const body = formspree.bodies[0] || {}
check('hidden fields sent (utm_source, gclid, landing_page)', body.utm_source === 'google' && body.gclid === 'QA-GCLID-123' && body.landing_page ? 1 : 0, 1)
check('form_submit / qualify_lead sent', count('GA4', 'form_submit') + count('GA4', 'qualify_lead') + count('GA4', 'close_convert_lead'), 0)

// 4. Contact form failure: no conversion
await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle0' }); await settle(2500)
hits = []; formspree = { status: 500, bodies: [] }
await page.evaluate(() => {
  const setVal = (el, v) => {
    const proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v)
    el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }))
  }
  const form = document.querySelector('main form')
  form.querySelectorAll('input').forEach(i => { if (i.type === 'email') setVal(i, 'qa@example.com'); else if (['text', '', 'tel'].includes(i.type)) setVal(i, 'QA Fail') })
  form.querySelectorAll('select').forEach(sel => setVal(sel, sel.options[1].value))
  form.querySelectorAll('textarea').forEach(t => setVal(t, 'QA failure-path test'))
})
await page.evaluate(() => document.querySelector('main form button[type="submit"]').click())
await settle(3000)
check('Formspree called on failure test', formspree.bodies.length >= 1 ? 1 : 0, 1)
check('generate_lead when Formspree fails', count('GA4', 'generate_lead') + count('Meta', 'Lead'), 0)

// 5. Calendly booking: same booking message twice -> one conversion
hits = []
await page.evaluate(() => {
  const msg = { event: 'calendly.event_scheduled', payload: { event: { uri: 'https://api.calendly.com/scheduled_events/QA' } } }
  for (let i = 0; i < 2; i++) window.dispatchEvent(new MessageEvent('message', { origin: 'https://calendly.com', data: msg }))
  window.dispatchEvent(new MessageEvent('message', { origin: 'https://evil.example', data: msg }))
})
await settle(2500)
check('GA4 book_demo (2 messages + 1 spoofed origin)', count('GA4', 'book_demo'), 1)
check('Meta Schedule', count('Meta', 'Schedule'), 1)
check('Google Ads booking conversion', count('Ads', 'qaBooking'), 1)

// 6. WhatsApp click (delegated listener) + CTA click
hits = []
await page.evaluate(() => {
  const a = document.createElement('a'); a.href = 'https://wa.me/919451100556'; a.textContent = 'WhatsApp'; a.target = '_blank'
  a.addEventListener('click', e => e.preventDefault()); document.body.appendChild(a); a.click()
})
await settle(6000)
check('GA4 whatsapp_click', count('GA4', 'whatsapp_click'), 1)
check('Meta Contact', count('Meta', 'Contact'), 1)
hits = []
await page.evaluate(() => { const el = document.querySelector('[data-cta]'); el.addEventListener('click', e => e.preventDefault(), { once: true }); el.click() })
await settle(6000)
check('GA4 cta_click', count('GA4', 'cta_click'), 1)
await page.close()

// 7. Prerender mode: nothing loads, nothing is sent
hits = []
page = await newPage({ prerender: true })
await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle0' }); await settle(2000)
check('hits sent while prerendering', hits.length, 0)
check('gtag.js loaded while prerendering', await page.$$eval('script[src*="googletagmanager"]', s => s.length), 0)

await browser.close(); server.close()

let failed = 0
for (const r of results) {
  if (!r.pass) failed++
  console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.label.padEnd(52)} got ${r.actual}, expected ${r.expected}`)
}
console.log(failed ? `\n${failed} check(s) failed` : `\nAll ${results.length} checks passed`)
process.exit(failed ? 1 : 0)
