import { useSEO } from '@/lib/useSEO'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Star, Zap, Shield, Clock, Globe, TrendingUp, Users, Award, Search, MessageSquare, Calendar } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay },
})

function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return
      started.current = true
      const t0 = Date.now()
      const tick = () => {
        const p = Math.min((Date.now() - t0) / 1600, 1)
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      tick()
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

const FEATURES = [
  { icon: <Zap size={20}/>, color: '#1b6fff', bg: 'rgba(27,111,255,0.12)', title: 'Blazing Fast', desc: 'Hand-coded HTML with 95+ PageSpeed scores. Google rewards fast sites.' },
  { icon: <Shield size={20}/>, color: '#00c896', bg: 'rgba(0,200,150,0.12)', title: 'HIPAA-Aware Design', desc: 'Contact forms and content built with healthcare compliance in mind.' },
  { icon: <Search size={20}/>, color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', title: 'SEO Built In', desc: 'Meta tags, schema markup, sitemap, and local SEO foundation included.' },
  { icon: <Clock size={20}/>, color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', title: '7-Day Guarantee', desc: 'Live or full refund. No delays. Most sites go live in 5 days.' },
  { icon: <Users size={20}/>, color: '#f472b6', bg: 'rgba(244,114,182,0.12)', title: 'NPI-Focused', desc: 'Built specifically for nurse practitioners, PAs, mental health providers, and all NPI practitioners.' },
  { icon: <TrendingUp size={20}/>, color: '#34d399', bg: 'rgba(52,211,153,0.12)', title: 'You Own Everything', desc: 'Source code delivered to you. No platform fees, no vendor lock-in. Ever.' },
]

const SERVICES = [
  { icon: <Globe size={22}/>, color: '#1b6fff', badge: 'Core Service', title: 'Custom Healthcare Website', price: '$500', period: 'one-time', desc: 'Hand-coded, mobile-perfect, NPI-optimised website live in 7 days.', perks: ['Custom design for your specialty','Mobile responsive + Fast','Online booking integration','Insurance page + Contact forms','Google Analytics + SEO foundation','Source code yours forever'] },
  { icon: <Search size={22}/>, color: '#00c896', badge: 'Most Popular', title: 'Local SEO', price: '$230', period: '/month', desc: 'Rank for "[specialty] near me" in your city within weeks.', perks: ['Keyword tracking + Rankings report','Content optimisation monthly','Local citation building','Google Search Console management'] },
  { icon: <MessageSquare size={22}/>, color: '#a78bfa', badge: 'Growth Add-on', title: 'Social Media', price: '$150', period: '/month', desc: '12â16 healthcare-specific posts per month across Instagram, Facebook, LinkedIn.', perks: ['12â16 posts per month','Stories and reels included','Healthcare-specific content','Monthly analytics report'] },
]

const TESTIMONIALS = [
  { name: 'Dr. Sarah Mitchell, NP', role: 'Family NP Â· Texas', stars: 5, quote: 'Ravi had my website live in 4 days. The site looks incredible and I\'ve already gotten 3 new patient inquiries through it. Worth every penny.' },
  { name: 'James Rodriguez, PA-C', role: 'Physician Assistant Â· Florida', stars: 5, quote: 'I compared agencies charging $4,000+. Ravi\'s work was better than all of them. The SEO add-on got me ranking #2 for "PA near me" in my city within 6 weeks.' },
  { name: 'Dr. Aisha Okonkwo', role: 'Mental Health NP Â· New York', stars: 5, quote: 'As a solo practitioner I needed something affordable that looked professional. ZmaxLab delivered beyond my expectations. Patients actually compliment my website.' },
  { name: 'Dr. Marcus Lee, DC', role: 'Chiropractor Â· California', stars: 5, quote: 'The Google Business Profile setup alone was worth it. I went from invisible to getting 8â10 calls a week within a month. Ravi is incredibly responsive too.' },
]

const PORTFOLIO = [
    { specialty: 'Family Nurse Practitioner', location: 'Austin, TX', color: '#1b6fff', initials: 'SH', name: 'Serene Health NP', tag: 'Booking + SEO', desc: 'Independent FNP practice. Ranked #1 for "nurse practitioner Austin" within 8 weeks of launch.' },
      { specialty: 'Mental Health Therapist', location: 'Chicago, IL', color: '#a78bfa', initials: 'MW', name: 'MindWell Therapy', tag: 'HIPAA Forms + SEO', desc: 'HIPAA-aware intake forms, insurance info, and online booking. 12 new patients in first month.' },
        { specialty: 'Physician Assistant', location: 'Miami, FL', color: '#00c896', initials: 'CC', name: 'ClearCare PA Clinic', tag: 'Custom Design', desc: 'Full custom PA practice site. Sub-1-second load time, 98 PageSpeed score. Zero templates.' },
          { specialty: 'Chiropractor', location: 'Denver, CO', color: '#f472b6', initials: 'SC', name: 'Summit Chiro & Wellness', tag: 'Local SEO', desc: 'Ranked top 3 for "chiropractor Denver" after SEO add-on. 40% increase in new patient calls.' },
            { specialty: 'Psychiatric NP', location: 'Seattle, WA', color: '#fbbf24', initials: 'CW', name: 'CalmWave Psychiatry', tag: 'Telehealth + Booking', desc: 'Telepsychiatry practice with HIPAA-aware video booking and insurance verification page.' },
              { specialty: 'Functional Medicine MD', location: 'Atlanta, GA', color: '#34d399', initials: 'RW', name: 'Roots Wellness MD', tag: 'Full Package', desc: 'Website + SEO + Social. Top 5 Google ranking for "functional medicine Atlanta" in 10 weeks.' },
              ]

const FAQS = [
  { q: 'What exactly do I get for $500?', a: 'A fully custom, hand-coded healthcare website designed for your specialty. Includes mobile responsiveness, SSL, online booking integration, insurance page, contact forms, Google Analytics, NPI credentials display, and 1 post-launch revision. No templates. No page builders.' },
  { q: 'Why only $500 when agencies charge $3,000â$10,000?', a: 'No overhead. No office, no team of 10, no project managers. I\'m one person who builds every site personally. That efficiency gets passed directly to you.' },
  { q: 'What if it\'s not live in 7 days?', a: 'Full refund. No questions asked. The 7-day guarantee is unconditional â if your site isn\'t live within 7 days of receiving your content, you get 100% back.' },
  { q: 'Do I need any technical knowledge?', a: 'Zero. You send your name, specialty, services, location, and any photos. I handle everything â design, code, hosting setup, domain connection.' },
  { q: 'Are the monthly services (SEO, Social) required?', a: 'Completely optional. The $500 website is standalone. You add growth services only when you\'re ready. No pressure, no bundles.' },
  { q: 'Who builds the website â is it outsourced?', a: 'I build every single site personally. My name is Ravi. You\'ll have my direct email and can book a call via Calendly. No account managers, no middlemen.' },
]

const GS = { fontFamily: "'Space Grotesk',sans-serif" }

export default function HomePage() {
const homeSchema = [{
      "@context": "https://schema.org",
          "@type": "ProfessionalService",
              "name": "ZmaxLab â Healthcare Website Design",
                  "description": "Affordable custom healthcare website design for NPI-registered practitioners. $500 flat fee, live in 7 days. Serving nurse practitioners, physician assistants, mental health providers, chiropractors.",
                      "url": "https://zmaxlab.site",
                          "email": "ravi@zmaxlab.site",
                              "priceRange": "$500",
                                  "areaServed": {"@type": "Country", "name": "United States"},
                                      "serviceType": ["Healthcare Website Design","Medical Website Development","Local SEO for Healthcare","NPI Practitioner Website","Nurse Practitioner Website","Physician Assistant Website","Mental Health Provider Website"],
                                          "offers": [
                                                {"@type": "Offer","name": "Custom Healthcare Website","price": "500","priceCurrency": "USD","description": "Hand-coded custom medical website for NPI practitioners. Live in 7 days or full refund."},
                                                      {"@type": "Offer","name": "Local SEO for Healthcare","price": "230","priceCurrency": "USD","description": "Rank for specialty near me searches within weeks. Monthly management."},
                                                            {"@type": "Offer","name": "Healthcare Social Media Management","price": "150","priceCurrency": "USD","description": "12-16 healthcare-specific posts per month across platforms."}
                                                                ],
                                                                    "founder": {"@type": "Person","name": "Ravi","jobTitle": "Healthcare Web Designer & NPI Website Specialist"}
                                                                      },{
                                                                          "@context": "https://schema.org",
                                                                              "@type": "WebSite",
                                                                                  "name": "ZmaxLab",
                                                                                      "url": "https://zmaxlab.site",
                                                                                          "description": "Custom healthcare website design for NPI practitioners. $500 flat fee, live in 7 days. No monthly platform fees."
                                                                                            }]
                                                                                              useSEO({
                                                                                                  title: 'ZmaxLab â $500 Custom Healthcare Website Design for NPI Practitioners',
                                                                                                      description: 'Affordable custom healthcare website design for nurse practitioners, physician assistants & mental health providers. $500 flat fee. Hand-coded. Live in 7 days. No monthly fees. NPI-focused.',
                                                                                                          canonical: 'https://zmaxlab.site/',
                                                                                                              schema: homeSchema
                                                                                                                })
  return (
    <div style={{ background: '#07091f' }}>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(120px,14vw,160px) 5% clamp(80px,10vw,120px)', background: 'linear-gradient(155deg,#03051a 0%,#07091f 60%,#0b0d28 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '8%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(27,111,255,0.11) 0%,transparent 65%)', filter: 'blur(40px)' }}/>
          <div style={{ position: 'absolute', bottom: '5%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,200,150,0.08) 0%,transparent 65%)', filter: 'blur(40px)' }}/>
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>
            <div>
              <motion.div {...fadeUp(0)} style={{ marginBottom: 22 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)', color: '#34d399', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, padding: '5px 14px', borderRadius: 999 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'pulse 2s infinite' }}/>
                  $500 Â· 7 Days Â· NPI-Focused Agency
                </span>
              </motion.div>
              <motion.h1 {...fadeUp(0.1)} style={{ ...GS, fontSize: 'clamp(2.4rem,5vw,4.4rem)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-3px', color: '#fff', marginBottom: 22 }}>
                Your healthcare website.{' '}
                <span style={{ background: 'linear-gradient(135deg,#1b6fff,#00c896)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Built right.</span>
                {' '}Live in 7 days.
              </motion.h1>
              <motion.p {...fadeUp(0.2)} style={{ fontSize: 'clamp(15px,1.4vw,18px)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.78, marginBottom: 34, maxWidth: 520 }}>
                $500 flat fee. Custom hand-coded website for NPI-registered practitioners across all 50 US states. No templates. No monthly platform fees. No surprises. Just patients finding you.
              </motion.p>
              <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 999, boxShadow: '0 4px 24px rgba(27,111,255,0.35)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Get My Free Demo <ArrowRight size={16}/>
                </Link>
                <a href="https://calendly.com/ravi9235kumar/30min" target="_blank" rel="noreferrer" style={{ ...GS, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '13px 28px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(8px)' }}>
                  <Calendar size={16} /> Book a Free Call
                </a>
                <Link to="/services" style={{ ...GS, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 15, padding: '13px 28px', borderRadius: 999 }}>
                  View Pricing
                </Link>
              </motion.div>
              <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['7-day live guarantee','NPI-focused','No platform fees ever'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    <CheckCircle2 size={13} style={{ color: '#00c896' }}/>{t}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pricing card */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="hero-card">
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 36, backdropFilter: 'blur(20px)', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 26 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Complete website package</div>
                    <div style={{ ...GS, fontSize: 70, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-4px' }}>
                      <sup style={{ fontSize: 28, verticalAlign: 'super', letterSpacing: 0 }}>$</sup>500
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>one-time Â· yours forever</div>
                  </div>
                  <span style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' as const, padding: '5px 12px', borderRadius: 999, whiteSpace: 'nowrap' }}>Best Value</span>
                </div>
                {['Custom design for your specialty','Mobile perfect + 95+ PageSpeed','Online booking integration','SEO foundation + Schema markup','7-day live or full refund','Source code delivered to you'].map(item => (
                  <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 11, alignItems: 'center' }}>
                    <CheckCircle2 size={14} style={{ color: '#00c896', flexShrink: 0 }}/>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                  </div>
                ))}
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  {[['Web agencies charge','$3kâ$10k','#ef4444'],['Wix/Squarespace','$29/mo forever','#f59e0b'],['ZmaxLab','$500 once','#00c896']].map(([l,v,c]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</span>
                      <span style={{ color: c, fontWeight: l === 'ZmaxLab' ? 800 : 400 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" style={{ ...GS, display: 'block', background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px', borderRadius: 999, textAlign: 'center', marginTop: 20 }}>
                  Start My Website Today
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <style>{`
          @media(max-width:900px){.hero-card{display:none!important}}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        `}</style>
      </section>

      {/* STATS */}
      <section style={{ background: '#03051a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '56px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 40 }}>
          {[
            { icon: <Globe size={18}/>, val: 60, sfx: '+', label: 'Sites Delivered' },
            { icon: <Award size={18}/>, val: 500, pfx: '$', label: 'Flat Fee â No Surprises' },
            { icon: <Clock size={18}/>, val: 7, sfx: ' Days', label: 'Guaranteed Launch' },
            { icon: <Shield size={18}/>, val: 100, sfx: '%', label: 'NPI-Focused Agency' },
          ].map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.1)} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, color: '#00c896' }}>{s.icon}</div>
              <div style={{ ...GS, fontSize: 44, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-2px' }}>
                <Counter to={s.val} suffix={s.sfx} prefix={s.pfx}/>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section style={{ padding: 'clamp(80px,9vw,120px) 5%', background: '#07091f' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#34d399', display: 'block', marginBottom: 12 }}>Why ZmaxLab</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 14 }}>Not another web agency.<br/>A healthcare digital partner.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>Every feature exists because healthcare practitioners asked for it.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.07)}
                whileHover={{ y: -5 }}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 28, cursor: 'default', transition: 'border-color .3s' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: f.color }}>{f.icon}</div>
                <h3 style={{ ...GS, fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: 'clamp(80px,9vw,120px) 5%', background: '#03051a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#5b87ff', display: 'block', marginBottom: 12 }}>Services & Pricing</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 14 }}>Start with $500. Add growth when ready.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>Every add-on is optional and cancellable anytime. No contracts.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} {...fadeUp(i * 0.1)} whileHover={{ y: -6 }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 30, transition: 'all .3s' }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: s.color }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: s.color, marginBottom: 4 }}>{s.badge}</div>
                    <h3 style={{ ...GS, fontSize: 17, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{s.title}</h3>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 22 }}>
                  {s.perks.map(p => (
                    <li key={p} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 12, color: 'rgba(255,255,255,0.65)', alignItems: 'center' }}>
                      <CheckCircle2 size={12} style={{ color: '#00c896', flexShrink: 0 }}/>{p}
                    </li>
                  ))}
                </ul>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ ...GS, fontSize: 30, fontWeight: 900, color: '#fff' }}>{s.price}</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginLeft: 4 }}>{s.period}</span>
                  </div>
                  <Link to="/contact" style={{ ...GS, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '8px 16px', borderRadius: 999 }}>
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/services" style={{ ...GS, display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 14, padding: '12px 28px', borderRadius: 999 }}>
              View All Services & Pricing <ArrowRight size={14}/>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: 'clamp(80px,9vw,120px) 5%', background: '#07091f' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#34d399', display: 'block', marginBottom: 12 }}>The Process</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>NPI number to live website in 3 steps</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
            {[
              { n: '01', title: 'Book a Free Demo', desc: 'A 20-minute call where I review your online presence and show you what your website will look like. Zero obligation.' },
              { n: '02', title: 'Send Your Info', desc: 'Name, specialty, services, location, and any photos. That\'s it. I handle everything from design to code to launch.' },
              { n: '03', title: 'Go Live in 7 Days', desc: 'Your custom website is live with your domain, SSL, booking, and all features. 7-day guarantee or full refund.' },
            ].map((s, i) => (
              <motion.div key={s.n} {...fadeUp(i * 0.12)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 32 }}>
                <div style={{ ...GS, fontSize: 64, fontWeight: 900, color: 'rgba(27,111,255,0.14)', lineHeight: 1, letterSpacing: '-3px', marginBottom: 16 }}>{s.n}</div>
                <h3 style={{ ...GS, fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#00c896', ...GS, fontWeight: 600, fontSize: 14 }}>
              See Detailed Process <ArrowRight size={14}/>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: 'clamp(80px,9vw,120px) 5%', background: '#03051a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#fbbf24', display: 'block', marginBottom: 12 }}>Practitioner Stories</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>Real practitioners. Real results.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} {...fadeUp(i * 0.08)} whileHover={{ y: -4 }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, transition: 'all .3s' }}
              >
                <div style={{ display: 'flex', marginBottom: 14 }}>
                  {Array(t.stars).fill(0).map((_, si) => <Star key={si} size={13} style={{ color: '#fbbf24', fill: '#fbbf24' }}/>)}
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>"{t.quote}"</p>
                <div>
                  <div style={{ ...GS, fontSize: 14, fontWeight: 700, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* PORTFOLIO */}
                <section style={{ padding: 'clamp(80px,9vw,120px) 5%', background: '#07091f' }}>
                          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                                      <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
                                                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#00c896', display: 'block', marginBottom: 12 }}>OUR WORK</span>
                                                                  <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>
                                                                                  Healthcare websites<br/><span style={{ background: 'linear-gradient(135deg,#1b6fff,#00c896)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>built for NPI practitioners</span>
                                                                                                </h2>
                                                                                                              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', marginTop: 16, maxWidth: 520, margin: '16px auto 0' }}>Every site is custom-coded for the practitioner's specialty, city, and patient base. No templates. Ever.</p>
                                                                                                                          </motion.div>
                                                                                                                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 24 }}>
                                                                                                                                                    {PORTFOLIO.map((p, i) => (
                                                                                                                                                                    <motion.div key={p.name} {...fadeUp(i * 0.07)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28, transition: 'all .3s' }}>
                                                                                                                                                                                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                                                                                                                                                                                          <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg,${p.color}33,${p.color}55)`, border: `1px solid ${p.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: p.color, flexShrink: 0 }}>{p.initials}</div>
                                                                                                                                                                                                                              <div>
                                                                                                                                                                                                                                                    <div style={{ ...GS, fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{p.name}</div>
                                                                                                                                                                                                                                                                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{p.location}</div>
                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                  <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', background: `${p.color}22`, color: p.color, padding: '3px 10px', borderRadius: 999, border: `1px solid ${p.color}44`, whiteSpace: 'nowrap' }}>{p.tag}</span>
                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>{p.specialty}</div>
                                                                                                                                                                                                                                                                                                                                                                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                                                                                                                                                                                                                                                                                                                                                                                        </motion.div>
                                                                                                                                                                                                                                                                                                                                                                                                      ))}
                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                              <motion.div {...fadeUp(0.3)} style={{ textAlign: 'center', marginTop: 40 }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                            <Link to="/contact" style={{ ...GS, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(27,111,255,0.12)', border: '1px solid rgba(27,111,255,0.3)', color: '#1b6fff', fontWeight: 600, fontSize: 14, padding: '11px 28px', borderRadius: 999, textDecoration: 'none' }}>Want your practice on this list? Get started â</Link>
                                                                                                                                                                                                                                                                                                                                                                                                                                                        </motion.div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(80px,9vw,120px) 5%', background: '#07091f' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#5b87ff', display: 'block', marginBottom: 12 }}>FAQ</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>Questions? Answered.</h2>
          </motion.div>
          <Accordion style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((faq, i) => (
              <motion.div key={faq.q} {...fadeUp(i * 0.06)}>
                <AccordionItem value={`q${i}`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '0 20px', overflow: 'hidden' }}>
                  <AccordionTrigger style={{ ...GS, fontSize: 15, fontWeight: 600, color: '#fff', textAlign: 'left' }}>{faq.q}</AccordionTrigger>
                  <AccordionContent style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, paddingBottom: 16 }}>{faq.a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px,9vw,120px) 5%', background: '#03051a' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp()} style={{ background: 'linear-gradient(135deg,rgba(27,111,255,0.1),rgba(0,200,150,0.07))', border: '1px solid rgba(27,111,255,0.2)', borderRadius: 28, padding: 'clamp(48px,6vw,72px)' }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#34d399', display: 'block', marginBottom: 16 }}>Ready to get found?</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', marginBottom: 16 }}>
              Your patients are searching Google.{' '}
              <span style={{ background: 'linear-gradient(135deg,#1b6fff,#00c896)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Are they finding you?
              </span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 36, maxWidth: 460, margin: '0 auto 36px' }}>
              Book a free 20-minute demo. I'll review your presence and show you exactly what your website will look like. Zero obligation.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 999, boxShadow: '0 4px 24px rgba(27,111,255,0.35)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Book Free Demo <ArrowRight size={16}/>
              </Link>
              <Link to="/services" style={{ ...GS, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 15, padding: '13px 28px', borderRadius: 999 }}>
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
