# QA Checklist

## Done this pass
- [x] `tsc -b` — clean, no type errors
- [x] `vite build` — clean production build
- [x] Manual review of every changed file for leftover dark-theme literals (rgba(255,255,255,...), #04060f, #07091f, #f1f5f9)
- [x] Verified no white-on-white / invisible-text regressions (caught and fixed on Privacy/Terms)

## Not yet done (flagging honestly, not marking as complete)
- [ ] Real browser visual QA — no headless browser available in this sandbox (network-restricted, can't download Chrome/Puppeteer binary); only a static HTML preview and code-level review were possible. **Recommend an actual click-through in a real browser before merging to main.**
- [ ] Mobile viewport testing
- [ ] Accessibility pass (contrast ratios, keyboard navigation, screen reader labels)
- [ ] Cross-browser check (Safari/Firefox rendering of gradients, backdrop-filter)
- [ ] Lighthouse / Core Web Vitals on the new build
- [ ] Form submission still works end-to-end (Contact page untouched functionally, but not re-tested)
- [ ] Link check across all pages post-copy-changes
