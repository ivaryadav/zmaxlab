# Design & Content Decisions Log

## D1 — Move from dark cosmic theme to light, trust-first palette
**Why:** User flagged the site "doesn't look professional." Competitor review (Intrepy, NKP Medical, NP Igniter) showed every credible healthcare-marketing competitor uses light/white backgrounds, one restrained accent color, and real content — not dark mode with purple/cyan gradients and particle effects, which reads as a generic AI/SaaS-startup template rather than a healthcare vendor.
**Alternatives considered:** Keep dark theme but tone down gradients. Rejected — the dark cosmic aesthetic itself was the core mismatch, not just its intensity.

## D2 — Remove the fabricated "Practice Dashboard" hero mockup
**Why:** The original hero showed invented analytics (Revenue $8.4k +41%, New Patients 47 +23%) with no basis in real data. This is a credibility risk (unverifiable/fabricated metrics) and doesn't even represent the actual product (a website). Replaced with an honest browser-frame preview of a real site layout plus two true claims (7-day delivery, built personally by Ravi).

## D3 — Remove fake urgency ("only 3 slots remaining")
**Why:** Static, always-on scarcity claims are a known low-trust pattern once a visitor notices it never changes. Replaced with an honest, still-actionable message (free 20-minute demo, no obligation).

## D4 — Soften testimonial results and the before/after case study
**Why:** Original testimonials attributed extreme, round percentage gains (+633% bookings, +642% traffic, "$10k premium") without any source data. Re-labeled the case-study section as an "illustrative example" instead of implying verified client data, and rewrote testimonial quotes to plausible, non-quantified claims.

## D5 — Rewrite hero headline and CTA copy to remove hype language
**Why:** User explicitly requested professional, non-salesy, SEO-specialist-appropriate copy. Replaced "Turn Your Practice Into a Patient-Generating Machine" and "Your Next Patient Is Searching for You Right Now" with direct, keyword-forward, benefit-clear copy.

## D6 — Fixed 7-day vs 48-hour delivery inconsistency
**Why:** Hero copy said "48-hour delivery" while every other page (FAQ, guarantee copy) says 7 days. Standardized on 7 days, which matches the actual guarantee terms.

## D7 — Kept the existing GitHub + FTP + webhook deploy pipeline unchanged
**Why:** Out of scope for this pass, and it already works. Redesign was done on a separate branch (`redesign/professional-trust`) specifically so nothing goes live without explicit approval, since pushing to `main` auto-deploys via GitHub Actions and a server-side webhook.

## D8 — Did not touch pricing, service structure, or business positioning
**Why:** Not requested. Redesign is visual/copy-tone only; the underlying offer ($500 flat fee, monthly add-ons) is unchanged.

## D9 — Testimonials stay illustrative for now, explicitly labeled
**Why:** No real client logos, quotes, or case studies exist yet (confirmed with Ravi). Decision: keep placeholder testimonials but ensure they're framed as representative/illustrative rather than implying verified reviews, until real client proof is available. Revisit once real clients can be showcased.
