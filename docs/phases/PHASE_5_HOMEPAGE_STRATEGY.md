# Phase 5 — Homepage Strategy
**Status:** Complete — awaiting approval
**Date:** 2026-08-08

## Framing note
Same situation as Phase 1: the homepage itself was already built (on `redesign/professional-trust`) before this formal phase structure existed. This phase defines what the homepage's strategy *should* be, then checks the existing build against it — rather than pretending to design a homepage from a blank page. Where the built homepage matches the strategy, I say so; where it doesn't, I flag it as a real gap.

## Goal
Primary goal: get a qualified visitor (a solo NP or small-practice owner actively considering a new website) to book a free demo call. Secondary goal: if they're not ready to book, leave with a clear, accurate understanding of price, timeline, and what's included — so they can return later without needing to re-research from scratch.

## Audience
Primary: solo nurse practitioners and small independent healthcare practices (1-3 providers) opening a new practice or replacing an outdated/template site. Secondary: adjacent specialties covered in the `SPECIALTIES` section (chiropractic, etc.). This audience is price-sensitive relative to full agencies, time-constrained (running a practice, not shopping for web vendors as a full-time job), and — per Phase 2 — comparison-shopping against both cheaper template vendors and pricier full-service agencies.

## Primary / Secondary CTA
- **Primary CTA:** "Book a free demo call" (appears in hero, sticky bar, and final CTA section) — matches the brand's low-pressure, no-obligation tone from Phase 3.
- **Secondary CTA:** Implicit — scroll/explore path through Specialties → Site Preview → Process → Testimonials → Pricing context, for visitors not ready to commit to a call yet.
- **Assessment:** Current build matches this. One gap: there's no lightweight secondary conversion option (e.g., "see full pricing" or "view the process" as a distinct secondary button next to the primary CTA) — right now everything funnels to the same single CTA, which is fine but offers no lower-commitment next step for a hesitant visitor.

## Conversion Funnel
```
Hero (value prop + primary CTA)
  → Trust badges (7-day delivery, founder-built)
  → Specialties (relevance check: "is this for someone like me?")
  → Site Preview mockup (what do I actually get?)
  → Stats/Counters (quick credibility signals)
  → Before/After example (labeled illustrative, per Phase 1 fix)
  → AI Tools section (differentiation/modern-capability signal)
  → Testimonials (labeled illustrative, per this session's quick win)
  → Final CTA (book a demo)
  → Sticky CTA bar (persistent, low-pressure)
```
**Assessment:** This funnel order is sound and matches standard trust-building sequence (relevance → proof → proof → ask). The one structural weakness, consistent with every earlier phase's finding, is that two of the "proof" steps (Before/After, Testimonials) are illustrative rather than real — the funnel's shape is right, but two of its steps aren't yet doing real trust-building work.

## Trust Journey
Per Phase 3's ranked differentiators, the trust journey should lead with what's provable (price, timeline, founder-built specificity) before leaning on what isn't yet (illustrative proof). Reviewing the current homepage order: trust badges and specialty-relevance content appear early (provable claims), while the illustrative testimonials/before-after content appears later in the scroll — this ordering is actually already correct (provable claims first, illustrative content clearly labeled second) rather than something that needs reordering.

## Content Hierarchy
1. What is this, who is it for (Hero + Specialties)
2. What do I get (Site Preview)
3. Quick proof (Stats/Counters — these are framed as process facts like delivery time, not fabricated outcome metrics, so they're fine as-is)
4. Deeper proof, clearly labeled as illustrative (Before/After, Testimonials)
5. Ask (Final CTA + Sticky bar)

This hierarchy is sound and consistent with the brand strategy. No restructuring recommended.

## Strengths
- The already-built homepage matches the ideal strategy defined here closely — validates that the earlier fast-pass redesign work, despite happening out of formal sequence, was directionally correct.
- Trust-journey ordering (provable claims before illustrative ones) was already right without this phase having existed yet when it was built — good sign the underlying judgment was sound.

## Weaknesses
- No secondary, lower-commitment CTA exists alongside the primary one — every path funnels to the same ask.
- Two funnel steps (Before/After, Testimonials) are structurally present but not yet doing real trust-building work, per every earlier phase's finding — this phase doesn't introduce a new problem, just reconfirms the existing one from this new angle.

## Risks
- Because this phase is retrospective (validating existing work rather than designing fresh), there's a risk of confirmation bias — rating the existing build favorably because it already exists rather than critiquing it as hard as a from-scratch strategy phase would. I've tried to counter this by still flagging the secondary-CTA gap and re-surfacing the illustrative-proof issue rather than declaring the homepage "done."

## Recommended Improvements
- Add a low-commitment secondary CTA (e.g., "See pricing" linking to the Phase-4-recommended `/pricing` page once it exists) alongside the primary "Book a demo" CTA, giving hesitant visitors a next step short of a call.
- No other structural homepage changes recommended at this time — the real remaining gap (illustrative proof) is a business-data problem, not a strategy or layout problem, and is already tracked from Phase 1/2.

## Self-Review
**Strengths:** Honest about the retrospective nature of this phase and actively works against confirmation bias rather than rubber-stamping existing work.
**Weaknesses:** Being retrospective is a genuine limitation — a from-scratch strategy phase might have surfaced structural issues that are harder to see once a specific build already exists and looks reasonable.
**What would strengthen this:** Real user testing or session-recording data on the actual homepage, once live, to validate the funnel/hierarchy against real behavior instead of judgment alone.

## QA Checklist
- [x] Goal, Audience, Primary/Secondary CTA, Conversion Funnel, Trust Journey, and Content Hierarchy all addressed
- [x] Existing build explicitly checked against the strategy rather than assumed correct
- [x] At least one concrete gap identified (secondary CTA) rather than declaring the homepage flawless
- [x] Confirmation-bias risk named explicitly given the retrospective framing

## Score: 7/10
Sound strategy, honestly checked against a real build; docked for the inherent retrospective-validation limitation rather than a from-scratch design process.

---
Awaiting your approval to proceed to Phase 6 (Homepage Wireframe).
