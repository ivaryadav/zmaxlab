import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <div style={{ background: '#07091f', minHeight: '100vh' }}>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
