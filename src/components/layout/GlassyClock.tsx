import { useState, useEffect } from 'react'

const CYAN = '#00d8ff'
const CX = 30, CY = 30, R = 24

// 60 tick marks — 12 major (hour), 48 minor (minute)
const TICKS = Array.from({ length: 60 }, (_, i) => {
  const a   = (i * 6 * Math.PI) / 180
  const maj = i % 5 === 0
  return {
    x1: CX + (maj ? 15.5 : 20) * Math.sin(a),
    y1: CY - (maj ? 15.5 : 20) * Math.cos(a),
    x2: CX + (R - 0.5)         * Math.sin(a),
    y2: CY - (R - 0.5)         * Math.cos(a),
    maj,
  }
})

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function GlassyClock({ size = 72 }: { size?: number }) {
  const now  = useClock()
  const s    = now.getSeconds()
  const m    = now.getMinutes()
  const h    = now.getHours() % 12
  const sDeg = s * 6
  const mDeg = m * 6 + s * 0.1
  const hDeg = h * 30 + m * 0.5

  return (
    <svg
      viewBox="0 0 60 60"
      style={{ width: size, height: size, display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Ring outer halo — very soft, very wide */}
        <filter id="ck-halo" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b2"/>
          <feMerge>
            <feMergeNode in="b1"/>
            <feMergeNode in="b1"/>
            <feMergeNode in="b2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Hand + major-tick bloom */}
        <filter id="ck-bloom" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"   result="b2"/>
          <feMerge>
            <feMergeNode in="b1"/>
            <feMergeNode in="b1"/>
            <feMergeNode in="b2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Minor tick soft glow */}
        <filter id="ck-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Pure dark background */}
      <circle cx={CX} cy={CY} r={R + 4} fill="#010b16"/>

      {/* Ring layer 1 — wide soft halo */}
      <circle cx={CX} cy={CY} r={R} fill="none"
        stroke={CYAN} strokeWidth="4" opacity="0.12"
        filter="url(#ck-halo)"/>
      {/* Ring layer 2 — medium bloom */}
      <circle cx={CX} cy={CY} r={R} fill="none"
        stroke={CYAN} strokeWidth="2" opacity="0.38"
        filter="url(#ck-bloom)"/>
      {/* Ring layer 3 — sharp bright line */}
      <circle cx={CX} cy={CY} r={R} fill="none"
        stroke={CYAN} strokeWidth="0.7" opacity="1"/>

      {/* Tick marks */}
      {TICKS.map((t, i) => (
        <line key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={CYAN}
          strokeWidth={t.maj ? 1.5 : 0.55}
          strokeLinecap="round"
          opacity={t.maj ? 0.95 : 0.5}
          filter={t.maj ? 'url(#ck-bloom)' : 'url(#ck-soft)'}
        />
      ))}

      {/* Hour hand */}
      <line
        x1={CX} y1={CY + 4} x2={CX} y2={CY - 13}
        stroke={CYAN} strokeWidth="2.4" strokeLinecap="round"
        filter="url(#ck-bloom)"
        transform={`rotate(${hDeg},${CX},${CY})`}
      />

      {/* Minute hand */}
      <line
        x1={CX} y1={CY + 4} x2={CX} y2={CY - 20}
        stroke={CYAN} strokeWidth="1.5" strokeLinecap="round"
        filter="url(#ck-bloom)"
        transform={`rotate(${mDeg},${CX},${CY})`}
      />

      {/* Second hand — white-cyan, very thin */}
      <line
        x1={CX} y1={CY + 6} x2={CX} y2={CY - 22}
        stroke="#b8f0ff" strokeWidth="0.75" strokeLinecap="round"
        filter="url(#ck-soft)"
        transform={`rotate(${sDeg},${CX},${CY})`}
      />

      {/* Centre hub */}
      <circle cx={CX} cy={CY} r="2.8" fill={CYAN} filter="url(#ck-bloom)"/>
      <circle cx={CX} cy={CY} r="1.3" fill="#ffffff"/>
    </svg>
  )
}
