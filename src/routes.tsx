import { lazy, Suspense, type ComponentType } from 'react'

type Loader = () => Promise<{ default: ComponentType }>

// One code-split chunk per page.
export const PAGE_LOADERS: Record<string, Loader> = {
  '/': () => import('./pages/HomePage'),
  '/services': () => import('./pages/ServicesPage'),
  '/pricing': () => import('./pages/PricingPage'),
  '/clients': () => import('./pages/ClientsPage'),
  '/how-it-works': () => import('./pages/HowItWorksPage'),
  '/ai-addon': () => import('./pages/AIAddonPage'),
  '/about': () => import('./pages/AboutPage'),
  '/contact': () => import('./pages/ContactPage'),
  '/blog/custom-vs-template-medical-website': () => import('./pages/BlogPage'),
  '/privacy': () => import('./pages/PrivacyPage'),
  '/terms': () => import('./pages/TermsPage'),
  '/pay-now': () => import('./pages/PayNowPage'),
}
export const NOT_FOUND_LOADER: Loader = () => import('./pages/NotFoundPage')

const loaded = new Map<Loader, ComponentType>()

const normalise = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

/** Resolve the chunk for a path so the first render has the page synchronously (no blank flash). */
export async function preloadRoute(path: string) {
  const loader = PAGE_LOADERS[normalise(path)] ?? NOT_FOUND_LOADER
  if (!loaded.has(loader)) loaded.set(loader, (await loader()).default)
}

/** After the page is idle, fetch the remaining page chunks so navigation is instant. */
export function prefetchAllRoutes() {
  for (const loader of [...Object.values(PAGE_LOADERS), NOT_FOUND_LOADER]) {
    if (!loaded.has(loader)) loader().then(m => loaded.set(loader, m.default)).catch(() => {})
  }
}

/** Renders the page directly when its chunk is already loaded; otherwise lazy-loads it. */
export function routeElement(loader: Loader) {
  const Lazy = lazy(loader)
  function Page() {
    const Loaded = loaded.get(loader)
    return Loaded ? <Loaded /> : <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><Lazy /></Suspense>
  }
  return <Page />
}
