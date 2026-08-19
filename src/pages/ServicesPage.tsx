import { ArrowRight, Check } from 'lucide-react'
import { T, MONO , CALENDLY_URL } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, Eyebrow, Display, H2, Lead, Mono, Btn, TextLink, Grad, Pill, rise, motion } from '@/components/ui/kit'

const CORE = [
  'Custom-coded, zero templates', 'Mobile-first across every device', 'SSL secured with HTTPS',
  'Meta, schema and sitemap configured', 'Online booking (Calendly / Jane / SimplePractice)',
  'Insurance & billing page', 'HIPAA-aware contact forms', 'Analytics 4 + Search Console',
  'NPI, licence & specialty displayed', 'Live on your domain in 7 days', 'Full source code delivered',
  'One free post-launch revision',
]

const MONTHLY: [string, string, string, string[]][] = [
  ['Local SEO', '$230', 'When someone searches your specialty and your city, they are usually ready to book. The practice that appears first, with clear insurance and availability information, tends to get that call.',
    ['20+ specialty + city keyword targets', 'Google Maps 3-pack optimisation', 'Monthly ranking & traffic report', 'Citation & NPI directory building', 'Competitor gap analysis']],
  ['Social Media', '$150', 'Very few patients book on the first visit to your profile. Steady, useful content keeps you familiar - so when the pain gets bad enough to act, you are the name they already recognise.',
    ['12-16 HIPAA-compliant posts monthly', 'Instagram, Facebook & LinkedIn', 'Patient education content', 'Stories, reels & highlight covers', 'Monthly performance analytics']],
  ['Reputation', '$100', 'Between two similarly qualified practices, patients almost always default to the one with more recent, better-answered reviews. That gap is fixable without asking anything awkward of your patients.',
    ['Post-visit review requests sent for you', '2-click SMS + email links', 'Google & Healthgrades monitoring', 'Done-for-you response templates', 'Negative review alerts']],
  ['Reporting', '$75', 'Most practices cannot say whether a new patient came from Google, a referral, or a sign on the road. Knowing that changes where you spend the next dollar.',
    ['Ranking positions tracked', 'Visitor & traffic source analytics', 'Call & enquiry conversion tracking', 'Core Web Vitals score', 'Competitor comparison']],
  ['Site Support', '$200', 'Your site works every hour your front desk does not - answering questions, taking bookings, reassuring people at 11pm. It should be maintained like the staff member it is.',
    ['Unlimited text, image & page updates', 'Monthly performance review call', 'Priority 24-hour response', 'Security & uptime monitoring', 'Annual SEO health check']],
]

const ONETIME: [string, string, string][] = [
  ['Google Business Profile', '$150', 'Verified and fully optimised so "[specialty] near me" finds you.'],
  ['NPI Directory Listings', '$75', 'Healthgrades, Zocdoc, Vitals, WebMD, Psychology Today, US News, NPI Registry.'],
  ['HIPAA Intake Forms', '$100', 'Secure digital intake delivered to your inbox or EHR.'],
  ['Telehealth Page', '$100', 'State coverage map, platform links and insurance info.'],
  ['Blog Content Starter', '$150', 'Three SEO-optimised posts, researched, written and published.'],
  ['Appointment Reminders', '$75', 'Reminder messages configured once, working from then on.'],
]

