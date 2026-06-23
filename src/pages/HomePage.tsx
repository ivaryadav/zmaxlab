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
import { SparklesCore } from '@/components/ui/sparkles'
import { GlowCard } from '@/components/ui/spotlight-card'

const toGlow = (c: string): 'blue' | 'purple' | 'green' | 'red' | 'orange' =>
  c === T.violet ? 'purple' :
  c === T.green  ? 'green'  :
  c === T.rose   ? 'red'    :
  c === T.amber  ? 'orange' : 'blue'

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:     '#04060f',
  card:   'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.07)',
  blue:   '#2563eb',
  violet: '#7c3aed',
  cyan:   '#0891b2',
  green:  '#059669',
  amber:  '#f59e0b',
  rose:   '#e11d48',
  text:   '#f1f5f9',
  muted:  'rgba(241,245,249,0.5)',
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.75, delay, ease: EASE },
})

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const fired = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || fired.current) return
      fired.current = true
      const t0 = Date.now()
      const tick = () => {
        const p = Math.min((Date.now() - t0) / 1800, 1)
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      tick()
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}


// ─── Hero Dashboard Mockup ────────────────────────────────────────────────────
function Dashboard() {
  const bars = [35, 52, 40, 68, 55, 82, 70, 100]
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
      style={{ position: 'relative', width: '100%', maxWidth: 420 }}
    >
      <GlowCard customSize glowColor="blue" className="p-[22px]" style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>Practice Dashboard</span>
          </div>
          <span style={{ fontSize: 10, color: T.muted, background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 6 }}>LIVE</span>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { label: 'New Patients', val: '47', delta: '+23%', c: T.blue },
            { label: 'Revenue',      val: '$8.4k', delta: '+41%', c: T.violet },
            { label: 'Bookings',     val: '89',   delta: '+67%', c: T.green },
          ].map(m => (
            <div key={m.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '9px 7px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 9, color: T.muted, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.text, lineHeight: 1 }}>{m.val}</div>
              <div style={{ fontSize: 10, color: m.c, fontWeight: 700, marginTop: 2 }}>{m.delta}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>Organic Traffic</span>
            <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 600 }}>↑ 127%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 52 }}>
            {bars.map((h, i) => (
              <motion.div key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.07, ease: 'easeOut' }}
                style={{
                  flex: 1, height: `${h}%`, transformOrigin: 'bottom',
                  background: i === 7 ? `linear-gradient(180deg,${T.blue},${T.violet})` : 'rgba(37,99,235,0.28)',
                  borderRadius: '3px 3px 2px 2px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Activity */}
        {[
          { n: 'Sarah M.', a: 'Booked via website',  t: '2m', c: T.blue,   i: 'SM' },
          { n: 'James K.', a: 'Found on Google #1',  t: '7m', c: T.violet, i: 'JK' },
        ].map(a => (
          <div key={a.n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: a.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{a.i}</div>
            <div style={{ flex: 1, fontSize: 11, color: T.text }}><strong>{a.n}</strong> · <span style={{ color: T.muted }}>{a.a}</span></div>
            <span style={{ fontSize: 10, color: T.muted }}>{a.t} ago</span>
          </div>
        ))}
      </GlowCard>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: -16, right: -18, zIndex: 2,
          background: `linear-gradient(135deg,${T.green},${T.cyan})`,
          borderRadius: 14, padding: '9px 13px',
          boxShadow: `0 8px 24px rgba(5,150,105,0.45)`,
        }}
      >
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>Google Rank</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>#1 Local</div>
      </motion.div>

      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{
          position: 'absolute', bottom: -16, left: -18, zIndex: 2,
          background: 'rgba(6,10,24,0.95)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 14, padding: '9px 13px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.text }}>New patient booked!</div>
          <div style={{ fontSize: 10, color: T.muted }}>via your website · just now</div>
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
  { Icon: Bone,        title: 'Chiropractic & Rehab',         desc: 'Dominate local search and look more premium than every chain clinic and franchise in your city.',                color: T.green,  stat: '70+ clinics'           },
  { Icon: Activity,    title: 'PT / OT / Speech Therapy',     desc: 'Specialist therapists need specialist sites - your niche certifications and outcomes front and center.',         color: T.rose,   stat: '45+ therapists'        },
  { Icon: Users,       title: 'Multi-Specialty Group Practices', desc: 'Solo NP to 10-provider clinic - one cohesive site that showcases every specialty, location, and provider.',  color: T.blue,   stat: 'Groups welcome'        },
  { Icon: Globe,       title: 'Concierge & Aesthetic Medicine',  desc: 'DPC, functional medicine, aesthetics - premium brand positioning that attracts the patients willing to pay.',color: T.violet, stat: 'Premium positioning'   },
]

