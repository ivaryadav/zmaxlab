import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ClientsPage from './pages/ClientsPage'
import HowItWorksPage from './pages/HowItWorksPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PricingPage from './pages/PricingPage'
import AIAddonPage from './pages/AIAddonPage'
import PayNowPage from './pages/PayNowPage'
import BlogPage from './pages/BlogPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

const PAGE_CATEGORIES: Record<string, string> = {
  '/': 'home',
  '/services': 'services',
  '/clients': 'clients',
  '/how-it-works': 'how-it-works',
  '/about': 'about',
  '/contact': 'contact',
  '/pricing': 'pricing',
  '/ai-addon': 'ai-addon',
  '/pay-now': 'pay-now',
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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/ai-addon" element={<AIAddonPage />} />
          <Route path="/pay-now" element={<PayNowPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/blog/custom-vs-template-medical-website" element={<BlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
