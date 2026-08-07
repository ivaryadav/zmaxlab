# Brand Guidelines (working draft)

Source of truth in code: `src/lib/theme.ts`

## Color
| Token | Hex | Use |
|---|---|---|
| bg | #FFFFFF | Page background |
| surface | #F6F8FB | Alternate section background |
| border | rgba(11,18,32,0.09) | Hairline borders |
| text / ink | #0B1220 | Primary text |
| muted | rgba(11,18,32,0.60) | Secondary text |
| blue (primary) | #1D4ED8 | Primary accent — CTAs, links, active states |
| violet (used as deep navy) | #0B2E7A | Secondary shade for gradients/depth, not a separate hue family |
| cyan (teal) | #0E7C86 | Secondary accent — icons, tags |
| green | #0E9F6E | Success / positive indicators |
| amber | #F5A524 | Star ratings only |

Rule going forward: one primary accent (blue) does the heavy lifting. Teal/green/amber are supporting, not equal, colors — avoid sliding back into a 5-color rainbow per section.

Footer is an intentional exception: dark navy (#0B1220) band for contrast, consistent with the logo mark's existing dark-glass styling.

## Typography
- Headings: Space Grotesk / system bold, weight 800-900
- Body: Inter / Geist Variable, weight 400-600
- No changes made to font families this pass — carried over from original build

## Voice (per user instruction 2026-08-08)
- Professional, SEO-specialist tone — not salesy
- No unverified percentage claims or fabricated metrics
- No manufactured urgency/scarcity
- Direct, benefit-clear headlines over cute/hype wordplay
- Still warm and specific — not corporate-generic

## Not yet formalized
- Spacing/type scale as explicit tokens (currently ad hoc clamp() values per component)
- Icon usage guidelines
- Photography/imagery direction (currently no real photography in use — see COMPETITOR_ANALYSIS.md gap)