export default function ServicesPage() {
  const serviceSchema = [{
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Healthcare website design and local SEO",
    "provider": { "@type": "Organization", "name": "ZmaxLab", "url": "https://zmaxlab.site" },
    "areaServed": { "@type": "Country", "name": "United States" },
    "audience": { "@type": "Audience", "audienceType": "NPI-registered healthcare practitioners" },
    "offers": [{
      "@type": "Offer",
      "name": "Custom healthcare website",
      "price": "500",
      "priceCurrency": "USD",
      "description": "Custom-coded healthcare website delivered in 7 business days. Domain, hosting setup, SEO foundation and source code included.",
      "availability": "https://schema.org/InStock",
    },
    ...MONTHLY.map(([title, price]) => ({
      "@type": "Offer",
      "name": title,
      "price": String(price).replace('$', ''),
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": String(price).replace('$', ''),
        "priceCurrency": "USD",
        "billingIncrement": 1,
        "unitCode": "MON",
      },
    }))],
  }]

  useSEO({
    schema: serviceSchema,
    title: 'Services & Pricing | $500 Healthcare Website Design - ZmaxLab',
    description: 'A $500 custom healthcare website in 7 days. Add local SEO, social, reputation or reporting separately - no bundles, no contracts.',
    canonical: 'https://zmaxlab.site/services',
  })

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'clamp(96px,11vw,140px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <Shell wide>
          <div className="zx-hero" style={{ alignItems: 'center' }}>
          <motion.div {...rise()} style={{ maxWidth: 640 }}>
            <Pill>Everything digital, one partner</Pill>
            <Display style={{ marginBottom: 26 }}>
              One partner for your entire <Grad>digital presence</Grad>.
            </Display>
            <Lead style={{ maxWidth: 580, marginBottom: 34 }}>
              Domain, hosting, website, SEO, reviews, booking. Start with the $500 build,
              live in seven business days, then add only what you actually need - month to
              month, cancel whenever.
            </Lead>
            <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn to={CALENDLY_URL}>Book a free demo <ArrowRight size={17} /></Btn>
              <TextLink to="/how-it-works">See the 7-day process</TextLink>
            </div>
          </motion.div>
          <motion.div className="zx-hero-media zx-lift" {...rise(0.1)} style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/5', maxHeight: 540, boxShadow: '0 24px 64px rgba(7,37,58,0.18)' }}>
            <div style={{ width: '100%', height: '100%', background: T.gradPanelDeep, padding: 'clamp(26px,3vw,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Mono style={{ color: T.primaryBright, textTransform: 'uppercase', letterSpacing: '0.16em', display: 'block', marginBottom: 22, fontWeight: 600 }}>
                We handle
              </Mono>
              {[['Domain', 'Researched, bought, configured'], ['Hosting', 'Set up, secured, monitored'], ['Website', 'Custom-coded in 7 days'], ['Visibility', 'SEO, reviews, directories']].map(([k, v], i) => (
                <div key={k} style={{ padding: '15px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.onDarkLine}` }}>
                  <div style={{ fontSize: 19, fontWeight: 750, color: T.onDark, letterSpacing: '-0.02em' }}>{k}</div>
                  <div style={{ fontSize: 13.5, color: T.onDarkMuted, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </motion.div>
          </div>
        </Shell>
      </section>


      {/* CORE BUILD */}
      <Section tint>
        <Shell>
          <div className="zx-sticky">
            <motion.div {...rise()} className="zx-sticky-col">
              <Eyebrow>The core build</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 26, fontWeight: 700, marginTop: 10 }}>$</span>
                <span style={{ fontSize: 'clamp(64px,8vw,110px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.85 }}>500</span>
              </div>
              <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 26 }}>
                One payment · No contract
              </Mono>
              <Lead style={{ maxWidth: 340, marginBottom: 28 }}>
                Half up front, half on launch. Not live in seven business days and you are refunded.
              </Lead>
              <Btn to={CALENDLY_URL}>Start your build <ArrowRight size={17} /></Btn>
              <div className="zx-lift zx-zoom" style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '4/3', marginTop: 30, boxShadow: '0 18px 46px rgba(7,37,58,0.14)' }}>
                <img src="/img/stethoscope-wall.jpg" alt="Stethoscope" loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />
              </div>
              <div style={{ borderRadius: 18, marginTop: 18, padding: 26, background: T.gradPanel }}>
                <Mono style={{ color: T.primaryDeep, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 14, fontWeight: 600 }}>
                  Versus the market
                </Mono>
                {[['Agency', '$3k-$10k'], ['Closest rival', '$1,097.50'], ['ZmaxLab', '$500 once']].map(([k, v], i) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(7,37,58,0.12)' }}>
                    <span style={{ fontSize: 14, color: i === 2 ? T.text : T.muted, fontWeight: i === 2 ? 700 : 400 }}>{k}</span>
                    <span style={{ fontFamily: MONO, fontSize: 13.5, color: i === 2 ? T.primaryDeep : T.faint, fontWeight: i === 2 ? 700 : 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div>
              <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 20 }}>
                Included as standard
              </Mono>
              {CORE.map((c, i) => (
                <motion.div key={c} {...rise(i * 0.03)} className="zx-row" style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '15px 12px 15px 0',
                  borderTop: i === 0 ? `1px solid ${T.hairlineStrong}` : 'none',
                  borderBottom: `1px solid ${T.hairline}`,
                }}>
                  <Check size={15} style={{ color: T.emerald, flexShrink: 0 }} />
                  <span style={{ fontSize: 15.5, lineHeight: 1.5 }}>{c}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Shell>
      </Section>

      {/* MONTHLY - numbered rows, not cards */}
      <Section>
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(38px,5vw,60px)', maxWidth: 620 }}>
            <Eyebrow>Ongoing, if you want it</Eyebrow>
            <H2 style={{ marginBottom: 18 }}>Ongoing care, <Grad>priced separately</Grad>.</H2>
            <Lead>Nothing is bundled and nothing is required. Add one, add none, cancel any month.</Lead>
          </motion.div>

          <div className="zx-svc-grid">
            {MONTHLY.map(([title, price, desc, perks], i) => (
              <motion.article key={title} {...rise(i * 0.06)} className="zx-svc-card">
                <span className="zx-svc-num">{`0${i + 1}`}</span>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
                  <h3 style={{ fontSize: 'clamp(20px,2.1vw,26px)', fontWeight: 600, letterSpacing: '-0.015em', margin: 0 }}>{title}</h3>
                  <span style={{
                    display: 'inline-flex', alignItems: 'baseline', gap: 3, flexShrink: 0,
                    background: T.primaryTint, color: T.primaryDeep,
                    padding: '8px 13px', borderRadius: 999, whiteSpace: 'nowrap',
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>{price}</span>
                    <span style={{ fontSize: 11, opacity: 0.72 }}>/mo</span>
                  </span>
                </div>

                <p style={{ fontSize: 15, lineHeight: 1.65, color: T.muted, margin: '0 0 20px' }}>{desc}</p>

                <div style={{ borderTop: `1px solid ${T.hairline}`, paddingTop: 16 }}>
                  {perks.map(pk => (
                    <div key={pk} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '6px 0' }}>
                      <Check size={14} style={{ color: T.primary, flexShrink: 0, marginTop: 3 }} />
                      <span style={{ fontSize: 14, lineHeight: 1.55, color: T.muted }}>{pk}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

        </Shell>
      </Section>

      {/* ONE-TIME */}
      <Section tint>
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(34px,4vw,52px)', maxWidth: 600 }}>
            <Eyebrow>One-time add-ons</Eyebrow>
            <H2>Set up once, working from then on.</H2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '0 clamp(24px,4vw,56px)' }}>
            {ONETIME.map(([title, price, desc], i) => (
              <motion.div key={title} {...rise(i * 0.05)} style={{
                padding: '26px 0', borderTop: `1px solid ${T.hairlineStrong}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
                  <h3 style={{ fontSize: 17.5, fontWeight: 750, letterSpacing: '-0.02em', margin: 0 }}>{title}</h3>
                  <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: T.gold }}>{price}</span>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: T.muted, margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </Shell>
      </Section>

      {/* CTA */}
      <Section dark pad="clamp(76px,9vw,120px)" padBottom="clamp(34px,4vw,48px)">
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 720 }}>
            <Eyebrow dark>Next step</Eyebrow>
            <H2 style={{ color: T.onDark, marginBottom: 22 }}>Not sure what you actually need?</H2>
            <Lead dark style={{ maxWidth: 520, marginBottom: 34 }}>
              Book the call. I will tell you what is worth doing and what is not - including
              when the answer is that you only need the website.
            </Lead>
            <Btn to={CALENDLY_URL} dark>Book a free demo <ArrowRight size={17} /></Btn>
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
