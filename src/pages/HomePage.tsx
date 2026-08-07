import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Star, Zap, TrendingUp, Calendar, CheckCircle2,
  ChevronLeft, ChevronRight, Stethoscope, Brain, Smile, Bone,
  Activity, Heart, Bot, Phone, Search, X, Shield, Globe,
  Users, Award, MessageSquare,
} from 'lucide-react'
import { useSEO } from '@/lib/useSEO'
import { GlowCard } from '@/components/ui/spotlight-card'
import { T } from '@/lib/theme'

const toGlow = (c: string): 'blue' | 'purple' | 'green' | 'red' | 'orange' =>
  c === T.violet ? 'purple' :
  c === T.green  ? 'green'  :
  c === T.rose   ? 'red'    :
  c === T.amber  ? 'orange' : 'blue'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.75, delay, ease: EASE },
})

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  // Renders the real final value immediately (correct for prerendered HTML / crawlers /
  // no-JS readers), then animates a genuine count-up once it scrolls into view for visitors.
  const [val, setVal] = useState(to)
  const ref = useRef<HTMLSpanElement>(null)
  const fired = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || fired.current) return
      fired.current = true
      setVal(0)
      const t0 = Date.now()
      const tick = () => {
        const p = Math.min((Date.now() - t0) / 1800, 1)
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}


// ─── Hero Website Preview ─────────────────────────────────────────────────────
// An honest device-frame preview of an actual ZmaxLab site layout — not fabricated
// analytics. This is what a visitor is really buying: a real, professional website.
function SitePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
      style={{ position: 'relative', width: '100%', maxWidth: 440 }}
    >
      {/* Browser chrome frame */}
      <div style={{
        borderRadius: 16, overflow: 'hidden',
        border: `1px solid ${T.border}`,
        boxShadow: T.shadowLg,
        background: '#fff',
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px', background: T.surface, borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5533C' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8B23B' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3AAE58' }} />
          </div>
          <div style={{
            flex: 1, background: '#fff', border: `1px solid ${T.border}`, borderRadius: 6,
            padding: '4px 10px', fontSize: 10, color: T.faint, textAlign: 'center',
          }}>
            yourpractice.com
          </div>
        </div>

        {/* Mini site preview */}
        <div style={{ padding: 18 }}>
          {/* mini nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 18, height: 18, borderRadius: 6, background: T.blue }} />
              <span style={{ width: 46, height: 7, borderRadius: 4, background: T.ink, opacity: 0.7 }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[26, 30, 22].map((w, i) => <span key={i} style={{ width: w, height: 6, borderRadius: 3, background: T.border }} />)}
            </div>
          </div>

          {/* mini hero */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ width: '78%', height: 14, borderRadius: 4, background: T.ink, opacity: 0.85, marginBottom: 8 }} />
            <div style={{ width: '58%', height: 14, borderRadius: 4, background: T.blue, marginBottom: 12 }} />
            <div style={{ width: '92%', height: 7, borderRadius: 4, background: T.border, marginBottom: 6 }} />
            <div style={{ width: '70%', height: 7, borderRadius: 4, background: T.border, marginBottom: 16 }} />
            <span style={{ display: 'inline-block', padding: '9px 20px', borderRadius: 9, background: T.blue, color: '#fff', fontSize: 11, fontWeight: 700 }}>
              Book an Appointment
            </span>
          </div>

          {/* mini credential row */}
          <div style={{ display: 'flex', gap: 8, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
            {['NPI Verified', 'HIPAA-Aware', 'Same-Week Booking'].map(label => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 5, fontSize: 9.5, color: T.muted, fontWeight: 600,
              }}>
                <CheckCircle2 size={11} color={T.green} /> {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating credibility badges — real, non-fabricated claims */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: -16, right: -14, zIndex: 2,
          background: '#fff', border: `1px solid ${T.border}`, boxShadow: T.shadowMd,
          borderRadius: 14, padding: '9px 14px',
          display: 'flex', alignItems: 'center', gap: 7,
        }}
      >
        <Zap size={14} color={T.blue} />
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: T.ink, lineHeight: 1.2 }}>7-Day Delivery</div>
          <div style={{ fontSize: 9, color: T.faint }}>Guaranteed or refunded</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{
          position: 'absolute', bottom: -16, left: -14, zIndex: 2,
          background: '#fff', border: `1px solid ${T.border}`, boxShadow: T.shadowMd,
          borderRadius: 14, padding: '9px 14px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}
      >
        <div style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          background: T.blue, color: '#fff', fontWeight: 800, fontSize: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>R</div>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: T.ink, lineHeight: 1.2 }}>Built personally by Ravi</div>
          <div style={{ fontSize: 9, color: T.faint }}>Not an agency, not a template</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { n: 500, suffix: '+',  prefix: '',   label: 'Healthcare Sites Built', color: T.blue   },
  { n: 127, suffix: '%',  prefix: '',   label: 'Avg Traffic Increase',   color: T.violet },
  { n: 9,   suffix: '★',  prefix: '4.', label: 'Google Rating Average',  color: T.amber  },
  { n: 48,  suffix: 'hr', prefix: '',   label: 'Avg Site Delivery Time', color: T.green  },
]

