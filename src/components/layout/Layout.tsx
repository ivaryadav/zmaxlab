import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

// Not needed for first paint: loaded once the browser is idle.
const LeadPopup = lazy(() => import('./LeadPopup'))
const ChatBot = lazy(() => import('./ChatBot'))

export default function Layout() {
  const { pathname } = useLocation()
  const [extras, setExtras] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    if (window.__PRERENDER__) return
    const show = () => setExtras(true)
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(show, { timeout: 3500 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(show, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppButton />
      {extras && (
        <Suspense fallback={null}>
          <LeadPopup />
          <ChatBot />
        </Suspense>
      )}
    </div>
  )
}
