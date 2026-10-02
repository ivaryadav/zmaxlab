import { ArrowRight, Check, Code2, Search, MousePointerClick, Megaphone, Magnet, TrendingUp, BarChart3, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { T, MONO, CALENDLY_URL } from '@/lib/theme'
import { Shell, Section, Eyebrow, H2, Lead, Btn, TextLink, Grad, rise, motion } from '@/components/ui/kit'

type Service = { icon: LucideIcon; title: string; tag: string; desc: string; perks: string[]; featured?: boolean }

export const GROWTH_SERVICES: Service[] = [
  { icon: Code2, title: 'Website Development', tag: '$500 flat', featured: true,
    desc: 'Custom-coded practice website, live in 7 business days. SEO foundation included, set up on a domain and hosting you own.',
    perks: ['Mobile-first, zero templates', 'Online booking built in', 'Full source code delivered'] },
  { icon: Search, title: 'SEO', tag: 'From $230/mo',
    desc: 'Rank when patients search your specialty and city - Google Maps 3-pack and organic results.',
    perks: ['Specialty + city keyword targeting', 'Google Business Profile optimisation', 'Monthly ranking report'] },
  { icon: MousePointerClick, title: 'Google Ads', tag: 'Custom plan',
    desc: 'Search campaigns that put you in front of patients the moment they look for care near them.',
    perks: ['Healthcare-compliant ad copy', 'Call & booking conversion tracking', 'Weekly bid & budget tuning'] },
  { icon: Megaphone, title: 'Meta Campaigns', tag: 'Custom plan',
    desc: 'Facebook & Instagram ads that build local awareness and fill your appointment calendar.',
    perks: ['Local audience targeting', 'Creative & copy produced for you', 'Privacy-safe tracking setup'] },
  { icon: Magnet, title: 'Lead Generation', tag: 'Custom plan',
    desc: 'Landing pages, forms and follow-up that turn clicks into booked patient calls.',
    perks: ['High-converting landing pages', 'Instant lead alerts', 'Follow-up SMS & email flows'] },
  { icon: TrendingUp, title: 'Demand Generation', tag: 'Custom plan',
    desc: 'Build steady interest in your practice so patients think of you before they need you.',
    perks: ['Educational content strategy', 'Retargeting campaigns', 'Referral & community programs'] },
  { icon: BarChart3, title: 'Digital Marketing', tag: 'Custom plan',
    desc: 'One plan across search, social, email and content - managed together, measured together.',
    perks: ['Multi-channel strategy', 'Social media management', 'Monthly performance review'] },
  { icon: Star, title: 'Reputation Management', tag: 'From $100/mo',
    desc: 'More recent 5-star reviews, faster responses, and alerts before a bad review hurts you.',
    perks: ['Automated review requests', 'Google & Healthgrades monitoring', 'Response templates'] },
]

/** Highlighted grid of growth services. `compact` hides the perk lists (used on the homepage). */
export default function GrowthServices({ compact = false, tint = false }: { compact?: boolean; tint?: boolean }) {
  return (
    <Section tint={tint}>
      <Shell>
        <motion.div {...rise()} style={{ marginBottom: 'clamp(34px,4.5vw,56px)', maxWidth: 680 }}>
          <Eyebrow>Everything your practice needs to grow</Eyebrow>
          <H2 style={{ marginBottom: 18 }}>Website, marketing & <Grad>patient growth</Grad>.</H2>
          <Lead>
            Start with the website, then add the channels that bring patients in - SEO, ads,
            lead generation and reputation, all run by one team.
          </Lead>
        </motion.div>

        <div className="zx-growth-grid">
          {GROWTH_SERVICES.map(({ icon: Icon, title, tag, desc, perks, featured }, i) => (
            <motion.article key={title} {...rise(i * 0.04)} className="zx-svc-card" style={{
              padding: compact ? 'clamp(20px,2.2vw,26px)' : undefined,
              ...(featured ? { background: T.gradPanel, borderColor: 'rgba(11,156,135,0.35)' } : {}),
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                <span style={{
                  width: 42, height: 42, borderRadius: 12, display: 'grid', placeItems: 'center',
                  background: featured ? T.primary : T.primaryTint, color: featured ? '#fff' : T.primaryDeep,
                }}>
                  <Icon size={20} />
                </span>
                <span style={{
                  fontFamily: MONO, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: featured ? T.primaryDeep : T.faint, whiteSpace: 'nowrap',
                }}>{tag}</span>
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.015em', margin: '0 0 8px' }}>{title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: T.muted, margin: 0 }}>{desc}</p>
              {!compact && (
                <div style={{ borderTop: `1px solid ${T.hairline}`, paddingTop: 12, marginTop: 16 }}>
                  {perks.map(pk => (
                    <div key={pk} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', padding: '4px 0' }}>
                      <Check size={14} style={{ color: T.primary, flexShrink: 0, marginTop: 3 }} />
                      <span style={{ fontSize: 13.5, lineHeight: 1.5, color: T.muted }}>{pk}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <motion.div {...rise(0.1)} style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap', marginTop: 'clamp(30px,4vw,44px)' }}>
          <Btn to={CALENDLY_URL}>Request a growth plan <ArrowRight size={17} /></Btn>
          {compact && <TextLink to="/services">See all services & pricing</TextLink>}
        </motion.div>
      </Shell>
    </Section>
  )
}