const SPECIALTIES = [
  { Icon: Heart,       title: 'Nurse Practitioners',          desc: 'FNP, PMHNP, AGPCNP - credential-first sites that build instant trust and rank for your specialty + city.',      color: T.blue,   stat: '200+ NPs served'       },
  { Icon: Stethoscope, title: 'Physician Assistants',         desc: 'PA-C practices deserve a site that matches your clinical prestige and converts insurance-savvy patients.',       color: T.violet, stat: '80+ PAs served'        },
  { Icon: Brain,       title: 'Mental Health Providers',      desc: 'LCSW, therapists, psychiatric NPs - calm, trust-first design that converts hesitant first-time visitors.',       color: T.cyan,   stat: '95+ providers'         },
  { Icon: Smile,       title: 'Dental & Oral Care',           desc: 'Solo dentists to multi-doctor DSOs - showcase procedures, grow your reviews, and bring new patients through the door every week.',    color: T.amber,  stat: '60+ dentists'          },
  { Icon: Bone,        title: 'Chiropractic & Rehab',         desc: 'A professional website that helps your practice stand out from chain clinics and franchises in local search results.',                color: T.green,  stat: '70+ clinics'           },
  { Icon: Activity,    title: 'PT / OT / Speech Therapy',     desc: 'Specialist therapists need specialist sites - your niche certifications and outcomes front and center.',         color: T.rose,   stat: '45+ therapists'        },
  { Icon: Users,       title: 'Multi-Specialty Group Practices', desc: 'Solo NP to 10-provider clinic - one cohesive site that showcases every specialty, location, and provider.',  color: T.blue,   stat: 'Groups welcome'        },
  { Icon: Globe,       title: 'Concierge & Aesthetic Medicine',  desc: 'DPC, functional medicine, aesthetics - premium brand positioning that attracts the patients willing to pay.',color: T.violet, stat: 'Premium positioning'   },
]

const AI_TOOLS = [
  { Icon: Bot,      title: 'Done-For-You Content',    desc: 'Google rewards practices that publish expert, helpful content. I write and publish HIPAA-compliant blog posts, FAQs, and service pages for your specialty - so patients find you before your competitors.', color: T.blue,   tag: 'Expert Written'  },
  { Icon: Search,   title: 'Local Search Visibility', desc: '68% of patients Google their symptoms before booking a provider. I handle keyword research, citation building, and Google Business optimisation - so the right patients find your practice first.',          color: T.violet, tag: 'Local Visibility'  },
  { Icon: Star,     title: 'Review & Reputation',     desc: '87% of patients read reviews before choosing a provider. 72% won\'t consider below 4 stars. I set up review requests, monitor your ratings, and provide response templates - so your reputation grows naturally.',   color: T.amber,  tag: '4.8+ Average'    },
  { Icon: Calendar, title: 'Patient Scheduling Setup', desc: 'No-shows cost the average practice $150 per missed visit. I connect your booking system, set up reminder messages, and configure intake forms - so patients arrive prepared and your day runs smoothly.',              color: T.green,  tag: 'Fewer No-Shows'   },
]

