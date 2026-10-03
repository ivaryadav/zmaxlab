// Opens Calendly as an in-page popup instead of a new tab, so the booking confirmation
// (`calendly.event_scheduled` postMessage) reaches analytics.ts. Calendly's script is only
// fetched on the first click; if it fails to load, the link opens normally in a new tab.

import { getAttribution } from './attribution'

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js'
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css'

let loading: Promise<void> | null = null
let installed = false

function loadWidget(): Promise<void> {
  if (window.Calendly) return Promise.resolve()
  if (loading) return loading
  loading = new Promise<void>((resolve, reject) => {
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = WIDGET_CSS
    document.head.appendChild(css)
    const s = document.createElement('script')
    s.src = WIDGET_JS
    s.async = true
    s.onload = () => (window.Calendly ? resolve() : reject(new Error('Calendly missing')))
    s.onerror = () => reject(new Error('Calendly failed to load'))
    document.head.appendChild(s)
    setTimeout(() => reject(new Error('Calendly timed out')), 6000)
  }).catch(err => { loading = null; throw err })
  return loading
}

export function openBooking(url: string) {
  const a = getAttribution()
  loadWidget()
    .then(() => window.Calendly!.initPopupWidget({
      url,
      utm: Object.fromEntries(Object.entries({
        utmSource: a.utm_source, utmMedium: a.utm_medium, utmCampaign: a.utm_campaign,
        utmTerm: a.utm_term, utmContent: a.utm_content,
      }).filter(([, v]) => v)) as Record<string, string>,
    }))
    .catch(() => window.open(url, '_blank', 'noopener,noreferrer'))
}

/** One delegated listener: any link to calendly.com opens the popup. */
export function installBookingPopup() {
  if (installed || typeof window === 'undefined' || window.__PRERENDER__) return
  installed = true
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href*="calendly.com/"]')
    if (!link) return
    e.preventDefault()
    openBooking(link.href)
  })
}
