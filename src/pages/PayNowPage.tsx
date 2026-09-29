import { useEffect, useRef } from 'react'
import { ShieldCheck, Lock, Globe } from 'lucide-react'
import { T } from '@/lib/theme'
import { useSEO } from '@/lib/useSEO'
import { Shell, Section, Pill, Display, Lead, TextLink, rise, motion } from '@/components/ui/kit'

// Created via Razorpay Dashboard > Payment Button > Custom Button, with a
// customer-entered "Amount to pay" field (no fixed price) plus email/phone
// capture. This account is in Test Mode pending Razorpay's approval, so no
// real charge goes through until Ravi switches the account (and this button
// id, if Razorpay issues a new one) to Live mode.
const RAZORPAY_BUTTON_ID = 'pl_TdYdvfJ79joWQw'

const TRUST = [
  [ShieldCheck, 'Secured by Razorpay', 'PCI-DSS compliant. Your card details never touch ZmaxLab.'],
  [Lock, 'Encrypted end to end', '256-bit encryption on every transaction.'],
  [Globe, 'International cards accepted', 'Pay from anywhere - USD and major currencies.'],
]

export default function PayNowPage() {
  const formHost = useRef<HTMLDivElement>(null)

  useSEO({
    title: 'Pay Now | Secure Online Payment - ZmaxLab',
    description: 'Pay your ZmaxLab invoice or deposit securely online. Processed by Razorpay, international cards accepted.',
    canonical: 'https://zmaxlab.site/pay-now',
    noindex: true,
  })

  useEffect(() => {
    const host = formHost.current
    if (!host) return
    const form = document.createElement('form')
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js'
    script.async = true
    script.dataset.payment_button_id = RAZORPAY_BUTTON_ID
    form.appendChild(script)
    host.appendChild(form)
    return () => { host.replaceChildren() }
  }, [])

  return (
    <>
      <section style={{ paddingTop: 'clamp(120px,14vw,180px)', paddingBottom: 'clamp(48px,6vw,72px)' }}>
        <Shell>
          <motion.div {...rise()} style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <Pill>Secure payment</Pill>
            <Display style={{ marginBottom: 20 }}>Pay your invoice.</Display>
            <Lead style={{ maxWidth: 460, margin: '0 auto' }}>
              Enter the amount from your invoice - your deposit, final payment, or a monthly
              service - and pay by card. Nothing else on this page to fill in.
            </Lead>
          </motion.div>
        </Shell>
      </section>

      <Section pad="0" padBottom="clamp(24px,3vw,36px)">
        <Shell>
          <motion.div {...rise(0.08)} style={{
            maxWidth: 420, margin: '0 auto', background: T.surface,
            border: `1px solid ${T.hairline}`, borderRadius: 20,
            padding: 'clamp(28px,4vw,40px)', textAlign: 'center',
          }}>
            <div ref={formHost} />
          </motion.div>
        </Shell>
      </Section>

      <Section pad="0" padBottom="clamp(64px,8vw,96px)">
        <Shell>
          <div style={{ maxWidth: 420, margin: '0 auto 34px', textAlign: 'center' }}>
            <span style={{ fontSize: 13.5, color: T.faint }}>
              Wrong amount, or a question about your invoice? <TextLink to="/contact">Contact Ravi</TextLink>
            </span>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 18,
            maxWidth: 760, margin: '0 auto',
          }}>
            {TRUST.map(([Icon, t, b], i) => {
              const I = Icon as typeof ShieldCheck
              return (
                <motion.div key={t as string} {...rise(i * 0.06)} style={{ textAlign: 'center', padding: '0 8px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40, borderRadius: 12, background: T.primaryTint, marginBottom: 12,
                  }}>
                    <I size={18} style={{ color: T.primaryDeep }} />
                  </span>
                  <div style={{ fontSize: 14.5, fontWeight: 650, marginBottom: 4 }}>{t as string}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.55, color: T.muted }}>{b as string}</div>
                </motion.div>
              )
            })}
          </div>
        </Shell>
      </Section>
    </>
  )
}
