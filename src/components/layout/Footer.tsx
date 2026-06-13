import { Link } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'

const T = { bg:'#04060f', border:'rgba(255,255,255,0.07)', blue:'#2563eb', violet:'#7c3aed', green:'#059669', text:'#f1f5f9', muted:'rgba(241,245,249,0.4)' }

const SOCIAL = [
  { href:'https://www.instagram.com/zmaxlab/', label:'Instagram', path:<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></> },
  { href:'https://www.facebook.com/profile.php?id=61590168938676', label:'Facebook', path:<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/> },
  { href:'https://www.linkedin.com/in/ivaryadav/', label:'LinkedIn', path:<><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" fill="none"/></> },
  { href:'https://twitter.com/zmaxlab', label:'X', path:<path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/> },
]

const COLS = [
  { title:'Services', links:[['Healthcare Website - $500','/services'],['Local SEO - $230/mo','/services'],['Social Media Marketing','/services'],['Reputation Management','/services'],['Performance Reporting','/services'],['Website Support','/services']] },
  { title:'Specialties', links:[['Nurse Practitioners (NP)','/services'],['Physician Assistants (PA-C)','/services'],['Mental Health Providers','/services'],['Chiropractors & Rehab','/services'],['Dentists & Orthodontists','/services'],['Multi-Specialty Groups','/services']] },
  { title:'Company', links:[['About Ravi','/about'],['How It Works','/how-it-works'],['Pricing','/services'],['Contact','/contact'],['Privacy Policy','/privacy'],['Terms of Service','/terms']] },
]

export default function Footer() {
  return (
    <footer style={{ background:T.bg, borderTop:`1px solid ${T.border}`, padding:'64px 5% 0' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>

        {/* Top CTA strip */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20,
          padding:'32px 40px', marginBottom:64,
          background:'rgba(255,255,255,0.03)',
          border:`1px solid ${T.border}`,
          borderRadius:20,
          backdropFilter:'blur(20px)',
        }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:T.text, marginBottom:4 }}>Ready to grow your practice?</div>
            <div style={{ fontSize:13, color:T.muted }}>$500 flat fee · 7-day delivery · All 50 US states</div>
          </div>
          <Link to="/contact" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:`linear-gradient(135deg,${T.blue},${T.violet})`,
            color:'#fff', fontWeight:700, fontSize:14,
            padding:'12px 24px', borderRadius:12,
            boxShadow:`0 6px 20px rgba(37,99,235,0.35)`,
            whiteSpace:'nowrap',
          }}>
            Book Free Demo <ArrowRight size={15}/>
          </Link>
        </div>

        {/* Main footer grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:40, marginBottom:48 }}>

          {/* Brand column */}
          <div style={{ gridColumn:'span 1' }}>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', marginBottom:16 }}>
              <img src="/logo.svg" alt="ZmaxLab" style={{ height:34, width:'auto' }}/>
            </Link>
            <p style={{ fontSize:13, color:T.muted, lineHeight:1.75, marginBottom:20 }}>
              Premium healthcare website design for NPI-registered practitioners across all 50 US states. $500 flat fee. Built personally by Ravi.
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  style={{
                    width:34, height:34, borderRadius:9,
                    background:'rgba(255,255,255,0.05)',
                    border:`1px solid ${T.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:T.muted, transition:'.2s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = T.green)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = T.muted)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24">{s.path}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize:11, fontWeight:800, letterSpacing:'1.5px', textTransform:'uppercase', color:T.text, marginBottom:16 }}>{col.title}</h4>
              <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:9 }}>
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} style={{ fontSize:13, color:T.muted, textDecoration:'none', transition:'.2s' }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = T.green)}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = T.muted)}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO keywords - hidden visually via tiny text */}
        <div style={{ borderTop:`1px solid rgba(255,255,255,0.04)`, paddingTop:20, marginBottom:20 }}>
          <p style={{ fontSize:11, color:'rgba(255,255,255,0.15)', lineHeight:1.9, maxWidth:1100 }}>
            ZmaxLab provides custom healthcare website design for NPI practitioners across all 50 US states including Texas, California, Florida, New York, Illinois, Pennsylvania, Ohio, Georgia, North Carolina, Michigan, New Jersey, Virginia, Washington, Arizona, Tennessee, Massachusetts, Indiana, Missouri, Maryland, Wisconsin, Colorado, Minnesota, South Carolina, Alabama, Louisiana, Kentucky, Oregon, Oklahoma, Connecticut, Utah, Iowa, Nevada, Arkansas, Mississippi, Kansas, New Mexico, Nebraska, Idaho, West Virginia, Hawaii, New Hampshire, Maine, Montana, Rhode Island, Delaware, South Dakota, North Dakota, Alaska, Vermont, and Wyoming. Specialties: nurse practitioners (NPs), family nurse practitioners (FNPs), psychiatric nurse practitioners, physician assistants (PA-C), mental health therapists, LCSW, chiropractors (DC), dentists, orthodontists, physical therapists (PT), occupational therapists (OT), speech-language pathologists. HIPAA-aware web design. Healthcare SEO. NPI directory listings.
          </p>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop:`1px solid ${T.border}`, paddingTop:20, paddingBottom:96,
          display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:10,
          fontSize:12, color:T.muted,
        }}>
          <span>© 2026 ZmaxLab · Built by Ravi · Serving NPI practitioners across the USA</span>
          <span style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
            <a href="mailto:ravi@zmaxlab.site" style={{ color:T.muted, display:'flex', alignItems:'center', gap:4, textDecoration:'none' }}>
              <Mail size={11}/> ravi@zmaxlab.site
            </a>
            <Link to="/privacy" style={{ color:T.muted, textDecoration:'none' }}>Privacy</Link>
            <Link to="/terms"   style={{ color:T.muted, textDecoration:'none' }}>Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
