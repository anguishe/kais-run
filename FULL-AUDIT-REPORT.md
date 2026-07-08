# Kai's Run - Full-Site AEO/GEO/SEO + Health Audit
**Date:** 2026-07-08
**Auditor:** Claude Code (Fable 5) - READ-ONLY, no source files changed
**Scope:** 24 app routes (13 static pages + 11 service-area cities + blog/[slug] over 19 MDX posts + 3 tools + 1 API route) · 47 sitemap URLs · full component/lib/public sweep · live-production spot checks (headers, redirects, IndexNow)
**Health Score: 79/100**
**Companion:** ACTION-PLAN.md (same findings, re-sorted into a fix queue)

---

## Executive Summary
The technical SEO core is in genuinely good shape: apex+trailing-slash canonicals are perfect across all 47 URLs, the sitemap and llms.txt are complete and current, secrets are clean, security headers verified live, the schema graph is consistent, and the blog is an above-average AEO asset (17/19 posts open with extractable Quick-Answers backed by real FAQPage schema). None of the four "same-day-fix" catastrophes exist: no secret leak, no stale AdSense ID, no www canonical, no retired brand name anywhere in rendered content.

What drags the score: the **money page (/book/) ships as a JS shell** with no H1 and no content in static HTML; **consent/privacy is inconsistent** (Clarity records sessions ungated, the privacy policy never mentions GA4 or the new two-camera session-recording practice); **brand-voice compliance is split down the middle** (167 em dashes across 9 older posts + ~147 in page copy + prices hardcoded in 5 post bodies and all 11 city pages); and **accessibility has a systemic contrast failure** (teal-on-black text = 2.4:1 across ~166 uses). Internal docs contradicting live code (a skill file still claiming GitHub Pages hosting; SEO-STATUS.md claiming www canonicals) are a standing footgun for future agent sessions.

