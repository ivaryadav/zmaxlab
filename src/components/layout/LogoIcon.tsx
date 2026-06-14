import { motion } from 'framer-motion'

// ECG path (fits inside circle r=22 centered at 24,30)
const ECG = 'M5,30 L11,30 L14,22 L17.5,40 L20.5,20 L24,30 L43,30'

// Pointer dot follows the ECG path using SMIL animateMotion
// keyTimes + keyPoints: draws 0→100% over 70% of duration, then holds
const DOT_KEYTIMES  = '0;0.7;1'
const DOT_KEYPOINTS = '0;1;1'
const DURATION      = '2.4s'

export default function LogoIcon({ height = 38 }: { height?: number }) {
  return (
    <svg viewBox="0 0 222 62" role="img" aria-label="ZmaxLab" style={{ height, width: 'auto', display: 'block' }}>
      <defs>
        {/* ── Glass fills ── */}
        <linearGradient id="lg-body" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%"   stopColor="#0b1928"/>
          <stop offset="60%"  stopColor="#060e1c"/>
          <stop offset="100%" stopColor="#020810"/>
        </linearGradient>
        <linearGradient id="lg-tint" x1="0.05" y1="0" x2="0.95" y2="1">
          <stop offset="0%"   stopColor="rgba(55,130,255,0.2)"/>
          <stop offset="48%"  stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(0,230,118,0.15)"/>
        </linearGradient>
        <radialGradient id="lg-edge" cx="50%" cy="50%" r="50%">
          <stop offset="50%"  stopColor="rgba(0,0,0,0)"/>
          <stop offset="78%"  stopColor="rgba(0,0,0,0.2)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.52)"/>
        </radialGradient>
        <radialGradient id="lg-spec2" cx="76%" cy="82%" r="34%">
          <stop offset="0%"   stopColor="rgba(0,230,118,0.35)"/>
          <stop offset="100%" stopColor="rgba(0,230,118,0)"/>
        </radialGradient>
        <radialGradient id="lg-spec1" cx="28%" cy="22%" r="58%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.78)"/>
          <stop offset="32%"  stopColor="rgba(255,255,255,0.2)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <linearGradient id="lg-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.65)"/>
          <stop offset="30%"  stopColor="rgba(255,255,255,0.25)"/>
          <stop offset="68%"  stopColor="rgba(0,230,118,0.25)"/>
          <stop offset="100%" stopColor="rgba(0,180,100,0.08)"/>
        </linearGradient>
        <linearGradient id="lg-inner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.1)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </linearGradient>
        <radialGradient id="lg-caustic" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,220,118,0.5)"/>
          <stop offset="45%"  stopColor="rgba(0,220,118,0.2)"/>
          <stop offset="100%" stopColor="rgba(0,220,118,0)"/>
        </radialGradient>

        {/* ── Wordmark gradients ── */}
        <linearGradient id="lg-zmax" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#ddeeff"/>
          <stop offset="100%" stopColor="#a8cce0"/>
        </linearGradient>
        <linearGradient id="lg-lab" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#00d4a8"/>
          <stop offset="100%" stopColor="#1a8eff"/>
        </linearGradient>

        {/* ── ECG green glow ── */}
        <filter id="lg-glow" x="-40%" y="-60%" width="180%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* ── Pointer dot glow (strong, multi-pass) ── */}
        <filter id="lg-dotglow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur2"/>
          <feMerge>
            <feMergeNode in="blur1"/>
            <feMergeNode in="blur1"/>
            <feMergeNode in="blur2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* ── Icon drop shadow ── */}
        <filter id="lg-shadow" x="-18%" y="-14%" width="136%" height="148%">
          <feDropShadow dx="0" dy="4"  stdDeviation="5" floodColor="#000000" floodOpacity="0.72"/>
          <feDropShadow dx="0" dy="1"  stdDeviation="2" floodColor="rgba(0,180,100,0.45)" floodOpacity="1"/>
        </filter>

        {/* ── Soft blur ── */}
        <filter id="lg-blur">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>

        {/* ── Clip to circle ── */}
        <clipPath id="lg-clip">
          <circle cx="24" cy="30" r="21.5"/>
        </clipPath>
      </defs>

      {/* ── Mirror caustic glow below ── */}
      <ellipse cx="24" cy="56" rx="22" ry="5" fill="url(#lg-caustic)" filter="url(#lg-blur)"/>
      <ellipse cx="24" cy="56" rx="13" ry="2.8" fill="rgba(0,220,118,0.32)" filter="url(#lg-blur)"/>

      {/* ── Circular glass icon ── */}
      <g filter="url(#lg-shadow)">
        {/* Dark glass body */}
        <circle cx="24" cy="30" r="22" fill="url(#lg-body)"/>
        {/* Blue-green tint */}
        <circle cx="24" cy="30" r="22" fill="url(#lg-tint)"/>
        {/* Fresnel edge darkening */}
        <circle cx="24" cy="30" r="22" fill="url(#lg-edge)"/>
        {/* Bottom-right green scatter */}
        <circle cx="24" cy="30" r="22" fill="url(#lg-spec2)"/>

        {/* ── Contents clipped to circle ── */}
        <g clipPath="url(#lg-clip)">
          {/* ECG — animated green wave */}
          <motion.path
            d={ECG}
            stroke="#00e676" strokeWidth="2.2" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            filter="url(#lg-glow)"
            animate={{ pathLength: [0, 1, 1] }}
            transition={{ duration: 2.4, times: [0, 0.7, 1], ease: 'easeOut', repeat: Infinity }}
          />

          {/* ── Shining pointer — 4-layer glowing dot ── */}

          {/* Layer 1: outermost pulse bloom */}
          <circle fill="rgba(0,255,128,0.14)">
            <animate attributeName="r"       values="7;12;7"         dur="0.95s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
            <animate attributeName="opacity" values="0.14;0.04;0.14" dur="0.95s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
            <animateMotion dur={DURATION} keyTimes={DOT_KEYTIMES} keyPoints={DOT_KEYPOINTS} calcMode="spline" keySplines="0.25 0.1 0.25 1;0 0 1 1" path={ECG} repeatCount="indefinite"/>
          </circle>

          {/* Layer 2: green glow ring */}
          <circle fill="rgba(0,240,120,0.38)">
            <animate attributeName="r"       values="4.5;7;4.5"      dur="0.95s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
            <animate attributeName="opacity" values="0.38;0.15;0.38" dur="0.95s" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
            <animateMotion dur={DURATION} keyTimes={DOT_KEYTIMES} keyPoints={DOT_KEYPOINTS} calcMode="spline" keySplines="0.25 0.1 0.25 1;0 0 1 1" path={ECG} repeatCount="indefinite"/>
          </circle>

          {/* Layer 3: solid green dot */}
          <circle r="2.8" fill="#00e676" filter="url(#lg-dotglow)">
            <animateMotion dur={DURATION} keyTimes={DOT_KEYTIMES} keyPoints={DOT_KEYPOINTS} calcMode="spline" keySplines="0.25 0.1 0.25 1;0 0 1 1" path={ECG} repeatCount="indefinite"/>
          </circle>

          {/* Layer 4: white hot core */}
          <circle r="1.2" fill="#ffffff">
            <animateMotion dur={DURATION} keyTimes={DOT_KEYTIMES} keyPoints={DOT_KEYPOINTS} calcMode="spline" keySplines="0.25 0.1 0.25 1;0 0 1 1" path={ECG} repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Medical cross — teal, outside clip so it stays visible */}
        <line x1="35" y1="14" x2="35" y2="20" stroke="rgba(0,220,170,0.85)" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="32" y1="17" x2="38" y2="17" stroke="rgba(0,220,170,0.85)" strokeWidth="1.8" strokeLinecap="round"/>

        {/* Top specular */}
        <circle cx="24" cy="30" r="22" fill="url(#lg-spec1)"/>

        {/* Specular highlight cluster */}
        <ellipse cx="16"  cy="17"  rx="9"   ry="5"   fill="rgba(255,255,255,0.10)"/>
        <ellipse cx="13"  cy="14.5" rx="6"  ry="3.5" fill="rgba(255,255,255,0.22)"/>
        <ellipse cx="10.5" cy="12.5" rx="3.5" ry="2.2" fill="rgba(255,255,255,0.52)"/>
        <ellipse cx="9"   cy="11"  rx="1.8" ry="1.2" fill="rgba(255,255,255,0.82)"/>
        <ellipse cx="8.2" cy="10.2" rx="0.9" ry="0.7" fill="rgba(255,255,255,0.97)"/>

        {/* Outer rim */}
        <circle cx="24" cy="30" r="22" fill="none" stroke="url(#lg-rim)"   strokeWidth="1.5"/>
        <circle cx="24" cy="30" r="20.8" fill="none" stroke="url(#lg-inner)" strokeWidth="0.5"/>
      </g>

      {/* Mirror ghost */}
      <ellipse cx="24" cy="53.5" rx="19" ry="3.5"
        fill="rgba(10,40,20,0.45)" filter="url(#lg-blur)" opacity="0.5"/>

      {/* ── Separator ── */}
      <line x1="56" y1="14" x2="56" y2="46"
        stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

      {/* ── Wordmark ── */}
      <text x="64" y="34"
        fontFamily="'Space Grotesk','Inter','Segoe UI',system-ui,sans-serif"
        fontWeight="800" fontSize="24" letterSpacing="-0.8"
        fill="url(#lg-zmax)">Zmax</text>

      <text x="130" y="34"
        fontFamily="'Space Grotesk','Inter','Segoe UI',system-ui,sans-serif"
        fontWeight="800" fontSize="24" letterSpacing="-0.8"
        fill="url(#lg-lab)">Lab</text>

      <circle cx="64" cy="46" r="1.4" fill="rgba(255,255,255,0.2)"/>
      <text x="71" y="49"
        fontFamily="'Inter','Segoe UI',system-ui,sans-serif"
        fontWeight="500" fontSize="9"
        fill="rgba(255,255,255,0.35)"
        letterSpacing="1.8">HEALTHCARE WEBSITES</text>
    </svg>
  )
}
