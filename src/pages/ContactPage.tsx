import { useState, useRef } from 'react'
import { ArrowRight, Check, Mail, Clock, ShieldCheck } from 'lucide-react'
import { T, MONO, TYPE } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, Display, H2, Lead, Mono, Grad, Pill, rise, motion } from '@/components/ui/kit'

const SPECIALTIES = ['Nurse Practitioner','Physician Assistant','Mental Health NP / Therapist','Chiropractor','Dentist','Physical Therapist','Occupational Therapist','Psychiatric NP','Functional Medicine MD','LCSW / Mental Health Therapist','Other NPI Practitioner']
const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

function gtagEvent(name: string, params: Record<string, string | number | boolean>) {
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', name, params)
}

const fieldWrap: React.CSSProperties = { marginBottom: 22 }
const labelCss: React.CSSProperties = {
  fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
  color: T.faint, display: 'block', marginBottom: 9,
}
const inputCss: React.CSSProperties = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: `1px solid ${T.hairlineStrong}`, borderRadius: 0,
  padding: '11px 0', fontSize: 16, color: T.text, outline: 'none',
  fontFamily: 'inherit', transition: 'border-color .3s',
}

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', specialty:'', practice:'', state:'', message:'', service:'website' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const started = useRef(false)

  const touch = () => {
    if (!started.current) {
      started.current = true
      gtagEvent('form_start', { form_id:'contact_demo', form_name:'Free Demo Form', page_category:'contact' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
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
      } else setError('Something went wrong. Please email ravi@zmaxlab.site directly.')
    } catch {
      setError('Network error. Please try again, or email ravi@zmaxlab.site.')
    }
    setLoading(false)
  }

  useSEO({
    title: 'Contact | Book a Free Demo - ZmaxLab Healthcare Web Design',
    description: 'Book a free 20-minute demo. Custom healthcare websites for NPI-registered practitioners - $500 flat, live in 7 business days.',
    canonical: 'https://zmaxlab.site/contact',
    schema: [{"@context":"https://schema.org","@type":"LocalBusiness","name":"ZmaxLab","description":"Custom healthcare website design for NPI-registered practitioners. $500 flat fee.","url":"https://zmaxlab.site","email":"ravi@zmaxlab.site","priceRange":"$500","serviceArea":{"@type":"Country","name":"United States"}}],
  })

  return (
    <>
      <section style={{ paddingTop: 'clamp(118px,13vw,172px)', paddingBottom: 'clamp(40px,5vw,64px)' }}>
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 760 }}>
            <Pill>Free 20-minute demo</Pill>
            <Display style={{ marginBottom: 24 }}>
              Let's talk about<br />your <Grad>practice</Grad>.
            </Display>
            <Lead style={{ maxWidth: 520 }}>
              Twenty minutes, no obligation, nothing to prepare. I will walk you through what a
              custom site for your specialty would look like - and tell you honestly if it is not a fit.
            </Lead>
          </motion.div>
        </Shell>
      </section>

      <Section pad="clamp(24px,4vw,56px)">
        <Shell>
          <div className="zx-sticky">
            {/* FORM */}
            <motion.div {...rise()} style={{ order: 1 }}>
              {sent ? (
                <div style={{ borderTop: `2px solid ${T.emerald}`, paddingTop: 30 }}>
                  <Check size={30} style={{ color: T.emerald, marginBottom: 18 }} />
                  <H2 style={{ marginBottom: 14, fontSize: 'clamp(24px,3vw,34px)' }}>Message received.</H2>
                  <Lead style={{ maxWidth: 420 }}>
                    I read every enquiry personally and reply within one business day -
                    usually much sooner.
                  </Lead>
                </div>
              ) : (
                <form onSubmit={handleSubmit} onFocus={touch}>
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} />

                  <div style={fieldWrap}>
                    <label style={labelCss} htmlFor="f-name">Your name</label>
                    <input id="f-name" required style={inputCss} value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={e => (e.target.style.borderBottomColor = T.blue)}
                      onBlur={e => (e.target.style.borderBottomColor = T.hairlineStrong)} />
                  </div>

                  <div style={fieldWrap}>
                    <label style={labelCss} htmlFor="f-email">Email address</label>
                    <input id="f-email" type="email" required style={inputCss} value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={e => (e.target.style.borderBottomColor = T.blue)}
                      onBlur={e => (e.target.style.borderBottomColor = T.hairlineStrong)} />
                  </div>

                  <div className="zx-split" style={{ gap: 22 }}>
                    <div style={fieldWrap}>
                      <label style={labelCss} htmlFor="f-spec">Specialty</label>
                      <select id="f-spec" required style={{ ...inputCss, appearance: 'none', cursor: 'pointer' }}
                        value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })}>
                        <option value="">Select...</option>
                        {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div style={fieldWrap}>
                      <label style={labelCss} htmlFor="f-state">State</label>
                      <select id="f-state" required style={{ ...inputCss, appearance: 'none', cursor: 'pointer' }}
                        value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}>
                        <option value="">Select...</option>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={fieldWrap}>
                    <label style={labelCss} htmlFor="f-practice">Practice name</label>
                    <input id="f-practice" style={inputCss} value={form.practice}
                      onChange={e => setForm({ ...form, practice: e.target.value })}
                      onFocus={e => (e.target.style.borderBottomColor = T.blue)}
                      onBlur={e => (e.target.style.borderBottomColor = T.hairlineStrong)} />
                  </div>

                  <div style={{ ...fieldWrap, marginBottom: 30 }}>
                    <label style={labelCss} htmlFor="f-msg">Anything you want me to know <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                    <textarea id="f-msg" rows={3} style={{ ...inputCss, resize: 'vertical' }} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={e => (e.target.style.borderBottomColor = T.blue)}
                      onBlur={e => (e.target.style.borderBottomColor = T.hairlineStrong)} />
                  </div>

                  {error && (
                    <p style={{ fontSize: 14, color: T.rose, marginBottom: 18 }}>{error}</p>
                  )}

                  <button type="submit" disabled={loading} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: T.blue, color: '#fff', fontSize: 15, fontWeight: 700,
                    padding: '15px 30px', borderRadius: 999, border: 'none',
                    cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.6 : 1,
                    fontFamily: 'inherit',
                  }}>
                    {loading ? 'Sending...' : <>Book my free demo <ArrowRight size={17} /></>}
                  </button>

                  <p style={{ fontSize: 12.5, color: T.faint, marginTop: 18, lineHeight: 1.6, maxWidth: 420 }}>
                    Your details are used only to reply to this enquiry. No list, no newsletter, no sharing.
                  </p>
                </form>
              )}
            </motion.div>

            {/* ASIDE */}
            <motion.div {...rise(0.1)} style={{ order: 0 }}>
              <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 20 }}>
                What happens next
              </Mono>
              {[
                [Mail, 'I reply personally', 'Within one business day, usually sooner. No auto-responder, no sales sequence.'],
                [Clock, 'We book twenty minutes', 'A short call about your specialty, your market, and what the build would involve.'],
                [ShieldCheck, 'You decide, with no pressure', 'If it is not a fit, I will tell you on the call rather than sell you something.'],
              ].map(([Icon, title, body], i) => {
                const I = Icon as typeof Mail
                return (
                  <div key={title as string} style={{
                    display: 'grid', gridTemplateColumns: '30px 1fr', gap: 14,
                    padding: '20px 0',
                    borderTop: i === 0 ? `1px solid ${T.hairlineStrong}` : `1px solid ${T.hairline}`,
                  }}>
                    <I size={17} style={{ color: T.blue, marginTop: 3 }} />
                    <div>
                      <h3 style={{ fontSize: 16.5, fontWeight: 750, letterSpacing: '-0.02em', marginBottom: 6 }}>{title as string}</h3>
                      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body as string}</p>
                    </div>
                  </div>
                )
              })}

              <div style={{ marginTop: 34, padding: '26px 0', borderTop: `1px solid ${T.hairlineStrong}` }}>
                <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 14 }}>
                  Prefer email?
                </Mono>
                <a href="mailto:ravi@zmaxlab.site" className="zx-link-underline"
                  style={{ fontSize: TYPE.h3, fontWeight: 750, letterSpacing: '-0.02em', color: T.text }}>
                  ravi@zmaxlab.site
                </a>
              </div>
            </motion.div>
          </div>
        </Shell>
      </Section>

      <Section dark pad="clamp(64px,8vw,104px)">
        <Shell>
          <motion.div {...rise()} style={{ display: 'flex', gap: 26, flexWrap: 'wrap' }}>
            {['$500 flat - no hidden fees', 'Live in 7 days or refunded', 'Source code delivered to you', 'No contract'].map(t => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <Check size={14} style={{ color: T.primaryBright }} />
                <Mono style={{ color: T.onDarkMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t}</Mono>
              </span>
            ))}
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
