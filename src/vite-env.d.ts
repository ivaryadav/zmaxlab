/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_GA4_ID: string
  readonly VITE_GADS_ID: string
  readonly VITE_GADS_LEAD_LABEL: string
  readonly VITE_GADS_BOOKING_LABEL: string
  readonly VITE_META_PIXEL_ID: string
  readonly VITE_CLARITY_ID: string
  readonly VITE_FORMSPREE_ID: string
  readonly VITE_CALENDLY_URL: string
  readonly VITE_WHATSAPP_URL: string
  readonly VITE_ANALYTICS_DEBUG: string
}
interface ImportMeta { readonly env: ImportMetaEnv }

interface Window {
  dataLayer: unknown[]
  gtag: (...args: unknown[]) => void
  fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown }
  _fbq?: unknown
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }
  Calendly?: { initPopupWidget: (opts: { url: string; prefill?: Record<string, unknown>; utm?: Record<string, string> }) => void }
  /** Set by the prerender script so no tracking runs while static HTML is generated. */
  __PRERENDER__?: boolean
  /** Set in a test browser to log hydration mismatches in production builds. */
  __ZX_HYDRATION_DEBUG__?: boolean
}