**Top 5 critical issues:**
1. `/book/` is invisible to crawlers and JS-off users - no H1, no offer copy, no tel: fallback in static HTML (D1/D3/D18)
2. Microsoft Clarity fires ungated while GA4 is consent-gated, and the privacy policy omits both GA4 and the real-world session-recording practice (D14)
3. Voice noncompliance at scale: em dashes (167 MDX + ~147 TSX + 16 FAQ data), prices in 5 post bodies + 11 city closes - pending the em-dash-vs-hyphen decision the docs themselves contradict (D16/D17)
4. Teal (#0A5C52) used as text/link color on dark backgrounds fails WCAG AA at 2.4:1, ~166 instances including the cookie-consent link (D12)
5. Schema logo is the 512x286 horizontal lockup (needs square) + Facebook sameAs is the numeric URL + YouTube absent (D5)

**Top 5 quick wins (< 30 min each):**
1. Append trailing slashes to the 3 redirect destinations in `next.config.js:13-27` - kills live 2-hop chains
2. Add GA4 + session-recording paragraphs to the privacy policy (`app/privacy/page.tsx`)
3. Trim the 4 over-160-char meta descriptions (/book/, /pricing/, /service-area/, shalimar)
4. Move the bolded Quick-Answer to paragraph 1 on `dog-adolescence-phase` + `senior-dog-exercise`; add FAQ sections to the 2 posts lacking them
5. Create `app/not-found.tsx` (branded 404 with nav + CTA) and delete the dead `FAVICON` export + its 935 KB PNG

---

## Scoring Breakdown
| # | Dimension | Score | Weight | Weighted |
|---|---|---|---|---|
| 1 | Crawlability & indexation | 82 | 8% | 6.6 |
| 2 | Duplicate content & cannibalization | 84 | 5% | 4.2 |
| 3 | Thin content & GSC risk | 78 | 7% | 5.5 |
| 4 | On-page SEO | 84 | 6% | 5.0 |
| 5 | Structured data / schema | 80 | 9% | 7.2 |
| 6 | AEO | 88 | 6% | 5.3 |
| 7 | GEO / LLM citability | 90 | 6% | 5.4 |
| 8 | Local SEO | 85 | 7% | 6.0 |
| 9 | Internal linking & architecture | 82 | 5% | 4.1 |
| 10 | Metadata / social / OG | 85 | 4% | 3.4 |
| 11 | Performance / CWV *(code-review-based)* | 75 | 6% | 4.5 |
| 12 | Accessibility | 62 | 5% | 3.1 |
| 13 | Mobile / responsive *(code-review-based)* | 88 | 3% | 2.6 |
| 14 | Analytics / consent / privacy | 60 | 6% | 3.6 |
| 15 | Security / headers / secrets | 95 | 5% | 4.8 |
| 16 | Brand / voice compliance | 55 | 5% | 2.8 |
| 17 | Dead code / hygiene / docs | 70 | 2% | 1.4 |
| 18 | Conversion / UX / trust | 78 | 5% | 3.9 |
| | **TOTAL** | | **100%** | **79.4 → 79/100** |

> D11 and D13 are code-review-based (no live Lighthouse/CrUX/device run). D8's GBP-alignment portion is code-review-based (GBP itself not inspectable from the repo). Everything else was verified by reading source, measuring assets, or hitting production endpoints.

---

## Route Inventory (audited set)

**Static pages (13):** `/` · `/about/` · `/blog/` · `/book/` · `/contact/` · `/equipment/julius-k9-idc-powerharness/` · `/faq/` · `/how-we-record/` · `/pricing/` · `/privacy/` · `/service-area/` · `/services/` · `/terms/` · `/thank-you/` · `/tools/` (15 incl. hubs)
**Service-area cities (11):** destin, fort-walton-beach, niceville, miramar-beach, sandestin, shalimar, mary-esther, navarre, santa-rosa-beach, bluewater-bay, valparaiso
**Tools (3):** `/tools/too-hot-to-walk/` · `/tools/dog-exercise-calculator/` · `/tools/dog-body-condition-score/`
**Blog (19 MDX):** all `content/blog/*.mdx`; `how-to-tire-out-a-high-energy-dog` also has a dedicated route `app/blog/how-to-tire-out-a-high-energy-dog/page.tsx` (excluded from `[slug]` via `DEDICATED_POST_SLUGS`)
**API (1):** `/api/heat` (weather proxy for the too-hot tool; robots-disallowed)
**No `app/not-found.tsx` exists** - Next.js default 404 serves (verified live: unknown URL returns 404).

### Global grep-pass results (the "must-be-zero" list)
| Pattern | Hits in site code (app/components/lib/content/public) | Verdict |
|---|---|---|
| `www.kaisrun.xyz` | 0 | **PASS** |
| `Emerald Paws` | 0 (appears only in internal docs as "never use" instruction) | **PASS** |
| `ca-pub-6289405922667797` (stale AdSense) | 0 | **PASS** |
| Mailchimp API key (`18649e...`) | 0 - lives only in the Cloudflare Worker | **PASS** |
| `next/image` | 0 imports (one comment reference) | **PASS** |
| `aggregateRating` | 0 (one code comment) | **PASS** |
| `output: 'export'` | 0 | **PASS** |
| Em dash `—` in MDX | **167 across 9 of 19 posts** | FAIL - see D16 |
| Em dash `—` in TSX copy | **~147** (see D16 breakdown) | FAIL - see D16 |
| `!` in MDX prose | 0 | **PASS** |
| `$` prices in MDX body | 6 hits across 5 posts | FAIL - see D16 |

---

## 1. Crawlability & Indexation
### robots.txt (`public/robots.txt`)
**PASS** - `Allow: /` for all agents; `/thank-you/`, `/api/`, `/videos/` disallowed (lines 3-5); `/book/` fully crawlable; sitemap declared (line 18). AI crawlers (GPTBot, Google-Extended, ClaudeBot, OAI-SearchBot, PerplexityBot, Amazonbot) explicitly allowed (lines 6-17) - deliberate GEO stance.
**NOTE** - `/thank-you/` is both robots-disallowed AND `noindex,nofollow` (`app/thank-you/page.tsx:7-8`). The robots block prevents Google from ever seeing the noindex; if the URL picks up links it can appear as "indexed, though blocked by robots.txt". Standard practice: pick one - drop the robots line, keep the noindex.

### Meta robots & canonicals
**PASS** - Exactly one noindexed route (`/thank-you/` - correct). No accidental noindex on any money page.
**PASS** - Every indexable route sets an absolute, self-referencing, apex, trailing-slash canonical (verified per-route; e.g. `app/page.tsx`, `lib/blog/post-metadata.ts:49`, `app/service-area/[slug]/page.tsx:30`). Zero www anywhere.
**INFO** - `/thank-you/` has no canonical - acceptable for the one noindexed route.

### Redirects
**FAIL (Medium)** - All three legacy blog redirects create a live 2-hop chain because destinations omit the trailing slash while `trailingSlash: true` appends one. Verified in production: `/blog/slatmill-vs-long-walk/` → 308 → `/blog/dog-treadmill-vs-walk-comparison` → 308 → `/blog/dog-treadmill-vs-walk-comparison/`. File: `next.config.js:13-27`. Fix: append `/` to the three `destination` values.
**PASS** - www → apex resolves in a single 308 (verified live). No `public/_redirects` remnant. No redirect loops.

### 404 handling
**FAIL (Low)** - No `app/not-found.tsx` exists; unknown URLs serve the unbranded Next.js default 404 (verified live: correct 404 status, but zero nav, zero CTA, zero brand). Unknown city slugs correctly call `notFound()` (`app/service-area/[slug]/page.tsx:57`).

### Sitemap (`public/sitemap.xml` - static, hand-maintained)
**PASS** - 47 URLs, complete and current: all 15 static pages, all 11 cities, all 19 posts, 3 tools + hub. Zero stale/404 slugs, zero non-canonical URLs, `<lastmod>` on all 47 entries, `/thank-you/` correctly absent. 1-hour cache header configured (`next.config.js:59-66`).
**NOTE** - Static maintenance is a process risk: every future route needs a manual sitemap + llms.txt edit (this audit found no drift today, but the how-we-record launch required remembering both).

### IndexNow
**PASS** - Key file `public/kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n.txt` exists, contents match the key, serves 200 in production.

### SSR / JS-render check
**FAIL (High)** - `/book/` is a genuine JS shell. `useSearchParams` inside the client component forces the Suspense fallback at prerender: the static HTML contains only a `<p>` with the offer name plus "Loading…" - **no `<h1>`, no offer copy, no booking content** (verified live with curl). The Square widget, spots count, and H1 all mount client-side. The primary conversion page is near-empty to crawlers and to anyone with JS off/failed. Minimum fix: render the H1, offer explanation, requirements, and a tel: fallback as server HTML around the client widget.
**PASS** - Every other route ships real server-rendered HTML: blog posts are server-rendered MDX, tools pages have server-rendered framing copy + FAQ with only the interactive widget as a client island, city pages are full server text.
**INFO** - Framer-motion sections (about, faq, services, pricing, equipment, how-we-record, service-area) render text into the DOM but at `opacity: 0` until hydration (`lib/variants.ts:4`). Crawlable (content is in the HTML), but nothing is visible if JS fails, and Google's "visible content" heuristics mildly discount hidden-at-load text. Acceptable trade-off; noted.

---

## 2. Duplicate Content & Keyword Cannibalization
Full cluster analysis in **Artifact C**. Summary of verdicts:

**PASS** - Title/description uniqueness: every route has a unique `<title>` and unique meta description (per-route sweep, Table in Artifact A). The only near-identical pair is the home page's own title/description vs the root-layout defaults - same route, harmless.
**PASS** - Tool-vs-post pairs are correctly differentiated: `/tools/too-hot-to-walk/` ("Too Hot to Walk Your Dog? Pavement Temperature Checker" - transactional) vs `/blog/too-hot-to-walk-your-dog/` ("When It's Too Hot to Walk Your Dog..." - informational guide, `too-hot-to-walk-your-dog.mdx:2`). Cross-linked both ways. Same healthy split for the calculator and body-condition tools vs their explainer posts (`how-much-exercise-does-my-dog-need`, `is-my-dog-overweight`).
**PASS** - `/how-we-record/` (evergreen facts page) vs `/blog/why-we-record-every-session/` (narrative, defers to the page) - correct primary/secondary architecture, differentiated titles, post links page.
**CONCERN** - Blog Cluster A ("structured work beats chaotic play": how-to-tire-out, why-structured-runs-matter, dog-park-not-tiring-dog-out, dog-treadmill-vs-walk) re-argues the identical arousal-vs-fatigue thesis in four posts; `dog-park-not-tiring-dog-out` is a near-subset of `how-to-tire-out` (which contains its own dog-park section). Each has a distinct head query, so differentiate rather than consolidate - trim the duplicated exposition in the secondaries to a link. Detail in Artifact C.
**CONCERN** - Seasonal trio (too-hot / thunderstorm / fireworks) all resolve to the same "summer cancels the walk → drain the tank early indoors" payload; `dog-thunderstorm-anxiety`'s own FAQ re-asks the too-hot question verbatim-in-spirit.

### Service-area city pages: doorway-page test
**PASS (with a caveat)** - The 11 city pages pass. Each city gets a unique title, description, H1, eyebrow, 4 named neighborhoods, a unique hub teaser, and **5 genuinely unique paragraphs (302-467 words/city)** with real local specifics (named neighborhoods, bases, breed patterns) - not spun boilerplate (`lib/service-area/cities.ts`, rendered by `CityServiceAreaClient.tsx`). Templated chrome is ~60 words/page. Boilerplate-to-unique ratio ≈ 1:6 - healthy.
**CONCERN** - Every city page closes with the same "$200 for 5 sessions / 20 dogs / Founding Athlete" paragraph and identical sub-hero line (`CityServiceAreaClient.tsx:52-53`). 11 hardcoded price repetitions = price-rot surface (see D16), and the shared close slightly dilutes the per-city uniqueness. Weakest pages: santa-rosa-beach (302 unique words), bluewater-bay (308), valparaiso (316).
**PASS** - Canonical correctness on all near-duplicates: every clustered page is self-canonical, which is correct because each targets a distinct query (no accidental cross-canonicalization).

---

## 3. Thin Content & GSC Index-Risk
Word counts are estimates from source JSX/MDX (code-review-based). Full per-route data in Artifact A; at-risk routes in Artifact B.

**FAIL (High)** - `/book/` - the one page that is BOTH thin and JS-empty (≈10 words of static HTML; see D1). Highest "Crawled - currently not indexed" risk on the site, and it's the money page.
**CONCERN** - `/contact/` ≈190 words. Functional and schema'd (ContactPage), but light; contact pages usually index on entity signals. Low risk, worth a paragraph of service context.
**CONCERN** - `/tools/` hub ≈90 words + 3 cards. Indexable but thin as a standalone SERP target; add 2-3 sentences per tool on the hub.
**PASS** - The three tool pages themselves are NOT bare apps: 550-700 words of server-rendered framing copy + FAQPage + WebApplication schema each (`app/tools/*/page.tsx`). Genuinely indexable.
**PASS** - All 19 blog posts clear 1,250 words (range 1,291-2,473).
**PASS** - City pages carry 302-467 unique words + unique schema - above the doorway/thin threshold (see D2 caveat on the three lightest).
**PASS** - `/how-we-record/` ≈650, `/faq/` ≈2,000, `/services/` ≈1,400, `/equipment/julius-k9-idc-powerharness/` ≈2,400, `/about/` ≈950, `/pricing/` ≈700 - all substantive.
**INFO** - `/privacy/` ≈900, `/terms/` ≈750 - legal pages, index status irrelevant.
**INFO** - `/blog/` listing ≈300-500 words of card text - normal for an index page; the `@graph` Blog+ItemList schema helps it.

---

## 4. On-Page SEO
### H1s & heading hierarchy
**PASS** - Exactly one H1 on every route (per-route sweep) - except `/book/`, whose static HTML has zero H1 (client-only; cross-ref D1 FAIL).
**CONCERN** - Two money pages spend their H1 on brand slogans with zero query terms: home = "YOUR DOG DESERVES TO RUN." (`Hero.tsx:47`), `/pricing/` = "Simple. Transparent." Both pages' `<title>` carries the keywords, so this is an intentional brand-over-keyword trade - but for a pre-opening business fighting for "mobile dog gym Destin" impressions, at least one keyworded H2 directly under each slogan H1 would hedge the bet. `/services/` does it right: H1 = "Dog Conditioning Sessions — Destin, Fort Walton Beach & Niceville FL".

### Titles
**PASS** - All titles unique, 26-59 chars (privacy 26 / terms 28 are fine for legal pages). Blog titles get "| Kai's Run" suffixed only when total ≤60 chars (`lib/blog/post-metadata.ts:44-46`) - smart truncation guard.
**NOTE** - Suffix style drifts: most pages use `| Kai's Run`, `/faq/` uses `— Kai's Run`, the dedicated post drops it (66-char title). Cosmetic.

### Meta descriptions
**FAIL (Low)** - Four descriptions exceed 160 chars and will truncate in SERPs: `/book/` 162, `/pricing/` 164, `/service-area/` 166, city `shalimar` 162. Borderline: equipment 159, sandestin 159, `calm-dog-during-fireworks` 165 (MDX).
**PASS** - All unique; all others 106-159 chars.

### Intent mapping, slugs, anchors, alt, breadcrumbs
**PASS** - One target intent per page holds across the site (see Artifact A); slugs are descriptive-hyphenated throughout.
**PASS** - Zero generic anchors: no "click here"/"read more" anywhere in MDX or TSX (grep-verified). Post-to-post links use descriptive anchor text.
**PASS** - Alt text coverage complete (D12).
**NOTE** - Visible breadcrumb UI exists only on blog posts and city pages; equipment/faq/pricing/tools emit BreadcrumbList schema without matching visible UI. Schema-only breadcrumbs are valid for rich results but the UX affordance is missing on deep pages.

---

## 5. Structured Data / Schema
### Business entity (`app/layout.tsx:62-221`, injected on every page)
**PASS** - Primary `@type: AnimalService`, NOT co-typed with LocalBusiness (per spec). `@id: https://kaisrun.xyz/#business`. Correct `name`, `telephone: +18502185855`, `email`, `url`, `areaServed` = all 11 cities as `City` objects, `geo` GeoCoordinates, `priceRange: "$$"`, `founder` → Person `@id .../about/#travis`, `foundingDate`, `knowsAbout`, and a `disambiguatingDescription` explicitly separating the brand from footwear - a genuinely good entity-disambiguation touch.
**PASS** - `hasOfferCatalog` carries exactly the 9 launched offers with LOCKED pricing (35/55/200/70/135/195/300/380/580) - Monthly Memberships and Snowbird are correctly absent. Offer URLs point to `/services/` and `/pricing/`.
**PASS** - Zero `aggregateRating` anywhere (grep-verified; the only hit is a comment documenting its deliberate absence, `app/equipment/julius-k9-idc-powerharness/page.tsx:46`).
**FAIL (Medium)** - `logo` points at the horizontal lockup: `/images/logos/kr-logo-1.webp` is **512x286** (measured). Google's logo guidance wants a square-ish mark (min 112x112, 1:1 preferred). Known debt confirmed. Provide a square logo asset and swap the field.
**CONCERN** - `image` is the 1200x630 OG banner (`app/layout.tsx:84`) - valid, but a real photo (rig/truck/session) serves LocalBusiness image intent better.
**CONCERN** - SAB address tension: schema includes a `PostalAddress` with locality Destin + postal 32541 (`app/layout.tsx:89-95`) while GBP is a Service-Area Business with **no** address. No street address leaks (good), but locality+ZIP still asserts a point location the GBP hides. Google's SAB guidance: omit `address`, let `areaServed`+`geo` carry it. Human decision - align schema with the GBP stance.

### sameAs / knowledge graph (known debts)
**FAIL (Low)** - Facebook is the numeric profile URL (`facebook.com/people/Kais-Run-Mobile-Dog-Conditioning/61589361011885/`, `app/layout.tsx:217` + llms.txt:118 + Footer). Known debt confirmed - swap to the vanity URL once claimed.
**CONCERN** - YouTube absent from `sameAs` - and absent from the entire repo (grep: zero hits). If a channel exists (session footage would suggest one eventually), add it; if not, this debt is moot for now.
**CONCERN** - `tiktok.com/@kaisrun` in sameAs (`app/layout.tsx:219`) - verify the account is real/active; dead sameAs links hurt entity trust.
**PASS** - The Google Maps search-query URL is NOT in sameAs (it lives only in the footer's social icons, `Footer.tsx:74` - acceptable UI link for an unverified GBP).

### @id graph consistency
**PASS** - `#business`, `#website`, `/about/#travis` are referenced with identical strings everywhere they appear: layout founder, blog author (`article-schema.ts`), publisher refs, city `parentOrganization`, contact `mainEntity`, how-we-record `isPartOf`/`publisher`. No @id drift found.

### Per-page schema correctness
**PASS** - BlogPosting on every post with author `#travis`, publisher `#business`, `datePublished`, `dateModified` (falls back to date), image, `mainEntityOfPage` (`lib/blog/article-schema.ts`).
**PASS** - FAQPage only where a real FAQ exists: conditional builder returns null under 2 pairs (`lib/blog/faq-schema.ts:81`); `/faq/` (15 Q&A), `/pricing/` (4), tools (3-5), equipment (6) all real.
**PASS** - Page-purpose matching: ContactPage on /contact/, Person+@id on /about/, Service on /services/ + /pricing/, WebApplication (Utilities/Health) on tools, LocalBusiness-per-city with `parentOrganization` → `#business` on city pages, WebPage on /how-we-record/, Blog+ItemList @graph on /blog/, Article-about-Product (no Offer - they don't sell it) on equipment. Categorization is right across the board.
**CONCERN** - Offer duplication x3: the full 9-offer catalog ships on EVERY page via layout, plus `Service` blocks with the same 9 offers on `/services/` AND `/pricing/`. Validators won't flag it, but three copies of the price list = three places to update on any price change (one already drifted once per git history). Consider making layout's catalog the single source.
**NOTE** - FAQPage `@id` inconsistency: blog + equipment FAQPage nodes carry `@id ...#faq`; `/faq/`, `/pricing/`, and the three tools' FAQPage nodes have no `@id`. Harmless to validators; inconsistent for graph hygiene.
**NOTE** - City LocalBusiness nodes omit `telephone` (`lib/seo/service-area-schema.ts`) - adding it would reinforce NAP on the pages doing local work.
**NOTE** - Tool leaf pages lack BreadcrumbList (only the tools hub has one).
**INFO** - WebSite schema has no SearchAction - correct, the site has no search.
**INFO** - FAQPage rich-result eligibility is restricted by Google (since 2023) to authority health/gov sites - keep the schema for AEO/extractability, but don't expect FAQ rich snippets.
**PASS** - Validator sanity: all JSON-LD is inline `<script type="application/ld+json" dangerouslySetInnerHTML>` in server components (per house rule); no syntax-breaking values found; no placeholder values anywhere.

---

## 6. AEO (Answer Engines / AI Overviews / Featured Snippets)
**PASS** - 17 of 19 posts open with a bolded Quick-Answer lede that directly answers the target query (see Artifact D). All 19 bodies clear 1,250 words.
**FAIL (Medium)** - Two posts bury the answer: `dog-adolescence-phase.mdx` and `senior-dog-exercise.mdx` both open with a 2-paragraph anecdote (Kai forgetting his name / "Bailey is the old soul") and hold the bolded direct answer until paragraph 3. For "dog adolescence phase" / "senior dog exercise" query intents, AI Overviews and snippet extractors read the top - move the bold answer to paragraph 1, keep the anecdote after.
**PASS** - FAQ blocks exist on 17/19 posts and are wired to real FAQPage JSON-LD via convention-based extraction (`lib/blog/faq-schema.ts:79-93` - `## FAQ` H2 + `**Question?**` bold pairs → schema; returns null under 2 pairs, so no fake FAQPage on FAQ-less posts). Conditional rendering is exactly right.
**FAIL (Low)** - Two posts have no FAQ section at all: `what-is-a-dog-slatmill.mdx` (the site's definitional AEO asset - "what is" queries deserve an FAQ) and `what-to-expect-first-slatmill-session.mdx`.
**CONCERN** - Question-format H2s are thin: 13 of 19 posts have exactly ONE question-format H2; `calm-dog-during-fireworks` and `what-to-expect-first-slatmill-session` have zero. Strongest performers (`how-to-tire-out`, `what-is-a-dog-slatmill`, `why-structured-runs-matter`) carry 3 each. Real "how/why/is/can" search phrasing in H2s is the cheapest AEO lever the blog isn't fully pulling.
**PASS** - Extractable 40-60-word answers exist in 18/19 posts; `what-to-expect-first-slatmill-session` is the one weak entry (narrative lede, no clean factual answer block).
**NOTE** - Two ledes run long for extraction (~65-75 words): `can-you-over-exercise-a-dog`, `dog-anxiety-destructive-behavior-exercise`. Tighten toward 40-60.
**INFO** - Tools have answerable framing text around their outputs (verdict copy in the heat tool, target ranges in the calculator) - assessed further in D3.

---

## 7. GEO - Generative-Engine Optimization (LLM citability)
### llms.txt (`public/llms.txt` - static, hand-maintained)
**PASS** - Genuinely strong: business definition, problem statement, all 11 cities, full launched pricing (and ONLY launched tiers), requirements (matches the canonical copy: 4 months, rabies, waiver, Julius-K9 provided, vet clearance for cardiac/respiratory - lines 50-57), 6-question FAQ, **all 19 blog posts** with descriptive one-liners (lines 85-103), all 3 tools + hub, contact/booking, equipment section with the Julius-K9 page URL, and the new how-we-record page (line 128). Current as of the latest launches.
**NOTE** - Coverage gaps: `/services/`, `/pricing/`, `/faq/`, `/about/`, and the 11 city-page URLs are not listed as links (their *content* is present in prose, but a model can't cite the URLs). Add a short "Key pages" list.
**FAIL (Low)** - llms.txt repeats the numeric Facebook URL (line 118) - same sameAs debt as D5; will propagate into model citations.

### Entity consistency (what a model reads)
**PASS** - Name ("Kai's Run"), service ("mobile canine conditioning", slatmill), phone (850-218-5855), and the 11-city area are byte-consistent across layout schema, llms.txt, footer, contact page, and FAQ copy. The schema's `disambiguatingDescription` ("not a footwear brand") is exactly the kind of disambiguation LLMs need.
**PASS** - Requirements copy consistent across llms.txt, FAQ data, and services copy (spot-checked min-age/rabies/waiver/harness/vet-clearance).

### Attribution discipline
**PASS (mostly)** - 7 posts carry named-source citations; the site rule "stats carry a named source" holds except the three D16-flagged slips (senior-dog "one in five", too-hot's 135°F headline figure, fireworks' "widely reported").

### AI-crawler stance
**PASS** - Deliberate and explicit: GPTBot, Google-Extended, ClaudeBot, OAI-SearchBot, PerplexityBot, Amazonbot all explicitly allowed in robots.txt (lines 6-17). Stance is intentional (allow - consistent with llms.txt investment).

### Extractability
**PASS** - Quick-Answer ledes (17/19), FAQ blocks with schema, definition-first structure on `what-is-a-dog-slatmill`, and sectioned llms.txt - content is chunked for extraction. Cross-ref D6 for the two buried-lede posts.

---

## 8. Local / Geographic SEO
### NAP consistency
**PASS** - Name and phone are identical everywhere (schema `telephone: +18502185855`, footer `tel:` link, contact page, terms, llms.txt, privacy). No street address appears anywhere in rendered copy or footer - correct for a SAB.
**CONCERN** - The one address-shaped assertion is the schema `PostalAddress` (locality Destin + ZIP 32541, `app/layout.tsx:89-95`) - see D5. It doesn't contradict rendered copy (nothing renders an address) but should match the GBP's no-address stance.

### areaServed / service-area modeling
**PASS** - 11 `City` objects in the business schema exactly matching the footer city list, llms.txt, and the 11 live city pages. `geo` GeoCoordinates anchor the service origin. No GeoCircle - the explicit City list is the stronger representation for this footprint anyway.

### City pages (doorway test - detail in D2)
**PASS** - Genuine per-city intent: named neighborhoods (4/city), military bases, housing/breed patterns, unique H1s/titles. 302-467 unique words per city.
**PASS** - Local internal linking: every city page carries `crossLinks` to sibling cities, the hub links all 11, the footer links all 11 site-wide, and blog posts link city pages contextually (e.g. `what-is-a-dog-slatmill` links 7 city/service-area URLs).
**CONCERN** - Identical Founding-Athlete close with hardcoded $200 on all 11 pages (D2/D16 cross-ref).

### GBP alignment
**INFO (code-review-based)** - GBP itself can't be audited from the repo. What the code asserts matches the documented GBP setup: name exactly "Kai's Run", SAB/no address, service-area cities aligned. Schema `@type AnimalService` is compatible with the "Pet Trainer" primary category. Verification pending per project docs - once verified, revisit the footer's Maps search-query link (`Footer.tsx:74`) and replace with the real GBP/Maps profile URL.

### Geo signals in content
**PASS** - Titles carry "Destin FL"/"Emerald Coast" on home, about, blog listing, contact, faq, pricing, services, service-area, tools. `/services/` H1 names three cities. Blog descriptions localize where natural ("Destin, FL." in too-hot). Not over-stuffed.
**PASS** - Map embed: none - correct for an addressless SAB (an embedded pin would assert a location GBP doesn't).

---

## 9. Internal Linking & Architecture
### Orphans & click depth
**PASS** - Zero orphan routes: 8 nav links + Book Now cover the hubs; the footer covers home, how-we-record, contact, privacy, terms, and all 11 cities; every post is reachable from `/blog/` (all 19 in CATEGORY_MAP - verified, none stranded). Everything is ≤2 clicks from home.
**NOTE** - The nav "Equipment" item points directly at the single product page (`Navbar.tsx:11`); no `/equipment/` hub route exists, so the naked URL `/equipment/` 404s (verified live). Not a defect today (nothing links `/equipment/`), but the nav label implies a section - when a second equipment page ships, build the hub; until then this is fine.

### Hub/spoke health
**PASS** - Blog cluster interlinking is strong: 1-10 post-to-post links per post (median ~6), tools linked from 12 posts, cities linked from posts, hub→city→hub loops intact.
**CONCERN** - `getRelatedPosts` is newest-first, not topical (`lib/blog/posts.ts:131-136`): every post's "related" block shows the same 2 newest posts site-wide. This weakens topical clustering + AEO adjacency signals and wastes the block's link equity (as spec'd: CONCERN, not FAIL). A keyword/category-overlap sort using the existing CATEGORY_MAP would fix it cheaply.
**CONCERN** - 7 posts skip obvious tool links where topically relevant: `dog-reactive-on-leash` (calculator/heat), `dog-adolescence-phase` (calculator; has a Florida-heat section with no heat-tool link), `senior-dog-exercise` (BCS tool despite a weight section; heat tool despite a summer-pavement section), `calm-dog-during-fireworks` (heat tool - links the post instead, acceptable), `meet-kai`, `what-to-expect-first-slatmill-session`, `why-we-record-every-session` (genuinely less relevant). The first three are real misses.

### Anchors, breadcrumbs, equity
**PASS** - Anchor text descriptive site-wide; zero generic anchors (grep-verified).
**NOTE** - Visible breadcrumbs only on blog posts + city pages (D4 cross-ref).
**PASS** - Link equity flows to money pages: every post carries 1-3 conversion links (/book/, /pricing/, /services/), nav CTA on every page, footer Book Now on every page.

---

## 10. Metadata / Social / OG
**PASS** - OG + Twitter tags on every content route; `og:url` equals the canonical (apex, trailing slash) on all pages that set OG; `metadataBase` (`app/layout.tsx:15`) absolutizes relative image paths correctly.
**FAIL (Low)** - `/privacy/` and `/terms/` set NO openGraph block, so shares inherit the ROOT og (title "Kai's Run | Mobile Dog Gym", **og:url = homepage**) - og:url contradicts those pages' canonicals. Two-line fix each.
**INFO** - `/contact/` sets og:url but no og:image (inherits the root image - acceptable).
**PASS** - `public/images/og-image.png` measured **1200x630**, 125 KB, serves 200 live. Per-post branded OG cards via `app/og/route.tsx` (`/og/?title=...&eyebrow=Field Notes`) verified live: 200, image/png. Frontmatter `image:` overrides work (2 posts use them); every post gets a unique card otherwise - intentional auto-card, not a duplicate-OG smell.
**PASS** - Equipment and how-we-record have dedicated OG images (`og-julius-k9-idc-powerharness.jpg`, `og-how-we-record.jpg`).
**PASS** - Favicon set complete and referenced: `favicon.ico`, 16/32 PNGs, `apple-touch-icon.png` 180x180 (`app/layout.tsx:20-27`), manifest 192/512 icons - all files exist in `public/`.
**PASS** - `locale: en_US`, `themeColor #0F1117`, `twitter:card summary_large_image` consistent.
**NOTE** - No `title.template` in root metadata - each page hand-appends the brand suffix (works, but the D4 suffix drift is the symptom).

---

## 11. Performance / Core Web Vitals
> All scores in this dimension are **code-review-based** - no live Lighthouse/CrUX run was performed.

### LCP
**PASS** - Hero LCP image is well set up: `components/sections/Hero.tsx:20-27` uses `/images/hero/hero-main.webp` (51 KB, 1264x848) with explicit `width`/`height`, `fetchPriority="high"`, and no `loading="lazy"`. This is a textbook LCP asset.
**PASS** - `/how-we-record/` hero also carries `fetchPriority="high"` (`HowWeRecordPageClient.tsx:107`).
**PASS** - Fonts are non-render-blocking: `app/layout.tsx:240-252` preconnects to Google Fonts, preloads the stylesheet, and injects it via an inline async loader with `display=swap`. No `@import`.
**NOTE** - The font stylesheet is injected by inline JS (`app/layout.tsx:248-252`); with JS disabled, brand fonts never load (system fallback renders - acceptable degradation, but a `<noscript><link rel="stylesheet"></noscript>` fallback would be free).

### Images
**FAIL (Medium)** - No responsive images anywhere: zero `srcset`/`sizes` in the repo. Every viewport downloads full-size assets. Worst offenders (all shipped as single-resolution JPG):
- `public/images/equipment/julius-k9-idc-powerharness-three-sizes.jpg` - 1.3 MB
- `public/images/equipment/kai-julius-k9-harness-alert.jpg` - 1.2 MB
- `public/images/equipment/bailey-julius-k9-harness.jpg` - 942 KB
- `public/images/brave-4-retail-kit.jpg` - 722 KB (how-we-record)
- 6 more JPGs in the 300-900 KB range (equipment/, brave-4, social/)
`/equipment/julius-k9-idc-powerharness/` ships ~5-6 MB of JPG. These pages will have poor mobile LCP despite lazy-loading. Minimum fix: re-encode to WebP at display size (the hero proves the pipeline exists - 51 KB WebP).
**PASS** - `loading="lazy"` correctly applied to 14 below-fold images (Footer, galleries, equipment shots, blog images); LCP candidates left eager.
**NOTE** - No AVIF variants; `next.config.js:7` declares avif/webp formats but that only affects `next/image`, which is banned - so the declaration is inert.

### CLS
**PASS** - Explicit `width`/`height` on all audited `<img>` elements (Hero, Navbar `Navbar.tsx:49-55`, Footer `Footer.tsx:92-99`, blog figures).
**PASS** - Ad slots reserve space (`AdUnit.tsx:39` `minHeight: 250`); Square booking widget host reserves `minHeight: 700px` (`BookPageClient.tsx:206`) - CLS-safe embed.

### JS / third parties
**PASS** - GA4, Google Ads gtag, Clarity, AdSense all load via `next/script strategy="afterInteractive"` - none render-blocking.
**CONCERN** - Lenis smooth-scroll runs an unconditional, self-perpetuating `requestAnimationFrame` loop on every route for the life of the page (`components/providers/LenisProvider.tsx:14-17`), and the recursive rAF id is never cancelled on unmount (only `lenis.destroy()` is called). Continuous main-thread work on pages that don't need it (privacy, terms, tools).
**INFO** - Square appointments widget injected via `useEffect` `<script async>` (`BookPageClient.tsx:87-99`) per project rule (never `next/script`), with prior-instance cleanup.

### Caching
**PASS** - `next.config.js:59-66` sets `Cache-Control: public, max-age=3600, must-revalidate` on `/sitemap.xml` (verified in config). Vercel edge handles static asset caching.

---

## 12. Accessibility

### Contrast (computed, WCAG 2.1 AA)
**FAIL (High)** - `text-brand-teal` (#0A5C52) on brand-black (#0F1117) = **2.40:1**; on brand-charcoal (#1A1F2E) = **2.07:1**. AA requires 4.5:1 (3:1 large text) - teal text fails even the large-text bar. Used ~166 times, including as *the* link color in `CookieConsent.tsx:29` and as eyebrow/label text site-wide (`Hero.tsx:57`, section eyebrows). Teal works as a background (white on #0A5C52 = 6.4:1) - the failure is teal-as-foreground-text on dark.
**PASS** - `text-brand-gray` (#9A9590) on brand-black = **6.34:1** - passes AA for normal text (221 uses are fine).

### Focus & keyboard
**FAIL (Medium)** - Visible focus styles are absent almost everywhere: forms use `outline-none` with only a border-color change (`ContactFormSection.tsx:19`, `WaitlistForm.tsx:14`, `LeadMagnetForm.tsx:12`, `Calculator.tsx:167,230,262`, `HeatChecker.tsx:170`); nav links have no focus style at all. Only `components/ui/KaiGallery.tsx:62,93,107,118` implements proper `focus-visible:outline-2`.
**FAIL (Medium)** - Mobile nav menu (`Navbar.tsx:78-95`): hamburger has `aria-label` but **no `aria-expanded`, no `aria-controls`**; the fullscreen overlay has **no focus trap and no Escape-to-close**. Body scroll is locked correctly (`Navbar.tsx:30-36`).
**FAIL (Medium)** - `ExitIntentPopup.tsx`: no `role="dialog"`, no `aria-modal`, no focus management, no Escape handler (close button does have `aria-label="Close"`, line 40).

### Forms
**PASS** - All form fields have real `<label htmlFor>` / `id` pairs (ContactFormSection, WaitlistForm, LeadMagnetForm); errors use `role="alert" aria-live="polite"` (`ContactFormSection.tsx:139`, `WaitlistForm.tsx:266`, `LeadMagnetForm.tsx:78`).
**NOTE** - Zero occurrences of `aria-invalid`, `aria-required`, or `aria-describedby` across the repo - error text is announced but not programmatically tied to its field.

### Motion
**CONCERN** - `prefers-reduced-motion` is honored ad hoc (HeatChecker, ReadingProgressBar, FieldNotesIndex, KaiGallery/Section) but NOT in the global animation layer: `lib/variants.ts` (fadeUp/stagger/scaleIn) has no reduced-motion variants, `Hero.tsx` and `Navbar.tsx` animate unconditionally, and the Lenis smooth-scroll loop runs regardless of the user's motion preference (`LenisProvider.tsx:14-17`).

### Semantics & misc
**PASS** - `<html lang="en">` (`app/layout.tsx:238`).
**PASS** - Alt text: 24 real `<img>` elements, zero missing `alt`; the two `alt=""` (`FieldNotesIndex.tsx:92,156`) are decorative card thumbnails - correct usage.
**PASS** - `FaqAccordion.tsx:43` sets `aria-expanded` on native buttons (keyboard operable).
**NOTE** - Accordion lacks `aria-controls`/panel `id` pairing; panels unmount instead of collapse (screen readers get no region announcement).
**NOTE** - Hamburger tap target is 24x24px (`Navbar.tsx:80` `w-6 h-6`) - below the ~44px recommended minimum.

---

## 13. Mobile / Responsive
> Code-review-based (no device-lab run).

**PASS** - Viewport correctly exported: `app/layout.tsx:56-60` (`width: device-width, initialScale: 1`, no `maximum-scale` cap - zoom not blocked).
**PASS** - Layouts are Tailwind-responsive throughout (`md:`/`lg:` breakpoints in Navbar, Footer grid `grid-cols-1 md:grid-cols-3`, section components); Tailwind v4 preflight gives images `max-width: 100%` - no fixed-width overflow found in audited components.
**PASS** - Dedicated mobile nav (fullscreen overlay, scroll-locked) rather than a squeezed desktop nav.
**FAIL (Low)** - Small tap targets: hamburger 24px (`Navbar.tsx:80`); footer link lists are `text-sm` with `space-y-2` - tappable but tight (`Footer.tsx:130-141`).
**INFO** - The Square booking iframe/widget is third-party; its mobile behavior can't be verified from code.

---

## 14. Analytics / Consent / Privacy / Legal

### Consent gating
**PASS** - GA4 is genuinely consent-gated: `components/ui/GA4Script.tsx:12-20` renders nothing unless `localStorage['cookie-consent'] === 'accepted'` or the `cookie-consent-accepted` event fires; a prior "declined" stays off on later loads (value `'declined'` ≠ `'accepted'`). Tool-usage events are also gated (`lib/analytics/trackToolUse.ts:19`).
**FAIL (High)** - Microsoft Clarity fires completely ungated: `components/analytics/MicrosoftClarity.tsx:7` loads `strategy="afterInteractive"` for every visitor on every route, before and regardless of consent - session recording + cookies with no opt-in. This is the exact asymmetry the privacy policy's "Ads are not shown to visitors who decline cookies" framing papers over: analytics/session-replay ISN'T held to the same standard as GA4. For a US/Florida SAB the legal exposure is modest (no GDPR traffic to speak of), but it contradicts the site's own consent UX and Clarity's terms recommend disclosure + consent where required.
**CONCERN** - Google Ads gtag (`components/GoogleAds.tsx`, injected at `app/layout.tsx:261`) loads unconditionally in `<head>` when `NEXT_PUBLIC_GOOGLE_ADS_ID` is set, and there is **no Google Consent Mode v2** anywhere (zero `gtag('consent','default',...)` hits). If Google Ads campaigns are running, conversion cookies set pre-consent.
**PASS** - Cookie consent UI exists with real accept/decline paths (`components/ui/CookieConsent.tsx:9-19`; key `cookie-consent`, accept event `cookie-consent-accepted`).
**NOTE** - Decline dispatches no event; anything already listening keeps waiting (harmless today since only accept-listeners exist).

### AdSense placement
**FAIL (Medium)** - The AdSense loader script loads on **every route** - including `/tools/*` and the bottom-funnel `/book/`, `/contact/`, `/thank-you/` (`components/ui/AdSenseLoader.tsx` mounted at `app/layout.tsx:265` with no route exclusion). Project rule: AdSense must NOT load on tool pages (the embed pitch promises "no ads") or conversion pages. Mitigating: no visible ad can render anywhere because...
**INFO** - ...both ad units still carry placeholder slot IDs: `TODO_MID_ARTICLE_SLOT_ID` / `TODO_FOOTER_AD_SLOT_ID` (`components/blog/BlogPostWithAds.tsx:12-13`). Ad units themselves are consent-gated (`AdUnit.tsx:24-31`) and exist only on blog posts. So today: verification script everywhere, rendered ads nowhere.
**PASS** - Correct pub ID `ca-pub-5399156622542127` (`AdSenseLoader.tsx:3`); stale ID absent; `public/ads.txt` correct.

### Privacy & terms pages
**PASS** - `/privacy/` and `/terms/` exist and are footer-linked on every page (`Footer.tsx:177-182`).
**FAIL (Medium)** - The privacy policy never mentions Google Analytics. `app/privacy/page.tsx` "Cookies and session tools" (line 38) discloses only Microsoft Clarity; GA4 (G-1P5ST40L2E) collects on accepted visits with zero disclosure. Add GA4 to that section.
**FAIL (Medium)** - The privacy policy predates and omits the **session-recording practice**: every conditioning session is filmed on a two-camera rig and footage is delivered to owners (`/how-we-record/`, blog post, llms.txt:128). Policy is "Last updated: May 12, 2026" (`app/privacy/page.tsx:19`) - before the July recording launch - and only covers *website* session recordings (Clarity). Filming clients' property/dogs and retaining/delivering footage is a real-world data practice that belongs in the policy.
**CONCERN** - Policy states "Ads appear only on our blog articles and free tool pages" (`app/privacy/page.tsx:44`) - this contradicts the project rule that tools must stay ad-free (and the tools embed pitch). Either the policy or the rule is wrong; today no ads render anywhere, so pick one and align.
**PASS** - Policy correctly describes Formspree + Mailchimp data flows (line 36) and the Clarity disclosure (line 38) and includes opt-out links for personalized ads (lines 42-43).

---

## 15. Security / Headers / Secrets

### Headers (verified LIVE against production, 2026-07-08)
**PASS** - Non-tools routes serve: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` (config: `next.config.js:30-43`; confirmed live on `/`).
**PASS** - `/tools/*` drops X-Frame-Options and serves `Content-Security-Policy: frame-ancestors *` (embeddable by design), keeping the other locks (`next.config.js:44-57`; confirmed live on `/tools/too-hot-to-walk/`).
**PASS** - HSTS is live: `strict-transport-security: max-age=63072000` (injected by Vercel edge - not in next.config, which is fine).
**NOTE** - No full CSP (script-src/img-src). With GA4/Clarity/AdSense/Square/Fonts all injecting, a strict CSP is real work - backlog item, not a defect.

### Secrets (full-repo grep)
**PASS** - Mailchimp API key: **zero hits** anywhere in the repo. Subscribe flow posts to the Cloudflare Worker `https://kaisrun-subscribe.kaisrunmobile.workers.dev` (`lib/subscribe.ts:7-8`) - key stays server-side. Correct architecture.
**PASS** - The only server secret, `OPENWEATHER_API_KEY`, is read exclusively inside the API route (`app/api/heat/route.ts:95,121`) - never client-reachable.
**PASS** - `.env.local` exists locally but is gitignored (`.gitignore:34,42`); only `.env.example` is tracked. Verified via `git ls-files`.
**PASS** - No hardcoded key/token/secret patterns matched anywhere in app/components/lib/public.
**INFO** - Formspree form IDs (`mpqbbwrl` in `LeadMagnetForm.tsx:7`, others) and the Clarity/GA4/AdSense public IDs are intentionally public - not leaks.
**PASS** - IndexNow key file `public/kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n.txt` exists, content matches the key, and serves 200 live.

---

## 16. Brand / Voice Compliance
> Judged against the audit's source-of-truth rules (spaced hyphens, no `!`, no prices in body, banned-word list). Note: `CLAUDE.md:76` still *prescribes* em dashes - the internal docs contradict the current voice rule; see D17.

**FAIL (High)** - Em dashes in rendered copy, site-wide:
- **MDX: 167 occurrences across 9 of 19 posts** - `what-is-a-dog-slatmill`, `calm-dog-during-fireworks`, `high-energy-dog-breeds-exercise-guide`, `can-you-over-exercise-a-dog`, `dog-anxiety-destructive-behavior-exercise`, `why-structured-runs-matter`, `too-hot-to-walk-your-dog`, `what-to-expect-first-slatmill-session`, `how-to-tire-out-a-high-energy-dog`. The other 10 posts are em-dash-clean (the newer voice).
- **TSX copy: ~147** - heaviest: `app/services/ServicesPageClient.tsx` (13), `app/about/AboutPageClient.tsx` (11), `app/layout.tsx` (8, incl. schema/OG strings), `ContactFormSection.tsx` (7), `app/faq/page.tsx` (7) plus `lib/faq-data.ts` (16 - these render as FAQ answers AND FAQPage schema text).
**FAIL (High)** - Prices in body copy (rule: offer names only): `what-is-a-dog-slatmill.mdx:116` ($35), `why-structured-runs-matter.mdx:125` ($35 + $200), `dog-treadmill-vs-walk-comparison.mdx:105` ($35 + $200), `how-much-exercise-does-my-dog-need.mdx:123` ($35 + $200), `how-to-tire-out-a-high-energy-dog.mdx:112` ($35).
**FAIL (Low)** - Banned word: "cute" in `meet-kai-the-dog-behind-kais-run.mdx:20` ("Drive is not energy in the cute sense") - meta-usage, but the rule is absolute.
**CONCERN** - Filler words in MDX prose: "just" x44, "easy" x5, "simply" x1 (heaviest: `why-structured-runs-matter.mdx` 7, `what-to-expect-first-slatmill-session.mdx` 6). The banned-list treats these as defects; a surgical pass per post is warranted.
**PASS** - Zero exclamation marks in MDX prose and in TSX visible strings.
**PASS** - "Emerald Paws" - zero occurrences in any rendered content, schema, or metadata (only in internal docs as the do-not-use instruction).
**PASS** - Business name renders as "Kai's Run" consistently (schema `name`, titles, footer, llms.txt).
**FAIL (Low)** - Unsourced statistic (rule: stats carry a named source): `senior-dog-exercise.mdx` claims "one in five adult dogs" develop osteoarthritis with no named source; `too-hot-to-walk-your-dog.mdx` attributes its 125°F/60-second claim (JAMA) but leaves the headline 85°F-air → 135°F-asphalt figure unattributed in body; `calm-dog-during-fireworks.mdx` pairs a sourced Rover survey with a "widely reported" (unnamed) claim.
**PASS** - 7 posts carry properly named citations (Rover 2026 survey, Newcastle/Nottingham 2020, Scientific Reports 2020, Dodman/Tufts, UK Kennel Club, APOP + Purina, JAMA); the rest make no statistical claims.

---

## 17. Dead Code / Hygiene / Stale Docs

### Stale docs that contradict live code (worst first)
**FAIL (High)** - `.claude/skills/kaisrun-context/SKILL.md:13,23,25` still claims "Hosting: GitHub Pages static export - output:'export', no SSR, no API routes, **No Vercel**". Every claim is false (Vercel SSR since June 2026). This file is loaded as agent context - it will actively mislead future Claude sessions.
**FAIL (Medium)** - `SEO-STATUS.md:4-5` says canonicals/schema/OG/sitemap were "normalized to **www**" - the exact opposite of the apex-only rule the codebase now follows. Anyone acting on this doc would reintroduce the www defect.
**FAIL (Medium)** - `INTEGRATIONS.md:36` (and the skill file at :84) document a "Founding 20" Formspree form `mojrrvdd` that appears nowhere in source (grep: 0 hits in app/components/lib) - phantom integration.
**CONCERN** - `AGENTS.md:13,39,78` has been partially updated to Vercel SSR but `CODEBASE-MAP.md:261-262` documents it self-contradicting in older sections (static export, `/out`, no API routes).
**CONCERN** - Voice-rule schism: `CLAUDE.md:76` and `brand-reference.md:104-105` prescribe em dashes; the audit brief and the two newest posts use spaced hyphens. Pick one, codify it, update the docs - until then every content pass will re-litigate this (CODEBASE-MAP.md:275 flags the same).
**INFO** - `docs/` holds `GOOGLE_ADS_SETUP.md`, `SEO-ADSENSE-AUDIT-2026-07.md`, and untracked `docs/session-to-reel-guide.md` (git status `??`) - decide: commit or discard.

### Leftover machinery & artifacts
**NOTE** - GitHub-Pages leftovers: `public/.nojekyll` (inert, 0 bytes) still ships to production; local `out/` build dir exists but is gitignored. `public/CNAME` and `public/_redirects` already removed.
**NOTE** - `cluster-plan.json` (35 KB planning artifact) is **tracked** at repo root - move to docs/ or untrack.
**PASS** - `tsconfig.tsbuildinfo` and `out/` are correctly gitignored; `.env.local` untracked.

### Dead code
**FAIL (Low)** - `lib/site-images.ts:24` exports `FAVICON = '/images/logos/favicon.png'` - zero consumers (grep confirmed), and the asset is a **935 KB PNG** shipped in public/. Dead export + dead heavyweight asset (real favicons live at `/favicon.ico` etc. per `app/layout.tsx:20-27`).
**CONCERN** - Two different `SpotsCounter` implementations both render on the homepage: `components/sections/SpotsCounter.tsx` (via `app/page.tsx:6`) and `components/ui/SpotsCounter.tsx` (via `FoundingOffer.tsx:5`, also on `app/page.tsx`). Neither is dead - but two spot-counters with separate implementations is drift waiting to happen (both must read `public/data/config.json` identically).
**NOTE** - `console.info`/`console.warn` funnel logging ships in production code: `lib/bookIntent.ts:13`, `lib/googleAds.ts:44-52`, `app/book/BookPageClient.tsx:57,65,137`, `app/thank-you/ThankYouConversionTracker.tsx:51,56`, `components/ui/Button.tsx:43`. Looks intentional (funnel debugging) - gate behind `NODE_ENV` or accept the noise.
**PASS** - No unused components (SlatmillExplainer, KaiGallery, Figure, ReadingProgressBar, MobileAdvantage all verified imported); no large commented-out blocks; TODO debt is exactly 3 lines, all the AdSense slot placeholders (`BlogPostWithAds.tsx:8,12-13`).
**INFO** - `lib/constants.ts:3` `FOUNDING_SPOTS_REMAINING = 17` is deprecated and stale (live value: 14 in `public/data/config.json`) but explicitly marked "do not use for display" - drift is contained by the comment.

### Blog front-matter hygiene
**NOTE** - Dead front-matter fields accumulate across posts: 7 posts carry `slug:` (ignored - slug is always the filename) and 6 carry `readTime:` (ignored - computed at `lib/blog/posts.ts:57-61`); `what-to-expect-first-slatmill-session.mdx` additionally has two unrecognized fields (`tags:`, `imageAlt:`). Harmless today, but they imply behavior that doesn't exist - a future author will trust them.
**CONCERN** - `keywords` front-matter appears in three inconsistent shapes: JSON array on one line (3 posts), bare comma list (7), quoted string (2). The single-line parser (`lib/blog/posts.ts:38-55`) stores whatever string it finds - the JSON-array form ships literal brackets/quotes into `<meta keywords>`. Standardize on the bare comma list.
**NOTE** - 6 posts lack `dateModified` (falls back to `date` in schema - valid, but edits to those posts won't surface as freshness signals until the field is added).

---

## 18. Conversion / UX / Trust
### CTAs & booking path
**PASS** - CTA discipline holds: nav "Book Now" on every page, FoundingOffer + two spots counters on home, every post closes with offer-name CTAs, city pages close with the Founding Athlete pitch. Offer naming is consistent (Intro Session, Founding Athlete Program).
**FAIL (High, cross-ref D1)** - The booking path's last mile is fragile: `/book/` renders nothing but "Loading…" until JS + the third-party Square script both succeed. No tel: fallback, no plain-HTML contact alternative on the page that closes the sale. (An orphaned component that DOES contain a tel: link - `app/book/BookingContent.tsx` - was built and never wired; see D17.)
**PASS** - Square postMessage conversion tracking + funnel intent logging are in place (`BookPageClient.tsx:110-146`, `lib/bookIntent.ts`).

### Contact & phone
**PASS** - `tel:+18502185855` linked in the footer (every page), contact page, terms, thank-you. Contact page offers phone/email/form with response expectation ("Travis responds personally").

### Trust signals
**PASS** - Unusually strong for a pre-opening business: `/how-we-record/` (two-camera transparency) + RecordingSection on home + the why-we-record post; requirements published (waiver, rabies, min age); About page with Person schema + the origin story; "Licensed & Insured" in the footer; military/first-responder discount published.
**FAIL (Low)** - Spots-counter integrity: live data is `public/data/config.json` (14/20 remaining, lastUpdated 2026-07-04 - fresh ✔), but `/pricing/` prerenders the DEPRECATED constant (17 remaining, `lib/constants.ts:3`) and corrects to 14 after a client fetch - users can watch the number jump 17→14. Also two separate SpotsCounter implementations must stay in sync (D17). Initialize prerender from config.json (it's read at build time elsewhere) or render a skeleton until fetch resolves.
**FAIL (Low)** - Default Next 404 (D1) - a lost visitor gets no nav, no search, no CTA. For a site doing paid Google Ads (gtag conversion wiring exists), broken/mistyped URLs leak spend.
**INFO** - ExitIntentPopup fires on `mouseleave` only - desktop-only by design; no mobile equivalent (fine; mobile exit-intent is intrusive).

---

## Special Artifact A - Page Categorization Matrix
Words = estimated rendered body words (code-review). Canonical = apex + trailing slash + self-referencing. Index = expected GSC status.

### Core pages
| Route | Type | Target query / intent | Primary keyword | Words | Page schema (beyond site-wide AnimalService+WebSite) | Canonical | Thin risk | Cannibalization partner | Expected index |
|---|---|---|---|---|---|---|---|---|---|
| / | Home/LP | brand + "mobile dog gym destin" | mobile dog gym Destin FL | ~1,400 | none page-level | OK | Low | - | Indexed |
| /about/ | About/E-E-A-T | brand "who is behind" | Kai's Run Travis | ~950 | Person#travis, Breadcrumb | OK | Low | - | Indexed |
| /services/ | Service | "dog conditioning sessions destin" | dog conditioning Destin | ~1,400 | Service+9 Offers, Breadcrumb | OK | Low | /pricing/ (offers overlap) | Indexed |
| /pricing/ | Pricing | "kai's run pricing / dog gym cost" | mobile dog gym pricing | ~700 | Service+9 Offers, Breadcrumb, FAQPage | OK | Low | /services/ | Indexed |
| /book/ | Conversion | "book dog conditioning" (nav intent) | book session | **~10 static** | none | OK | **HIGH (JS shell)** | - | **At risk: Crawled-not-indexed** |
| /contact/ | Contact | brand contact | contact Kai's Run | ~190 | ContactPage | OK | Medium | - | Indexed (entity) |
| /faq/ | FAQ | long-tail question set | slatmill dog FAQ | ~2,000 | FAQPage(15), Breadcrumb | OK | Low | - | Indexed |
| /how-we-record/ | Trust/explainer | "dog trainer records sessions" | session recording transparency | ~650 | WebPage, Breadcrumb | OK | Low | /blog/why-we-record... (managed) | Indexed |
| /equipment/julius-k9-idc-powerharness/ | Product editorial | "julius k9 idc powerharness" | Julius-K9 IDC Powerharness | ~2,400 | Article(about Product), FAQPage, Breadcrumb | OK | Low | - | Indexed |
| /service-area/ | Hub | "dog conditioning near me / service area" | Emerald Coast service area | ~450 | none page-level | OK | Low | - | Indexed |
| /tools/ | Hub | "free dog tools" | free dog tools | ~90+cards | Breadcrumb | OK | Medium | - | Indexed or Discovered-not-indexed |
| /privacy/ | Legal | - | - | ~900 | none | OK | - | - | Indexed (irrelevant) |
| /terms/ | Legal | - | - | ~750 | none | OK | - | - | Indexed (irrelevant) |
| /thank-you/ | Conversion end | - | - | ~130 | none | absent (noindex) | - | - | Excluded by design |

### Tools
| Route | Target query | Primary keyword | Words | Schema | Canonical | Thin risk | Cannibalization partner | Expected index |
|---|---|---|---|---|---|---|---|---|
| /tools/too-hot-to-walk/ | "too hot to walk dog" (do-now) | pavement temperature dog | ~550+app | WebApplication, FAQPage | OK | Low | blog too-hot post (managed split) | Indexed |
| /tools/dog-exercise-calculator/ | "dog exercise calculator" | dog exercise calculator | ~650+app | WebApplication, FAQPage | OK | Low | how-much-exercise post (split) | Indexed |
| /tools/dog-body-condition-score/ | "dog body condition score" | dog body condition score | ~700+app | WebApplication, FAQPage | OK | Low | is-my-dog-overweight post (split) | Indexed |

### Service-area cities (all: type=Local LP · schema=LocalBusiness#localbusiness+Breadcrumb · canonical OK · partner=sibling cities)
| City route | Target query | Unique words | Thin risk | Expected index |
|---|---|---|---|---|
| /service-area/destin/ | dog conditioning Destin | ~397 | Low | Indexed |
| /service-area/fort-walton-beach/ | dog conditioning FWB | ~366 | Low | Indexed |
| /service-area/niceville/ | dog conditioning Niceville | ~370 | Low | Indexed |
| /service-area/miramar-beach/ | dog conditioning Miramar Beach | ~467 | Low | Indexed |
| /service-area/sandestin/ | dog conditioning Sandestin | ~448 | Low | Indexed |
| /service-area/shalimar/ | dog conditioning Shalimar | ~376 | Low | Indexed |
| /service-area/mary-esther/ | dog conditioning Mary Esther | ~337 | Low-Med | Indexed |
| /service-area/navarre/ | dog conditioning Navarre | ~338 | Low-Med | Indexed |
| /service-area/santa-rosa-beach/ | dog conditioning Santa Rosa Beach | ~302 | **Med (lightest)** | Indexed / watch |
| /service-area/bluewater-bay/ | dog conditioning Bluewater Bay | ~308 | Med | Indexed / watch |
| /service-area/valparaiso/ | dog conditioning Valparaiso | ~316 | Med | Indexed / watch |

### Blog posts (all: BlogPosting+Breadcrumb[+FAQPage unless noted] · canonical OK · 1,250+ words → thin risk Low · expected: Indexed)
| Post | Target query | Words | Cannibalization partner |
|---|---|---|---|
| how-to-tire-out-a-high-energy-dog (dedicated route) | how to tire out a high energy dog | 2,473 | Cluster A primary |
| high-energy-dog-breeds-exercise-guide | high energy dog breeds exercise | 2,422 | - |
| dog-anxiety-destructive-behavior-exercise | dog destructive when alone | 2,107 | Cluster B primary |
| dog-adolescence-phase | dog adolescence phase | 1,968 | - |
| dog-treadmill-vs-walk-comparison | dog treadmill vs walk | 1,939 | Cluster A |
| dog-thunderstorm-anxiety | dog thunderstorm anxiety | 1,933 | Cluster C |
| why-structured-runs-matter | why structured runs/exercise | 1,875 | Cluster A |
| senior-dog-exercise | senior dog exercise | 1,864 | - |
| dog-reactive-on-leash | dog reactive on leash | 1,818 | Cluster B |
| how-much-exercise-does-my-dog-need | how much exercise does my dog need | 1,814 | calculator tool (split) |
| calm-dog-during-fireworks | calm dog during fireworks | 1,739 | Cluster C |
| is-my-dog-overweight | is my dog overweight | 1,716 | BCS tool (split) |
| too-hot-to-walk-your-dog | when is it too hot to walk dog | 1,682 | Cluster C primary (info) |
| dog-park-not-tiring-dog-out | dog park not tiring dog out | 1,617 | Cluster A (near-subset) |
| what-is-a-dog-slatmill (no FAQ) | what is a dog slatmill | 1,518 | - |
| why-we-record-every-session | why record dog training sessions | 1,487 | /how-we-record/ (managed) |
| meet-kai-the-dog-behind-kais-run | brand story | 1,416 | - |
| what-to-expect-first-slatmill-session (no FAQ) | first slatmill session what to expect | 1,380 | - |
| can-you-over-exercise-a-dog | can you over exercise a dog | 1,291 | - |

---

## Special Artifact B - Thin / GSC Index-Risk Table
Only routes with real index risk, the specific reason, and the minimum change to clear it.

| Route | Risk | Why | Minimum fix |
|---|---|---|---|
| /book/ | **HIGH - Crawled/Discovered-not-indexed** | JS shell: static HTML ≈10 words, no H1, no body (Suspense fallback only; `app/book/BookPageClient.tsx`) | Server-render H1 + offer copy + requirements + tel: link around the client Square widget island |
| /tools/ | Medium | ~90 words of framing for 3 cards | Add 2-3 sentences per tool card (what it answers, for whom) - ~150 words |
| /contact/ | Low-Medium | ~190 words, generic contact intent | One paragraph of service/area context; entity signals (ContactPage schema, NAP) already help |
| /service-area/santa-rosa-beach/ | Low-Medium | Lightest city page (302 unique words) + templated close | +100-150 words: named parks/trails/HOA specifics; vary the closing paragraph |
| /service-area/bluewater-bay/ | Low-Medium | 308 unique words, same pattern | Same treatment |
| /service-area/valparaiso/ | Low-Medium | 316 unique words, same pattern | Same treatment |

Every other route: substantive server-rendered content + unique intent - no realistic index risk found.

---

## Special Artifact C - Cannibalization Map
Clusters of routes competing for the same query intent, with the designated primary and the fix.

### Cluster A - "structured work beats chaotic play" (4 posts, strongest overlap)
| Route | Role |
|---|---|
| /blog/how-to-tire-out-a-high-energy-dog/ | **PRIMARY** (dedicated route, 2,473 words, 3 Q-H2s, strongest asset) |
| /blog/why-structured-runs-matter/ | overlaps the identical arousal-vs-fatigue thesis |
| /blog/dog-park-not-tiring-dog-out/ | near-subset: how-to-tire-out already contains a dog-park callout section |
| /blog/dog-treadmill-vs-walk-comparison/ | same "walks don't condition" thesis from the comparison angle |
**Fix: differentiation, not consolidation.** Each post has a distinct head query (how to tire out / why structured / dog park not tiring / treadmill vs walk). Sharpen each post to its own query: cut the duplicated arousal-vs-fatigue exposition from the three secondaries down to one paragraph + a link to the primary, and make sure each post's title/H1 stays glued to its own query. Interlink all four (currently they do link, which helps Google pick per-query winners).

### Cluster B - "drain the tank first" behavior pair
| Route | Role |
|---|---|
| /blog/dog-anxiety-destructive-behavior-exercise/ | **PRIMARY** for destructive/anxiety intent (2,107 words, sourced study) |
| /blog/dog-reactive-on-leash/ | same mechanism ("full tank/threshold"), different trigger - explicitly says "same root cause" |
**Fix:** acceptable as-is (different SERPs: "dog destructive when alone" vs "dog reactive on leash"). Keep the mechanism explanation short in reactive and lean on the link to the primary. No consolidation.

### Cluster C - seasonal summer trio + tool
| Route | Role |
|---|---|
| /tools/too-hot-to-walk/ | **PRIMARY for "is it too hot to walk my dog (now)"** - live checker, transactional intent |
| /blog/too-hot-to-walk-your-dog/ | **PRIMARY for informational "when is it too hot"** - guide; links the tool |
| /blog/dog-thunderstorm-anxiety/ | re-uses too-hot's "summer removes the walk" thesis; its own FAQ literally asks the too-hot question |
| /blog/calm-dog-during-fireworks/ | same "drain in the morning before the trigger" logic |
**Fix:** tool vs guide is a healthy split (different intent, cross-linked) - keep both but keep titles distinct (tool = "Is It Too Hot...Right Now" checker phrasing; post = "When Is It Too Hot" guide phrasing). Thunderstorm/fireworks: distinct head queries, but both should link the too-hot post for the heat sub-topic instead of re-arguing it (fireworks does link it - correct pattern).

### Cluster D - recording/transparency page vs post
| Route | Role |
|---|---|
| /how-we-record/ | **PRIMARY** - evergreen explainer (rig, cameras, delivery); the query owner for "dog trainer records sessions" |
| /blog/why-we-record-every-session/ | the "why" narrative; already defers to the page ("full breakdown... on the how we record page") |
**Fix:** correct architecture already - post carries the story + links the page; page carries the facts. Keep titles differentiated (page = "How We Record", post = "why" framing). No action beyond monitoring which one Google picks for the head query.

### Cluster E - service-area city pages (11 near-templated pages)
Assessed in D2/D8 with the doorway-page test - see those sections for the differentiation verdict.

### Non-issues
`why-we-record-every-session` has zero overlap with the other 18 posts. `meet-kai` (brand/E-E-A-T) and `is-my-dog-overweight`/`can-you-over-exercise` (distinct health queries) are clean.

---

## Special Artifact D - AEO Scorecard (per post)
Quick-Answer lede = bolded direct answer in paragraph 1. FAQ+Schema = `## FAQ` section present → auto-wired to FAQPage JSON-LD (`lib/blog/faq-schema.ts`). Q-H2s = count of question-format H2 headings.

| Post | Quick-Answer lede | Q-H2s | FAQ + FAQPage | Extractable answer |
|---|---|---|---|---|
| calm-dog-during-fireworks | Y | 0 | Y (5) | Y |
| can-you-over-exercise-a-dog | Y (lede ~75w, long) | 1 | Y | Y |
| dog-adolescence-phase | **N - buried at ¶3** | 1 | Y | Y |
| dog-anxiety-destructive-behavior-exercise | Y (lede ~65w) | 1 | Y | Y |
| dog-park-not-tiring-dog-out | Y | 1 | Y | Y |
| dog-reactive-on-leash | Y | 1 | Y | Y |
| dog-thunderstorm-anxiety | Y | 1 | Y | Y |
| dog-treadmill-vs-walk-comparison | Y | 1 | Y | Y |
| high-energy-dog-breeds-exercise-guide | Y | 1 | Y | Y |
| how-much-exercise-does-my-dog-need | Y | 1 | Y | Y |
| how-to-tire-out-a-high-energy-dog | Y | 3 | Y | Y |
| is-my-dog-overweight | Y | 1 | Y | Y |
| meet-kai-the-dog-behind-kais-run | Y | 1 | Y | Y |
| senior-dog-exercise | **N - buried at ¶3** | 1 | Y | Y |
| too-hot-to-walk-your-dog | Y | 1 | Y | Y |
| what-is-a-dog-slatmill | Y | 3 | **N** | Y |
| what-to-expect-first-slatmill-session | Y (narrative) | 0 | **N** | **weak** |
| why-structured-runs-matter | Y | 3 | Y | Y |
| why-we-record-every-session | Y | 1 | Y | Y |

**Score: 17/19 ledes · 17/19 FAQ+schema · 18/19 extractable. Weakest AEO asset: `what-to-expect-first-slatmill-session`. Best: `how-to-tire-out-a-high-energy-dog`, `why-structured-runs-matter`.**

---

## Special Artifact E - GEO/LLM Scorecard
| Dimension | Score | Evidence |
|---|---|---|
| Entity consistency (name/service/area/phone identical everywhere a model reads) | **A** | Schema + llms.txt + footer + FAQ byte-consistent; `disambiguatingDescription` separates brand from footwear (`app/layout.tsx:70-71`) |
| llms.txt coverage | **A-** | All 19 posts, 3 tools, equipment, how-we-record, pricing, requirements, FAQ; missing: URL list for /services/, /pricing/, /faq/, /about/, city pages |
| Attribution discipline | **B+** | 7/19 posts carry named sources; 3 slips (senior "one in five" unsourced; too-hot 135°F headline unattributed; fireworks "widely reported") |
| AI-crawler stance | **A (deliberate)** | GPTBot, Google-Extended, ClaudeBot, OAI-SearchBot, PerplexityBot, Amazonbot explicitly allowed (`robots.txt:6-17`) - consistent with the llms.txt investment |
| Extractability / chunking | **A-** | Quick-Answer ledes 17/19, FAQ schema 17/19, sectioned llms.txt; 2 buried ledes |
| Knowledge-graph hygiene (sameAs) | **B-** | FB numeric URL (schema + llms.txt + footer); YouTube absent everywhere; TikTok unverified |

**Net: the site is unusually well-positioned for LLM citation for its size; the sameAs debts and the 3 attribution slips are the whole gap list.**

---

## Appendix: File Reference Map
| Issue | File | Line approx |
|---|---|---|
| Redirect destinations missing trailing slash | `next.config.js` | 13-27 |
| /book/ JS shell (Suspense fallback only) | `app/book/BookPageClient.tsx` | 216-227 |
| Orphaned booking component with tel: | `app/book/BookingContent.tsx` | whole file |
| Clarity ungated | `components/analytics/MicrosoftClarity.tsx` | 7 |
| Google Ads gtag ungated, no Consent Mode | `components/GoogleAds.tsx` + `app/layout.tsx` | 25-27 / 261 |
| AdSense loader on all routes (incl. /tools/*) | `components/ui/AdSenseLoader.tsx` + `app/layout.tsx` | 3 / 265 |
| Placeholder ad slot IDs | `components/blog/BlogPostWithAds.tsx` | 8, 12-13 |
| Privacy: no GA4, no session-recording disclosure | `app/privacy/page.tsx` | 19, 38 |
| Schema logo non-square (512x286) | `app/layout.tsx` | 85 |
| SAB PostalAddress (locality+ZIP) | `app/layout.tsx` | 89-95 |
| Facebook numeric sameAs | `app/layout.tsx` / `public/llms.txt` / `Footer.tsx` | 217 / 118 / 60 |
| TikTok sameAs unverified | `app/layout.tsx` | 219 |
| Offer catalog triplication | `app/layout.tsx` + `app/services/page.tsx` + `app/pricing/page.tsx` | 114-209 |
| getRelatedPosts newest-first | `lib/blog/posts.ts` | 131-136 |
| Em dashes (heaviest files) | `content/blog/*.mdx` (9 files), `app/services/ServicesPageClient.tsx`, `app/about/AboutPageClient.tsx`, `lib/faq-data.ts` | throughout |
| Prices in post bodies | `what-is-a-dog-slatmill.mdx:116`, `why-structured-runs-matter.mdx:125`, `dog-treadmill-vs-walk-comparison.mdx:105`, `how-much-exercise-does-my-dog-need.mdx:123`, `how-to-tire-out-a-high-energy-dog.mdx:112` | as listed |
| Unsourced stat | `content/blog/senior-dog-exercise.mdx` | "one in five" claim |
| Buried Quick-Answer ledes | `content/blog/dog-adolescence-phase.mdx`, `senior-dog-exercise.mdx` | ¶1-3 |
| Missing FAQ sections | `content/blog/what-is-a-dog-slatmill.mdx`, `what-to-expect-first-slatmill-session.mdx` | end of body |
| Teal text contrast 2.4:1 | `components/ui/CookieConsent.tsx:29`, `Hero.tsx:57`, ~166 uses site-wide | - |
| No focus-visible styles | `ContactFormSection.tsx:19`, `WaitlistForm.tsx:14`, `LeadMagnetForm.tsx:12` | - |
| Navbar menu a11y (no aria-expanded/trap/Escape) | `components/layout/Navbar.tsx` | 78-95 |
| ExitIntentPopup no dialog semantics | `components/ui/ExitIntentPopup.tsx` | 40 |
| Reduced-motion not honored globally | `lib/variants.ts`, `components/providers/LenisProvider.tsx` | 4 / 14-17 |
| Lenis rAF unconditional | `components/providers/LenisProvider.tsx` | 14-19 |
| Heavy JPGs (0.5-1.3 MB) | `public/images/equipment/*`, `public/images/brave-4-*`, `public/images/social/*` | - |
| Dead FAVICON export + 935 KB PNG | `lib/site-images.ts:24` + `public/images/logos/favicon.png` | 24 |
| Spots prerender uses deprecated constant | `lib/constants.ts:3` + pricing page counter | 3 |
| Duplicate SpotsCounter implementations | `components/sections/SpotsCounter.tsx` + `components/ui/SpotsCounter.tsx` | - |
| Stale skill file (GitHub Pages claims) | `.claude/skills/kaisrun-context/SKILL.md` | 13, 23, 25, 84 |
| Stale www claim | `SEO-STATUS.md` | 4-5 |
| Phantom Formspree form (mojrrvdd) | `INTEGRATIONS.md` | 36 |
| Em-dash rule contradiction | `CLAUDE.md:76`, `brand-reference.md:104-105` | - |
| Meta descriptions >160 | `app/book/page.tsx`, `app/pricing/page.tsx`, `app/service-area/page.tsx`, `lib/service-area/cities.ts` (shalimar) | metadata blocks |
| /privacy/ + /terms/ missing OG | `app/privacy/page.tsx`, `app/terms/page.tsx` | metadata blocks |
| No custom 404 | `app/not-found.tsx` | missing |
| Ignored front-matter fields (slug:/readTime:/tags:/imageAlt:) | 7 MDX files (see D6/Artifact D notes) | front-matter |
| /thank-you/ robots-blocked AND noindex | `public/robots.txt:3` + `app/thank-you/page.tsx:7-8` | - |
| cluster-plan.json tracked at root | `cluster-plan.json` | - |
| .nojekyll leftover | `public/.nojekyll` | - |
| console.info funnel logs in prod | `lib/bookIntent.ts:13`, `lib/googleAds.ts:44-52`, `app/book/BookPageClient.tsx`, `components/ui/Button.tsx:43` | - |
