import { ArrowRight, Check, X } from 'lucide-react'
import { T, MONO, CALENDLY_URL } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, H2, Lead, Mono, Btn, TextLink, Display, Grad, Pill, rise, motion } from '@/components/ui/kit'
import RoiCalc from '@/components/ui/RoiCalc'

const INCLUDED = [
  'Custom-coded design - no theme, no page builder',
  'Up to 6 pages (home, about, services, contact, and two more)',
  'Domain researched, registered and configured',
  'Hosting set up and secured with SSL',
  'Mobile-first build, tested across devices',
  'NPI, licence and specialty structured into the page',
  'Online booking wired to Calendly, Jane or SimplePractice',
  'HIPAA-aware contact and intake forms',
  'Meta structure, schema markup and sitemap',
  'Google Search Console and Analytics 4 configured',
  'Copywriting for every page',
  'One free revision after launch',
  'Full source code delivered to you',
]

const NOT_INCLUDED = [
  ['Hosting fees after setup', 'Roughly $3-6/month, paid directly to your host. I set it up; you own the account.'],
  ['Domain renewal', 'About $12-15/year, again in your name, not mine.'],
  ['Ongoing SEO or content', 'Optional monthly services, priced separately below.'],
  ['Logo or brand identity design', 'I will work with the logo you have. If you need one made, I will point you somewhere good.'],
  ['Custom software or patient portals', 'Outside what a $500 site can honestly cover.'],
]

const MONTHLY: [string, string, string][] = [
  ['Local SEO', '$230', 'Keyword targeting, Google Maps optimisation, citations, monthly reporting.'],
  ['Social media', '$150', '12-16 compliant posts a month across Instagram, Facebook and LinkedIn.'],
  ['Reputation', '$100', 'Review requests sent for you, monitoring, response templates.'],
  ['Reporting', '$75', 'Rankings, traffic sources, call and enquiry tracking.'],
  ['Site support', '$200', 'Unlimited content updates, security monitoring, priority response.'],
]

const ONETIME: [string, string][] = [
  ['Google Business Profile setup', '$150'],
  ['NPI directory listings (7 sites)', '$75'],
  ['HIPAA intake forms', '$100'],
  ['Telehealth page', '$100'],
  ['Blog content starter (3 posts)', '$150'],
  ['Appointment reminder setup', '$75'],
]

const FAQS: [string, string][] = [
  ['Why is it $500 when agencies charge thousands?',
   'Because you are paying one person for about a week of focused work, not a studio with account managers, project managers and overheads. The trade-off is real: I take a limited number of builds at a time, and I do not offer the breadth a full agency does. For a solo or small practice that needs a professional site rather than a marketing department, that trade is usually worth making.'],
  ['Is $500 really the total, or does it grow?',
   'It is the total for the build. The only unavoidable ongoing costs are hosting (roughly $3-6/month) and domain renewal (about $12-15/year), both paid directly by you to those providers, in your name. Everything else on this page is optional and clearly priced.'],
  ['When do I pay?',
   'Half ($250) to begin, half ($250) on launch day, after you have approved the live site. If you decide not to continue at the design stage, the first $250 is all you have spent.'],
  ['What if it is late?',
   'If your site is not live within seven business days of receiving your content, you get a full refund. Not a partial credit or a discount on future work.'],
  ['What if I do not like the design?',
   'You approve a full mockup before any code is written. Changes at that stage cost nothing. After launch you get one free revision.'],
  ['Do I actually own it?',
   'Yes. The full source code is delivered to you, the domain is registered in your name, and the hosting account is yours. If you want to move to someone else later, nothing stops you.'],
  ['Do you offer payment plans?',
   'The build is already split in half. For monthly services, the first month is due at signup and you can cancel any month after that.'],
]

