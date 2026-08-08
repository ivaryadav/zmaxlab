import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import LogoCircle from './LogoCircle'
import { T, MONO, EASE } from '@/lib/theme'

const LINKS = [
  { to: '/',             label: 'Home' },
  { to: '/services',     label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about',        label: 'About' },
  { to: '/contact',      label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.86)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? T.hairline : 'transparent'}`,
        transition: 'background .4s ease, border-color .4s ease',
      }}>
        <div style={{
          maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)',
          height: scrolled ? 66 : 82, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 24, transition: 'height .4s cubic-bezier(.16,1,.3,1)',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}>
            <LogoCircle size={32} />
            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.035em', color: T.ink }}>
              Zmax<span style={{ color: T.blue }}>Lab</span>
            </span>
          </Link>

          {/* desktop links */}
          <nav className="zx-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            {LINKS.map(l => {
              const active = pathname === l.to
              return (
                <Link key={l.to} to={l.to} className="zx-link-underline" style={{
                  fontSize: 14.5, fontWeight: active ? 700 : 500,
                  color: active ? T.ink : T.muted, transition: 'color .3s',
                }}>{l.label}</Link>
              )
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link to="/contact" className="zx-nav-desktop" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: T.ink, color: '#fff', fontSize: 13.5, fontWeight: 650,
              padding: '11px 20px', borderRadius: 999, whiteSpace: 'nowrap',
            }}>
              Free demo <ArrowRight size={14} />
            </Link>
            <button
              className="zx-nav-mobile"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              style={{
                width: 40, height: 40, borderRadius: 999, border: `1px solid ${T.hairlineStrong}`,
                background: '#fff', display: 'none', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: T.ink,
              }}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99, background: T.bg,
              paddingTop: 96, paddingLeft: 'clamp(20px,6vw,48px)', paddingRight: 'clamp(20px,6vw,48px)',
            }}>
            {LINKS.map((l, i) => (
              <motion.div key={l.to}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}>
                <Link to={l.to} style={{
                  display: 'flex', alignItems: 'baseline', gap: 16,
                  padding: '20px 0', borderBottom: `1px solid ${T.hairline}`,
                  fontSize: 26, fontWeight: 750, letterSpacing: '-0.03em', color: T.ink,
                }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: T.faint, letterSpacing: '0.1em' }}>
                    0{i + 1}
                  </span>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 34,
              background: T.blue, color: '#fff', fontSize: 15, fontWeight: 700,
              padding: '15px 28px', borderRadius: 999,
            }}>Book a free demo <ArrowRight size={16} /></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
