import { useState } from 'react'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { T, MONO , CALENDLY_URL } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, Eyebrow, Display, H2, Lead, Mono, Btn, TextLink, Grad, Pill, rise, motion } from '@/components/ui/kit'

const STEPS: [string, string, string, string[]][] = [
  ['Day 1', 'Discovery call', 'Thirty minutes on a call. Your specialty, your patients, your market, and what your competitors are doing.',
    ['Specialty and services mapped', 'Local competitor scan', 'Design direction agreed', 'Nothing to prepare in advance']],
  ['Day 1', 'You send your content', 'A short form - name, specialty, services, location, credentials. Fifteen minutes of your time.',
    ['One simple form', 'Photos optional - I source them if needed', 'Your NPI number and licence', 'That is the whole ask']],
  ['Days 2-4', 'Design and build', 'You approve the design before any code is written. Then it gets hand-coded, page by page.',
    ['Full mockup for your approval', 'Changes requested at mockup stage', 'Hand-coded, no templates', 'Copywriting included']],
  ['Day 5', 'SEO foundation', 'Technical structure done properly at build time, not sold back to you as an add-on later.',
    ['Meta structure and schema markup', 'Sitemap generated and submitted', 'Google Search Console verified', 'Analytics 4 configured']],
  ['Days 6-7', 'Launch and handover', 'Live on your domain with SSL, and every source file handed over to you.',
    ['Live on your domain with SSL', 'Hosting connected', 'Full source code delivered', 'One free revision included']],
]

const FAQS: [string, string][] = [
  ['What do I need to provide?', 'Your name, practice name, specialty, services list, location, phone number, and any photos you have. I handle design, copywriting, code and launch.'],
  ["What if I don't have photos?", 'Not a problem. I source professional healthcare photography that matches your specialty and location, at no extra cost.'],
  ['How does payment work?', '50% ($250) to start, 50% ($250) on launch day once you have approved the live site. Monthly services are billed monthly from signup.'],
  ['Can I make changes after launch?', 'Yes - one free revision is included. Further edits are $50/hour, or unlimited small updates under the $200/month support plan.'],
  ['How do I connect my domain?', 'If you already have one, I walk you through the DNS change - about five minutes. If not, I will recommend where to buy one and set it up for you.'],
  ['What hosting do I need?', 'Any basic shared hosting works - roughly $3-6/month. The site is static, so it runs fast even on the cheapest plans. I will help you choose and configure it.'],
  ['What if I want design changes?', 'You review the full mockup before coding starts. Colours, layout, content - request changes then. Once approved, we build.'],
]

