import { ArrowRight, Check, X } from 'lucide-react'
import { T, CALENDLY_URL } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, Eyebrow, Display, H2, Lead, Mono, Btn, TextLink, Grad, Pill, rise, motion } from '@/components/ui/kit'

const COMPARE_ROWS: [string, string, string][] = [
  ['Page speed', 'Loads in 3-6 seconds on a page builder', 'Hand-coded, loads in under a second'],
  ['Schema markup', 'Generic, or none at all', 'Specialty-specific, structured for your NPI'],
  ['Meta titles', 'One template, reused across every page', 'Written per page, for your city and specialty'],
  ['HIPAA-aware forms', 'Data passes through a third-party SaaS', 'Submits straight to your inbox, nothing logged'],
  ['Ongoing cost', '$30-$80 a month, forever', '$0 a month - you own the code'],
]

const WHO: [string, string][] = [
  ['A nurse practitioner opening an independent practice', 'who needs to rank locally fast, not in six months'],
  ['A physician assistant building a patient base', 'through organic search rather than referrals alone'],
  ['A mental health therapist', 'who needs a calm, trust-building design and a HIPAA-aware intake form'],
  ['A chiropractor or functional medicine practitioner', 'trying to look like more than the chain clinic down the road'],
]

const blogSchema = [{
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Custom vs Template Medical Website: Which Is Right for Your NPI Practice?',
  description: 'A $30/month template or a custom-built healthcare website? Real differences in search rankings, patient trust and long-term ROI for NPI practitioners.',
  image: 'https://zmaxlab.site/og-image.png',
  author: { '@type': 'Person', name: 'Ravi', url: 'https://zmaxlab.site/about' },
  publisher: { '@type': 'Organization', name: 'ZmaxLab', url: 'https://zmaxlab.site' },
  datePublished: '2024-01-15',
  dateModified: '2026-09-18',
  url: 'https://zmaxlab.site/blog/custom-vs-template-medical-website',
  mainEntityOfPage: 'https://zmaxlab.site/blog/custom-vs-template-medical-website',
}]

