import type { ReactNode, CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { T, MONO, TYPE, EASE } from '@/lib/theme'

export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.85, delay, ease: EASE },
})

/** horizontal slide-in - used to give two-column sections real direction */
export const slideIn = (dir: 'left' | 'right' = 'left', delay = 0) => ({
  initial: { opacity: 0, x: dir === 'left' ? -46 : 46 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.95, delay, ease: EASE },
})

export const MAX = 1240

export function Shell({ children, style, wide }: { children: ReactNode; style?: CSSProperties; wide?: boolean }) {
  return <div style={{ maxWidth: wide ? 1480 : MAX, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', ...style }}>{children}</div>
}

export function Section({
  children, dark, tint, pad = 'clamp(88px,11vw,150px)', padBottom, style, id,
}: { children: ReactNode; dark?: boolean; tint?: boolean; pad?: string; padBottom?: string; style?: CSSProperties; id?: string }) {
  return (
    <section id={id} style={{
      paddingTop: pad,
      paddingBottom: padBottom ?? pad,
      background: dark ? T.ink : tint ? T.surface : T.bg,
      color: dark ? T.onDark : T.text,
      ...style,
    }}>{children}</section>
  )
}

/** mono eyebrow with a leading rule - used to open every section */
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
  return <h1 style={{ fontSize: TYPE.display, lineHeight: 1.06, fontWeight: 600, letterSpacing: '-0.018em', margin: 0, maxWidth: '17ch', ...style }}>{children}</h1>
}

export function H2({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <h2 style={{ fontSize: TYPE.h2, lineHeight: 1.14, fontWeight: 600, letterSpacing: '-0.015em', margin: 0, maxWidth: '24ch', ...style }}>{children}</h2>
}

export function Lead({ children, dark, style }: { children: ReactNode; dark?: boolean; style?: CSSProperties }) {
  return <p style={{ fontSize: TYPE.lead, lineHeight: 1.68, color: dark ? T.onDarkMuted : T.muted, margin: 0, ...style }}>{children}</p>
}

export function Mono({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span style={{ fontFamily: MONO, fontSize: TYPE.micro, letterSpacing: '0.08em', ...style }}>{children}</span>
}

/** solid primary button - the only filled button on the site */
export function Btn({ to, children, dark, onClick }: { to?: string; children: ReactNode; dark?: boolean; onClick?: () => void }) {
  const s: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: dark ? '#fff' : T.gradBtn, color: dark ? T.ink : '#fff',
    fontSize: 15, fontWeight: 700, padding: '16px 30px', borderRadius: 12,
    border: 'none', cursor: 'pointer',
    boxShadow: dark ? 'none' : '0 10px 26px rgba(11,156,135,0.32)',
    transition: 'transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s',
  }
  const inner = <span style={s} onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>{children}</span>
  if (onClick) return <button onClick={onClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>{inner}</button>
  if (!to) return inner
  if (/^https?:/.test(to)) return <a href={to} target="_blank" rel="noopener noreferrer">{inner}</a>
  if (to.startsWith('mailto:') || to.startsWith('tel:')) return <a href={to}>{inner}</a>
  return <Link to={to}>{inner}</Link>
}

/** ghost/secondary - text with animated underline, never a second filled button */
export function TextLink({ to, children, dark }: { to: string; children: ReactNode; dark?: boolean }) {
  const css: CSSProperties = {
    fontSize: 15, fontWeight: 600, color: dark ? T.onDark : T.text,
    display: 'inline-flex', alignItems: 'center', gap: 8,
  }
  if (/^https?:/.test(to)) {
    return <a href={to} target="_blank" rel="noopener noreferrer" className="zx-link-underline" style={css}>{children}</a>
  }
  if (to.startsWith('mailto:') || to.startsWith('tel:')) {
    return <a href={to} className="zx-link-underline" style={css}>{children}</a>
  }
  return <Link to={to} className="zx-link-underline" style={css}>{children}</Link>
}

/** big mono index numeral used to structure lists instead of cards */
export function Index({ n, dark }: { n: string; dark?: boolean }) {
  return <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.1em', color: dark ? T.onDarkFaint : T.faint, fontWeight: 500 }}>{n}</span>
}

export { motion }


/** vivid gradient panel - the device that makes the page feel alive */
export function Panel({ children, deep, style }: { children: ReactNode; deep?: boolean; style?: CSSProperties }) {
  return (
    <div style={{
      background: deep ? T.gradPanelDeep : T.gradPanel,
      borderRadius: 20,
      padding: 'clamp(30px,4.5vw,64px)',
      color: deep ? T.onDark : T.text,
      ...style,
    }}>{children}</div>
  )
}

/** gradient headline word */
export function Grad({ children }: { children: ReactNode }) {
  return (
    <span style={{
      background: T.gradText, WebkitBackgroundClip: 'text', backgroundClip: 'text',
      WebkitTextFillColor: 'transparent', color: 'transparent',
    }}>{children}</span>
  )
}

/** small pill used above headings */
export function Pill({ children, tone = 'teal' }: { children: ReactNode; tone?: 'teal' | 'coral' }) {
  const teal = tone === 'teal'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: teal ? T.primaryTint : T.coralTint,
      color: teal ? T.primaryDeep : T.coral,
      fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
      fontWeight: 600, padding: '7px 14px', borderRadius: 999, marginBottom: 20,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: teal ? T.primaryBright : T.coral }} />
      {children}
    </span>
  )
}

