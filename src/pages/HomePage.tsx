import { ArrowRight, Check, ShieldCheck, CreditCard, FileCheck } from 'lucide-react'
import { T, MONO, TYPE , CALENDLY_URL } from '@/lib/theme'
import LiveBuilder from '@/components/ui/LiveBuilder'
import RoiCalc from '@/components/ui/RoiCalc'
import { useSEO } from '@/lib/useSEO'
import {
  Shell, Section, Eyebrow, Display, H2, Lead, Mono, Btn, TextLink, Index, Grad, Pill, Vid, Slider, Reveal, rise, slideIn, motion,
} from '@/components/ui/kit'

const SPECIALTIES = [
  'Nurse Practitioners', 'Physician Assistants', 'Mental Health', 'Dental & Oral Care',
  'Chiropractic & Rehab', 'PT / OT / Speech', 'Multi-Specialty Groups', 'Concierge Medicine',
]

const INCLUDED = [
  ['01', 'We find and buy your domain', 'Choosing the right domain affects how patients find and remember you. I check what is available, advise on the strongest option, register it, and configure it - you never touch a DNS setting.'],
  ['02', 'Custom-coded, not templated', 'Every page is written from scratch for your specialty. No WordPress theme, no page builder, no recycled layout with your logo swapped in.'],
  ['03', 'Credentials built into the design', 'Your NPI number, license, and specialty are structured into the page - so patients and search engines both read you as legitimate.'],
  ['04', 'Booking that actually connects', 'Wired into Calendly, Jane, or SimplePractice. Patients book without emailing you first.'],
  ['05', 'HIPAA-aware contact forms', 'Secure intake, no plain-text patient detail sitting in an inbox.'],
  ['06', 'Full SEO foundation', 'Meta structure, schema markup, sitemap, Search Console, and Analytics configured before launch - not sold back to you later.'],
  ['07', 'You own the source code', 'Delivered to you outright. No licence, no lock-in, no hostage situation if you leave.'],
]

const STEPS = [
  ['Day 1', 'Discovery call', 'Thirty minutes. Your specialty, your patients, your market.'],
  ['Days 2-4', 'Design & build', 'Written from scratch. You see progress, not a black box.'],
  ['Day 5', 'SEO foundation', 'Structure, schema, Search Console, Business Profile.'],
  ['Days 6-7', 'Launch', 'Live on your domain with SSL. Source files handed over.'],
]

const COMPARE = [
  ['Healthcare marketing agency', '$3,000 - $10,000', false],
  ['Closest NP-focused competitor', '$1,097.50', false],
  ['Wix / Squarespace', '$29/mo, forever', false],
  ['ZmaxLab', '$500, once', true],
]

