import { useState } from 'react'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { T, MONO, TYPE } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, Eyebrow, Display, H2, Lead, Mono, Btn, TextLink, rise, motion } from '@/components/ui/kit'

const STEPS: [string, string, string, string[]][] = [
  ['Day 1', 'Discovery call', 'Thirty minutes on a call. Your specialty, your patients, your market, and what your competitors are doing.',
    ['Specialty and services mapped', 'Local competitor scan', 'Design direction agreed', 'Nothing to prepare in advance']],
  ['Day 1', 'You send your content', 'A short form — name, specialty, services, location, credentials. Fifteen minutes of your time.',
    ['One simple form', 'Photos optional — I source them if needed', 'Your NPI number and licence', 'That is the whole ask']],
  ['Days 2–4', 'Design and build', 'You approve the design before any code is written. Then it gets hand-coded, page by page.',
    ['Full mockup for your approval', 'Changes requested at mockup stage', 'Hand-coded, no templates', 'Copywriting included']],
  ['Day 5', 'SEO foundation', 'Technical structure done properly at build time, not sold back to you as an add-on later.',
    ['Meta structure and schema markup', 'Sitemap generated and submitted', 'Google Search Console verified', 'Analytics 4 configured']],
  ['Days 6–7', 'Launch and handover', 'Live on your domain with SSL, and every source file handed over to you.',
    ['Live on your domain with SSL', 'Hosting connected', 'Full source code delivered', 'One free revision included']],
]

const FAQS: [string, string][] = [
  ['What do I need to provide?', 'Your name, practice name, specialty, services list, location, phone number, and any photos you have. I handle design, copywriting, code and launch.'],
  ["What if I don't have photos?", 'Not a problem. I source professional healthcare photography that matches your specialty and location, at no extra cost.'],
  ['How does payment work?', '50% ($250) to start, 50% ($250) on launch day once you have approved the live site. Monthly services are billed monthly from signup.'],
  ['Can I make changes after launch?', 'Yes — one free revision is included. Further edits are $50/hour, or unlimited small updates under the $200/month support plan.'],
  ['How do I connect my domain?', 'If you already have one, I walk you through the DNS change — about five minutes. If not, I will recommend where to buy one and set it up for you.'],
  ['What hosting do I need?', 'Any basic shared hosting works — roughly $3–6/month. The site is static, so it runs fast even on the cheapest plans. I will help you choose and configure it.'],
  ['What if I want design changes?', 'You review the full mockup before coding starts. Colours, layout, content — request changes then. Once approved, we build.'],
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
  useSEO({
    title: 'How It Works | Custom Healthcare Website in 7 Days – ZmaxLab',
    description: 'From discovery call to live website in seven business days. See exactly what happens each day, what you provide, and how payment works.',
    canonical: 'https://zmaxlab.site/how-it-works',
  })

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'clamp(120px,14vw,180px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 840 }}>
            <Eyebrow>The process</Eyebrow>
            <Display style={{ marginBottom: 26 }}>
              NPI number Monday.<br /><span style={{ color: T.blue }}>Live website</span> by the<br />following Tuesday.
            </Display>
            <Lead style={{ maxWidth: 540, marginBottom: 34 }}>
              Seven business days, mapped out day by day so you know exactly what happens
              and exactly what is needed from you. Which is very little.
            </Lead>
            <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn to="/contact">Book a free demo <ArrowRight size={17} /></Btn>
              <TextLink to="/services">What's included</TextLink>
            </div>
          </motion.div>
        </Shell>
      </section>

      {/* TIMELINE */}
      <Section tint pad="clamp(64px,8vw,110px)">
        <Shell>
          <motion.div {...rise()} style={{ marginBottom: 'clamp(32px,4vw,52px)' }}>
            <Eyebrow>Day by day</Eyebrow>
            <H2 style={{ maxWidth: 560 }}>What actually happens, and when.</H2>
          </motion.div>

          {STEPS.map(([day, title, body, bullets], i) => (
            <motion.div key={title} {...rise(i * 0.05)} style={{
              display: 'grid', gridTemplateColumns: 'clamp(90px,12vw,140px) 1fr',
              gap: 'clamp(16px,3vw,44px)', alignItems: 'start',
              padding: 'clamp(28px,3.5vw,44px) 0',
              borderTop: `1px solid ${i === 0 ? T.hairlineStrong : T.hairline}`,
            }} className="zx-tl-row">
              <Mono style={{ color: T.blue, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', paddingTop: 4 }}>{day}</Mono>
              <div className="zx-split" style={{ gap: 'clamp(20px,4vw,56px)' }}>
                <div>
                  <h3 style={{ fontSize: TYPE.h3, fontWeight: 750, letterSpacing: '-0.02em', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 15.5, lineHeight: 1.68, color: T.muted, margin: 0 }}>{body}</p>
                </div>
                <div>
                  {bullets.map(b => (
                    <div key={b} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', padding: '7px 0' }}>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: T.blue, flexShrink: 0, marginTop: 9 }} />
                      <span style={{ fontSize: 14.5, lineHeight: 1.6, color: T.muted }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: `1px solid ${T.hairline}` }} />
        </Shell>
      </Section>

      {/* FAQ */}
      <Section>
        <Shell>
          <div className="zx-sticky">
            <motion.div {...rise()} style={{ position: 'sticky', top: 120 }}>
              <Eyebrow>Questions</Eyebrow>
              <H2 style={{ marginBottom: 20 }}>The things people ask before booking.</H2>
              <Lead style={{ maxWidth: 320, marginBottom: 26 }}>
                If yours is not here, ask it on the call — there is no obligation attached.
              </Lead>
              <TextLink to="/contact">Ask a question</TextLink>
            </motion.div>
            <div>
              <div style={{ borderTop: `1px solid ${T.hairlineStrong}` }} />
              {FAQS.map(([q, a], i) => <Faq key={q} q={q} a={a} n={i + 1} />)}
            </div>
          </div>
        </Shell>
      </Section>

      {/* CTA */}
      <Section dark pad="clamp(76px,9vw,120px)">
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 700 }}>
            <Eyebrow dark>Ready when you are</Eyebrow>
            <H2 style={{ color: T.onDark, marginBottom: 22 }}>Day one starts with a thirty-minute call.</H2>
            <Lead dark style={{ maxWidth: 500, marginBottom: 34 }}>
              Nothing to prepare and nothing to sign. If it is not a fit, I will say so on the call.
            </Lead>
            <Btn to="/contact" dark>Book a free demo <ArrowRight size={17} /></Btn>
          </motion.div>
        </Shell>
      </Section>
    </>
  )
}
