import { useSEO } from '@/lib/useSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Mail } from 'lucide-react'

const GS = { fontFamily: "'Space Grotesk',sans-serif" }
const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay } })

export default function TermsPage() {
  useSEO({
    title: 'Terms of Service | ZmaxLab – Healthcare Website Design',
    description: 'Terms of Service for ZmaxLab — custom healthcare website design for NPI practitioners. $500 flat fee. 7-day delivery guarantee.',
    canonical: 'https://zmaxlab.site/terms',
  })

  const SECTIONS = [
    {
      title: '1. Services',
      body: `ZmaxLab (operated by Ravi Kumar) provides custom website design, local SEO, social media management, and related digital marketing services to NPI-registered healthcare practitioners in the United States. By engaging ZmaxLab, you agree to these Terms of Service.`
    },
    {
      title: '2. Website Package – $500 Flat Fee',
      body: `The $500 website package includes a custom, hand-coded website delivered within 7 business days of receiving all required content from the client. The package includes custom design, mobile responsiveness, SSL setup, SEO foundation (meta tags, schema markup, sitemap), online booking integration, contact form, Google Analytics setup, and 1 post-launch revision. The $500 fee covers a single website build. Revisions beyond the included revision are billed at $75/hour.`
    },
    {
      title: '3. 7-Day Guarantee',
      body: `If your website is not live within 7 business days of ZmaxLab receiving your completed content submission (via our onboarding form), you are entitled to a full refund. The 7-day clock starts when we confirm receipt of all required content. Delays caused by client content submission, revision requests, or domain/hosting configuration issues do not count toward the 7-day period.`
    },
    {
      title: '4. Payment Terms',
      body: `Payment is accepted via Stripe or PayPal. For the $500 website package, 50% is due upfront to begin work, and 50% is due upon completion and approval before the site goes live. Alternatively, the full $500 may be paid upfront. Monthly services (SEO, Social Media, etc.) are billed in advance on a monthly basis and may be cancelled at any time with 30 days’ notice. No refunds are issued for completed monthly service periods.`
    },
    {
      title: '5. Client Responsibilities',
      body: `You are responsible for providing accurate information about your practice, NPI credentials, services, and location. You confirm you hold all necessary licenses and NPI registration required to practice in your state. You are responsible for ensuring the content you provide does not infringe on any third-party intellectual property rights. You are responsible for maintaining your domain registration and hosting after delivery.`
    },
    {
      title: '6. Intellectual Property',
      body: `Upon full payment, you own the complete source code of your website. ZmaxLab retains no license to your website content after delivery. ZmaxLab may display your website as a portfolio example unless you explicitly request otherwise in writing. Stock images sourced by ZmaxLab are licensed for your use under the applicable stock photo license and must not be redistributed.`
    },
    {
      title: '7. HIPAA Disclaimer',
      body: `ZmaxLab is a website design service, not a covered entity or business associate under HIPAA. We do not collect, store, or process Protected Health Information (PHI) on behalf of your practice. Contact forms and booking widgets included in your website are designed to collect only general appointment requests — not clinical information. If your practice requires HIPAA Business Associate Agreements (BAA) for specific integrations, you are responsible for obtaining those directly from the relevant third-party services (e.g., SimplePractice, Jane, Calendly Healthcare).`
    },
    {
      title: '8. Limitation of Liability',
      body: `ZmaxLab is not liable for any indirect, incidental, or consequential damages arising from use of your website, including but not limited to lost revenue, loss of patients, or downtime. Our total liability is limited to the amount paid for the specific service in question. We are not responsible for issues caused by third-party services, hosting providers, or domain registrars.`
    },
    {
      title: '9. SEO and Rankings',
      body: `While ZmaxLab implements SEO best practices, we do not guarantee specific Google rankings or traffic outcomes. Search engine algorithms are outside our control and change frequently. SEO results referenced in testimonials or case studies represent past results for specific clients and are not guarantees of future performance.`
    },
    {
      title: '10. Termination',
      body: `Either party may terminate monthly services with 30 days’ written notice via email to ravi@zmaxlab.site. Upon termination, all work completed to date will be delivered to you. No refunds are issued for completed service periods.`
    },
    {
      title: '11. Governing Law',
      body: `These terms are governed by the laws applicable to the service provider’s jurisdiction. Any disputes will be resolved through good-faith negotiation first. If unresolved, disputes will be submitted to binding arbitration.`
    },
    {
      title: '12. Contact',
      body: `For questions about these terms, email ravi@zmaxlab.site. We respond within 2 business days.`
    }
  ]

  return (
    <div style={{ background: '#07091f' }}>
      <section style={{ padding: 'clamp(120px,14vw,160px) 5% clamp(48px,6vw,72px)', background: 'linear-gradient(155deg,#03051a,#07091f)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div {...fadeUp()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <FileText size={20} style={{ color: '#1b6fff' }}/>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#5b87ff' }}>Terms of Service</span>
            </div>
            <h1 style={{ ...GS, fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 16 }}>
              Terms of Service
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 8 }}>
              Last updated: June 2026
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 680 }}>
              These terms govern your use of ZmaxLab’s services. By placing an order or submitting a contact form, you agree to these terms. Please read them carefully.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,80px) 5% clamp(64px,8vw,96px)', background: '#07091f' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 36 }}>
          {SECTIONS.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.03)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 'clamp(24px,3vw,32px)' }}>
              <h2 style={{ ...GS, fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.85 }}>{s.body}</p>
            </motion.div>
          ))}

          <motion.div {...fadeUp(0.1)} style={{ background: 'linear-gradient(135deg,rgba(27,111,255,0.08),rgba(0,200,150,0.06))', border: '1px solid rgba(27,111,255,0.2)', borderRadius: 16, padding: 'clamp(24px,3vw,32px)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <Mail size={20} style={{ color: '#00c896', marginTop: 2, flexShrink: 0 }}/>
            <div>
              <div style={{ ...GS, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Questions about these terms?</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 12 }}>
                Email <a href="mailto:ravi@zmaxlab.site" style={{ color: '#00c896' }}>ravi@zmaxlab.site</a> and we’ll respond within 2 business days.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 13, padding: '9px 20px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                  Contact Us
                </Link>
                <Link to="/privacy" style={{ ...GS, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 13, padding: '9px 20px', borderRadius: 999, textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
