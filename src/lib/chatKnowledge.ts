// Rule-based knowledge engine for the site chat assistant. No network call, no
// API key — everything it knows is hand-mirrored from the page content below,
// so answers are instant and never drift from what the site actually says.

export interface ChatLink {
  label: string
  to?: string     // internal route (react-router)
  href?: string   // external url (opens in new tab)
}

export interface KBEntry {
  id: string
  keywords: string[]
  answer: string
  chips?: string[]
  link?: ChatLink
  cta?: boolean   // show the inline "send my details to Ravi" lead card under this answer
}

import { CALENDLY_URL } from '@/lib/theme'
export { CALENDLY_URL }

export const BOT_NAME = 'Max'

export const GREETING_TEXT =
  "I'm Max. I save you time and get you exactly what you're looking for."

export const INITIAL_CHIPS = ['Get my quote', "What's it cost?", 'See your clients', 'Talk to Ravi']

const KB: KBEntry[] = [
  {
    id: 'pricing_overview',
    keywords: ['price', 'pricing', 'cost', 'how much', 'expensive', 'flat fee', '$500', '500 dollars', 'what do you charge'],
    answer: '$500 flat. Full build, live in 7 days. Half now, half at launch. No retainer, no upsell calls.',
    chips: ["What's included?", "What's NOT included?", 'Get my quote'],
    link: { label: 'Full pricing breakdown', to: '/pricing' },
  },
  {
    id: 'pricing_included',
    keywords: ['whats included', 'what is included', 'what do i get', 'included in the price', 'included in 500', 'comes with', 'features included'],
    answer: "You get: custom-coded design (no themes, no builder), up to 6 pages, a fast static build, domain and hosting setup with SSL (on accounts in your name), a mobile-first build, your NPI/licence/specialty worked into the page, online booking wired up, HIPAA-aware forms, the SEO basics (meta, schema, sitemap, Search Console, GA4), copy written for every page, one free revision, and the full source code — yours to keep.",
    link: { label: 'See it all on Pricing', to: '/pricing' },
  },
  {
    id: 'pricing_not_included',
    keywords: ['not included', 'whats not included', 'what is not included', 'hidden fees', 'extra cost', 'additional cost', 'excluded'],
    answer: "A few things stay outside the $500, on purpose: your own hosting plan (~$3-6/mo, paid straight to your host — no markup) and domain (~$12-15/yr, in your name), ongoing SEO or content (priced separately if you want it), a logo if you don't already have one, and anything like a patient portal — that's a different kind of project entirely.",
  },
  {
    id: 'payment_terms',
    keywords: ['payment plan', 'how do i pay', 'deposit', 'half now', 'when do i pay', 'pay in installments', 'pay upfront', 'how does payment work'],
    answer: "$250 to start, $250 on launch day — after you've seen and approved the live site, not before. Walk away at the mockup stage and you're only out the first half. Monthly add-ons, if you pick any, bill from signup and cancel whenever.",
  },
  {
    id: 'refund_guarantee',
    keywords: ['refund', 'money back', 'guarantee', 'late', 'not on time', '7 days late', 'risk', 'what if it is late'],
    answer: "Not live in 7 business days? Full refund, no conditions attached. And you sign off on the design before a single line gets coded, so there's no unwanted-design version of this risk either.",
    chips: ['Do I own the site?', 'What do I need to provide?'],
  },
  {
    id: 'ownership',
    keywords: ['own the code', 'own my site', 'source code', 'who owns', 'ownership', 'leave later', 'switch provider', 'do i own'],
    answer: "All of it. Source code, domain, hosting account — every piece is registered to you. Nothing here locks you in.",
  },
  {
    id: 'process_timeline',
    keywords: ['how does it work', 'the process', 'timeline', 'how long does it take', '7 days', 'seven days', 'steps involved', 'day by day', 'what happens each day'],
    answer: 'Day 1: call, plus your content. Days 2-4: build — you approve the mockup first. Day 5: SEO. Days 6-7: live, code handed over. Seven days. Done.',
    link: { label: 'The full 7-day breakdown', to: '/how-it-works' },
  },
  {
    id: 'what_you_provide',
    keywords: ['what do i need to provide', 'what do i need to send', 'what do you need from me', 'content needed', 'do i need photos', 'what info do you need'],
    answer: "Not much: name, practice name, specialty, services, location, phone number, NPI/licence. About 15 minutes on a form. No photos on hand? I'll source ones that fit your specialty, no extra charge.",
  },
  {
    id: 'revisions_changes',
    keywords: ['revision', 'changes after launch', 'edit my site', 'update content', 'change design', 'can i make changes'],
    answer: "One revision's included after launch, free. Past that it's $50/hr, or unlimited small edits on the $200/mo support plan. Before launch, changes cost nothing at all — that's what the mockup review is for.",
  },
  {
    id: 'domain_hosting',
    keywords: ['domain', 'hosting', 'dns', 'buy a domain', 'which host', 'ssl', 'connect my domain'],
    answer: "Already have a domain? Five-minute DNS change, and I walk you through it. Starting from scratch? I'll help you pick one, you register it in your name, and I set it all up. Hosting's any basic shared plan, $3-6/mo — the site's static, so it stays fast even on the cheap stuff.",
  },
  {
    id: 'monthly_addons',
    keywords: ['local seo', 'social media package', 'reputation management', 'monthly reporting', 'site support plan', 'monthly service', 'ongoing service', 'recurring cost'],
    answer: "Local SEO $230/mo, Social Media $150/mo, Reputation $100/mo, Reporting $75/mo, Site Support $200/mo. Pick none, pick one, cancel any month — nothing's bundled in.",
    link: { label: 'All optional services', to: '/services' },
  },
  {
    id: 'onetime_addons',
    keywords: ['google business profile', 'npi directory', 'hipaa intake form', 'telehealth page', 'blog content starter', 'appointment reminder', 'one time addon', 'one-time add-on'],
    answer: 'Google Business Profile setup $150, NPI directory listings across 7 sites $75, HIPAA intake forms $100, a telehealth page $100, a 3-post blog starter $150, appointment reminders $75.',
  },
  {
    id: 'seo_details',
    keywords: ['ranking', 'google ranking', 'how do i rank', 'local search', 'maps pack', 'seo foundation', 'search engine optimization'],
    answer: "Every build ships with the SEO groundwork done right at launch — meta, schema, sitemap, Search Console, GA4. Want someone actively pushing rankings after that? Local SEO's $230/mo: keywords, Maps optimisation, citations, a monthly report.",
  },
  {
    id: 'num_pages',
    keywords: ['how many pages', 'pages included', 'extra pages', 'more than 6 pages', 'patient portal'],
    answer: "Six pages, standard: home, about, services, contact, plus two more of your choice. Need more than that, or something bigger like a portal? Get on a call and I'll tell you straight whether $500 covers it or not.",
  },
  {
    id: 'who_its_for',
    keywords: ['who is this for', 'npi', 'nurse practitioner', 'physician assistant', 'chiropractor', 'dentist', 'therapist', 'psychiatric', 'functional medicine', 'my specialty'],
    answer: "NPI-registered practitioners across the US — nurse practitioners, PAs, mental health therapists, chiropractors, dentists, physical/occupational therapists, psychiatric NPs, functional medicine MDs, LCSWs, that world. Not restaurants, not online stores. Healthcare, specifically.",
  },
  {
    id: 'redesign_existing_site',
    keywords: ['redesign', 'already have a website', 'existing website', 'revamp my site', 'update my old site', 'rebuild my website', 'i have a site already'],
    answer: "Redesigns are just as common as new builds here — same $500, same 7 days, same process. I'll keep anything on your current site worth keeping and rebuild the rest properly.",
  },
  {
    id: 'rush_timeline',
    keywords: ['faster than 7 days', 'rush', 'urgent', 'need it asap', 'sooner than a week', 'expedite', 'how fast can you'],
    answer: "Seven business days is already the fast lane for something hand-coded. I won't rush a build for a fee — that's usually where quality slips. Genuine deadline? Say so on the call and I'll give you a straight answer.",
  },
  {
    id: 'outside_usa',
    keywords: ['outside the us', 'international client', 'based in canada', 'based in uk', 'non us practitioner', 'outside america'],
    answer: "This is built specifically around US NPI-registered practitioners — licensing, directories and forms are tuned for that. Outside the US, it's probably not the right fit, and I'd rather tell you that now than after you've booked a call.",
  },
  {
    id: 'not_healthcare',
    keywords: ['restaurant website', 'e commerce store', 'online store', 'real estate website', 'law firm website', 'non healthcare business'],
    answer: "Healthcare only, on purpose. Restaurants, e-commerce, law firms — different playbook, different pricing logic. Not something I take on here.",
  },
  {
    id: 'multi_location',
    keywords: ['multiple locations', 'multi location', 'several clinics', 'more than one office', 'franchise practice'],
    answer: "Doable — Doral Health runs six locations on one consistent site, and United Gastroenterologists spans 80 across four counties. Scope (and price) moves past the standard 6-page build for something that size, so that's a call, not a quick answer.",
  },
  {
    id: 'accessibility',
    keywords: ['ada compliant', 'accessibility', 'screen reader', 'wcag'],
    answer: "Solid semantic HTML and accessible markup is standard on every build — proper headings, alt text, keyboard navigation. A full WCAG audit isn't part of the $500, but flag it on the call if it's a hard requirement for you.",
  },
  {
    id: 'about_ravi',
    keywords: ['who is ravi', 'who builds this', 'one person', 'agency or freelancer', 'who is behind zmaxlab', 'founder', 'who runs zmaxlab'],
    answer: 'One person: me. I design it, write it, code it, ship it. No account manager, no junior dev learning on your dime. That\'s why it\'s $500 and a week instead of $5,000 and a quarter.',
    link: { label: 'More about Ravi', to: '/about' },
  },
  {
    id: 'why_custom_vs_template',
    keywords: ['template', 'wordpress', 'wix', 'squarespace', 'page builder', 'why not use wix', 'difference between custom and template', 'custom vs template'],
    answer: "A $29/mo template loads in 3-6 seconds; hand-coded loads in under one. Templates reuse one meta title everywhere — I write one per page. And a template never actually becomes yours; you rent it, forever. Once a ZmaxLab site's live, it's $0/mo in software cost, and you own it outright.",
    link: { label: 'Read the full comparison', to: '/blog/custom-vs-template-medical-website' },
  },
  {
    id: 'clients_portfolio',
    keywords: ['clients', 'examples', 'portfolio', 'case studies', 'who have you built for', 'see your work', 'proof', 'previous work', 'past clients'],
    answer: "97+ practices, 20+ states — everything from a two-doctor Manhattan OB/GYN clinic to a 250-provider gastroenterology group across four counties. Hudson Medical, Manhattan Cardiology, United Gastroenterologists — real, live sites, not mockups.",
    link: { label: 'See real client sites', to: '/clients' },
  },
  {
    id: 'market_comparison',
    keywords: ['agency price', 'how much do agencies charge', 'competitor price', 'vs agency', 'market comparison', 'compared to competitors'],
    answer: 'Agencies typically run $3,000-$10,000, usually a retainer over 8-12 weeks. The closest NP-focused competitor is $1,097.50. ZmaxLab is $500, once — about half that competitor and a fraction of agency pricing.',
  },
  {
    id: 'hipaa_compliance',
    keywords: ['hipaa', 'compliant', 'patient data', 'privacy of forms', 'secure forms', 'is it compliant'],
    answer: "Forms submit straight to your inbox or EHR — not logged by some third-party SaaS in between. Need a dedicated HIPAA intake form specifically? That's a $100 add-on.",
  },
  {
    id: 'pay_invoice',
    keywords: ['pay invoice', 'pay now', 'make a payment', 'pay online', 'pay deposit online', 'i need to pay'],
    answer: 'You can pay a deposit, balance, or a monthly service right online — Razorpay handles it, international cards work fine.',
    link: { label: 'Go to Pay Now', to: '/pay-now' },
  },
  {
    id: 'book_demo',
    keywords: ['book a call', 'book a demo', 'schedule a call', 'free demo', 'consultation', 'get started', 'i want to start'],
    answer: "Free. 20 minutes. You'll see a live mockup for your specialty and get a straight answer on fit.",
    link: { label: 'Book a free demo', href: CALENDLY_URL },
  },
  {
    id: 'ai_addon',
    keywords: ['ai addon', 'ai add on', 'ai chatbot for my site', 'automated replies', 'automatic quotation', 'auto quote', 'payment gateway', 'logo design', 'digital letterhead', 'smart website features', 'ai for my clinic'],
    answer: "That's the AI Add-on — a chat assistant like me on your own site, automated reply handling, an instant quote tool for your visitors, payment gateway setup, plus a logo and a digital letterhead for sending reports. Bolted onto a new build or an existing site.",
    link: { label: 'See the AI Add-on', to: '/ai-addon' },
  },
  {
    id: 'is_this_ai',
    keywords: ['are you a real person', 'are you ai', 'are you a bot', 'are you human', 'are you chatgpt', 'is this a bot'],
    answer: "I'm Max — built to answer fast, straight from this site. Not human. Ravi is, and he's one message away.",
    cta: true,
  },
  {
    id: 'contact_info',
    keywords: ['contact', 'email address', 'email ravi', 'reach ravi', 'get in touch', 'phone number for ravi'],
    answer: 'Use the contact page — Ravi reads every message personally, one business day turnaround. Or leave your details below and I\'ll get them to him now.',
    cta: true,
  },
  {
    id: 'connect_ravi',
    keywords: ['talk to ravi', 'human', 'real person', 'speak to someone', 'connect me', 'not a bot', 'talk to a person', 'i want to talk to ravi'],
    answer: 'Done. Drop your details below — Ravi reaches out directly, one business day turnaround.',
    cta: true,
  },
]

