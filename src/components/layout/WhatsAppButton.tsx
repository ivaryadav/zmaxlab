import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck } from 'lucide-react'
import { T } from '@/lib/theme'

const CALENDLY_URL = 'https://calendly.com/ravi9235kumar/30min'

export default function BookingButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 24,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 12,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip card */}
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 16, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'block',
              background: '#fff',
              border: `1px solid ${T.border}`,
              borderRadius: 18,
              padding: '14px 16px 13px',
              width: 222,
              boxShadow: T.shadowLg,
              position: 'relative',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {/* Avatar + status row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 11 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: T.blue,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, color: '#fff',
                flexShrink: 0, position: 'relative',
              }}>
                R
                <span style={{
                  position: 'absolute', bottom: 1, right: 1,
                  width: 10, height: 10, background: '#22c55e',
                  borderRadius: '50%', border: '2px solid #fff',
                }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, lineHeight: 1.3 }}>Ravi · ZmaxLab</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#0E9F6E', letterSpacing: '0.03em' }}>● Available now</div>
              </div>
            </div>

            {/* Heading */}
            <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, lineHeight: 1.45, marginBottom: 4 }}>
              Got 20 minutes?
            </div>

            {/* Body */}
            <div style={{ fontSize: 11.5, color: T.muted, lineHeight: 1.55, marginBottom: 12 }}>
              I'll review your practice and show you a live mockup - no commitment needed.
            </div>

            {/* CTA button */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: T.blue,
              color: '#fff', fontSize: 12, fontWeight: 700,
              padding: '8px 14px', borderRadius: 10,
            }}>
              Book free call →
            </div>

            {/* Right-pointing arrow tail */}
            <div style={{
              position: 'absolute',
              right: -8,
              bottom: 18,
              width: 0, height: 0,
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderLeft: '8px solid #fff',
            }} />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Icon button */}
      <motion.a
        href={CALENDLY_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Book a free call with Ravi"
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: hovered ? T.blue : '#fff',
          border: hovered ? `1.5px solid ${T.blue}` : `1.5px solid ${T.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: T.shadowMd,
          cursor: 'pointer',
          textDecoration: 'none',
          flexShrink: 0,
          transition: 'background 0.22s, border-color 0.22s',
        }}
      >
        <CalendarCheck size={19} color={hovered ? '#fff' : T.blue} strokeWidth={2} />
      </motion.a>
    </div>
  )
}
