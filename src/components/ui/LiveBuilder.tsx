import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MONO, EASE } from '@/lib/theme'

type Spec = {
  key: string
  label: string
  practice: string
  headline: string
  sub: string
  accent: string
  tint: string
  services: string[]
  creds: string[]
  cta: string
}

const SPECS: Spec[] = [
  { key: 'np', label: 'Nurse Practitioner', practice: 'Ridgeway Family Health',
    headline: 'Primary care that actually knows your name.',
    sub: 'Board-certified FNP care for the whole family. Same-week appointments.',
    accent: '#0B9C87', tint: '#E4F4F0',
    services: ['Annual wellness visits', 'Chronic care management', 'Sick visits & telehealth'],
    creds: ['FNP-BC', 'NPI Verified', 'Most insurance'], cta: 'Book an appointment' },
  { key: 'chiro', label: 'Chiropractic', practice: 'Northline Spine & Rehab',
    headline: 'Move without thinking about it again.',
    sub: 'Evidence-based chiropractic and rehab for back, neck and sports injury.',
    accent: '#1D6FE0', tint: '#E6EFFC',
    services: ['Spinal adjustment', 'Sports rehab', 'Posture & ergonomics'],
    creds: ['DC Licensed', 'NPI Verified', 'Same-day intake'], cta: 'Book a consult' },
  { key: 'mh', label: 'Mental Health', practice: 'Stillwater Psychiatry',
    headline: 'Care that starts with being heard.',
    sub: 'Psychiatric evaluation, medication management and therapy. In person or virtual.',
    accent: '#6B54C6', tint: '#EFEBFB',
    services: ['Psychiatric evaluation', 'Medication management', 'Individual therapy'],
    creds: ['PMHNP-BC', 'Confidential', 'Telehealth in 12 states'], cta: 'Request an intake' },
  { key: 'dental', label: 'Dental', practice: 'Harbour Point Dental',
    headline: 'Dentistry without the dread.',
    sub: 'Gentle general and cosmetic dentistry. Transparent pricing, no surprises.',
    accent: '#0E8FA8', tint: '#E2F2F6',
    services: ['Cleanings & exams', 'Cosmetic dentistry', 'Same-day crowns'],
    creds: ['DDS', 'NPI Verified', 'Financing available'], cta: 'Book a cleaning' },
  { key: 'pt', label: 'Physical Therapy', practice: 'Cadence Physical Therapy',
    headline: 'Get back to the thing you stopped doing.',
    sub: 'One-on-one physical therapy. Full hour, same therapist, every session.',
    accent: '#C2571F', tint: '#FBEDE4',
    services: ['Orthopaedic rehab', 'Post-surgical recovery', 'Return-to-sport testing'],
    creds: ['DPT', 'NPI Verified', 'Direct access'], cta: 'Start recovery' },
]

const Bar = ({ w, h = 7, c }: { w: string; h?: number; c: string }) => (
  <div style={{ width: w, height: h, borderRadius: 4, background: c }} />
)

