# Kai's Run - Blog + Tools Audit Report
**Date:** 2026-09-16
**Auditor:** Claude Code (Opus 5) - main thread plus one read-only subagent. No commits, merges or deploys were made; the test merge ran in a temporary worktree that has since been removed.
**Scope:**
- `/blog/`: 22 live posts + 5 on the unmerged branch.
- `/tools/`: 3 live tools + 1 on the unmerged branch.
- Unmerged branch `feat/demonetize-and-seo-2026-09`: merge-readiness check.
- Monetization paths out of both sections.
- Live GSC (3 months) and Vercel Web Analytics (9/10-9/16).

**Health Score: 48/100** (blog + tools only; the city pages, `/book/` and GBP are out of scope)
**Companion:** [`ACTION-PLAN-BLOG-TOOLS-2026-09-16.md`](ACTION-PLAN-BLOG-TOOLS-2026-09-16.md). Goal date **2026-11-04** (Travis): monetized surfaces live, light weekly upkeep after.

---

## Executive Summary
The writing is the strongest asset on the site. All 27 posts:
- open with a bold answer
- carry no em dashes, exclamation points or banned words
- sit in `CATEGORY_MAP`
- run 1,240-2,400 words

The problems are in three other places:
1. **The September work never shipped.** 8 commits from 9/01-9/02 sit unmerged. They remove AdSense, fix FAQ schema, add 5 fall posts, add the puppy planner and upgrade all three tools. So AdSense still loads on every blog page, and one fall post is two weeks past its date.
2. **The tools are wrong in summer and pass no backlinks.**
3. **The money links point at the wrong places or earn nothing.**

The blog does not drive traffic yet: about 250 impressions and 1 click in 3 months. The site's clicks come from local "near me" searches that land on the homepage.

**Top 5 critical issues:**
1. The branch is still unmerged, 15 days on. AdSense loads on all live `/blog/` pages, the FAQPage schema is missing on 5 posts, and the puppy planner and all 5 fall posts return 404. The merge is clean and the build passes.
2. The heat checker applies a +50F "full sun" pavement estimate to **every hour, night included** (`lib/heat/verdict.ts:58-60`, used at `:164`). On a typical Destin July day it finds 0 of 24 walkable hours and says 2 AM pavement is about 128F.
3. The embeds pass no backlink:
   - no copy-paste embed snippet exists
   - the only credit link is inside the iframe
   - the embed renders the full site chrome

   `BACKLINK-PLAN.md` Tier 4 depends on this working.
4. The Ronzeil slatmill (the main affiliate) is linked from only 2 posts. The 6 slatmill posts that actually rank (positions 9-15) never link to it.
5. The Julius-K9 harness page, linked from 7 posts, earns nothing: `NEXT_PUBLIC_AMAZON_TAG` is unset and the link is an Amazon search URL.

**Top 5 quick wins (< 30 min each):**
1. Merge and deploy the branch, and set the Halloween and time-change posts to publish on deploy.
2. Link the 6 slatmill posts to `/equipment/ronzeil-slatmill/`.
3. Remove the price from the post-footer Founding Athlete CTA (CLAUDE.md rule).
4. Add the live `dog-lost-fitness-over-summer` entry to `public/sitemap.xml` + `llms.txt` (`npm run check:schedule` prints the lines).
5. Point CLAUDE.md's `CATEGORY_MAP` rule at `lib/blog/categories.ts`, and replace its stale AdSense section.

---

## Scoring Breakdown
| Category | Score | Weight | Weighted |
|---|---|---|---|
| Content quality + brand voice | 90/100 | 15% | 13.5 |
| Schema (blog + tools) | 75/100 | 10% | 7.5 |
| Search performance of blog + tools | 25/100 | 15% | 3.8 |
| Monetization paths (booking, affiliate, email) | 35/100 | 20% | 7.0 |
| Tool correctness | 50/100 | 15% | 7.5 |
| Tools as a backlink engine (embed, caching) | 20/100 | 10% | 2.0 |
| Release hygiene (unmerged work, manual sitemap) | 30/100 | 10% | 3.0 |
| Internal linking | 65/100 | 5% | 3.3 |
| **TOTAL** | | | **47.6 → 48/100** |

> The heat-checker failure rate is a simulation (typical Destin July: low 78, high 90, 80% humidity) run against the real functions, not a live weather pull. The "iframe links pass no equity" point is inferred from how search engines treat framed content, not measured.

---

