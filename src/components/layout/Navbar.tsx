import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail, Home, Package, Layers, User, MessageSquare } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'
import type { NavItem } from '@/components/ui/tubelight-navbar'

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
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src="/logo.svg" alt="ZmaxLab" style={{ display: 'block', height: 36, width: 'auto' }} />
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
