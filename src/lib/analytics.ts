// All site tracking lives here: GA4, Google Ads, Meta Pixel and Microsoft Clarity.
//
// Rules this module enforces:
// - Tags load exactly once (guarded by `initialised`), never during prerendering.
// - Page views are sent manually on route change only (GA4 history tracking is OFF in the property).
// - Every conversion gets ONE event_id shared by GA4, Meta (eventID) and Google Ads (transaction_id),
//   and can fire at most once per id (guarded by `fired`), regardless of re-renders or double effects.
//   GA4 receives it as `event_uid`: gtag reserves and silently drops a parameter named `event_id`.

import { captureAttribution } from './attribution'

const env = import.meta.env
const GA4_ID = env.VITE_GA4_ID || ''
const GADS_ID = env.VITE_GADS_ID || ''
const GADS_LEAD_LABEL = env.VITE_GADS_LEAD_LABEL || ''
const GADS_BOOKING_LABEL = env.VITE_GADS_BOOKING_LABEL || ''
const META_PIXEL_ID = env.VITE_META_PIXEL_ID || ''
const CLARITY_ID = env.VITE_CLARITY_ID || ''
const DEBUG = env.VITE_ANALYTICS_DEBUG === 'true'

// EEA + UK + CH default to denied ad/analytics storage (no consent banner on this US-focused site).
const CONSENT_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT',
  'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
]

type Params = Record<string, string | number | boolean | undefined>

let initialised = false
let lastPagePath = ''
const fired = new Set<string>()

const canTrack = () => typeof window !== 'undefined' && !window.__PRERENDER__

/** Returns true the first time a key is seen, false on every repeat. */
function once(key: string) {
  if (fired.has(key)) return false
  fired.add(key)
  return true
}

export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function gtag(...args: unknown[]) {
  if (typeof window.gtag === 'function') window.gtag(...args)
}
function fbq(...args: unknown[]) {
  if (typeof window.fbq === 'function') window.fbq(...args)
}
function clean(p: Params) {
  return Object.fromEntries(Object.entries(p).filter(([, v]) => v !== undefined && v !== ''))
}

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

/** Runs after the page has loaded and the main thread is idle, so trackers never compete with first paint. */
function afterLoad(fn: () => void) {
  const run = () => ('requestIdleCallback' in window ? window.requestIdleCallback(fn, { timeout: 4000 }) : setTimeout(fn, 1500))
  if (document.readyState === 'complete') run()
  else window.addEventListener('load', run, { once: true })
}

