/// <reference types="vite/client" />

// GA4 / gtag.js global type declaration
interface Window {
    gtag: (
          command: 'config' | 'event' | 'js' | 'set' | 'consent',
          targetIdOrEventName: string | Date,
          params?: Record<string, string | number | boolean | string[]>
        ) => void
        dataLayer: unknown[]
}
