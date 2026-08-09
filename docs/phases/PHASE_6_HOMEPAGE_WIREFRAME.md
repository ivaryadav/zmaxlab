# Phase 6 — Homepage Wireframe
**Status:** Complete — awaiting approval
**Date:** 2026-08-08
**Scope:** Structure only — no colors, typography treatment, or visual styling (that's Phase 8).

## Framing note
As with Phases 1 and 5, the homepage already exists. This documents its actual structural skeleton and checks it against the Phase 5 strategy, rather than designing a new structure from a blank page.

## Wireframe (structural, section-by-section)
```
┌─────────────────────────────────────────┐
│ NAV: Logo | Home Services HowItWorks    │
│      About Blog Contact | [Book Demo]   │
├─────────────────────────────────────────┤
│ HERO                                     │
│  Eyebrow label                           │
│  H1 (2 lines, one word accented)         │
│  Subhead (1-2 lines, price+timeline)     │
│  [Primary CTA]                           │
│  Trust badge row (3-4 short claims)      │
├─────────────────────────────────────────┤
│ SPECIALTIES (relevance check)            │
│  4-card grid, icon + label + 1-line desc │
├─────────────────────────────────────────┤
│ SITE PREVIEW (what you get)              │
│  Browser-chrome-framed mockup            │
│  2 floating fact badges                  │
├─────────────────────────────────────────┤
│ STATS STRIP                              │
│  3-4 counters, process facts only        │
├─────────────────────────────────────────┤
│ BEFORE/AFTER (labeled illustrative)      │
│  2-column comparison + disclaimer line   │
├─────────────────────────────────────────┤
│ AI TOOLS / CAPABILITIES                  │
│  Tag-style feature list                  │
├─────────────────────────────────────────┤
│ TESTIMONIALS (labeled illustrative)      │
│  1-at-a-time carousel + disclaimer line  │
├─────────────────────────────────────────┤
│ FINAL CTA                                │
│  H2 + 1-2 line body + [Primary CTA]      │
├─────────────────────────────────────────┤
│ FOOTER (dark band)                       │
│  Logo/tagline | link columns | legal     │
├─────────────────────────────────────────┤
│ [Sticky CTA bar — persistent, dismissible│
│  once scrolled, floats above footer]     │
└─────────────────────────────────────────┘
```

## Structural assessment against Phase 5 strategy
- **Content hierarchy match:** Yes — matches the 5-step hierarchy (what/who → what you get → quick proof → deeper proof, labeled → ask) defined in Phase 5 exactly.
- **Gap identified in Phase 5 (no secondary CTA):** Confirmed still present structurally — every section funnels to the same single CTA with no lower-commitment secondary action (e.g. "See pricing"). Recommend adding one to the Hero section once `/pricing` exists (Phase 4).
- **Section count/length:** 9 sections is reasonable for a single-offer business — not so short it feels thin, not so long it becomes a scroll marathon. No structural bloat identified.

## Strengths
- Structure directly validated against the Phase 5 strategy rather than assumed correct — same discipline used in Phase 5 for the strategy-vs-goal check.
- Confirms the secondary-CTA gap is structural (a real missing section/element), not just a strategic recommendation with nowhere concrete to land it (Hero section is the clear spot).

## Weaknesses
- No wireframe-level user testing (e.g. five-second test, click-tracking) was possible — structural soundness is judged by pattern-matching against standard high-converting SaaS/service marketing page structures, not measured.

## Risks
- None new — this phase surfaces no risks beyond what Phases 1/2/5 already flagged (illustrative-proof sections, missing secondary CTA).

## Recommended Improvements
- Add secondary CTA slot to Hero structure (e.g., a smaller text-link "See pricing" beside the primary button) — cheap structural change, implement alongside the `/pricing` page build from Phase 4.

## Self-Review
**Strengths:** Efficient — since the structure was sound already, this phase mainly confirmed rather than reworked, and did so with a real check against Phase 5 rather than skipping the verification step.
**Weaknesses:** Retrospective nature means less rigor than a from-scratch wireframing exercise would apply.
**What would strengthen this:** Real analytics/heatmap data once the site is live and indexed, to confirm scroll depth and section engagement match the assumed hierarchy.

## QA Checklist
- [x] Full section-by-section structure documented
- [x] Checked against Phase 5 strategy, not assumed correct
- [x] Secondary-CTA gap re-confirmed as a structural (not just strategic) issue
- [x] No colors/typography/visual styling included (correctly scoped to Phase 8)

## Score: 8/10
Sound, efficiently validated structure; docked slightly only for the inherent retrospective-validation limitation.

---
Awaiting your approval to proceed to Phase 7 (Homepage Copy).