export default function HomePage() {
  useSEO({
    title: 'Healthcare Website Design for Nurse Practitioners | $500 Flat - ZmaxLab',
    description: 'Custom healthcare website design for nurse practitioners, PAs, chiropractors and mental health providers. $500 flat, live in 7 business days, source code included. No contract.',
    canonical: 'https://zmaxlab.site/',
  })

  return (
    <>
      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section style={{ paddingTop: 'clamp(96px,11vw,132px)', paddingBottom: 'clamp(40px,5vw,72px)' }}>
        <Shell wide>
          <motion.div {...rise()} style={{
            display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            borderRadius: 24, overflow: 'hidden', background: T.gradPanel,
            boxShadow: '0 30px 80px rgba(7,37,58,0.13)',
          }} className="zx-hero-panel">
            <div style={{ padding: 'clamp(32px,4.5vw,68px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Pill>Your practice's digital partner</Pill>
              <Display style={{ marginBottom: 22 }}>
                See your practice's
                website, <Grad>before you pay a thing</Grad>.
              </Display>
              <Lead style={{ maxWidth: 480, marginBottom: 32, color: 'rgba(7,37,58,0.80)' }}>
                Pick your specialty and watch a real site build itself. That is the standard
                you get - domain, hosting, SEO and all - live in 7 business days for a flat $500.
              </Lead>
              <div style={{ display: 'flex', alignItems: 'center', gap: 26, flexWrap: 'wrap' }}>
                <Btn to={CALENDLY_URL}>Book a free demo <ArrowRight size={17} /></Btn>
                <TextLink to="/services">See what we handle</TextLink>
              </div>
              <div style={{ display: 'flex', gap: 'clamp(20px,3vw,44px)', flexWrap: 'wrap', marginTop: 38, paddingTop: 26, borderTop: '1px solid rgba(7,37,58,0.14)' }}>
                {[['$500', 'flat fee'], ['7 days', 'to launch'], ['54%', 'below closest rival']].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: T.primaryDeep }}>{v}</div>
                    <Mono style={{ color: T.faint, textTransform: 'uppercase', display: 'block', marginTop: 6 }}>{l}</Mono>
                  </div>
                ))}
              </div>
            </div>
            <div className="zx-hero-img" style={{ padding: 'clamp(20px,3vw,40px)', display: 'flex', alignItems: 'center' }}>
              <LiveBuilder />
            </div>
          </motion.div>
        </Shell>
      </section>

      {/* ══ 2. TICKER ════════════════════════════════════════ */}
      <div style={{ background: T.ink, color: T.onDark, padding: '17px 0', overflow: 'hidden' }}>
        <div className="zx-marquee-track">
          {[0, 1].map(dup => (
            <div key={dup} style={{ display: 'flex', flexShrink: 0 }} aria-hidden={dup === 1}>
              {SPECIALTIES.map(s => (
                <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 34, paddingRight: 34, whiteSpace: 'nowrap' }}>
                  <Mono style={{ color: T.onDarkMuted, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s}</Mono>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: T.gold, flexShrink: 0 }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══ 3. STATEMENT ═════════════════════════════════════ */}
      <Section>
        <Shell>
          <div className="zx-stmt">
            <motion.div {...rise()}>
              <Eyebrow>The problem</Eyebrow>
              <div className="zx-lift zx-zoom" style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '3/4', boxShadow: '0 20px 54px rgba(7,37,58,0.16)', marginTop: 22 }}>
                <img src="/img/clinician-hero.jpg" alt="Nurse practitioner" loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%', display: 'block' }} />
              </div>
            </motion.div>
            <motion.div {...rise(0.08)}>
              <H2 style={{ marginBottom: 30 }}>
                Most healthcare websites are a template with a stethoscope
                photo dropped in, and <Grad>patients can tell</Grad>.
              </H2>
              <Lead style={{ maxWidth: 620, marginBottom: 18 }}>
                They load slowly, say nothing specific about your credentials, and look
                identical to the clinic three streets over. Meanwhile a $3,000 agency wants a
                retainer and twelve weeks before anything goes live.
              </Lead>
              <Lead style={{ maxWidth: 620, color: T.text, fontWeight: 600 }}>
                ZmaxLab is one specialist writing your site by hand, for a flat $500, in a week.
              </Lead>
            </motion.div>
          </div>
        </Shell>
      </Section>

      {/* ══ 4. WHAT'S INCLUDED ══════════════════════════════ */}
      <Section tint>
        <Shell>
          <div className="zx-sticky">
            <motion.div {...rise()} className="zx-sticky-col">
              <Eyebrow>What you get</Eyebrow>
              <H2 style={{ marginBottom: 22 }}>Every digital <Grad>footprint</Grad>, handled.</H2>
              <Lead style={{ maxWidth: 380, marginBottom: 30 }}>
                From buying the right domain to the site itself. No starter tier, no upsell call, nothing held back to charge for later.
              </Lead>
              <TextLink to="/services">Full service breakdown</TextLink>
              <div className="zx-lift zx-zoom" style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '4/3', marginTop: 30, boxShadow: '0 18px 46px rgba(7,37,58,0.14)' }}>
                <img src="/img/practice-room.jpg" alt="A modern clinical treatment room" loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%', display: 'block' }} />
              </div>
            </motion.div>

            <div>
              {INCLUDED.map(([n, title, body], i) => (
                <motion.div key={n} {...rise(i * 0.05)} className="zx-row" style={{
                  display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18,
                  padding: '26px 14px 26px 0',
                  borderTop: i === 0 ? `1px solid ${T.hairlineStrong}` : 'none',
                  borderBottom: `1px solid ${T.hairline}`,
                }}>
                  <Index n={n} />
                  <div>
                    <h3 style={{ fontSize: TYPE.h3, fontWeight: 750, letterSpacing: '-0.02em', marginBottom: 9 }}>{title}</h3>
                    <p style={{ fontSize: 15.5, lineHeight: 1.68, color: T.muted, margin: 0, maxWidth: 560 }}>{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Shell>
      </Section>

      {/* ══ 4b. WHAT I UNDERSTAND ═══════════════════════════ */}
      <Section>
        <Shell>
          <div className="zx-split">
            <motion.div {...rise()}>
              <Eyebrow>Why practitioners pick this</Eyebrow>
              <H2 style={{ marginBottom: 22 }}>
                A site only works if it answers what the patient is actually asking.
              </H2>
              <Lead style={{ maxWidth: 440 }}>
                Patients do not compare clinics the way they compare restaurants. They arrive
                anxious, in a hurry, and looking for a few specific answers. If your site does
                not give them quickly, they go back to the search results.
              </Lead>
            </motion.div>
            <motion.div {...rise(0.1)}>
              <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 18 }}>
                What every page is built to answer
              </Mono>
              {[
                'Do you take my insurance?',
                'How soon can I actually be seen?',
                'Is this the right specialty for what I have?',
                'Are you properly licensed and credentialed?',
                'Can I book without phoning during work hours?',
                'Has anyone like me been treated here before?',
              ].map((q, i) => (
                <div key={q} style={{
                  display: 'flex', gap: 14, alignItems: 'baseline', padding: '15px 0',
                  borderTop: i === 0 ? `1px solid ${T.hairlineStrong}` : `1px solid ${T.hairline}`,
                }}>
                  <Mono style={{ color: T.blue, flexShrink: 0 }}>{`0${i + 1}`}</Mono>
                  <span style={{ fontSize: 16.5, lineHeight: 1.5, fontWeight: 550 }}>{q}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Shell>
      </Section>

      {/* ══ 4c. DIGITAL PARTNER / VIDEO SPLIT ═══════════════ */}
      <Section tint>
        <Shell>
          <div className="zx-split" style={{ alignItems: 'center' }}>
            <motion.div {...slideIn('left')} className="zx-lift zx-zoom" style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/5', maxHeight: 560, boxShadow: '0 24px 64px rgba(7,37,58,0.18)' }}>
              <Vid src="/video/laptop-clinician.mp4" poster="/img/poster-laptop-clinician.jpg"
                style={{ objectPosition: '68% 16%', transform: 'scale(1.12)' }} />
            </motion.div>
            <motion.div {...slideIn('right', 0.08)}>
              <Pill tone="coral">One partner, not five vendors</Pill>
              <H2 style={{ marginBottom: 22 }}>
                Stop juggling a domain registrar, a host, a designer and an <Grad>SEO guy</Grad>.
              </H2>
              <Lead style={{ marginBottom: 28, maxWidth: 480 }}>
                Most practitioners end up with four different logins, four invoices, and nobody
                who actually owns the outcome. ZmaxLab is one person holding all of it.
              </Lead>
              {[
                ['Domain', 'Researched, registered and pointed at your site.'],
                ['Hosting', 'Set up, secured with SSL, and kept running.'],
                ['Website', 'Custom-coded for your specialty in 7 days.'],
                ['Visibility', 'SEO, Google Business Profile, directories, reviews.'],
              ].map(([k, v], i) => (
                <div key={k} style={{
                  display: 'grid', gridTemplateColumns: '112px 1fr', gap: 16, padding: '14px 0',
                  borderTop: i === 0 ? `1px solid ${T.hairlineStrong}` : `1px solid ${T.hairline}`,
                }}>
                  <Mono style={{ color: T.primaryDeep, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{k}</Mono>
                  <span style={{ fontSize: 15.5, lineHeight: 1.6, color: T.muted }}>{v}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Shell>
      </Section>

      {/* ══ 5. WHY IT MATTERS - split, portrait media framed properly ══ */}
      <section style={{ background: T.ink, color: T.onDark, padding: 'clamp(56px,7vw,96px) 0' }}>
        <Shell>
          <div className="zx-split" style={{ alignItems: 'center', gap: 'clamp(28px,5vw,72px)' }}>
            <motion.div {...slideIn('left')} className="zx-lift zx-zoom" style={{
              borderRadius: 20, overflow: 'hidden', aspectRatio: '3/4', maxHeight: 520,
              boxShadow: '0 30px 76px rgba(0,0,0,0.45)',
            }}>
              <Vid src="/video/hero-clinicians.mp4" poster="/img/poster-hero-clinicians.jpg"
                style={{ objectPosition: 'center 26%' }} />
            </motion.div>

            <motion.div {...slideIn('right', 0.08)}>
              <Eyebrow dark>Why it matters</Eyebrow>
              <H2 style={{ color: T.onDark, marginBottom: 20 }}>
                Your website is the <Grad>first appointment</Grad>.
              </H2>
              <Lead dark style={{ maxWidth: 480, marginBottom: 30 }}>
                It is where a patient decides whether you look like someone they trust with
                their health, usually before they ever pick up the phone.
              </Lead>
              {[
                ['They are deciding in seconds', 'Slow, dated or generic and they are back on the search results.'],
                ['Credentials have to be visible', 'Licence, NPI and specialty should be readable at a glance, not buried.'],
                ['Booking has to be one tap', 'Every extra step between interest and appointment loses people.'],
              ].map(([t, b], i) => (
                <div key={t} style={{
                  padding: '16px 0',
                  borderTop: `1px solid ${T.onDarkLine}`,
                  ...(i === 2 ? { borderBottom: `1px solid ${T.onDarkLine}` } : {}),
                }}>
                  <div style={{ fontSize: 16.5, fontWeight: 600, color: T.onDark, marginBottom: 5, letterSpacing: '-0.01em' }}>{t}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.6, color: T.onDarkMuted }}>{b}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </Shell>
      </section>

      {/* ══ 6. PROCESS ══════════════════════════════════════ */}
      <Section dark>
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(44px,6vw,72px)', maxWidth: 620 }}>
            <Eyebrow dark>The build</Eyebrow>
            <H2 style={{ color: T.onDark, marginBottom: 18 }}>Seven days, <Grad>start to live</Grad>.</H2>
            <Lead dark>Not seven months, and not a queue behind twelve other accounts.</Lead>
          </motion.div>
          <div className="zx-steps">
            {STEPS.map(([day, title, body], i) => (
              <motion.div key={title} {...rise(i * 0.08)} style={{
                padding: 'clamp(24px,3vw,34px) clamp(18px,2vw,28px) clamp(30px,4vw,44px) 0',
                borderTop: `1px solid ${T.onDarkLine}`,
                position: 'relative',
              }}>
                <Mono style={{ color: T.goldBright, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 22, fontWeight: 600 }}>{day}</Mono>
                <h3 style={{ fontSize: 19, fontWeight: 750, color: T.onDark, letterSpacing: '-0.02em', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: T.onDarkMuted, margin: 0 }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ══ 7. PRICING ══════════════════════════════════════ */}
      <Section>
        <Shell>
          <div className="zx-split" style={{ alignItems: 'center' }}>
            <motion.div {...rise()}>
              <Eyebrow>Pricing</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 'clamp(26px,3vw,34px)', fontWeight: 700, marginTop: 'clamp(6px,1vw,12px)', letterSpacing: '-0.02em' }}>$</span>
                <span style={{ fontSize: 'clamp(78px,11vw,150px)', fontWeight: 800, letterSpacing: '-0.055em', lineHeight: 0.85 }}>500</span>
              </div>
              <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.16em', display: 'block', marginBottom: 30 }}>
                One payment · No contract · No retainer
              </Mono>
              <Lead style={{ maxWidth: 400, marginBottom: 32 }}>
                Half up front, half on launch day once you have approved the live site.
                If it is not live in seven business days, you are refunded.
              </Lead>
              <Btn to={CALENDLY_URL}>Start your build <ArrowRight size={17} /></Btn>
            </motion.div>

            <motion.div {...rise(0.1)}>
              <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 20 }}>
                What the market charges
              </Mono>
              {COMPARE.map(([label, price, mine], i) => (
                <div key={label as string} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20,
                  padding: '20px 0',
                  borderTop: i === 0 ? `1px solid ${T.hairlineStrong}` : `1px solid ${T.hairline}`,
                }}>
                  <span style={{ fontSize: 15.5, color: mine ? T.text : T.muted, fontWeight: mine ? 700 : 400 }}>{label}</span>
                  <span style={{
                    fontFamily: MONO, fontSize: 14.5, whiteSpace: 'nowrap',
                    color: mine ? T.gold : T.faint, fontWeight: mine ? 700 : 500,
                  }}>{price}</span>
                </div>
              ))}
              <p style={{ fontSize: 12.5, lineHeight: 1.7, color: T.faint, marginTop: 20, borderTop: `1px solid ${T.hairline}`, paddingTop: 18 }}>
                Roughly 54% below the closest comparable NP-focused offer and 83-95% below typical
                agency pricing. Based on publicly listed prices at time of writing.
              </p>
            </motion.div>
          </div>
        </Shell>
      </Section>

      {/* ══ 7b. IS IT WORTH IT ══════════════════════════════ */}
      <Section tint>
        <Shell>
          <div className="zx-split" style={{ alignItems: 'center', gap: 'clamp(28px,5vw,68px)' }}>
            <motion.div {...slideIn('left')}>
              <Pill>Return on the spend</Pill>
              <H2 style={{ marginBottom: 20 }}>
                One patient usually pays for the <Grad>whole thing</Grad>.
              </H2>
              <Lead style={{ maxWidth: 460, marginBottom: 26 }}>
                A website is not a running cost like ads. It is built once, you own the code,
                and it keeps working every hour your front desk is closed.
              </Lead>
              {[
                ['You own the asset', 'Full source code is delivered to you. No licence, no monthly fee to keep it alive.'],
                ['It does not stop', 'It answers questions and takes bookings at 11pm and on a Sunday.'],
                ['The cost is fixed', 'No retainer, no scope creep, no invoice you did not expect.'],
              ].map(([t, b], i) => (
                <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '13px 0', borderTop: i === 0 ? `1px solid ${T.hairlineStrong}` : `1px solid ${T.hairline}` }}>
                  <Check size={16} style={{ color: T.primary, flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 3 }}>{t}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: T.muted }}>{b}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div {...slideIn('right', 0.08)}>
              <RoiCalc />
            </motion.div>
          </div>
        </Shell>
      </Section>

      {/* ══ 7c. RISK REVERSAL ═══════════════════════════════ */}
      <Section pad="clamp(52px,6vw,80px)">
        <Shell>
          <motion.div {...rise()} style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto clamp(30px,4vw,44px)' }}>
            <Pill tone="coral">Your risk, removed</Pill>
            <H2 style={{ marginBottom: 16 }}>Three ways you cannot lose money here.</H2>
            <Lead>Every one of these is in writing before you pay anything.</Lead>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 18 }}>
            {[
              [ShieldCheck, 'Live in 7 days, or refunded', 'If your site is not live on your domain within seven business days of receiving your content, you get every dollar back. No conditions.'],
              [CreditCard, 'You only risk $250', 'Half up front, half on launch day, and only once you have approved the live site. If you walk away at mockup stage, that is where it ends.'],
              [FileCheck, 'You approve before code', 'Nothing gets built until you have signed off the design. Changes at that stage cost nothing.'],
            ].map(([Icon, t, b], i) => {
              const I = Icon as typeof ShieldCheck
              return (
                <motion.div key={t as string} {...rise(i * 0.07)} className="zx-svc-card" style={{ padding: '26px 24px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 42, height: 42, borderRadius: 12, background: T.primaryTint, marginBottom: 16,
                  }}>
                    <I size={19} style={{ color: T.primaryDeep }} />
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 8 }}>{t as string}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: T.muted, margin: 0 }}>{b as string}</p>
                </motion.div>
              )
            })}
          </div>
        </Shell>
      </Section>

      {/* ══ 8. PROOF ════════════════════════════════════════ */}
      <Section tint>
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(38px,5vw,58px)' }}>
            <Eyebrow>Built for specialists</Eyebrow>
            <H2 style={{ maxWidth: 640 }}>Designed around how patients actually choose a provider.</H2>
          </motion.div>

          <Reveal>
            <Slider slides={[
              { img: '/img/portrait-1.jpg', focus: 'center 18%', title: 'Credentials first',    body: 'NPI, licence and specialty structured into the page so patients and search engines both read you as legitimate.' },
              { img: '/img/clinician-friendly.jpg', focus: 'center 14%', title: 'Clarity over clutter', body: 'One clear action per screen. No six competing buttons, no hunting for a phone number.' },
              { img: '/img/specialty-dental.jpg', focus: 'center 30%', title: 'Built to be found',    body: 'Technical SEO handled at build time, not sold back to you as an upgrade later.' },
            ]} />
          </Reveal>

          <div style={{ height: 'clamp(44px,6vw,72px)' }} />

          <motion.figure {...rise()} style={{ margin: 0, borderTop: `1px solid ${T.hairlineStrong}`, paddingTop: 'clamp(30px,4vw,48px)' }} className="zx-quote">
            <div className="zx-lift zx-zoom" style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '3/4', boxShadow: '0 20px 54px rgba(7,37,58,0.16)' }}>
              <img src="/img/portrait-2.jpg" alt="Healthcare practitioner" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
            <div>
            <blockquote style={{ margin: 0, fontSize: 'clamp(20px,2.4vw,31px)', lineHeight: 1.34, fontWeight: 600, letterSpacing: '-0.022em' }}>
              No client logos on this page yet. ZmaxLab is early, and pretending otherwise
              would be the first thing I would want you to distrust.
            </blockquote>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: T.muted, marginTop: 20, maxWidth: 560 }}>
              What being early actually buys you: my full attention rather than a queue position,
              direct access to the person writing the code, and a build I have every reason to get
              right because it becomes the portfolio I show the next practitioner.
            </p>
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${T.hairline}` }}>
              {[
                'Half up front - $250 is your entire exposure',
                'Live in 7 business days or refunded in full',
                'Full source code delivered - you own it outright',
              ].map(t => (
                <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '6px 0' }}>
                  <Check size={15} style={{ color: T.primary, flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14.5, lineHeight: 1.6, color: T.text }}>{t}</span>
                </div>
              ))}
            </div>
            </div>
          </motion.figure>
        </Shell>
      </Section>

      {/* ══ 9. CTA ══════════════════════════════════════════ */}
      <Section dark pad="clamp(80px,10vw,132px)" padBottom="clamp(34px,4vw,48px)">
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 780 }}>
            <Eyebrow dark>Next step</Eyebrow>
            <H2 style={{ color: T.onDark, marginBottom: 24 }}>
              Twenty minutes, and you will know exactly what your site would look like.
            </H2>
            <Lead dark style={{ maxWidth: 560, marginBottom: 38 }}>
              A short call - your specialty, your market, what the build would involve.
              No obligation and nothing to prepare.
            </Lead>
            <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn to={CALENDLY_URL} dark>Book a free demo <ArrowRight size={17} /></Btn>
              <TextLink to="/how-it-works" dark>How the 7 days work</TextLink>
            </div>
            <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', marginTop: 52, paddingTop: 26, borderTop: `1px solid ${T.onDarkLine}` }}>
              {['Source code included', 'No contract', '7-day guarantee or refunded'].map(t => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Check size={14} style={{ color: T.primaryBright }} />
                  <Mono style={{ color: T.onDarkMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t}</Mono>
                </span>
              ))}
            </div>
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
