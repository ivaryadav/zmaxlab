import { useSEO } from '@/lib/useSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Code, Globe, CheckCircle2, Calendar } from 'lucide-react'

const GS = { fontFamily: "'Space Grotesk',sans-serif" }
const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay } })

const VALUES = [
  { icon: <Heart size={20}/>, color: '#f472b6', title: 'Healthcare First', desc: 'Every decision Ã¢ÂÂ design, copy, features Ã¢ÂÂ is made through the lens of what helps practitioners get more patients.' },
  { icon: <Code size={20}/>, color: '#1b6fff', title: 'Hand-Coded Quality', desc: 'No WordPress, no templates, no page builders. Every line of code is written for your specific practice.' },
  { icon: <Globe size={20}/>, color: '#00c896', title: 'Transparent Pricing', desc: 'One price. No surprises. No hidden fees, no upsells on calls, no nickel-and-diming. $500 is $500.' },
]

export default function AboutPage() {
  const aboutSchema = [{"@context":"https://schema.org","@type":"Person","name":"Ravi","jobTitle":"Healthcare Web Designer & NPI Website Specialist","description":"Ravi personally builds every custom healthcare website for NPI-registered practitioners in the USA. 60+ sites delivered. $500 flat fee. 7-day guarantee.","url":"https://zmaxlab.site/about","worksFor":{"@type":"Organization","name":"ZmaxLab","url":"https://zmaxlab.site"},"knowsAbout":["Healthcare Website Design","NPI Practitioner Websites","Nurse Practitioner Websites","Medical SEO","HIPAA-Aware Web Design"]}]
    useSEO({
        title: 'About Ravi Ã¢ÂÂ Healthcare Web Designer for Nurse Practitioners & NPI Practitioners | ZmaxLab',
            description: 'Meet Ravi, founder of ZmaxLab. He personally builds every $500 healthcare website for NPI-registered practitioners Ã¢ÂÂ nurse practitioners, PAs, mental health providers. 60+ sites. 7-day guarantee.',
                canonical: 'https://zmaxlab.site/about',
                    schema: aboutSchema
                      })
  return (
    <div style={{ background: '#07091f' }}>
      {/* HERO */}
      <section style={{ padding: 'clamp(120px,14vw,160px) 5% clamp(64px,8vw,96px)', background: 'linear-gradient(155deg,#03051a,#07091f)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 80% at 30% 50%,rgba(27,111,255,0.1) 0%,transparent 65%)' }}/>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <motion.div {...fadeUp()}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)', color: '#34d399', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, padding: '5px 14px', borderRadius: 999, marginBottom: 20 }}>
                About the Founder
              </span>
              <h1 style={{ ...GS, fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 22 }}>
                Hi, I'm Ravi.<br/>
                <span style={{ background: 'linear-gradient(135deg,#1b6fff,#00c896)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>I build websites for healthcare practitioners.</span>
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 16 }}>
                I've spent years watching brilliant healthcare practitioners struggle to get found online Ã¢ÂÂ not because they're not good at what they do, but because no affordable digital option existed for solo practitioners.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 28 }}>
                ZmaxLab exists to fix that. One person, one mission: give every NPI-registered practitioner across all 50 US states a website that actually works.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(27,111,255,0.3)' }}>
                  Work With Me <ArrowRight size={15}/>
                </Link>
                <a href="https://calendly.com/ravi9235kumar/30min" target="_blank" rel="noreferrer" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(27,111,255,0.3)', textDecoration: 'none' }}>
                  <Calendar size={16} /> Book a Free 30-Min Call with Ravi
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="about-card">
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                  <div style={{ position: 'relative' }}>
                    <img src="/ravi.jpg" alt="Ravi Yadav - Founder ZmaxLab" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '3px solid transparent', backgroundImage: 'linear-gradient(#07091f,#07091f), linear-gradient(135deg,#1b6fff,#00c896)', backgroundOrigin: 'border-box', backgroundClip: 'content-box,border-box', boxShadow: '0 8px 32px rgba(27,111,255,0.3)' }}/>
                    <div style={{ position: 'absolute', bottom: 4, right: 4, width: 20, height: 20, borderRadius: '50%', background: '#00c896', border: '2px solid #07091f' }}/>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{ ...GS, fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Ravi Kumar</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Founder, ZmaxLab</div>
                  <div style={{ fontSize: 13, color: '#00c896' }}>ravi@zmaxlab.site</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { label: 'Experience', value: '6+ years web development' },
                    { label: 'Specialty', value: 'Healthcare digital presence' },
                    { label: 'Sites Built', value: '60+ NPI practitioner sites' },
                    { label: 'Response Time', value: 'Email within 2 hours' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.about-card{display:none!important}}`}</style>
      </section>

      {/* STORY */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 5%', background: '#03051a' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#34d399', display: 'block', marginBottom: 12 }}>The Story</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 28 }}>Why I built ZmaxLab</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                'A nurse practitioner I knew had just opened her own practice after 10 years working in a hospital. She was incredible at her job Ã¢ÂÂ patients loved her, referrals were strong. But online? She was invisible. Her only web presence was a 2-page PDF resume.',
                'She went to a local web agency. They quoted her $6,500 for a basic website and $800/month for "digital marketing." She turned them down. She tried Squarespace. She spent 3 weekends on it and ended up with something that looked like a 2012 company intranet.',
                'That\'s when I stepped in. I built her a custom website in 5 days for $500. Within 3 months, she was ranking #3 for "family nurse practitioner [city]" and getting 4Ã¢ÂÂ6 new patient inquiries per week from Google alone.',
                'She told two colleagues. Then three more. Then I realised this was a real problem Ã¢ÂÂ and I was in a unique position to solve it for a lot of practitioners who had the same story.',
                'That\'s ZmaxLab. No frills. No inflated agency pricing. Just one person who builds every single website personally, with deep knowledge of what makes healthcare practitioners get found and chosen by patients.',
              ].map((p, i) => (
                <motion.p key={i} {...fadeUp(i * 0.07)} style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>{p}</motion.p>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.2)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 20 }}>
            {[
              { n: '60+', label: 'Sites Delivered' },
              { n: '$500', label: 'Flat Fee, Always' },
              { n: '7 Days', label: 'Guaranteed' },
              { n: '100%', label: 'NPI-Focused' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ ...GS, fontSize: 36, fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: 6 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 5%', background: '#07091f' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#5b87ff', display: 'block', marginBottom: 12 }}>My Values</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>How I work</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {VALUES.map((v, i) => (
              <motion.div key={v.title} {...fadeUp(i * 0.1)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 28 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: v.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: v.color }}>{v.icon}</div>
                <h3 style={{ ...GS, fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 5%', background: '#03051a' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ background: 'linear-gradient(135deg,rgba(27,111,255,0.08),rgba(0,200,150,0.06))', border: '1px solid rgba(27,111,255,0.2)', borderRadius: 24, padding: 'clamp(36px,5vw,52px)' }}>
            <h2 style={{ ...GS, fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 20 }}>My promise to every practitioner</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              {[
                'I will personally build every page of your website Ã¢ÂÂ nothing is outsourced',
                'I will respond to every email within 2 hours during US business hours (EST/CST/PST)',
                'If your site isn\'t live in 7 days, you get a full refund, no questions asked',
                'I will never recommend a service you don\'t genuinely need',
                'You will own your website completely Ã¢ÂÂ source code, hosting, everything',
              ].map(p => (
                <div key={p} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: '#00c896', flexShrink: 0, marginTop: 2 }}/>
                  <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '13px 28px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(27,111,255,0.3)' }}>
                Let's Work Together <ArrowRight size={15}/>
              </Link>
              <a href="https://calendly.com/ravi9235kumar/30min" target="_blank" rel="noreferrer" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '13px 28px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(27,111,255,0.3)', textDecoration: 'none' }}>
                <Calendar size={16} /> Book a Free 30-Min Call with Ravi
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
