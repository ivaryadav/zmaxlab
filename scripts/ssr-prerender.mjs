import { mkdir, writeFile, readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const R = [
 ['/','Healthcare Website Design for Nurse Practitioners | $500 Flat - ZmaxLab','Custom healthcare website design for nurse practitioners, PAs, chiropractors and mental health providers. $500 flat, live in 7 business days, source code included.'],
 ['/services','Services & Pricing | $500 Healthcare Website Design - ZmaxLab','A $500 custom healthcare website in 7 days. Add local SEO, social, reputation or reporting separately. No bundles, no contracts.'],
 ['/how-it-works','How It Works | Healthcare Website Built in 7 Days - ZmaxLab','From discovery call to live website in seven business days. See what happens each day and how payment works.'],
 ['/about','About Ravi | Healthcare Web Designer for NPI Practitioners - ZmaxLab','One specialist building custom healthcare websites for NPI-registered practitioners. $500 flat, seven-day delivery, no contract.'],
 ['/contact','Contact | Book a Free Demo - ZmaxLab Healthcare Web Design','Book a free 20-minute demo. Custom healthcare websites for NPI-registered practitioners.'],
 ['/privacy','Privacy Policy - ZmaxLab','How ZmaxLab collects, uses and protects your information.'],
 ['/terms','Terms of Service - ZmaxLab','Terms governing ZmaxLab website design and marketing services.'],
 ['/blog/custom-vs-template-medical-website','Custom vs Template Medical Website for NPI Practices - ZmaxLab','A $30/month template or a custom-built healthcare website? Real differences in rankings, patient trust and ROI.'],
]
const shell = await readFile(join(dist,'index.html'),'utf8')
for (const [route,title,desc] of R) {
  const c = `https://zmaxlab.site${route}`
  let h = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${c}" />`)
    .replace('</head>', `  <meta property="og:title" content="${title}" />\n    <meta property="og:description" content="${desc}" />\n    <meta property="og:url" content="${c}" />\n  </head>`)
  const out = route === '/' ? join(dist,'index.html') : join(dist, route.slice(1), 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, h, 'utf8')
  console.log('  ' + route)
}
console.log('prerendered ' + R.length + ' routes')
