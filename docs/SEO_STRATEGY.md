# SEO Strategy & Findings

## Critical finding (unresolved)
`site:zmaxlab.site` returns zero indexed pages on Google. No `google-site-verification` tag found in the code, suggesting the site has likely never been submitted to Google Search Console. This is the single highest-priority SEO fix — nothing else matters until this is resolved.
**Action needed:** verify domain in Google Search Console, submit sitemap.xml.

## Confirmed working
- Every route is prerendered to real static HTML via `scripts/prerender.mjs` (Puppeteer) — verified `/services` returns full content with no JS execution
- Per-page unique title tags, meta descriptions, canonical URLs, OG/Twitter tags, JSON-LD schema (Organization, Person, LocalBusiness, HowTo)
- `.htaccess` has caching headers, gzip compression, security headers, trailing-slash canonicalization

## Bugs found and fixed this pass
- `og-image.png` referenced in meta tags does not exist as a file — every social share (Facebook/LinkedIn/X/iMessage) shows a broken preview. **Still needs a real 1200×630 image added at that path — not yet done.**
- Animated stat counters rendered "0" in the prerendered HTML (fixed this pass — now show real values immediately)

## Content gaps (not yet addressed)
- Only one blog post exists; no blog index/listing page — content marketing channel is effectively unused
- Sitemap has 6 URLs, missing `/privacy` and `/terms`, no `<lastmod>` dates
- `robots.txt` has the same directive block duplicated twice (harmless but sloppy)

## Meta title/description pass (this session)
Reviewed all page titles for length and keyword clarity; tightened the How It Works title (was running long with a redundant "$500" suffix). Others were already reasonable and left as-is.

## Keyword clusters currently targeted (implicit, not formally mapped)
- "$500 healthcare website" / "custom healthcare website NPI"
- Specialty terms: nurse practitioner, PA-C, mental health provider, chiropractor, dentist website design
- Not yet done: formal keyword research, search volume data, or a content calendar mapped to clusters
