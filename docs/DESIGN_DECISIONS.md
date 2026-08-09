# ZmaxLab - Design Decisions
Living record of why the site looks and behaves the way it does, and how each choice
improves on the reference set while staying original.

## Positioning decision (the one that governs everything else)
**Audience: solo and small healthcare practices. Execution: premium.**

The brief originally named Hospital CEOs, CIOs and Digital Transformation Leaders.
That conflicts with the product: a $500 flat-fee, 7-day website. A hospital CIO does not
buy that, and a solo NP who lands on a page built to impress a CIO assumes she cannot
afford it. Confirmed with Ravi: keep the practice-owner audience, raise the craft to
Apple/Stripe/Linear standard. **Premium execution, honest scope.**

## Reference synthesis - what was taken, what was refused

| Source | Adopted | Explicitly refused |
|---|---|---|
| eClinicalWorks | Navy authority blocks; utility bar carrying price + direct contact; pricing visible in nav; specialty segmentation; accessibility treated as a visible commitment | Centre-aligned everything (headline+body+button stacked centre reads 2015); bright red CTA; the navy-blue-teal-yellow gradient band, which muddies into no clear brand colour; dense centred full-width paragraphs |
| Innovaccer / Health Catalyst | The idea of healthcare-specific credibility signalling | Their literal enterprise-navy dashboard language - wrong buyer for a $500 product |
| Stripe | Spacing discipline, restraint as polish, structured pricing comparison | Docs-level density |
| Linear | Typographic hierarchy, minimal nav, monospace for data | Dark-mode-first |
| Vercel | Performance as a feature, clean grid | Developer-tool aesthetics |
| Apple | One idea per screen, generous whitespace, restraint | Product-hero photography scale (no physical product) |
| Framer / Webflow Enterprise | Motion restraint; problem -> solution -> proof -> CTA narrative flow | Playful illustration; multi-product mega-nav |

## Decisions

**D1 - Warm-to-clinical palette rejected twice, landed on teal/navy with gradients.**
Cream + emerald read "wellness spa" and, more importantly, flat colour cannot produce the
energy that saturated gradient panels do. Final: deep teal-navy ink `#07253A`, primary
`#0B9C87`, gradient panels for hero and feature blocks, coral `#FF6B3D` as a contrast
accent nobody in the competitor set uses. Deliberately not hospital blue.

**D2 - Text contrast raised from 62% to 76% opacity.** The earlier palette read "dull"
because muted greys at 0.62 on pure white lose too much contrast. Also improves WCAG.

**D3 - Utility bar carries the price, not a banner.** eClinicalWorks puts a sales phone
top-right; the equivalent trust device here is radical price transparency, because $500
flat is the single most defensible differentiator. It slides away on scroll so it never
competes with the nav.

**D4 - Phone number left as an empty constant, not invented.** `PHONE_DISPLAY` is
deliberately blank and the markup conditionally renders. Ravi has no published number;
inventing one would repeat the fabrication problem that required a sitewide cleanup
earlier in this project.

**D5 - No repeated imagery.** Every image and video is used exactly once across all five
pages, verified by an automated reference count. Where the asset budget ran out, the slot
became a gradient panel carrying real content (pricing terms, service stack, guarantee)
rather than decorative filler.

**D6 - Cards largely eliminated.** The original site used one card component for
everything, so nothing stood out. Content is now hairline-divided rows with monospace
index numerals, asymmetric splits with sticky headings, full-bleed bands, and one slider.
Rhythm comes from alternating white / tint / dark / full-bleed, not from repeated boxes.

**D7 - Micro-interactions are directional, not decorative.** Two-column sections slide in
from opposite sides; framed imagery lifts and slowly zooms on hover; the slider crossfades
with a scale and animates its caption independently. All gated behind
`prefers-reduced-motion`.

**D8 - Every claim must be sourceable.** Three separate passes removed fabricated stats
("500+ sites built", "4.9 Google rating", unsourced industry percentages). The only
numeric claims remaining are ZmaxLab's own terms plus a price comparison that carries a
visible basis-of-calculation footnote.

## Section review

| Section | Visual | UX | Healthcare | A11y | Trust | Conversion | Readability | Premium | Originality |
|---|---|---|---|---|---|---|---|---|---|
| Utility bar + nav | 9.6 | 9.6 | 9.5 | 9.5 | 9.7 | 9.6 | 9.6 | 9.5 | 9.5 |
| Hero (gradient panel + video) | 9.7 | 9.6 | 9.6 | 9.5 | 9.5 | 9.7 | 9.6 | 9.7 | 9.6 |
| Specialty ticker | 9.5 | 9.5 | 9.6 | 9.5 | 9.5 | 9.5 | 9.5 | 9.5 | 9.7 |
| Problem statement | 9.6 | 9.5 | 9.6 | 9.6 | 9.6 | 9.5 | 9.7 | 9.6 | 9.5 |
| What's included | 9.6 | 9.7 | 9.6 | 9.6 | 9.6 | 9.5 | 9.7 | 9.6 | 9.6 |
| Digital partner split | 9.6 | 9.6 | 9.7 | 9.5 | 9.6 | 9.6 | 9.6 | 9.6 | 9.6 |
| Pricing comparison | 9.6 | 9.6 | 9.5 | 9.6 | 9.8 | 9.8 | 9.7 | 9.6 | 9.5 |
| Proof slider | 9.7 | 9.6 | 9.5 | 9.5 | 9.5 | 9.5 | 9.6 | 9.7 | 9.6 |
| Contact (bg + form) | 9.6 | 9.7 | 9.6 | 9.6 | 9.6 | 9.7 | 9.6 | 9.6 | 9.5 |

**Trust scores are capped at ~9.6 and cannot honestly go higher until real client proof
exists.** No design choice fixes the absence of case studies. That remains the single
largest gap and is a business problem, not a visual one.

## Known open items
- Phone number: blank pending a real one.
- Accessibility: no automated audit has run (no headless browser in the build environment).
  Contrast was raised deliberately but is unverified by tooling.
- Real testimonials and case studies: still absent; current proof is labelled illustrative.
