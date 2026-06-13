import { useSEO } from '@/lib/useSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Mail } from 'lucide-react'

const GS = { fontFamily: "'Space Grotesk',sans-serif" }
const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay } })

export default function PrivacyPage() {
  useSEO({
    title: 'Privacy Policy | ZmaxLab – Healthcare Website Design',
    description: 'Privacy Policy for ZmaxLab - custom healthcare website design for NPI practitioners. How we collect, use, and protect your information.',
    canonical: 'https://zmaxlab.site/privacy',
  })

  const SECTIONS = [
    {
      title: '1. Information We Collect',
      body: `When you submit a form on zmaxlab.site, we collect only the information you voluntarily provide: your name, email address, specialty, practice name, US state, and any message you include. We do not collect any Protected Health Information (PHI) as defined under HIPAA. We do not store form submissions on our servers - submissions are processed via Web3Forms and delivered directly to ravi@zmaxlab.site.`
    },
    {
      title: '2. How We Use Your Information',
      body: `Information you submit is used solely to respond to your enquiry, send you a personalised website demo, and communicate about your website project. We do not sell, rent, or share your information with any third parties for marketing purposes.`
    },
    {
      title: '3. Cookies and Analytics',
      body: `We use Google Analytics 4 (GA4) to understand how visitors use our website. GA4 collects anonymised usage data such as pages visited, time spent, and general location (city/region level). No personally identifiable information is shared with Google Analytics. We use Google Consent Mode v2 defaults and do not use any advertising or remarketing cookies.`
    },
    {
      title: '4. HIPAA Notice',
      body: `ZmaxLab is a website design and digital marketing agency, not a covered entity under HIPAA. Our contact forms and website do not collect, transmit, or store any Protected Health Information (PHI). If you are discussing a website project that involves patient-facing booking or intake forms, we recommend using HIPAA-eligible platforms such as SimplePractice, Jane App, or Healthie for any PHI collection. We design your website to integrate with these platforms rather than collecting PHI directly.`
    },
    {
      title: '5. Third-Party Services',
      body: `Our website uses the following third-party services: Google Analytics 4 (anonymised usage analytics), Web3Forms (form submission delivery), Calendly (appointment scheduling), Google Fonts (Space Grotesk typeface). Each of these services has its own privacy policy and data processing terms. We do not share your personal information with these services beyond what is necessary for their function.`
    },
    {
      title: '6. Data Retention',
      body: `Email enquiries are retained in our email inbox for up to 2 years for business purposes. You may request deletion of your data at any time by emailing ravi@zmaxlab.site.`
    },
    {
      title: '7. Your Rights',
      body: `You have the right to request access to, correction of, or deletion of any personal information we hold about you. To exercise these rights, email ravi@zmaxlab.site. We will respond within 5 business days.`
    },
    {
      title: '8. Security',
      body: `zmaxlab.site is served exclusively over HTTPS with a valid SSL certificate. Form submissions are transmitted over encrypted connections. We take reasonable measures to protect your information but cannot guarantee absolute security of any data transmitted over the internet.`
    },
    {
      title: '9. Changes to This Policy',
      body: `We may update this Privacy Policy from time to time. The latest version will always be available at zmaxlab.site/privacy. Continued use of the site after changes constitutes acceptance of the updated policy.`
    },
    {
      title: '10. Contact',
      body: `For any privacy-related questions or requests, please contact: Ravi Kumar, ZmaxLab - ravi@zmaxlab.site`
    }
  ]

  return (
    <div style={{ background: '#07091f' }}>
      <section style={{ padding: 'clamp(120px,14vw,160px) 5% clamp(48px,6vw,72px)', background: 'linear-gradient(155deg,#03051a,#07091f)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div {...fadeUp()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Shield size={20} style={{ color: '#00c896' }}/>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#34d399' }}>Privacy Policy</span>
            </div>
            <h1 style={{ ...GS, fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 16 }}>
              Your privacy matters.
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 8 }}>
              Last updated: June 2026
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 680 }}>
              This policy explains how ZmaxLab collects, uses, and protects information when you visit zmaxlab.site or submit an enquiry. We are committed to protecting your privacy and being transparent about our data practices.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,80px) 5% clamp(64px,8vw,96px)', background: '#07091f' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 36 }}>
          {SECTIONS.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.04)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 'clamp(24px,3vw,32px)' }}>
              <h2 style={{ ...GS, fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.85 }}>{s.body}</p>
            </motion.div>
          ))}

          <motion.div {...fadeUp(0.1)} style={{ background: 'linear-gradient(135deg,rgba(27,111,255,0.08),rgba(0,200,150,0.06))', border: '1px solid rgba(27,111,255,0.2)', borderRadius: 16, padding: 'clamp(24px,3vw,32px)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <Mail size={20} style={{ color: '#00c896', marginTop: 2, flexShrink: 0 }}/>
            <div>
              <div style={{ ...GS, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Questions about this policy?</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 12 }}>
                Email us at <a href="mailto:ravi@zmaxlab.site" style={{ color: '#00c896' }}>ravi@zmaxlab.site</a> and we'll respond within 2 business days.
              </p>
              <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 13, padding: '9px 20px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
