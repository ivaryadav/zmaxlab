import { useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
  useLayoutEffect(() => { document.head.querySelectorAll('[data-pr]').forEach(el => el.remove()) }, [])
  useEffect(() => { endBoot() }, [])
  return null
}

export default function App() {
  return (
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
  )
}
