import { Helmet } from 'react-helmet-async'
import routesManifest from '@/routes.json'

const SITE = routesManifest.siteUrl
const ROBOTS = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'

export const ogSlug = (path: string) => (path === '/' ? 'home' : path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-'))

export type SeoProps = {
  /** < 60 characters */
  title: string
  /** < 155 characters */
  description: string
  /** Route path, e.g. "/pricing" - canonical, og:url and breadcrumbs derive from it. */
  path: string
  schema?: object | object[]
  noindex?: boolean
  /** Above-the-fold LCP image to fetch early (it is otherwise discovered after the inlined CSS). */
  preloadImage?: string
}

/** Per-page head tags: title, description, canonical, robots, Open Graph, Twitter and JSON-LD. */
export default function Seo({ title, description, path, schema, noindex, preloadImage }: SeoProps) {
  const url = SITE + (path === '/' ? '/' : path)
  const image = `${SITE}/og/${ogSlug(path)}.png`
  const route = routesManifest.routes.find(r => r.path === path)
  const isPage = Boolean(route) // false for the 404 page: no canonical or share image

  const breadcrumb = path !== '/' && route ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: route.crumb, item: url },
    ],
  } : null
  const ld = [...(schema ? (Array.isArray(schema) ? schema : [schema]) : []), ...(breadcrumb ? [breadcrumb] : [])]

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {isPage && <link rel="canonical" href={url} />}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : ROBOTS} />
      {preloadImage && <link rel="preload" as="image" href={preloadImage} fetchPriority="high" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ZmaxLab" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {isPage && <meta property="og:url" content={url} />}
      {isPage && <meta property="og:image" content={image} />}
      {isPage && <meta property="og:image:width" content="1200" />}
      {isPage && <meta property="og:image:height" content="630" />}
      {isPage && <meta property="og:image:alt" content={title} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {isPage && <meta name="twitter:image" content={image} />}

      {ld.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  )
}
