import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Clock, Lock, ShieldCheck, Stethoscope, User } from 'lucide-react'
import { T, MONO } from '@/lib/theme'

// Web3Forms key - submissions are emailed to the inbox tied to this key (never shown on the site).
const WEB3FORMS_KEY = '5a1bc976-474a-422f-bdb3-0c7f11eaed3d'

const SPECIALTIES = [
  'Nurse Practitioner', 'Physician Assistant', 'Chiropractor', 'Mental Health / Therapist',
  'Psychiatry', 'Primary Care', 'Dental', 'Physical Therapy', 'Pain Management', 'Other',
]
const NEEDS = [
  'New website', 'Website redesign', 'SEO / Google ranking', 'Google & Meta ads',
  'More patient leads', 'Reviews & reputation',
]
const COUNTRIES = [
  { id: 'US', flag: '🇺🇸', dial: '+1', name: 'United States' },
  { id: 'CA', flag: '🇨🇦', dial: '+1', name: 'Canada' },
  { id: 'GB', flag: '🇬🇧', dial: '+44', name: 'United Kingdom' },
  { id: 'IN', flag: '🇮🇳', dial: '+91', name: 'India' },
  { id: 'AU', flag: '🇦🇺', dial: '+61', name: 'Australia' },
  { id: 'AE', flag: '🇦🇪', dial: '+971', name: 'United Arab Emirates' },
  { id: 'MX', flag: '🇲🇽', dial: '+52', name: 'Mexico' },
  { id: 'PH', flag: '🇵🇭', dial: '+63', name: 'Philippines' },
]

const ease = [0.16, 1, 0.3, 1] as const

function gtagEvent(name: string, params: Record<string, string | number | boolean>) {
  if (typeof (window as any).gtag === 'function') (window as any).gtag('event', name, params)
}

const titleCase = (s: string) => s.trim().toLowerCase().replace(/\b\p{L}/gu, c => c.toUpperCase())

/** US/Canada numbers shown as (555) 123-4567 while typing; other countries left as digits. */
function formatLocal(digits: string, dial: string) {
  if (dial !== '+1') return digits
  const d = digits.slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className="zx-qf-chip" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '7px 12px', borderRadius: 999, fontSize: 13, fontWeight: 600,
      fontFamily: 'inherit', cursor: 'pointer', lineHeight: 1.2,
      border: `1.5px solid ${active ? T.primary : 'rgba(7,37,58,0.13)'}`,
      background: active ? T.primaryTint : '#fff',
      color: active ? T.primaryDeep : T.text,
      boxShadow: active ? `0 0 0 3px ${T.primary}1f` : '0 1px 2px rgba(7,37,58,0.05)',
      transition: 'all .2s ease',
    }}>
      {active && <Check size={13} strokeWidth={3} />}
      {children}
    </button>
  )
}

const shell: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10, background: '#fff',
  border: '1.5px solid rgba(7,37,58,0.13)', borderRadius: 12, padding: '0 14px',
  transition: 'border-color .2s, box-shadow .2s', position: 'relative',
}
const bare: React.CSSProperties = {
  flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
  padding: '14px 0', fontSize: 15.5, color: T.text, fontFamily: 'inherit',
}

