# ZmaxLab Component Library
**Status:** v1 — specs follow `DESIGN_SYSTEM.md` tokens and the "Approachable Precision" direction.
**Note on current build:** Several of these components already exist in the codebase (Navigation, Hero, Buttons, Cards, Testimonials, Footer, FAQ-adjacent content, Contact Form) and are noted as "Exists — spec below documents current state" vs. genuinely new components noted as "Not yet built."

Each entry: **Spec** (visual/behavioral) + **Why it builds trust/conversion**.

## Navigation
**Exists** (`Navbar.tsx`, `tubelight-navbar.tsx`) — pill-style nav, solid blue active state, light background.
**Why it works:** Flat, short nav (6 items) signals "you don't need a map to understand this business" — appropriate for a focused, single-offer company; a sprawling nav would undercut the plain-spoken positioning.

## Mega Menu
**Not built, not recommended.** ZmaxLab sells one core offer with optional add-ons — a mega menu implies a large multi-product catalog it doesn't have. Building one would be a Concept-2-style "look bigger than you are" mismatch. Skip unless the service line genuinely expands.

## Hero
**Exists** (`HomePage.tsx` hero section) — plain headline, single accent word, honest `SitePreview` mockup instead of fabricated dashboard.
**Why it works:** Leads with the provable claim (NPI-registered practitioners, $500/7-day) before any proof — matches Phase 5's validated content hierarchy.

## Buttons
**Spec:** Primary = solid blue fill, white text, rounded pill, no gradient. Secondary = outline, blue text/border, transparent fill. Tertiary = text-only with underline-on-hover. No button ever uses a gradient fill (reserved exclusively as a "look bigger than you are" red flag per the design direction analysis).
**Why:** Consistent, unambiguous primary-action hierarchy reduces decision friction on every page.

## Cards
**Exists** (`GlowCard`/`spotlight-card.tsx`) — soft shadow, hairline border, white fill.
**Spec addition:** Standardize corner radius at 14px across all card types (service cards, testimonial cards, blog cards) — currently close but not verified identical across every instance.
**Why:** Visual consistency across card types signals a systemized, professionally-built product rather than assembled-from-parts.

