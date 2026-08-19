import { ArrowRight, Check } from 'lucide-react'
import { T, TYPE , CALENDLY_URL } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, Eyebrow, Display, H2, Lead, Mono, Btn, TextLink, Index, Grad, Pill, Vid, rise, motion } from '@/components/ui/kit'

const PRINCIPLES: [string, string, string][] = [
  ['01', 'One person builds it', 'You talk to the person writing the code. No account manager relaying messages, no junior designer learning on your project.'],
  ['02', 'Hand-coded, always', 'No WordPress, no page builder, no theme. Every line is written for your practice, which is why it loads fast and looks like nobody else.'],
  ['03', 'One price, stated plainly', '$500 is $500. No hidden fees, no upsell call halfway through, no "that will be extra" once you are committed.'],
  ['04', 'Healthcare, not everything', 'I do not build restaurant sites or e-commerce stores. Credentials, compliance and patient behaviour are the whole focus.'],
]

export default function AboutPage() {
  useSEO({
    title: 'About Ravi | Healthcare Web Designer for NPI Practitioners - ZmaxLab',
    description: 'ZmaxLab is one specialist building custom healthcare websites for NPI-registered practitioners. $500 flat, seven-day delivery, no contract.',
    canonical: 'https://zmaxlab.site/about',
    schema: [{"@context":"https://schema.org","@type":"Person","name":"Ravi","jobTitle":"Healthcare Web Designer","description":"Ravi personally builds every custom healthcare website for NPI-registered practitioners in the USA. $500 flat fee, delivered in 7 business days.","url":"https://zmaxlab.site/about","worksFor":{"@type":"Organization","name":"ZmaxLab","url":"https://zmaxlab.site"}}],
  })

  return (
    <>
      {/* HERO - asymmetric with portrait */}
      <section style={{ paddingTop: 'clamp(118px,13vw,172px)', paddingBottom: 'clamp(56px,7vw,92px)' }}>
        <Shell wide>
          <div className="zx-hero">
            <motion.div {...rise()}>
              <Pill>About ZmaxLab</Pill>
              <Display style={{ marginBottom: 26 }}>
                Not an agency.
                <Grad>One specialist</Grad>,
                building carefully.
              </Display>
              <Lead style={{ maxWidth: 460, marginBottom: 34 }}>
                ZmaxLab is Ravi. Every site is designed, written and coded personally -
                which is the reason it costs $500 instead of $5,000, and the reason it
                takes a week instead of a quarter.
              </Lead>
              <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
                <Btn to={CALENDLY_URL}>Book a free demo <ArrowRight size={17} /></Btn>
                <TextLink to="/how-it-works">How the build works</TextLink>
              </div>
            </motion.div>

            <motion.div className="zx-hero-media" {...rise(0.1)}>
              <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: 20, background: T.surface, boxShadow: '0 24px 64px rgba(7,37,58,0.18)' }}>
                <Vid src="/video/portrait-clinician.mp4" poster="/img/poster-portrait-clinician.jpg" />
              </div>
            </motion.div>
          </div>
        </Shell>
      </section>

      {/* FACTS STRIP */}
      <div style={{ borderTop: `1px solid ${T.hairline}`, borderBottom: `1px solid ${T.hairline}` }}>
        <Shell style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,5vw,72px)', padding: '30px clamp(20px,5vw,56px)' }}>
          {[['$500', 'Flat fee'], ['7 days', 'To launch'], ['100%', 'Custom-coded'], ['1:1', 'Direct with Ravi']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{v}</div>
              <Mono style={{ color: T.faint, textTransform: 'uppercase', display: 'block', marginTop: 6 }}>{l}</Mono>
            </div>
          ))}
        </Shell>
      </div>

      {/* STORY */}
      <Section>
        <Shell>
          <div className="zx-stmt">
            <motion.div {...rise()}>
              <Eyebrow>Why this exists</Eyebrow>
              <div className="zx-lift zx-zoom" style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '3/4', boxShadow: '0 20px 54px rgba(7,37,58,0.16)', marginTop: 22 }}>
                <img src="/img/clinician-scrubs.jpg" alt="Healthcare practitioner in scrubs" loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 16%', display: 'block' }} />
              </div>
            </motion.div>
            <motion.div {...rise(0.08)}>
              <H2 style={{ marginBottom: 28 }}>
                Practitioners kept getting quoted agency prices for template work.
              </H2>
              <Lead style={{ maxWidth: 620, marginBottom: 20 }}>
                A nurse practitioner opening her own clinic does not need a twelve-week
                discovery process and a retainer. She needs a site that loads fast, states her
                credentials clearly, takes bookings, and does not look like the four other
                clinics in her city that bought the same theme.
              </Lead>
              <Lead style={{ maxWidth: 620, marginBottom: 20 }}>
                That is a week of focused work, not a quarter of meetings. So ZmaxLab is priced
                and scheduled like a week of focused work.
              </Lead>
              <Lead style={{ maxWidth: 620, color: T.text, fontWeight: 600, marginBottom: 26 }}>
                The trade-off is honest: I am one person, so I take a limited number of builds.
                What you get in return is that the person you speak to is the person who builds it.
              </Lead>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <img src="/ravi.jpg" alt="Ravi, founder of ZmaxLab" loading="lazy"
                  style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: T.shadowMd }} />
                <div>
                  <div style={{ fontFamily: 'Fraunces,Georgia,serif', fontWeight: 600, fontSize: 17 }}>Ravi</div>
                  <Mono style={{ color: T.faint }}>Founder &amp; the person who builds your site</Mono>
                </div>
              </div>
            </motion.div>
          </div>
        </Shell>
      </Section>

      {/* PRINCIPLES */}
      <Section tint>
        <Shell>
          <div className="zx-sticky">
            <motion.div {...rise()} className="zx-sticky-col">
              <Eyebrow>How I work</Eyebrow>
              <H2 style={{ marginBottom: 20 }}>Four rules I do not bend.</H2>
              <Lead style={{ maxWidth: 340 }}>
                These are the reasons the price and the timeline actually hold.
              </Lead>
              <div className="zx-lift zx-zoom" style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '4/3', marginTop: 30, boxShadow: '0 18px 46px rgba(7,37,58,0.14)' }}>
                <img src="/img/detail-stethoscope.jpg" alt="Clinical detail" loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 38%', display: 'block' }} />
              </div>
            </motion.div>
            <div>
              {PRINCIPLES.map(([n, title, body], i) => (
                <motion.div key={n} {...rise(i * 0.06)} className="zx-row" style={{
                  display: 'grid', gridTemplateColumns: '44px 1fr', gap: 18,
                  padding: '28px 14px 28px 0',
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

      {/* WHO IT IS FOR - split */}
      <section style={{ background: T.ink, color: T.onDark, padding: 'clamp(52px,6.5vw,88px) 0' }}>
        <Shell>
          <div className="zx-split" style={{ alignItems: 'center', gap: 'clamp(28px,5vw,72px)' }}>
            <motion.div {...rise()}>
              <Eyebrow dark>Who this is for</Eyebrow>
              <H2 style={{ color: T.onDark, marginBottom: 18 }}>
                Built for people who trained for years to do something else.
              </H2>
              <Lead dark style={{ maxWidth: 470 }}>
                You did not go to school to compare hosting plans or argue with a page builder.
                Hand it over once and it is handled.
              </Lead>
            </motion.div>
            <motion.div {...rise(0.1)} className="zx-lift zx-zoom" style={{
              borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3',
              boxShadow: '0 30px 76px rgba(0,0,0,0.45)',
            }}>
              <img src="/img/portrait-3.jpg" alt="Healthcare practitioner at a desk" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 24%', display: 'block' }} />
            </motion.div>
          </div>
        </Shell>
      </section>

      {/* COMMITMENT + CTA */}
      <Section dark padBottom="clamp(34px,4vw,48px)">
        <Shell>
          <div className="zx-split" style={{ alignItems: 'center' }}>
            <motion.div {...rise()}>
              <Eyebrow dark>The commitment</Eyebrow>
              <H2 style={{ color: T.onDark, marginBottom: 26 }}>What you are guaranteed.</H2>
              <Btn to={CALENDLY_URL} dark>Book a free demo <ArrowRight size={17} /></Btn>
            </motion.div>
            <motion.div {...rise(0.1)}>
              {[
                'Live in seven business days, or you are refunded in full',
                'The full source code, delivered to you - you own it outright',
                'No contract, no retainer, no automatic renewal',
                'You speak to Ravi directly, start to finish',
              ].map((c, i) => (
                <div key={c} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 0',
                  borderTop: i === 0 ? `1px solid ${T.onDarkLine}` : `1px solid ${T.onDarkLine}`,
                }}>
                  <Check size={16} style={{ color: T.primaryBright, flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 15.5, lineHeight: 1.6, color: T.onDark }}>{c}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Shell>
      </Section>
    </>
  )
}
