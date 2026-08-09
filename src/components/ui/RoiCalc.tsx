import { useState } from 'react'
import { motion } from 'framer-motion'
import { T, MONO, EASE } from '@/lib/theme'

const FEE = 500

export default function RoiCalc() {
  const [value, setValue] = useState(400)   // what one new patient is worth to them
  const patients = Math.max(1, Math.ceil(FEE / value))
  const yearOne = value * 12                 // one extra patient a month, their own number
  const multiple = (yearOne / FEE).toFixed(1)

  return (
    <div style={{
      background: '#fff', border: `1px solid ${T.hairline}`, borderRadius: 20,
      padding: 'clamp(24px,3.2vw,38px)', boxShadow: '0 20px 54px rgba(7,37,58,0.10)',
    }}>
      <div style={{
        fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: T.primaryDeep, marginBottom: 18,
      }}>
        Work it out with your own numbers
      </div>

      <label htmlFor="ltv" style={{ display: 'block', fontSize: 15.5, fontWeight: 600, marginBottom: 4 }}>
        What is one new patient worth to your practice?
      </label>
      <p style={{ fontSize: 13.5, color: T.muted, margin: '0 0 18px' }}>
        Their first visit, or their lifetime value if you know it. Only you can answer this.
      </p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 22, fontWeight: 600, color: T.primaryDeep }}>$</span>
        <span style={{ fontSize: 'clamp(38px,5vw,56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: T.primaryDeep }}>
          {value.toLocaleString()}
        </span>
      </div>

      <input
        id="ltv" type="range" min={80} max={4000} step={20}
        value={value} onChange={e => setValue(Number(e.target.value))}
        className="zx-range"
        style={{ width: '100%', marginBottom: 26 }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14 }}>
        {[
          [patients === 1 ? '1 patient' : `${patients} patients`, 'to cover the whole fee'],
          [`$${yearOne.toLocaleString()}`, 'if it brings one extra patient a month, for a year'],
          [`${multiple}x`, 'return on the $500, on that basis'],
        ].map(([big, small], i) => (
          <motion.div key={small}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            style={{ background: T.primaryTint, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 700, color: T.primaryDeep, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {big}
            </div>
            <div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.5, marginTop: 7 }}>{small}</div>
          </motion.div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: T.faint, lineHeight: 1.6, marginTop: 18, marginBottom: 0 }}>
        These figures use the number you entered. They are arithmetic, not a forecast, and no
        website can promise a specific number of patients. What ZmaxLab controls is the quality
        of what gets built, and the 7-day guarantee below.
      </p>
    </div>
  )
}
