import { ArrowRight, Bot, MessageSquareText, Calculator, CreditCard, Palette, FileText, Check } from 'lucide-react'
import { T, MONO, CALENDLY_URL } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, Eyebrow, Display, H2, Lead, Mono, Btn, TextLink, Grad, Pill, Panel, rise, motion } from '@/components/ui/kit'

const FEATURES: [typeof Bot, string, string, string][] = [
  [Bot, 'AI chat assistant', '$350', 'Trained on your own site - services, pricing, hours, insurance. Answers patients at 11pm the same way it would at 11am.'],
  [MessageSquareText, 'Automated reply handling', 'included', 'Missed a call or a DM? It gets an instant, on-brand reply instead of silence until Monday.'],
  [Calculator, 'Instant quote tool', '$150', "Visitors get a real number for their situation without waiting on a callback - and you get their details the moment they ask."],
  [CreditCard, 'Payment gateway setup', '$150', 'Deposits and invoices collected online - cards and more - wired straight into your site.'],
  [Palette, 'Logo design', '$150', "For practices that don't have a mark yet, or want one that actually looks intentional."],
  [FileText, 'Digital letterhead', '$75', 'A branded template for sending reports, referrals and paperwork digitally - looks like your practice, not a generic PDF.'],
]

const ONE_TIME_TOTAL = 350 + 150 + 150 + 150 + 75 // 875
const BUNDLE_PRICE = 650

const FAQS: [string, string][] = [
  ['Does this replace the $500 build?', "No - it sits on top of it. Add it to a new build, or bolt it onto a site you already have, ours or not."],
  ['Can I add this after my site is already live?', 'Yes. Most practices start with the core site and add this once they want the automation. Nothing to rebuild.'],
  ['How long does setup take?', "About a week after your build is live - the assistant needs your services, pricing and policies to answer accurately."],
  ['Do I need to know anything technical?', 'No. You approve the copy and pricing logic once, then it runs. Updates are on the monthly care plan.'],
  ['What happens to the leads it captures?', "They land in your inbox the moment someone hands over their details - same as this chat does for ZmaxLab."],
]

