import type { ReactNode, CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { T, MONO, TYPE, EASE } from '@/lib/theme'

export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, delay, ease: EASE },
})

export const MAX = 1240

export function Shell({ children, style, wide }: { children: ReactNode; style?: CSSProperties; wide?: boolean }) {
  return <div style={{ maxWidth: wide ? 1480 : MAX, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', ...style }}>{children}</div>
}

export function Section({
  children, dark, tint, pad = 'clamp(88px,11vw,150px)', style, id,
}: { children: ReactNode; dark?: boolean; tint?: boolean; pad?: string; style?: CSSProperties; id?: string }) {
  return (
    <section id={id} style={{
      padding: `${pad} 0`,
      background: dark ? T.ink : tint ? T.surface : T.bg,
      color: dark ? T.onDark : T.text,
      ...style,
    }}>{children}</section>
  )
}

/** mono eyebrow with a leading rule — used to open every section */
export function Eyebrow({ children, dark, color }: { children: ReactNode; dark?: boolean; color?: string }) {
  const c = color ?? (dark ? T.onDarkMuted : T.muted)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
      <span style={{ width: 30, height: 1, background: dark ? T.onDarkLine : T.hairlineStrong, flexShrink: 0 }} />
      <span style={{ fontFamily: MONO, fontSize: TYPE.micro, letterSpacing: '0.16em', textTransform: 'uppercase', color: c, fontWeight: 500 }}>
        {children}
      </span>
    </div>
  )
}

export function Display({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <h1 style={{ fontSize: TYPE.display, lineHeight: 0.98, fontWeight: 800, letterSpacing: '-0.035em', margin: 0, ...style }}>{children}</h1>
}

export function H2({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <h2 style={{ fontSize: TYPE.h2, lineHeight: 1.06, fontWeight: 800, letterSpacing: '-0.028em', margin: 0, ...style }}>{children}</h2>
}

export function Lead({ children, dark, style }: { children: ReactNode; dark?: boolean; style?: CSSProperties }) {
  return <p style={{ fontSize: TYPE.lead, lineHeight: 1.68, color: dark ? T.onDarkMuted : T.muted, margin: 0, ...style }}>{children}</p>
}

export function Mono({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span style={{ fontFamily: MONO, fontSize: TYPE.micro, letterSpacing: '0.08em', ...style }}>{children}</span>
}

/** solid primary button — the only filled button on the site */
export function Btn({ to, children, dark, onClick }: { to?: string; children: ReactNode; dark?: boolean; onClick?: () => void }) {
  const s: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: dark ? T.onDark : T.blue, color: dark ? T.ink : '#fff',
    fontSize: 15, fontWeight: 700, padding: '15px 28px', borderRadius: 999,
    border: 'none', cursor: 'pointer', transition: 'transform .3s cubic-bezier(.16,1,.3,1), opacity .3s',
  }
  const inner = <span style={s} onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>{children}</span>
  if (onClick) return <button onClick={onClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>{inner}</button>
  return <a href={to}>{inner}</a>
}

/** ghost/secondary — text with animated underline, never a second filled button */
export function TextLink({ to, children, dark }: { to: string; children: ReactNode; dark?: boolean }) {
  return (
    <a href={to} className="zx-link-underline" style={{
      fontSize: 15, fontWeight: 600, color: dark ? T.onDark : T.text,
      display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>{children}</a>
  )
}

/** big mono index numeral used to structure lists instead of cards */
export function Index({ n, dark }: { n: string; dark?: boolean }) {
  return <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.1em', color: dark ? T.onDarkFaint : T.faint, fontWeight: 500 }}>{n}</span>
}

export { motion }
