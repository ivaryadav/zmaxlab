import { useState, useRef } from 'react'
import { ArrowRight, Check, Mail, Clock, ShieldCheck } from 'lucide-react'
import { T, MONO, TYPE } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, Display, H2, Lead, Mono, Grad, rise, motion } from '@/components/ui/kit'

const SPECIALTIES = ['Nurse Practitioner','Physician Assistant','Mental Health NP / Therapist','Chiropractor','Dentist','Physical Therapist','Occupational Therapist','Psychiatric NP','Functional Medicine MD','LCSW / Mental Health Therapist','Other NPI Practitioner']
const US_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

function gtagEvent(name: string, params: Record<string, string | number | boolean>) {
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', name, params)
}

const fieldWrap: React.CSSProperties = { marginBottom: 16 }
const labelCss: React.CSSProperties = {
  fontFamily: MONO, fontSize: 12.5, fontWeight: 600, letterSpacing: '0.01em',
  color: T.text, display: 'block', marginBottom: 6,
}
const inputCss: React.CSSProperties = {
  width: '100%', background: '#fff',
  border: `1px solid ${T.hairlineStrong}`, borderRadius: 10,
  padding: '12px 14px', fontSize: 15.5, color: T.text, outline: 'none',
  fontFamily: 'inherit', lineHeight: 1.4,
  transition: 'border-color .25s, box-shadow .25s',
}
const focusOn = (e: { target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }) => {
  e.target.style.borderColor = T.primary
  e.target.style.boxShadow = `0 0 0 3px ${T.primary}22`
}
const focusOff = (e: { target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }) => {
  e.target.style.borderColor = T.hairlineStrong
  e.target.style.boxShadow = 'none'
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
      <section style={{
        position: 'relative', overflow: 'hidden',
        paddingTop: 'clamp(168px,17vw,232px)', paddingBottom: 'clamp(72px,9vw,124px)',
      }}>
        <img src="/img/contact-bg.jpg" alt="" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(7,37,58,0.95) 0%, rgba(7,37,58,0.86) 42%, rgba(10,74,82,0.62) 72%, rgba(11,122,110,0.34) 100%)',
        }} />
        <Shell style={{ position: 'relative' }}>
          <motion.div {...rise()} style={{ maxWidth: 760 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.22)',
              color: '#fff', fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em',
              textTransform: 'uppercase', fontWeight: 600, padding: '7px 14px',
              borderRadius: 999, marginBottom: 22, backdropFilter: 'blur(6px)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.primaryBright }} />
              Free 20-minute demo
            </span>
            <Display style={{ marginBottom: 24, color: T.onDark }}>
              Let's talk about your <Grad>practice</Grad>.
            </Display>
            <Lead dark style={{ maxWidth: 540 }}>
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
                <form onSubmit={handleSubmit} onFocus={touch} style={{
                  background: T.surface, border: `1px solid ${T.hairline}`,
                  borderRadius: 18, padding: 'clamp(22px,3vw,32px)',
                }}>
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} />

                  <div style={fieldWrap}>
                    <label style={labelCss} htmlFor="f-name">Your name <span style={{ color: T.rose }}>*</span></label>
                    <input id="f-name" required style={inputCss} value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={focusOn} onBlur={focusOff} />
                  </div>

                  <div style={fieldWrap}>
                    <label style={labelCss} htmlFor="f-email">Email address <span style={{ color: T.rose }}>*</span></label>
                    <input id="f-email" type="email" required style={inputCss} value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={focusOn} onBlur={focusOff} />
                  </div>

                  <div className="zx-split" style={{ gap: 22 }}>
                    <div style={fieldWrap}>
                      <label style={labelCss} htmlFor="f-spec">Specialty <span style={{ color: T.rose }}>*</span></label>
                      <select id="f-spec" required style={{
                        ...inputCss, appearance: 'none', cursor: 'pointer', paddingRight: 36,
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%23073' stroke-width='1.6' stroke-linecap='round'/></svg>")`,
                        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 13px center',
                      }}
                        value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })}>
                        <option value="">Select...</option>
                        {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div style={fieldWrap}>
                      <label style={labelCss} htmlFor="f-state">State <span style={{ color: T.rose }}>*</span></label>
                      <select id="f-state" required style={{
                        ...inputCss, appearance: 'none', cursor: 'pointer', paddingRight: 36,
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%23073' stroke-width='1.6' stroke-linecap='round'/></svg>")`,
                        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 13px center',
                      }}
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
                      onFocus={focusOn} onBlur={focusOff} />
                  </div>

                  <div style={{ ...fieldWrap, marginBottom: 30 }}>
                    <label style={labelCss} htmlFor="f-msg">Anything you want me to know <span style={{ fontWeight: 400, color: T.faint }}>(optional)</span></label>
                    <textarea id="f-msg" rows={4} style={{ ...inputCss, resize: 'vertical' }} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={focusOn} onBlur={focusOff} />
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

              <div style={{ marginTop: 30, borderRadius: 20, padding: 'clamp(24px,3vw,34px)', background: T.gradPanel }}>
                <div style={{ fontSize: 'clamp(30px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.035em', color: T.primaryDeep, lineHeight: 1 }}>
                  $500
                </div>
                <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginTop: 10, marginBottom: 18 }}>
                  Flat, one payment
                </Mono>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: T.muted, margin: 0 }}>
                  Half to start, half on launch day once you have approved the live site.
                  Not live in seven business days and you are refunded.
                </p>
              </div>

              <div style={{ marginTop: 30, padding: '26px 0', borderTop: `1px solid ${T.hairlineStrong}` }}>
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

      <Section tint pad="clamp(34px,4vw,52px)">
        <Shell>
          <motion.div {...rise()} style={{ display: 'flex', gap: 26, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['$500 flat - no hidden fees', 'Live in 7 days or refunded', 'Source code delivered to you', 'No contract'].map(t => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <Check size={14} style={{ color: T.primary }} />
                <Mono style={{ color: T.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t}</Mono>
              </span>
            ))}
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
