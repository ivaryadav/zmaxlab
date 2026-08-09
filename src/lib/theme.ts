export const T = {
  bg: '#FFFFFF',
  surface: '#F4FBFA',
  surfaceDeep: '#E6F6F3',
  ink: '#07253A',
  inkDeep: '#041826',

  text: '#07253A',
  muted: 'rgba(7,37,58,0.76)',
  faint: 'rgba(7,37,58,0.54)',
  hairline: 'rgba(7,37,58,0.12)',
  hairlineStrong: 'rgba(7,37,58,0.22)',

  onDark: '#F2FBFA',
  onDarkMuted: 'rgba(242,251,250,0.80)',
  onDarkFaint: 'rgba(242,251,250,0.55)',
  onDarkLine: 'rgba(242,251,250,0.22)',

  // vivid signature palette
  primary: '#0B9C87',
  primaryBright: '#16C7A8',
  primaryDeep: '#077A6B',
  primaryTint: '#DFF7F2',
  coral: '#FF6B3D',
  coralTint: '#FFEDE6',
  gold: '#F2A413',

  // gradients - the thing that makes it feel alive
  gradPanel: 'linear-gradient(135deg,#DFF8F3 0%,#D3F0F7 52%,#E4EEFB 100%)',
  gradPanelDeep: 'linear-gradient(135deg,#07253A 0%,#0A4A52 55%,#0B7A6E 100%)',
  gradBtn: 'linear-gradient(135deg,#0B9C87 0%,#16C7A8 100%)',
  gradBtnCoral: 'linear-gradient(135deg,#FF6B3D 0%,#FF9161 100%)',
  gradText: 'linear-gradient(135deg,#0B9C87 0%,#16C7A8 60%,#3BB4E5 100%)',

  rose: '#D93A22',
  // legacy aliases
  blue: '#0B9C87', emerald: '#0B9C87', amber: '#F2A413', violet: '#077A6B',
  cyan: '#16C7A8', green: '#0B9C87', card: '#FFFFFF', cardAlt: '#F4FBFA',
  border: 'rgba(7,37,58,0.12)', borderStrong: 'rgba(7,37,58,0.22)',
  blueSoft: '#DFF7F2', surfaceWarm: '#F4FBFA', goldBright: '#F2A413', goldTint: '#FEF3DD',
  shadowSm: '0 1px 2px rgba(7,37,58,0.06)',
  shadowMd: '0 8px 28px rgba(7,37,58,0.10)',
  shadowLg: '0 24px 70px rgba(7,37,58,0.16)',
}

export const MONO = "'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace"
export const DISPLAY = "'Manrope','Plus Jakarta Sans',system-ui,sans-serif"

export const TYPE = {
  display: 'clamp(42px, 6.6vw, 88px)',
  h1: 'clamp(36px, 5.2vw, 66px)',
  h2: 'clamp(29px, 3.8vw, 50px)',
  h3: 'clamp(19px, 1.9vw, 25px)',
  lead: 'clamp(17px, 1.45vw, 20px)',
  body: '17px', small: '14px', micro: '11.5px',
}

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
