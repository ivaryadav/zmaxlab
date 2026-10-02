import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'

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
    gtagEvent('form_start', { form_id: 'hero_quick', form_name: 'Hero Intake Form', page_category: 'home' })
  }
  const toggleNeed = (n: string) => { touch(); setNeeds(v => v.includes(n) ? v.filter(x => x !== n) : [...v, n]) }

  const digits = phone.replace(/\D/g, '')
  const nameOk = name.trim().length >= 2
  const phoneOk = country.dial === '+1' ? digits.length === 10 : digits.length >= 6 && digits.length <= 14

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!nameOk) { setError('Enter your full name.'); return }
    if (!phoneOk) { setError(country.dial === '+1' ? 'Enter a 10-digit US cell number.' : 'Enter a valid cell phone number.'); return }
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
          source: 'Homepage intake form',
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (data.success) {
        gtagEvent('qualify_lead', { form_id: 'hero_quick', form_name: 'Hero Intake Form', specialty, page_category: 'home', method: 'hero_form' })
        setSent(true)
      } else setError('That did not go through. Try again in a moment.')
    } catch {
      setError('No connection. Check your internet and try again.')
    }
    setLoading(false)
  }

  const firstName = titleCase(name).split(' ')[0]

  return (
    <div className="zx-slip" id="intake">
      <div className="zx-slip-head">
        <span>Practice intake</span>
        <span className="zx-slip-live"><span className="zx-qf-dot" /> Reply in 1-2 min</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div key="done" role="status" className="zx-slip-body"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
            <div className="zx-slip-stamp"><Check size={15} strokeWidth={2.5} /> Received</div>
            <h3 className="zx-slip-title">Thank you{firstName ? `, ${firstName}` : ''}.</h3>
            <p className="zx-slip-note">
              Ravi will call you within 1-2 minutes to talk through your
              {specialty && specialty !== 'Other' ? ` ${specialty.toLowerCase()}` : ''} practice. Keep your phone nearby.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate aria-label="Request a call back" className="zx-slip-body"
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
            <h3 className="zx-slip-title">Request a call back</h3>

            <label className={`zx-line${touched && !nameOk ? ' is-bad' : ''}`}>
              <span className="zx-line-label">Full name <i>required</i></span>
              <input required aria-required="true" autoComplete="name" placeholder="Dr. Jane Carter"
                value={name} onChange={e => { touch(); setName(e.target.value) }} />
            </label>

            <div className={`zx-line${touched && !phoneOk ? ' is-bad' : ''}`}>
              <span className="zx-line-label">Cell phone <i>required</i></span>
              <div className="zx-line-row">
                <label className="zx-dial">
                  <span aria-hidden="true">{country.flag} {country.dial}</span>
                  <ChevronDown size={13} aria-hidden="true" />
                  <select aria-label="Country code" value={country.id}
                    onChange={e => { const c = COUNTRIES.find(x => x.id === e.target.value)!; setCountry(c); setPhone(formatLocal(digits, c.dial)) }}>
                    {COUNTRIES.map(c => <option key={c.id} value={c.id}>{c.flag} {c.name} ({c.dial})</option>)}
                  </select>
                </label>
                <input required aria-required="true" aria-label="Cell phone number" type="tel" inputMode="tel" autoComplete="tel-national"
                  placeholder={country.dial === '+1' ? '(555) 123-4567' : 'Phone number'}
                  value={phone} onChange={e => { touch(); setPhone(formatLocal(e.target.value.replace(/\D/g, ''), country.dial)) }} />
              </div>
            </div>

            <label className="zx-line">
              <span className="zx-line-label">Specialty</span>
              <div className="zx-line-row">
                <select value={specialty} onChange={e => { touch(); setSpecialty(e.target.value) }} className={specialty ? '' : 'is-empty'}>
                  <option value="">Select your specialty</option>
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={15} aria-hidden="true" className="zx-line-caret" />
              </div>
            </label>

            <fieldset className="zx-ticks">
              <legend className="zx-line-label">Looking for <i>tick any</i></legend>
              <div className="zx-ticks-grid">
                {NEEDS.map(n => {
                  const on = needs.includes(n)
                  return (
                    <button type="button" key={n} aria-pressed={on} onClick={() => toggleNeed(n)} className={`zx-tick${on ? ' is-on' : ''}`}>
                      <span className="zx-tick-box">{on && <Check size={11} strokeWidth={3.2} />}</span>
                      {n}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

            <button type="submit" disabled={loading} className="zx-slip-submit">
              {loading ? 'Sending...' : <>Request a call back <ArrowRight size={16} /></>}
            </button>
            {error && <p role="alert" className="zx-slip-error">{error}</p>}
            <p className="zx-slip-fine">Used only to contact you about your website. Never shared.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
