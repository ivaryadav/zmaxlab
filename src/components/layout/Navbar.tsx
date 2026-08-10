import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import LogoCircle from './LogoCircle'
import { T, MONO, EASE, CALENDLY_URL } from '@/lib/theme'

const LINKS = [
  { to: '/',             label: 'Home' },
  { to: '/services',     label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/pricing',      label: 'Pricing' },
  { to: '/about',        label: 'About' },
  { to: '/contact',      label: 'Contact' },
]

/* TODO(Ravi): replace with your real number, or tell me to remove the phone entirely. */
const PHONE_DISPLAY = ''   // e.g. '(555) 010-2200'
const PHONE_HREF    = ''   // e.g. 'tel:+15550102200'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const DARK_HERO = ['/contact']
  const onDarkHero = DARK_HERO.includes(pathname) && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      {/* utility bar - price transparency + direct line, the eClinicalWorks trust device done cleanly */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 101,
        background: T.ink, color: T.onDark,
        transform: scrolled ? 'translateY(-100%)' : 'none',
        transition: 'transform .45s cubic-bezier(.16,1,.3,1)',
      }}>
        <div style={{
          maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)',
          height: 38, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.onDarkMuted }}>
            <span style={{ color: T.primaryBright, fontWeight: 600 }}>$500 flat</span>
            <span className="zx-util-hide"> · Live in 7 business days · No contract</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {PHONE_DISPLAY && (
              <a href={PHONE_HREF} style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', color: T.onDark, fontWeight: 600 }}>
                {PHONE_DISPLAY}
              </a>
            )}
            <a href="mailto:ravi@zmaxlab.site" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', color: T.onDarkMuted }}>
              ravi@zmaxlab.site
            </a>
          </span>
        </div>
      </div>

      <header style={{
        position: 'fixed', top: scrolled ? 0 : 38, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.90)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? T.hairline : 'transparent'}`,
        transition: 'background .4s ease, border-color .4s ease, top .45s cubic-bezier(.16,1,.3,1)',
      }}>
        <div style={{
          maxWidth: 1480, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)',
          height: scrolled ? 66 : 82, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 24, transition: 'height .4s cubic-bezier(.16,1,.3,1)',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }}>
            <LogoCircle size={32} />
            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.035em', color: onDarkHero ? T.onDark : T.ink }}>
              Zmax<span style={{ color: onDarkHero ? T.primaryBright : T.blue }}>Lab</span>
            </span>
          </Link>

          {/* desktop links */}
          <nav className="zx-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            {LINKS.map(l => {
              const active = pathname === l.to
              return (
                <Link key={l.to} to={l.to} className="zx-link-underline" style={{
                  fontSize: 14.5, fontWeight: active ? 700 : 500,
                  color: onDarkHero
                    ? (active ? T.onDark : T.onDarkMuted)
                    : (active ? T.ink : T.muted),
                  transition: 'color .3s',
                }}>{l.label}</Link>
              )
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link to="/pricing" className="zx-nav-desktop zx-price-chip" style={{
              fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.08em', fontWeight: 600,
              color: onDarkHero ? T.onDark : T.primaryDeep,
              background: onDarkHero ? 'rgba(255,255,255,0.16)' : T.primaryTint,
              border: onDarkHero ? '1px solid rgba(255,255,255,0.24)' : '1px solid transparent',
              padding: '8px 13px', borderRadius: 999, whiteSpace: 'nowrap',
            }}>
              $500 FLAT
            </Link>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="zx-nav-desktop" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: onDarkHero ? '#fff' : T.ink, color: onDarkHero ? T.ink : '#fff',
              fontSize: 13.5, fontWeight: 650,
              padding: '11px 20px', borderRadius: 999, whiteSpace: 'nowrap',
            }}>
              Free demo <ArrowRight size={14} />
            </a>
            <button
              className="zx-nav-mobile"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              style={{
                width: 40, height: 40, borderRadius: 999,
                border: `1px solid ${onDarkHero ? 'rgba(255,255,255,0.28)' : T.hairlineStrong}`,
                background: onDarkHero ? 'rgba(255,255,255,0.12)' : '#fff',
                display: 'none', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: onDarkHero ? T.onDark : T.ink,
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
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 34,
              background: T.blue, color: '#fff', fontSize: 15, fontWeight: 700,
              padding: '15px 28px', borderRadius: 999,
            }}>Book a free demo <ArrowRight size={16} /></a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
