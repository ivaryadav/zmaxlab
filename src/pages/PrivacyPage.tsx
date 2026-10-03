import Seo, { type SeoProps } from '@/components/Seo'
import { Link } from 'react-router-dom'
import { m as motion } from 'framer-motion'
import { Shield, Mail } from 'lucide-react'
import { isBooting } from '@/lib/boot'

const GS = { fontFamily: "'Space Grotesk',sans-serif" }
const fadeUp = (delay = 0) => ({ initial: isBooting() ? false as const : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay } })

// TODO(owner review): third-party list updated for Formspree, Google Ads, Meta Pixel and Microsoft Clarity.
// Please confirm this wording with your own legal review before relying on it.
export default function PrivacyPage() {
  const seo: SeoProps = {
    title: "Privacy Policy | ZmaxLab",
    description: "How ZmaxLab collects, uses and protects the information you share through this website, and the choices you have.",
    path: '/privacy',
  }

  const SECTIONS = [
    {
      title: '1. Information We Collect',
      body: `When you submit a form on zmaxlab.site, we collect only the information you voluntarily provide: your name, email address, specialty, practice name, US state, and any message you include. We do not collect any Protected Health Information (PHI) as defined under HIPAA. We do not store form submissions on our servers - submissions are processed via Formspree and delivered directly to our inbox.`
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
      body: `Our website uses the following third-party services: Google Analytics 4 (usage analytics), Google Ads and Meta Pixel (measuring which ads lead to enquiries), Microsoft Clarity (anonymised usage recordings and heatmaps), Formspree (form submission delivery) and Calendly (appointment scheduling). Fonts are hosted on our own server. Each of these services has its own privacy policy and data processing terms. We do not share your personal information with these services beyond what is necessary for their function.`
    },
    {
      title: '6. Data Retention',
      body: `Email enquiries are retained in our email inbox for up to 2 years for business purposes. You may request deletion of your data at any time through our contact page at zmaxlab.site/contact.`
    },
    {
      title: '7. Your Rights',
      body: `You have the right to request access to, correction of, or deletion of any personal information we hold about you. To exercise these rights, contact us at zmaxlab.site/contact. We will respond within 5 business days.`
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
      body: `For any privacy-related questions or requests, please contact: Ravi Kumar, ZmaxLab - zmaxlab.site/contact`
    }
  ]

  return (
    <div style={{ background: '#FFFFFF' }}>
      <Seo {...seo} />
      <section style={{ padding: 'clamp(120px,14vw,160px) 5% clamp(48px,6vw,72px)', background: `radial-gradient(ellipse at 30% 20%,rgba(29,78,216,0.06) 0%,transparent 60%),#FFFFFF` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div {...fadeUp()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Shield size={20} style={{ color: '#0E9F6E' }}/>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#0E9F6E' }}>Privacy Policy</span>
            </div>
            <h1 style={{ ...GS, fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 800, color: '#0B1220', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 16 }}>
              Your privacy matters.
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(11,18,32,0.55)', lineHeight: 1.75, marginBottom: 8 }}>
              Last updated: June 2026
            </p>
            <p style={{ fontSize: 15, color: 'rgba(11,18,32,0.6)', lineHeight: 1.75, maxWidth: 680 }}>
              This policy explains how ZmaxLab collects, uses, and protects information when you visit zmaxlab.site or submit an enquiry. We are committed to protecting your privacy and being transparent about our data practices.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,80px) 5% clamp(64px,8vw,96px)', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 36 }}>
          {SECTIONS.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.04)} style={{ background: '#F6F8FB', border: '1px solid rgba(11,18,32,0.09)', borderRadius: 16, padding: 'clamp(24px,3vw,32px)' }}>
              <h2 style={{ ...GS, fontSize: 17, fontWeight: 700, color: '#0B1220', marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 14, color: 'rgba(11,18,32,0.65)', lineHeight: 1.85 }}>{s.body}</p>
            </motion.div>
          ))}

          <motion.div {...fadeUp(0.1)} style={{ background: 'linear-gradient(135deg,rgba(29,78,216,0.05),rgba(14,159,110,0.05))', border: '1px solid rgba(29,78,216,0.18)', borderRadius: 16, padding: 'clamp(24px,3vw,32px)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <Mail size={20} style={{ color: '#0E9F6E', marginTop: 2, flexShrink: 0 }}/>
            <div>
              <div style={{ ...GS, fontSize: 15, fontWeight: 700, color: '#0B1220', marginBottom: 8 }}>Questions about this policy?</div>
              <p style={{ fontSize: 14, color: 'rgba(11,18,32,0.6)', lineHeight: 1.75, marginBottom: 12 }}>
                Send us a message through our contact page and we'll respond within 2 business days.
              </p>
              <Link to="/contact" style={{ ...GS, background: '#1D4ED8', color: '#fff', fontWeight: 700, fontSize: 13, padding: '9px 20px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