## 1. Release state
**FAIL (Critical)** - `feat/demonetize-and-seo-2026-09` (8 commits, 42 files, +2851/-235, which also contains the 5 commits of `feat/blog-scheduling-fall-content`) was never merged. `git cherry main` marks all 8 as unapplied. Memory and docs had recorded "AdSense removed 2026-09-01", but that is true only on the branch.
**PASS (verified)** - Merge readiness, tested in a temporary worktree:
- `git merge-tree`: clean.
- `npm run build`: `✓ Compiled successfully`, 61/61 static pages, exit 0.
- `npm run check:schedule`: `Schedule OK`.
- `npm run check:tools`: `Tool checks OK`.
- `package.json` only adds two scripts; dependencies are unchanged.
- Main's `/vote`, `VotePromo` and `<Analytics />` (`app/layout.tsx:183`) are untouched by the merge.

**FAIL (High, live)** - AdSense `adsbygoogle.js?client=ca-pub-5399156622542127` loads on all 23 `/blog/` pages that return 200, and on the fall-post 404s, from main's `app/blog/layout.tsx`. `ads.txt` is still served. The merge removes both.
**FAIL (Low)** - `npm run lint` exits 1 with 4 `react-hooks/set-state-in-effect` errors, all present on main:
- `components/VoteCta.tsx:41`
- `components/analytics/MicrosoftClarity.tsx:13`
- `components/ui/CookieConsent.tsx:9`
- `components/ui/VotePromo.tsx:49`

The build does not gate on lint.
**CONCERN (Medium)** - Publishing is not hands-off. `docs/PUBLISHING.md` says scheduled posts "publish themselves", but each publish day still means pasting sitemap and `llms.txt` lines, committing and deploying, because `public/sitemap.xml` is static. The merge alone makes `dog-lost-fitness-over-summer` live without a sitemap entry.

## 2. Blog

### Content and voice
**PASS (verified, 27/27)** - Every post opens with a bold answer. None has em dashes, `!` in the body, prices in the MDX body, or banned words. All are in `CATEGORY_MAP`, and every internal `/blog/` link resolves. Word counts run 1,242-2,405.
**FAIL (Medium, live)** - The Founding Athlete CTA at the end of every post shows prices: live text "Lock in 5 sessions for $200 - $40 each". It comes from `components/blog/BlogPostWithAds.tsx` on main (`BlogPostBody.tsx` on the branch). CLAUDE.md: "Prices never appear in editorial body copy - offer names only, linked to /pricing/."
**CONCERN (Low)** - `ronzeil-slatmill-build` has no FAQ. `high-energy-dog-breeds-exercise-guide` uses 18 en dashes in ranges.

### Schema
**FAIL (High, live)** - 5 posts write FAQ answers on the same line as the question, so main's extractor emits no FAQPage schema:
- dog-park-not-tiring-dog-out
- dog-reactive-on-leash
- dog-thunderstorm-anxiety
- is-a-slatmill-safe-for-dogs
- mobile-dog-gym-destin-fl

The branch's `lib/blog/faq-schema.ts` fixes all 5.

### Seasonal timing
**FAIL (High)** - The fall posts are dated too close to their events for a site Google crawls this slowly:

| Post | Date in frontmatter | Event |
|---|---|---|
| dog-lost-fitness-over-summer | 09-03 | live on merge, already stale |
| red-tide-dogs-emerald-coast | 09-22 | season window |
| mental-stimulation-vs-exercise-dog | 10-08 | evergreen |
| dog-halloween-door-safety | 10-22 | Halloween Sat 10/31 (9 days) |
| dog-walk-dark-after-time-change | 10-29 | DST ends Sun 11/1 (3 days) |

The site has zero backlinks, and the 9/01 audit showed discovered URLs waiting weeks for a crawl, so a URL published 3-9 days out will not rank in time. The time-change facts check out (NOAA: Destin sunset 6:00 CDT Oct 31, 4:58 Nov 2).
**INFO** - No older post links to any fall post, so red-tide has zero inbound post links.

### Search data (GSC `sc-domain:kaisrun.xyz`, last 3 months, read live 2026-09-16)
Site total: 20 clicks, 510 impressions, average position 22. 18 of the clicks went to `/`. All 5 clicked queries are local "near me" searches ("dog treadmill service near me" position 3.5, "mobile dog gym" position 2.3).

| Blog / tools page | Clicks | Impr | Position |
|---|---|---|---|
| /blog/ (index) | 0 | 41 | 59.7 |
| dog-treadmill-vs-walk-comparison | 1 | 33 | 14.4 |
| what-is-a-dog-slatmill | 0 | 39 | 11.7 |
| is-a-slatmill-safe-for-dogs | 0 | 35 | 9.0 |
| mobile-dog-gym-destin-fl | 0 | 30 | 22.7 |
| what-to-expect-first-slatmill-session | 0 | 18 | 9.2 |
| high-energy-dog-breeds-exercise-guide | 0 | 17 | 28.0 |
| dog-thunderstorm-anxiety | 0 | 11 | 46.9 |
| how-to-tire-out-a-high-energy-dog | 0 | 9 | 14.4 |
| senior-dog-exercise | 0 | 7 | 9.3 |
| /tools/dog-exercise-calculator/ | 0 | 10 | 48.0 |
| /tools/too-hot-to-walk/ | 0 | 7 | 9.0 |
| /tools/ | 0 | 4 | 5.8 |
| /tools/dog-body-condition-score/ | 0 | 3 | 35.3 |

