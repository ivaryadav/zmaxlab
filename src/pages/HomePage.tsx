import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MotionConfig, m as motion } from 'framer-motion'
import { CALENDLY_URL, EASE } from '@/lib/theme'
import LiveBuilder from '@/components/ui/LiveBuilder'
import HeroLeadForm from '@/components/ui/HeroLeadForm'
import { GROWTH_SERVICES } from '@/components/ui/GrowthServices'
import Seo, { type SeoProps } from '@/components/Seo'
import { isBooting } from '@/lib/boot'
import './home.css'
import { imgSize } from '@/lib/images'

const enter = (delay = 0) => ({
  initial: isBooting() ? false as const : { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
})
const reveal = (delay = 0) => ({
  initial: isBooting() ? false as const : { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: EASE },
})

const WORK = [
  { img: '/img/clients/manhattan-cardiology.webp', name: 'Manhattan Cardiology', meta: 'Cardiology · New York, NY', url: 'manhattancardiology.com' },
  { img: '/img/clients/mango-pediatrics.webp', name: 'Mango Pediatrics', meta: 'Pediatrics · Jacksonville, FL', url: 'mangopediatrics.com' },
  { img: '/img/clients/nw-womens-healthcare.webp', name: "Northwest Women's HealthCare", meta: 'OB/GYN · Seattle, WA', url: 'www.nwwomenshealth.com' },
]

const QUESTIONS = [
  ['Do you take my insurance?', 'An insurance and billing page, linked from every header.'],
  ['How soon can I be seen?', 'Live booking through Calendly, Jane or SimplePractice.'],
  ['Are you the right specialist for this?', 'A clear page for each condition and service you offer.'],
  ['Are you properly licensed?', 'NPI, licence and specialty shown where patients look for them.'],
  ['Can I book outside office hours?', 'Booking and intake that work at 11pm on a Sunday.'],
  ['Are you close to me?', 'Google Business Profile, map and local search markup.'],
]

const STEPS = [
  ['Day 1', 'Consultation', 'A short call about your specialty, your patients and your market.'],
  ['Days 2–4', 'Design and build', 'Written from scratch. You see the design and approve it before code.'],
  ['Day 5', 'Search foundation', 'Page structure, schema, Search Console and your Business Profile.'],
  ['Days 6–7', 'Launch', 'Live on your domain with SSL. Source files handed over.'],
]

const INCLUDED = [
  'Custom design, up to six pages',
  'Copy written for every page',
  'Online booking connected',
  'Secure contact and intake forms',
  'SEO foundation and analytics',
  'Domain, hosting and SSL set up for you',
  'One revision after launch',
  'Full source code',
]

export default function HomePage() {
  const seo: SeoProps = {
    title: "Website Design for Nurse Practitioners | ZmaxLab",
    description: "Custom websites for nurse practitioners, therapists, chiropractors and specialists. $500 flat, live in 7 business days, on your own domain.",
    path: '/',
  }

  return (
    <MotionConfig reducedMotion="user">
      <Seo {...seo} />
      <div className="hm">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hm-hero">
          <div className="hm-wrap hm-hero-grid">
            <div className="hm-hero-copy">
              <motion.p {...enter(0)} className="hm-kicker">Healthcare web design · United States</motion.p>
              <motion.h1 {...enter(0.08)} className="hm-h1">
                Websites for independent practices, <em>built by hand.</em>
              </motion.h1>
              <motion.p {...enter(0.16)} className="hm-lead">
                A custom-coded site for nurse practitioners, therapists, chiropractors and
                specialists. Live in seven business days for a flat $500, on your own domain,
                with the code handed to you.
              </motion.p>
              <motion.dl {...enter(0.24)} className="hm-facts">
                <div><dt>$500</dt><dd>Flat fee, paid in two halves</dd></div>
                <div><dt>7 days</dt><dd>From your content to live</dd></div>
                <div><dt>Yours</dt><dd>Domain, hosting and source code</dd></div>
              </motion.dl>
              <motion.div {...enter(0.3)} className="hm-hero-links">
                <a href="#work" className="hm-link">See recent work <ArrowRight size={15} /></a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="hm-link hm-link-quiet">
                  Book a 15-minute consultation <ArrowUpRight size={15} />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={isBooting() ? false : { opacity: 0, y: 40, rotate: 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="hm-hero-slip"
            >
              <HeroLeadForm />
            </motion.div>
          </div>
        </section>

        {/* ── Recent work ──────────────────────────────────── */}
        <section className="hm-sec" id="work">
          <div className="hm-wrap">
            <motion.header {...reveal()} className="hm-head hm-head-row">
              <div>
                <p className="hm-eyebrow">Recent work</p>
                <h2 className="hm-h2">Live practice sites, <em>not mockups.</em></h2>
              </div>
              <Link to="/clients" className="hm-link">All client work <ArrowRight size={15} /></Link>
            </motion.header>
            <div className="hm-work">
              {WORK.map((w, i) => (
                <motion.a {...reveal(i * 0.08)} key={w.name} href={`https://${w.url}`} target="_blank" rel="noopener noreferrer" className="hm-work-card">
                  <div className="hm-frame">
                    <div className="hm-frame-bar"><i /><i /><i /><span>{w.url}</span></div>
                    <img src={w.img} {...imgSize(w.img)} decoding="async" alt={`${w.name} website`} loading="lazy" />
                  </div>
                  <div className="hm-work-meta">
                    <h3>{w.name}</h3>
                    <p>{w.meta}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Specialty preview ────────────────────────────── */}
        <section className="hm-sec hm-sec-tint">
          <div className="hm-wrap hm-split">
            <motion.div {...reveal()} className="hm-split-copy">
              <p className="hm-eyebrow">Try it</p>
              <h2 className="hm-h2">Pick a specialty. <em>Watch the page change.</em></h2>
              <p className="hm-body">
                Every build starts from your specialty: the words patients search, the
                credentials they look for, the way they book. This preview shows the
                structure. Your site is written for your practice.
              </p>
            </motion.div>
            <motion.div {...reveal(0.1)}>
              <LiveBuilder />
            </motion.div>
          </div>
        </section>

        {/* ── Patient questions ────────────────────────────── */}
        <section className="hm-sec">
          <div className="hm-wrap">
            <motion.header {...reveal()} className="hm-head">
              <p className="hm-eyebrow">How it is built</p>
              <h2 className="hm-h2">A patient decides in seconds. <em>Every page answers first.</em></h2>
            </motion.header>
            <motion.div {...reveal(0.05)} className="hm-qa" role="table" aria-label="Patient questions and where the site answers them">
              <div className="hm-qa-row hm-qa-headrow" role="row">
                <span role="columnheader">The patient asks</span>
                <span role="columnheader">Where your site answers</span>
              </div>
              {QUESTIONS.map(([q, a]) => (
                <div key={q} className="hm-qa-row" role="row">
                  <span role="cell" className="hm-qa-q">{q}</span>
                  <span role="cell" className="hm-qa-a">{a}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────── */}
        <section className="hm-sec hm-sec-ink">
          <div className="hm-wrap">
            <motion.header {...reveal()} className="hm-head">
              <p className="hm-eyebrow">The build</p>
              <h2 className="hm-h2">Seven business days, <em>start to live.</em></h2>
            </motion.header>
            <ol className="hm-steps">
              {STEPS.map(([day, title, body], i) => (
                <motion.li {...reveal(i * 0.08)} key={title}>
                  <span className="hm-step-day">{day}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────── */}
        <section className="hm-sec">
          <div className="hm-wrap hm-price">
            <motion.div {...reveal()} className="hm-price-main">
              <p className="hm-eyebrow">Pricing</p>
              <p className="hm-price-fig"><sup>$</sup>500</p>
              <p className="hm-body">
                One price for the build, paid in two halves: $250 to start, and $250 once you
                have approved the live site. Agencies typically quote $3,000 to $10,000 for the same scope.
              </p>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" data-cta="" className="hm-btn">
                Book a 15-minute consultation <ArrowUpRight size={16} />
              </a>
            </motion.div>
            <motion.div {...reveal(0.08)} className="hm-price-lists">
              <div>
                <h3 className="hm-list-title">Included</h3>
                <ul className="hm-list">
                  {INCLUDED.map(t => <li key={t}><Check size={15} />{t}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="hm-list-title">Paid directly by you, at cost</h3>
                <ul className="hm-list hm-list-plain">
                  <li><span>Domain, in your name</span><span>about $12–15 / year</span></li>
                  <li><span>Hosting plan, in your name</span><span>about $3–6 / month</span></li>
                </ul>
                <p className="hm-small">No markup and no middleman. If you ever move on, everything moves with you.</p>
              </div>
            </motion.div>
          </div>
          <div className="hm-wrap">
            <motion.ul {...reveal(0.1)} className="hm-promises">
              <li><strong>Live in seven business days,</strong> or a full refund.</li>
              <li><strong>You approve the design</strong> before any code is written.</li>
              <li><strong>Source code delivered.</strong> No licence, no lock-in.</li>
            </motion.ul>
          </div>
        </section>

        {/* ── Beyond the website ───────────────────────────── */}
        <section className="hm-sec hm-sec-tint">
          <div className="hm-wrap">
            <motion.header {...reveal()} className="hm-head hm-head-row">
              <div>
                <p className="hm-eyebrow">After launch</p>
                <h2 className="hm-h2">Beyond the website.</h2>
              </div>
              <p className="hm-body hm-head-aside">Add the channels that bring patients in. Nothing is bundled, and every service is month to month.</p>
            </motion.header>
            <div className="hm-svc">
              {GROWTH_SERVICES.slice(1).map(({ title, tag, desc }, i) => (
                <motion.div {...reveal(i * 0.04)} key={title} className="hm-svc-row">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <span>{tag}</span>
                </motion.div>
              ))}
            </div>
            <Link to="/services" className="hm-link hm-svc-more">Services and pricing <ArrowRight size={15} /></Link>
          </div>
        </section>

        {/* ── A note from Ravi ─────────────────────────────── */}
        <section className="hm-sec hm-sec-ink hm-note">
          <div className="hm-wrap hm-note-grid">
            <motion.figure {...reveal()} className="hm-note-photo">
              <img src="/ravi.webp" {...imgSize("/ravi.webp")} decoding="async" alt="Ravi Kumar, founder of ZmaxLab" loading="lazy" />
            </motion.figure>
            <motion.div {...reveal(0.08)}>
              <p className="hm-eyebrow">From the person who builds it</p>
              <blockquote className="hm-note-quote">
                I'm one person, so I take a limited number of builds each month. The person you
                speak to is the person who writes your site. No account manager, no hand-offs,
                and a straight answer on whether it's the right fit.
              </blockquote>
              <p className="hm-note-sign"><em>Ravi Kumar</em><span>Founder, ZmaxLab</span></p>
              <div className="hm-note-ctas">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" data-cta="" className="hm-btn hm-btn-light">
                  Book a 15-minute consultation <ArrowUpRight size={16} />
                </a>
                <a href="#intake" className="hm-link hm-link-light">Or request a call back <ArrowRight size={15} /></a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </MotionConfig>
  )
}