/** autoplaying muted loop video - used as living imagery, never as decoration */
export function Vid({ src, poster, style, className }: { src: string; poster?: string; style?: CSSProperties; className?: string }) {
  return (
    <video
      src={src} poster={poster}
      autoPlay muted loop playsInline preload="metadata"
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  )
}

/* ── Slider: auto-advancing, swipeable, with progress dots ─────────── */
import { useState as _useState, useEffect as _useEffect, useRef as _useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

export type Slide = { img: string; title: string; body: string; focus?: string }

export function Slider({ slides, interval = 2000 }: { slides: Slide[]; interval?: number }) {
  const [i, setI] = _useState(0)
  const [paused, setPaused] = _useState(false)
  const startX = _useRef(0)

  _useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI(v => (v + 1) % slides.length), interval)
    return () => clearInterval(t)
  }, [paused, slides.length, interval])

  const go = (n: number) => setI((n + slides.length) % slides.length)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={e => { startX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        const d = e.changedTouches[0].clientX - startX.current
        if (Math.abs(d) > 44) go(d < 0 ? i + 1 : i - 1)
      }}
      style={{ position: 'relative' }}
    >
      <div style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        aspectRatio: '16/10', background: T.surface,
        boxShadow: '0 26px 70px rgba(7,37,58,0.20)',
      }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img src={slides[i].img} alt={slides[i].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                       objectPosition: slides[i].focus ?? 'center 22%' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(7,37,58,0.90) 0%, rgba(7,37,58,0.30) 55%, rgba(7,37,58,0.05) 100%)',
            }} />
          </motion.div>
        </AnimatePresence>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(20px,3vw,36px)' }}>
          <AnimatePresence mode="wait">
            <motion.div key={i}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.42, ease: EASE }}>
              <h3 style={{ fontSize: 'clamp(19px,2.2vw,27px)', fontWeight: 750, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
                {slides[i].title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.86)', margin: 0, maxWidth: 460 }}>
                {slides[i].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* progress dots */}
      <div style={{ display: 'flex', gap: 8, marginTop: 18, alignItems: 'center' }}>
        {slides.map((_, n) => (
          <button key={n} onClick={() => go(n)} aria-label={`Slide ${n + 1}`}
            style={{
              height: 3, flex: n === i ? '0 0 42px' : '0 0 16px', borderRadius: 999,
              background: n === i ? T.primary : T.hairlineStrong,
              border: 'none', padding: 0, cursor: 'pointer', transition: 'flex .45s cubic-bezier(.16,1,.3,1), background .3s',
            }} />
        ))}
        <Mono style={{ color: T.faint, marginLeft: 'auto' }}>{`${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`}</Mono>
      </div>
    </div>
  )
}

/** subtle parallax-on-scroll wrapper for imagery */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 42, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >{children}</motion.div>
  )
}