function Faq({ q, a, n }: { q: string; a: string; n: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${T.hairline}` }}>
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} style={{
        width: '100%', display: 'grid', gridTemplateColumns: '44px 1fr 28px', gap: 16,
        alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer',
        padding: '24px 0', textAlign: 'left', color: T.text,
      }}>
        <span style={{ fontFamily: MONO, fontSize: 12, color: T.faint }}>{`0${n}`}</span>
        <span style={{ fontSize: 'clamp(16px,1.7vw,19px)', fontWeight: 700, letterSpacing: '-0.02em' }}>{q}</span>
        <span style={{ color: T.faint, display: 'flex', justifyContent: 'flex-end' }}>
          {open ? <Minus size={17} /> : <Plus size={17} />}
        </span>
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
        <p style={{ margin: '0 0 26px', paddingLeft: 60, paddingRight: 40, fontSize: 15.5, lineHeight: 1.7, color: T.muted, maxWidth: 720 }}>{a}</p>
      </motion.div>
    </div>
  )
}

export default function HowItWorksPage() {
  const faqSchema = [{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  }, {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How a ZmaxLab healthcare website is built in 7 days",
    "totalTime": "P7D",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "500" },
    "step": STEPS.map(([day, title, body], i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": title,
      "text": `${day}: ${body}`,
    })),
  }]

  useSEO({
    schema: faqSchema,
    title: 'How It Works | Healthcare Website Built in 7 Days - ZmaxLab',
    description: 'From discovery call to live website in seven business days. See exactly what happens each day, what you provide, and how payment works.',
    canonical: 'https://zmaxlab.site/how-it-works',
  })

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'clamp(120px,14vw,180px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 840 }}>
            <Pill>The 7-day process</Pill>
            <Display style={{ marginBottom: 22 }}>
              Seven business days, <Grad>start to live</Grad>.
            </Display>
            <Lead style={{ maxWidth: 540, marginBottom: 34 }}>
              Seven business days, mapped out day by day so you know exactly what happens
              and exactly what is needed from you. Which is very little.
            </Lead>
            <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn to={CALENDLY_URL}>Book a free demo <ArrowRight size={17} /></Btn>
              <TextLink to="/services">What's included</TextLink>
            </div>
          </motion.div>
        </Shell>
      </section>

      {/* TIMELINE */}
      <Section tint pad="clamp(48px,6vw,80px)">
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(32px,4vw,52px)' }}>
            <Eyebrow>Day by day</Eyebrow>
            <H2 style={{ maxWidth: 560 }}>What actually happens, and when.</H2>
          </motion.div>

          <div className="zx-tl">
            {STEPS.map(([day, title, body, bullets], i) => (
              <motion.div key={title} {...rise(i * 0.06)} className="zx-tl-item">
                <div className="zx-tl-rail">
                  <span className="zx-tl-dot">{`0${i + 1}`}</span>
                  {i < STEPS.length - 1 && <span className="zx-tl-line" />}
                </div>

                <div className="zx-tl-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{
                      background: T.primaryTint, color: T.primaryDeep,
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
                      padding: '5px 11px', borderRadius: 999,
                    }}>{day}</span>
                    <h3 style={{ fontSize: 'clamp(19px,2vw,24px)', fontWeight: 600, letterSpacing: '-0.015em', margin: 0 }}>{title}</h3>
                  </div>

                  <p style={{ fontSize: 15, lineHeight: 1.65, color: T.muted, margin: '0 0 16px', maxWidth: 560 }}>{body}</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: '6px 20px', borderTop: `1px solid ${T.hairline}`, paddingTop: 14 }}>
                    {bullets.map(b => (
                      <div key={b} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.primaryBright, flexShrink: 0, marginTop: 8 }} />
                        <span style={{ fontSize: 14, lineHeight: 1.55, color: T.muted }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </Shell>
      </Section>

      {/* full-bleed video band */}
      <section style={{ background: T.gradPanelDeep, padding: 'clamp(48px,6vw,76px) 0' }}>
        <Shell>
          <motion.div {...rise()} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 'clamp(24px,4vw,56px)', flexWrap: 'wrap',
          }}>
            <H2 style={{ color: T.onDark, maxWidth: 560, margin: 0 }}>
              One week of focused work, not a quarter of meetings.
            </H2>
            <div style={{ display: 'flex', gap: 'clamp(22px,3vw,46px)' }}>
              {[['7', 'business days'], ['$500', 'flat, once'], ['1', 'person throughout']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 600, color: T.primaryBright, lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</div>
                  <Mono style={{ color: T.onDarkFaint, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginTop: 7, fontSize: 10.5 }}>{l}</Mono>
                </div>
              ))}
            </div>
          </motion.div>
        </Shell>
      </section>

      {/* FAQ */}
      <Section>
        <Shell>
          <div className="zx-sticky">
            <motion.div {...rise()} className="zx-sticky-col">
              <Eyebrow>Questions</Eyebrow>
              <H2 style={{ marginBottom: 20 }}>The things people ask before booking.</H2>
              <Lead style={{ maxWidth: 320, marginBottom: 26 }}>
                If yours is not here, ask it on the call - there is no obligation attached.
              </Lead>
              <TextLink to="/contact">Ask a question</TextLink>
              <div style={{ borderRadius: 18, marginTop: 30, padding: 26, background: T.gradPanel }}>
                <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: T.primaryDeep, lineHeight: 1 }}>7 days</div>
                <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginTop: 8 }}>
                  Or your money back
                </Mono>
              </div>
            </motion.div>
            <div>
              <div style={{ borderTop: `1px solid ${T.hairlineStrong}` }} />
              {FAQS.map(([q, a], i) => <Faq key={q} q={q} a={a} n={i + 1} />)}
            </div>
          </div>
        </Shell>
      </Section>

      {/* CTA */}
      <Section dark pad="clamp(76px,9vw,120px)" padBottom="clamp(34px,4vw,48px)">
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 700 }}>
            <Eyebrow dark>Ready when you are</Eyebrow>
            <H2 style={{ color: T.onDark, marginBottom: 22 }}>Day one starts with a thirty-minute call.</H2>
            <Lead dark style={{ maxWidth: 500, marginBottom: 34 }}>
              Nothing to prepare and nothing to sign. If it is not a fit, I will say so on the call.
            </Lead>
            <Btn to={CALENDLY_URL} dark>Book a free demo <ArrowRight size={17} /></Btn>
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