function initGoogle() {
  const tagId = GA4_ID || GADS_ID
  if (!tagId) return
  window.dataLayer = window.dataLayer || []
  // gtag must push the real `arguments` object, not an array.
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  const granted = { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' }
  const denied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' }
  gtag('consent', 'default', granted)
  gtag('consent', 'default', { ...denied, region: CONSENT_REGIONS, wait_for_update: 500 })
  gtag('js', new Date())
  if (GA4_ID) gtag('config', GA4_ID, clean({ send_page_view: false, debug_mode: DEBUG || undefined }))
  if (GADS_ID) gtag('config', GADS_ID, { allow_enhanced_conversions: true })
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${tagId}`)
}

function initMeta() {
  if (!META_PIXEL_ID || window.fbq) return
  // Standard Meta Pixel bootstrap (queues calls until fbevents.js loads).
  const n = function (...args: unknown[]) {
    if (n.callMethod) (n.callMethod as (...a: unknown[]) => void)(...args)
    else (n.queue as unknown[]).push(args)
  } as NonNullable<Window['fbq']>
  n.push = n
  n.loaded = true
  n.version = '2.0'
  n.queue = []
  window.fbq = n
  window._fbq = n
  loadScript('https://connect.facebook.net/en_US/fbevents.js')
  fbq('init', META_PIXEL_ID)
  fbq('track', 'PageView')
}

function initClarity() {
  if (!CLARITY_ID || window.clarity) return
  const c = function (...args: unknown[]) { (c.q = c.q || []).push(args) } as NonNullable<Window['clarity']>
  window.clarity = c
  loadScript(`https://www.clarity.ms/tag/${CLARITY_ID}`)
}

/** Load every tag exactly once. Safe to call repeatedly (StrictMode, HMR, remounts). */
export function initAnalytics() {
  if (initialised || !canTrack()) return
  initialised = true
  captureAttribution()
  initGoogle()
  afterLoad(() => { initMeta(); initClarity() })
  installListeners()
}

// ── Page views ────────────────────────────────────────────────────────────────

/** Manual SPA page view. Skips repeats of the same path (re-renders, StrictMode double effects). */
export function trackPageView(path: string) {
  if (!canTrack() || path === lastPagePath) return
  const isFirst = lastPagePath === ''
  lastPagePath = path
  // Next task, so this page's <title> is committed. (Not requestAnimationFrame: it is paused in background tabs.)
  setTimeout(() => {
    gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
    if (!isFirst) fbq('track', 'PageView') // first PageView is sent by initMeta()
  }, 0)
}

// ── Conversions ──────────────────────────────────────────────────────────────

async function sha256(value: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

/** Enhanced conversions: normalised + SHA-256 hashed email / phone, set before the Ads conversion fires. */
async function setUserData(email?: string, phone?: string) {
  if (!GADS_ID || !crypto?.subtle) return
  const data: Record<string, string> = {}
  if (email) data.sha256_email_address = await sha256(email.trim().toLowerCase())
  if (phone) {
    const e164 = '+' + phone.replace(/\D/g, '')
    if (e164.length > 7) data.sha256_phone_number = await sha256(e164)
  }
  if (Object.keys(data).length) gtag('set', 'user_data', data)
}

export type LeadInfo = { eventId: string; formId: string; email?: string; phone?: string; specialty?: string }

/**
 * Successful form submission. Call ONLY after the form provider responded OK.
 * GA4 generate_lead + Meta Lead + Google Ads conversion, all sharing `eventId`.
 */
export async function trackLead({ eventId, formId, email, phone, specialty }: LeadInfo) {
  if (!canTrack() || !once(`lead:${eventId}`)) return
  gtag('event', 'generate_lead', clean({ event_uid: eventId, form_id: formId, specialty, page_path: window.location.pathname }))
  fbq('track', 'Lead', clean({ content_name: formId }), { eventID: eventId })
  if (GADS_ID && GADS_LEAD_LABEL) {
    await setUserData(email, phone)
    gtag('event', 'conversion', { send_to: `${GADS_ID}/${GADS_LEAD_LABEL}`, transaction_id: eventId })
  }
}

/** Calendly booking confirmed. `bookingKey` is Calendly's event URI, so one booking = one conversion. */
export function trackBooking(bookingKey: string) {
  if (!canTrack() || !once(`booking:${bookingKey}`)) return
  const eventId = newEventId()
  gtag('event', 'book_demo', { event_uid: eventId, page_path: window.location.pathname })
  fbq('track', 'Schedule', {}, { eventID: eventId })
  if (GADS_ID && GADS_BOOKING_LABEL) gtag('event', 'conversion', { send_to: `${GADS_ID}/${GADS_BOOKING_LABEL}`, transaction_id: eventId })
}

export function trackWhatsAppClick() {
  if (!canTrack()) return
  const eventId = newEventId()
  gtag('event', 'whatsapp_click', { event_uid: eventId, page_path: window.location.pathname })
  fbq('track', 'Contact', {}, { eventID: eventId })
}

export function trackCtaClick(ctaText: string) {
  if (!canTrack()) return
  gtag('event', 'cta_click', { cta_text: ctaText.slice(0, 100), page_path: window.location.pathname })
}

/** First interaction with a form (once per form per page load). */
export function trackFormStart(formId: string) {
  if (!canTrack() || !once(`form_start:${formId}:${window.location.pathname}`)) return
  gtag('event', 'form_start', { form_id: formId, page_path: window.location.pathname })
}

export function trackPopupShown(formId: string) {
  if (!canTrack() || !once(`popup_shown:${formId}`)) return
  gtag('event', 'popup_shown', { form_id: formId, page_path: window.location.pathname })
}

// ── Delegated listeners (one each, installed once) ───────────────────────────

function installListeners() {
  document.addEventListener('click', e => {
    const target = e.target as Element | null
    if (!target?.closest) return
    if (target.closest('a[href*="wa.me"]')) trackWhatsAppClick()
    const cta = target.closest<HTMLElement>('[data-cta]')
    if (cta) trackCtaClick(cta.dataset.cta || cta.textContent?.trim() || 'cta')
  }, { capture: true })

  window.addEventListener('message', e => {
    if (typeof e.origin !== 'string' || !/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin)) return
    const data = e.data as { event?: string; payload?: { event?: { uri?: string }; invitee?: { uri?: string } } } | null
    if (data?.event !== 'calendly.event_scheduled') return
    trackBooking(data.payload?.event?.uri || data.payload?.invitee?.uri || newEventId())
  })
}
