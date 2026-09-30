import { useRef, useState } from 'react'
import { ArrowRight, Check, Clock } from 'lucide-react'
import { T, MONO } from '@/lib/theme'

// Web3Forms key - submissions are emailed to the inbox tied to this key (never shown on the site).
const WEB3FORMS_KEY = '5a1bc976-474a-422f-bdb3-0c7f11eaed3d'

const SPECIALTIES = [
  'Nurse Practitioner', 'Physician Assistant', 'Chiropractor', 'Mental Health / Therapist',
  'Psychiatric NP', 'Dentist', 'Physical Therapist', 'Primary Care / Family Medicine',
  'Pain Management', 'Other',
]

function gtagEvent(name: string, params: Record<string, string | number | boolean>) {
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', name, params)
}

const inputCss: React.CSSProperties = {
  width: '100%', background: '#fff',
  border: '1px solid rgba(7,37,58,0.16)', borderRadius: 10,
  padding: '11px 13px', fontSize: 15, color: T.text, outline: 'none',
  fontFamily: 'inherit', lineHeight: 1.4,
  transition: 'border-color .25s, box-shadow .25s',
}
const focusOn = (e: { target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }) => {
  e.target.style.borderColor = T.primary
  e.target.style.boxShadow = `0 0 0 3px ${T.primary}22`
}
const focusOff = (e: { target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }) => {
  e.target.style.borderColor = 'rgba(7,37,58,0.16)'
  e.target.style.boxShadow = 'none'
}

export default function HeroLeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', specialty: '', looking: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const started = useRef(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!started.current) {
      started.current = true
      gtagEvent('form_start', { form_id: 'hero_quick', form_name: 'Hero Quick Form', page_category: 'home' })
    }
    setForm(f => ({ ...f, [k]: e.target.value }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.phone.replace(/\D/g, '').length < 10) { setError('Please enter a valid cell phone number.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New Inquiry',
          from_name: 'ZmaxLab Website',
          name: form.name,
          cell_phone: form.phone,
          specialty: form.specialty,
          looking_for: form.looking || '(not specified)',
          source: 'Homepage hero quick form',
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (data.success) {
        gtagEvent('qualify_lead', { form_id: 'hero_quick', form_name: 'Hero Quick Form', specialty: form.specialty, page_category: 'home', method: 'hero_form' })
        setSent(true)
      } else setError('Something went wrong. Please try again in a moment.')
    } catch {
      setError('Network error. Please check your connection and try again.')
    }
    setLoading(false)
  }

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(7,37,58,0.10)', borderRadius: 16,
    padding: 'clamp(18px,2.2vw,24px)', maxWidth: 520,
    boxShadow: '0 14px 36px rgba(7,37,58,0.08)',
  }

  if (sent) {
    return (
      <div style={card} role="status">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: T.primary, color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Check size={18} />
          </span>
          <div style={{ fontSize: 18, fontWeight: 750, letterSpacing: '-0.01em', color: T.text }}>
            Got it, {form.name.split(' ')[0] || 'thanks'}!
          </div>
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: T.muted, margin: 0 }}>
          Ravi will call you at <strong style={{ color: T.text }}>{form.phone}</strong> within 1-2 minutes.
          Keep your phone close.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} style={card} aria-label="Request a call back">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
        <div style={{ fontSize: 17, fontWeight: 750, letterSpacing: '-0.01em', color: T.text }}>
          Get a free call back
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.primaryDeep, fontWeight: 600 }}>
          <Clock size={13} /> We reach out in 1-2 min
        </span>
      </div>

      <div className="zx-quick-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <input required placeholder="Your name" autoComplete="name" aria-label="Your name"
          value={form.name} onChange={set('name')} onFocus={focusOn} onBlur={focusOff} style={inputCss} />
        <input required type="tel" inputMode="tel" placeholder="Cell phone" autoComplete="tel" aria-label="Cell phone"
          value={form.phone} onChange={set('phone')} onFocus={focusOn} onBlur={focusOff} style={inputCss} />
      </div>
      <select required aria-label="Your specialty" value={form.specialty} onChange={set('specialty')}
        onFocus={focusOn} onBlur={focusOff}
        style={{ ...inputCss, marginBottom: 10, color: form.specialty ? T.text : T.faint, appearance: 'auto' }}>
        <option value="" disabled>Your specialty</option>
        {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea rows={2} placeholder="What are you looking for? (new website, redesign, more patients...)" aria-label="What are you looking for"
        value={form.looking} onChange={set('looking')} onFocus={focusOn} onBlur={focusOff}
        style={{ ...inputCss, resize: 'vertical', marginBottom: 12 }} />
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

      <button type="submit" disabled={loading} style={{
        width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        background: T.gradBtn, color: '#fff', fontSize: 15, fontWeight: 700,
        padding: '14px 22px', borderRadius: 12, border: 'none',
        cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.75 : 1,
        boxShadow: '0 10px 26px rgba(11,156,135,0.32)', fontFamily: 'inherit',
      }}>
        {loading ? 'Sending...' : <>Call me back <ArrowRight size={17} /></>}
      </button>
      {error && <p role="alert" style={{ color: '#B42318', fontSize: 13.5, margin: '10px 0 0' }}>{error}</p>}
      <p style={{ fontSize: 12, color: T.faint, margin: '10px 0 0', lineHeight: 1.5 }}>
        No spam, no obligation. Your details are only used to contact you about your website.
      </p>
    </form>
  )
}
