# Phase 8 — Homepage UI Design
**Status:** Complete — awaiting approval
**Date:** 2026-08-08
**Implements:** D10 (Approachable Precision + 3 borrows), refined by the Design DNA synthesis (`docs/design/ZMAXLAB_DESIGN_DNA.md`)

## Summary
This phase applied the confirmed visual direction to actual code, sitewide for foundational tokens (typography) and homepage-scoped for section-level treatment (trust badge color restraint, monospace timeline). It also fixed a critical issue found during implementation: fabricated trust-badge stats.

## Changes made
1. **Typography (sitewide):** Added Manrope, Plus Jakarta Sans, and JetBrains Mono to the font load alongside the existing Space Grotesk/Inter (Space Grotesk kept so `LogoIcon.tsx`, `BlogPage.tsx`, `PrivacyPage.tsx`, `TermsPage.tsx` — out of this phase's scope — don't regress). All `h1-h4` now render in Manrope/Plus Jakarta Sans via a CSS rule rather than per-instance inline styles, so the change cascades correctly without touching every heading in the codebase.
2. **Monospace timeline detail:** The "How It Works" process step badges (Day 1, Days 2-4, etc.) on the homepage now render in JetBrains Mono — the specific "engineered, not templated" cue recommended in the design direction doc.
3. **Critical fix — fabricated trust badges:** The "Built on Trust. Backed by Results." section claimed "500+ Practices · Sites Built," "4.9/5.0 ★ Google Reviews," and "All 50 States · USA Coverage" — none of which are real (confirmed with Ravi). Replaced with true, defensible claims: HIPAA-Aware, 7-Day Delivery (Or Fully Refunded), Founder-Built (Every Site, Personally), Custom-Coded (Not a Template), $500 Flat (No Hidden Fees). This directly violated the Phase 3 brand guardrails and should have been caught in the original de-hyping pass — it wasn't, and this phase is where it surfaced.
4. **Color restraint on trust badges:** The 5 badges previously used 5 different accent colors (blue/violet/amber/green/cyan) — a "rainbow" pattern inconsistent with the SaaS-cluster restraint principle from the Competitor UI Benchmark ("1-2 accent colors max"). Unified to a single blue accent across all 5.

## Deliberately not changed this phase
- Emerald-as-success-only reclassification across the rest of the codebase (Services/About/Contact/HowItWorks pages) — `T.green` is used ~25 times across those pages as a general accent, not just for success states. Reclassifying all of them is a larger, riskier change than this homepage-scoped phase should absorb; tracked as a to-do for when those pages' individual phases come up (per the phase-per-page structure in the original methodology), not silently dropped.
- Card radius/shadow/spacing-scale normalization (`DESIGN_SYSTEM.md` recommendations) — no regressions found this pass, but no systematic sweep was done either; deferred to Phase 9 (component-by-component QA) if time allows, otherwise a later cleanup pass.

## Verification
- `tsc -b` — clean, no errors.
- `vite build` — succeeds (used only to catch bundling errors; its output was discarded, not committed, per the established `dist/` reconciliation pattern — see Known limitation below).
- No visual/browser verification possible in this sandbox (same limitation flagged in Phase 1's QA_CHECKLIST.md) — this is a real gap: the font/color changes are verified to compile and type-check correctly, not verified to *look* correct.

## Known limitation (repeated from Phase 1, still true)
This sandbox has no headless browser. The typography and color changes are unverified visually. Recommend Ravi view the live preview once deployed (or on a real device) before considering this phase's visual quality — not just its correctness — fully confirmed.

## Strengths
- Found and fixed a real, previously-missed brand-guardrail violation (fabricated trust badges) rather than only doing the cosmetic work asked for — this is exactly the kind of QA-Lead-style check the methodology calls for.
- Typography change is implemented at the CSS-cascade level, not per-instance, so it's consistent everywhere headings appear, including pages not explicitly touched this phase.
- Explicitly scoped what was and wasn't changed, rather than either quietly doing a huge sitewide sweep or silently leaving inconsistencies — the emerald-reclassification deferral is named, not hidden.

## Weaknesses
- No real visual verification — same sandbox limitation as every prior phase, but worth restating since this phase is specifically about visual design.
- The trust-badge fix, while necessary, means this phase caught something it wasn't originally scoped to catch — a sign that Phase 1's audit and Phase 7's copy review, despite being thorough, didn't independently catch this same issue. Worth a lighter-weight "does every number on the page have a source" sweep during Phase 9.

## Risks
- Deferred emerald reclassification means the color system is inconsistent between the homepage (restrained, blue-only trust badges) and other pages (still using green as a rotating decorative accent) until those pages' phases happen — a real, temporary inconsistency, not a hidden one.

## Recommended Improvements
- During Phase 9 (component QA), run a quick "every number/stat has a real source" check across all homepage stats (not just the trust badges) to make sure nothing else was missed.
- When Services/About/Contact/HowItWorks reach their own phase cycles, apply the same emerald-restraint principle there.

## Self-Review
**Strengths:** Caught and fixed a real problem beyond the literal ask, and was transparent about scope boundaries rather than either over- or under-delivering silently.
**Weaknesses:** Unverified visually — the single biggest honesty gap in this whole project, repeated again here because the sandbox constraint hasn't changed.
**What would strengthen this:** Actually seeing the rendered page. This should be the first thing checked once this branch is viewable in a real browser.

## QA Checklist
- [x] Typography, monospace timeline, and trust-badge fixes all implemented and type-checked
- [x] Fabricated stats found and corrected, not just noted
- [x] Scope boundaries (what wasn't touched) explicitly documented
- [ ] Visual verification — **not done, sandbox limitation, flagged not hidden**

## Score: 6/10
Solid, honest work with a genuine unplanned catch (fabricated badges) — held back from a higher score by the still-unresolved visual-verification gap, which is the single most important thing to check before this goes further.

---
Awaiting your approval to proceed to Phase 9 (Homepage Development / component-by-component QA).