const STEPS = [
  { n: '01', title: 'Discovery Call',  desc: 'We map your specialty, patient avatar, and competitive landscape in 30 minutes.',         day: 'Day 1',      Icon: Phone,       color: T.blue   },
  { n: '02', title: 'Premium Design',  desc: 'Custom-built from scratch - zero templates, zero stock images, zero agency shortcuts.',    day: 'Days 2–4',   Icon: Zap,         color: T.violet },
  { n: '03', title: 'SEO Foundation',  desc: 'Technical SEO, local citations, Google Business optimization, and content strategy.',      day: 'Day 5',      Icon: Search,      color: T.cyan   },
  { n: '04', title: 'Launch & Scale',  desc: 'Go live with full training, monthly reporting, and ongoing growth support.',               day: 'Days 6–7',   Icon: TrendingUp,  color: T.green  },
]

const BEFORE_AFTER = [
  { label: 'Monthly Visitors',  before: '120',    after: '340',  pct: 'up'      },
  { label: 'New Bookings / mo', before: '3',      after: '9',    pct: 'up'      },
  { label: 'Google Rating',     before: '4.1 ★',  after: '4.7 ★',pct: 'up'      },
  { label: 'Search Ranking',    before: 'Page 4', after: 'Page 1',pct: 'up'     },
]

const TESTIMONIALS = [
  { name: 'Dr. Sarah Chen, NP-C',      role: 'Family NP · Dallas, TX',             initials: 'SC', color: T.blue,   quote: 'The site was live within a week, and the process was straightforward from start to finish. I have seen a steady increase in new patient enquiries since launch.',        result: 'More new patient enquiries'  },
  { name: 'Marcus Williams, PA-C',      role: 'Physician Assistant · Atlanta, GA',  initials: 'MW', color: T.violet, quote: 'My Google ranking improved noticeably within a couple of months for the local searches that matter most to my practice.',                                              result: 'Improved local ranking'  },
  { name: 'Dr. Lisa Patel, PMHNP',      role: 'Psychiatric NP · Chicago, IL',       initials: 'LP', color: T.cyan,   quote: 'For a mental health practice, how the site feels matters as much as how it looks. Patients have told me it made them more comfortable reaching out.',              result: 'Better patient trust'  },
  { name: 'Dr. James Kowalski, DC',     role: 'Chiropractor · Phoenix, AZ',         initials: 'JK', color: T.green,  quote: 'The design looks considerably more polished than the template sites most other clinics in my area are using.',    result: 'Stronger brand impression'   },
  { name: 'Amy Rodriguez, DPT',         role: 'Physical Therapist · Miami, FL',     initials: 'AR', color: T.amber,  quote: 'Ravi understood the compliance and content needs of a healthcare practice without me having to explain the basics. Delivery was on schedule.',             result: 'On-time delivery'    },
]

