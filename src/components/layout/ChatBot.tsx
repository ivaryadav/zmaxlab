import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ArrowRight, Sparkles, Check } from 'lucide-react'
import { T, MONO, EASE } from '@/lib/theme'
import { submitLead as sendLead } from '@/lib/leads'
import { openBooking } from '@/lib/booking'
import BeeBotIcon from './BeeBotIcon'
import { findAnswer, GREETING_TEXT, INITIAL_CHIPS, QUOTE_TRIGGER_RE, type ChatLink } from '@/lib/chatKnowledge'


type QuoteSummary = { specialty: string; addonLabel: string; monthly: number | null }

type Msg = {
  id: string
  role: 'bot' | 'user'
  text?: string
  chips?: string[]
  link?: ChatLink
  cta?: boolean
  quote?: QuoteSummary
  leadContext?: Record<string, string>
}

type QuoteState = { step: 'idle' | 'specialty' | 'addon'; specialty?: string }

const QUOTE_SPECIALTIES = ['Nurse Practitioner', 'Physician Assistant', 'Chiropractor', 'Dentist', 'Mental Health', 'Other specialty']
const QUOTE_ADDONS: [string, number | null][] = [
  ['Local SEO', 230],
  ['Social Media', 150],
  ['Reputation management', 100],
  ['Just the $500 build', null],
]

const TEASER_KEY = 'zx_chat_teaser_seen'
const TEASER_DELAY_MS = 7000
const TEASER_AUTOHIDE_MS = 11000
const TEASER_EXCLUDED = ['/pay-now', '/privacy', '/terms', '/contact']
const NUDGE_AFTER = 4

let counter = 0
const uid = () => `m${Date.now()}_${counter++}`

const cardShadow = '0 24px 60px rgba(7,37,58,0.22)'
const SERIF = "'Newsreader',Georgia,serif"

