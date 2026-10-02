# Full audit report - 2026-10-02

Companion: [ACTION-PLAN-2026-10-02.md](./ACTION-PLAN-2026-10-02.md)
Branch: `claude/intelligent-ramanujan-a90u3o` (base `main` at d3a345d). Method: read-only audit of source plus the built output in `.next/server/app` (all 67 prerendered pages parsed for canonicals, robots, titles, descriptions, JSON-LD, alt text, internal links, image files, dashes and exclamation points).

## Executive summary

The site is in good technical shape. Build exits 0, lint exits 0 (0 errors, 32 warnings). Every indexable page has an apex canonical with a trailing slash, one h1, an og:url, valid JSON-LD with no `www` ids, and every image has alt text and an existing file. No internal link is broken, the sitemap covers every indexable route and omits the noindex ones, and no ads, booking CTAs, `next/image`, em dashes or exclamation points were found in rendered copy (one em dash on the noindex `/vote/` page, see L3).

One High issue was found and fixed: the success confirmation on the contact form and the footer launch-list form rendered in #0A5C52 on #1A1F2E (2.08:1), so a visitor could submit and not see that it worked. No Critical issues. Remaining items are Medium and Low and are left in the action plan.

Build and lint, before and after: `npm ci && npm run lint && npm run build` on main: lint 0 errors / 32 warnings, build exit 0. After the fix: see PR body (same expected result).

## Health score: 90 / 100

| Area | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO (metadata, canonicals, sitemap, robots, redirects, links) | 25 | 23 | Clean. Deductions: long titles and descriptions (M1, M2), static sitemap lastmod (L5) |
| Structured data | 15 | 14 | Valid, consistent ids. Duplicate-entity pattern on city pages (C-INFO1) |
| Performance | 20 | 17 | LCP image has fetchPriority and dimensions. Hero text animates in from opacity 0 (M3); fonts loaded via injected stylesheet |
| Accessibility | 15 | 12 | Focus ring, labels, dialog focus management all present. Contrast fail fixed (H1). 16px close target (L2) |
| Lead form correctness | 15 | 14 | All four forms submit, validate, fail loudly. Honeypot on launch list returns silently by design |
| Build and lint health | 10 | 10 | Build 0, lint 0 errors. 30 intentional `<img>` warnings (L4) |

## Findings

### Critical
None.

### High
- **H1 - FAIL (High) - FIXED in c1ead36.** Form success text contrast 2.08:1. `components/sections/ContactFormSection.tsx` ~L128 and `components/sections/WaitlistForm.tsx` ~L267 used `text-[#0A5C52]` on the charcoal panel. Now `text-brand-teal-light` (5.05:1). No token changed.

### Medium (not fixed, see action plan)
- **M1 - FAIL (Medium).** Meta descriptions over 160 characters on 18 pages (worst: `/tools/` 230, `/blog/red-tide-dogs-emerald-coast/` 215, `/blog/is-a-slatmill-safe-for-dogs/` 194, `/tools/dog-beach-checker/` 190). Google truncates them.
- **M2 - FAIL (Medium).** Titles over 65 characters on 15 pages (worst: `/blog/too-hot-to-walk-your-dog/` 82, `/tools/dog-beach-checker/` 82, `/blog/dog-adolescence-phase/` 80).
- **M3 - FAIL (Medium).** Homepage h1 and hero copy mount through framer-motion with `initial="hidden"` (`components/sections/Hero.tsx` ~L28+), so the text LCP element is invisible until hydration. The hero image itself is fine.
- **M4 - FAIL (Medium).** `/api/heat` (`app/api/heat/route.ts` ~L131) accepts any finite `lat`/`lon` and has no rate limit; it proxies to Open-Meteo/OpenWeather per request (10 minute cache header only).

