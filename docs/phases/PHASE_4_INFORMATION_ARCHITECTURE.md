# Phase 4 — Information Architecture
**Status:** Complete — awaiting approval
**Date:** 2026-08-08

## Summary
Phase 1 rated current Information Architecture 6/10 — reasonable for the business's current size, unchanged by the redesign. This phase evaluates whether to expand it. The original project brief listed a large target page set (About, Services, Industries, SEO, AI, Case Studies, Resources, Blog, Pricing, Contact). I'm recommending a smaller, sequenced version of that rather than building all of it at once — reasoning below.

## Current Site Map (as of redesign branch)
```
/                    Home
/services            Services
/how-it-works        How It Works
/about               About
/blog/[slug]          Blog (single post, no index page yet)
/contact             Contact
/privacy             Privacy Policy
/terms               Terms of Service
```

## Recommended Site Map (sequenced, not all at once)

**Keep as-is (already sound):** Home, Services, How It Works, About, Contact, Privacy, Terms.

**Add next, in priority order:**
1. `/blog` — a real index page. Right now there's exactly one post at a hardcoded route with no listing page; that's a structural gap, not a content-strategy question, and it's cheap to fix regardless of how much blog content exists.
2. `/pricing` — currently pricing lives inline on the homepage/services page. A dedicated page is standard for a flat-fee, no-contract offer like this and gives something specific to link to from ads, email signatures, etc.
3. `/case-studies` — **hold until real clients exist.** Building this page now would either sit empty or force the illustrative-testimonial pattern into a whole dedicated page, which compounds the Phase 1/2 trust gap rather than fixing it. Sequence this right after the first 2-3 real clients are onboarded, not before.

**Reconsider or drop from the original target list:**
- `/industries` — worth doing only if there's a real reason to segment messaging by specialty (chiropractic vs. dermatology vs. NP, etc.) beyond what the homepage's `SPECIALTIES` section already does. Recommend holding until there's evidence a specific specialty is a meaningful lead source worth a dedicated landing page.
- `/seo` and `/ai` as standalone pages — these read as service-line pages for a bigger agency. ZmaxLab currently sells one thing (a $500 flat website); inventing separate service pages before those are real, sellable, separately-scoped offerings risks looking like scope inflation rather than substance. Recommend keeping SEO/AI mentions as supporting content within Services rather than spinning up dedicated pages prematurely.
- `/resources` — reasonable long-term (a resource hub supports SEO/content strategy) but low priority until the blog itself has enough depth to justify a hub around it.

## Navigation & Hierarchy
Primary nav stays flat and short: Home, Services, How It Works, About, Blog, Contact — consistent with the brand's "plain-spoken, not agency-inflated" personality from Phase 3. Pricing, once added, belongs in primary nav (it's a core trust/conversion lever for a flat-fee offer); Case Studies, once it exists, also belongs in primary nav, not buried.

## Internal Linking
Current internal linking is thin — most pages link to Contact via CTA buttons but don't cross-link to each other in body content (e.g., Services doesn't link out to a relevant case study or blog post, About doesn't link to Services). Once `/blog` and `/pricing` exist, add contextual internal links between them (Services → Pricing, Blog posts → Services, Homepage → Blog) — this helps both SEO (currently a known weak point per Phase 1/SEO_STRATEGY.md) and user journey completion.

## User Flow (primary conversion path)
```
Entry (organic search / referral)
   → Home OR Services (depending on entry query)
   → Services detail (what's included, pricing)
   → How It Works (process, removes "how does this actually work" doubt)
   → Contact (book a demo call)
```
This flow is intact and reasonable today. The weak link is between "Services" and "commit to Contact" — this is exactly where real case studies would do the most conversion work, reinforcing the Phase 1/2 finding rather than introducing a new one.

## Journey Map (illustrative persona: solo NP opening a new practice)
1. **Awareness:** Searches "nurse practitioner website design" or similar — currently blocked by the zero-indexing issue flagged in Phase 1/SEO_STRATEGY.md; this journey can't start via organic search until that's resolved.
2. **Consideration:** Lands on Home or Services, compares price/timeline mentally against what she's found elsewhere (per Phase 2, ZmaxLab wins on both).
3. **Trust-check:** Looks for proof — this is the step where the current site is weakest (illustrative testimonials, no logos).
4. **Conversion:** Contact form / demo call booking.
5. **Post-launch (not currently designed for):** No stated path for referrals, reviews, or repeat engagement once a site ships — worth considering once there's a first cohort of real clients.

## Strengths
- Recommendations are sequenced and tied to real prerequisites (e.g., don't build Case Studies before there's anything real to put on it) rather than just checking off the original page list.
- Explicitly pushes back on scope inflation (SEO/AI as standalone pages) where it conflicts with Phase 3's "honest, not agency-inflated" brand personality — keeps IA and brand strategy consistent with each other.

## Weaknesses
- This is a recommendation, not a built deliverable — no new pages were created this phase, only planned. If the intent was to have `/blog` and `/pricing` actually exist by end of Phase 4, that's follow-up work, not yet done.
- Journey map is illustrative (one persona), not based on real user research or analytics — no analytics/traffic data was available to validate actual entry points or drop-off.

## Risks
- If `/pricing` and `/case-studies` aren't sequenced correctly (i.e., case studies gets rushed before real client proof exists), it repeats the exact trust problem the redesign was meant to fix.
- Recommending against `/industries`, `/seo`, `/ai` pages is a judgment call that trades off "match the original full page-list request" against "stay consistent with brand honesty" — flagging this explicitly since it's a deviation from the originally listed target page set, not a silent omission.

## Recommended Improvements
- Build `/blog` index and `/pricing` pages next (Quick, low-risk, addresses real structural gaps).
- Defer `/case-studies`, `/industries`, `/seo`, `/ai`, `/resources` until their real prerequisites exist (real clients, evidence of specialty-specific demand, actual separately-sellable service lines, sufficient blog depth, respectively).

## Self-Review
**Strengths:** Concrete, sequenced, and honest about which parts of the originally-requested page list I'm recommending against and why.
**Weaknesses:** No analytics data existed to validate the user-journey assumptions; this is informed judgment, not measured behavior.
**What would strengthen this:** Real traffic/analytics data (e.g., Search Console once indexing is fixed, or GA4) to confirm actual entry points and drop-off points rather than an assumed journey.

## QA Checklist
- [x] Navigation, Site Map, Page Hierarchy, Internal Linking, User Flow, and Journey Map all addressed
- [x] Recommendations sequenced by real prerequisite, not just priority-ranked arbitrarily
- [x] Deviations from the original requested page list are explicitly flagged, not silently dropped
- [x] Consistent with Phase 3 brand personality (no scope-inflation pages)

## Score: 7/10
Practical and well-sequenced; would score higher with real analytics to validate the journey map assumptions.

---
Awaiting your approval to proceed to Phase 5 (Homepage Strategy).