## Pricing
**Not yet built as a dedicated component** (pricing currently inline in Services/Home). Per Phase 4, deserves its own page/component.
**Spec:** Single flat-price card (not a 3-tier pricing table — a tiered table would imply options ZmaxLab doesn't currently offer and could look like upsell pressure). Include: price, what's included (bullet list), delivery timeline, "no contract" badge, single CTA.
**Why:** A single honest price card, versus an artificially tiered table, matches "no games, no upsell pressure" positioning directly.

## Testimonials
**Exists** (`HomePage.tsx` carousel) — now labeled illustrative per this session's fix.
**Spec, once real testimonials exist:** Real name + practice name + city/state (with permission), photo if available, specific (not vague) outcome quote, no invented percentages unless the client provides and confirms a real number.
**Why:** This is the single highest-leverage trust component per Phase 1/2 — currently the weakest link precisely because it can't yet do its job.

## Timeline / Process Timeline
**Partially exists** (How It Works page). **Spec addition:** render the 7-day delivery timeline with the monospace "Day 1 → Day 7" treatment recommended in the design direction doc — ties directly to the "engineered, not templated" differentiator.
**Why:** A visible, specific timeline is more convincing than a vague "fast turnaround" claim — specificity is a trust lever throughout this whole project's findings.

## FAQ
**Not yet built as a dedicated component.**
**Spec:** Accordion, single-open-at-a-time, plain-language questions phrased the way a real prospect would ask them (not SEO-keyword-stuffed phrasing) — consistent with Phase 3's "sound like a specialist explaining things to a peer" tone rule.
**Why:** Answers objections before Contact, reducing friction at the highest-intent step of the funnel identified in Phase 5.

## Case Study
**Not yet built — deliberately deferred per Phase 4** until real clients exist.
**Spec (for later):** Problem → what was built → specific, real outcome (only if verifiable) → client quote. No case study should ever use a percentage figure that can't be sourced to something the client confirmed.
**Why:** This is the component that closes the biggest gap identified across every phase of this project — but only once it can be built honestly.

## Statistics
**Exists** (`Counter` component, stats strip) — currently uses process facts (delivery days, etc.), not fabricated outcome metrics.
**Why:** Keep this distinction rigid — stats about ZmaxLab's own process (verifiable) are fine; stats implying client outcomes (currently not verifiable) are not, per Phase 3 guardrails.

## Contact Form
**Exists** (`ContactPage.tsx`).
**Spec:** Keep fields minimal (name, email, practice type, message) — a long form at the highest-intent step actively loses conversions. Not independently re-audited for field count this pass.
**Why:** Every additional required field is friction at the exact moment a prospect has decided to act.

## Footer
**Exists** (`Footer.tsx`) — intentional dark band, distinct from the rest of the light site.
**Why:** A dark footer against a light site is a common, well-understood pattern (signals "end of page") and doesn't conflict with the light-mode brand decision (D1) since it's a small, deliberate exception, not a competing theme.

## Blog Cards / Industry Cards / Service Cards
**Blog cards:** not yet built (no `/blog` index page yet, per Phase 4). **Service cards:** exist (`ServicesPage.tsx`). **Industry cards:** exist as `SPECIALTIES` cards on the homepage; a dedicated `/industries` page was deferred per Phase 4.
**Shared spec:** consistent card treatment (see Cards above) across all three so a user doesn't consciously notice "these are three different card systems."
**Why:** Consistency reduces cognitive load and reinforces "one coherent product," not a patchwork site.

## Icons
**Spec:** `lucide-react`, 1.5-2px stroke line icons, no filled icons except inside soft-tinted badge backgrounds for feature/benefit callouts (per the "Approachable Precision" concept). No duotone, no 3D/illustrated icon sets.
**Why:** Consistent icon weight across the whole site is a small but noticeable signal of design discipline.

## Badges / Tags
**Exists** in various forms (trust badges, specialty tags). **Spec:** standardize to soft-tinted background (10-15% opacity of the relevant color) + solid text in that color + no border, OR solid-fill + white text for higher-emphasis badges (e.g. "7-Day Delivery") — currently a mix of approaches across pages, worth normalizing in Phase 8.
**Why:** Two clear badge tiers (soft = informational, solid = emphasis) let users learn the visual language quickly instead of parsing each one individually.

## Input Fields
**Spec:** 1px border (`T.border`), 8px radius, blue border + subtle glow on focus, clear error state in rose with inline message beneath the field (not just a red border).
**Why:** Clear, immediate validation feedback reduces form abandonment at the highest-intent conversion point.

## Dropdowns
**Not extensively used currently.** **Spec if needed:** match input field styling, chevron icon rotates on open, no native browser default styling.
**Why:** Consistency with the rest of the form system.

## Accordions
**Recommended primarily for FAQ** (see above). **Spec:** plus/chevron icon rotates on expand, smooth height transition (~0.3s), only one section open at a time on mobile to avoid excessive scrolling.

## Tabs
**Not currently used.** Low priority — ZmaxLab's content doesn't yet have enough depth per section to need tabbed organization; premature to spec in detail.

## Breadcrumbs
**Not currently used.** Worth adding once `/blog` has multiple posts and `/pricing` exists, for SEO/internal-linking reasons flagged in Phase 4 — simple text-based, blue links, current page in muted ink, non-clickable.

## Pagination
**Not currently needed** — no list views exist yet (blog index doesn't exist yet per Phase 4). Spec once `/blog` has enough posts: simple numbered or "load more" pattern, not critical to decide now.

## Tables
**Exists** in `BlogPage.tsx` (comparison table, header already fixed to solid blue/white this session for contrast). **Spec generally:** zebra-striped rows using `rgba(11,18,32,0.03)`, header row solid blue/white text, never white-text-on-light-background (the exact bug fixed this session).

## Animations
See `DESIGN_SYSTEM.md` → Motion Guidelines. No component-specific exceptions beyond what's documented there.

## Spacing / Grid / Responsive Rules / Dark Mode / Light Mode / Accessibility Rules / Motion Guidelines
Documented centrally in `docs/DESIGN_SYSTEM.md` rather than repeated per-component — every component above inherits those rules rather than defining its own.