const AI_TOOLS = [
  { Icon: Bot,      title: 'Done-For-You Content',    desc: 'Google rewards practices that publish expert, helpful content. I write and publish HIPAA-compliant blog posts, FAQs, and service pages for your specialty - so patients find you before your competitors.', color: T.blue,   tag: 'Expert Written'  },
  { Icon: Search,   title: 'Local Search Visibility', desc: '68% of patients Google their symptoms before booking a provider. I handle keyword research, citation building, and Google Business optimisation - so the right patients find your practice first.',          color: T.violet, tag: 'Rank #1 Locally'  },
  { Icon: Star,     title: 'Review & Reputation',     desc: '87% of patients read reviews before choosing a provider. 72% won\'t consider below 4 stars. I set up review requests, monitor your ratings, and provide response templates - so your reputation grows naturally.',   color: T.amber,  tag: '4.8+ Average'    },
  { Icon: Calendar, title: 'Patient Scheduling Setup', desc: 'No-shows cost the average practice $150 per missed visit. I connect your booking system, set up reminder messages, and configure intake forms - so patients arrive prepared and your day runs smoothly.',              color: T.green,  tag: 'Zero No-Shows'   },
]

const STEPS = [
  { n: '01', title: 'Discovery Call',  desc: 'We map your specialty, patient avatar, and competitive landscape in 30 minutes.',         day: 'Day 1',      Icon: Phone,       color: T.blue   },
  { n: '02', title: 'Premium Design',  desc: 'Custom-built from scratch - zero templates, zero stock images, zero agency shortcuts.',    day: 'Days 2–4',   Icon: Zap,         color: T.violet },
  { n: '03', title: 'SEO Foundation',  desc: 'Technical SEO, local citations, Google Business optimization, and content strategy.',      day: 'Day 5',      Icon: Search,      color: T.cyan   },
  { n: '04', title: 'Launch & Scale',  desc: 'Go live with full training, monthly reporting, and ongoing growth support.',               day: 'Days 6–7',   Icon: TrendingUp,  color: T.green  },
]

const BEFORE_AFTER = [
  { label: 'Monthly Visitors',  before: '120',    after: '890',  pct: '+642%'   },
  { label: 'New Bookings / mo', before: '3',      after: '22',   pct: '+633%'   },
  { label: 'Google Rating',     before: '4.1 ★',  after: '4.9 ★',pct: '+0.8 ★' },
  { label: 'Search Ranking',    before: 'Page 4', after: '#1',   pct: 'Top Spot'},
]

