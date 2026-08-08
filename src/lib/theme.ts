export const T = {
  // surfaces
  bg: '#FFFFFF',
  surface: '#F4F6F9',
  surfaceWarm: '#FAF9F7',
  ink: '#0A0F1A',
  inkSoft: '#141B29',

  // text
  text: '#0A0F1A',
  muted: 'rgba(10,15,26,0.62)',
  faint: 'rgba(10,15,26,0.40)',
  hairline: 'rgba(10,15,26,0.10)',
  hairlineStrong: 'rgba(10,15,26,0.16)',

  // on dark
  onDark: '#F7F9FC',
  onDarkMuted: 'rgba(247,249,252,0.62)',
  onDarkFaint: 'rgba(247,249,252,0.34)',
  onDarkLine: 'rgba(247,249,252,0.14)',

  // accent — one primary, emerald strictly for verified/success
  blue: '#1D4ED8',
  blueSoft: '#EEF3FF',
  emerald: '#0E9F6E',
  amber: '#B4791A',
  rose: '#C02626',

  // legacy aliases (kept so untouched files still compile)
  card: '#FFFFFF',
  cardAlt: '#F4F6F9',
  border: 'rgba(10,15,26,0.10)',
  borderStrong: 'rgba(10,15,26,0.16)',
  violet: '#0B2E7A',
  cyan: '#0E7C86',
  green: '#0E9F6E',
  shadowSm: '0 1px 2px rgba(10,15,26,0.05)',
  shadowMd: '0 6px 24px rgba(10,15,26,0.07)',
  shadowLg: '0 18px 60px rgba(10,15,26,0.10)',
}

export const MONO = "'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace"
export const DISPLAY = "'Manrope','Plus Jakarta Sans',system-ui,sans-serif"

// type scale — editorial, much larger than before
export const TYPE = {
  display: 'clamp(44px, 7.2vw, 96px)',
  h1:      'clamp(38px, 5.6vw, 72px)',
  h2:      'clamp(30px, 4vw, 52px)',
  h3:      'clamp(20px, 2vw, 26px)',
  lead:    'clamp(17px, 1.5vw, 21px)',
  body:    '17px',
  small:   '14px',
  micro:   '11.5px',
}

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