export default function LiveBuilder() {
  const [i, setI] = useState(0)
  const [building, setBuilding] = useState(false)
  const touched = useRef(false)
  const s = SPECS[i]

  // gently cycle until the visitor takes over
  useEffect(() => {
    if (touched.current) return
    const t = setInterval(() => setI(v => (v + 1) % SPECS.length), 4200)
    return () => clearInterval(t)
  }, [i])

  const pick = (n: number) => {
    touched.current = true
    setBuilding(true)
    setI(n)
    setTimeout(() => setBuilding(false), 620)
  }

  return (
    <div>
      {/* specialty selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        {SPECS.map((sp, n) => {
          const on = n === i
          return (
            <button key={sp.key} onClick={() => pick(n)}
              style={{
                fontFamily: MONO, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
                fontWeight: 600, padding: '9px 14px', borderRadius: 999, cursor: 'pointer',
                border: `1px solid ${on ? 'transparent' : 'rgba(7,37,58,0.16)'}`,
                background: on ? sp.accent : 'rgba(255,255,255,0.72)',
                color: on ? '#fff' : 'rgba(7,37,58,0.82)',
                transition: 'all .35s cubic-bezier(.16,1,.3,1)',
                boxShadow: on ? `0 8px 22px ${sp.accent}44` : 'none',
              }}>
              {sp.label}
            </button>
          )
        })}
      </div>

      {/* browser frame */}
      <div style={{
        borderRadius: 16, overflow: 'hidden', background: '#fff',
        border: '1px solid rgba(7,37,58,0.10)',
        boxShadow: '0 30px 80px rgba(7,37,58,0.20)',
      }}>
        {/* chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px',
          background: '#F6F8FA', borderBottom: '1px solid rgba(7,37,58,0.08)',
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#E5533C', '#E8B23B', '#3AAE58'].map(c => (
              <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{
            flex: 1, background: '#fff', border: '1px solid rgba(7,37,58,0.10)', borderRadius: 6,
            padding: '4px 10px', fontFamily: MONO, fontSize: 10, color: 'rgba(7,37,58,0.66)',
            textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap',
          }}>
            <AnimatePresence mode="wait">
              <motion.span key={s.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}>
                {s.practice.toLowerCase().replace(/[^a-z]/g, '')}.com
              </motion.span>
            </AnimatePresence>
          </div>
          <span style={{ fontFamily: MONO, fontSize: 9, color: s.accent, fontWeight: 700 }}>LIVE</span>
        </div>

        {/* rendered mini-site */}
        <div style={{ position: 'relative', minHeight: 340 }}>
          {/* build sweep */}
          <AnimatePresence>
            {building && (
              <motion.div
                initial={{ x: '-100%' }} animate={{ x: '100%' }} exit={{ opacity: 0 }}
                transition={{ duration: 0.62, ease: EASE }}
                style={{
                  position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                  background: `linear-gradient(90deg,transparent,${s.accent}22 45%,${s.accent}44 50%,${s.accent}22 55%,transparent)`,
                }} />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={s.key}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}>

              {/* mini nav */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px', borderBottom: '1px solid rgba(7,37,58,0.07)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 5, background: s.accent }} />
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: '#07253A', letterSpacing: '-0.02em' }}>
                    {s.practice}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                  {[22, 26, 20].map((w, n) => <Bar key={n} w={`${w}px`} h={5} c="rgba(7,37,58,0.14)" />)}
                  <span style={{
                    fontSize: 9.5, fontWeight: 700, color: '#fff', background: s.accent,
                    padding: '5px 9px', borderRadius: 5,
                  }}>{s.cta}</span>
                </div>
              </div>

              {/* mini hero */}
              <div style={{ padding: '22px 20px 18px', background: s.tint }}>
                <div style={{ fontSize: 'clamp(14px,1.6vw,19px)', fontWeight: 800, color: '#07253A', letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: 340, marginBottom: 8 }}>
                  {s.headline}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(7,37,58,0.78)', lineHeight: 1.55, maxWidth: 330, marginBottom: 14 }}>
                  {s.sub}
                </div>
                <span style={{
                  display: 'inline-block', fontSize: 10.5, fontWeight: 700, color: '#fff',
                  background: s.accent, padding: '8px 15px', borderRadius: 7,
                }}>{s.cta}</span>
              </div>

              {/* credential row */}
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', padding: '12px 20px', borderBottom: '1px solid rgba(7,37,58,0.07)' }}>
                {s.creds.map(c => (
                  <span key={c} style={{
                    fontFamily: MONO, fontSize: 8.5, letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: s.accent, background: s.tint, border: `1px solid ${s.accent}33`,
                    padding: '4px 8px', borderRadius: 4, fontWeight: 600,
                  }}>{c}</span>
                ))}
              </div>

              {/* services */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, padding: '16px 20px 22px' }}>
                {s.services.map(sv => (
                  <div key={sv} style={{ border: '1px solid rgba(7,37,58,0.09)', borderRadius: 8, padding: 10 }}>
                    <span style={{ display: 'block', width: 14, height: 14, borderRadius: 4, background: s.tint, marginBottom: 7 }} />
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: '#07253A', lineHeight: 1.35, marginBottom: 5 }}>{sv}</div>
                    <Bar w="80%" h={4} c="rgba(7,37,58,0.10)" />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.06em', color: 'rgba(7,37,58,0.70)', marginTop: 12, textTransform: 'uppercase' }}>
        Pick a specialty - the preview rebuilds instantly. Your real site, in 7 days.
      </p>
    </div>
  )
}
