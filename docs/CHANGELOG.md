# Changelog

## 2026-08-08 — Redesign pass (branch: redesign/professional-trust)

### Visual
- Replaced dark theme (#04060f / #07091f backgrounds, purple-cyan gradients, particle field) with light theme (white/off-white surfaces, single navy-blue accent, teal/green secondary)
- New shared design tokens: `src/lib/theme.ts`
- Rebuilt Navbar, Footer (now an intentional dark navy band for contrast), WhatsApp/booking button
- Removed tsparticles star-field background from homepage hero
- Replaced fabricated "Practice Dashboard" hero graphic with an honest browser-frame site preview
- Fixed Privacy/Terms pages: headings and body text were white-on-white (leftover from incomplete dark-theme styling)

### Copy
- Rewrote homepage H1 and subhead (removed "Patient-Generating Machine" framing)
- Rewrote Services page H1 (removed "dominate local search")
- Rewrote final CTA section (removed "Your Next Patient Is Searching for You Right Now" / competitor fear framing)
- Rewrote all 5 testimonials — removed unverified extreme percentage claims, kept plausible qualitative outcomes
- Re-labeled "Real Numbers. Real Practices." case study as an illustrative example, softened figures
- Fixed 48-hour vs 7-day delivery inconsistency (standardized on 7 days)
- Softened "Zero No-Shows" → "Fewer No-Shows", "Rank #1 Locally" → "Local Visibility"
- Removed fake urgency banner ("only 3 onboarding slots remaining")
- Tightened How It Works meta title

### Bugs fixed
- Animated stat counters (500+, 127%, 4.9★, 48hr) rendered as "0" in prerendered/no-JS HTML — now show correct value immediately, animate on scroll for JS users
- Comparison table header in blog post had white text on a background that would have gone light-on-light after the theme change — fixed to solid blue header row

### Not changed
- Pricing, service list, business copy/offer structure
- Sitemap / page structure / routing
- Deploy pipeline (GitHub Actions + FTP + webhook)
