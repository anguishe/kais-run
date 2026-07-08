# Kai's Run - Audit Action Plan
**Generated:** 2026-07-08 | **Full report:** FULL-AUDIT-REPORT.md (Health Score 79/100)
Every item ID cross-references a finding in the report. Fixes are minimum-viable - no refactors.

---

## CRITICAL - Fix Immediately
_None found._ The four same-day catastrophes were all verified absent: no secret in client code (Mailchimp key grep = 0), no stale AdSense ID, no www canonical anywhere, no "Emerald Paws" in rendered content. The build ships clean.

---

## HIGH - Fix This Week

### H1 · Server-render the /book/ page shell
**File:** `app/book/BookPageClient.tsx` (+ `app/book/page.tsx`)
**Impact:** The money page is a JS shell - static HTML has no H1, no offer copy, no phone fallback (report D1/D3/D18). Highest GSC no-index risk on the site, and any JS/Square failure kills the booking path entirely.
**Fix:** Move the H1, offer explanation, requirements summary, and a `tel:+18502185855` fallback into server-rendered JSX in `page.tsx` (outside the Suspense boundary); keep only the Square widget + spots counter + searchParams logic client-side. The orphaned `app/book/BookingContent.tsx` already contains suitable copy incl. a tel: link - salvage, then delete it.
```tsx
// app/book/page.tsx — render server-side, then the client island:
<h1 className="font-display ...">Join the Founding Athlete Program</h1>
<p>Five private slatmill sessions at your driveway ... </p>
<p>Prefer to talk first? <a href="tel:+18502185855">Call 850-218-5855</a></p>
<Suspense fallback={<WidgetSkeleton />}><BookPageClient /></Suspense>
```

### H2 · Consent-gate Microsoft Clarity (match GA4's gate)
**File:** `components/analytics/MicrosoftClarity.tsx:7`
**Impact:** Session recording + cookies fire for every visitor with zero consent while GA4 politely waits - contradicts the site's own consent UX and the privacy policy's framing (report D14).
**Fix:** Copy the exact gate pattern from `components/ui/GA4Script.tsx:12-20` (render null unless `localStorage['cookie-consent'] === 'accepted'`, listen for `cookie-consent-accepted`).

### H3 · Update the privacy policy: GA4 + real-world session recording
**File:** `app/privacy/page.tsx` (HTML blob, "Cookies and session tools" section ~line 38)
**Impact:** GA4 collects on accepted visits with zero disclosure; the two-camera filming of client sessions (marketed on /how-we-record/) is a physical-world data practice the policy predates entirely ("Last updated: May 12, 2026").
**Fix:** (1) Add Google Analytics 4 to the cookies section alongside Clarity. (2) Add a "Session video recording" section: what's filmed (two-camera rig, start to finish), why (safety/proof), who receives footage (the owner), retention, and consent mechanism. (3) Bump the Last-updated date.

### H4 · Decide the dash rule, then execute the voice pass
**Files:** decision: `CLAUDE.md:76` + `brand-reference.md:104-105`; execution: 9 MDX posts (167 em dashes), `app/services/ServicesPageClient.tsx` (13), `app/about/AboutPageClient.tsx` (11), `lib/faq-data.ts` (16), + ~15 more TSX files (report D16 breakdown)
**Impact:** The site is split between two voices (older em-dash content vs newer spaced-hyphen content) and the repo's own docs prescribe the OLD rule - every future content pass will re-introduce drift until the rule is written down once.
**Fix:** Human decision first (docs say em dash; audit brief + newest content say spaced hyphen). Then: update `CLAUDE.md`/`brand-reference.md` to the chosen rule, and run a single mechanical `— → " - "` (or inverse) pass over the files listed in report D16. Do the filler-word pass ("just" x44, "easy" x5, "simply" x1) in the same edit round.

