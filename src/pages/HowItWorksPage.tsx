import { useSEO } from '@/lib/useSEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, FileText, Palette, Code, Rocket, RefreshCw } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const GS = { fontFamily: "'Space Grotesk',sans-serif" }
const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay } })

const STEPS = [
  { icon: <MessageCircle size={24}/>, color: '#1b6fff', n: '01', title: 'Book a Free Demo Call', time: 'Day 0', desc: 'We jump on a 20-minute video call. I review your current online presence (or lack of one), ask about your specialty and patient base, and show you mockups of what your website will look like. Zero obligation. Zero pressure.', bullet: ['20-minute video call','I review your online presence','See mockup examples for your specialty','Get exact pricing, no hidden fees'] },
  { icon: <FileText size={24}/>, color: '#00c896', n: '02', title: 'Send Your Content', time: 'Day 1', desc: 'After you book, I send you a simple Google Form. Fill in your name, specialty, services, location, and upload any photos you have. No photos? No problem — I source professional healthcare stock images for you.', bullet: ['Simple Google Form (15 mins to complete)','Name, specialty, services, location','Photos optional – I source if needed','Your NPI number and credentials'] },
  { icon: <Palette size={24}/>, color: '#a78bfa', n: '03', title: 'Design Approval', time: 'Day 2–3', desc: 'I build a full design mockup and send it to you for approval via WhatsApp or email. You see the entire homepage layout before a single line of code is written. This is where you can request changes to colours, layout, or content.', bullet: ['Full homepage design mockup','Review via WhatsApp or email','Request changes before coding','Typical approval within 24 hours'] },
  { icon: <Code size={24}/>, color: '#fbbf24', n: '04', title: 'Build & Code', time: 'Day 3–5', desc: 'Once approved, I hand-code your entire website. No WordPress. No page builders. Clean, semantic HTML/CSS that loads in under 1 second. Every page is built specifically for healthcare SEO and patient conversion.', bullet: ['Hand-coded HTML/CSS — no page builders','All pages built and linked','Booking integration configured','SEO meta tags, schema, sitemap added'] },
  { icon: <Rocket size={24}/>, color: '#34d399', n: '05', title: 'Launch & Deliver', time: 'Day 5–7', desc: 'Your website goes live on your domain with full SSL. I connect your hosting, set up redirects, verify Google Search Console, submit your sitemap, and hand over all source files. You own everything completely.', bullet: ['Live on your domain with SSL','Google Search Console verified','Sitemap submitted to Google','Full source code delivered to you'] },
  { icon: <RefreshCw size={24}/>, color: '#f472b6', n: '06', title: 'Post-Launch Support', time: 'After Launch', desc: 'One free revision is included after launch. I stay available via WhatsApp for 30 days post-launch to answer any questions. Optional monthly support and SEO plans available if you want ongoing help.', bullet: ['1 free post-launch revision','30-day WhatsApp support included','Optional monthly maintenance plans','SEO and social media add-ons available'] },
]

const FAQS = [
  { q: 'What do I need to provide?', a: 'Just your name, practice name, specialty, services list, location, phone number, and any photos you have. I handle everything else — design, copywriting, code, and launch.' },
  { q: 'What if I don\'t have photos?', a: 'No problem. I source professional healthcare stock photography that matches your specialty and location. It looks great and costs you nothing extra.' },
  { q: 'How does payment work?', a: '50% upfront ($250) to start the project, 50% ($250) on launch day after you approve the live site. For monthly services, first month is due at signup, then monthly billing.' },
  { q: 'Can I make changes after launch?', a: 'Yes — you get 1 free revision after launch. Additional edits are available at $50/hour or via the monthly support plan ($200/month) which includes unlimited small updates.' },
  { q: 'How do I connect my domain?', a: 'If you have a domain already, I\'ll walk you through updating your DNS (takes 5 minutes). If you don\'t have a domain, I\'ll recommend where to buy one and handle the setup.' },
  { q: 'What hosting do I need?', a: 'Any basic shared hosting works — SiteGround, Hostinger, or Namecheap all cost $3–6/month. I\'ll help you choose and set it up. The website is static HTML so it runs on the cheapest plans.' },
  { q: 'What if I want changes to the design?', a: 'You review the full design mockup before coding begins. You can request any changes at that stage — colors, layout, content. Once you approve, we move to build.' },
]

