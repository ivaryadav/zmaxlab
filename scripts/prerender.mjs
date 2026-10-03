// Build step: turn the Vite SPA into static HTML per route, plus sitemap.xml, robots.txt,
// a real 404.html and a 1200x630 Open Graph image per page.
//
// Tracking safety: every request to a third-party host is aborted and window.__PRERENDER__
// is set before any page script runs, so building the site never sends analytics hits.

import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { execFileSync } from 'child_process'
import { mkdir, writeFile, readFile, stat } from 'fs/promises'
import { dirname, join, extname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const manifest = JSON.parse(await readFile(join(root, 'src/routes.json'), 'utf8'))
const SITE = manifest.siteUrl
const PORT = 4173
const NOT_FOUND_PROBE = '/__prerender-not-found__'

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.txt': 'text/plain',
  '.xml': 'application/xml', '.mp4': 'video/mp4',
}

// The untouched Vite shell is served for every route while prerendering.
const shell = await readFile(join(distDir, 'index.html'), 'utf8')

async function serve(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*') // fonts for the OG image template
  const path = decodeURIComponent(req.url.split('?')[0])
  const file = join(distDir, path)
  try {
    const s = await stat(file)
    if (s.isFile()) {
      res.setHeader('Content-Type', MIME[extname(file)] || 'application/octet-stream')
      return res.end(await readFile(file))
    }
  } catch { /* not a file - fall through to the SPA shell */ }
  res.setHeader('Content-Type', 'text/html')
  res.end(shell)
}

function lastModified(source) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', source], { cwd: root, encoding: 'utf8' }).trim()
    if (d) return d
  } catch { /* not a git checkout */ }
  return new Date().toISOString().slice(0, 10)
}

const escapeXml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const ogSlug = p => (p === '/' ? 'home' : p.replace(/^\/+|\/+$/g, '').replace(/\//g, '-'))

function ogTemplate(title, kicker) {
  const [main, brand] = title.split(' | ')
  return `<!doctype html><html><head><style>
    @font-face{font-family:Newsreader;src:url(http://localhost:${PORT}/fonts/newsreader.woff2)}
    @font-face{font-family:Newsreader;font-style:italic;src:url(http://localhost:${PORT}/fonts/newsreader-italic.woff2)}
    @font-face{font-family:Geist;src:url(http://localhost:${PORT}/fonts/geist.woff2)}
    @font-face{font-family:'Geist Mono';src:url(http://localhost:${PORT}/fonts/geist-mono.woff2)}
    *{margin:0;box-sizing:border-box}
    body{width:1200px;height:630px;background:#0D1A22;color:#fff;font-family:Geist,sans-serif;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
    body:after{content:'';position:absolute;right:-160px;top:-160px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(143,224,204,.18),transparent 65%)}
    .k{font-family:'Geist Mono',monospace;font-size:22px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.55)}
    h1{font-family:Newsreader,serif;font-weight:400;font-size:${main.length > 44 ? 62 : 74}px;line-height:1.04;letter-spacing:-.02em;max-width:980px}
    h1 em{color:#8FE0CC}
    .f{display:flex;justify-content:space-between;align-items:flex-end;font-size:24px;color:rgba(255,255,255,.7)}
    .b{font-family:Newsreader,serif;font-size:40px;color:#fff}.b i{color:#8FE0CC}
  </style></head><body>
    <div class="k">${escapeXml(kicker)}</div>
    <h1>${escapeXml(main)}</h1>
    <div class="f"><div class="b">Zmax<i>Lab</i></div><div>Custom healthcare websites · $500 flat · Live in 7 days</div></div>
  </body></html>`
}

async function main() {
  const server = createServer((req, res) => { serve(req, res) })
  await new Promise(r => server.listen(PORT, r))

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  async function render(path) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 900 })
    await page.evaluateOnNewDocument(() => { window.__PRERENDER__ = true })
    await page.setRequestInterception(true)
    page.on('request', r => (new URL(r.url()).hostname === 'localhost' ? r.continue() : r.abort()))
    await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('h1', { timeout: 10000 })
    // react-helmet-async writes the head asynchronously; wait for its tags.
    await page.waitForSelector('meta[name="description"]', { timeout: 10000 })
    const html = '<!doctype html>\n' + await page.evaluate(() => document.documentElement.outerHTML)
    const title = await page.title()
    await page.close()
    return { html, title }
  }

  const sitemap = []
  for (const r of manifest.routes) {
    const { html, title } = await render(r.path)
    const out = r.path === '/' ? join(distDir, 'index.html') : join(distDir, r.path.slice(1), 'index.html')
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, html)
    console.log(`Prerendered ${r.path.padEnd(42)} ${title}`)

    // Open Graph image
    const og = await browser.newPage()
    await og.setViewport({ width: 1200, height: 630 })
    await og.setContent(ogTemplate(title, r.path === '/' ? 'ZmaxLab' : r.crumb), { waitUntil: 'networkidle0' })
    await mkdir(join(distDir, 'og'), { recursive: true })
    await og.screenshot({ path: join(distDir, 'og', `${ogSlug(r.path)}.png`) })
    await og.close()

    if (!r.noindex) sitemap.push({ loc: SITE + r.path, lastmod: lastModified(r.source), changefreq: r.changefreq, priority: r.priority })
  }

  // Real 404 page (served by nginx with a 404 status for unknown URLs)
  const nf = await render(NOT_FOUND_PROBE)
  await writeFile(join(distDir, '404.html'), nf.html)
  console.log('Prerendered 404.html')

  await writeFile(join(distDir, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemap.map(u => `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n') +
    '\n</urlset>\n')
  await writeFile(join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
  console.log(`sitemap.xml (${sitemap.length} URLs), robots.txt written`)

  await browser.close()
  server.close()
}

main().catch(err => { console.error(err); process.exit(1) })
