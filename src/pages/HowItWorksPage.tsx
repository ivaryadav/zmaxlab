import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageCircle, FileText, Palette, Code, Rocket, RefreshCw } from 'lucide-react'
import { useSEO } from '@/lib/useSEO'

const T = { bg:'#04060f', card:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.07)', blue:'#2563eb', violet:'#7c3aed', cyan:'#0891b2', green:'#059669', amber:'#f59e0b', text:'#f1f5f9', muted:'rgba(241,245,249,0.5)' }
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({ initial:{ opacity:0, y:28 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true, amount:0.1 }, transition:{ duration:0.7, delay, ease:EASE } })

function Glass({ children, style, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div style={{ background:T.card, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:`1px solid ${T.border}`, borderRadius:20, ...style }} {...p}>{children}</div>
}

const STEPS = [
  { Icon:MessageCircle, color:T.blue,   n:'01', title:'Book a Free Demo Call', time:'Day 0',        desc:'We jump on a 20-minute video call. I review your current online presence, ask about your specialty, and show you mockups. Zero obligation. Zero pressure.', bullet:['20-minute video call','Review of your current presence','Specialty-matched mockup examples','Exact pricing - no hidden fees'] },
  { Icon:FileText,      color:T.green,  n:'02', title:'Send Your Content',      time:'Day 1',        desc:'I send you a simple Google Form. Fill in your specialty, services, location, and upload any photos. No photos? I source professional healthcare imagery for free.', bullet:['Simple Google Form - 15 mins','Name, specialty, services, location','Photos optional - I source if needed','Your NPI number and credentials'] },
  { Icon:Palette,       color:T.violet, n:'03', title:'Design Approval',        time:'Days 2–3',     desc:'I build a full design mockup and send it for approval via WhatsApp or email. You see the entire homepage layout before a single line of code is written.', bullet:['Full homepage design mockup','Review via WhatsApp or email','Request changes before coding','Typical approval within 24 hours'] },
  { Icon:Code,          color:T.amber,  n:'04', title:'Build & Code',           time:'Days 3–5',     desc:'Once approved, I hand-code your entire site. No WordPress. No page builders. Clean, fast HTML/CSS - built specifically for healthcare SEO and patient conversion.', bullet:['Hand-coded - no page builders','All pages built and linked','Booking integration configured','SEO meta, schema, sitemap added'] },
  { Icon:Rocket,        color:T.cyan,   n:'05', title:'Launch & Deliver',       time:'Days 5–7',     desc:'Your website goes live on your domain with full SSL. I connect hosting, set up Google Search Console, submit your sitemap, and hand over all source files. You own everything.', bullet:['Live on your domain with SSL','Google Search Console verified','Sitemap submitted to Google','Full source code delivered to you'] },
  { Icon:RefreshCw,     color:'#e11d48',n:'06', title:'Post-Launch Support',    time:'After Launch', desc:'One free revision included after launch. I stay available via WhatsApp for 30 days post-launch. Optional monthly support and SEO plans available.', bullet:['1 free post-launch revision','30-day WhatsApp support included','Optional monthly maintenance plans','SEO and social media add-ons available'] },
]

const FAQS = [
  { q:'What do I need to provide?',      a:'Just your name, practice name, specialty, services list, location, phone number, and any photos you have. I handle everything else - design, copywriting, code, and launch.' },
  { q:"What if I don't have photos?",    a:'No problem. I source professional healthcare stock photography that matches your specialty and location. It looks great and costs you nothing extra.' },
  { q:'How does payment work?',          a:'50% upfront ($250) to start the project, 50% ($250) on launch day after you approve the live site. For monthly services, first month is due at signup, then monthly billing.' },
  { q:'Can I make changes after launch?',a:'Yes - you get 1 free revision after launch. Additional edits at $50/hour or via the monthly support plan ($200/month) which includes unlimited small updates.' },
  { q:'How do I connect my domain?',     a:"If you have a domain already, I'll walk you through updating your DNS (5 minutes). If not, I'll recommend where to buy one and handle the setup entirely." },
  { q:'What hosting do I need?',         a:"Any basic shared hosting works - SiteGround, Hostinger, or Namecheap ($3–6/month). I'll help you choose and set it up. The site is static HTML so it runs on the cheapest plans." },
  { q:'What if I want design changes?',  a:'You review the full design mockup before coding begins. Request any changes at that stage - colours, layout, content. Once you approve, we move to build.' },
]

const FAQ_COLORS = [T.blue, T.violet, T.cyan, T.green, T.amber, '#e11d48', T.violet]

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section style={{ padding:'80px 5%', background:'rgba(255,255,255,0.015)', borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:780, margin:'0 auto' }}>

        <motion.div {...fadeUp()} style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:T.violet, marginBottom:12 }}>FAQ</div>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.4rem)', fontWeight:900, letterSpacing:'-0.5px' }}>Process Questions</h2>
          <p style={{ fontSize:15, color:T.muted, marginTop:12 }}>Everything you need to know before we start.</p>
        </motion.div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {FAQS.map((faq, i) => {
            const isOpen  = open === i
            const accent  = FAQ_COLORS[i % FAQ_COLORS.length]
            return (
              <motion.div key={faq.q} {...fadeUp(i * 0.06)}>
                <div
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    position:'relative', overflow:'hidden',
                    background: isOpen ? 'rgba(255,255,255,0.07)' : T.card,
                    border:`1px solid ${isOpen ? accent + '45' : T.border}`,
                    borderRadius:16, cursor:'pointer',
                    transition:'background .2s, border-color .2s',
                  }}
                >
                  {/* Left accent bar */}
                  {isOpen && (
                    <div style={{
                      position:'absolute', left:0, top:0, bottom:0, width:3,
                      background:`linear-gradient(180deg,${accent},transparent)`,
                      borderRadius:'16px 0 0 16px',
                    }}/>
                  )}

                  {/* Question row */}
                  <div style={{ display:'flex', alignItems:'center', gap:14, padding:'18px 22px' }}>
                    <div style={{
                      width:34, height:34, borderRadius:10, flexShrink:0,
                      background: isOpen ? `${accent}20` : 'rgba(255,255,255,0.05)',
                      border:`1px solid ${isOpen ? accent + '50' : 'rgba(255,255,255,0.08)'}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:11, fontWeight:800, letterSpacing:'0.5px',
                      color: isOpen ? accent : T.muted,
                      transition:'all .2s',
                    }}>
                      {String(i + 1).padStart(2,'0')}
                    </div>

                    <span style={{ flex:1, fontSize:15, fontWeight:600, color: isOpen ? T.text : 'rgba(241,245,249,0.8)', lineHeight:1.4 }}>
                      {faq.q}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration:0.22, ease:'easeOut' }}
                      style={{ fontSize:22, fontWeight:300, color: isOpen ? accent : T.muted, lineHeight:1, userSelect:'none', flexShrink:0 }}
                    >
                      +
                    </motion.div>
                  </div>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height:0, opacity:0 }}
                        animate={{ height:'auto', opacity:1 }}
                        exit={{ height:0, opacity:0 }}
                        transition={{ duration:0.28, ease:EASE }}
                        style={{ overflow:'hidden' }}
                      >
                        <p style={{
                          margin:'0 22px 20px 70px',
                          fontSize:14, color:T.muted, lineHeight:1.85,
                        }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function HowItWorksPage() {
  const howItWorksSchema = [{"@context":"https://schema.org","@type":"HowTo","name":"How to Get a Custom Healthcare Website in 7 Days","description":"ZmaxLab builds custom $500 healthcare websites for NPI practitioners in 7 days.","totalTime":"P7D","step":[{"@type":"HowToStep","name":"Book a Free Demo Call"},{"@type":"HowToStep","name":"Send Your Content"},{"@type":"HowToStep","name":"Design Approval"},{"@type":"HowToStep","name":"Build & Code"},{"@type":"HowToStep","name":"Launch & Deliver"},{"@type":"HowToStep","name":"Post-Launch Support"}]}]
  useSEO({
    title: 'How It Works – Custom Healthcare Website in 7 Days | ZmaxLab $500',
    description: 'See how ZmaxLab builds custom $500 healthcare websites for NPI practitioners in 7 days. 6-step process: demo → content → design → build → launch → support.',
    canonical: 'https://zmaxlab.site/how-it-works',
    schema: howItWorksSchema,
  })

  return (
    <div style={{ background:T.bg, color:T.text, overflowX:'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        padding:'clamp(120px,14vw,160px) 5% clamp(64px,8vw,96px)',
        background:`radial-gradient(ellipse at 70% 40%,rgba(8,145,178,0.1) 0%,transparent 60%),${T.bg}`,
      }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <motion.div {...fadeUp()}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(8,145,178,0.1)',border:'1px solid rgba(8,145,178,0.25)',borderRadius:999,padding:'5px 14px',marginBottom:22 }}>
              <span style={{ fontSize:10,fontWeight:800,letterSpacing:1,textTransform:'uppercase',color:T.cyan }}>Simple Process</span>
            </div>
            <h1 style={{ fontSize:'clamp(2.2rem,5vw,4rem)',fontWeight:900,lineHeight:1.05,letterSpacing:'-2px',marginBottom:18 }}>
              NPI number to live website.<br/>
              <span style={{ background:`linear-gradient(135deg,${T.cyan},${T.green})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                In 7 days. Guaranteed.
              </span>
            </h1>
            <p style={{ fontSize:'clamp(15px,1.5vw,18px)',color:T.muted,lineHeight:1.75,maxWidth:540,marginBottom:32 }}>
              A clear, transparent process from first call to live website. No surprises. No technical jargon. No delays.
            </p>
            <Link to="/contact" style={{ display:'inline-flex',alignItems:'center',gap:8,background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:15,padding:'13px 28px',borderRadius:14,boxShadow:`0 8px 28px rgba(37,99,235,0.35)` }}>
              Start the Process <ArrowRight size={15}/>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STEPS TIMELINE ───────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%' }}>
        <div style={{ maxWidth:820,margin:'0 auto' }}>
          {STEPS.map((s,i) => (
            <motion.div key={s.n} {...fadeUp(i*0.1)} style={{ display:'flex',gap:22,alignItems:'flex-start' }}>
              {/* Icon + connector */}
              <div style={{ display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0 }}>
                <div style={{
                  width:52,height:52,borderRadius:'50%',
                  background:`${s.color}15`,border:`2px solid ${s.color}40`,
                  display:'flex',alignItems:'center',justifyContent:'center',color:s.color,
                  boxShadow:`0 0 20px ${s.color}25`,
                }}>
                  <s.Icon size={22}/>
                </div>
                {i < STEPS.length - 1 && <div style={{ width:2,flex:1,minHeight:32,background:`linear-gradient(180deg,${s.color}50,transparent)`,margin:'6px 0' }}/>}
              </div>
              {/* Card */}
              <Glass style={{
                flex:1,padding:'24px 28px',marginBottom:20,
                border:`1px solid ${s.color}18`,
                background:`linear-gradient(135deg,${s.color}05,${T.card})`,
              }}>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10,flexWrap:'wrap',gap:8 }}>
                  <div>
                    <div style={{ fontSize:40,fontWeight:900,color:`${s.color}20`,lineHeight:1,letterSpacing:'-2px',marginBottom:2 }}>{s.n}</div>
                    <h3 style={{ fontSize:19,fontWeight:800,color:T.text }}>{s.title}</h3>
                  </div>
                  <span style={{ background:`${s.color}15`,border:`1px solid ${s.color}30`,color:s.color,fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:999,whiteSpace:'nowrap' }}>{s.time}</span>
                </div>
                <p style={{ fontSize:14,color:T.muted,lineHeight:1.75,marginBottom:18 }}>{s.desc}</p>
                <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:8 }}>
                  {s.bullet.map(b => (
                    <div key={b} style={{ display:'flex',gap:8,alignItems:'center',fontSize:13,color:T.muted }}>
                      <span style={{ width:6,height:6,borderRadius:'50%',background:s.color,flexShrink:0 }}/>
                      {b}
                    </div>
                  ))}
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%',textAlign:'center',borderTop:`1px solid ${T.border}` }}>
        <motion.div {...fadeUp()} style={{ maxWidth:600,margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.4rem)',fontWeight:900,letterSpacing:'-0.5px',marginBottom:14 }}>Ready to start?</h2>
          <p style={{ fontSize:15,color:T.muted,marginBottom:32,lineHeight:1.75 }}>Book your free demo call. I'll review your presence and show you what your website could look like - no commitment required.</p>
          <Link to="/contact" style={{ display:'inline-flex',alignItems:'center',gap:8,background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:15,padding:'14px 36px',borderRadius:14,boxShadow:`0 8px 28px rgba(37,99,235,0.35)` }}>
            Book Free Demo <ArrowRight size={16}/>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
