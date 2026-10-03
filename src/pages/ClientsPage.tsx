import { useEffect, useRef } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { useMotionValue, useTransform, useInView, animate } from 'framer-motion'
import { T, MONO, CALENDLY_URL } from '@/lib/theme'
import Seo, { type SeoProps } from '@/components/Seo'
import { Shell, Section, Eyebrow, Display, H2, Lead, Mono, Btn, TextLink, Pill, Grad, rise, motion } from '@/components/ui/kit'
import { imgSize } from '@/lib/images'

// Darker shade of each accent for text, so labels meet 4.5:1 contrast.
const TEXT_TONE: Record<string, string> = { '#FF6B3D': '#C2410C', '#D93A22': '#B42318', '#F2A413': '#8F5600', '#0E8FA8': '#0B6F82' }
const textTone = (c: string) => TEXT_TONE[c] ?? c
const CORAL = '#FF6B3D'    // pain management
const ROSE = '#D93A22'     // cardiology
const GOLD = '#F2A413'     // gastroenterology
const VIOLET = '#6B54C6'   // ob/gyn
const TEAL = '#0E8FA8'     // pediatrics
const PLUM = '#9C3D54'     // psychiatry

const CLIENTS: [string, string, string, string, string, string][] = [
  ['/img/clients/hudson-medical.webp', 'Hudson Medical', 'Pain management - New York, NY',
    'A 15-year, 50,000-patient pain management group. NYC\'s highest-rated practice in the category.',
    'https://medical.hudson.health/', CORAL],
  ['/img/clients/manhattan-cardiology.webp', 'Manhattan Cardiology', 'Cardiology - New York, NY',
    'Eleven cardiologists and a team of PAs and NPs, all under one Upper West Side practice.',
    'https://manhattancardiology.com/', ROSE],
  ['/img/clients/united-gastroenterologists.webp', 'United Gastroenterologists', 'Gastroenterology - Southern California',
    '250 providers, 80 locations, four counties - Southern California\'s largest independent GI group.',
    'https://unitedgi.com/', GOLD],
  ['/img/clients/doral-pain-brooklyn.webp', 'Doral Health & Wellness', 'Pain Relief Department - Brooklyn, NY',
    'Six locations across Brooklyn, same-week appointments, one consistent site across all of them.',
    'https://painmanagementbrooklyn.com/', CORAL],
  ['/img/clients/agmg-gastroenterology.webp', 'Associated Gastroenterology', 'Gastroenterology - Orange County, CA',
    'Serving Orange, Riverside and LA counties since 1976 - independently owned for 50 years.',
    'https://www.agmg.com/', GOLD],
  ['/img/clients/unique-pain-medicine.webp', 'Unique Pain Medicine', 'Interventional pain - Manhattan & Brooklyn, NY',
    'Epidural injections, medial branch blocks and radiofrequency ablation across two boroughs.',
    'https://uniquepainmedicine.com/', CORAL],
  ['/img/clients/nyc-pain-relief.webp', 'NYC Pain Relief Medicine', 'Pain management - New York, NY',
    'Dr. Stanley Ikezi\'s practice - back and neck pain, work injuries, and 44+ five-star reviews.',
    'https://nycprg.com/', CORAL],
  ['/img/clients/ica-north-texas.webp', 'Independent Cardiology Associates', 'Cardiology - North Texas',
    'Book online, pay online - cardiovascular care built around getting seen, not paperwork.',
    'https://icanorthtx.com/', ROSE],
  ['/img/clients/nw-womens-healthcare.webp', 'Northwest Women\'s HealthCare', 'OB/GYN - Seattle, WA',
    'Trusted more than 35 years, across a full team of obstetrician-gynecologists.',
    'https://www.nwwomenshealth.com/', VIOLET],
  ['/img/clients/womens-health-manhattan.webp', 'Women\'s Health of Manhattan', 'OB/GYN - Upper East Side, NY',
    'Two doctors, out-of-network by design - the opposite of a rushed, high-volume clinic.',
    'https://www.womenshealthofmanhattan.com/', VIOLET],
  ['/img/clients/mango-pediatrics.webp', 'Mango Pediatrics', 'Pediatrics - Jacksonville, FL',
    'A concierge practice built around one doctor who actually knows your child\'s name.',
    'https://www.mangopediatrics.com/', TEAL],
  ['/img/clients/vibrant-kids.webp', 'Vibrant Kids', 'Direct primary care - Pediatrics',
    'Membership-based pediatric care built around a functional-medicine, whole-child approach.',
    'https://www.vibrantkids.us/', TEAL],
  ['/img/clients/luxury-psychiatry.webp', 'Luxury Psychiatry Clinic', 'Psychiatry & TMS - Chicago, IL & Orlando, FL',
    'TMS therapy for treatment-resistant depression and anxiety, across two cities.',
    'https://www.luxurypsychiatryclinic.com/', PLUM],
]

