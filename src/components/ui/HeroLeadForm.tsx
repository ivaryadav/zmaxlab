import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, m as motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { submitLead } from '@/lib/leads'
import { trackFormStart } from '@/lib/analytics'

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

const titleCase = (s: string) => s.trim().toLowerCase().replace(/\b\p{L}/gu, c => c.toUpperCase())

/** US/Canada numbers shown as (555) 123-4567 while typing; other countries left as digits. */
function formatLocal(digits: string, dial: string) {
  if (dial !== '+1') return digits
  const d = digits.slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}


type Opt = { value: string; label: string; meta?: string }

/** Styled single-select listbox that matches the intake slip (replaces the native OS dropdown). */
function Dropdown({ value, options, onChange, placeholder, ariaLabel, trigger, panelWidth, className }: {
  value: string; options: Opt[]; onChange: (v: string) => void; placeholder?: string; ariaLabel: string
  trigger?: React.ReactNode; panelWidth?: number; className?: string
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const typed = useRef({ q: '', t: 0 })
  const id = useId()
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])
  useEffect(() => {
    if (open) list.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const openList = () => { setActive(Math.max(0, options.findIndex(o => o.value === value))); setOpen(true) }
  const pick = (i: number) => { onChange(options[i].value); setOpen(false) }

  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openList() }
      return
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(options.length - 1, a + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)) }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0) }
    else if (e.key === 'End') { e.preventDefault(); setActive(options.length - 1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(active) }
    else if (e.key === 'Escape' || e.key === 'Tab') setOpen(false)
    else if (e.key.length === 1) {
      const now = Date.now()
      typed.current.q = (now - typed.current.t < 600 ? typed.current.q : '') + e.key.toLowerCase()
      typed.current.t = now
      const i = options.findIndex(o => o.label.toLowerCase().startsWith(typed.current.q))
      if (i >= 0) setActive(i)
    }
  }

  return (
    <div ref={root} className={`zx-dd${open ? ' is-open' : ''}${className ? ' ' + className : ''}`}>
      <button type="button" className="zx-dd-trigger" aria-haspopup="listbox" aria-expanded={open} aria-label={ariaLabel}
        aria-controls={id} onClick={() => (open ? setOpen(false) : openList())} onKeyDown={onKey}>
        {trigger ?? <span className={selected ? '' : 'zx-dd-ph'}>{selected ? selected.label : placeholder}</span>}
        <ChevronDown size={15} aria-hidden="true" className="zx-dd-caret" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul ref={list} id={id} role="listbox" aria-label={ariaLabel} className="zx-dd-panel"
            style={panelWidth ? { width: panelWidth } : undefined}
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease }}>
            {options.map((o, i) => (
              <li key={o.value} data-i={i} role="option" aria-selected={o.value === value}
                className={`zx-dd-opt${i === active ? ' is-active' : ''}${o.value === value ? ' is-sel' : ''}`}
                onMouseEnter={() => setActive(i)} onMouseDown={e => e.preventDefault()} onClick={() => pick(i)}>
                <span>{o.label}</span>
                {o.meta && <span className="zx-dd-meta">{o.meta}</span>}
                {o.value === value && <Check size={14} strokeWidth={2.6} className="zx-dd-check" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
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
  const submitting = useRef(false)

  const touch = () => trackFormStart('hero_intake')
  const toggleNeed = (n: string) => { touch(); setNeeds(v => v.includes(n) ? v.filter(x => x !== n) : [...v, n]) }

  const digits = phone.replace(/\D/g, '')
  const nameOk = name.trim().length >= 2
  const phoneOk = country.dial === '+1' ? digits.length === 10 : digits.length >= 6 && digits.length <= 14

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!nameOk) { setError('Enter your full name.'); return }
    if (!phoneOk) { setError(country.dial === '+1' ? 'Enter a 10-digit US cell number.' : 'Enter a valid cell phone number.'); return }
    if (submitting.current) return
    submitting.current = true
    setLoading(true); setError('')
    const res = await submitLead('hero_intake', {
      name: titleCase(name),
      phone: `${country.dial} ${formatLocal(digits, country.dial)}`,
      country: country.name,
      specialty: specialty || '(not specified)',
      looking_for: needs.length ? needs.join(', ') : '(not specified)',
    })
    if (res.ok) setSent(true)
    else setError(res.error)
    setLoading(false)
    submitting.current = false
  }

  const firstName = titleCase(name).split(' ')[0]

  return (
    <div className="zx-slip" id="intake">
      <div className="zx-slip-head">
        <span>Practice intake</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div key="done" role="status" className="zx-slip-body"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
            <div className="zx-slip-stamp"><Check size={15} strokeWidth={2.5} /> Received</div>
            <h2 className="zx-slip-title">Thank you{firstName ? `, ${firstName}` : ''}.</h2>
            <p className="zx-slip-note">Our developer will contact you soon.</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate aria-label="Request a call back" className="zx-slip-body"
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
            <h2 className="zx-slip-title">Request a call back</h2>

            <label className={`zx-line${touched && !nameOk ? ' is-bad' : ''}`}>
              <span className="zx-line-label">Full name <i>required</i></span>
              <input required aria-required="true" autoComplete="name" placeholder="Dr. Jane Carter"
                value={name} onChange={e => { touch(); setName(e.target.value) }} />
            </label>

            <div className={`zx-line${touched && !phoneOk ? ' is-bad' : ''}`}>
              <span className="zx-line-label">Cell phone <i>required</i></span>
              <div className="zx-line-row">
                <Dropdown className="zx-dd-dial" ariaLabel="Country code" value={country.id} panelWidth={270}
                  options={COUNTRIES.map(c => ({ value: c.id, label: `${c.flag}  ${c.name}`, meta: c.dial }))}
                  trigger={<span className="zx-dd-dialval">{country.flag} {country.dial}</span>}
                  onChange={v => { const c = COUNTRIES.find(x => x.id === v)!; setCountry(c); setPhone(formatLocal(digits, c.dial)) }} />
                <input required aria-required="true" aria-label="Cell phone number" type="tel" inputMode="tel" autoComplete="tel-national"
                  placeholder={country.dial === '+1' ? '(555) 123-4567' : 'Phone number'}
                  value={phone} onChange={e => { touch(); setPhone(formatLocal(e.target.value.replace(/\D/g, ''), country.dial)) }} />
              </div>
            </div>

            <div className="zx-line">
              <span className="zx-line-label">Specialty</span>
              <Dropdown ariaLabel="Specialty" value={specialty} placeholder="Select your specialty"
                options={SPECIALTIES.map(x => ({ value: x, label: x }))}
                onChange={v => { touch(); setSpecialty(v) }} />
            </div>

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
            <p className="zx-slip-fine">We only use your details to reply to your enquiry.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
