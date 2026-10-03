import { m as motion } from 'framer-motion'

/** Glassy, animated bee mascot for the chat assistant - hand-built SVG.
 * "Flying" is faked honestly: an organic flight-path wobble (framer-motion x/y/rotate
 * on a wrapping div - `motion.g` does not reliably receive animated CSS transforms
 * in this framer-motion version, so every animated piece here lives on a leaf shape
 * element, never a `<g>`) plus a fast wing flutter with a soft blurred halo behind
 * each crisp wing - the standard trick for reading as "beating too fast to see"
 * rather than a slow flap. This is a flat vector, not a real-time-rendered 3D model -
 * a true 360°-rotatable bee that looks correct from every angle needs an actual 3D
 * asset + a WebGL renderer (e.g. react-three-fiber), a different build than an SVG icon. */
export default function BeeBotIcon({ size = 42 }: { size?: number }) {
  return (
    <motion.div
      style={{ width: size, height: size, display: 'inline-block' }}
      animate={{ x: [0, 2.5, -1.5, 1.5, 0], y: [0, -4, 1, -2.5, 0], rotate: [0, 3, -2, 2, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 70 70" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="bee-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFDB8A" />
            <stop offset="55%" stopColor="#F2A413" />
            <stop offset="100%" stopColor="#C97A0A" />
          </linearGradient>
          <linearGradient id="bee-stripe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#221708" />
            <stop offset="100%" stopColor="#0A0603" />
          </linearGradient>
          <radialGradient id="bee-spec" cx="32%" cy="24%" r="62%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id="bee-wing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(220,246,255,0.9)" />
            <stop offset="100%" stopColor="rgba(150,205,255,0.3)" />
          </linearGradient>
          <filter id="bee-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.6" floodColor="#000" floodOpacity="0.32" />
          </filter>
          <filter id="bee-blur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>

        <g filter="url(#bee-shadow)">
          {/* soft blur "disc" behind each wing - sells fast wingbeat without true motion blur */}
          <motion.ellipse
            cx="23" cy="27" rx="15" ry="9.5" fill="rgba(210,240,255,0.30)" filter="url(#bee-blur)"
            animate={{ opacity: [0.22, 0.4, 0.22] }} transition={{ duration: 0.24, repeat: Infinity }}
          />
          <motion.ellipse
            cx="47" cy="27" rx="15" ry="9.5" fill="rgba(210,240,255,0.30)" filter="url(#bee-blur)"
            animate={{ opacity: [0.4, 0.22, 0.4] }} transition={{ duration: 0.24, repeat: Infinity }}
          />

          {/* crisp wings, flapping fast */}
          <motion.ellipse
            cx="23" cy="26" rx="12.5" ry="7.5" fill="url(#bee-wing)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5"
            style={{ transformOrigin: '35px 32px' }}
            animate={{ rotate: [-4, -36, -4], scaleY: [1, 0.7, 1], opacity: [0.95, 0.5, 0.95] }}
            transition={{ duration: 0.12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.ellipse
            cx="47" cy="26" rx="12.5" ry="7.5" fill="url(#bee-wing)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5"
            style={{ transformOrigin: '35px 32px' }}
            animate={{ rotate: [4, 36, 4], scaleY: [1, 0.7, 1], opacity: [0.95, 0.5, 0.95] }}
            transition={{ duration: 0.12, repeat: Infinity, ease: 'easeInOut', delay: 0.015 }}
          />

          {/* body */}
          <ellipse cx="35" cy="39" rx="16" ry="14" fill="url(#bee-body)" />
          <path d="M19 33 Q35 29 51 33 Q35 36.5 19 33 Z" fill="url(#bee-stripe)" opacity="0.92" />
          <path d="M18.5 43 Q35 39 51.5 43 Q35 46.5 18.5 43 Z" fill="url(#bee-stripe)" opacity="0.92" />
          <path d="M21.5 51 Q35 48 48.5 51 Q35 53.5 21.5 51 Z" fill="url(#bee-stripe)" opacity="0.85" />
          <ellipse cx="35" cy="39" rx="16" ry="14" fill="url(#bee-spec)" />

          {/* fuzzy texture along the collar */}
          {[[24, 27], [28.5, 24.5], [33, 23.5], [37, 23.5], [41.5, 24.5], [46, 27]].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.9" fill="rgba(255,255,255,0.55)" />
          ))}

          {/* head */}
          <circle cx="35" cy="23" r="8.5" fill="url(#bee-body)" />
          <circle cx="35" cy="23" r="8.5" fill="url(#bee-spec)" />

          {/* antennae - animated individually; a wrapping motion.g does not reliably animate */}
          <motion.path
            d="M31 16.5 Q27.5 11 24.5 9.5" stroke="#2c2010" strokeWidth="1.4" fill="none" strokeLinecap="round"
            style={{ transformOrigin: '35px 17px' }}
            animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M39 16.5 Q42.5 11 45.5 9.5" stroke="#2c2010" strokeWidth="1.4" fill="none" strokeLinecap="round"
            style={{ transformOrigin: '35px 17px' }}
            animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="24.5" cy="9.5" r="1.4" fill="#2c2010"
            style={{ transformOrigin: '35px 17px' }}
            animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="45.5" cy="9.5" r="1.4" fill="#2c2010"
            style={{ transformOrigin: '35px 17px' }}
            animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <circle cx="31.5" cy="22.5" r="2.1" fill="#1a1410" />
          <circle cx="38.5" cy="22.5" r="2.1" fill="#1a1410" />
          <circle cx="32.2" cy="21.7" r="0.6" fill="#fff" />
          <circle cx="39.2" cy="21.7" r="0.6" fill="#fff" />
        </g>
      </svg>
    </motion.div>
  )
}