export default function ChatBot() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [fabHover, setFabHover] = useState(false)
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false)
  const [teaserVisible, setTeaserVisible] = useState(false)
  const [teaserEligible, setTeaserEligible] = useState(() => {
    try { return !localStorage.getItem(TEASER_KEY) } catch { return true }
  })
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [quote, setQuote] = useState<QuoteState>({ step: 'idle' })

  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadSending, setLeadSending] = useState(false)
  const [leadSent, setLeadSent] = useState(false)

  const userMsgCount = useRef(0)
  const nudgedRef = useRef(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!teaserEligible || hasOpenedOnce || TEASER_EXCLUDED.includes(pathname)) return
    const show = setTimeout(() => setTeaserVisible(true), TEASER_DELAY_MS)
    return () => clearTimeout(show)
  }, [pathname, teaserEligible, hasOpenedOnce])

  useEffect(() => {
    if (!teaserVisible) return
    const hide = setTimeout(() => dismissTeaser(), TEASER_AUTOHIDE_MS)
    return () => clearTimeout(hide)
  }, [teaserVisible])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, typing, open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 340)
  }, [open])

  function dismissTeaser() {
    setTeaserVisible(false)
    setTeaserEligible(false)
    try { localStorage.setItem(TEASER_KEY, '1') } catch { /* private mode, ignore */ }
  }

  function openChat() {
    dismissTeaser()
    setOpen(true)
    if (!hasOpenedOnce) {
      setHasOpenedOnce(true)
      setMessages([{ id: uid(), role: 'bot', text: GREETING_TEXT, chips: INITIAL_CHIPS }])
    }
  }

  function toggleChat() {
    if (open) setOpen(false)
    else openChat()
  }

  function pushBotAfterDelay(build: () => Msg[], delay = 480) {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, ...build()])
    }, delay)
  }

  function startQuoteFlow() {
    setQuote({ step: 'specialty' })
    pushBotAfterDelay(() => [{
      id: uid(), role: 'bot',
      text: "Let's get you a number. What's your specialty?",
      chips: QUOTE_SPECIALTIES,
    }])
  }

  function advanceQuoteSpecialty(specialty: string) {
    setQuote({ step: 'addon', specialty })
    pushBotAfterDelay(() => [{
      id: uid(), role: 'bot',
      text: 'Good. Any ongoing service, or just the core build?',
      chips: QUOTE_ADDONS.map(a => a[0]),
    }])
  }

  function advanceQuoteAddon(addonLabel: string) {
    const specialty = quote.specialty ?? 'your practice'
    const found = QUOTE_ADDONS.find(a => a[0] === addonLabel)
    const monthly = found ? found[1] : null
    setQuote({ step: 'idle' })
    pushBotAfterDelay(() => [
      {
        id: uid(), role: 'bot',
        text: `Here's the number for ${specialty.toLowerCase()}:`,
        quote: { specialty, addonLabel, monthly },
      },
      {
        id: uid(), role: 'bot',
        text: "Want it in writing? Leave your email — I'll get it to Ravi now.",
        cta: true,
        leadContext: { specialty, interested_addon: addonLabel, estimated_monthly: String(monthly ?? 0) },
      },
    ], 620)
  }

  function queueBotReply(userText: string) {
    setTyping(true)
    const delay = 420 + Math.min(userText.length * 10, 520)
    setTimeout(() => {
      const entry = findAnswer(userText)
      setTyping(false)
      setMessages(m => [...m, { id: uid(), role: 'bot', text: entry.answer, chips: entry.chips, link: entry.link, cta: entry.cta }])

      userMsgCount.current += 1
      if (!nudgedRef.current && userMsgCount.current >= NUDGE_AFTER && !entry.cta) {
        nudgedRef.current = true
        setTimeout(() => {
          setMessages(m => [...m, {
            id: uid(), role: 'bot',
            text: 'Want me to loop in Ravi directly? One business day turnaround.',
            cta: true,
          }])
        }, 1000)
      }
    }, delay)
  }

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages(m => [...m, { id: uid(), role: 'user', text: trimmed }])
    setInput('')

    if (quote.step === 'specialty') { advanceQuoteSpecialty(trimmed); return }
    if (quote.step === 'addon') { advanceQuoteAddon(trimmed); return }
    if (quote.step === 'idle' && (trimmed === 'Get my quote' || QUOTE_TRIGGER_RE.test(trimmed))) { startQuoteFlow(); return }

    queueBotReply(trimmed)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    send(input)
  }

  function handleLinkClick(link: ChatLink) {
    if (link.to) {
      setOpen(false)
      navigate(link.to)
    } else if (link.href) {
      if (link.href.includes('calendly.com/')) { setOpen(false); openBooking(link.href) }
      else window.open(link.href, '_blank', 'noopener,noreferrer')
    }
  }

  function handleConnect() {
    setOpen(false)
    navigate('/contact')
  }

  async function submitLead(extra?: Record<string, string>) {
    if (!leadName.trim() || !leadEmail.trim() || leadSending) return
    setLeadSending(true)
    const res = await sendLead('chatbot', { name: leadName, email: leadEmail, source: 'Chat assistant', ...extra })
    if (res.ok) {
      setLeadSent(true)
      setMessages(m => [...m, { id: uid(), role: 'bot', text: `Got it, ${leadName.split(' ')[0]} — that's with Ravi now. He replies within one business day.` }])
    } else {
      setMessages(m => [...m, { id: uid(), role: 'bot', text: "That didn't quite go through — mind trying again in a moment, or using the contact page?" }])
    }
    setLeadSending(false)
  }

  const showPulse = teaserEligible && !hasOpenedOnce

  return (
    <div
      className="zx-chat-fab-wrap"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9997,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0,
      }}
    >
      {/* proactive teaser bubble */}
      <AnimatePresence>
        {teaserVisible && !open && (
          <motion.div
            className="zx-chat-teaser"
            role="button"
            tabIndex={0}
            onClick={openChat}
            onKeyDown={e => { if (e.key === 'Enter') openChat() }}
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{
              position: 'relative', width: 148, marginBottom: 16,
              background: '#fff', border: `1px solid ${T.border}`, borderRadius: 18,
              padding: '14px 12px 12px', boxShadow: cardShadow, cursor: 'pointer',
            }}
          >
            <button
              onClick={e => { e.stopPropagation(); dismissTeaser() }}
              aria-label="Dismiss"
              style={{
                position: 'absolute', top: 9, right: 9, width: 22, height: 22, borderRadius: '50%',
                border: 'none', background: T.surface, display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', color: T.faint,
              }}
            >
              <X size={11} />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingRight: 6 }}>
              <div style={{ flexShrink: 0 }}><BeeBotIcon size={34} /></div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink, textAlign: 'center' }}>
                Hi! I save your time.
              </div>
            </div>
            <div style={{
              position: 'absolute', right: 22, bottom: -7, width: 14, height: 14,
              background: '#fff', borderRight: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`,
              transform: 'rotate(45deg)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="zx-chat-panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              position: 'fixed', bottom: 96, right: 24,
              width: 400, maxWidth: 'calc(100vw - 32px)',
              height: 'min(624px, calc(100vh - 140px))',
              background: '#fff', borderRadius: 22, overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 34px 100px rgba(7,37,58,0.32)',
              transformOrigin: 'bottom right', zIndex: 9999,
            }}
          >
            {/* header */}
            <div style={{
              background: T.gradPanelDeep, padding: '17px 18px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{
                  position: 'relative', flexShrink: 0, width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <BeeBotIcon size={38} />
                  <span style={{
                    position: 'absolute', bottom: -1, right: -1, width: 10, height: 10,
                    borderRadius: '50%', background: '#22c55e', border: `2px solid ${T.inkDeep}`,
                  }} />
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em', fontFamily: SERIF }}>
                    Max
                  </div>
                  <div style={{ color: 'rgba(242,251,250,0.78)', fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.04em' }}>
                    ZmaxLab assistant · instant answers
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{
                  width: 30, height: 30, borderRadius: '50%', border: 'none',
                  background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                }}
              >
                <X size={15} color="#fff" />
              </button>
            </div>

            {/* messages */}
            <div
              ref={listRef}
              className="zx-chat-scroll"
              style={{ flex: 1, overflowY: 'auto', padding: '18px 16px', background: '#FBFDFD' }}
            >
              {messages.map(m => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: 14,
                  }}
                >
                  {m.text && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                      style={m.role === 'user' ? {
                        background: T.gradBtn, color: '#fff', padding: '10px 14px',
                        borderRadius: '16px 4px 16px 16px', fontSize: 15, lineHeight: 1.5,
                        maxWidth: '86%', whiteSpace: 'pre-line',
                      } : {
                        background: '#fff', color: T.text, border: `1px solid ${T.hairline}`,
                        padding: '11px 14px', borderRadius: '4px 16px 16px 16px', fontSize: 15,
                        lineHeight: 1.58, maxWidth: '90%', whiteSpace: 'pre-line',
                      }}
                    >
                      {m.text}
                    </motion.div>
                  )}

                  {m.quote && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                      style={{
                        marginTop: 6, width: '92%', background: '#fff', border: `1px solid rgba(11,156,135,0.28)`,
                        borderRadius: 16, padding: '15px 16px', boxShadow: '0 10px 28px rgba(7,37,58,0.10)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 11 }}>
                        <Sparkles size={14} style={{ color: T.primaryDeep }} />
                        <span style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 600, color: T.ink }}>Your estimate</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, padding: '7px 0', borderTop: `1px solid ${T.hairline}` }}>
                        <span style={{ color: T.muted }}>Custom website build</span>
                        <span style={{ fontFamily: MONO, fontWeight: 700, color: T.text }}>$500</span>
                      </div>
                      {m.quote.monthly != null && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, padding: '7px 0', borderTop: `1px solid ${T.hairline}` }}>
                          <span style={{ color: T.muted }}>{m.quote.addonLabel}</span>
                          <span style={{ fontFamily: MONO, fontWeight: 700, color: T.text }}>${m.quote.monthly}/mo</span>
                        </div>
                      )}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8,
                        background: T.primaryTint, borderRadius: 10, padding: '9px 12px',
                      }}>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: T.primaryDeep }}>Due to start</span>
                        <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15, color: T.primaryDeep }}>$250</span>
                      </div>
                      <div style={{ fontSize: 11, color: T.faint, marginTop: 9, lineHeight: 1.5 }}>
                        Half now, half at launch{m.quote.monthly != null ? '. Add-on billing starts once you\'re live.' : '.'} Estimate only — confirmed on your consultation call.
                      </div>
                    </motion.div>
                  )}

                  {!!m.chips?.length && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 9, maxWidth: '92%' }}>
                      {m.chips.map(c => (
                        <button
                          key={c}
                          className="zx-chat-chip"
                          onClick={() => send(c)}
                          style={{
                            background: '#fff', border: `1px solid ${T.hairlineStrong}`, borderRadius: 999,
                            padding: '7px 13px', fontSize: 13, fontWeight: 600, color: T.text,
                            cursor: 'pointer', fontFamily: 'inherit',
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.link && (
                    <button
                      onClick={() => handleLinkClick(m.link!)}
                      style={{
                        marginTop: 9, display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: T.primaryTint, border: `1px solid rgba(11,156,135,0.35)`, color: T.primaryDeep,
                        borderRadius: 999, padding: '8px 14px', fontSize: 12.5, fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      {m.link.label} <ArrowRight size={13} />
                    </button>
                  )}

                  {m.cta && !leadSent && (
                    <div style={{
                      marginTop: 9, width: '92%', background: T.surface, border: `1px solid ${T.hairline}`,
                      borderRadius: 14, padding: '13px 14px',
                    }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink, marginBottom: 9 }}>
                        Send my details to Ravi
                      </div>
                      <input
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)}
                        placeholder="Your name"
                        style={{
                          width: '100%', background: '#fff', border: `1px solid ${T.hairlineStrong}`, borderRadius: 9,
                          padding: '8px 11px', fontSize: 13.5, color: T.text, outline: 'none', fontFamily: 'inherit',
                          marginBottom: 7,
                        }}
                      />
                      <input
                        value={leadEmail}
                        onChange={e => setLeadEmail(e.target.value)}
                        placeholder="Email address"
                        type="email"
                        style={{
                          width: '100%', background: '#fff', border: `1px solid ${T.hairlineStrong}`, borderRadius: 9,
                          padding: '8px 11px', fontSize: 13.5, color: T.text, outline: 'none', fontFamily: 'inherit',
                          marginBottom: 9,
                        }}
                      />
                      <button
                        onClick={() => submitLead(m.leadContext)}
                        disabled={leadSending || !leadName.trim() || !leadEmail.trim()}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 7, width: '100%', justifyContent: 'center',
                          background: (leadName.trim() && leadEmail.trim()) ? T.gradBtn : T.hairlineStrong,
                          color: (leadName.trim() && leadEmail.trim()) ? '#fff' : T.faint,
                          border: 'none', borderRadius: 9, padding: '9px 14px', fontSize: 13, fontWeight: 700,
                          cursor: (leadName.trim() && leadEmail.trim() && !leadSending) ? 'pointer' : 'default',
                          fontFamily: 'inherit',
                        }}
                      >
                        {leadSending ? 'Sending…' : <>Send my details <ArrowRight size={13} /></>}
                      </button>
                      <button
                        onClick={handleConnect}
                        style={{
                          display: 'block', margin: '8px auto 0', background: 'none', border: 'none',
                          fontSize: 11.5, color: T.faint, cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        Or open the contact page →
                      </button>
                    </div>
                  )}

                  {m.cta && leadSent && (
                    <div style={{
                      marginTop: 9, display: 'inline-flex', alignItems: 'center', gap: 7,
                      background: T.primaryTint, color: T.primaryDeep, borderRadius: 999,
                      padding: '8px 14px', fontSize: 12.5, fontWeight: 700,
                    }}>
                      <Check size={13} /> Sent — Ravi has your details
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: '#fff', border: `1px solid ${T.hairline}`, color: T.faint,
                  padding: '13px 16px', borderRadius: '4px 16px 16px 16px',
                }}>
                  <span className="zx-typing-dot" />
                  <span className="zx-typing-dot" />
                  <span className="zx-typing-dot" />
                </div>
              )}
            </div>

            {/* footer */}
            <div style={{ borderTop: `1px solid ${T.hairline}`, padding: '11px 14px', background: '#fff', flexShrink: 0 }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about pricing, process, clients…"
                  style={{
                    flex: 1, background: T.surface, border: `1px solid ${T.hairline}`, borderRadius: 12,
                    padding: '10px 13px', fontSize: 14.5, color: T.text, outline: 'none', fontFamily: 'inherit',
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  style={{
                    width: 40, height: 40, borderRadius: 12, border: 'none', flexShrink: 0,
                    background: input.trim() ? T.gradBtn : T.surface,
                    color: input.trim() ? '#fff' : T.faint,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: input.trim() ? 'pointer' : 'default', transition: 'background .2s',
                  }}
                >
                  <Send size={16} />
                </button>
              </form>
              <button
                onClick={handleConnect}
                style={{
                  display: 'block', margin: '9px auto 0', background: 'none', border: 'none',
                  fontSize: 12, color: T.faint, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Prefer a human? Talk to Ravi →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* launcher */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AnimatePresence>
          {fabHover && !open && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.92 }}
              transition={{ duration: 0.18 }}
              style={{
                position: 'absolute', bottom: '100%', marginBottom: 10, whiteSpace: 'nowrap',
                background: T.inkDeep, color: '#fff', fontSize: 12.5, fontWeight: 650,
                padding: '7px 13px', borderRadius: 999, boxShadow: '0 10px 26px rgba(7,37,58,0.32)',
                pointerEvents: 'none',
              }}
            >
              Here to help
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          className={showPulse ? 'zx-chat-fab zx-chat-fab-pulse' : 'zx-chat-fab'}
          aria-label={open ? 'Close chat' : 'Open ZmaxLab assistant'}
          onClick={toggleChat}
          onMouseEnter={() => setFabHover(true)}
          onMouseLeave={() => setFabHover(false)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          style={{
            width: 60, height: 60, borderRadius: '50%', flexShrink: 0, background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0,
          }}
        >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
              style={{
                display: 'flex', width: 44, height: 44, borderRadius: '50%', background: T.gradPanelDeep,
                alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 38px rgba(7,37,58,0.36)',
              }}
            >
              <X size={20} color="#fff" />
            </motion.span>
          ) : (
            <motion.span
              key="logo" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.18 }}
              style={{ display: 'flex' }}
            >
              <BeeBotIcon size={40} />
            </motion.span>
          )}
        </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}
