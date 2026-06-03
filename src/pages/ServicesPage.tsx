import { useSEO } from '@/lib/useSEO'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const GS = { fontFamily: "'Space Grotesk',sans-serif" }
const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay } })

const MONTHLY = [
  { color: '#5b87ff', title: 'Local SEO', price: '$230', desc: 'Rank higher for your specialty + city. Monthly keyword tracking, content, and optimisation.', perks: ['Keyword research and tracking','Monthly Google rankings report','Content optimisation updates','Local citation building','Google Search Console management'] },
  { color: '#f472b6', title: 'Social Media', price: '$150', desc: 'Monthly content written and scheduled across Instagram, Facebook, and LinkedIn.', perks: ['12–16 posts per month','Instagram, Facebook, LinkedIn','Healthcare-specific content','Stories and reels included','Monthly analytics report'] },
  { color: '#fbbf24', title: 'Review Management', price: '$100', desc: 'Automated review requests after every visit. Build your Google rating automatically.', perks: ['Post-visit review request automation','Google review link setup','Monthly review report','Response templates provided','Alert on negative reviews'] },
  { color: '#22d3ee', title: 'Monthly Health Report', price: '$75', desc: 'Know exactly how your website and online presence performs every month.', perks: ['Google ranking positions tracked','Monthly visitor analytics','Enquiry and call tracking','Core Web Vitals score','Competitor ranking comparison'] },
  { color: '#a78bfa', title: 'Website Support', price: '$200', desc: 'Unlimited small changes, priority support, and monthly performance review.', perks: ['Unlimited text and photo updates','Monthly performance review','Priority 24hr response time','Security and uptime monitoring','Annual SEO health check'] },
]

const ONE_TIME = [
  { color: '#4285f4', label: 'Setup', title: 'Google Business Profile', price: '$150', desc: 'Verified GBP setup. Appear on Google Maps. 80% of patients find their doctor there.' },
  { color: '#7c3aed', label: 'Setup', title: 'NPI Directory Listings', price: '$75', desc: 'Listed on Healthgrades, Zocdoc, Vitals, WebMD – all completed for you.' },
  { color: '#059669', label: 'Setup', title: 'HIPAA Patient Intake Forms', price: '$100', desc: 'Custom digital intake forms for your specialty. HIPAA-aware. Delivered to your inbox.' },
  { color: '#0891b2', label: 'Setup', title: 'Telehealth Page Setup', price: '$100', desc: 'Telehealth booking page with state coverage map and direct booking link.' },
  { color: '#be185d', label: 'Content', title: 'Blog Content Starter', price: '$150', desc: '3 SEO blog posts targeting NPI keywords. Written, published, submitted to Google.' },
  { color: '#d97706', label: 'Automation', title: 'Email Reminder Setup', price: '$75', desc: 'Automated appointment reminders. Reduce no-shows by 30%.' },
]

const WEBSITE_FEATURES = [
  'Custom design for your specialty','Mobile responsive (all devices)','SSL secured (HTTPS)','SEO foundation – meta, schema, sitemap',
  'Online booking – Calendly/Jane/SimplePractice','Insurance page – reduces front-desk calls','HIPAA-aware contact forms','Google Analytics setup',
  'NPI credentials + license displayed','7-day live guarantee','Source code delivered to you','1 post-launch revision included',
]

