import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Code, Globe, CheckCircle2, Calendar } from 'lucide-react'
import { useSEO } from '@/lib/useSEO'

const T = { bg:'#04060f', card:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.07)', blue:'#2563eb', violet:'#7c3aed', cyan:'#0891b2', green:'#059669', amber:'#f59e0b', text:'#f1f5f9', muted:'rgba(241,245,249,0.5)' }
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({ initial:{ opacity:0, y:28 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true, amount:0.1 }, transition:{ duration:0.7, delay, ease:EASE } })

function Glass({ children, style, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div style={{ background:T.card, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:`1px solid ${T.border}`, borderRadius:20, ...style }} {...p}>{children}</div>
}

const VALUES = [
  { Icon:Heart,  color:'#e11d48', title:'Healthcare First',       desc:'Every decision - design, copy, features - is made through the lens of what helps practitioners get more patients.' },
  { Icon:Code,   color:T.blue,   title:'Hand-Coded Quality',     desc:'No WordPress, no templates, no page builders. Every line of code is written for your specific practice.' },
  { Icon:Globe,  color:T.green,  title:'Transparent Pricing',    desc:'One price. No surprises. No hidden fees, no upsells on calls, no nickel-and-diming. $500 is $500.' },
]

const STATS = [
  { n:'500+',  label:'Sites Built',          color:T.blue   },
  { n:'4.9★',  label:'Google Rating',        color:T.amber  },
  { n:'48hr',  label:'Avg Delivery Time',    color:T.green  },
  { n:'50',    label:'US States Served',     color:T.violet },
]

const PROMISES = [
  'I will personally build every page of your website - nothing is outsourced',
  'You will receive a design mockup before a single line of code is written',
  'Your website will be live within 7 days of content submission',
  'You will own your website completely - source code, hosting, everything',
  'One post-launch revision is always included at no extra cost',
]

export default function AboutPage() {
  const aboutSchema = [{"@context":"https://schema.org","@type":"Person","name":"Ravi","jobTitle":"Healthcare Web Designer","description":"Ravi personally builds every custom healthcare website for NPI-registered practitioners in the USA. $500 flat fee.","url":"https://zmaxlab.site/about","worksFor":{"@type":"Organization","name":"ZmaxLab","url":"https://zmaxlab.site"},"knowsAbout":["Healthcare Website Design","NPI Practitioner Websites","Medical SEO","HIPAA-Aware Web Design"]}]
  useSEO({
    title: 'About Ravi - Healthcare Web Designer for NPI Practitioners | ZmaxLab',
    description: 'Meet Ravi, founder of ZmaxLab. He personally builds every $500 healthcare website for NPI-registered practitioners - nurse practitioners, PAs, mental health providers. 500+ sites.',
    canonical: 'https://zmaxlab.site/about',
    schema: aboutSchema,
  })

  return (
    <div style={{ background:T.bg, color:T.text, overflowX:'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        padding:'clamp(120px,14vw,160px) 5% clamp(64px,8vw,96px)',
        background:`radial-gradient(ellipse at 60% 40%,rgba(124,58,237,0.1) 0%,transparent 60%),${T.bg}`,
      }}>
        <div style={{ maxWidth:1100,margin:'0 auto',display:'flex',gap:64,alignItems:'center',flexWrap:'wrap' }}>
          <div style={{ flex:'1 1 400px' }}>
            <motion.div {...fadeUp()}>
              <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:`rgba(124,58,237,0.1)`,border:`1px solid rgba(124,58,237,0.25)`,borderRadius:999,padding:'5px 14px',marginBottom:22 }}>
                <span style={{ fontSize:10,fontWeight:800,letterSpacing:1,textTransform:'uppercase',color:T.violet }}>The Person Behind the Sites</span>
              </div>
              <h1 style={{ fontSize:'clamp(2.2rem,5vw,4rem)',fontWeight:900,lineHeight:1.05,letterSpacing:'-2px',marginBottom:18 }}>
                Built by a specialist.<br/>
                <span style={{ background:`linear-gradient(135deg,${T.violet},${T.cyan})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                  For specialists.
                </span>
              </h1>
              <p style={{ fontSize:'clamp(15px,1.5vw,18px)',color:T.muted,lineHeight:1.75,maxWidth:520,marginBottom:32 }}>
                I'm Ravi - the person who personally builds every ZmaxLab website. No agency. No outsourcing. Just a healthcare web specialist who cares deeply about your patients finding you online.
              </p>
              <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
                <Link to="/contact" style={{ display:'inline-flex',alignItems:'center',gap:8,background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:15,padding:'13px 28px',borderRadius:14,boxShadow:`0 8px 28px rgba(37,99,235,0.35)` }}>
                  Work With Me <ArrowRight size={15}/>
                </Link>
                <a href="https://calendly.com/ravi9235kumar/30min" target="_blank" rel="noreferrer" style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.06)',border:`1px solid ${T.border}`,color:T.text,fontWeight:600,fontSize:15,padding:'13px 22px',borderRadius:14 }}>
                  <Calendar size={15}/> Book a Call
                </a>
              </div>
            </motion.div>
          </div>

          {/* Avatar card */}
          <motion.div
            initial={{ opacity:0,x:30 }}
            animate={{ opacity:1,x:0 }}
            transition={{ duration:0.9,delay:0.4,ease:EASE }}
            style={{ flex:'0 0 auto' }}
          >
            <Glass style={{ padding:32,textAlign:'center',minWidth:240 }}>
              <div style={{
                width:96,height:96,borderRadius:'50%',
                background:`linear-gradient(135deg,${T.blue},${T.violet})`,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:32,fontWeight:900,color:'#fff',
                margin:'0 auto 16px',
                boxShadow:`0 8px 32px rgba(37,99,235,0.4)`,
              }}>R</div>
              <div style={{ fontSize:18,fontWeight:800,color:T.text }}>Ravi</div>
              <div style={{ fontSize:13,color:T.muted,marginBottom:16 }}>Founder & Builder</div>
              <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                {[['500+','Sites delivered'],['4.9 ★','Google rating'],['48hr','Avg delivery']].map(([v,l]) => (
                  <div key={l} style={{ display:'flex',justifyContent:'space-between',fontSize:12,padding:'6px 10px',background:'rgba(255,255,255,0.04)',borderRadius:8 }}>
                    <span style={{ color:T.muted }}>{l}</span>
                    <span style={{ color:T.text,fontWeight:700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </Glass>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ROW ────────────────────────────────────────────────── */}
      <section style={{ padding:'48px 5%',borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1000,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:20 }}>
          {STATS.map((s,i) => (
            <motion.div key={s.label} {...fadeUp(i*0.1)}>
              <Glass style={{ padding:'24px',textAlign:'center' }}>
                <div style={{ fontSize:40,fontWeight:900,color:s.color,lineHeight:1,marginBottom:6 }}>{s.n}</div>
                <div style={{ fontSize:13,color:T.muted }}>{s.label}</div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%' }}>
        <div style={{ maxWidth:820,margin:'0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign:'center',marginBottom:48 }}>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.blue,marginBottom:12 }}>The Story</div>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)',fontWeight:900,letterSpacing:'-0.5px' }}>Why I Started ZmaxLab</h2>
          </motion.div>
          <Glass style={{ padding:'clamp(28px,4vw,48px)' }}>
            {[
              "I've spent years watching brilliant healthcare practitioners struggle to get found online - not because they're not good at what they do, but because no affordable digital option existed for solo practitioners.",
              "ZmaxLab exists to fix that. One person, one mission: give every NPI-registered practitioner across all 50 US states a website that actually works.",
              "A nurse practitioner I knew had just opened her own practice after 10 years in a hospital. She was incredible at her job - patients loved her, referrals were strong. But online? She was invisible. Her only web presence was a 2-page PDF resume.",
              "That's when I stepped in. I built her a custom website in 5 days for $500. Within 3 months, she was ranking #3 for 'family nurse practitioner [city]' and getting 4-6 new patient inquiries per week from Google alone.",
              "She told two colleagues. Then three more. Then I realised this was a real problem - and I was in a unique position to solve it for a lot of practitioners who had the same story.",
            ].map((para,i) => (
              <motion.p key={i} {...fadeUp(i*0.08)} style={{ fontSize:'clamp(14px,1.4vw,16px)',color:i===0||i===1 ? T.text : T.muted,lineHeight:1.85,marginBottom:i<4?20:0,fontStyle:i===0?'normal':'normal' }}>
                {para}
              </motion.p>
            ))}
          </Glass>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%',background:'rgba(255,255,255,0.015)',borderTop:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1000,margin:'0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign:'center',marginBottom:48 }}>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.violet,marginBottom:12 }}>What I Believe</div>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)',fontWeight:900,letterSpacing:'-0.5px' }}>Values That Drive Every Build</h2>
          </motion.div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20 }}>
            {VALUES.map((v,i) => (
              <motion.div key={v.title} {...fadeUp(i*0.1)} whileHover={{ y:-5,transition:{duration:0.25} }}>
                <Glass style={{ padding:'28px 24px',height:'100%',border:`1px solid ${v.color}18` }}>
                  <div style={{ width:48,height:48,borderRadius:14,background:`${v.color}15`,border:`1px solid ${v.color}30`,display:'flex',alignItems:'center',justifyContent:'center',color:v.color,marginBottom:16 }}>
                    <v.Icon size={22}/>
                  </div>
                  <h3 style={{ fontSize:17,fontWeight:800,marginBottom:8 }}>{v.title}</h3>
                  <p style={{ fontSize:14,color:T.muted,lineHeight:1.7 }}>{v.desc}</p>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMISES ─────────────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%',borderTop:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:820,margin:'0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign:'center',marginBottom:48 }}>
            <div style={{ fontSize:11,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.green,marginBottom:12 }}>My Commitment</div>
            <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)',fontWeight:900,letterSpacing:'-0.5px' }}>What I Promise Every Client</h2>
          </motion.div>
          <Glass style={{ padding:'clamp(28px,4vw,40px)' }}>
            {PROMISES.map((p,i) => (
              <motion.div key={i} {...fadeUp(i*0.08)} style={{ display:'flex',gap:14,alignItems:'flex-start',padding:'14px 0',borderBottom:i<PROMISES.length-1 ? `1px solid ${T.border}` : 'none' }}>
                <CheckCircle2 size={18} style={{ color:T.green,flexShrink:0,marginTop:2 }}/>
                <span style={{ fontSize:15,color:T.text,lineHeight:1.65 }}>{p}</span>
              </motion.div>
            ))}
          </Glass>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%',textAlign:'center',borderTop:`1px solid ${T.border}` }}>
        <motion.div {...fadeUp()} style={{ maxWidth:600,margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.4rem)',fontWeight:900,letterSpacing:'-0.5px',marginBottom:14 }}>Let's build your practice's future online.</h2>
          <p style={{ fontSize:15,color:T.muted,marginBottom:32,lineHeight:1.75 }}>Book a free 30-minute call. I'll review your current presence and show you exactly what your website could look like.</p>
          <Link to="/contact" style={{ display:'inline-flex',alignItems:'center',gap:8,background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:15,padding:'14px 36px',borderRadius:14,boxShadow:`0 8px 28px rgba(37,99,235,0.35)` }}>
            Book Free Demo <ArrowRight size={16}/>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
