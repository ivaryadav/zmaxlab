import { useState, useRef } from 'react'
import { useSEO } from '@/lib/useSEO'
import { GlowCard } from '@/components/ui/spotlight-card'

const toGlow = (c: string): 'blue' | 'purple' | 'green' | 'red' | 'orange' =>
  c === '#7c3aed' ? 'purple' :
  c === '#059669' ? 'green'  :
  c === '#e11d48' ? 'red'    :
  c === '#f59e0b' ? 'orange' : 'blue'
import { motion } from 'framer-motion'
import { Mail, Clock, CheckCircle2, Send, Calendar, Shield } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const T = { bg:'#04060f', card:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.07)', blue:'#2563eb', violet:'#7c3aed', cyan:'#0891b2', green:'#059669', amber:'#f59e0b', text:'#f1f5f9', muted:'rgba(241,245,249,0.5)' }
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({ initial:{ opacity:0, y:28 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true, amount:0.1 }, transition:{ duration:0.7, delay, ease:EASE } })


const SPECIALTIES = ['Nurse Practitioner','Physician Assistant','Mental Health NP / Therapist','Chiropractor','Dentist','Physical Therapist','Occupational Therapist','Psychiatric NP','Functional Medicine MD','LCSW / Mental Health Therapist','Other NPI Practitioner']
const US_STATES   = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

function gtagEvent(eventName: string, params: Record<string, string | number | boolean>) {
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, params)
  }
}

