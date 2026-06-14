import { motion } from 'framer-motion'

const ECG = 'M4,28 L10,28 L13,20 L16.5,38 L19.5,18 L23,28 L44,28'
const DUR  = '2.4s'
const KT   = '0;0.7;1'
const KP   = '0;1;1'
const KS   = '0.25 0.1 0.25 1;0 0 1 1'

export default function LogoCircle({ size = 42 }: { size?: number }) {
  return (
    <svg viewBox="0 0 50 62" style={{ width: size, height: size, display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="lc-body" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%"   stopColor="#0c1a2e"/>
          <stop offset="60%"  stopColor="#060e1c"/>
          <stop offset="100%" stopColor="#020810"/>
        </linearGradient>
        <linearGradient id="lc-tint" x1="0.05" y1="0" x2="0.95" y2="1">
          <stop offset="0%"   stopColor="rgba(55,130,255,0.18)"/>
          <stop offset="48%"  stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(0,230,118,0.15)"/>
        </linearGradient>
        <radialGradient id="lc-edge" cx="50%" cy="50%" r="50%">
          <stop offset="52%"  stopColor="rgba(0,0,0,0)"/>
          <stop offset="78%"  stopColor="rgba(0,0,0,0.22)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)"/>
        </radialGradient>
        <radialGradient id="lc-spec2" cx="76%" cy="80%" r="34%">
          <stop offset="0%"   stopColor="rgba(0,230,118,0.38)"/>
          <stop offset="100%" stopColor="rgba(0,230,118,0)"/>
        </radialGradient>
        <radialGradient id="lc-spec1" cx="28%" cy="22%" r="58%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.82)"/>
          <stop offset="32%"  stopColor="rgba(255,255,255,0.2)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <linearGradient id="lc-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.7)"/>
          <stop offset="30%"  stopColor="rgba(255,255,255,0.28)"/>
          <stop offset="68%"  stopColor="rgba(0,230,118,0.28)"/>
          <stop offset="100%" stopColor="rgba(0,180,100,0.08)"/>
        </linearGradient>
        <linearGradient id="lc-inner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.1)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </linearGradient>
        <radialGradient id="lc-caustic" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,220,118,0.55)"/>
          <stop offset="45%"  stopColor="rgba(0,220,118,0.2)"/>
          <stop offset="100%" stopColor="rgba(0,220,118,0)"/>
        </radialGradient>

        {/* ECG green glow */}
        <filter id="lc-glow" x="-40%" y="-60%" width="180%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Pointer shine */}
        <filter id="lc-dot" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="b2"/>
          <feMerge>
            <feMergeNode in="b1"/>
            <feMergeNode in="b1"/>
            <feMergeNode in="b2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Drop shadow */}
        <filter id="lc-shadow" x="-20%" y="-14%" width="140%" height="148%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.72"/>
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,200,100,0.45)" floodOpacity="1"/>
        </filter>

        {/* Soft blur */}
        <filter id="lc-blur"><feGaussianBlur stdDeviation="2.5"/></filter>

        {/* Clip to circle */}
        <clipPath id="lc-clip"><circle cx="25" cy="28" r="22.5"/></clipPath>
      </defs>

      {/* Caustic glow on mirror surface */}
      <ellipse cx="25" cy="55" rx="22" ry="5"   fill="url(#lc-caustic)" filter="url(#lc-blur)"/>
      <ellipse cx="25" cy="55" rx="13" ry="2.8" fill="rgba(0,220,118,0.32)" filter="url(#lc-blur)"/>

      {/* Glass circle icon */}
      <g filter="url(#lc-shadow)">
        <circle cx="25" cy="28" r="23" fill="url(#lc-body)"/>
        <circle cx="25" cy="28" r="23" fill="url(#lc-tint)"/>
        <circle cx="25" cy="28" r="23" fill="url(#lc-edge)"/>
        <circle cx="25" cy="28" r="23" fill="url(#lc-spec2)"/>

        {/* Contents clipped to circle */}
        <g clipPath="url(#lc-clip)">
          {/* Animated green ECG wave */}
          <motion.path
            d={ECG}
            stroke="#00e676" strokeWidth="2.2" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            filter="url(#lc-glow)"
            animate={{ pathLength: [0, 1, 1] }}
            transition={{ duration: 2.4, times: [0, 0.7, 1], ease: 'easeOut', repeat: Infinity }}
          />

          {/* Shining pointer — 4 layers */}
          {/* Layer 1: outer bloom pulse */}
          <circle fill="rgba(0,255,128,0.14)">
            <animate attributeName="r"       values="7;12;7"         dur="0.95s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
            <animate attributeName="opacity" values="0.14;0.04;0.14" dur="0.95s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
            <animateMotion dur={DUR} keyTimes={KT} keyPoints={KP} calcMode="spline" keySplines={KS} path={ECG} repeatCount="indefinite"/>
          </circle>
          {/* Layer 2: green ring */}
          <circle fill="rgba(0,240,120,0.38)">
            <animate attributeName="r"       values="4.5;7;4.5"      dur="0.95s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
            <animate attributeName="opacity" values="0.38;0.15;0.38" dur="0.95s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
            <animateMotion dur={DUR} keyTimes={KT} keyPoints={KP} calcMode="spline" keySplines={KS} path={ECG} repeatCount="indefinite"/>
          </circle>
          {/* Layer 3: green core */}
          <circle r="2.8" fill="#00e676" filter="url(#lc-dot)">
            <animateMotion dur={DUR} keyTimes={KT} keyPoints={KP} calcMode="spline" keySplines={KS} path={ECG} repeatCount="indefinite"/>
          </circle>
          {/* Layer 4: white hot centre */}
          <circle r="1.2" fill="#ffffff">
            <animateMotion dur={DUR} keyTimes={KT} keyPoints={KP} calcMode="spline" keySplines={KS} path={ECG} repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Medical cross — teal */}
        <line x1="36" y1="13" x2="36" y2="19" stroke="rgba(0,220,170,0.85)" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="33" y1="16" x2="39" y2="16" stroke="rgba(0,220,170,0.85)" strokeWidth="1.8" strokeLinecap="round"/>

        {/* Top specular */}
        <circle cx="25" cy="28" r="23" fill="url(#lc-spec1)"/>

        {/* Highlight cluster */}
        <ellipse cx="15"  cy="16"  rx="9"   ry="5"   fill="rgba(255,255,255,0.10)"/>
        <ellipse cx="13"  cy="13.5" rx="6"  ry="3.5" fill="rgba(255,255,255,0.22)"/>
        <ellipse cx="10.5" cy="11.5" rx="3.5" ry="2.2" fill="rgba(255,255,255,0.52)"/>
        <ellipse cx="9"   cy="10"  rx="1.8" ry="1.2" fill="rgba(255,255,255,0.82)"/>
        <ellipse cx="8.2" cy="9.2" rx="0.9" ry="0.7" fill="rgba(255,255,255,0.97)"/>

        {/* Rim borders */}
        <circle cx="25" cy="28" r="23"   fill="none" stroke="url(#lc-rim)"   strokeWidth="1.5"/>
        <circle cx="25" cy="28" r="21.7" fill="none" stroke="url(#lc-inner)" strokeWidth="0.5"/>
      </g>

      {/* Mirror reflection ghost */}
      <ellipse cx="25" cy="52" rx="18" ry="3.2"
        fill="rgba(10,40,20,0.45)" filter="url(#lc-blur)" opacity="0.5"/>

    </svg>
  )
}
