import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))

const PAGE_CATEGORIES: Record<string, string> = {
  '/': 'home',
  '/services': 'services',
  '/how-it-works': 'how-it-works',
  '/about': 'about',
  '/contact': 'contact',
  '/privacy': 'legal',
  '/terms': 'legal',
  '/blog/custom-vs-template-medical-website': 'blog',
}

function PageViewTracker() {
  const location = useLocation()
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_location: window.location.href,
        page_title: document.title,
        page_category: PAGE_CATEGORIES[location.pathname] || 'other',
      })
    }
  }, [location])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/blog/custom-vs-template-medical-website" element={<BlogPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