export default function ContactPage() {
  const [form, setForm]       = useState({ name:'', email:'', specialty:'', practice:'', state:'', message:'', service:'website' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const formStartedRef        = useRef(false)

  const handleFirstInteraction = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true
      gtagEvent('form_start', { form_id:'contact_demo', form_name:'Free Demo Form', page_category:'contact' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    gtagEvent('form_submit', { form_id:'contact_demo', form_name:'Free Demo Form', specialty:form.specialty, service:form.service, page_category:'contact' })
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify({
          access_key:'5a1bc976-474a-422f-bdb3-0c7f11eaed3d',
          subject:`New ZmaxLab enquiry - ${form.name} (${form.specialty})`,
          from_name: form.name, email: form.email, specialty: form.specialty,
          practice: form.practice, state: form.state, service: form.service,
          message: form.message || '(no message)', replyto: form.email,
        }),
      })
      const data = await res.json()
      if (data.success) {
        gtagEvent('qualify_lead', { form_id:'contact_demo', form_name:'Free Demo Form', specialty:form.specialty, service:form.service, page_category:'contact', lead_status:'new', method:'contact_form' })
        setSent(true)
      } else {
        setError('Something went wrong. Please email ravi@zmaxlab.site directly.')
      }
    } catch {
      setError('Network error. Please try again or email ravi@zmaxlab.site.')
    }
    setLoading(false)
  }

  const contactSchema = [{"@context":"https://schema.org","@type":"LocalBusiness","name":"ZmaxLab","description":"Affordable custom healthcare website design for NPI-registered practitioners. $500 flat fee.","url":"https://zmaxlab.site","email":"ravi@zmaxlab.site","priceRange":"$500","serviceArea":{"@type":"Country","name":"United States"}}]

  useSEO({
    title: 'Book a Free Demo - Custom Healthcare Website for NPI Practitioners | ZmaxLab',
    description: 'Book a free demo with ZmaxLab. Get a custom $500 healthcare website for your NPI practice - nurse practitioners, PAs, mental health providers, chiropractors. 7-day live guarantee.',
    canonical: 'https://zmaxlab.site/contact',
    schema: contactSchema,
  })

  const inputStyle = { background:'rgba(255,255,255,0.06)', border:`1px solid ${T.border}`, color:T.text, borderRadius:10, height:44 }
  const selectStyle: React.CSSProperties = { width:'100%', background:'rgba(255,255,255,0.06)', border:`1px solid ${T.border}`, borderRadius:10, height:44, padding:'0 12px', fontSize:14, outline:'none', appearance:'none' }

  return (
    <div style={{ background:T.bg, color:T.text, overflowX:'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        padding:'clamp(120px,14vw,160px) 5% clamp(64px,8vw,96px)',
        background:`radial-gradient(ellipse at 70% 50%,rgba(37,99,235,0.11) 0%,transparent 60%),${T.bg}`,
      }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <motion.div {...fadeUp()} style={{ maxWidth:640 }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(5,150,105,0.1)',border:'1px solid rgba(5,150,105,0.25)',borderRadius:999,padding:'5px 14px',marginBottom:22 }}>
              <span style={{ fontSize:10,fontWeight:800,letterSpacing:1,textTransform:'uppercase',color:T.green }}>Free Demo · Zero Obligation</span>
            </div>
            <h1 style={{ fontSize:'clamp(2.2rem,5vw,4rem)',fontWeight:900,lineHeight:1.05,letterSpacing:'-2px',marginBottom:18 }}>
              Let's build your<br/>
              <span style={{ background:`linear-gradient(135deg,${T.blue},${T.violet})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                healthcare website.
              </span>
            </h1>
            <p style={{ fontSize:'clamp(15px,1.5vw,18px)',color:T.muted,lineHeight:1.75,maxWidth:520,marginBottom:28 }}>
              Fill in the form and I'll get back within 2 hours with a personalised demo. No sales pitch - just a look at what your website will look like.
            </p>

            {/* Calendly card */}
            <motion.div {...fadeUp(0.15)}>
              <GlowCard customSize glowColor="blue" className="inline-flex items-center gap-5 flex-wrap" style={{ padding:'18px 24px' }}>
                <div style={{ display:'flex',alignItems:'center',gap:12 }}>
                  <div style={{ width:44,height:44,borderRadius:'50%',background:`linear-gradient(135deg,${T.blue},${T.violet})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:800,color:'#fff',flexShrink:0 }}>R</div>
                  <div>
                    <div style={{ fontSize:14,fontWeight:700,color:T.text }}>Prefer to talk?</div>
                    <div style={{ fontSize:12,color:T.muted }}>Book a free 30-minute discovery call</div>
                  </div>
                </div>
                <a href="https://calendly.com/ravi9235kumar/30min" target="_blank" rel="noreferrer"
                  onClick={() => gtagEvent('qualify_lead', { form_id:'calendly_cta', form_name:'Calendly CTA', page_category:'contact', lead_status:'new', method:'calendly' })}
                  style={{ display:'inline-flex',alignItems:'center',gap:8,background:`linear-gradient(135deg,${T.blue},${T.violet})`,color:'#fff',fontWeight:700,fontSize:14,padding:'11px 22px',borderRadius:12,boxShadow:`0 4px 20px rgba(37,99,235,0.35)`,whiteSpace:'nowrap',textDecoration:'none' }}>
                  <Calendar size={15}/> Book a Free Call
                </a>
              </GlowCard>
              <div style={{ fontSize:12,color:T.muted,marginTop:10 }}>Or fill the form below ↓</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ───────────────────────────────────────────── */}
      <section style={{ padding:'clamp(60px,9vw,96px) 5%' }}>
        <div style={{ maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr clamp(280px,30%,360px)',gap:48,alignItems:'flex-start' }}>

          {/* Form */}
          <motion.div {...fadeUp()}>
            {sent ? (
              <GlowCard customSize glowColor="green" className="p-12 text-center">
                <CheckCircle2 size={48} style={{ color:T.green,margin:'0 auto 20px',display:'block' }}/>
                <h2 style={{ fontSize:24,fontWeight:800,marginBottom:12 }}>Message sent!</h2>
                <p style={{ fontSize:15,color:T.muted,lineHeight:1.75 }}>
                  Thanks {form.name.split(' ')[0]}! I'll review your details and reply within 2 hours with a personalised demo. Check your email inbox.
                </p>
              </GlowCard>
            ) : (
              <GlowCard customSize glowColor="blue" style={{ padding:'clamp(28px,4vw,40px)' }}>
                <h2 style={{ fontSize:22,fontWeight:800,marginBottom:28 }}>Book Your Free Demo</h2>
                <form onSubmit={handleSubmit}>
                  <input type="checkbox" name="botcheck" style={{ display:'none' }} />

                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16 }}>
                    <div>
                      <Label style={{ color:T.muted,fontSize:13,fontWeight:600,marginBottom:6,display:'block' }}>Full Name *</Label>
                      <Input required value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setForm(f => ({ ...f, name:e.target.value })); handleFirstInteraction() }} placeholder="Dr. Jane Smith" style={inputStyle}/>
                    </div>
                    <div>
                      <Label style={{ color:T.muted,fontSize:13,fontWeight:600,marginBottom:6,display:'block' }}>Email Address *</Label>
                      <Input required type="email" value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setForm(f => ({ ...f, email:e.target.value })); handleFirstInteraction() }} placeholder="jane@mypractice.com" style={inputStyle}/>
                    </div>
                  </div>

                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16 }}>
                    <div>
                      <Label style={{ color:T.muted,fontSize:13,fontWeight:600,marginBottom:6,display:'block' }}>Specialty *</Label>
                      <select required value={form.specialty} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, specialty:e.target.value }))} style={{ ...selectStyle, color:form.specialty ? T.text : T.muted }}>
                        <option value="" disabled style={{ background:'#07091f' }}>Select specialty</option>
                        {SPECIALTIES.map(s => <option key={s} value={s} style={{ background:'#07091f',color:T.text }}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label style={{ color:T.muted,fontSize:13,fontWeight:600,marginBottom:6,display:'block' }}>US State *</Label>
                      <select required value={form.state} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, state:e.target.value }))} style={{ ...selectStyle, color:form.state ? T.text : T.muted }}>
                        <option value="" disabled style={{ background:'#07091f' }}>Select your state</option>
                        {US_STATES.map(s => <option key={s} value={s} style={{ background:'#07091f',color:T.text }}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom:16 }}>
                    <Label style={{ color:T.muted,fontSize:13,fontWeight:600,marginBottom:6,display:'block' }}>Practice / Clinic Name</Label>
                    <Input value={form.practice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, practice:e.target.value }))} placeholder="Sunshine Family Clinic" style={inputStyle}/>
                  </div>

                  <div style={{ marginBottom:16 }}>
                    <Label style={{ color:T.muted,fontSize:13,fontWeight:600,marginBottom:6,display:'block' }}>What do you need most?</Label>
                    <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
                      {[['website','New Website'],['seo','Local SEO'],['booking','Online Booking'],['rebrand','Rebrand'],['other','Other']].map(([val,label]) => (
                        <button key={val} type="button" onClick={() => setForm(f => ({ ...f, service:val }))} style={{
                          padding:'7px 16px',borderRadius:999,fontSize:13,fontWeight:600,cursor:'pointer',
                          border:`1px solid ${form.service===val ? T.blue : T.border}`,
                          background: form.service===val ? `rgba(37,99,235,0.18)` : 'rgba(255,255,255,0.04)',
                          color: form.service===val ? '#93bbff' : T.muted,
                          transition:'all .2s',
                        }}>{label}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom:24 }}>
                    <Label style={{ color:T.muted,fontSize:13,fontWeight:600,marginBottom:6,display:'block' }}>Anything else? (optional)</Label>
                    <Textarea value={form.message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, message:e.target.value }))} placeholder="Tell me about your current website, goals, timeline…" rows={4} style={{ background:'rgba(255,255,255,0.06)',border:`1px solid ${T.border}`,color:T.text,borderRadius:10,resize:'none' }}/>
                  </div>

                  {error && <p style={{ color:'#f87171',fontSize:13,marginBottom:16 }}>{error}</p>}

                  <button type="submit" disabled={loading} style={{
                    width:'100%',
                    background: loading ? 'rgba(37,99,235,0.35)' : `linear-gradient(135deg,${T.blue},${T.violet})`,
                    color:'#fff',fontWeight:700,fontSize:16,padding:'14px 0',
                    borderRadius:12,border:'none',cursor:loading ? 'not-allowed' : 'pointer',
                    display:'flex',alignItems:'center',justifyContent:'center',gap:10,
                    boxShadow: loading ? 'none' : `0 6px 24px rgba(37,99,235,0.35)`,
                    transition:'all .3s',
                  }}>
                    {loading ? 'Sending…' : <><Send size={18}/> Get My Free Demo</>}
                  </button>
                  <p style={{ fontSize:12,color:T.muted,textAlign:'center',marginTop:14 }}>No spam, no hard sell. Just your demo.</p>
                </form>
              </GlowCard>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div {...fadeUp(0.15)} style={{ display:'flex',flexDirection:'column',gap:16 }}>
            {[
              { Icon:Clock,    color:T.blue,   title:'Reply within 2 hours',      body:'Reach out any time - I respond fast, usually within 2 hours on business days.' },
              { Icon:Mail,     color:T.violet, title:'ravi@zmaxlab.site',          body:'Email is the best way to reach me. I reply the same day, every day.' },
              { Icon:Calendar, color:T.cyan,   title:'Book a free 30-min call',    body:'Prefer to talk? Schedule directly via Calendly - pick a time that suits your timezone.', link:'https://calendly.com/ravi9235kumar/30min', linkLabel:'Open Calendly →' },
              { Icon:Shield,   color:T.green,  title:'7-Day Guarantee',            body:'Your site goes live in 7 days or you get a full refund. Secure payment via Stripe or PayPal.' },
            ].map((item,i) => (
              <motion.div key={i} {...fadeUp(0.1*i)}>
                <GlowCard customSize glowColor={toGlow(item.color)} className="p-5 flex gap-3.5 items-start">
                  <div style={{ width:36,height:36,borderRadius:10,background:`${item.color}15`,border:`1px solid ${item.color}30`,display:'flex',alignItems:'center',justifyContent:'center',color:item.color,flexShrink:0 }}>
                    <item.Icon size={16}/>
                  </div>
                  <div>
                    <div style={{ fontSize:14,fontWeight:700,color:T.text,marginBottom:4 }}>{item.title}</div>
                    <div style={{ fontSize:13,color:T.muted,lineHeight:1.6 }}>{item.body}</div>
                    {item.link && <a href={item.link} target="_blank" rel="noreferrer" style={{ fontSize:13,color:T.blue,marginTop:6,display:'inline-block',fontWeight:600 }}>{item.linkLabel}</a>}
                  </div>
                </GlowCard>
              </motion.div>
            ))}

            {/* What happens next */}
            <GlowCard customSize glowColor="blue" className="p-5">
              <div style={{ fontSize:13,fontWeight:700,color:T.text,marginBottom:14 }}>What happens next?</div>
              {[
                'I review your form and current online presence',
                'Reply within 2 hours with demo examples',
                'We schedule a 20-minute video call',
                'You see your website mockup - zero obligation',
              ].map((step,i) => (
                <div key={i} style={{ display:'flex',gap:10,marginBottom:10,alignItems:'flex-start' }}>
                  <span style={{ fontSize:11,fontWeight:800,color:T.blue,background:'rgba(37,99,235,0.15)',borderRadius:'50%',width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1 }}>{i+1}</span>
                  <span style={{ fontSize:13,color:T.muted,lineHeight:1.5 }}>{step}</span>
                </div>
              ))}
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
