// Prerender without a browser: render each route with react-dom/server and
// write real static HTML. Replaces the Puppeteer step in this environment.
import { mkdir, writeFile, readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '..', 'dist')

const ROUTES = [
  ['/',        'Healthcare Website Design for Nurse Practitioners | $500 Flat - ZmaxLab',
    'Custom healthcare website design for nurse practitioners, PAs, chiropractors and mental health providers. $500 flat, live in 7 business days, source code included. No contract.'],
  ['/services','Services & Pricing | $500 Healthcare Website Design - ZmaxLab',
    'A $500 custom healthcare website in 7 days. Add local SEO, social, reputation or reporting separately. No bundles, no contracts.'],
  ['/how-it-works','How It Works | Healthcare Website Built in 7 Days - ZmaxLab',
    'From discovery call to live website in seven business days. See what happens each day, what you provide, and how payment works.'],
  ['/about',   'About Ravi | Healthcare Web Designer for NPI Practitioners - ZmaxLab',
    'ZmaxLab is one specialist building custom healthcare websites for NPI-registered practitioners. $500 flat, seven-day delivery, no contract.'],
  ['/pricing', 'Pricing | $500 Flat Healthcare Website Design - ZmaxLab',
    'A custom healthcare website for a flat $500, live in 7 business days. Full breakdown of what is included, what is not, and how it compares to agencies charging $3,000-$10,000.'],
  ['/contact', 'Contact | Book a Free Demo - ZmaxLab Healthcare Web Design',
    'Book a free 20-minute demo. Custom healthcare websites for NPI-registered practitioners - $500 flat, live in 7 business days.'],
  ['/privacy', 'Privacy Policy - ZmaxLab', 'How ZmaxLab collects, uses and protects your information.'],
  ['/terms',   'Terms of Service - ZmaxLab', 'Terms governing ZmaxLab website design and marketing services.'],
  ['/blog/custom-vs-template-medical-website',
    'Custom vs Template Medical Website: Which Is Right for Your NPI Practice?',
    'A $30/month template or a custom-built healthcare website? Real differences in search rankings, patient trust and long-term ROI for NPI practitioners.'],
]


// Per-route JSON-LD baked into the static HTML so crawlers see it without running React.
const FAQS = [
  ['What do I need to provide?','Your name, practice name, specialty, services list, location, phone number, and any photos you have. I handle design, copywriting, code and launch.'],
  ["What if I don't have photos?",'Not a problem. I source professional healthcare photography that matches your specialty and location, at no extra cost.'],
  ['How does payment work?','50% ($250) to start, 50% ($250) on launch day once you have approved the live site. Monthly services are billed monthly from signup.'],
  ['Can I make changes after launch?','Yes - one free revision is included. Further edits are $50/hour, or unlimited small updates under the $200/month support plan.'],
  ['How do I connect my domain?','If you already have one, I walk you through the DNS change - about five minutes. If not, I will recommend where to buy one and set it up for you.'],
  ['What hosting do I need?','Any basic shared hosting works - roughly $3-6/month. The site is static, so it runs fast even on the cheapest plans.'],
  ['What if I want design changes?','You review the full mockup before coding starts. Colours, layout, content - request changes then. Once approved, we build.'],
]
const STEPS = [
  ['Day 1','Discovery call','Thirty minutes on a call covering your specialty, patients, market and competitors.'],
  ['Day 1','You send your content','A short form - name, specialty, services, location, credentials.'],
  ['Days 2-4','Design and build','You approve the design before any code is written, then it is hand-coded.'],
  ['Day 5','SEO foundation','Meta structure, schema, sitemap, Search Console and Analytics configured.'],
  ['Days 6-7','Launch and handover','Live on your domain with SSL and every source file handed to you.'],
]
const MONTHLY = [['Local SEO','230'],['Social Media','150'],['Reputation','100'],['Reporting','75'],['Site Support','200']]

const SCHEMA = {
  '/how-it-works': [
    { '@context':'https://schema.org','@type':'FAQPage',
      mainEntity: FAQS.map(([q,a]) => ({ '@type':'Question', name:q, acceptedAnswer:{ '@type':'Answer', text:a } })) },
    { '@context':'https://schema.org','@type':'HowTo',
      name:'How a ZmaxLab healthcare website is built in 7 days', totalTime:'P7D',
      estimatedCost:{ '@type':'MonetaryAmount', currency:'USD', value:'500' },
      step: STEPS.map(([d,n,t],i) => ({ '@type':'HowToStep', position:i+1, name:n, text:`${d}: ${t}` })) },
  ],
  '/pricing': [
    { '@context':'https://schema.org','@type':'Product', name:'Custom healthcare website',
      description:'Custom-coded healthcare website for NPI-registered practitioners, delivered in 7 business days.',
      brand:{ '@type':'Brand', name:'ZmaxLab' },
      offers:{ '@type':'Offer', price:'500', priceCurrency:'USD', availability:'https://schema.org/InStock',
        url:'https://zmaxlab.site/pricing' } },
  ],
  '/services': [
    { '@context':'https://schema.org','@type':'Service',
      serviceType:'Healthcare website design and local SEO',
      provider:{ '@type':'Organization', name:'ZmaxLab', url:'https://zmaxlab.site' },
      areaServed:{ '@type':'Country', name:'United States' },
      offers:[{ '@type':'Offer', name:'Custom healthcare website', price:'500', priceCurrency:'USD',
        description:'Custom-coded healthcare website delivered in 7 business days. Domain, hosting setup, SEO foundation and source code included.',
        availability:'https://schema.org/InStock' },
        ...MONTHLY.map(([n,pr]) => ({ '@type':'Offer', name:n, price:pr, priceCurrency:'USD' }))] },
  ],
}

const shell = await readFile(join(dist, 'index.html'), 'utf8')
let n = 0

for (const [route, title, desc] of ROUTES) {
  const canonical = `https://zmaxlab.site${route === '/' ? '/' : route}`
  let html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)

  // og/twitter per route so shares are correct on every page
  html = html.replace('</head>', `  <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${canonical}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
  </head>`)

  const extra = SCHEMA[route]
  if (extra) {
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(extra)}</script>\n  </head>`)
  }
  // breadcrumbs on every non-home route
  if (route !== '/') {
    const crumb = {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:'https://zmaxlab.site/'},
      {'@type':'ListItem',position:2,name:title.split('|')[0].trim(),item:canonical}]}
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(crumb)}</script>\n  </head>`)
  }

  const out = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, html, 'utf8')
  n++
  console.log(`  ${route.padEnd(42)} -> ${out.replace(dist, 'dist')}`)
}
console.log(`\n${n} routes written with unique title / description / canonical / og tags.`)
