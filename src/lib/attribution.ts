// Marketing attribution: captured once per landing, kept for 90 days, sent with every lead.

const KEY = 'zx_attribution'
const TTL_MS = 90 * 24 * 60 * 60 * 1000
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing_page?: string
  referrer?: string
  captured_at?: string
}

type Stored = { data: Attribution; expires: number }

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Stored
    if (!parsed?.expires || parsed.expires < Date.now()) {
      localStorage.removeItem(KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function write(data: Attribution) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ data, expires: Date.now() + TTL_MS } satisfies Stored))
  } catch { /* storage blocked (private mode) - attribution just isn't persisted */ }
}

/**
 * Call once on page load. A visit that carries campaign parameters (UTM / gclid / fbclid)
 * replaces the stored touch; a plain visit keeps the existing one until it expires.
 * The very first visit is always stored so the landing page is known even for direct traffic.
 */
export function captureAttribution() {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const fromUrl: Attribution = {}
  for (const p of PARAMS) {
    const v = url.searchParams.get(p)
    if (v) fromUrl[p] = v.slice(0, 200)
  }
  const hasCampaign = Object.keys(fromUrl).length > 0
  const existing = read()
  if (!hasCampaign && existing) return

  const external = document.referrer && !document.referrer.startsWith(window.location.origin)
  write({
    ...fromUrl,
    landing_page: url.pathname + url.search,
    referrer: external ? document.referrer.slice(0, 300) : existing?.data.referrer,
    captured_at: new Date().toISOString(),
  })
}

export function getAttribution(): Attribution {
  return read()?.data ?? {}
}