export default function ServicesPage() {
  const [tab, setTab] = useState<'monthly'|'onetime'|'bundle'>('monthly')

  useSEO({ title: 'Services & Pricing | ZmaxLab – $500 Healthcare Website + SEO', description: 'ZmaxLab pricing: $500 custom healthcare website, $230/mo local SEO, $150/mo social media, and one-time add-ons for NPI practitioners in the USA.', canonical: 'https://zmaxlab.site/services' })
  return (
    <div style={{ background: '#07091f' }}>
      {/* HERO */}
      <section style={{ padding: 'clamp(120px,14vw,160px) 5% clamp(64px,8vw,96px)', background: 'linear-gradient(155deg,#03051a,#07091f)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 80% at 80% 50%,rgba(59,111,240,0.1) 0%,transparent 65%)' }}/>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div {...fadeUp()}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)', color: '#34d399', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, padding: '5px 14px', borderRadius: 999, marginBottom: 20 }}>
              Transparent Pricing
            </span>
            <h1 style={{ ...GS, fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 18 }}>
              Start with your website.<br/>
              <span style={{ color: '#00c896' }}>Add growth when ready.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>
              $500 gets your custom website live in 7 days. SEO, social media, and marketing are completely optional.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 999, boxShadow: '0 4px 20px rgba(27,111,255,0.3)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Get My Free Demo <ArrowRight size={15}/>
              </Link>
              <Link to="/how-it-works" style={{ ...GS, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 999 }}>
                How It Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WEBSITE PACKAGE */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 5%', background: '#03051a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#34d399', display: 'block', marginBottom: 10 }}>Core Service</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>Your website. Built right. The first time.</h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)} style={{ background: 'linear-gradient(135deg,rgba(27,111,255,0.1),rgba(0,200,150,0.06))', border: '1px solid rgba(27,111,255,0.25)', borderRadius: 24, padding: 'clamp(28px,4vw,48px)', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, alignItems: 'start' }}>
            <div>
              <span style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' as const, padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 20 }}>Website Package – $500 One-Time</span>
              <h3 style={{ ...GS, fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.3 }}>Custom healthcare website. No templates. Built personally by Ravi in 7 days.</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 28 }}>Every site coded from scratch for your specialty, location, and patient audience. Clean hand-coded HTML. Loads fast. Ranks well. Belongs to you forever.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {WEBSITE_FEATURES.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
                    <CheckCircle2 size={13} style={{ color: '#00c896', flexShrink: 0, marginTop: 1 }}/>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28, textAlign: 'center', position: 'sticky', top: 96 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Complete website</div>
              <div style={{ ...GS, fontSize: 68, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-4px' }}>
                <sup style={{ fontSize: 26, verticalAlign: 'super', letterSpacing: 0 }}>$</sup>500
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 22 }}>one-time · yours forever</div>
              <Link to="/contact" style={{ ...GS, display: 'block', background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px', borderRadius: 999, marginBottom: 16 }}>
                Get My Free Demo
              </Link>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16, textAlign: 'left' }}>
                {[['Web agency','$3k–$10k','#ef4444'],['Wix/Squarespace','$29/mo forever','#f59e0b'],['ZmaxLab','$500 once','#00c896']].map(([l,v,c]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</span>
                    <span style={{ color: c, fontWeight: l === 'ZmaxLab' ? 700 : 400 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <style>{`@media(max-width:768px){.pkg-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* GROWTH SERVICES */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 5%', background: '#07091f' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 36 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#5b87ff', display: 'block', marginBottom: 10 }}>Growth Services</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>Optional add-ons. Add any time after launch.</h2>
          </motion.div>

          {/* Tabs */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 4, marginBottom: 32, maxWidth: 520 }}>
            {(['monthly','onetime','bundle'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer', ...GS, fontSize: 13, fontWeight: 700, background: tab === t ? 'linear-gradient(135deg,#1b6fff,#00c896)' : 'transparent', color: tab === t ? '#fff' : 'rgba(255,255,255,0.5)', transition: '.2s' }}>
                {t === 'monthly' ? 'Monthly' : t === 'onetime' ? 'One-Time' : 'Bundle'}
              </button>
            ))}
          </motion.div>

          {tab === 'monthly' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
              {MONTHLY.map((s, i) => (
                <motion.div key={s.title} {...fadeUp(i * 0.07)} whileHover={{ y: -5 }}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 26, transition: 'all .3s' }}
                >
                  <h3 style={{ ...GS, fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: 20 }}>
                    {s.perks.map(p => (
                      <li key={p} style={{ display: 'flex', gap: 8, marginBottom: 7, fontSize: 12, color: 'rgba(255,255,255,0.65)', alignItems: 'center' }}>
                        <CheckCircle2 size={11} style={{ color: '#00c896', flexShrink: 0 }}/>{p}
                      </li>
                    ))}
                  </ul>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ ...GS, fontSize: 28, fontWeight: 800, color: '#fff' }}>{s.price}</span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 4 }}>/month</span>
                    </div>
                    <Link to="/contact" style={{ ...GS, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '8px 16px', borderRadius: 999 }}>
                      Add this
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'onetime' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 18 }}>
              {ONE_TIME.map((s, i) => (
                <motion.div key={s.title} {...fadeUp(i * 0.07)} whileHover={{ y: -4 }}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24, transition: 'all .3s' }}
                >
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: s.color, marginBottom: 10 }}>One-time {s.label}</div>
                  <h3 style={{ ...GS, fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ ...GS, fontSize: 26, fontWeight: 800, color: '#fff' }}>{s.price}</span>
                    <Link to="/contact" style={{ ...GS, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 999 }}>Add</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'bundle' && (
            <motion.div {...fadeUp()} style={{ background: 'linear-gradient(135deg,rgba(0,200,150,0.08),rgba(59,111,240,0.08))', border: '2px solid rgba(0,200,150,0.2)', borderRadius: 24, padding: 'clamp(36px,5vw,56px)', textAlign: 'center' }}>
              <span style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' as const, padding: '5px 16px', borderRadius: 999, display: 'inline-block', marginBottom: 24 }}>Best Value</span>
              <h3 style={{ ...GS, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>Complete Launch Bundle</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.75 }}>Everything to go from NPI number to fully online in one week.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 36 }}>
                {[['$500','Website'],['$150','Google GBP'],['$75','NPI Dirs'],['$100','HIPAA Forms'],['$150','Blog Starter']].map(([price, label]) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 18px' }}>
                    <div style={{ ...GS, fontSize: 18, fontWeight: 800, color: '#34d399' }}>{price}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through', marginBottom: 6 }}>$975 purchased separately</div>
              <div style={{ ...GS, fontSize: 68, fontWeight: 900, color: '#34d399', letterSpacing: '-4px', lineHeight: 1 }}>
                <sup style={{ fontSize: 28, verticalAlign: 'super', letterSpacing: 0 }}>$</sup>799
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>You save $176</div>
              <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 999, display: 'inline-block' }}>
                Get the Full Bundle
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* AUDIT CTA */}
      <section style={{ padding: '80px 5%', background: '#03051a', textAlign: 'center' }}>
        <motion.div {...fadeUp()} style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ ...GS, fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 14 }}>Not sure what you need?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.75 }}>Message me. I'll look at your current presence and tell you exactly what's missing — free.</p>
          <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 24px rgba(27,111,255,0.3)' }}>
            Get a Free Audit <ArrowRight size={15}/>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
