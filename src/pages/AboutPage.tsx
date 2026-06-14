import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Code, Globe, CheckCircle2, Calendar } from 'lucide-react'
import { useSEO } from '@/lib/useSEO'
import { GlowCard } from '@/components/ui/spotlight-card'

const toGlow = (c: string): 'blue' | 'purple' | 'green' | 'red' | 'orange' =>
  c === T.violet || c === '#7c3aed' ? 'purple' :
  c === T.green  || c === '#059669' ? 'green'  :
  c === '#e11d48'                   ? 'red'    :
  c === T.amber  || c === '#f59e0b' ? 'orange' : 'blue'

const T = { bg:'#04060f', card:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.07)', blue:'#2563eb', violet:'#7c3aed', cyan:'#0891b2', green:'#059669', amber:'#f59e0b', text:'#f1f5f9', muted:'rgba(241,245,249,0.5)' }
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({ initial:{ opacity:0, y:28 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true, amount:0.1 }, transition:{ duration:0.7, delay, ease:EASE } })


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
            <GlowCard customSize glowColor="purple" className="p-8 text-center" style={{ minWidth:240 }}>
              <img
                src="/ravi.jpg"
                alt="Ravi – Founder of ZmaxLab"
                style={{
                  width:96,height:96,borderRadius:'50%',
                  objectFit:'cover',objectPosition:'center top',
                  display:'block',margin:'0 auto 16px',
                  border:`2px solid ${T.violet}40`,
                  boxShadow:`0 8px 32px rgba(124,58,237,0.35)`,
                }}
              />
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
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ROW ────────────────────────────────────────────────── */}
      <section style={{ padding:'48px 5%',borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1000,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:20 }}>
          {STATS.map((s,i) => (
            <motion.div key={s.label} {...fadeUp(i*0.1)}>
              <GlowCard customSize glowColor={toGlow(s.color)} className="p-6 text-center">
                <div style={{ fontSize:40,fontWeight:900,color:s.color,lineHeight:1,marginBottom:6 }}>{s.n}</div>
                <div style={{ fontSize:13,color:T.muted }}>{s.label}</div>
              </GlowCard>
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
          <GlowCard customSize glowColor="blue" style={{ padding:'clamp(28px,4vw,48px)' }}>

            {/* Opening */}
            <motion.p {...fadeUp(0.05)} style={{ fontSize:'clamp(15px,1.4vw,17px)',color:T.text,lineHeight:1.85,marginBottom:24 }}>
              I've spent years watching brilliant healthcare practitioners struggle to get found online — not because they're not good at what they do, but because no affordable digital option existed for solo practitioners.
            </motion.p>

            {/* Mission pull-quote */}
            <motion.div {...fadeUp(0.1)} style={{
              borderLeft:`3px solid ${T.blue}`,
              background:'rgba(37,99,235,0.07)',
              borderRadius:'0 12px 12px 0',
              padding:'16px 22px',
              marginBottom:28,
            }}>
              <p style={{ fontSize:'clamp(15px,1.5vw,18px)',fontWeight:700,color:T.text,lineHeight:1.7,margin:0 }}>
                ZmaxLab exists to fix that. One person, one mission: give every NPI-registered practitioner across all 50 US states a website that actually works.
              </p>
            </motion.div>

            {/* Story */}
            <motion.p {...fadeUp(0.15)} style={{ fontSize:'clamp(14px,1.3vw,16px)',color:T.muted,lineHeight:1.85,marginBottom:20 }}>
              A nurse practitioner I knew had just opened her own practice after 10 years in a hospital. She was incredible at her job — patients loved her, referrals were strong. But online? She was invisible. Her only web presence was a 2-page PDF resume.
            </motion.p>

            <motion.p {...fadeUp(0.18)} style={{ fontSize:'clamp(14px,1.3vw,16px)',color:T.muted,lineHeight:1.85,marginBottom:20 }}>
              That's when I stepped in.
            </motion.p>

            {/* Result stats */}
            <motion.div {...fadeUp(0.22)} style={{ display:'flex',gap:12,flexWrap:'wrap',marginBottom:22 }}>
              {[
                { val:'5 days', label:'Website built'       },
                { val:'$500',   label:'Flat fee'            },
                { val:'#3',     label:'Google ranking'      },
                { val:'4-6/wk', label:'New patient leads'   },
              ].map(s => (
                <div key={s.label} style={{
                  background:`${T.green}12`,border:`1px solid ${T.green}30`,
                  borderRadius:12,padding:'10px 18px',textAlign:'center',minWidth:88,
                }}>
                  <div style={{ fontSize:22,fontWeight:900,color:T.green,lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:11,color:T.muted,marginTop:4,whiteSpace:'nowrap' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Conclusion */}
            <motion.p {...fadeUp(0.27)} style={{ fontSize:'clamp(14px,1.3vw,16px)',color:T.muted,lineHeight:1.85,margin:0 }}>
              She told two colleagues. Then three more. Then I realised this was a real problem — and I was in a unique position to solve it for a lot of practitioners who had the same story.
            </motion.p>

          </GlowCard>
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
              <motion.div key={v.title} {...fadeUp(i*0.1)} style={{ height:'100%' }}>
                <GlowCard customSize glowColor={toGlow(v.color)} className="h-full p-7">
                  <div style={{ width:48,height:48,borderRadius:14,background:`${v.color}15`,border:`1px solid ${v.color}30`,display:'flex',alignItems:'center',justifyContent:'center',color:v.color,marginBottom:16 }}>
                    <v.Icon size={22}/>
                  </div>
                  <h3 style={{ fontSize:17,fontWeight:800,marginBottom:8 }}>{v.title}</h3>
                  <p style={{ fontSize:14,color:T.muted,lineHeight:1.7 }}>{v.desc}</p>
                </GlowCard>
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
          <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
            {PROMISES.map((p,i) => (
              <motion.div key={i} {...fadeUp(i*0.07)}>
                <GlowCard customSize glowColor="green" className="p-5">
                  <div style={{ display:'flex',gap:16,alignItems:'flex-start' }}>
                    {/* Numbered badge */}
                    <div style={{
                      width:40,height:40,borderRadius:12,flexShrink:0,
                      background:`${T.green}18`,border:`1px solid ${T.green}40`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                    }}>
                      <CheckCircle2 size={20} style={{ color:T.green }}/>
                    </div>
                    <div style={{ paddingTop:2 }}>
                      <div style={{ fontSize:10,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:T.green,marginBottom:4 }}>
                        Promise {String(i+1).padStart(2,'0')}
                      </div>
                      <p style={{ fontSize:15,color:T.text,lineHeight:1.65,margin:0 }}>{p}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ padding:'80px 5%',textAlign:'center',borderTop:`1px solid ${T.border}` }}>
        <motion.div {...fadeUp()} style={{ maxWidth:600,margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.4rem)',fontWeight:900,letterSpacing:'-0.5px',marginBottom:14 }}>Let's build your practice's future online.</h2>
          <p style={{ fontSize:15,color:T.muted,marginBottom:32,lineHeight:1.75 }}>Book a free 30-minute call. I'll review your current presence and show you exactly what your website could look like.</p>
          <div style={{ display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap' }}>
            <Link to="/contact" style={{ display:'inline-flex',alignItems:'center',gap:8,background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:15,padding:'14px 36px',borderRadius:14,boxShadow:`0 8px 28px rgba(37,99,235,0.35)` }}>
              Book Free Demo <ArrowRight size={16}/>
            </Link>
            <Link to="/#case-studies" style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.06)',border:`1px solid ${T.border}`,color:T.text,fontWeight:600,fontSize:15,padding:'14px 28px',borderRadius:14 }}>
              See Case Studies
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
