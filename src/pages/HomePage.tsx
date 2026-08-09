import { ArrowRight, Check } from 'lucide-react'
import { T, MONO, TYPE } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import {
  Shell, Section, Eyebrow, Display, H2, Lead, Mono, Btn, TextLink, Index, Grad, Pill, rise, motion,
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
    title: 'ZmaxLab | Custom Healthcare Websites for NPI-Registered Practitioners',
    description: 'Custom-coded healthcare websites for NPI-registered practitioners. $500 flat fee, live in 7 business days. No contract, no templates, source code included.',
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
                You focus on patients.<br />
                <Grad>We handle every</Grad><br />
                digital footprint.
              </Display>
              <Lead style={{ maxWidth: 480, marginBottom: 32, color: 'rgba(7,37,58,0.80)' }}>
                Domain, hosting, website, SEO, reviews, booking - all of it set up and
                looked after by one specialist. Your custom site goes live in 7 business
                days for a flat $500.
              </Lead>
              <div style={{ display: 'flex', alignItems: 'center', gap: 26, flexWrap: 'wrap' }}>
                <Btn to="/contact">Book a free demo <ArrowRight size={17} /></Btn>
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
            <div style={{ position: 'relative', minHeight: 340 }} className="zx-hero-img">
              <img src="/img/clinician-hero.jpg" alt="Nurse practitioner in scrubs" loading="eager"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', left: 22, bottom: 22, background: 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(8px)', padding: '14px 20px', borderRadius: 14,
                boxShadow: '0 14px 40px rgba(7,37,58,0.20)',
              }}>
                <Mono style={{ color: T.faint, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Everything included</Mono>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: T.primaryDeep }}>$500</div>
              </div>
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
            <motion.div {...rise()}><Eyebrow>The problem</Eyebrow></motion.div>
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
            <motion.div {...rise()} style={{ position: 'sticky', top: 120 }}>
              <Eyebrow>What you get</Eyebrow>
              <H2 style={{ marginBottom: 22 }}>Every digital <Grad>footprint</Grad>, handled.</H2>
              <Lead style={{ maxWidth: 380, marginBottom: 30 }}>
                From buying the right domain to the site itself. No starter tier, no upsell call, nothing held back to charge for later.
              </Lead>
              <TextLink to="/services">Full service breakdown</TextLink>
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

      {/* ══ 5. FULL-BLEED PHOTO BAND ════════════════════════ */}
      <section style={{ position: 'relative', minHeight: 'clamp(340px,46vw,540px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img src="/img/practice-room.jpg" alt="A modern clinical treatment room" loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,26,0.90) 0%, rgba(10,15,26,0.45) 55%, rgba(10,15,26,0.20) 100%)' }} />
        <Shell style={{ position: 'relative', width: '100%', paddingBottom: 'clamp(38px,5vw,64px)', paddingTop: 80 }}>
          <motion.div {...rise()} style={{ maxWidth: 700 }}>
            <Eyebrow dark>Why it matters</Eyebrow>
            <H2 style={{ color: T.onDark, marginBottom: 16 }}>
              Your website is the first appointment.
            </H2>
            <Lead dark style={{ maxWidth: 540 }}>
              It is where a patient decides whether you look like someone they trust with their
              health - usually before they ever call.
            </Lead>
          </motion.div>
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
              <Btn to="/contact">Start your build <ArrowRight size={17} /></Btn>
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

      {/* ══ 8. PROOF ════════════════════════════════════════ */}
      <Section tint>
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(38px,5vw,58px)' }}>
            <Eyebrow>Built for specialists</Eyebrow>
            <H2 style={{ maxWidth: 640 }}>Designed around how patients actually choose a provider.</H2>
          </motion.div>

          <div className="zx-trio" style={{ marginBottom: 'clamp(44px,6vw,72px)' }}>
            {[
              ['/img/portrait-1.jpg', 'Credentials first', 'NPI, licence and specialty structured into the page.'],
              ['/img/portrait-2.jpg', 'Clarity over clutter', 'One clear action per screen, not six competing buttons.'],
              ['/img/portrait-3.jpg', 'Built to be found', 'Technical SEO handled at build time, not sold later.'],
            ].map(([src, title, body], i) => (
              <motion.div key={title} {...rise(i * 0.08)}>
                <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: T.hairline, marginBottom: 18, borderRadius: 3 }}>
                  <img src={src} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(1) contrast(1.04)' }} />
                </div>
                <h3 style={{ fontSize: 17.5, fontWeight: 750, letterSpacing: '-0.02em', marginBottom: 7 }}>{title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.figure {...rise()} style={{ margin: 0, borderTop: `1px solid ${T.hairlineStrong}`, paddingTop: 'clamp(30px,4vw,48px)', maxWidth: 900 }}>
            <blockquote style={{ margin: 0, fontSize: 'clamp(21px,2.6vw,34px)', lineHeight: 1.32, fontWeight: 600, letterSpacing: '-0.025em' }}>
              "The design looks considerably more polished than the template sites most other
              clinics in my area are using."
            </blockquote>
            <figcaption style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Mono style={{ color: T.muted, textTransform: 'uppercase', letterSpacing: '0.13em' }}>Chiropractor · Phoenix, AZ</Mono>
              <span style={{
                fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: T.gold, border: `1px solid ${T.gold}55`, padding: '4px 9px', borderRadius: 3,
              }}>Illustrative example</span>
            </figcaption>
            <p style={{ fontSize: 12.5, color: T.faint, marginTop: 14, maxWidth: 560, lineHeight: 1.65 }}>
              ZmaxLab is early - this reflects the kind of feedback the process is built to earn,
              not a verified client review. Real case studies will replace it as they exist.
            </p>
          </motion.figure>
        </Shell>
      </Section>

      {/* ══ 9. CTA ══════════════════════════════════════════ */}
      <Section dark pad="clamp(80px,10vw,132px)">
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
              <Btn to="/contact" dark>Book a free demo <ArrowRight size={17} /></Btn>
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
