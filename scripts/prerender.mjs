import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { mkdir, writeFile, readFile, stat } from 'fs/promises'
import { dirname, join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const PORT = 4173

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml',
}

const ROUTES = [
  '/',
  '/services',
  '/how-it-works',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/blog/custom-vs-template-medical-website',
]

async function staticServer(req, res) {
  let path = decodeURIComponent(req.url.split('?')[0])
  let filePath = join(distDir, path)
  try {
    const s = await stat(filePath)
    if (s.isDirectory()) filePath = join(filePath, 'index.html')
  } catch {
    filePath = join(distDir, 'index.html')
  }
  try {
    const body = await readFile(filePath)
    res.setHeader('Content-Type', MIME[extname(filePath)] || 'application/octet-stream')
    res.end(body)
  } catch {
    res.statusCode = 404
    res.end('Not found')
  }
}

async function main() {
  const server = createServer((req, res) => { staticServer(req, res) })
  await new Promise((resolve) => server.listen(PORT, resolve))

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })

  for (const route of ROUTES) {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('h1', { timeout: 5000 }).catch(() => {})
    const html = await page.content()
    await page.close()

    const outDir = route === '/' ? distDir : join(distDir, route)
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, 'index.html'), html)
    console.log(`Prerendered ${route} -> ${join(outDir, 'index.html').replace(distDir, 'dist')}`)
  }

  await browser.close()
  server.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
