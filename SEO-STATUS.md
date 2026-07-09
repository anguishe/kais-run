# Kai's Run — SEO / AEO / GEO Status

**Site:** https://kaisrun.xyz
**Deployment:** GitHub Pages static export → Vercel SSR (migrated 2026-06-09)
**Note:** All canonical, schema @id, OG url, and sitemap entries normalized to apex (https://kaisrun.xyz, trailing slash) - www is a defect, never use it.
**Audit date:** 2026-06-04
**Overall score:** 56/100 (baseline for 1-month-old domain)
**Indexing freeze:** started 2026-06-20 (after the "blog makeover" push, commit 3ef32e9) — deliberate code/content freeze to let Google re-crawl and stabilize. No non-imperative changes until lifted.
**Re-audit:** 2026-06-21 — 83/100 (see AUDIT-2026-06-21.md)
**GSC data:** 5 clicks / 39 impressions / 12.8% CTR / avg position 32.1 (3-month window)

---

## GSC Top Queries (3-month window)

| Query | Clicks | Impressions |
|---|---|---|
| mobile dog running service near me | 1 | 1 |
| mobile dog gym near me | 1 | 1 |
| how to tire out a dog | 0 | 3 |
| mobile dog fitness near me | 0 | 1 |
| dog slat mill | 0 | 1 |
| how to tire out a high energy dog | 0 | 1 |

**Signal:** The two clicks are bottom-of-funnel "near me" queries — the site is being found by people who are ready to buy. These are the most valuable impressions in the whole dataset and they're clicking. Protect and expand this.

## GSC Top Pages (by clicks)

| Page | Clicks | Impressions |
|---|---|---|
| https://kaisrun.xyz/ | 4 | 10 |
| https://kaisrun.xyz/faq/ | 1 | 4 |
| /blog/how-to-tire-out-a-high-energy-dog/ | 0 | 11 |
| /blog/what-is-a-dog-slatmill/ | 0 | 9 |
| /blog/dog-treadmill-vs-walk-comparison/ | 0 | 4 |

**Signal:** The tire-out and slatmill posts have the most impressions but zero clicks — thin content (680 words) is getting discovered but not earning clicks. These are the expansion priority.

---

## Critical Issues (fix before any new content work)

| ID | Issue | Effort | Impact |
|---|---|---|---|
| C1 | `/book/` double-blocked from indexing (robots.txt + page metadata) | 5 min | Highest |
| C2 | Google Fonts `@import` in `globals.css` — render-blocking, LCP penalty | 15 min | High |
| C3 | LocalBusiness schema missing `address` and `image` — blocks rich results | 20 min | High |
| C4 | `public/llms.txt` missing — blocks ChatGPT/Claude/Perplexity citation | 2 hrs | High |
| C5 | Navbar logo has `priority` prop competing with hero for LCP bandwidth | 1 min | Medium |

---

## High Priority (this week)

| ID | Issue | Effort |
|---|---|---|
| H1 | Google Business Profile unverified — map pack completely inaccessible | 3-4 hrs + verification wait |
| H2 | Zero reviews anywhere — #1 conversion barrier for $200 upfront offer | Ongoing |
| H3 | `/services/` H1 is "WHAT WE DO" — no keyword signal | 5 min |
| H4 | Zero external citations (Yelp, Bing Places, Apple Maps, Nextdoor) | 2 hrs total |
| H5 | Article schema `author.url` missing — entity disambiguation gap | 30 min |
| H6 | Service schema missing on city pages | 2 hrs |
| H7 | Near-duplicate blog posts (2 clusters) — splitting ranking authority | 3-4 hrs |
| H8 | SpotsCounter fetch causes CLS on homepage | 1 hr |
| H9 | GSAP in package.json — verify if used, remove if not (~80KB bundle) | 5 min |

---

## Blog Content Gaps

### Near-Duplicate Clusters (consolidate now)

**Cluster 1 — slatmill vs walk:**
- `/blog/slatmill-vs-long-walk/` → 301 redirect to `/blog/dog-treadmill-vs-walk-comparison/`
- Migrate Florida/weather section before redirecting

**Cluster 2 — breed posts:**
- `/blog/high-energy-dog-breeds-need-more-than-a-walk/` → 301 redirect to `/blog/high-energy-dog-breeds-exercise-guide/`
- Migrate Kai origin story paragraph before redirecting

### Thin Content (all under 700 words — minimum target 1,200)

| Post | Est. Words | Action |
|---|---|---|
| why-structured-runs-matter | ~200 | Expand to 1,200 or merge into pillar |
| welcome | ~310 | Expand or convert to hub intro |
| how-much-exercise-does-my-dog-need | ~480 | Expand to 1,300 |
| slatmill-vs-long-walk | ~500 | Merge into dog-treadmill-vs-walk-comparison |
| dog-treadmill-vs-walk-comparison | ~620 | Expand to 1,400 (receives merge) |
| what-is-a-dog-slatmill | ~680 | Expand to 2,800 (becomes Cluster 1 pillar) |

### Content Cluster Plan (4 hubs)

**C1 — Slatmill Education**
- Pillar: `/blog/dog-slatmill-guide/` (2,800w — expand from `what-is-a-dog-slatmill`)
- Spokes: `dog-treadmill-vs-walk-comparison/` (expand), new `is-a-slatmill-safe-for-dogs/`, new `dog-slatmill-session-cost/`

**C2 — Conditioning Science**
- Pillar: `/blog/high-drive-dog-exercise-guide/` (3,000w — new)
- Spokes: `how-to-tire-out-a-high-energy-dog/` (expand to 1,500w), `how-much-exercise-does-my-dog-need/` (expand to 1,300w), `too-hot-to-walk-your-dog/` (new — post #10)

**C3 — Breed-Specific Conditioning**
- Pillar: `/blog/high-energy-dog-breeds-exercise-guide/` (expand to 2,500w, absorbs breeds post)
- Spokes: new `belgian-malinois-exercise-needs/`, new `rhodesian-ridgeback-exercise-guide/`

**C4 — Local Commercial**
- Pillar: `/blog/mobile-dog-gym-destin-fl/` (1,800w — new, primary business keyword has zero blog coverage)
- Spokes: new `dog-conditioning-fort-walton-beach/`, new `dog-exercise-niceville-fl/`

---

## Service Area Page Status

| City | Page Status | Notes |
|---|---|---|
| Destin | ✅ Live — `/service-area/destin/` | Strong — references Sandestin, Scenic 98 |
| Fort Walton Beach | ✅ Live — `/service-area/fort-walton-beach/` | Strong — military angle (Eglin/Hurlburt) |
| Niceville | ✅ Live — `/service-area/niceville/` | Good — Bluewater Bay, WFH angle |
| Miramar Beach | ❌ Missing | Build: Grand Boulevard, Silver Sands, vacation rental audience |
| Sandestin | ❌ Missing | Build: HOA, resort community, Baytowne/Dunes/Links/Burnt Pine |

---

## Schema Status

| Schema | Status | Notes |
|---|---|---|
| LocalBusiness (AnimalService) | ⚠️ Partial | Missing `address`, `image`, fix `openingHoursSpecification` |
| BlogPosting | ✅ Present on blog slugs | Add `author.url` and `@id` |
| BreadcrumbList | ⚠️ Partial | Missing on `/services/`, `/pricing/`, `/about/`, `/faq/` |
| FAQPage | ⚠️ Partial | Present on FAQ page; missing on Pricing page (4 inline accordion items) |
| Service (city pages) | ❌ Missing | Add `buildServiceAreaSchema()` helper |
| HowTo (services page) | ❌ Missing | 3-step session protocol is a natural HowTo |
| WebSite | ❌ Missing | Add to `layout.tsx` |
| Person (Travis/About) | ⚠️ Partial | Remove `alumniOf` (wrong type), add `homeLocation`, add `@id` |
| aggregateRating | ❌ Not yet | Add only when real Google reviews exist — no placeholders |

---

## AEO / GEO Status

| Platform | Est. Visibility | Blocker |
|---|---|---|
| Google AI Overviews | Low-Medium | No GBP, thin blog posts |
| ChatGPT (web search) | Low | No `llms.txt`, no external brand mentions |
| Perplexity | Low-Medium | Unattributed statistics, thin posts |
| Bing Copilot | Medium | Robots.txt allows Bingbot, schema present |
| Claude (web) | Low | No `llms.txt`, no external corroboration |

**Fastest AEO wins:**
1. Create `public/llms.txt` (see `INTEGRATIONS.md` for content template)
2. Add Quick Answer lede (bolded direct-answer sentence) to every blog post
3. Add FAQPage JSON-LD to `/pricing/` and `/what-is-a-dog-slatmill/`
4. Source or remove unattributed statistics (the 5% energy figure)

---

## Local SEO Status

| Dimension | Score | Notes |
|---|---|---|
| GBP Signals | 12/25 | Created, unverified — highest single leverage action |
| Reviews & Reputation | 4/20 | Zero reviews anywhere |
| Local On-Page SEO | 13/20 | City pages strong; H1s on /services/ and /book/ wrong |
| NAP Consistency | 6/15 | Internal consistent; zero external citations |
| Local Schema | 8/10 | Present but incomplete (see Schema Status above) |
| Local Links | 3/10 | No backlink profile yet (expected at 1 month) |

**GBP primary category:** "Pet Trainer" (Whitespark #1 local ranking factor — verify exact GBP category name before setting)

**Citation priority order:**
1. Google Business Profile (DA ~94) — unverified, do first
2. Yelp (DA ~93)
3. Bing Places (import from GBP after verification)
4. Apple Maps Connect (DA ~90)
5. Nextdoor Business (DA ~72 — highest neighborhood relevance for SABs)
6. YellowPages, BBB (within 30 days)
7. Chamber of Commerce (strategic — DA backlink)

---

## IndexNow History

| Date | URLs submitted |
|---|---|
| 2026-05-21 | 9 pages (bulk) |

Pending: Blog post #10 (`too-hot-to-walk-your-dog`) — ping after deploy.
