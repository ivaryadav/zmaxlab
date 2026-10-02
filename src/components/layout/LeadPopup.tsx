import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { T, MONO, EASE } from '@/lib/theme'

const SPECIALTIES = ['Nurse Practitioner', 'Physician Assistant', 'Mental Health NP / Therapist', 'Chiropractor', 'Dentist', 'Physical Therapist', 'Occupational Therapist', 'Psychiatric NP', 'Functional Medicine MD', 'LCSW / Mental Health Therapist', 'Other NPI Practitioner']

// Pages where a lead popup would be redundant or rude to interrupt.
const EXCLUDED = ['/contact', '/pay-now', '/privacy', '/terms']
const SEEN_KEY = 'zx_lead_popup_seen'
const DELAY_MS = 10000

function gtagEvent(name: string, params: Record<string, string | number | boolean>) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params)
}

const inputCss: React.CSSProperties = {
  width: '100%', background: '#fff',
  border: `1px solid ${T.hairlineStrong}`, borderRadius: 10,
  padding: '12px 14px', fontSize: 15, color: T.text, outline: 'none',
  fontFamily: 'inherit', lineHeight: 1.4,
  transition: 'border-color .25s, box-shadow .25s',
}
const focusOn = (e: { target: HTMLInputElement | HTMLSelectElement }) => {
  e.target.style.borderColor = T.primary
  e.target.style.boxShadow = `0 0 0 3px ${T.primary}22`
}
const focusOff = (e: { target: HTMLInputElement | HTMLSelectElement }) => {
  e.target.style.borderColor = T.hairlineStrong
  e.target.style.boxShadow = 'none'
}

export default function LeadPopup() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', specialty: '' })
  const pathRef = useRef(pathname)
  const shownRef = useRef(false)

  useEffect(() => { pathRef.current = pathname }, [pathname])

  useEffect(() => {
    if (localStorage.getItem(SEEN_KEY)) return
    const timer = setTimeout(() => {
      if (shownRef.current) return
      if (EXCLUDED.includes(pathRef.current)) return
      shownRef.current = true
      localStorage.setItem(SEEN_KEY, '1')
      setOpen(true)
      gtagEvent('popup_shown', { form_id: 'popup_lead', page_category: pathRef.current })
    }, DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    gtagEvent('form_submit', { form_id: 'popup_lead', form_name: 'Popup Lead Form', specialty: form.specialty, page_category: pathRef.current })
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '5a1bc976-474a-422f-bdb3-0c7f11eaed3d',
          subject: `New ZmaxLab popup lead - ${form.name} (${form.specialty})`,
          from_name: form.name, email: form.email, specialty: form.specialty,
          source: 'timed_popup', page: pathRef.current, replyto: form.email,
        }),
      })
      const data = await res.json()
      if (data.success) {
        gtagEvent('qualify_lead', { form_id: 'popup_lead', form_name: 'Popup Lead Form', specialty: form.specialty, page_category: pathRef.current, lead_status: 'new', method: 'popup_form' })
        setSent(true)
        setTimeout(close, 2600)
      } else setError('Something went wrong. Please try again in a moment.')
    } catch {
      setError('Network error. Please check your connection and try again.')
    }
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(4,13,23,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          }}>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }} transition={{ duration: 0.45, ease: EASE }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative', width: '100%', maxWidth: 440, background: '#fff',
              borderRadius: 24, overflow: 'hidden', boxShadow: '0 60px 140px rgba(4,13,23,0.45)',
            }}>
            {/* decorative gradient accent, echoing the hero panels elsewhere on the site */}
            <div style={{ height: 6, background: T.gradBtn }} />

            <button onClick={close} aria-label="Close" style={{
              position: 'absolute', top: 18, right: 18, width: 34, height: 34, borderRadius: '50%',
              border: `1px solid ${T.hairline}`, background: '#fff', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.faint, zIndex: 1,
            }}>
              <X size={16} />
            </button>

            <div style={{ padding: 'clamp(30px,5vw,42px) clamp(26px,5vw,38px) clamp(30px,5vw,38px)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 48, height: 48, borderRadius: '50%', background: T.primaryTint, marginBottom: 18,
                  }}>
                    <Check size={22} style={{ color: T.primaryDeep }} />
                  </span>
                  <h3 style={{ fontFamily: 'Newsreader,Georgia,serif', fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em', margin: '0 0 10px' }}>
                    Got it - talk soon.
                  </h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: T.muted, margin: 0 }}>
                    I read every enquiry personally and reply within one business day.
                  </p>
                </div>
              ) : (
                <>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: T.primaryTint, color: T.primaryDeep,
                    fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase',
                    fontWeight: 700, padding: '6px 12px', borderRadius: 999, marginBottom: 18,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.primaryBright }} />
                    Before you go
                  </span>
                  <h3 style={{ fontFamily: 'Newsreader,Georgia,serif', fontSize: 'clamp(22px,3vw,26px)', fontWeight: 600, letterSpacing: '-0.018em', lineHeight: 1.2, margin: '0 0 10px' }}>
                    Want to see your site before you pay for it?
                  </h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: T.muted, margin: '0 0 24px' }}>
                    Twenty minutes, no obligation. Leave your details and I will show you a live
                    mockup for your specialty.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} />
                    <div style={{ marginBottom: 12 }}>
                      <input required placeholder="Your name" style={inputCss} value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={focusOn} onBlur={focusOff} />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <input required type="email" placeholder="Email address" style={inputCss} value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={focusOn} onBlur={focusOff} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <select required style={{
                        ...inputCss, appearance: 'none', cursor: 'pointer', paddingRight: 36, color: form.specialty ? T.text : T.faint,
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%23073' stroke-width='1.6' stroke-linecap='round'/></svg>")`,
                        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 13px center',
                      }}
                        value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })}
                        onFocus={focusOn} onBlur={focusOff}>
                        <option value="">Your specialty</option>
                        {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {error && <p style={{ fontSize: 13, color: T.rose, marginBottom: 14 }}>{error}</p>}

                    <button type="submit" disabled={loading} style={{
                      width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                      background: T.gradBtn, color: '#fff', fontSize: 15, fontWeight: 700,
                      padding: '14px 24px', borderRadius: 12, border: 'none',
                      cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
                      fontFamily: 'inherit', boxShadow: '0 10px 26px rgba(11,156,135,0.32)',
                    }}>
                      {loading ? 'Sending...' : <>Request my preview <ArrowRight size={16} /></>}
                    </button>
                  </form>

                  <button onClick={close} style={{
                    display: 'block', margin: '16px auto 0', background: 'none', border: 'none',
                    fontSize: 13, color: T.faint, cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    Not right now
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
