# Phase 9 — Homepage Development / Component QA
**Status:** Complete — awaiting approval
**Date:** 2026-08-08

## Summary
This phase went component-by-component looking for exactly the kind of issue found in Phase 8 (the trust badges). It found more of the same problem, fixed it, then a new real photo/video asset library was connected mid-phase — reviewed a sample of it and found two assets that shouldn't be used as-is.

## Critical finding: more fabricated numbers, missed by Phases 1, 7, and the original de-hyping pass
Beyond the trust badges fixed in Phase 8, two more places on the homepage had unverified/fabricated numbers:
1. **Hero stats strip (`STATS` array):** claimed "500+ Healthcare Sites Built," "127% Avg Traffic Increase," "4.9★ Google Rating Average," and "48hr Avg Site Delivery Time" (the last one also contradicted the 7-day delivery claim used everywhere else — the D6 fix that supposedly resolved this inconsistency didn't reach this array). **Fixed:** replaced with four true, verifiable facts about ZmaxLab's own offer — $500 flat fee, 7-day delivery, 100% custom-coded, 8+ specialties supported (a real count of the specialty cards on the page itself).
2. **Specialty cards (`SPECIALTIES` array):** each of 6 specialty categories claimed a specific client count ("200+ NPs served," "80+ PAs served," "95+ providers," "60+ dentists," "70+ clinics," "45+ therapists") — all fabricated, none verifiable, directly contradicting the "no real clients yet" fact established since Phase 1. **Fixed:** replaced with qualitative positioning descriptors (e.g. "Credential-First Design," "Local Search Focus") matching the pattern already used correctly on the other 2 cards ("Groups welcome," "Premium positioning").
3. **AI Tools section:** three feature descriptions cited specific, uncited industry statistics ("68% of patients Google their symptoms," "87% of patients read reviews," "72% won't consider below 4 stars," "$150 per missed visit") — plausible-sounding but unsourced, which fails the Phase 3 brand rule as written ("every claim should be something Ravi could defend if asked 'how do you know that'"). **Fixed:** softened to qualitative claims that don't cite unverifiable precise figures.

**Why this matters:** this is the second round of catching this exact class of problem in as many phases. Phase 1's audit and Phase 7's copy review both scored the site reasonably well without catching any of this — meaning line-by-line numeric-claim scanning wasn't actually part of either of those reviews, despite the write-up implying general coverage. Noting this honestly rather than letting Phase 9's catch imply Phases 1/7 were more thorough than they were.

## New input mid-phase: real photo/video asset folder connected
Ravi connected a folder ("ZmaxLab Website images and videos") — 30 JPGs + 10 MP4s, sourced from Pexels (stock, not real ZmaxLab clients). This is useful for closing the "zero photography" gap flagged in `DESIGN_SYSTEM.md`'s mood board, but is a **different** gap than "real client proof" — using stock photos doesn't and shouldn't be presented as client photos.

**Sampled 4 of 30 images for a quality/appropriateness check before recommending any site use:**
- `pexels-tima-miroshnichenko-5452202.jpg` — high-quality B&W clinician portrait, generic, no identifying business branding. **Usable.**
- `pexels-laura-james-6097773.jpg` — clinician detail shot (stethoscope, gloved hands, phone). Generic. **Usable.**
- `pexels-recovery-sport-center-2147880161-29807423.jpg` — **Not usable as-is.** Visible signage reads "[RE]COVERY [SPOR]T CENT[ER]" and a shirt logo reading "RSC / RECOVERY SPORT..." — this is a real, identifiable third-party business, not generic stock. Using it on ZmaxLab's site risks implying a false association with that specific business.
- `pexels-gustavo-fring-7447006.jpg` — clinical photo involving a child patient. Recommending against use: not a strong topical fit for ZmaxLab's actual audience (NP/PA/mental-health/dental/chiro/PT — general adult-practice focus, not pediatrics), and photos of identifiable minors in a medical context warrant extra caution for a business's marketing use regardless of stock-license terms.

**This means the remaining 26 images and 10 videos need the same individual check before any of them go on the site** — not a bulk import. Flagging this as real, necessary work rather than doing a fast bulk integration that could repeat the "Recovery Sport Center" mistake at scale.

## Component QA (remaining homepage sections, quick pass)
- **Hero, Navbar, Footer:** No new issues found this pass — already covered in Phase 8.
- **Site Preview mockup:** Still illustrative-by-design (intentional, not real) — no numeric claims inside it, no issue.
- **Before/After section:** Already labeled illustrative (Phase 1 fix) — verified label still present after Phase 8 edits, no regression.
- **Testimonials:** Already labeled illustrative (this session's earlier fix) — verified still present, no regression.
- **Process Timeline:** Now uses the monospace day-range treatment from Phase 8 — verified consistent across all 4 steps.
- **Sticky CTA / Final CTA:** No numeric claims, no issues found.

## Strengths
- Caught a second, larger wave of the same fabrication problem instead of assuming Phase 8's fix was the whole issue — this is what a real QA pass should do.
- Caught a real, specific risk (third-party business branding in a stock photo) before any image made it into the codebase, not after.
- Explicitly distinguished "stock photography helps" from "stock photography solves the real-client-proof gap" rather than conflating the two.

## Weaknesses
- Only 4 of 30 images were reviewed — a 13% sample. The finding that 2 of 4 sampled images had real, disqualifying problems (50% of the sample) suggests the full library needs a full review, not a spot-check, before any bulk use.
- This phase, like Phase 1 and Phase 7, could still be missing other instances of the same fabricated-numbers pattern elsewhere in the codebase (Services/About/Contact/HowItWorks pages were not swept this pass — out of this phase's homepage scope, but worth flagging as a real open risk given the pattern found here).

## Risks
- **Highest priority open risk:** other pages (Services, About, Contact, How It Works) have not been checked for the same fabricated-stat pattern found on the homepage. Given how much was found here, this should not be assumed clean.
- Full photo/video library (26 remaining images, 10 videos) is unreviewed — recommend nothing gets used sitewide until checked.

## Recommended Improvements
- Run the same fabricated-numbers sweep across Services, About, Contact, and How It Works pages before considering this project's honesty pass complete.
- Full review of the remaining 36 media assets before any are added to the site, following the same check applied to the 4 samples (real business branding, minors, quality, topical fit).

## Self-Review
**Strengths:** Found real, previously-missed problems in both the copy (numbers) and the new media (branding/minor) rather than treating either as a rubber stamp.
**Weaknesses:** Sample size on the photo library is small; the fabricated-numbers problem recurring a second time after two prior "clean" reviews (Phase 1, Phase 7) is a real process gap, not just a one-off miss.
**What would strengthen this:** A dedicated, exhaustive pass — every number on every page checked against a source, every media asset checked individually — rather than continuing to find these incrementally, phase by phase.

## QA Checklist
- [x] All homepage components reviewed
- [x] Second wave of fabricated numbers found and fixed, not just the Phase 8 instance
- [x] New media library sampled and risk-checked before recommending use
- [ ] Full media library reviewed — **not done, flagged as necessary follow-up**
- [ ] Other pages checked for the same fabricated-numbers pattern — **not done, flagged as the highest-priority open risk**

## Score: 6/10
Real, valuable catches this phase — but two significant items are explicitly unfinished (full media review, other-pages numbers sweep), and honestly reporting that keeps the score from being inflated.

---
This closes the Homepage-specific phase sequence (Phases 5-9). Before repeating this process for other pages (About, Services, Industries, Blog, Contact, per the original methodology), recommend prioritizing the two open risks above.
