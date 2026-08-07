# ZmaxLab Design System
**Status:** v1 — foundational tokens and rules
**Visual direction:** "Approachable Precision" (see `docs/design/DESIGN_DIRECTION_EXPLORATION.md`) — pending your confirmation before component-level work (Phase 8) treats it as final.

## Design Tokens (current, in `src/lib/theme.ts`)
```
bg: #FFFFFF        surface: #F6F8FB     card: #FFFFFF
border: rgba(11,18,32,0.09)   borderStrong: rgba(11,18,32,0.14)
text/ink: #0B1220   muted: rgba(11,18,32,0.60)   faint: rgba(11,18,32,0.40)
blue (primary): #1D4ED8   violet: #0B2E7A   cyan: #0E7C86
green (success): #0E9F6E   amber (warning): #F5A524   rose (error): #DC2626
shadowSm / shadowMd / shadowLg — layered elevation, all soft/diffuse, no hard drop shadows
```

## Proposed additions (pending direction confirmation)
- `emerald` (#10B981-class) reserved strictly for success/verified states — checkmarks, "delivered on time," completed steps. Not a general accent.
- `mono` font token for technical/data callouts (delivery timeline, stats) — see Typography.

## Typography Scale
**Current:** system-default sans, ad hoc `clamp()` sizing per section, no documented scale.
**Recommended:**
- Headline: **Manrope** or **Plus Jakarta Sans**, weights 700/800/900
- Body: **Inter**, weights 400/500/600
- Technical/data accents: a monospace face (e.g. JetBrains Mono or system mono) for numbers like delivery-day counters and stats — used sparingly, not for body copy
- Scale (rem, desktop): Display 3.5-4rem / H1 2.5-3rem / H2 1.75-2.25rem / H3 1.25-1.5rem / Body 1rem / Small 0.875rem — all with `clamp()` for mobile down-scaling, replacing today's per-instance ad hoc values

## Color System Rules
- One primary accent (blue) drives all interactive elements (links, buttons, active states).
- Violet/cyan reserved for illustrative/secondary category tags (e.g. specialty badges) — never for primary CTAs.
- Green/emerald reserved for success/verified states only — this is a hard rule, not a suggestion, because diluting it into a general accent removes its meaning as a trust signal.
- Amber for caution/attention states only (e.g. "limited availability" if ever genuinely true — never for manufactured urgency, per Phase 3 guardrails).
- Rose for error/destructive states only (form validation, etc.).

## Spacing & Grid
**Current:** inline pixel values per component, no shared scale — flagged as a gap in Phase 1.
**Recommended 8px-based scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 — every margin/padding value in the codebase should map to one of these rather than arbitrary values (e.g. today's occasional 18px, 22px, 28px one-offs).
**Grid:** 12-column, max content width 1200px, gutter 24px (16px on mobile).

## Responsive Rules
- Breakpoints: mobile <640px, tablet 640-1024px, desktop >1024px.
- Typography and spacing scale down via `clamp()`, not discrete breakpoint overrides, to avoid jarring jumps (current approach — keep it).
- Navigation collapses to a simplified mobile pattern below 768px (verify actual current mobile nav behavior in Phase 8 — not independently confirmed this pass per Phase 1's sandbox limitation).

## Dark Mode / Light Mode
Site is light-mode only by design decision (D1 in DECISIONS.md) — the prior dark theme was identified as the core "doesn't look professional" complaint. No dark-mode toggle is planned; this is a deliberate scope exclusion, not an oversight.

## Accessibility Rules
- Minimum body text contrast: 4.5:1 against background (needs a real audit to confirm current compliance — flagged open in Phase 1/QA_CHECKLIST.md).
- All interactive elements need a visible focus state (not yet audited).
- Icons paired with text labels, not icon-only buttons without `aria-label` (spot-checked in nav/WhatsApp button, not exhaustively audited).
- Color must never be the only signal (e.g. success/error states need an icon or label, not just green/red).

## Motion Guidelines
- Scroll-reveal fade/slide only, ~0.4-0.6s ease-out — matches current `fadeUp` pattern in the codebase, keep it.
- No auto-playing looping animation competing with reading (previous particle-field hero background was removed for this reason — D2 in DECISIONS.md).
- Hover states: subtle lift/shadow increase on cards, no scale-bounce or elastic easing — consistent with the "Approachable Precision" direction, not the more playful "Studio Warmth" concept.
- Respect `prefers-reduced-motion` — not yet verified as implemented; flag for Phase 8/accessibility pass.

## Elevation
Three tiers only (`shadowSm`, `shadowMd`, `shadowLg`) — all soft/diffuse per the existing tokens. No hard drop shadows, no colored shadows, at any tier.