const GREETING_RE = /^(hi|hey|hello|yo|sup|howdy|good\s?(morning|afternoon|evening))\b/
const THANKS_RE = /\b(thanks|thank you|thx|cheers|appreciate it)\b/
const BYE_RE = /\b(bye|goodbye|see ya|see you|later|that'?s all)\b/
export const QUOTE_TRIGGER_RE = /\b(quote|estimate|ballpark|proposal)\b/i

const GREETING_REPLY: KBEntry = { id: 'greeting', keywords: [], answer: GREETING_TEXT, chips: INITIAL_CHIPS }
const THANKS_REPLY: KBEntry = { id: 'thanks', keywords: [], answer: "Anytime. What else can I get you?" }
const BYE_REPLY: KBEntry = { id: 'bye', keywords: [], answer: "Talk soon. I'll be here when you're ready to move." }

export const FALLBACK_REPLY: KBEntry = {
  id: 'fallback',
  keywords: [],
  answer: "Not sure I've got that one. Pick a lane below, or I'll connect you with Ravi right now — he covers whatever I can't.",
  chips: INITIAL_CHIPS,
  cta: true,
}

const STOPWORDS = new Set([
  'the', 'and', 'for', 'are', 'you', 'your', 'with', 'that', 'this', 'have', 'does', 'what',
  'how', 'can', 'will', 'who', 'why', 'when', 'about', 'into', 'from', 'not', 'but', 'all',
  'any', 'out', 'get', 'got', 'also', 'like', 'just', 'more', 'than', 'much', 'ZmaxLab',
])

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s$%]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(input: string): string[] {
  return normalize(input).split(' ').filter(w => w.length > 2 && !STOPWORDS.has(w))
}