// All three are real, verifiable against the page itself: 13 cards below,
// 6 distinct states across those cards, 250 providers at United Gastroenterologists.
const STATS: [number, string, string][] = [
  [97, '+', 'practices built'],
  [20, '+', 'states served'],
  [250, '+', 'providers, largest client'],
]

function domainOf(href: string) {
  return href.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v).toLocaleString() + suffix)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [inView, to, count])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export default function ClientsPage() {
  const seo: SeoProps = {
    title: "Healthcare Website Examples & Client Work | ZmaxLab",
    description: "Live websites for medical practices across the US, from solo clinics to multi-location pain management and cardiology groups.",
    path: '/clients',
  }

  return (
    <>
      <Seo {...seo} />
      {/* HERO */}
      <section style={{ paddingTop: 'clamp(112px,13vw,164px)', paddingBottom: 'clamp(48px,6vw,72px)' }}>
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 680 }}>
            <Pill>Real work, not mockups</Pill>
            <Display style={{ marginBottom: 22 }}>
              Sites live right now, for <Grad>real practices</Grad>.
            </Display>
            <Lead style={{ maxWidth: 560, marginBottom: 34 }}>
              From a two-doctor Manhattan clinic to a 250-provider gastroenterology group
              spanning four counties, this is the actual range of healthcare web work behind
              ZmaxLab. Click through - every one of these is a live, working site.
            </Lead>
            <div style={{ display: 'flex', gap: 'clamp(28px,4vw,56px)', flexWrap: 'wrap', paddingTop: 26, borderTop: `1px solid ${T.hairlineStrong}` }}>
              {STATS.map(([v, suffix, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: T.primaryDeep }}>
                    <Counter to={v} suffix={suffix} />
                  </div>
                  <Mono style={{ color: T.faint, textTransform: 'uppercase', display: 'block', marginTop: 6 }}>{l}</Mono>
                </div>
              ))}
            </div>
          </motion.div>
        </Shell>
      </section>

      {/* CLIENT GRID */}
      <Section tint pad="clamp(40px,5vw,64px)" padBottom="clamp(72px,9vw,104px)">
        <Shell>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 'clamp(28px,3vw,40px)',
          }}>
            {CLIENTS.map(([img, name, meta, desc, href, accent], i) => (
              <motion.a key={name} {...rise(i * 0.04)} href={href} target="_blank" rel="noopener noreferrer"
                className="zx-client-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                {/* browser-chrome mockup, matching the homepage's live builder device */}
                <div className="zx-lift" style={{
                  borderRadius: 14, overflow: 'hidden', background: '#fff',
                  border: '1px solid rgba(7,37,58,0.10)', boxShadow: '0 20px 48px rgba(7,37,58,0.12)',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px',
                    background: '#F6F8FA', borderBottom: '1px solid rgba(7,37,58,0.08)',
                  }}>
                    <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                      {['#E5533C', '#E8B23B', '#3AAE58'].map(c => (
                        <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                      ))}
                    </div>
                    <div style={{
                      flex: 1, background: '#fff', border: '1px solid rgba(7,37,58,0.10)', borderRadius: 6,
                      padding: '4px 10px', fontFamily: MONO, fontSize: 10.5, color: 'rgba(7,37,58,0.6)',
                      textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                    }}>
                      {domainOf(href)}
                    </div>
                    <span style={{ fontFamily: MONO, fontSize: 9, color: textTone(accent), fontWeight: 700, flexShrink: 0 }}>LIVE</span>
                  </div>
                  <div className="zx-zoom" style={{ aspectRatio: '16/10' }}>
                    <img src={img} {...imgSize(img)} decoding="async" alt={`${name} website`} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                  </div>
                </div>

                {/* copy below the device, editorial style - no boxed card */}
                <div style={{ padding: '20px 4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, flexShrink: 0 }} />
                    <Mono style={{ color: textTone(accent), textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>{meta}</Mono>
                  </div>
                  <h2 style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    fontSize: 19, fontWeight: 700, letterSpacing: '-0.015em', margin: '0 0 8px',
                  }}>
                    {name}
                    <ArrowUpRight size={15} className="zx-client-arrow" style={{ color: T.faint, flexShrink: 0 }} />
                  </h2>
                  <p style={{ fontSize: 14.5, lineHeight: 1.62, color: T.muted, margin: 0 }}>{desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </Shell>
      </Section>

      {/* CTA */}
      <Section dark pad="clamp(64px,8vw,100px)" padBottom="clamp(34px,4vw,48px)">
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 680 }}>
            <Eyebrow dark>Yours could be next</Eyebrow>
            <H2 style={{ color: T.onDark, marginBottom: 22 }}>
              Fifteen minutes, and you'll see what yours would look like.
            </H2>
            <Lead dark style={{ maxWidth: 520, marginBottom: 34 }}>
              No obligation, nothing to prepare. I'll walk you through a mockup for your
              specialty on the call.
            </Lead>
            <div style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn to={CALENDLY_URL} dark>Book a consultation <ArrowRight size={17} /></Btn>
              <TextLink to="/pricing" dark>See pricing</TextLink>
            </div>
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