export default function HeroLeadForm() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState(COUNTRIES[0])
  const [phone, setPhone] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [needs, setNeeds] = useState<string[]>([])
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const started = useRef(false)

  const touch = () => {
    if (started.current) return
    started.current = true
    gtagEvent('form_start', { form_id: 'hero_quick', form_name: 'Hero Quick Form', page_category: 'home' })
  }
  const toggleNeed = (n: string) => { touch(); setNeeds(v => v.includes(n) ? v.filter(x => x !== n) : [...v, n]) }

  const digits = phone.replace(/\D/g, '')
  const nameOk = name.trim().length >= 2
  const phoneOk = country.dial === '+1' ? digits.length === 10 : digits.length >= 6 && digits.length <= 14

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!nameOk) { setError('Please enter your full name.'); return }
    if (!phoneOk) { setError(country.dial === '+1' ? 'Please enter a 10-digit US cell number.' : 'Please enter a valid cell phone number.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New Inquiry',
          from_name: 'ZmaxLab Website',
          name: titleCase(name),
          cell_phone: `${country.dial} ${formatLocal(digits, country.dial)}`,
          country: country.name,
          specialty: specialty || '(not specified)',
          looking_for: needs.length ? needs.join(', ') : '(not specified)',
          source: 'Homepage hero quick form',
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (data.success) {
        gtagEvent('qualify_lead', { form_id: 'hero_quick', form_name: 'Hero Quick Form', specialty, page_category: 'home', method: 'hero_form' })
        setSent(true)
      } else setError('Something went wrong. Please try again in a moment.')
    } catch {
      setError('Network error. Please check your connection and try again.')
    }
    setLoading(false)
  }

  const bad = (ok: boolean) => touched && !ok ? { borderColor: '#E5484D', boxShadow: '0 0 0 3px rgba(229,72,77,0.12)' } : {}
  const firstName = titleCase(name).split(' ')[0]

  return (
    <div className="zx-qf" style={{
      position: 'relative', maxWidth: 520, borderRadius: 20, padding: 1.5,
      background: `linear-gradient(135deg, ${T.primary}66, rgba(255,255,255,0.6) 45%, ${T.primary}33)`,
      boxShadow: '0 24px 60px rgba(7,37,58,0.16), 0 2px 6px rgba(7,37,58,0.06)',
    }}>
      <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderRadius: 18.5, overflow: 'hidden' }}>
        {/* header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
          padding: '16px 22px', background: T.gradPanelDeep, color: '#fff',
        }}>
          <div>
            <div style={{ fontSize: 16.5, fontWeight: 750, letterSpacing: '-0.01em' }}>
              {sent ? 'Request received' : 'Get your free website plan'}
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.72)', marginTop: 2 }}>
              {sent ? 'A specialist is on it' : 'Takes 20 seconds · No obligation'}
            </div>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, flexShrink: 0,
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 999, padding: '6px 11px', fontFamily: MONO, fontSize: 10.5,
            letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
          }}>
            <span className="zx-qf-dot" />
            Call back in 1-2 min
          </span>
        </div>

        <div style={{ padding: 'clamp(18px,2.4vw,24px) clamp(18px,2.4vw,24px) 20px' }}>
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div key="done" role="status"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
                style={{ textAlign: 'center', padding: '10px 4px 6px' }}>
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  style={{ width: 58, height: 58, borderRadius: '50%', background: T.gradBtn, color: '#fff', display: 'inline-grid', placeItems: 'center', boxShadow: '0 12px 28px rgba(11,156,135,0.35)' }}>
                  <Check size={28} strokeWidth={3} />
                </motion.span>
                <div style={{ fontSize: 21, fontWeight: 750, letterSpacing: '-0.02em', color: T.text, margin: '16px 0 8px' }}>
                  Thank you{firstName ? `, ${firstName}` : ''}!
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: T.muted, margin: '0 auto', maxWidth: 360 }}>
                  We'll call you within <strong style={{ color: T.text }}>1-2 minutes</strong> to talk through your
                  {specialty && specialty !== 'Other' ? ` ${specialty.toLowerCase()}` : ''} practice's website. Keep your phone close.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate aria-label="Request a free call back"
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease }}>
                <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
                  {/* name */}
                  <label className="zx-qf-field" style={{ ...shell, ...bad(nameOk) }}>
                    <User size={17} style={{ color: T.primary, flexShrink: 0 }} />
                    <input required aria-required="true" placeholder="Full name *" autoComplete="name" aria-label="Full name (required)"
                      value={name} onChange={e => { touch(); setName(e.target.value) }} style={bare} />
                  </label>

                  {/* phone with country code */}
                  <div className="zx-qf-field" style={{ ...shell, padding: 0, ...bad(phoneOk) }}>
                    <label style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px 0 14px', borderRight: '1.5px solid rgba(7,37,58,0.10)', alignSelf: 'stretch', cursor: 'pointer' }}>
                      <span style={{ fontSize: 18, lineHeight: 1 }}>{country.flag}</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{country.dial}</span>
                      <ChevronDown size={14} style={{ color: T.faint }} />
                      <select aria-label="Country code" value={country.id}
                        onChange={e => { const c = COUNTRIES.find(x => x.id === e.target.value)!; setCountry(c); setPhone(formatLocal(digits, c.dial)) }}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', fontSize: 16 }}>
                        {COUNTRIES.map(c => <option key={c.id} value={c.id}>{c.flag} {c.name} ({c.dial})</option>)}
                      </select>
                    </label>
                    <input required aria-required="true" type="tel" inputMode="tel" autoComplete="tel-national" aria-label="Cell phone number (required)"
                      placeholder={country.dial === '+1' ? '(555) 123-4567 *' : 'Cell phone number *'}
                      value={phone} onChange={e => { touch(); setPhone(formatLocal(e.target.value.replace(/\D/g, ''), country.dial)) }}
                      style={{ ...bare, paddingLeft: 12, paddingRight: 14 }} />
                  </div>

                  {/* specialty */}
                  <label className="zx-qf-field" style={shell}>
                    <Stethoscope size={17} style={{ color: T.primary, flexShrink: 0 }} />
                    <select aria-label="Your specialty" value={specialty} onChange={e => { touch(); setSpecialty(e.target.value) }}
                      style={{ ...bare, appearance: 'none', cursor: 'pointer', color: specialty ? T.text : T.faint }}>
                      <option value="">Your specialty</option>
                      {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={16} style={{ color: T.faint, flexShrink: 0, pointerEvents: 'none' }} />
                  </label>
                </div>

                <div className="zx-qf-label">What are you looking for? <span style={{ color: T.faint, fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>(pick any)</span></div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
                  {NEEDS.map(n => <Chip key={n} active={needs.includes(n)} onClick={() => toggleNeed(n)}>{n}</Chip>)}
                </div>

                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

                <button type="submit" disabled={loading} className="zx-qf-submit" style={{
                  width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: T.gradBtn, color: '#fff', fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.005em',
                  padding: '15px 22px', borderRadius: 12, border: 'none', fontFamily: 'inherit',
                  cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.8 : 1,
                  boxShadow: '0 12px 28px rgba(11,156,135,0.34)',
                }}>
                  {loading ? 'Sending...' : <>Call me in 1-2 minutes <ArrowRight size={17} /></>}
                </button>

                {error && <p role="alert" style={{ color: '#B42318', fontSize: 13.5, margin: '10px 0 0', textAlign: 'center' }}>{error}</p>}

                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6px 16px', marginTop: 14 }}>
                  {([[Lock, 'Private & secure'], [ShieldCheck, 'No spam, ever'], [Clock, 'Free consultation']] as const).map(([I, t]) => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: T.faint }}>
                      <I size={13} style={{ color: T.primary }} /> {t}
                    </span>
                  ))}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