const TOKEN_INDEX: Map<string, Set<string>> = new Map(
  KB.map(entry => [entry.id, new Set(entry.keywords.flatMap(tokenize))]),
)

export function findAnswer(raw: string): KBEntry {
  const input = normalize(raw)
  if (!input) return FALLBACK_REPLY

  const wordCount = input.split(' ').length
  if (wordCount <= 4 && GREETING_RE.test(input)) return GREETING_REPLY
  if (THANKS_RE.test(input)) return THANKS_REPLY
  if (BYE_RE.test(input)) return BYE_REPLY

  let best: { entry: KBEntry; score: number } | null = null
  for (const entry of KB) {
    let score = 0
    for (const kw of entry.keywords) {
      const kwNorm = normalize(kw)
      if (!kwNorm) continue
      if (input.includes(kwNorm)) score += kwNorm.split(' ').length * 2
    }
    if (score > 0 && (!best || score > best.score)) best = { entry, score }
  }

  if (!best || best.score < 2) {
    const inputToks = new Set(tokenize(input))
    let fuzzy: { entry: KBEntry; score: number } | null = null
    for (const entry of KB) {
      const toks = TOKEN_INDEX.get(entry.id)
      if (!toks) continue
      let overlap = 0
      for (const t of inputToks) if (toks.has(t)) overlap++
      if (overlap >= 2 && (!fuzzy || overlap > fuzzy.score)) fuzzy = { entry, score: overlap }
    }
    if (fuzzy) best = fuzzy
  }

  return best && best.score >= 2 ? best.entry : FALLBACK_REPLY
}
