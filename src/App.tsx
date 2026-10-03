import { useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LazyMotion } from 'framer-motion'
import Layout from './components/layout/Layout'
import { PAGE_LOADERS, NOT_FOUND_LOADER, routeElement } from './routes'
import { trackPageView } from './lib/analytics'
import { endBoot } from './lib/boot'

/** One manual GA4/Meta page view per route change (deduplicated inside trackPageView). */
function PageViewTracker() {
  const { pathname } = useLocation()
  useEffect(() => { trackPageView(pathname) }, [pathname])
  return null
}

/**
 * End of the first render. React has now written its own head tags, so the static copies baked in
 * by the prerender (marked data-pr) are removed before paint; animations are enabled from here on.
 */
function BootDone() {
  useLayoutEffect(() => {
    // Drop a prerendered head tag only if React rendered its own copy (hydration may adopt it instead).
    const key = (el: Element) => el.tagName + (el.getAttribute('name') ?? el.getAttribute('property') ?? el.getAttribute('rel') ?? el.getAttribute('type') ?? '')
    const live = new Set([...document.head.children].filter(el => !el.hasAttribute('data-pr')).map(key))
    document.head.querySelectorAll('[data-pr]').forEach(el => { if (live.has(key(el)) && el.tagName !== 'SCRIPT') el.remove() })
    // JSON-LD: keep only one copy of each block
    const seen = new Set<string>()
    document.head.querySelectorAll('script[type="application/ld+json"]:not([data-static])').forEach(el => {
      if (seen.has(el.textContent ?? '')) el.remove(); else seen.add(el.textContent ?? '')
    })
  }, [])
  useEffect(() => { endBoot() }, [])
  return null
}

// Animation features (animate, exit, hover/tap, in-view) load after the page; components use `m`.
const loadMotionFeatures = () => import('./lib/motion-features').then(mod => mod.default)

export default function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <BrowserRouter>
      <PageViewTracker />
      <Routes>
        <Route element={<Layout />}>
          {Object.entries(PAGE_LOADERS).map(([path, loader]) => (
            <Route key={path} path={path} element={routeElement(loader)} />
          ))}
          <Route path="*" element={routeElement(NOT_FOUND_LOADER)} />
        </Route>
      </Routes>
      <BootDone />
    </BrowserRouter>
    </LazyMotion>
  )
}
