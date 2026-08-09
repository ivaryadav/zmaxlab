# ZmaxLab Website — Project Tracker

Last updated: 2026-08-08

## Status legend
✅ Done · 🔄 In progress · ⏳ Not started

## Phase tracker

| Phase | Scope | Status |
|---|---|---|
| 0 — Initialization | Business/customer/competitor understanding, goals | ✅ (informal — see DECISIONS.md, COMPETITOR_ANALYSIS.md) |
| 1 — Current site audit | Brand, SEO, technical, trust, conversion audit | ✅ (see SEO_STRATEGY.md, CHANGELOG.md) |
| 2 — Competitive research | Direct + adjacent competitor visual/positioning review | ✅ (see COMPETITOR_ANALYSIS.md) |
| 3 — Brand strategy | Voice, palette, typography, messaging discipline | ✅ (see BRAND_GUIDELINES.md) |
| 4 — Information architecture | Nav, sitemap, page hierarchy | ⏳ unchanged from original build — not yet formally reviewed |
| 5 — Homepage strategy | Goal, audience, CTA hierarchy, trust journey | 🔄 implicit in redesign — not yet a standalone doc |
| 6 — Homepage wireframe | Structure-only layout pass | ⏳ skipped — went straight to styled build (see note below) |
| 7 — Homepage copy | Headline/subhead/CTA/proof rewrite | ✅ (see CHANGELOG.md) |
| 8 — Homepage UI design | Visual system application | ✅ (see BRAND_GUIDELINES.md, DESIGN_SYSTEM — pending) |
| 9 — Homepage development | Component-by-component build | ✅ built, 🔄 not yet component-by-component QA'd individually |

**Note on process so far:** the current redesign was executed as one fast pass (audit → competitor scan → full visual + copy rewrite) rather than the phase-gated sequence above, because it was scoped as "fix what's unprofessional" rather than a ground-up rebuild. It is sitting on branch `redesign/professional-trust`, not yet merged to `main` / live.

## Pages covered in this pass
- [x] Home
- [x] Services
- [x] About
- [x] How It Works
- [x] Contact
- [x] Blog (single post)
- [x] Privacy
- [x] Terms

## Not yet done
- [ ] Formal wireframe stage (structure-before-style)
- [ ] Accessibility audit (contrast ratios, keyboard nav, screen reader pass)
- [ ] Performance audit (Lighthouse / Core Web Vitals on the new build)
- [ ] Component-level QA checklist per section
- [ ] Design system doc (spacing/type scale formalized as tokens beyond theme.ts)
- [ ] New pages beyond current sitemap (Industries, Case Studies, Resources, Pricing as standalone page)

## Open decision needed
How strictly should the remaining phase-gate process be followed from here — see chat for the calibration question.