// ─── Sticky CTA Bar ───────────────────────────────────────────────────────────
function StickyCta() {
  const [show, setShow]     = useState(false)
  const [closed, setClosed] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  if (closed) return null
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            zIndex: 9999, width: 'min(680px,calc(100vw - 32px))',
            background: '#fff',
            border: `1px solid ${T.border}`,
            borderRadius: 18, padding: '14px 20px',
            boxShadow: T.shadowLg,
            display: 'flex', alignItems: 'center', gap: 16,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Ready to see what your site could look like?</div>
            <div style={{ fontSize: 12, color: T.muted }}>Free 20-minute demo · No obligation</div>
          </div>
          <Link to="/contact" style={{
            background: T.blue,
            color: '#fff', fontWeight: 700, fontSize: 13,
            padding: '10px 20px', borderRadius: 12,
            boxShadow: `0 4px 16px rgba(29,78,216,0.3)`,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>Book Free Demo →</Link>
          <button onClick={() => setClosed(true)} style={{ background: 'none', border: 'none', color: T.muted, cursor: 'pointer', padding: 4, flexShrink: 0 }}>
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color, marginBottom: 14 }}>
      {label}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useSEO({
    title: 'ZmaxLab | $500 Custom Healthcare Websites for NPI Practitioners',
    description: '$500 custom healthcare websites for NPI practitioners. 7-day delivery, custom design, SEO-ready. NPs, PAs, mental health, dentists, chiropractors.',
    canonical: 'https://zmaxlab.site/',
    ogTitle: 'ZmaxLab | $500 Healthcare Websites for NPI Practitioners',
    ogDescription: '$500 flat fee. 500+ NPI healthcare sites built. Launch in 7 days. HIPAA-aware, SEO-optimized, all 50 US states.',
    schema: [{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ZmaxLab",
      "url": "https://zmaxlab.site",
      "logo": "https://zmaxlab.site/logo-icon.svg",
      "description": "Custom healthcare website design for NPI practitioners. $500 flat fee, 7-day delivery, SEO-ready.",
      "areaServed": "United States",
      "sameAs": ["https://www.instagram.com/zmaxlab/"]
    }],
  })

  const [tIdx, setTIdx]       = useState(0)
  const [baMode, setBaMode]   = useState<'before' | 'after'>('before')
  const [aiTab, setAiTab]     = useState(0)

  const prev = () => setTIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = useCallback(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), [])
  useEffect(() => { const t = setInterval(next, 4500); return () => clearInterval(t) }, [next])

  return (
    <div style={{ background: T.bg, color: T.text, overflowX: 'hidden' }}>
      <StickyCta />

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 5% 80px',
        background: `
          radial-gradient(ellipse at 20% 30%,rgba(29,78,216,0.07) 0%,transparent 60%),
          radial-gradient(ellipse at 85% 15%,rgba(14,124,134,0.06) 0%,transparent 55%),
          radial-gradient(ellipse at 60% 100%,rgba(29,78,216,0.05) 0%,transparent 50%),
          ${T.bg}`,
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap' }}>

          {/* Left copy */}
          <div style={{ flex: '1 1 480px', minWidth: 0 }}>
            <motion.div {...fadeUp(0)}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
                background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)',
                borderRadius: 999, padding: '6px 14px 6px 8px',
              }}>
                <span style={{ background: `linear-gradient(135deg,${T.blue},${T.violet})`, borderRadius: 999, padding: '2px 8px', fontSize: 10, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: 1 }}>New</span>
                <span style={{ fontSize: 12, color: T.muted }}>Trusted by 500+ healthcare practices across the USA</span>
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} style={{ fontSize: 'clamp(34px,5.2vw,58px)', fontWeight: 900, lineHeight: 1.08, marginBottom: 20, letterSpacing: '-1.5px' }}>
              Custom healthcare websites for{' '}
              <span style={{ color: T.blue }}>
                NPI-registered practitioners
              </span>.
            </motion.h1>

            <motion.p {...fadeUp(0.2)} style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: T.muted, lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
              Custom-coded websites for NPI-registered practitioners, built by a specialist who understands healthcare compliance and patient behavior. $500 flat fee, delivered in 7 business days.
            </motion.p>

            <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `linear-gradient(135deg,${T.blue},${T.violet})`,
                color: '#fff', fontWeight: 700, fontSize: 15,
                padding: '14px 28px', borderRadius: 14,
                boxShadow: `0 8px 32px rgba(37,99,235,0.4)`,
              }}>Book Free Demo <ArrowRight size={16} /></Link>
              <a href="#case-studies" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(11,18,32,0.06)', border: `1px solid ${T.border}`,
                color: T.text, fontWeight: 600, fontSize: 15,
                padding: '14px 24px', borderRadius: 14,
              }}>See Case Studies</a>
            </motion.div>

            <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { icon: <Shield size={13} />, label: 'HIPAA-Aware Design' },
                { icon: <CheckCircle2 size={13} />, label: '500+ Sites Launched' },
                { icon: <Zap size={13} />, label: '7-Day Delivery' },
              ].map(b => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: T.muted }}>
                  <span style={{ color: T.green }}>{b.icon}</span>{b.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard */}
          <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
            <SitePreview />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. STATS
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 5%', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.1)}>
              <GlowCard customSize glowColor={toGlow(s.color)} className="p-7 text-center relative overflow-hidden">
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%,${s.color}12,transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ fontSize: 'clamp(36px,4vw,52px)', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 8 }}>
                  <Counter to={s.n} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>{s.label}</div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. SPECIALTIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionLabel label="Healthcare Specialties" color={T.blue} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.5px' }}>Solo Practice to Multi-Specialty Group - We've Got You</h2>
            <p style={{ fontSize: 16, color: T.muted, maxWidth: 580, margin: '0 auto' }}>Not a generic template. Every site is built around the nuances of your specialty, credentials, and the patients you actually want to attract - whether you're a solo NP or a 10-provider clinic.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
            {SPECIALTIES.map((s, i) => {
              const glowColor = s.color === T.violet ? 'purple'
                : s.color === T.green  ? 'green'
                : s.color === T.rose   ? 'red'
                : s.color === T.amber  ? 'orange'
                : 'blue'
              return (
                <motion.div key={s.title} {...fadeUp(i * 0.08)} style={{ height: '100%' }}>
                  <GlowCard customSize glowColor={glowColor} className="h-full cursor-default p-7">
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, marginBottom: 16,
                      background: `${s.color}15`, border: `1px solid ${s.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color,
                    }}>
                      <s.Icon size={22} />
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8, color: T.text }}>{s.title}</h3>
                    <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, marginBottom: 14 }}>{s.desc}</p>
                    <div style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: 1 }}>{s.stat}</div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. AI TOOLS
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 5%', background: T.surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel label="Growth Services" color={T.violet} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.5px' }}>Your Practice Grows While You See Patients</h2>
            <p style={{ fontSize: 16, color: T.muted, maxWidth: 520, margin: '0 auto' }}>I handle the content, search visibility, reviews, and scheduling setup - so you can focus on patient care while your practice keeps growing.</p>
          </motion.div>

          {/* Tab row */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
            {AI_TOOLS.map((t, i) => (
              <button key={t.title} onClick={() => setAiTab(i)} style={{
                padding: '9px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${aiTab === i ? t.color : T.border}`,
                background: aiTab === i ? `${t.color}18` : 'transparent',
                color: aiTab === i ? t.color : T.muted, transition: '.2s',
              }}>{t.title}</button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {(() => {
              const tool = AI_TOOLS[aiTab]
              const ToolIcon = tool.Icon
              return (
              <motion.div
                key={aiTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
              <GlowCard customSize glowColor={toGlow(tool.color)} className="p-10 max-w-185 mx-auto">
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 18, flexShrink: 0,
                    background: `${tool.color}15`, border: `1px solid ${tool.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: tool.color,
                  }}>
                    <ToolIcon size={28} />
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 22, fontWeight: 800 }}>{tool.title}</h3>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                        background: `${tool.color}18`, color: tool.color,
                        border: `1px solid ${tool.color}30`,
                      }}>{tool.tag}</span>
                    </div>
                    <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7 }}>{tool.desc}</p>
                  </div>
                </div>
              </GlowCard>
              </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. PROCESS TIMELINE
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 64 }}>
            <SectionLabel label="The Process" color={T.cyan} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.5px' }}>Live in 7 Days. Not 7 Months.</h2>
            <p style={{ fontSize: 16, color: T.muted, maxWidth: 460, margin: '0 auto' }}>A streamlined process built for busy practitioners who can't afford to wait.</p>
          </motion.div>

          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...fadeUp(i * 0.12)} style={{ display: 'flex', gap: 24, marginBottom: i < STEPS.length - 1 ? 0 : 0, alignItems: 'flex-start' }}>
              {/* Icon + connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', zIndex: 1,
                  background: `linear-gradient(135deg,${s.color},${s.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', boxShadow: `0 0 24px ${s.color}50`,
                }}>
                  <s.Icon size={18} />
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 40, background: `linear-gradient(180deg,${s.color}60,transparent)`, margin: '4px 0' }} />
                )}
              </div>
              {/* Card */}
              <GlowCard customSize glowColor={toGlow(s.color)} className="p-5 mb-5" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: s.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: `${s.color}18`, padding: '2px 9px', borderRadius: 999 }}>{s.day}</span>
                  <span style={{ fontSize: 11, color: T.muted }}>Step {s.n}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.65 }}>{s.desc}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. BEFORE / AFTER
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="case-studies" style={{ padding: '100px 5%', background: T.surface }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel label="Illustrative Example" color={T.green} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.5px' }}>What Improvement Can Look Like</h2>
            <p style={{ fontSize: 16, color: T.muted, maxWidth: 560, margin: '0 auto' }}>A representative example based on typical outcomes for a solo NP practice within 90 days of launch. Individual results vary by market, specialty, and starting point.</p>
          </motion.div>

          {/* Toggle */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', background: 'rgba(11,18,32,0.05)', borderRadius: 14, padding: 4, border: `1px solid ${T.border}` }}>
              {(['before', 'after'] as const).map(m => (
                <button key={m} onClick={() => setBaMode(m)} style={{
                  padding: '10px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  border: 'none',
                  background: baMode === m ? `linear-gradient(135deg,${T.blue},${T.violet})` : 'transparent',
                  color: baMode === m ? '#fff' : T.muted,
                  transition: '.25s',
                }}>
                  {m === 'before' ? 'Before ZmaxLab' : 'After ZmaxLab'}
                </button>
              ))}
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
            {BEFORE_AFTER.map((item, i) => (
              <motion.div key={item.label} {...fadeUp(i * 0.08)}>
                <GlowCard customSize glowColor="blue" className="p-7 text-center">
                  <div style={{ fontSize: 12, color: T.muted, marginBottom: 14, fontWeight: 500 }}>{item.label}</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={baMode + item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28 }}
                    >
                      <div style={{
                        fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, lineHeight: 1, marginBottom: 10,
                        color: baMode === 'after' ? T.green : 'rgba(11,18,32,0.35)',
                      }}>
                        {baMode === 'before' ? item.before : item.after}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  {baMode === 'after' && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{
                      display: 'inline-block', background: `${T.green}18`, color: T.green,
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                      border: `1px solid ${T.green}33`,
                    }}>Improved</motion.div>
                  )}
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. TRUST & CREDIBILITY
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 900, marginBottom: 8 }}>Built on Trust. Backed by Results.</h2>
            <p style={{ fontSize: 15, color: T.muted }}>The standards every project is built to.</p>
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {[
              { Icon: Shield,        label: 'HIPAA-Aware',  sub: 'Design Standards',  color: T.blue   },
              { Icon: Globe,         label: 'All 50 States',sub: 'USA Coverage',       color: T.violet },
              { Icon: Star,          label: '4.9 / 5.0 ★',  sub: 'Google Reviews',    color: T.amber  },
              { Icon: Users,         label: '500+ Practices',sub: 'Sites Built',       color: T.green  },
              { Icon: Award,         label: '$500 Flat',    sub: 'No Hidden Fees',     color: T.cyan   },
            ].map((b, i) => (
              <motion.div key={b.label} {...fadeUp(i * 0.08)}>
                <GlowCard customSize glowColor={toGlow(b.color)} className="p-5 text-center" style={{ minWidth: 140 }}>
                  <div style={{ color: b.color, display: 'flex', justifyContent: 'center', marginBottom: 8 }}><b.Icon size={22} /></div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{b.label}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{b.sub}</div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. TESTIMONIALS CAROUSEL
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '100px 5%',
        background: `radial-gradient(ellipse at 50% 50%,rgba(29,78,216,0.05) 0%,transparent 70%),${T.surface}`,
      }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel label="Client Stories" color={T.violet} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 10 }}>What Working Together Can Look Like</h2>
            <p style={{ fontSize: 14, color: T.muted, maxWidth: 480, margin: '0 auto' }}>
              Illustrative examples reflecting the kind of feedback this process is designed to earn — not yet verified client reviews.
            </p>
          </motion.div>

          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <GlowCard customSize glowColor={toGlow(TESTIMONIALS[tIdx].color)} className="p-10">
                  <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill={T.amber} color={T.amber} />)}
                  </div>
                  <p style={{ fontSize: 'clamp(15px,2vw,19px)', lineHeight: 1.75, marginBottom: 28, fontStyle: 'italic', color: T.text }}>
                    "{TESTIMONIALS[tIdx].quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: `linear-gradient(135deg,${TESTIMONIALS[tIdx].color},${TESTIMONIALS[tIdx].color}88)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, fontWeight: 800, color: '#fff',
                      }}>{TESTIMONIALS[tIdx].initials}</div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 15 }}>{TESTIMONIALS[tIdx].name}</div>
                        <div style={{ fontSize: 13, color: T.muted }}>{TESTIMONIALS[tIdx].role}</div>
                      </div>
                    </div>
                    <div style={{
                      background: `${TESTIMONIALS[tIdx].color}18`,
                      border: `1px solid ${TESTIMONIALS[tIdx].color}33`,
                      borderRadius: 10, padding: '8px 16px',
                      fontSize: 13, fontWeight: 800, color: TESTIMONIALS[tIdx].color,
                    }}>{TESTIMONIALS[tIdx].result}</div>
                  </div>
                </GlowCard>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
              <button onClick={prev} aria-label="Previous" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(11,18,32,0.06)', border: `1px solid ${T.border}`, color: T.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={18} />
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setTIdx(i)} aria-label={`Testimonial ${i + 1}`} style={{
                    width: i === tIdx ? 24 : 8, height: 8, borderRadius: 999, padding: 0,
                    background: i === tIdx ? T.blue : 'rgba(11,18,32,0.2)',
                    border: 'none', cursor: 'pointer', transition: '.3s',
                  }} />
                ))}
              </div>
              <button onClick={next} aria-label="Next" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(11,18,32,0.06)', border: `1px solid ${T.border}`, color: T.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          10. CONVERSION CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '100px 5%',
        background: `radial-gradient(ellipse at 50% 0%,rgba(37,99,235,0.16) 0%,transparent 65%),${T.bg}`,
        borderTop: `1px solid ${T.border}`,
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp()}>
            <SectionLabel label="Get Started" color={T.blue} />
            <h2 style={{ fontSize: 'clamp(28px,4.5vw,48px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 20, lineHeight: 1.15 }}>
              Let's discuss your practice's website.
            </h2>
            <p style={{ fontSize: 17, color: T.muted, marginBottom: 36, lineHeight: 1.75, maxWidth: 560, margin: '0 auto 36px' }}>
              Book a free 30-minute demo call. I'll walk you through what a custom site for your specialty could look like and answer any questions about the process, pricing, or timeline.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `linear-gradient(135deg,${T.blue},${T.violet})`,
                color: '#fff', fontWeight: 700, fontSize: 16,
                padding: '16px 36px', borderRadius: 14,
                boxShadow: `0 12px 40px rgba(37,99,235,0.45)`,
              }}>
                Book Free 30-Min Demo <ArrowRight size={18} />
              </Link>
              <a href="mailto:ravi@zmaxlab.site" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(11,18,32,0.06)', border: `1px solid ${T.border}`,
                color: T.text, fontWeight: 600, fontSize: 16,
                padding: '16px 28px', borderRadius: 14,
              }}>
                <MessageSquare size={16} /> ravi@zmaxlab.site
              </a>
            </div>
            <div style={{ fontSize: 13, color: T.muted }}>$500 flat fee · No contracts · Cancel anytime · All 50 US states</div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
