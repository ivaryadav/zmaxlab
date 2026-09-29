import { useEffect } from 'react'

const DEFAULT_ROBOTS = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'

interface SEOProps {
    title: string
    description: string
    canonical: string
    ogTitle?: string
    ogDescription?: string
    schema?: object | object[]
    /** Utility pages (e.g. a payment page) that shouldn't be search-discoverable. */
    noindex?: boolean
}

export function useSEO({ title, description, canonical, ogTitle, ogDescription, schema, noindex }: SEOProps) {
    useEffect(() => {
          document.title = title
          setMeta('name', 'description', description)
          setMeta('name', 'robots', noindex ? 'noindex,nofollow' : DEFAULT_ROBOTS)
          setMeta('property', 'og:title', ogTitle ?? title)
          setMeta('property', 'og:description', ogDescription ?? description)
          setMeta('property', 'og:url', canonical)
          setLink('canonical', canonical)

                  // Inject or update JSON-LD schema
                  if (schema) {
                          const schemaArray = Array.isArray(schema) ? schema : [schema]
                          // Remove any existing injected schema tags
            document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove())
                          schemaArray.forEach((s) => {
                                    const script = document.createElement('script')
                                    script.type = 'application/ld+json'
                                    script.setAttribute('data-seo-schema', 'true')
                                    script.textContent = JSON.stringify(s)
                                    document.head.appendChild(script)
                          })
                  }

                  return () => {
                          document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove())
                  }
    }, [title, description, canonical, ogTitle, ogDescription, schema, noindex])
}

function setMeta(attr: string, key: string, content: string) {
    let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
    if (!el) {
          el = document.createElement('meta')
          el.setAttribute(attr, key)
          document.head.appendChild(el)
    }
    el.content = content
}

function setLink(rel: string, href: string) {
    let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
    if (!el) {
          el = document.createElement('link')
          el.rel = rel
          document.head.appendChild(el)
    }
    el.href = href
}
