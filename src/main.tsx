import { createRoot, hydrateRoot } from 'react-dom/client'
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
    const container = document.getElementById('root')!
    const app = (
      <HelmetProvider>
        <App />
      </HelmetProvider>
    )
    // Prerendered pages are hydrated (React adopts the existing HTML, so content is never
    // repainted); if anything differs React recovers by re-rendering on its own.
    if (container.hasChildNodes()) {
      hydrateRoot(container, app, {
        onRecoverableError: (err, info) => {
          if (!import.meta.env.DEV && !window.__ZX_HYDRATION_DEBUG__) return
          console.warn('[hydration]', err instanceof Error ? err.message : String(err), (info?.componentStack ?? '').split('\n').slice(0, 12).join(' < '))
        },
      })
    } else {
      createRoot(container).render(app)
    }
    const idle = (fn: () => void) => ('requestIdleCallback' in window ? window.requestIdleCallback(fn, { timeout: 5000 }) : setTimeout(fn, 3000))
    // Not while prerendering: prefetched chunks would inject other pages' CSS into the static HTML.
    if (!window.__PRERENDER__) {
      if (document.readyState === 'complete') idle(prefetchAllRoutes)
      else window.addEventListener('load', () => idle(prefetchAllRoutes), { once: true })
    }
  })
