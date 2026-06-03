import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
}

export function useSEO({ title, description, canonical, ogTitle, ogDescription }: SEOProps) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', ogTitle ?? title)
    setMeta('property', 'og:description', ogDescription ?? description)
    setMeta('property', 'og:url', canonical)
    setLink('canonical', canonical)
  }, [title, description, canonical, ogTitle, ogDescription])
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
