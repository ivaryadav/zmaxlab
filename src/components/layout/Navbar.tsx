import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail, Home, Package, Layers, User, MessageSquare } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'
import type { NavItem } from '@/components/ui/tubelight-navbar'
import LogoCircle from './LogoCircle'

const T = { blue:'#2563eb', violet:'#7c3aed', text:'#f1f5f9', muted:'rgba(241,245,249,0.55)', border:'rgba(255,255,255,0.07)' }
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const links = [
  { to:'/',              label:'Home'         },
  { to:'/services',      label:'Services'     },
  { to:'/how-it-works',  label:'How It Works' },
  { to:'/about',         label:'About Ravi'   },
  { to:'/contact',       label:'Contact'      },
]

const NAV_ITEMS: NavItem[] = [
  { name:'Home',         url:'/',             icon: Home         },
  { name:'Services',     url:'/services',     icon: Package      },
  { name:'How It Works', url:'/how-it-works', icon: Layers       },
  { name:'About Ravi',   url:'/about',        icon: User         },
  { name:'Contact',      url:'/contact',      icon: MessageSquare},
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const isActive = (to: string) => pathname === to

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
          padding: scrolled ? '10px 5%' : '18px 5%',
          background: scrolled ? 'rgba(4,6,15,0.97)' : 'rgba(4,6,15,0.8)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          overflow: 'visible',
          transition: 'padding .35s, background .35s, border-color .35s',
        }}
      >
        {/* Logo — circular glass icon + wordmark */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0, textDecoration: 'none' }}>
          {/* Circular icon with glow ring */}
          <motion.div
            style={{ position: 'relative', flexShrink: 0 }}
            whileHover={{ y: -2, scale: 1.06 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: -6, borderRadius: '50%', pointerEvents: 'none',
                boxShadow: '0 0 20px rgba(0,230,118,0.5), 0 0 44px rgba(0,230,118,0.18)',
              }}
            />
            {/* Natural eye-blink — fast close, brief hold, smooth spring open */}
            <motion.div
              style={{ transformOrigin: 'center center', lineHeight: 0 }}
              animate={{ scaleY: [1, 1, 0.03, 0.03, 1] }}
              transition={{
                duration: 0.42,
                times: [0, 0.45, 0.62, 0.74, 1],
                ease: ['linear', [0.4, 0, 1, 1], 'linear', [0, 0, 0.3, 1]],
                repeat: Infinity,
                repeatDelay: 1.4,
              }}
            >
              <LogoCircle size={42} />
            </motion.div>
          </motion.div>

          {/* Wordmark — separate from icon */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.6px', color: '#ddeeff', whiteSpace: 'nowrap' }}>
              Zmax
              <span style={{ background: 'linear-gradient(90deg,#00d4a8,#1a8eff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Lab</span>
            </span>
            <span style={{ fontSize: 8, letterSpacing: '1.6px', color: 'rgba(241,245,249,0.32)', fontWeight: 500, textTransform: 'uppercase', marginTop: 3 }}>
              HEALTHCARE WEBSITES
            </span>
          </div>
        </Link>

        {/* Desktop nav links - tubelight pill */}
        <div className="nav-links">
          <NavBar items={NAV_ITEMS} />
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="mailto:ravi@zmaxlab.site" className="nav-email" style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 12, fontWeight: 500, color: T.muted, textDecoration: 'none',
          }}>
            <Mail size={12} />ravi@zmaxlab.site
          </a>
          <Link to="/contact" style={{
            background: `linear-gradient(135deg,${T.blue},${T.violet})`,
            color: '#fff', fontSize: 13, fontWeight: 700,
            padding: '9px 20px', borderRadius: 999,
            boxShadow: `0 4px 16px rgba(37,99,235,0.35)`,
            whiteSpace: 'nowrap', textDecoration: 'none',
          }}>
            Free Demo →
          </Link>
          <button onClick={() => setOpen(o => !o)} className="nav-burger" aria-label="Menu" style={{
            display: 'none', background: 'none', border: 'none', color: T.text, cursor: 'pointer', padding: 4,
          }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 8999,
              background: 'rgba(4,6,15,0.98)', backdropFilter: 'blur(24px)',
              padding: '16px 5% 24px',
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', padding: '13px 0', fontSize: 16, fontWeight: 600,
                color: isActive(l.to) ? T.blue : T.muted,
                borderBottom: `1px solid rgba(255,255,255,0.05)`,
                textDecoration: 'none',
              }}>
                {l.label}
              </Link>
            ))}
            <a href="mailto:ravi@zmaxlab.site" style={{
              display: 'block', marginTop: 12, padding: '12px 0',
              fontSize: 14, fontWeight: 500, color: T.muted,
              borderBottom: `1px solid rgba(255,255,255,0.05)`, textDecoration: 'none',
            }}>
              ravi@zmaxlab.site
            </a>
            <Link to="/contact" style={{
              display: 'block', marginTop: 16,
              background: `linear-gradient(135deg,${T.blue},${T.violet})`,
              color: '#fff', fontWeight: 700, padding: '13px',
              borderRadius: 12, textAlign: 'center', textDecoration: 'none',
            }}>
              Get Free Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          .nav-links,.nav-email{ display:none!important }
          .nav-burger{ display:flex!important }
        }
      `}</style>
    </>
  )
}
