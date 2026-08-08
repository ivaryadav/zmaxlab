import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { T, MONO } from '@/lib/theme'

const COLS: [string, [string, string][]][] = [
  ['Services', [
    ['Website design', '/services'],
    ['Local SEO', '/services'],
    ['Reputation management', '/services'],
    ['How it works', '/how-it-works'],
  ]],
  ['Company', [
    ['About Ravi', '/about'],
    ['Contact', '/contact'],
    ['Journal', '/blog/custom-vs-template-medical-website'],
  ]],
  ['Legal', [
    ['Privacy policy', '/privacy'],
    ['Terms of service', '/terms'],
  ]],
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: T.ink, color: T.onDark, paddingTop: 'clamp(64px,8vw,104px)', paddingBottom: 34 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>

        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(240px,1.3fr) repeat(3, minmax(120px,0.8fr))',
          gap: 'clamp(32px,4vw,56px)', paddingBottom: 'clamp(44px,6vw,72px)',
        }} className="zx-footer-grid">
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.035em', marginBottom: 16 }}>
              Zmax<span style={{ color: T.blue }}>Lab</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: T.onDarkMuted, maxWidth: 320, margin: 0 }}>
              Custom-coded websites for NPI-registered healthcare practitioners across the
              United States. Built personally by Ravi — $500 flat, live in seven days.
            </p>
            <a href="mailto:hello@zmaxlab.site" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 22,
              fontSize: 15, fontWeight: 600, color: T.onDark,
            }} className="zx-link-underline">
              hello@zmaxlab.site <ArrowUpRight size={15} />
            </a>
          </div>

          {COLS.map(([title, items]) => (
            <div key={title}>
              <div style={{
                fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: T.onDarkFaint, marginBottom: 18,
              }}>{title}</div>
              {items.map(([label, to]) => (
                <Link key={label} to={to} style={{
                  display: 'block', fontSize: 14.5, color: T.onDarkMuted,
                  padding: '7px 0', transition: 'color .3s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.onDark)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.onDarkMuted)}
                >{label}</Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: `1px solid ${T.onDarkLine}`, paddingTop: 26,
          display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.08em', color: T.onDarkFaint }}>
            © {year} ZmaxLab · All rights reserved
          </span>
          <span style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.08em', color: T.onDarkFaint }}>
            Serving NPI-registered practitioners nationwide
          </span>
        </div>
      </div>
    </footer>
  )
}
