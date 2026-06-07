import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About Ravi' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
          padding: scrolled ? '10px 5%' : '18px 5%',
          background: scrolled ? 'rgba(3,5,26,0.97)' : 'rgba(3,5,26,0.8)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          transition: 'padding .35s, background .35s',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.svg" alt="ZmaxLab" style={{ display: 'block', height: 38, width: 'auto' }}/>
        </Link>

        <div className="nav-links" style={{ display: 'flex', gap: 2 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontSize: 13, fontWeight: 600, padding: '7px 13px', borderRadius: 8,
              color: pathname === l.to ? '#fff' : 'rgba(255,255,255,0.6)',
              background: pathname === l.to ? 'rgba(255,255,255,0.08)' : 'transparent',
              transition: '.2s',
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="mailto:ravi@zmaxlab.site" className="nav-email" style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)',
            textDecoration: 'none',
          }}>
            <Mail size={12} />ravi@zmaxlab.site
          </a>
          <Link to="/contact" style={{
            background: 'linear-gradient(135deg,#1b6fff,#00c896)',
            color: '#fff', fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13, fontWeight: 700, padding: '9px 20px', borderRadius: 999,
            boxShadow: '0 4px 16px rgba(27,111,255,0.3)', whiteSpace: 'nowrap',
          }}>
            Free Demo →
          </Link>
          <button onClick={() => setOpen(o => !o)} className="nav-burger" style={{
            display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4,
          }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 8999,
              background: 'rgba(3,5,26,0.98)', backdropFilter: 'blur(20px)',
              padding: '16px 5% 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', padding: '12px 0', fontSize: 16, fontWeight: 600,
                color: pathname === l.to ? '#00c896' : 'rgba(255,255,255,0.8)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                {l.label}
              </Link>
            ))}
            <a href="mailto:ravi@zmaxlab.site" style={{
              display: 'block', marginTop: 12, padding: '12px 0', fontSize: 14, fontWeight: 500,
              color: 'rgba(255,255,255,0.55)', borderBottom: '1px solid rgba(255,255,255,0.05)',
              textDecoration: 'none',
            }}>
              ravi@zmaxlab.site
            </a>
            <Link to="/contact" style={{
              display: 'block', marginTop: 16, background: 'linear-gradient(135deg,#1b6fff,#00c896)',
              color: '#fff', fontWeight: 700, padding: '12px', borderRadius: 999, textAlign: 'center',
            }}>
              Get Free Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          .nav-links,.nav-email{display:none!important}
          .nav-burger{display:flex!important}
        }
      `}</style>
    </>
  )
}