const TESTIMONIALS = [
  { name: 'Dr. Sarah Chen, NP-C',      role: 'Family NP · Dallas, TX',             initials: 'SC', color: T.blue,   quote: 'I went from 3 new patients a month to 22. Site launched in under a week - Ravi handled everything. Worth 10x the price.',                                              result: '+633% bookings'  },
  { name: 'Marcus Williams, PA-C',      role: 'Physician Assistant · Atlanta, GA',  initials: 'MW', color: T.violet, quote: 'Skeptical at first. By month two the ROI was undeniable. My Google rank jumped from page 5 to #1 for every local search I cared about.',                         result: '#1 Google rank'  },
  { name: 'Dr. Lisa Patel, PMHNP',      role: 'Psychiatric NP · Chicago, IL',       initials: 'LP', color: T.cyan,   quote: 'Patients tell me my site made them feel safe enough to call. For mental health that trust signal is everything. ZmaxLab understood that perfectly.',              result: '+89% call rate'  },
  { name: 'Dr. James Kowalski, DC',     role: 'Chiropractor · Phoenix, AZ',         initials: 'JK', color: T.green,  quote: 'Three chiropractors near me have Wix templates. My site looks $10k premium. That perceived value difference alone converts more patients every single month.',    result: '+210% traffic'   },
  { name: 'Amy Rodriguez, DPT',         role: 'Physical Therapist · Miami, FL',     initials: 'AR', color: T.amber,  quote: 'Ravi understands healthcare deeply. HIPAA-aware, blazing fast, and SEO results were visible within 30 days. Exactly what a solo practitioner needs.',             result: '4.9 ★ Google'    },
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
            background: 'rgba(4,6,15,0.94)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 18, padding: '14px 20px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', gap: 16,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>🔥 Limited spots available for this month</div>
            <div style={{ fontSize: 12, color: T.muted }}>Only 3 onboarding slots remaining</div>
          </div>
          <Link to="/contact" style={{
            background: `linear-gradient(135deg,${T.blue},${T.violet})`,
            color: '#fff', fontWeight: 700, fontSize: 13,
            padding: '10px 20px', borderRadius: 12,
            boxShadow: `0 4px 16px rgba(37,99,235,0.4)`,
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
          radial-gradient(ellipse at 20% 50%,rgba(37,99,235,0.13) 0%,transparent 60%),
          radial-gradient(ellipse at 80% 20%,rgba(124,58,237,0.1) 0%,transparent 55%),
          radial-gradient(ellipse at 60% 90%,rgba(8,145,178,0.07) 0%,transparent 50%),
          ${T.bg}`,
      }}>
        {/* Sparkle particle background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={60}
            particleColor="#a5b4fc"
            speed={0.6}
            className="w-full h-full"
          />
        </div>

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

            <motion.h1 {...fadeUp(0.1)} style={{ fontSize: 'clamp(36px,5.5vw,66px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 20, letterSpacing: '-1.5px' }}>
              Turn Your Practice Into a{' '}
              <span style={{ background: `linear-gradient(135deg,${T.blue} 0%,${T.violet} 50%,${T.cyan} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Patient-Generating
              </span>{' '}
              Machine.
            </motion.h1>

            <motion.p {...fadeUp(0.2)} style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: T.muted, lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
              Healthcare-first websites built by a specialist who understands your patients, compliance needs, and competition. $500 flat. 48-hour delivery. Zero compromises.
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
                background: 'rgba(255,255,255,0.06)', border: `1px solid ${T.border}`,
                color: T.text, fontWeight: 600, fontSize: 15,
                padding: '14px 24px', borderRadius: 14,
              }}>See Case Studies</a>
            </motion.div>

            <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { icon: <Shield size={13} />, label: 'HIPAA-Aware Design' },
                { icon: <CheckCircle2 size={13} />, label: '500+ Sites Launched' },
                { icon: <Zap size={13} />, label: '48-Hour Delivery' },
              ].map(b => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: T.muted }}>
                  <span style={{ color: T.green }}>{b.icon}</span>{b.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard */}
          <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
            <Dashboard />
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
      <section style={{ padding: '100px 5%', background: 'rgba(255,255,255,0.015)' }}>
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
      <section id="case-studies" style={{ padding: '100px 5%', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel label="Case Study Results" color={T.green} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.5px' }}>Real Numbers. Real Practices.</h2>
            <p style={{ fontSize: 16, color: T.muted }}>Actual results from a family NP practice. 90 days post-launch.</p>
          </motion.div>

          {/* Toggle */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 4, border: `1px solid ${T.border}` }}>
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
                        color: baMode === 'after' ? T.green : 'rgba(255,255,255,0.35)',
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
                    }}>{item.pct}</motion.div>
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
            <p style={{ fontSize: 15, color: T.muted }}>Every claim is backed by real client data. Zero fluff.</p>
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
        background: `radial-gradient(ellipse at 50% 50%,rgba(37,99,235,0.07) 0%,transparent 70%),rgba(255,255,255,0.01)`,
      }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel label="Client Stories" color={T.violet} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, letterSpacing: '-0.5px' }}>Practices That Made the Leap</h2>
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
              <button onClick={prev} aria-label="Previous" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: `1px solid ${T.border}`, color: T.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={18} />
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setTIdx(i)} aria-label={`Testimonial ${i + 1}`} style={{
                    width: i === tIdx ? 24 : 8, height: 8, borderRadius: 999, padding: 0,
                    background: i === tIdx ? T.blue : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer', transition: '.3s',
                  }} />
                ))}
              </div>
              <button onClick={next} aria-label="Next" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: `1px solid ${T.border}`, color: T.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <SectionLabel label="Ready to Grow?" color={T.blue} />
            <h2 style={{ fontSize: 'clamp(30px,5vw,56px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 20, lineHeight: 1.1 }}>
              Your Next Patient Is Searching{' '}
              <span style={{ background: `linear-gradient(135deg,${T.blue},${T.violet})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                for You Right Now.
              </span>
            </h2>
            <p style={{ fontSize: 17, color: T.muted, marginBottom: 36, lineHeight: 1.75, maxWidth: 560, margin: '0 auto 36px' }}>
              Don't let a competitor's website win them over. Book a free 30-minute demo and see exactly what your practice could look like - and what it could generate.
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
                background: 'rgba(255,255,255,0.06)', border: `1px solid ${T.border}`,
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
