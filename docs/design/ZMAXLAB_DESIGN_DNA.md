# ZmaxLab Design DNA
**Date:** 2026-08-08
**Purpose:** Formal synthesis reconciling this latest creative-director brief with the direction already locked in D10/DECISIONS.md ("Approachable Precision" + 3 borrows). This doc confirms the two are consistent, not competing, and adds the specific per-site "take this from it" mapping requested.

## Confirmed blend ratio: ~70% premium B2B SaaS / 20% healthcare trust signals / 10% ZmaxLab-specific identity
This matches the conclusion already reached independently in `docs/design/COMPETITOR_UI_BENCHMARK.md` ("position ZmaxLab visually closer to the SaaS cluster... with accessibility and credential-specificity held to healthcare's higher bar as the one deliberate exception") — the 70/20/10 framing here is a more precise version of the same call, not a change of direction.

## Per-site "take this, not that" mapping
| Source | Take | Explicitly not taking |
|---|---|---|
| **Stripe** | Layout discipline, generous spacing, enterprise-grade polish through restraint, not decoration | Stripe's docs-heavy density (not needed for a single-offer marketing site) |
| **Linear** | Minimalism, typography-led hierarchy, confident dark-on-light contrast | Linear's dark-mode-first aesthetic (ZmaxLab is light-mode only per D1) |
| **Vercel** | Technical credibility cues, clean grid structure, performance-as-a-feature framing | Developer-tool-specific UI patterns (terminal aesthetics, code blocks) — wrong register for this audience |
| **Webflow Enterprise** | Structured enterprise marketing flow (problem → solution → proof → CTA) | Multi-product mega-navigation (ZmaxLab sells one offer) |
| **Framer** | Motion restraint and premium feel in transitions | Framer's more playful/illustrated visual flourishes — slightly too "creative agency," less "clinical-adjacent competence" |
| **Innovaccer / Health Catalyst** | The *idea* of healthcare-specific credibility signaling (compliance language, verification cues) | Their literal navy/dashboard enterprise visual language — wrong buyer, per Design Direction Exploration doc |
| **Mayo Clinic / Cleveland Clinic** | Institutional accessibility rigor as a bar to hold ZmaxLab to | Their dense, multi-audience information architecture (ZmaxLab serves one narrow audience) |
| **Apple** | Simplicity, one idea per screen, storytelling through restraint | Apple's product-hero photography scale (not applicable without a physical product) |
| **Notion** | Clear information architecture, friendly-but-competent tone | Notion's playful illustration style — slightly too casual for a health-adjacent purchase |
| **HubSpot** | Conversion-focused, unambiguous CTA placement | HubSpot's denser, more sales-heavy page structure |
| **Clay / Ramotion** | (Not independently reviewed this pass — noted rather than guessed at, consistent with this project's standing rule not to assert unverified specifics) | — |

## How this maps to what's already been decided
The "Approachable Precision" direction (D10) already embodies this blend: it's structurally SaaS-cluster (Notion/Linear-adjacent softness, Stripe-adjacent spacing discipline), borrows healthcare-appropriate rigor narrowly (accessibility bar, credential specificity — the 20%), and layers ZmaxLab-specific identity through brand voice and the founder-built story rather than through visual flourish (the 10%). **No change of direction is needed** — this brief refines and confirms it rather than replacing it.

## Mood board (condensed, per the requested Step 2 format)
- **Visual direction:** Confident minimalism with warmth — SaaS-clean, not clinical-cold.
- **Color palette:** Blue #1D4ED8 (primary), ink #0B1220 (text), surface #F6F8FB (section tint), emerald reserved strictly for verified/success states, amber for caution/disclaimers, rose for errors only.
- **Typography:** Manrope or Plus Jakarta Sans (headings) + Inter (body) + monospace accent for timeline/data specifics.
- **Card styles:** 14px radius, hairline border, soft diffuse shadow (no hard drop shadows).
- **Button styles:** Solid-fill pill for primary, outline pill for secondary, no gradients ever.
- **Border radius:** 8px (inputs/badges) / 14px (cards) / 999px (pills/buttons).
- **Shadows:** Three tiers only (sm/md/lg), all soft and diffuse.
- **Icon style:** Line icons (lucide-react), 1.5-2px stroke, no duotone/3D.
- **Illustration style:** None — real photography preferred over illustration once available; honest mockups (like the current SitePreview) in the meantime.
- **Photography style:** Real, unposed-feeling clinical/practice environments once available — never generic stock-photo-handshake imagery.
- **Motion language:** Scroll-reveal fade/slide only, ~0.4-0.6s ease-out, no looping/auto-play motion, respect reduced-motion preference.

This mood board is fully covered by the already-created `docs/DESIGN_SYSTEM.md` and `docs/COMPONENT_LIBRARY.md` — this section exists to answer the brief's Step 2 explicitly, not to introduce new specs.

## Status: confirmed, proceeding to implementation
Since D10 already locked this direction and it's fully consistent with this brief's 70/20/10 framework, I'm proceeding directly into Phase 8 implementation (homepage) rather than re-running the approval gate for the same decision twice.
