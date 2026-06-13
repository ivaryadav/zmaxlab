import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { useSEO } from '@/lib/useSEO'

const T = { bg:'#04060f', card:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.07)', blue:'#2563eb', violet:'#7c3aed', cyan:'#0891b2', green:'#059669', amber:'#f59e0b', text:'#f1f5f9', muted:'rgba(241,245,249,0.5)' }
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({ initial:{ opacity:0, y:28 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true, amount:0.1 }, transition:{ duration:0.7, delay, ease:EASE } })

function Glass({ children, style, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div style={{ background:T.card, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:`1px solid ${T.border}`, borderRadius:20, ...style }} {...p}>{children}</div>
}

const MONTHLY = [
  { color:'#2563eb', title:'Local SEO', price:'$230', sub:'/month', desc:'68% of patients Google their symptoms before booking. We get your practice to the top of local search - for your specialty and city - before your competition.', perks:['20+ specialty + city keyword targets','Google Maps (3-pack) optimisation','Monthly ranking & traffic report','Local citation & NPI directory building','Competitor gap analysis included'] },
  { color:'#7c3aed', title:'Social Media Marketing', price:'$150', sub:'/month', desc:'Patients don\'t book on the first visit to your profile. Consistent, expert content keeps your practice top-of-mind - so when they\'re ready, they choose you, not the practice down the road.', perks:['12-16 HIPAA-compliant posts/month','Instagram, Facebook & LinkedIn','Patient education + trust content','Stories, reels & highlight covers','Monthly performance analytics'] },
  { color:'#f59e0b', title:'Reputation Management', price:'$100', sub:'/month', desc:'87% of patients read reviews before choosing a provider. 72% won\'t consider below 4 stars. I send review requests on your behalf and provide response templates - so your 5-star reputation grows while you focus on patient care.', perks:['Post-visit review requests we send for you','2-click SMS + email links for patients','Google & Healthgrades monitoring','Done-for-you response templates','Negative review alert & guidance'] },
  { color:'#0891b2', title:'Performance Report', price:'$75', sub:'/month', desc:'See exactly where every new patient came from. Monthly analytics covering rankings, traffic, calls, and bookings - plus what your local competitors are doing differently this month.', perks:['Google ranking positions tracked','Monthly visitor & source analytics','Call & enquiry conversion tracking','Core Web Vitals performance score','Head-to-head competitor comparison'] },
  { color:'#059669', title:'Website Support', price:'$200', sub:'/month', desc:'Your website is your hardest-working team member - it greets every patient, answers questions, and takes bookings around the clock. I keep it updated, secure, and performing so it never lets you down.', perks:['Unlimited text, image & page updates','Monthly performance review call','Priority 24-hour response time','Security scanning & uptime monitoring','Annual SEO health check included'] },
]

const ONE_TIME = [
  { color:'#2563eb', label:'Setup',      title:'Google Business Profile',  price:'$150', desc:'86% of people use Google Maps to find local businesses. We verify and fully optimise your GBP so patients searching "[specialty] near me" find you - not your competitor.' },
  { color:'#7c3aed', label:'Setup',      title:'NPI Directory Listings',    price:'$75',  desc:'Patients Google your name before booking. We list and optimise your profile on 7 major directories: Healthgrades, Zocdoc, Vitals, WebMD, Psychology Today, US News & NPI Registry.' },
  { color:'#059669', label:'Setup',      title:'HIPAA Patient Intake Forms', price:'$100', desc:'Replace paper clipboards with secure, HIPAA-aware digital intake forms. Collect patient history before they walk in - delivered directly to your inbox or EHR.' },
  { color:'#0891b2', label:'Setup',      title:'Telehealth Page Setup',     price:'$100', desc:'Patients expect virtual care options. We build a professional telehealth booking page with your state coverage map, platform links, and insurance info - ready in 48 hours.' },
  { color:'#e11d48', label:'Content',    title:'Blog Content Starter',      price:'$150', desc:'Google rewards websites with fresh, expert content. 3 SEO-optimised blog posts targeting your specialty keywords - researched, written, published, and submitted to Google.' },
  { color:'#f59e0b', label:'Automation', title:'Appointment Reminder Setup', price:'$75',  desc:'No-shows cost the average practice $150+ per missed appointment. I set up reminder messages that go out before every visit - reducing no-shows by up to 30%. Done once, works forever.' },
]

const WEBSITE_FEATURES = [
  '75% of patients judge you by your website - ours converts','Mobile-first design (all devices & browsers)','SSL secured with HTTPS','Full SEO foundation - meta, schema, sitemap',
  'Online booking (Calendly / Jane / SimplePractice)','Insurance & billing page to cut front-desk calls','HIPAA-aware secure contact forms','Google Analytics 4 + Search Console setup',
  'NPI credentials, license & specialty displayed','Live on your domain in 7 days - guaranteed','Full source code delivered - you own it','1 free post-launch revision included',
]

type Tab = 'monthly' | 'onetime' | 'bundle'

export default function ServicesPage() {
  const [tab, setTab] = useState<Tab>('monthly')

  const servicesSchema = [{ "@context":"https://schema.org","@type":"Service","name":"Custom Healthcare Website Design - $500","provider":{"@type":"Organization","name":"ZmaxLab","url":"https://zmaxlab.site"},"description":"Affordable custom healthcare website for NPI practitioners. Hand-coded, mobile-perfect, live in 7 days. $500 one-time flat fee.","offers":{"@type":"Offer","price":"500","priceCurrency":"USD","availability":"https://schema.org/InStock"},"areaServed":"United States" }]

  useSEO({
    title: 'Healthcare Website Design, SEO & Reputation Management | ZmaxLab',
    description: 'Custom healthcare websites for NPs, PAs, dentists, chiropractors & multi-specialty groups. $500 flat fee, 7-day delivery. Local SEO, reputation management & social media. No contracts.',
    canonical: 'https://zmaxlab.site/services',
    schema: servicesSchema,
  })

  return (
    <div style={{ background:T.bg, color:T.text, overflowX:'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        padding:'clamp(120px,14vw,160px) 5% clamp(64px,8vw,96px)',
        background:`radial-gradient(ellipse at 80% 50%,rgba(37,99,235,0.12) 0%,transparent 60%),${T.bg}`,
        position:'relative',overflow:'hidden',
      }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <motion.div {...fadeUp()}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(5,150,105,0.1)',border:'1px solid rgba(5,150,105,0.25)',borderRadius:999,padding:'5px 14px',marginBottom:22 }}>
              <span style={{ fontSize:10,fontWeight:800,letterSpacing:1,textTransform:'uppercase',color:T.green }}>Transparent Pricing</span>
            </div>
            <h1 style={{ fontSize:'clamp(2.2rem,5vw,4rem)',fontWeight:900,lineHeight:1.05,letterSpacing:'-2px',marginBottom:18 }}>
              Everything your practice needs<br/>
              <span style={{ background:`linear-gradient(135deg,${T.blue},${T.violet})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                to dominate local search.
              </span>
            </h1>
            <p style={{ fontSize:'clamp(15px,1.5vw,18px)',color:T.muted,lineHeight:1.75,maxWidth:560,marginBottom:32 }}>
              Start with a $500 custom website live in 7 days. Layer in SEO, social media, reputation management, and reporting - only when you're ready. No contracts. No lock-ins. No agency nonsense.
            </p>
            <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
              <Link to="/contact" style={{ display:'inline-flex',alignItems:'center',gap:8,background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:15,padding:'13px 28px',borderRadius:14,boxShadow:`0 8px 28px rgba(37,99,235,0.35)` }}>
                Get My Free Demo <ArrowRight size={15}/>
              </Link>
              <Link to="/how-it-works" style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.06)',border:`1px solid ${T.border}`,color:T.text,fontWeight:600,fontSize:15,padding:'13px 22px',borderRadius:14 }}>
                How It Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WEBSITE PACKAGE ──────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%',borderBottom:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign:'center',marginBottom:40 }}>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.green,marginBottom:12 }}>Core Service</div>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:900,letterSpacing:'-0.5px' }}>Your website. Built right. The first time.</h2>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <Glass style={{
              padding:'clamp(28px,4vw,48px)',
              display:'grid',gridTemplateColumns:'1fr clamp(240px,25%,300px)',
              gap:48,alignItems:'start',
              border:`1px solid ${T.blue}25`,
              background:`linear-gradient(135deg,${T.blue}07,${T.card})`,
            }}>
              <div>
                <div style={{ display:'inline-block',background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontSize:10,fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',padding:'4px 14px',borderRadius:999,marginBottom:20 }}>
                  Website Package - $500 One-Time
                </div>
                <h3 style={{ fontSize:22,fontWeight:800,marginBottom:10,lineHeight:1.3 }}>
                  Custom healthcare website. No templates.<br/>Built personally by Ravi in 7 days.
                </h3>
                <p style={{ fontSize:14,color:T.muted,lineHeight:1.75,marginBottom:28 }}>
                  Every site coded from scratch for your specialty, location, and patient audience.
                </p>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
                  {WEBSITE_FEATURES.map(f => (
                    <div key={f} style={{ display:'flex',alignItems:'flex-start',gap:9,padding:'11px 13px',background:'rgba(255,255,255,0.04)',border:`1px solid ${T.border}`,borderRadius:12 }}>
                      <CheckCircle2 size={12} style={{ color:T.green,flexShrink:0,marginTop:2 }}/>
                      <span style={{ fontSize:12,color:T.muted }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price card */}
              <div style={{ background:'rgba(255,255,255,0.04)',border:`1px solid ${T.border}`,borderRadius:18,padding:28,textAlign:'center',position:'sticky',top:96 }}>
                <div style={{ fontSize:11,color:T.muted,marginBottom:4 }}>Complete website</div>
                <div style={{ fontSize:68,fontWeight:900,color:T.text,lineHeight:1,letterSpacing:'-4px' }}>
                  <sup style={{ fontSize:26,verticalAlign:'super',letterSpacing:0 }}>$</sup>500
                </div>
                <div style={{ fontSize:12,color:T.muted,marginBottom:22 }}>one-time · yours forever</div>
                <Link to="/contact" style={{ display:'block',background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:14,padding:'12px',borderRadius:12,marginBottom:18,boxShadow:`0 6px 20px rgba(37,99,235,0.35)` }}>
                  Get My Free Demo
                </Link>
                <div style={{ borderTop:`1px solid ${T.border}`,paddingTop:16,textAlign:'left' }}>
                  {[['Web agency','$3k-$10k','#ef4444'],['Wix / Squarespace','$29/mo forever','#f59e0b'],['ZmaxLab','$500 once',T.green]].map(([l,v,c]) => (
                    <div key={l} style={{ display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:7 }}>
                      <span style={{ color:T.muted }}>{l}</span>
                      <span style={{ color:c,fontWeight:l==='ZmaxLab'?700:400 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Glass>
          </motion.div>
        </div>
      </section>

      {/* ── GROWTH SERVICES ──────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%' }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign:'center',marginBottom:36 }}>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.blue,marginBottom:12 }}>Growth Services</div>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:900,letterSpacing:'-0.5px' }}>Optional add-ons. Add any time after launch.</h2>
          </motion.div>

          {/* Tab bar */}
          <motion.div {...fadeUp(0.1)} style={{ display:'flex',background:'rgba(255,255,255,0.04)',border:`1px solid ${T.border}`,borderRadius:14,padding:4,marginBottom:36,maxWidth:440,gap:4 }}>
            {(['monthly','onetime','bundle'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex:1,padding:'10px 4px',borderRadius:10,border:'none',cursor:'pointer',
                fontSize:13,fontWeight:700,
                background: tab===t ? `linear-gradient(135deg,${T.blue},${T.violet})` : 'transparent',
                color: tab===t ? '#fff' : T.muted,
                transition:'.2s',
              }}>
                {t==='monthly' ? 'Monthly' : t==='onetime' ? 'One-Time' : 'Bundle'}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity:0,y:16 }}
              animate={{ opacity:1,y:0 }}
              exit={{ opacity:0,y:-16 }}
              transition={{ duration:0.3,ease:EASE }}
            >
              {tab === 'monthly' && (
                <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:18 }}>
                  {MONTHLY.map((s,i) => (
                    <motion.div key={s.title} {...fadeUp(i*0.07)} whileHover={{ y:-5,transition:{duration:0.25} }}>
                      <Glass style={{ padding:26,height:'100%',border:`1px solid ${s.color}18` }}>
                        <div style={{ width:36,height:36,borderRadius:10,background:`${s.color}15`,border:`1px solid ${s.color}30`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14 }}>
                          <div style={{ width:10,height:10,borderRadius:'50%',background:s.color }}/>
                        </div>
                        <h3 style={{ fontSize:17,fontWeight:800,marginBottom:8 }}>{s.title}</h3>
                        <p style={{ fontSize:13,color:T.muted,lineHeight:1.7,marginBottom:18 }}>{s.desc}</p>
                        <ul style={{ listStyle:'none',padding:0,marginBottom:20 }}>
                          {s.perks.map(p => (
                            <li key={p} style={{ display:'flex',gap:8,marginBottom:7,fontSize:12,color:T.muted,alignItems:'center' }}>
                              <CheckCircle2 size={11} style={{ color:T.green,flexShrink:0 }}/>{p}
                            </li>
                          ))}
                        </ul>
                        <div style={{ borderTop:`1px solid ${T.border}`,paddingTop:16,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                          <div>
                            <span style={{ fontSize:28,fontWeight:900,color:T.text }}>{s.price}</span>
                            <span style={{ fontSize:11,color:T.muted,marginLeft:3 }}>/month</span>
                          </div>
                          <Link to="/contact" style={{ background:`${s.color}18`,border:`1px solid ${s.color}30`,color:s.color,fontSize:12,fontWeight:700,padding:'8px 16px',borderRadius:999 }}>Add this</Link>
                        </div>
                      </Glass>
                    </motion.div>
                  ))}
                </div>
              )}

              {tab === 'onetime' && (
                <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:18 }}>
                  {ONE_TIME.map((s,i) => (
                    <motion.div key={s.title} {...fadeUp(i*0.07)} whileHover={{ y:-4,transition:{duration:0.25} }}>
                      <Glass style={{ padding:24,height:'100%',border:`1px solid ${s.color}18` }}>
                        <div style={{ fontSize:10,fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:s.color,marginBottom:10 }}>One-time {s.label}</div>
                        <h3 style={{ fontSize:16,fontWeight:800,marginBottom:8 }}>{s.title}</h3>
                        <p style={{ fontSize:13,color:T.muted,lineHeight:1.7,marginBottom:18 }}>{s.desc}</p>
                        <div style={{ borderTop:`1px solid ${T.border}`,paddingTop:14,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                          <span style={{ fontSize:26,fontWeight:900,color:T.text }}>{s.price}</span>
                          <Link to="/contact" style={{ background:`${s.color}18`,border:`1px solid ${s.color}30`,color:s.color,fontSize:12,fontWeight:700,padding:'7px 14px',borderRadius:999 }}>Add</Link>
                        </div>
                      </Glass>
                    </motion.div>
                  ))}
                </div>
              )}

              {tab === 'bundle' && (
                <Glass style={{
                  padding:'clamp(36px,5vw,56px)',textAlign:'center',
                  border:`2px solid ${T.green}30`,
                  background:`linear-gradient(135deg,${T.green}07,${T.card})`,
                  boxShadow:`0 0 60px ${T.green}10`,
                }}>
                  <div style={{ display:'inline-block',background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontSize:10,fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',padding:'5px 16px',borderRadius:999,marginBottom:24 }}>Best Value</div>
                  <h3 style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:900,marginBottom:14 }}>Complete Launch Bundle</h3>
                  <p style={{ fontSize:15,color:T.muted,maxWidth:520,margin:'0 auto 36px',lineHeight:1.75 }}>Everything to go from NPI number to fully online in one week.</p>
                  <div style={{ display:'flex',justifyContent:'center',gap:12,flexWrap:'wrap',marginBottom:36 }}>
                    {[['$500','Website'],['$150','Google GBP'],['$75','NPI Dirs'],['$100','HIPAA Forms'],['$150','Blog Starter']].map(([price,label]) => (
                      <Glass key={label} style={{ padding:'12px 18px',borderRadius:14 }}>
                        <div style={{ fontSize:18,fontWeight:800,color:T.green }}>{price}</div>
                        <div style={{ fontSize:11,color:T.muted,marginTop:2 }}>{label}</div>
                      </Glass>
                    ))}
                  </div>
                  <div style={{ fontSize:14,color:T.muted,textDecoration:'line-through',marginBottom:6 }}>$975 purchased separately</div>
                  <div style={{ fontSize:68,fontWeight:900,color:T.green,letterSpacing:'-4px',lineHeight:1 }}>
                    <sup style={{ fontSize:28,verticalAlign:'super',letterSpacing:0 }}>$</sup>799
                  </div>
                  <div style={{ fontSize:14,color:T.muted,marginBottom:28 }}>You save $176</div>
                  <Link to="/contact" style={{ display:'inline-flex',alignItems:'center',gap:8,background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:15,padding:'14px 36px',borderRadius:14,boxShadow:`0 8px 28px rgba(37,99,235,0.35)` }}>
                    Get the Full Bundle <ArrowRight size={16}/>
                  </Link>
                </Glass>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%',textAlign:'center',borderTop:`1px solid ${T.border}` }}>
        <motion.div {...fadeUp()} style={{ maxWidth:560,margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:900,letterSpacing:'-0.5px',marginBottom:14 }}>Not sure what you need?</h2>
          <p style={{ fontSize:15,color:T.muted,marginBottom:28,lineHeight:1.75 }}>Message me. I'll review your current presence and tell you exactly what's missing - free, no obligation.</p>
          <Link to="/contact" style={{ display:'inline-flex',alignItems:'center',gap:8,background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:15,padding:'14px 36px',borderRadius:14,boxShadow:`0 8px 28px rgba(37,99,235,0.35)` }}>
            Get a Free Audit <ArrowRight size={15}/>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
