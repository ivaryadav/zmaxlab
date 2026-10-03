import { useEffect } from 'react'
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

/** Marks the end of the first render; animations are enabled for anything mounted afterwards. */
function BootDone() {
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
