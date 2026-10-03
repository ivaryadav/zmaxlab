import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Seo from '@/components/Seo'
import { Shell, Section, Display, Lead, Mono } from '@/components/ui/kit'
import { T } from '@/lib/theme'

const LINKS: [string, string][] = [
  ['/', 'Homepage'],
  ['/services', 'Services and pricing'],
  ['/clients', 'Client websites'],
  ['/contact', 'Contact ZmaxLab'],
]

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found | ZmaxLab" description="The page you were looking for does not exist or has moved." path="/404" noindex />
      <Section pad="clamp(150px,16vw,210px)" padBottom="clamp(80px,10vw,130px)">
        <Shell>
          <Mono style={{ color: T.faint, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 20 }}>Error 404</Mono>
          <Display style={{ marginBottom: 22 }}>This page does not exist.</Display>
          <Lead style={{ maxWidth: 520, marginBottom: 36 }}>
            The link may be out of date, or the address may have a typo. These pages will get you back on track.
          </Lead>
          <nav aria-label="Helpful links" style={{ display: 'grid', gap: 2, maxWidth: 420 }}>
            {LINKS.map(([to, label]) => (
              <Link key={to} to={to} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 0', borderBottom: `1px solid ${T.hairline}`, fontSize: 16, fontWeight: 550, color: T.text,
              }}>
                {label} <ArrowRight size={16} />
              </Link>
            ))}
          </nav>
        </Shell>
      </Section>
    </>
  )
}