export default function PricingPage() {
  useSEO({
    title: 'Pricing | $500 Flat Healthcare Website Design - ZmaxLab',
    description: 'A custom healthcare website for a flat $500, live in 7 business days. Full breakdown of what is included, what is not, and how it compares to agencies charging $3,000-$10,000.',
    canonical: 'https://zmaxlab.site/pricing',
  })

  return (
    <>
      {/* HERO - lead with the number */}
      <section style={{ paddingTop: 'clamp(112px,13vw,164px)', paddingBottom: 'clamp(40px,5vw,64px)' }}>
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 760 }}>
            <Pill>Pricing, stated plainly</Pill>
            <Display style={{ marginBottom: 22 }}>
              A custom healthcare website costs <Grad>$500</Grad>.
            </Display>
            <Lead style={{ maxWidth: 580, marginBottom: 30 }}>
              That is the whole build, live in seven business days. Most competitors make you
              book a call to find out their price. Here is mine, along with exactly what it does
              and does not cover.
            </Lead>
            <div style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn to={CALENDLY_URL}>Book a free demo <ArrowRight size={17} /></Btn>
              <TextLink to="/how-it-works">See the 7-day process</TextLink>
            </div>
          </motion.div>
        </Shell>
      </section>

      {/* WHAT'S IN / WHAT'S NOT */}
      <Section tint pad="clamp(48px,6vw,84px)">
        <Shell>
          <div className="zx-split" style={{ gap: 'clamp(28px,4vw,60px)' }}>
            <motion.div {...rise()}>
              <Mono style={{ color: T.primaryDeep, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, display: 'block', marginBottom: 18 }}>
                Included in the $500
              </Mono>
              {INCLUDED.map((c, i) => (
                <div key={c} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.hairline}` }}>
                  <Check size={15} style={{ color: T.primary, flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 15, lineHeight: 1.55 }}>{c}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...rise(0.08)}>
              <Mono style={{ color: T.coral, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, display: 'block', marginBottom: 18 }}>
                Not included - so there are no surprises
              </Mono>
              {NOT_INCLUDED.map(([t, b], i) => (
                <div key={t} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', padding: '13px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.hairline}` }}>
                  <X size={15} style={{ color: T.coral, flexShrink: 0, marginTop: 4 }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{t}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: T.muted }}>{b}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Shell>
      </Section>

      {/* MARKET COMPARISON */}
      <Section pad="clamp(48px,6vw,84px)">
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 30, maxWidth: 620 }}>
            <H2 style={{ marginBottom: 16 }}>What the rest of the market charges.</H2>
            <Lead>Based on publicly listed prices. Where a company does not publish pricing, that is noted rather than guessed at.</Lead>
          </motion.div>
          <motion.div {...rise(0.06)}>
            {[
              ['Healthcare marketing agency', '$3,000 - $10,000', 'Usually a retainer, often 8-12 weeks', false],
              ['Closest NP-focused competitor', '$1,097.50', 'Published price, split across two payments', false],
              ['Wix / Squarespace template', '$29/month forever', 'You build it, you maintain it, you never own it', false],
              ['ZmaxLab', '$500 once', 'Custom-coded, 7 days, source code yours', true],
            ].map(([label, price, note, mine], i) => (
              <div key={label as string} style={{
                display: 'grid', gridTemplateColumns: '1.1fr auto 1.2fr', gap: 'clamp(12px,3vw,32px)',
                alignItems: 'baseline', padding: '18px 0',
                borderTop: i === 0 ? `1px solid ${T.hairlineStrong}` : `1px solid ${T.hairline}`,
                background: mine ? T.primaryTint : 'transparent',
                paddingLeft: mine ? 16 : 0, paddingRight: mine ? 16 : 0,
                borderRadius: mine ? 10 : 0,
              }} className="zx-price-row">
                <span style={{ fontSize: 15.5, fontWeight: mine ? 700 : 500, color: T.text }}>{label as string}</span>
                <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: mine ? T.primaryDeep : T.muted, whiteSpace: 'nowrap' }}>{price as string}</span>
                <span style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.5 }}>{note as string}</span>
              </div>
            ))}
            <p style={{ fontSize: 12.5, color: T.faint, marginTop: 16, lineHeight: 1.6, maxWidth: 640 }}>
              That places ZmaxLab roughly 54% below the closest comparable NP-focused offer and
              83-95% below typical agency pricing. Agency figures are a market range, not a quote
              from any one company.
            </p>
          </motion.div>
        </Shell>
      </Section>

      {/* ROI */}
      <Section tint pad="clamp(48px,6vw,84px)">
        <Shell>
          <div className="zx-split" style={{ alignItems: 'center', gap: 'clamp(28px,4vw,60px)' }}>
            <motion.div {...rise()}>
              <H2 style={{ marginBottom: 18 }}>Is $500 worth it for your practice?</H2>
              <Lead style={{ maxWidth: 440 }}>
                Only you know what a new patient is worth to you. Put your own number in and the
                arithmetic does the rest. No website can promise a specific number of patients,
                and I am not going to pretend otherwise.
              </Lead>
            </motion.div>
            <motion.div {...rise(0.08)}><RoiCalc /></motion.div>
          </div>
        </Shell>
      </Section>

      {/* OPTIONAL SERVICES */}
      <Section pad="clamp(48px,6vw,84px)">
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 28, maxWidth: 600 }}>
            <H2 style={{ marginBottom: 14 }}>Optional, if and when you want it.</H2>
            <Lead>Nothing here is bundled or required. Add one, add none, cancel any month.</Lead>
          </motion.div>

          <div className="zx-svc-grid" style={{ marginBottom: 34 }}>
            {MONTHLY.map(([t, p, d], i) => (
              <motion.div key={t} {...rise(i * 0.05)} className="zx-svc-card" style={{ padding: '24px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{t}</h3>
                  <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: T.primaryDeep, whiteSpace: 'nowrap' }}>{p}<span style={{ fontSize: 11, opacity: 0.7 }}>/mo</span></span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: T.muted, margin: 0 }}>{d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...rise()}>
            <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 14 }}>
              One-time add-ons
            </Mono>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '0 clamp(24px,4vw,48px)' }}>
              {ONETIME.map(([t, p], i) => (
                <div key={t} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, padding: '13px 0', borderTop: `1px solid ${i < 2 ? T.hairlineStrong : T.hairline}` }}>
                  <span style={{ fontSize: 15, color: T.text }}>{t}</span>
                  <span style={{ fontFamily: MONO, fontSize: 14.5, fontWeight: 700, color: T.gold, whiteSpace: 'nowrap' }}>{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Shell>
      </Section>

      {/* FAQ */}
      <Section tint pad="clamp(48px,6vw,84px)">
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 26, maxWidth: 600 }}>
            <H2>Questions people ask about the price.</H2>
          </motion.div>
          <div style={{ maxWidth: 820 }}>
            {FAQS.map(([q, a], i) => (
              <motion.div key={q} {...rise(i * 0.04)} style={{ padding: '22px 0', borderTop: i === 0 ? `1px solid ${T.hairlineStrong}` : `1px solid ${T.hairline}` }}>
                <h3 style={{ fontSize: 'clamp(17px,1.8vw,20px)', fontWeight: 600, marginBottom: 9, letterSpacing: '-0.01em' }}>{q}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: T.muted, margin: 0 }}>{a}</p>
              </motion.div>
            ))}
          </div>
        </Shell>
      </Section>

      {/* CTA */}
      <Section dark pad="clamp(64px,8vw,104px)" padBottom="clamp(34px,4vw,48px)">
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 680 }}>
            <H2 style={{ color: T.onDark, marginBottom: 20 }}>Twenty minutes, and no obligation.</H2>
            <Lead dark style={{ maxWidth: 520, marginBottom: 32 }}>
              If a $500 site is not the right answer for your practice, I will say so on the call
              rather than sell you one.
            </Lead>
            <Btn to={CALENDLY_URL} dark>Book a free demo <ArrowRight size={17} /></Btn>
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