**INFO** - The **slatmill cluster** (what-is, is-it-safe, first-session, treadmill-vs-walk) holds about 125 of the blog's impressions at positions 9-15. It is the only blog cluster near page 1, and it lines up with the one high-ticket affiliate.
**INFO** - Vercel Web Analytics, 9/10-9/16: `/vote` 56 visitors, `/` 8, `/tools` 1, `/blog/*` **0**.
**NOTE** - Mixed `https://www.kaisrun.xyz/about/` and `/blog/calm-dog-during-fireworks/` rows still appear in GSC. The www→apex redirect exists; this is residual history, no action.

### Cannibalization (judged from titles and intent, not a SERP check)
**CONCERN (Medium)** - Blog post and tool pages target the same query:

| Blog post | Tool / page | Severity |
|---|---|---|
| `/blog/too-hot-to-walk-your-dog/` | `/tools/too-hot-to-walk/` | High |
| `/blog/is-my-dog-overweight/` | body-condition tool, card titled "Is My Dog Overweight?" at `app/tools/page.tsx:52` | Medium |
| `how-much-exercise-does-my-dog-need` | the exercise calculator | Medium |
| `how-to-tire-out-a-high-energy-dog` | `high-energy-dog-breeds-exercise-guide` / `dog-park-not-tiring-dog-out` | Medium |

## 3. Tools