export default function HowItWorksPage() {
  useSEO({ title: 'How It Works | ZmaxLab – Website in 7 Days for NPI Practitioners', description: 'See how ZmaxLab builds your healthcare website in 7 days: free demo call, design approval, hand-coded build, and launch. 7-day guarantee.', canonical: 'https://zmaxlab.site/how-it-works' })
  return (
    <div style={{ background: '#07091f' }}>
      {/* HERO */}
      <section style={{ padding: 'clamp(120px,14vw,160px) 5% clamp(64px,8vw,96px)', background: 'linear-gradient(155deg,#03051a,#07091f)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 80% at 70% 40%,rgba(0,200,150,0.1) 0%,transparent 65%)' }}/>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div {...fadeUp()}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)', color: '#34d399', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, padding: '5px 14px', borderRadius: 999, marginBottom: 20 }}>
              Simple Process
            </span>
            <h1 style={{ ...GS, fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 18 }}>
              NPI number to live website.<br/>
              <span style={{ color: '#00c896' }}>In 7 days. Guaranteed.</span>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>
              A clear, transparent process from first call to live website. No surprises. No technical jargon.
            </p>
            <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 999, boxShadow: '0 4px 20px rgba(27,111,255,0.3)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Start the Process <ArrowRight size={15}/>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STEPS */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 5%', background: '#07091f' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {STEPS.map((s, i) => (
              <motion.div key={s.n} {...fadeUp(i * 0.08)} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 28, alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: s.color + '18', border: `2px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>{s.icon}</div>
                  {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 40, background: 'rgba(255,255,255,0.06)', marginTop: 12 }}/>}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 28, marginBottom: i < STEPS.length - 1 ? 0 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ ...GS, fontSize: 48, fontWeight: 900, color: s.color + '22', lineHeight: 1, letterSpacing: '-2px', marginBottom: 4 }}>{s.n}</div>
                      <h3 style={{ ...GS, fontSize: 20, fontWeight: 700, color: '#fff' }}>{s.title}</h3>
                    </div>
                    <span style={{ background: s.color + '15', border: `1px solid ${s.color}30`, color: s.color, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, whiteSpace: 'nowrap' as const }}>{s.time}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 20 }}>{s.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8 }}>
                    {s.bullet.map(b => (
                      <div key={b} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0 }}/>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: 'clamp(72px,9vw,112px) 5%', background: '#03051a' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#5b87ff', display: 'block', marginBottom: 12 }}>FAQ</span>
            <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>Process Questions</h2>
          </motion.div>
          <Accordion style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((faq, i) => (
              <motion.div key={faq.q} {...fadeUp(i * 0.06)}>
                <AccordionItem value={`fq${i}`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '0 20px', overflow: 'hidden' }}>
                  <AccordionTrigger style={{ ...GS, fontSize: 15, fontWeight: 600, color: '#fff', textAlign: 'left' }}>{faq.q}</AccordionTrigger>
                  <AccordionContent style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, paddingBottom: 16 }}>{faq.a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(72px,9vw,112px) 5%', background: '#07091f', textAlign: 'center' }}>
        <motion.div {...fadeUp()} style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ ...GS, fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: 14 }}>Ready to start?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 32, lineHeight: 1.75 }}>Book your free demo call today. I'll review your presence and show you what your website will look like — no commitment required.</p>
          <Link to="/contact" style={{ ...GS, background: 'linear-gradient(135deg,#1b6fff,#00c896)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 24px rgba(27,111,255,0.3)' }}>
            Book Free Demo <ArrowRight size={16}/>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
