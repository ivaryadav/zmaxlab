import { useEffect } from 'react'

interface SEOProps {
    title: string
    description: string
    canonical: string
    ogTitle?: string
    ogDescription?: string
    schema?: object | object[]
}

export function useSEO({ title, description, canonical, ogTitle, ogDescription, schema }: SEOProps) {
    useEffect(() => {
          document.title = title
          setMeta('name', 'description', description)
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
    }, [title, description, canonical, ogTitle, ogDescription, schema])
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
