import { useState } from 'react'
import { useSEO } from '@/lib/useSEO'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageSquare, Clock, CheckCircle2, Send, Calendar } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const GS = { fontFamily: "'Space Grotesk',sans-serif" }
const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay } })

const SPECIALTIES = ['Nurse Practitioner','Physician Assistant','Mental Health NP','Chiropractor','Dentist','Physical Therapist','Occupational Therapist','Other NPI Practitioner']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', specialty: '', practice: '', message: '', service: 'website' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '5a1bc976-474a-422f-bdb3-0c7f11eaed3d',
          subject: `New ZmaxLab enquiry – ${form.name} (${form.specialty})`,
          from_name: form.name,
          email: form.email,
          phone: form.phone,
          specialty: form.specialty,
          practice: form.practice,
          service: form.service,
          message: form.message || '(no message)',
          replyto: form.email,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setError('Something went wrong. Please email ravi@zmaxlab.site directly.')
      }
    } catch {
      setError('Network error. Please try again or email ravi@zmaxlab.site.')
    }
    setLoading(false)
  }

  useSEO({ title: 'Contact & Free Demo | ZmaxLab – Healthcare Website Design', description: 'Book a free 20-minute demo with Ravi. Get a custom healthcare website for $500 flat. NPI practitioners in the USA. 7-day live guarantee.', canonical: 'https://zmaxlab.site/contact' })
  return (
    <div style={{ background: '#07091f' }}>

      {/* HERO */}
      <section style={{ padding: 'clamp(120px,14vw,160px) 5% clamp(64px,8vw,96px)', background: 'linear-gradient(155deg,#03051a,#07091f)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 70% at 70% 50%,rgba(27,111,255,0.1) 0%,transparent 65%)' }}/>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div {...fadeUp()} style={{ maxWidth: 640 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)', color: '#34d399', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, padding: '5px 14px', borderRadius: 999, marginBottom: 20 }}>
              Free Demo · Zero Obligation
            </span>
            <h1 style={{ ...GS, fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 18 }}>
              Let's build your<br/>
              <span style={{ color: '#00c896' }}>healthcare website.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 520, marginBottom: 28 }}>
              Fill in the form and I'll get back to you within 2 hours with a personalised demo. No sales pitch — just a look at what your website will look like.
            </p>
            <motion.div {...fadeUp(0.15)} style={{ display: 'inline-flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '20px 24px', display: 'inline-flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src="/ravi.jpg" alt="Ravi" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(0,200,150,0.4)' }}/>
                  <div>
                    <div style={{ ...GS, fontSize: 14, fontWeight: 700, color: '#fff' }}>Prefer to talk?</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Book a free 30-minute discovery call</div>
                  </div>
                </div>
                <a href="https://calendly.com/ravi9235kumar/30min" target="_blank" rel="noreferrer" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '11px 24px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(27,111,255,0.3)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  <Calendar size={16} /> Book a Free Call
                </a>
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center', display: 'block', marginTop: 4 }}>Or fill the form below ↓</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 5%', background: '#07091f' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 52, alignItems: 'flex-start' }}>

          {/* FORM */}
          <motion.div {...fadeUp()}>
            {sent ? (
              <div style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.25)', borderRadius: 20, padding: 48, textAlign: 'center' }}>
                <CheckCircle2 size={48} style={{ color: '#00c896', margin: '0 auto 20px' }}/>
                <h2 style={{ ...GS, fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Message sent!</h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
                  Thanks {form.name.split(' ')[0]}! I'll review your details and reply within 2 hours with a personalised demo. Check your email and WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 'clamp(28px,4vw,40px)' }}>
                <h2 style={{ ...GS, fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 28 }}>Book Your Free Demo</h2>

                {/* honeypot */}
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Full Name *</Label>
                    <Input required value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Dr. Jane Smith" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 10, height: 44 }}/>
                  </div>
                  <div>
                    <Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Email *</Label>
                    <Input required type="email" value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@mypractice.com" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 10, height: 44 }}/>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Phone / WhatsApp</Label>
                    <Input value={form.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (555) 000-0000" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 10, height: 44 }}/>
                  </div>
                  <div>
                    <Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Specialty *</Label>
                    <select required value={form.specialty} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, specialty: e.target.value }))} style={{ width: '100%', background: 'rgba(30,32,56,0.98)', border: '1px solid rgba(255,255,255,0.12)', color: form.specialty ? '#fff' : 'rgba(255,255,255,0.4)', borderRadius: 10, height: 44, padding: '0 12px', fontSize: 14 }}>
                      <option value="" disabled>Select specialty</option>
                      {SPECIALTIES.map(s => <option key={s} value={s} style={{ background: '#1a1c33' }}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Practice Name</Label>
                  <Input value={form.practice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, practice: e.target.value }))} placeholder="Smith Family Health" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 10, height: 44 }}/>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>I'm interested in:</Label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[['website','$500 Website'],['seo','+ Local SEO'],['social','+ Social Media'],['bundle','Full Bundle']].map(([val, label]) => (
                      <button key={val} type="button" onClick={() => setForm(f => ({ ...f, service: val }))} style={{ padding: '7px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: form.service === val ? '1px solid #1b6fff' : '1px solid rgba(255,255,255,0.12)', background: form.service === val ? 'rgba(27,111,255,0.15)' : 'rgba(255,255,255,0.04)', color: form.service === val ? '#5b87ff' : 'rgba(255,255,255,0.6)', transition: '.2s' }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <Label style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>Message (optional)</Label>
                  <Textarea value={form.message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me about your practice and what you need..." rows={4} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 10, resize: 'vertical' as const }}/>
                </div>

                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#fca5a5', marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading} style={{ ...GS, width: '100%', background: loading ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px', borderRadius: 999, border: 'none', cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : '0 4px 24px rgba(27,111,255,0.3)', transition: '.2s' }}>
                  {loading ? 'Sending...' : <><Send size={16}/>Send & Book Demo</>}
                </button>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 12 }}>I respond within 2 hours. No spam, ever.</p>
              </form>
            )}
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div {...fadeUp(0.15)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28 }}>
              <h3 style={{ ...GS, fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Get in touch directly</h3>
              {[
                { icon: <Mail size={16}/>, label: 'Email', value: 'ravi@zmaxlab.site', href: 'mailto:ravi@zmaxlab.site', color: '#1b6fff' },
                { icon: <Phone size={16}/>, label: 'Phone / WhatsApp', value: '+91 94511 00556', href: 'https://wa.me/919451100556', color: '#25d366' },
                { icon: <MessageSquare size={16}/>, label: 'Response Time', value: 'Within 2 hours', href: null, color: '#a78bfa' },
                { icon: <Clock size={16}/>, label: 'Working Hours', value: 'Mon–Sat, 9am–8pm IST', href: null, color: '#fbbf24' },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: c.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: c.color }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{c.value}</a>
                      : <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{c.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg,rgba(27,111,255,0.08),rgba(0,200,150,0.06))', border: '1px solid rgba(27,111,255,0.2)', borderRadius: 18, padding: 24 }}>
              <h4 style={{ ...GS, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 14 }}>What happens next?</h4>
              {[
                'I review your form and current online presence',
                'Reply within 2 hours with demo examples',
                'We schedule a 20-minute video call',
                'You see your website mockup — zero obligation',
              ].map((s, i) => (
                <div key={s} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(27,111,255,0.2)', border: '1px solid rgba(27,111,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#5b87ff', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: 18, padding: 22, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#34d399', fontWeight: 700, marginBottom: 6 }}>🔒 7-Day Guarantee</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>Your website goes live in 7 days or you get a full refund. No questions asked.</div>
            </div>
          </motion.div>
        </div>
        <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
      </section>
    </div>
  )
}
