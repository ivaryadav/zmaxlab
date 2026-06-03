import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#03051a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 5% 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
              <img src="/logo.svg" alt="ZmaxLab" style={{ display: 'block', height: 34, width: 'auto' }}/>
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: 18 }}>
              Custom websites for NPI-registered healthcare practitioners in the USA. $500 flat. Built personally by Ravi.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { href: 'https://www.instagram.com/', label: 'Instagram', path: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></> },
                { href: 'https://www.facebook.com/profile.php?id=61590168938676', label: 'Facebook', path: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/> },
                { href: 'https://www.linkedin.com/in/ivaryadav/', label: 'LinkedIn', path: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" fill="none"/></> },
                { href: 'https://twitter.com/zmaxlab', label: 'X / Twitter', path: <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} style={{
                  width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'rgba(255,255,255,0.5)', transition: '.2s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#34d399')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24">{s.path}</svg>
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Services', links: [['Healthcare Website – $500','/services'],['Local SEO – $230/mo','/services'],['Social Media – $150/mo','/services'],['Google Business Profile','/services'],['NPI Directory Listings','/services']] },
            { title: 'Specialties', links: [['Nurse Practitioners','/services'],['Physician Assistants','/services'],['Mental Health NPs','/services'],['Chiropractors','/services'],['All NPI Practitioners','/services']] },
            { title: 'Company', links: [['About Ravi','/about'],['How It Works','/how-it-works'],['Pricing','/services'],['Contact','/contact']] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', marginBottom: 14 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map(([label, to]) => (
                  <li key={label}><Link to={to} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', transition: '.2s' }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = '#34d399')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
                  >{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          <span>© 2026 ZmaxLab · Built by Ravi</span>
          <span><a href="mailto:ravi@zmaxlab.site" style={{ color: 'inherit' }}>ravi@zmaxlab.site</a> · <a href="tel:+919451100556" style={{ color: 'inherit' }}>+91 94511 00556</a></span>
        </div>
      </div>
    </footer>
  )
}
