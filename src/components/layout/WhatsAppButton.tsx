import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar } from 'lucide-react'

const CALENDLY_URL = 'https://calendly.com/ravi9235kumar/30min'

export default function BookingButton() {
  const [tooltip, setTooltip] = useState(true)

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            style={{
              background: '#fff', color: '#07091f', borderRadius: 14,
              padding: '10px 16px', fontSize: 13, fontWeight: 600, maxWidth: 220,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              position: 'relative', lineHeight: 1.5,
            }}
          >
            <button
              onClick={() => setTooltip(false)}
              aria-label="Close"
              style={{ position: 'absolute', top: 6, right: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
            >
              <X size={13} />
            </button>
            <span style={{ marginRight: 16 }}>Book a free 20-min demo call with Ravi</span>
            <div style={{ position: 'absolute', bottom: -7, right: 22, width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '7px solid #fff' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={CALENDLY_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Book a free demo call"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 58, height: 58, borderRadius: '50%',
          background: 'linear-gradient(135deg,#1b6fff,#00c896)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(27,111,255,0.45)',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <Calendar size={26} color="#fff" />
      </motion.a>
    </div>
  )
}