export default function AIAddonPage() {
  useSEO({
    title: 'AI Add-on | Chat Assistant, Auto-Reply & Payments - ZmaxLab',
    description: 'A chat assistant, automated replies, instant quotes, payment gateway setup, logo and digital letterhead - bundled as one AI Add-on for your practice website.',
    canonical: 'https://zmaxlab.site/ai-addon',
    schema: [{
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'AI website automation for healthcare practices',
      provider: { '@type': 'Organization', name: 'ZmaxLab', url: 'https://zmaxlab.site' },
      areaServed: { '@type': 'Country', name: 'United States' },
      offers: {
        '@type': 'Offer', name: 'AI Add-on bundle', price: String(BUNDLE_PRICE), priceCurrency: 'USD',
        description: 'AI chat assistant, automated reply handling, instant quote tool, payment gateway setup, logo design and digital letterhead.',
      },
    }],
  })

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'clamp(112px,13vw,164px)', paddingBottom: 'clamp(48px,6vw,72px)' }}>
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 720 }}>
            <Pill>The AI Add-on</Pill>
            <Display style={{ marginBottom: 22 }}>
              Your website, <Grad>working while you sleep</Grad>.
            </Display>
            <Lead style={{ maxWidth: 580, marginBottom: 30 }}>
              A chat assistant that answers patients instantly, replies that never miss a message,
              quotes that write themselves, and payments that collect themselves - bundled as one
              add-on for a new build or a site you already have.
            </Lead>
            <div style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn to={CALENDLY_URL}>Book a free demo <ArrowRight size={17} /></Btn>
              <TextLink to="/pricing">See the core $500 build</TextLink>
            </div>
          </motion.div>
        </Shell>
      </section>

      {/* FEATURES */}
      <Section tint>
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(32px,4vw,52px)', maxWidth: 620 }}>
            <Eyebrow>Everything in the bundle</Eyebrow>
            <H2>Six things a static website can't do on its own.</H2>
          </motion.div>

          <div className="zx-svc-grid">
            {FEATURES.map(([Icon, title, price, body], i) => (
              <motion.div key={title} {...rise(i * 0.05)} className="zx-svc-card" style={{ padding: '26px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 14 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 42, height: 42, borderRadius: 12, background: T.primaryTint, flexShrink: 0,
                  }}>
                    <Icon size={19} style={{ color: T.primaryDeep }} />
                  </span>
                  <span style={{
                    fontFamily: MONO, fontSize: 12.5, fontWeight: 700, whiteSpace: 'nowrap',
                    color: price === 'included' ? T.faint : T.gold,
                  }}>
                    {price === 'included' ? 'included' : `${price} one-time`}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 650, letterSpacing: '-0.015em', margin: '0 0 8px' }}>{title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.62, color: T.muted, margin: 0 }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </Shell>
      </Section>

      {/* PRICING */}
      <Section pad="clamp(48px,6vw,84px)">
        <Shell>
          <div className="zx-split" style={{ alignItems: 'center', gap: 'clamp(28px,4vw,64px)' }}>
            <motion.div {...rise()}>
              <Eyebrow>Priced as one bundle</Eyebrow>
              <H2 style={{ marginBottom: 18 }}>$650 for the whole thing, not $875 piece by piece.</H2>
              <Lead style={{ maxWidth: 460, marginBottom: 24 }}>
                Buy each piece alone and it adds up to ${ONE_TIME_TOTAL}. Bundled, it's $650 - a
                flat one-time setup, same honesty as the $500 build.
              </Lead>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <Btn to={CALENDLY_URL}>Add this to my build <ArrowRight size={17} /></Btn>
              </div>
            </motion.div>

            <motion.div {...rise(0.08)}>
              <Panel deep>
                <Mono style={{ color: T.primaryBright, textTransform: 'uppercase', letterSpacing: '0.16em', display: 'block', marginBottom: 18, fontWeight: 600 }}>
                  AI Add-on bundle
                </Mono>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: T.onDark }}>$</span>
                  <span style={{ fontSize: 'clamp(52px,6vw,72px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, color: T.onDark }}>650</span>
                </div>
                <div style={{ fontSize: 13, color: T.onDarkFaint, marginBottom: 22, textDecoration: 'line-through' }}>
                  ${ONE_TIME_TOTAL} bought separately
                </div>
                {FEATURES.map(([, title]) => (
                  <div key={title} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderTop: `1px solid ${T.onDarkLine}` }}>
                    <Check size={14} style={{ color: T.primaryBright, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: T.onDarkMuted }}>{title}</span>
                  </div>
                ))}
                <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${T.onDarkLine}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 13.5, color: T.onDarkMuted }}>Optional care plan</span>
                  <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: T.onDark }}>$120<span style={{ fontSize: 11, opacity: 0.7 }}>/mo</span></span>
                </div>
                <p style={{ fontSize: 12, color: T.onDarkFaint, marginTop: 8, lineHeight: 1.55 }}>
                  Hosting, monitoring, and monthly knowledge updates as your services or pricing change. Optional, cancel any month.
                </p>
              </Panel>
            </motion.div>
          </div>
        </Shell>
      </Section>

      {/* HOW IT FITS */}
      <section style={{ background: T.ink, color: T.onDark, padding: 'clamp(52px,6.5vw,88px) 0' }}>
        <Shell>
          <div className="zx-split" style={{ alignItems: 'center', gap: 'clamp(28px,5vw,72px)' }}>
            <motion.div {...rise()}>
              <Eyebrow dark>How it fits</Eyebrow>
              <H2 style={{ color: T.onDark, marginBottom: 18 }}>
                Bolt it onto a new build, or one you already have.
              </H2>
              <Lead dark style={{ maxWidth: 470 }}>
                Most practices add this once the core site is live and they've felt the gap - a
                question at midnight nobody answered, a quote request that went cold. It plugs
                into an existing ZmaxLab site in days, or into someone else's with a short
                integration call first.
              </Lead>
            </motion.div>
            <motion.div {...rise(0.1)}>
              {[
                ['Built on modern, reliable infrastructure', 'Fast, secure hosting for the assistant and automation - maintained, not left to rot.'],
                ['Every conversation that matters, captured', "Leads land in your inbox the moment a visitor hands over their details - nothing sits in a chat log unseen."],
                ['No lock-in beyond the setup', 'Cancel the monthly care plan anytime. The one-time setup is yours either way.'],
              ].map(([t, b], i) => (
                <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.onDarkLine}` }}>
                  <Check size={16} style={{ color: T.primaryBright, flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 650, color: T.onDark, marginBottom: 4 }}>{t}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: T.onDarkMuted }}>{b}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Shell>
      </section>

      {/* FAQ */}
      <Section tint pad="clamp(48px,6vw,84px)">
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 26, maxWidth: 600 }}>
            <H2>Questions people ask about the AI Add-on.</H2>
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
            <H2 style={{ color: T.onDark, marginBottom: 20 }}>See it running before you decide anything.</H2>
            <Lead dark style={{ maxWidth: 520, marginBottom: 32 }}>
              Twenty minutes. I'll show you the assistant answering real questions, not a slide deck.
            </Lead>
            <Btn to={CALENDLY_URL} dark>Book a free demo <ArrowRight size={17} /></Btn>
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
