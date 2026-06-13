import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck } from 'lucide-react'

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
      {/* Tooltip card — slides in from the right, sits to the LEFT of the button */}
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
              background: 'rgba(6,8,22,0.97)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 18,
              padding: '14px 16px 13px',
              width: 222,
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(37,99,235,0.1)',
              position: 'relative',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {/* Avatar + status row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 11 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, color: '#fff',
                flexShrink: 0, position: 'relative',
                boxShadow: '0 0 16px rgba(37,99,235,0.35)',
              }}>
                R
                <span style={{
                  position: 'absolute', bottom: 1, right: 1,
                  width: 10, height: 10, background: '#22c55e',
                  borderRadius: '50%', border: '2px solid rgba(6,8,22,0.97)',
                }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3 }}>Ravi · ZmaxLab</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#22c55e', letterSpacing: '0.03em' }}>● Available now</div>
              </div>
            </div>

            {/* Heading */}
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.45, marginBottom: 4 }}>
              Got 20 minutes?
            </div>

            {/* Body */}
            <div style={{ fontSize: 11.5, color: 'rgba(241,245,249,0.5)', lineHeight: 1.55, marginBottom: 12 }}>
              I'll review your practice and show you a live mockup — no commitment needed.
            </div>

            {/* CTA button */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
              color: '#fff', fontSize: 12, fontWeight: 700,
              padding: '8px 14px', borderRadius: 10,
              boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
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
              borderLeft: '8px solid rgba(6,8,22,0.97)',
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
        animate={{
          scale: hovered ? 1.13 : 1,
          opacity: hovered ? 1 : 0.35,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: hovered
            ? 'linear-gradient(135deg,#2563eb,#7c3aed)'
            : 'rgba(255,255,255,0.07)',
          border: hovered
            ? '1.5px solid rgba(99,102,241,0.5)'
            : '1.5px solid rgba(255,255,255,0.11)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered ? '0 0 28px rgba(37,99,235,0.6)' : 'none',
          cursor: 'pointer',
          textDecoration: 'none',
          flexShrink: 0,
          transition: 'background 0.22s, border-color 0.22s, box-shadow 0.22s',
        }}
      >
        <CalendarCheck size={18} color={hovered ? '#fff' : 'rgba(241,245,249,0.65)'} strokeWidth={2} />
      </motion.a>
    </div>
  )
}