### Low
- **L1 - FAIL (Low).** `components/layout/Navbar.tsx` ~L69 ref value used in effect cleanup (react-hooks/exhaustive-deps warning).
- **L2 - FAIL (Low).** `components/ui/ExitIntentPopup.tsx` close button is a bare glyph with no padding (under 24px target). The popup is paused until 2026-12-11.
- **L3 - FAIL (Low).** One em dash in rendered body copy of `/vote/` (`components/VoteCta.tsx` ~L105). Brand rule bans em dashes.
- **L4 - INFO/Low.** 30 `@next/next/no-img-element` warnings are intentional (plain `<img>` rule). Consider disabling that one rule in `eslint.config.mjs` so real warnings stand out. `@next/next/no-page-custom-font` warning in `app/layout.tsx` is intentional (async font load).
- **L5 - FAIL (Low).** `app/sitemap.ts` hard-codes lastmod dates for static routes; they will drift from real edits.
- **L6 - FAIL (Low).** `INTEGRATIONS.md` header says last updated 2026-06-09 while the hosting note was synced 2026-07-06.

### PASS
- Build and lint exit 0. Canonical, og:url, robots (noindex on `/thank-you/`, `/vote/`, embed and card routes, 404). Sitemap vs routes. robots.txt and Sitemap line. Redirects (7 rules, targets exist). JSON-LD parses on all pages, no `www`, BlogPosting has headline/image/dates/author/publisher. Trailing slashes on all internal links. All referenced images exist. Alt text on all 32 `<img>` sources. One h1 per page. Focus-visible outline. Form labels and `role="alert"` errors. No AdSense, no booking CTAs, no `next/image`. `GoogleAds.tsx` untouched. Scheduled-post gate (`npm run check:schedule`) OK, 11 posts scheduled.

### CONCERN (owner decision, nothing changed)
- **CN1.** Root JSON-LD (`app/layout.tsx` ~L83-130) publishes `priceRange: "$$"` and a phone number and geo point on every page while the business is parked. A price signal in schema conflicts with the no-prices standing rule's spirit; the file lists pricing-surface schema as exempt, so confirm intent.
- **CN2.** Default site title and description (`app/layout.tsx` ~L17-20) and home OG text describe an active service ("Mobile slatmill sessions ... at your driveway") with no not-taking-dogs note, unlike `/pricing/`, `/services/`, `/faq/` and llms.txt.
- **CN3.** Contact form success copy promises a reply "within 24 hours - usually faster" (`ContactFormSection.tsx` ~L131). Business claim, owner to confirm.
- **CN4.** Contact intro says "before booking" (`ContactFormSection.tsx` ~L119) while sessions are not bookable.
- **CN5.** `/tools/dog-beach-checker/` publishes a Dataset and beach rules; correctness of that data was not verified by this audit.

### INFO
- **I1.** City pages emit `LocalBusiness` with `parentOrganization` pointing at the sitewide `AnimalService`; ids are distinct, so valid.
- **I2.** Lead pipeline in this repo is Formspree plus the Mailchimp Cloudflare worker (no Resend/Blob, per README). Four endpoints match INTEGRATIONS.md. Mailchimp calls are fire-and-forget by design.
- **I3.** Images are plain `<img>`; any `next/image` migration is deferred until a prompt says so.
- Prior reports at repo root (`FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`) and `docs/AUDIT-2026-09.md` were left untouched.

## Appendix: file map
- Metadata, root schema, consent, fonts: `app/layout.tsx`
- Sitemap: `app/sitemap.ts`; robots and llms: `public/robots.txt`, `public/llms.txt`
- Redirects and headers: `next.config.js`
- Lead forms: `components/ui/LaunchWaitlist.tsx`, `components/sections/WaitlistForm.tsx`, `components/sections/ContactFormSection.tsx`, `components/ui/LeadMagnetForm.tsx`, `lib/subscribe.ts`
- Hero and LCP: `components/sections/Hero.tsx`
- Heat API: `app/api/heat/route.ts`
- Schema helpers: `lib/schema/offers.ts`, `lib/seo/*`