| Tool | Live | Rendering | Schema | Result CTAs | Equipment link | Email |
|---|---|---|---|---|---|---|
| too-hot-to-walk | ✓ | dynamic, `no-store` | WebApplication + FAQPage | /book/, heat post, slatmill post | none | none |
| dog-exercise-calculator | ✓ | dynamic | ✓ | /book/ (high-drive only), 4 posts, heat tool | none | none |
| dog-body-condition-score | ✓ | dynamic | ✓ | calculator + 3 posts, **no /book/** | none | none |
| puppy-exercise-planner | **404** (branch only) | dynamic | ✓ | adolescence post, calculator, **no /book/** | none | none |

### Heat checker
**FAIL (High)** - The night-hour pavement bug:
- `pavementEstimateF(air, "sun")` adds +50F regardless of hour (`lib/heat/verdict.ts:58-60`).
- `hourlyBands()` / `safeWindows()` apply it to all 24 hours (branch `:164`; main `:149`).
- Any hour at or above 75F air therefore reads as paw-burn risk.

Simulated typical Destin July: **0/24 walkable, "No safe window today"**. Destin nights in July-September routinely stay above 75F, so the tool fails its core question in exactly the season it exists for. `scripts/check-tools.mjs` uses 58-62F July nights, which hides the bug.
**FAIL (Medium)** - The heat checker contradicts itself. When the only walkable hours fall mid-series, `safeWindows` returns `{}` and `HeatChecker.tsx:399` renders "Conditions are currently safe." inside a Dangerous card (verified logic, inferred render).
**CONCERN (Medium)** - If `OPENWEATHER` is set in Vercel, `app/api/heat/route.ts` returns 3-hour steps (8 bars from now) under a "Today, hour by hour" label. The key is in `.env.local`; the Vercel env was not checked.

### Other tools
**FAIL (Medium)** - The puppy guidance disagrees across the site:
- For a 7-month-old, `lib/exercise/compute.ts` gives 30-35 min/day total, while the puppy planner gives 35 min per session, twice daily.
- The calculator treats every dog under 12 months as a puppy; the planner says giant-breed growth plates close at 14-20 months.
- `is-a-slatmill-safe-for-dogs` says 12-18 months.

**CONCERN (Low)** - The BCS label reads "Obese (8-9)", but 7.5 already classifies as obese. The tools promise a "climate-controlled session", while the posts describe a driveway mill.

### Embeds as a backlink engine
**FAIL (High)** - `?embed=1` produces no backlink (code verified, SEO effect inferred):
- No page offers an "embed this tool" snippet, though `docs/BACKLINK-PLAN.md:62` assumes one.
- The only attribution is "Powered by Kai's Run" inside the iframe (`app/tools/*/page.tsx:96/106`). It points at `/`, has no `target="_blank"`, and search engines attribute iframe links to the framed page, not the host site.
- The embed renders the full site chrome: navbar, footer waitlist form, cookie banner, exit popup, GA4 and Clarity, plus nested `<main>`.

**FAIL (Medium)** - All four tool routes are dynamic because `page.tsx` awaits `searchParams` only to read `embed`. Live headers are `cache-control: private, no-cache, no-store` and `x-vercel-cache: MISS`.

## 4. Monetization paths from blog + tools
**PASS** - Affiliate hygiene:
- The Ronzeil CTA uses `rel="sponsored nofollow noopener"` with the disclosure next to it.
- `AffiliateLink` uses `sponsored nofollow noopener noreferrer`.
- Privacy and terms both disclose affiliate links.

**PASS** - Every post ends in a Founding Athlete CTA to `/book/` (but see the price issue in §2).
**FAIL (High)** - The Ronzeil slatmill is underlinked. Only `ronzeil-slatmill-build` carries the affiliate block inline. These 6 posts never link to `/equipment/ronzeil-slatmill/`, and they include 4 of the blog's best-ranking pages:
- what-is-a-dog-slatmill
- is-a-slatmill-safe-for-dogs
- dog-treadmill-vs-walk-comparison
- what-to-expect-first-slatmill-session
- why-structured-runs-matter
- how-to-tire-out-a-high-energy-dog

**FAIL (High)** - The Julius-K9 page earns nothing. The live copy says "Kai's Run currently earns nothing from it". `NEXT_PUBLIC_AMAZON_TAG` is unset in production, and the link is an Amazon *search* URL. 7 posts route readers there.
**FAIL (Medium)** - `/equipment/first-aid-kit/` has no buy links, yet red-tide and slatmill-safety send readers to it.
**CONCERN (Low)** - The Ronzeil page's Sources link (`RonzeilSlatmillPageClient.tsx:364`) goes to `ronzeil.com` without the affiliate code.
**CONCERN (Medium)** - Ronzeil's commission terms are still unconfirmed (MONETIZATION.md step 3). It is the difference between $60 and $300 a sale.
**FAIL (Medium)** - Out-of-area readers have no next step. There is no email capture on the blog or tools: `LeadMagnetForm` exists only on `/faq` (`app/faq/FAQPageClient.tsx:95`), and the footer form is a local waitlist.
**FAIL (Low)** - 4 posts have no in-body `/book/` link: can-you-over-exercise-a-dog, dog-treadmill-vs-walk-comparison, how-much-exercise-does-my-dog-need, why-structured-runs-matter. The footer CTA still covers them.

## 5. Docs drift
**FAIL (Low)** - CLAUDE.md is stale in two places:
- Line 98 says `CATEGORY_MAP` lives in `components/blog/FieldNotesIndex.tsx`; it is `lib/blog/categories.ts`.
- The "AdSense" section and the "AdSense pub" integration line predate the 9/01 removal decision.

**INFO** - `docs/AUDIT-2026-09.md`, `MONETIZATION.md`, `BACKLINK-PLAN.md` and `PUBLISHING.md` exist only on the branch.

---

## Appendix: File Reference Map
| Issue | File | Line approx |
|---|---|---|
| Unmerged work | branch `feat/demonetize-and-seo-2026-09` | d938cbd |
| AdSense on blog | `app/blog/layout.tsx` (main) · `components/ui/AdSenseLoader.tsx` · `public/ads.txt` | - |
| FAQ extractor | `lib/blog/faq-schema.ts` | regex |
| Prices in post CTA | `components/blog/BlogPostWithAds.tsx` (main) / `BlogPostBody.tsx` (branch) | CTA block |
| Night pavement bug | `lib/heat/verdict.ts` | 58-60, 149 (main) / 164 (branch) |
| "currently safe" contradiction | `app/tools/too-hot-to-walk/HeatChecker.tsx` | 399 |
| Hourly label vs 3-hour data | `app/api/heat/route.ts` | - |
| Puppy guidance mismatch | `lib/exercise/compute.ts` · `lib/puppy/growth.ts` · `content/blog/is-a-slatmill-safe-for-dogs.mdx` | - |
| Embed attribution inside iframe | `app/tools/*/page.tsx` | 96 / 106 |
| Dynamic tool routes | `app/tools/*/page.tsx` | `searchParams` |
| Amazon tag unset | Vercel env `NEXT_PUBLIC_AMAZON_TAG` · Julius-K9 page | - |
| Sources link without affiliate code | `RonzeilSlatmillPageClient.tsx` | 364 |
| Lead magnet only on /faq | `app/faq/FAQPageClient.tsx` | 95 |
| Static sitemap | `public/sitemap.xml` | - |
| Stale rule | `CLAUDE.md` | 98 |
| Lint errors | `components/VoteCta.tsx:41` · `analytics/MicrosoftClarity.tsx:13` · `ui/CookieConsent.tsx:9` · `ui/VotePromo.tsx:49` | - |