export default function BlogPage() {
  useSEO({
    title: 'Custom vs Template Medical Website: Which Is Right for Your NPI Practice? | ZmaxLab',
    description: 'A $30/month template or a custom-built healthcare website? Real differences in search rankings, patient trust and long-term ROI for NPI practitioners.',
    canonical: 'https://zmaxlab.site/blog/custom-vs-template-medical-website',
    schema: blogSchema,
  })

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'clamp(112px,13vw,164px)', paddingBottom: 'clamp(40px,5vw,64px)' }}>
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 740 }}>
            <TextLink to="/">← Back to ZmaxLab</TextLink>
            <div style={{ height: 22 }} />
            <Pill>From the journal</Pill>
            <Display style={{ marginBottom: 22 }}>
              Custom vs template: which one actually earns you <Grad>patients</Grad>?
            </Display>
            <Lead style={{ maxWidth: 620 }}>
              If you're a nurse practitioner, PA, therapist or chiropractor, you've probably
              faced this choice - a $30/month template, or a custom-built site. Here's the
              honest version of that comparison, not the version a template company sells you.
            </Lead>
          </motion.div>
        </Shell>
      </section>

      {/* THE ARGUMENT */}
      <Section tint>
        <Shell>
          <div className="zx-split">
            <motion.div {...rise()}>
              <Eyebrow>The real cost of "cheap"</Eyebrow>
              <H2 style={{ marginBottom: 20 }}>
                $30 a month sounds affordable, until you count three years of it.
              </H2>
              <Lead style={{ maxWidth: 460 }}>
                Wix, Squarespace and the practice-management website add-ons run $30-$80 a
                month. Over three years that's $1,080-$2,880 - for a site you never own, can't
                fully customise, and that looks like the same template the clinic three streets
                over is also running.
              </Lead>
            </motion.div>
            <motion.div {...rise(0.08)}>
              <Lead style={{ maxWidth: 460, marginBottom: 18 }}>
                The bigger cost is invisible: templates cap what you can do technically. You
                can't add real schema markup for your specialty, you're stuck with one generic
                meta title across every page, and you have no control over how fast the site
                loads - which Google weighs directly in rankings.
              </Lead>
              <Lead style={{ maxWidth: 460, color: T.text, fontWeight: 600 }}>
                A custom-coded site removes that ceiling entirely, for less than what most
                templates cost you over two years.
              </Lead>
            </motion.div>
          </div>
        </Shell>
      </Section>

      {/* COMPARISON */}
      <Section>
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(32px,4vw,48px)', maxWidth: 620 }}>
            <Eyebrow>Side by side</Eyebrow>
            <H2>Where the gap actually shows up.</H2>
          </motion.div>

          <div className="zx-svc-grid">
            {COMPARE_ROWS.map(([factor, template, custom], i) => (
              <motion.div key={factor} {...rise(i * 0.05)} className="zx-svc-card" style={{ padding: '22px 22px 20px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 14px' }}>{factor}</h3>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
                  <X size={14} style={{ color: T.coral, flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14, color: T.muted, lineHeight: 1.5 }}>{template}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <Check size={14} style={{ color: T.primary, flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14, color: T.text, fontWeight: 500, lineHeight: 1.5 }}>{custom}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Shell>
      </Section>

      {/* WHO IT'S FOR */}
      <section style={{ background: T.ink, color: T.onDark, padding: 'clamp(56px,7vw,88px) 0' }}>
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(32px,4vw,48px)', maxWidth: 600 }}>
            <Eyebrow dark>Who this actually fits</Eyebrow>
            <H2 style={{ color: T.onDark }}>Not everyone needs this. These practitioners usually do.</H2>
          </motion.div>
          <div>
            {WHO.map(([who, why], i) => (
              <motion.div key={who} {...rise(i * 0.06)} style={{
                display: 'grid', gridTemplateColumns: '30px 1fr', gap: 16, padding: '18px 0',
                borderTop: i === 0 ? `1px solid ${T.onDarkLine}` : `1px solid ${T.onDarkLine}`,
              }}>
                <Mono style={{ color: T.onDarkFaint }}>{`0${i + 1}`}</Mono>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 650, color: T.onDark, marginBottom: 4 }}>{who}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.6, color: T.onDarkMuted }}>{why}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Shell>
      </section>

      {/* THE HONEST TAKE */}
      <Section pad="clamp(56px,7vw,92px)">
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 640 }}>
            <Eyebrow>Where I'd disagree with myself</Eyebrow>
            <H2 style={{ marginBottom: 20 }}>A template is the right call sometimes.</H2>
            <Lead style={{ marginBottom: 18 }}>
              If you're testing whether a practice idea works at all, or you need something live
              this weekend, a $30 template is a completely reasonable place to start. I'd tell you
              that on a call rather than talk you out of it.
            </Lead>
            <Lead style={{ color: T.text, fontWeight: 600 }}>
              Where it stops making sense is once you're actually trying to rank locally, be
              taken seriously by patients checking credentials, and stop paying that $30 a month
              forever for something you'll never own. That's the point a custom site pays for
              itself - usually with the first patient it brings in.
            </Lead>
          </motion.div>
        </Shell>
      </Section>

      {/* CTA */}
      <Section dark pad="clamp(64px,8vw,100px)" padBottom="clamp(34px,4vw,48px)">
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 680 }}>
            <Eyebrow dark>Next step</Eyebrow>
            <H2 style={{ color: T.onDark, marginBottom: 22 }}>
              Want to see what yours would look like?
            </H2>
            <Lead dark style={{ maxWidth: 520, marginBottom: 34 }}>
              Twenty minutes, no obligation. I'll show you a live mockup for your specialty and
              tell you honestly whether a custom site is the right move yet.
            </Lead>
            <div style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn to={CALENDLY_URL} dark>Book a free demo <ArrowRight size={17} /></Btn>
              <TextLink to="/pricing" dark>See the full price breakdown</TextLink>
            </div>
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