### H5 · Strip hardcoded prices from editorial body copy
**Files:** `content/blog/what-is-a-dog-slatmill.mdx:116`, `why-structured-runs-matter.mdx:125`, `dog-treadmill-vs-walk-comparison.mdx:105`, `how-much-exercise-does-my-dog-need.mdx:123`, `how-to-tire-out-a-high-energy-dog.mdx:112`, + the shared city-page close in `lib/service-area/cities.ts` (11 pages × "$200 for 5 sessions")
**Impact:** 16 hardcoded price instances outside the pricing surfaces = guaranteed rot on the next price change; also violates the offer-names-only rule.
**Fix:** Replace dollar figures with offer names + a link: "Book an [Intro Session](/pricing/)" / "the [Founding Athlete Program](/pricing/) - five sessions, capped at 20 dogs." (Tier cards on /pricing/ and /services/ and the schema offers are exempt - they're pricing surfaces.)

### H6 · Fix teal-as-text contrast (2.4:1 → AA)
**Files:** `tailwind.config.ts` (add a lighter accent token) + highest-traffic uses: `components/ui/CookieConsent.tsx:29`, `components/sections/Hero.tsx:57`, form labels/eyebrows site-wide (~166 uses)
**Impact:** Teal #0A5C52 on #0F1117 = 2.40:1 (fails AA even for large text). The cookie-consent privacy link - a legally load-bearing link - is among the failures.
**Fix:** Introduce `brand-teal-light` (e.g. #17A08F ≈ 5.4:1 on brand-black) and swap it in wherever teal is *text on dark*. Keep #0A5C52 for backgrounds/borders. Mechanical find-replace of `text-brand-teal` → `text-brand-teal-light` in the D12-listed contexts.

---

## MEDIUM - Fix Within a Month

### M1 · Kill the redirect chains
**File:** `next.config.js:13-27`
**Impact:** All 3 legacy blog redirects live-verified as 2-hop chains (308 → no-slash → 308 → slash). Wasted crawl budget + diluted signals.
**Fix:** Append `/` to all three `destination` values.
```js
destination: '/blog/high-energy-dog-breeds-exercise-guide/',  // was: no trailing slash
destination: '/blog/dog-treadmill-vs-walk-comparison/',
destination: '/blog/',  // welcome redirect already correct
```

### M2 · Square logo asset for schema
**Files:** new square asset in `public/images/logos/` + `app/layout.tsx:85`
**Impact:** `logo` currently points at the 512x286 horizontal lockup - fails Google's square-logo guidance for the knowledge panel.
**Fix:** Export a 512x512 square mark (the favicon artwork exists - `public/images/logos/favicon.png` - but re-encode it: it's a 935 KB PNG; target <50 KB WebP/PNG), point `logo` at it.

### M3 · Restrict AdSense loader to blog routes
**Files:** `components/ui/AdSenseLoader.tsx` / `app/layout.tsx:265`
**Impact:** Loader ships on /tools/* (embed pitch promises no ads) and all conversion pages. No visible ads render today (placeholder slots), so this is about honoring the stated placement policy before slots go live.
**Fix:** Either mount `<AdSenseLoader/>` in `app/blog/layout.tsx` instead of the root layout, or gate it on `usePathname().startsWith('/blog')`. Align the privacy-policy sentence ("blog articles and free tool pages") with whichever surface set you actually want.

### M4 · sameAs cleanup
**Files:** `app/layout.tsx:216-220`, `public/llms.txt:118`, `components/layout/Footer.tsx:60`
**Impact:** Facebook numeric URL weakens entity matching; TikTok unverified; YouTube absent everywhere.
**Fix:** Claim/confirm the Facebook vanity URL (facebook.com/kaisrun) and swap all 3 occurrences; verify the TikTok account is live (remove if dead); add the YouTube channel URL to sameAs + llms.txt if/when one exists.

### M5 · Fix the four >160-char meta descriptions
**Files:** `app/book/page.tsx` (162), `app/pricing/page.tsx` (164), `app/service-area/page.tsx` (166), `lib/service-area/cities.ts` shalimar entry (162)
**Impact:** SERP truncation on three money-adjacent pages.
**Fix:** Trim each to ≤155 chars, front-loading the value proposition.

### M6 · OG blocks for /privacy/ and /terms/
**Files:** `app/privacy/page.tsx`, `app/terms/page.tsx`
**Impact:** Both inherit the root OG - shares carry og:url pointing at the HOMEPAGE (contradicts canonicals).
**Fix:** Add minimal `openGraph: { title, description, url: 'https://kaisrun.xyz/privacy/' }` (mirror for terms).

### M7 · AEO tune-up on 4 posts
**Files:** `content/blog/dog-adolescence-phase.mdx`, `senior-dog-exercise.mdx` (buried ledes); `what-is-a-dog-slatmill.mdx`, `what-to-expect-first-slatmill-session.mdx` (no FAQ)
**Impact:** The two buried-lede posts hide their answers from snippet extractors; the definitional slatmill post - the site's core AEO asset - has no FAQ/FAQPage.
**Fix:** Move the existing bolded answer paragraph to position 1 (anecdote follows); append a `## FAQ` section (≥2 `**Question?**` pairs) to the two FAQ-less posts - schema wires itself automatically (`lib/blog/faq-schema.ts`).

### M8 · Topical getRelatedPosts
**File:** `lib/blog/posts.ts:131-136`
**Impact:** Every post shows the same 2 newest posts as "related" - wasted internal-link equity, weaker topical clustering.
**Fix:** Sort candidates by shared category first (reuse `CATEGORY_MAP` from `components/blog/FieldNotesIndex.tsx` - export it or mirror the mapping), newest-first within category, fallback to newest.

### M9 · Branded 404
**File:** create `app/not-found.tsx`
**Impact:** Default Next 404 = dead end with no nav/CTA; paid-traffic typos leak.
**Fix:** Simple branded page: headline, links to /, /services/, /blog/, /tools/, Book Now CTA. Server component, ~30 lines.

### M10 · Consent Mode v2 defaults for Google tags
**Files:** `components/GoogleAds.tsx`, `components/ui/GA4Script.tsx`
**Impact:** Google Ads gtag fires pre-consent with no consent-mode defaults; if EEA/UK traffic ever matters (or Google tightens US enforcement), conversion modeling breaks.
**Fix:** Emit `gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'})` before any config; flip to `granted` via `gtag('consent','update',...)` on the accept event. Or gate GoogleAds like GA4 (simpler, loses pre-consent modeling).

### M11 · Compress the heavyweight JPGs
**Files:** `public/images/equipment/*.jpg` (5 files, 0.7-1.3 MB), `public/images/brave-4-*.jpg` (4 files, 0.5-0.9 MB), `public/images/social/*.jpg`
**Impact:** /equipment/ page ships ~5-6 MB of images; mobile LCP suffers (code-review-based).
**Fix:** Re-encode to WebP at display width (hero proves the pipeline: 51 KB). Local toolchain note: use ImageMagick (`magick in.jpg -resize 1200x -quality 82 out.webp`).

### M12 · Sync the stale internal docs
**Files:** `.claude/skills/kaisrun-context/SKILL.md` (GitHub Pages/no-Vercel claims + phantom mojrrvdd form), `SEO-STATUS.md:4-5` (www claim), `INTEGRATIONS.md:36` (mojrrvdd), `AGENTS.md` (self-contradictions), `CLAUDE.md:76` (dash rule - after H4's decision)
**Impact:** These files are loaded as agent context; the skill file actively instructs future sessions to build for a host that no longer exists, and SEO-STATUS would reintroduce www canonicals.
**Fix:** One doc pass: Vercel SSR everywhere, apex canonical everywhere, remove mojrrvdd, codify the dash decision.

---

## LOW - Backlog

### L1 · Delete dead FAVICON export + 935 KB PNG
**Files:** `lib/site-images.ts:24`, `public/images/logos/favicon.png`
**Fix:** Remove the export (zero consumers, grep-verified); repurpose the artwork for M2's square logo first, then delete the original PNG.

### L2 · Consolidate SpotsCounter
**Files:** `components/sections/SpotsCounter.tsx`, `components/ui/SpotsCounter.tsx`
**Fix:** Two implementations both render on the homepage. Keep one, import it in both places; ensure the /pricing/ prerender reads `public/data/config.json` at build instead of the deprecated `FOUNDING_SPOTS_REMAINING = 17` (`lib/constants.ts:3`) so users stop seeing 17→14 flicker.

### L3 · Front-matter hygiene pass
**Files:** 7 MDX posts with ignored `slug:`, 6 with ignored `readTime:`, `what-to-expect-first-slatmill-session.mdx` (`tags:`, `imageAlt:`), 3 posts with JSON-array `keywords`
**Fix:** Delete ignored/unrecognized fields; normalize `keywords` to bare comma lists; add `dateModified` to the 6 posts missing it on their next edit.

### L4 · Word the "cute" + source the stats
**Files:** `meet-kai-the-dog-behind-kais-run.mdx:20` ("cute"), `senior-dog-exercise.mdx` ("one in five" - add a named source or soften), `too-hot-to-walk-your-dog.mdx` (attribute the 135°F figure), `calm-dog-during-fireworks.mdx` ("widely reported")
**Fix:** One-line edits each.

### L5 · A11y round 2 (after H6)
**Files:** `Navbar.tsx:78-95` (aria-expanded + Escape + focus trap), `ExitIntentPopup.tsx` (role="dialog" + aria-modal + trap), forms (aria-invalid/aria-describedby), global `focus-visible` utility, `lib/variants.ts` + `LenisProvider.tsx` (prefers-reduced-motion)
**Fix:** Mechanical additions; the KaiGallery focus-visible pattern (`KaiGallery.tsx:62`) is the house template.

### L6 · Small SEO/schema polish
**Fixes:** Add `telephone` to city LocalBusiness nodes (`lib/seo/service-area-schema.ts`); add BreadcrumbList to tool leaf pages; add `@id ...#faq` to the un-@id'd FAQPage nodes (/faq/, /pricing/, tools); drop `/thank-you/` from robots.txt Disallow (noindex alone is cleaner); add a "Key pages" URL list (services/pricing/faq/about/cities) to llms.txt; +100-150 unique words on santa-rosa-beach/bluewater-bay/valparaiso city pages; 2-3 sentences per card on /tools/ hub; one context paragraph on /contact/.

### L7 · Hygiene odds & ends
**Fixes:** Move/untrack `cluster-plan.json` from repo root; delete `public/.nojekyll`; gate the `console.info` funnel logs behind `NODE_ENV !== 'production'` (or accept them deliberately); decide fate of untracked `docs/session-to-reel-guide.md`.

---

## Estimated Impact by Priority
| Group | Effort | Impact |
|---|---|---|
| H1-H6 | ~8-12 h | Money-page indexability + booking resilience; consent/privacy compliance; voice consistency across ~330 defect instances; AA contrast on ~166 elements |
| M1-M12 | ~10-14 h | Crawl efficiency (chains), knowledge-panel eligibility (logo/sameAs), SERP CTR (descriptions), AEO lift on 4 posts, topical link equity, doc safety for future agent sessions |
| L1-L7 | ~6-8 h | Hygiene, a11y depth, schema polish, thin-page insurance |

---

## Post-Fix Checklist
1. `npm run build` - zero errors (baseline at audit time: PASS, see report)
2. Deploy to Vercel; spot-check live: `/book/` static HTML now contains H1 + tel:, redirect chain gone (`curl -sI https://kaisrun.xyz/blog/slatmill-vs-long-walk/` → single 308 to trailing-slash URL)
3. IndexNow ping for changed URLs (key `kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n`) - both Bing and Yandex endpoints
4. GSC: URL-inspect + request reindex for `/book/`, `/pricing/`, the 4 trimmed-description pages, and any edited posts
5. Schema validation: Rich Results Test on `/` (logo/business), one blog post (BlogPosting+FAQPage), one city page (LocalBusiness)
6. OG debugger (Facebook Sharing Debugger / opengraph.xyz) on `/privacy/`, `/terms/`, one blog post
7. Verify Clarity no longer fires pre-consent (Network tab, fresh profile, before accepting)
8. Re-run the voice greps: `grep -c "—" content/blog/*.mdx` and the price grep - both should match the chosen rule
