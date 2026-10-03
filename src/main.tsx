import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { preloadRoute, prefetchAllRoutes } from './routes'
import { initAnalytics } from './lib/analytics'
import { installBookingPopup } from './lib/booking'

// No StrictMode: its dev-only double-invoked effects race Framer Motion's
// scroll-triggered `whileInView` animations, freezing them mid-fade on any
// fast scroll in `npm run dev`. Analytics is idempotent regardless (see analytics.ts).

initAnalytics()
installBookingPopup()

// Load the current page's chunk before the first render so the prerendered
// content is replaced by identical content, never by an empty fallback.
preloadRoute(window.location.pathname)
  .catch(() => {})
  .finally(() => {
    createRoot(document.getElementById('root')!).render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    )
    const idle = (fn: () => void) => ('requestIdleCallback' in window ? window.requestIdleCallback(fn, { timeout: 5000 }) : setTimeout(fn, 3000))
    if (document.readyState === 'complete') idle(prefetchAllRoutes)
    else window.addEventListener('load', () => idle(prefetchAllRoutes), { once: true })
  })
