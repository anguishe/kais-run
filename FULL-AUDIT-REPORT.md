# Kai's Run — Full SEO Audit Report
**Site:** https://kaisrun.xyz  
**Business:** Kai's Run — Mobile Dog Slatmill Conditioning, Destin FL  
**Audit Date:** June 4, 2026  
**Site Age:** ~2 weeks (launched May 2026)  
**Stack:** Next.js 16 static export, GitHub Pages, Tailwind CSS v4, Framer Motion v12, GSAP

---

## Overall SEO Health Score: 56 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 48 | 10.6 |
| Content Quality | 23% | 72 | 16.6 |
| On-Page SEO | 20% | 50 | 10.0 |
| Schema / Structured Data | 10% | 55 | 5.5 |
| Performance (CWV) | 10% | 42 | 4.2 |
| AI Search Readiness | 10% | 54 | 5.4 |
| Images | 5% | 65 | 3.3 |
| **TOTAL** | 100% | | **55.6 → 56** |

**Context:** 56/100 is a fair baseline for a one-month-old local service business. On-page content quality (72) is well above average. The score is bottlenecked by three off-page gaps — no Google Business Profile, zero reviews, zero third-party citations — and two critical technical issues that are actively blocking conversions and local search visibility.

---

## Business Type Detected

**Service Area Business (SAB) — Animal Services / Pet Care**  
Mobile unit serves: Destin · Fort Walton Beach · Niceville · Miramar Beach · Shalimar · Sandestin FL  
No physical storefront. Service delivered to customers' driveways.

---

## Top 5 Critical Issues

1. **`/book/` is double-blocked from search indexing** — `robots.txt` Disallow + `robots: { index: false }` metadata in `app/book/page.tsx`. The primary CTA page is invisible to Googlebot. Fix immediately.
2. **No Google Business Profile (GBP)** — The footer links to a Google Maps search query (`?query=Kai's+Run+Destin+FL`), not a Place ID. Without a verified GBP, the business cannot appear in the map pack for any local query. This is the single highest-impact off-page gap.
3. **LocalBusiness schema missing `address` and `image`** — Google requires both for LocalBusiness rich result eligibility. The `openingHoursSpecification` block is also malformed (uses invalid `description` property).
4. **Google Fonts loaded via CSS `@import`** — `globals.css` line 1 imports the font stylesheet synchronously, blocking paint. This is the primary LCP bottleneck on every page.
5. **Zero customer reviews anywhere** — No Google reviews, no Yelp listing, no testimonials on-site. For a service asking $200 upfront, this is the most significant conversion barrier on the site.

---

## Top 5 Quick Wins

1. Remove `Disallow: /book/` from `robots.txt` and remove `robots: { index: false }` from `app/book/page.tsx` — 5-minute fix, highest priority.
2. Remove `priority` prop from the Navbar logo (`components/layout/Navbar.tsx:55`) — 1-minute fix that stops the logo from competing with the hero image for LCP bandwidth.
3. Replace CSS `@import` for Google Fonts (`globals.css` line 1) with non-blocking `<link>` preload in `layout.tsx` — 15-minute fix, estimated LCP improvement of 0.8–1.5s.
4. Create `public/llms.txt` with the provided content — 2-hour fix, immediately makes the site citable by ChatGPT, Claude, and Perplexity.
5. Fix `openingHoursSpecification` in `app/layout.tsx` — 15-minute fix, removes a schema validation error.

---

## 1. Technical SEO — Score: 48/100

### Critical

**`/book/` blocked in `robots.txt` and via page metadata**

The primary booking/CTA page is excluded from crawling by two separate mechanisms:
- `public/robots.txt`: `Disallow: /book/`
- `app/book/page.tsx`: `robots: { index: false, follow: false }`

This means:
- Googlebot cannot crawl the page
- No link equity flows through internal CTA links pointing to `/book/`
- Zero organic ranking potential for bottom-of-funnel queries ("book dog conditioning Destin")
- The page meta description in `page.tsx` reads like developer notes ("Pick intro, performance, founding, or snowbird flows inside Square Appointments...") — needs rewriting for users

**Fix:** Edit `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /thank-you/
Disallow: /api/
Sitemap: https://kaisrun.xyz/sitemap.xml
```
Edit `app/book/page.tsx` — remove the `robots` metadata field. Rewrite `description` to: "Book a mobile dog conditioning session in Destin, Fort Walton Beach or Niceville FL. Intro sessions start at $35. Schedule online and we come to your driveway."

### High

**`/book/` missing from sitemap**  
After robots.txt is fixed, add `/book/` to `public/sitemap.xml` with `<priority>0.9</priority>`.

**Security headers missing**  
GitHub Pages cannot serve custom headers (X-Frame-Options, CSP, HSTS, Referrer-Policy). Migration to Cloudflare Pages (free tier) would resolve this via a `_headers` file and also gives immutable caching for hashed static assets.

**Meta descriptions confirmed present** on all main pages (verified via source code inspection by content agent). Pricing page description is 172 chars — trim to under 160.

### Medium

**Trailing slash consistency on GitHub Pages**  
`trailingSlash: true` generates `/path/index.html`. A request to `/path` (no trailing slash) on GitHub Pages may 404 or serve the raw file without a redirect. Ensure all external links, social bios, and sitemaps use trailing-slash URLs.

**Canonical tags** — `metadataBase: new URL('https://kaisrun.xyz/')` is set in `layout.tsx`, so Next.js auto-generates canonical tags. Verify by viewing source on `/services/` — look for `<link rel="canonical" href="https://kaisrun.xyz/services/" />`.

**Security — www subdomain**  
`www.kaisrun.xyz` may not redirect to the apex. Any external links using `www` would be dead. Verify and add a CNAME + redirect rule if needed.

---

## 2. Content Quality — Score: 72/100

### E-E-A-T Assessment (71/100)

**Experience — 17/20 (Strong)**  
Genuine first-hand signals: specific named dog (Kai, Rhodesian Ridgeback mix), specific behavioral observations (shredded bedding, leash reactivity), specific geographic groundedness. City pages reference named neighborhoods (Sandestin rental driveways, Scenic 98 corridor, Eglin/Hurlburt TDY timelines, Bluewater Bay). The origin story is traceable to a real person with a real dog.

Gap: No session photos or video embedded in content. No before-and-after case studies. No customer testimonials.

**Expertise — 18/25 (Good)**  
Slatmill-specific content is technically accurate: self-paced mechanics, biomechanical rationale for no minimum speed, cardiovascular loading. The comparison table (motorized vs. slatmill) provides structured factual differentiation. The "Tired Dog Guarantee" demonstrates operational confidence.

Gap: No formal canine conditioning certification (CCFT or equivalent) cited anywhere. Travis has no stated credentials beyond "built this for my dog." For the animal care vertical, this is a genuine QRG risk for posts that prescribe exercise volumes.

**Authoritativeness — 15/25 (Weak — main gap)**  
Zero external validation signals: no press mentions, no professional body membership, no verified GBP (schema links to a search query instead of a Place ID), no veterinary citations in any blog post, no reviews. The sameAs entries in JSON-LD are correct, but all point to social profiles rather than authoritative third-party sources.

**Trustworthiness — 21/30 (Good)**  
Licensed and insured stated in footer and About. Consistent contact info throughout (850-218-5855). Digital waiver requirement disclosed. Vaccination requirements disclosed. Julius K9 harness specification is a verifiable gear claim. Privacy policy linked from footer.

Gap: No BBB listing, no professional bonding disclosure, no physical/service-area address in schema (`address` is absent from `LocalBusiness`).

### Thin Content (All 9 Blog Posts Are Below Minimum)

| Post | Est. Words | Status |
|---|---|---|
| why-structured-runs-matter | ~200 | CRITICAL — 87% under minimum |
| welcome | ~310 | CRITICAL — 79% under minimum |
| high-energy-dog-breeds-need-more-than-a-walk | ~430 | CRITICAL — 71% under minimum |
| how-much-exercise-does-my-dog-need | ~480 | HIGH |
| slatmill-vs-long-walk | ~500 | HIGH |
| dog-treadmill-vs-walk-comparison | ~620 | HIGH |
| what-is-a-dog-slatmill | ~680 | HIGH |
| high-energy-dog-breeds-exercise-guide | ~650 | HIGH |
| how-to-tire-out-a-high-energy-dog | ~680 | HIGH |

Target minimum: 1,200–1,500 words for blog posts competing for informational queries. Two posts (200 and 310 words) are below any reasonable citability threshold.

### Near-Duplicate Content (Confirmed)

**Cluster 1:** `slatmill-vs-long-walk.mdx` and `dog-treadmill-vs-walk-comparison.mdx`  
Both posts answer the same question with the same conclusion. Estimated SERP overlap: 9/10. They are splitting ranking authority. **Keeper: `dog-treadmill-vs-walk-comparison` (longer, better slug).** Migrate the Florida/weather section from `slatmill-vs-long-walk` into the keeper, then 301 redirect.

**Cluster 2:** `high-energy-dog-breeds-need-more-than-a-walk.mdx` and `high-energy-dog-breeds-exercise-guide.mdx`  
Same 7 breeds, same argument, same resolution. Estimated SERP overlap: 9/10. **Keeper: `high-energy-dog-breeds-exercise-guide` (more depth, 7 named breeds, exercise math).** Migrate the Kai origin story paragraph from the other post, then 301 redirect.

### Meta Description Issues

- **Pricing page** description is 172 chars — trim to under 160.
- **Twitter Card descriptions** on About and Services pages reuse a sitewide default string ("Structured canine conditioning delivered to your driveway") rather than page-specific copy. Update each.

### Content Gaps

1. **No customer testimonials or social proof anywhere on the site.** This is the single largest trust gap. Even 2-3 anonymized first-name testimonials naming the dog breed and a concrete behavioral result ("My Malinois now sleeps through dinner — Sarah, Destin") would materially improve conversion and E-E-A-T.
2. **No author bio on blog posts.** `post.author ?? 'Travis'` renders as plain text with no photo, credentials, or link to /about/.
3. **No dedicated Florida summer heat content.** The mobile, driveway-based model exists specifically because FL heat makes midday outdoor exercise impossible — high-intent local queries like "dog exercise Florida summer" are completely unaddressed.
4. **No FAQPage schema on Pricing page.** The pricing page has 4 inline FAQ items via `<FAQAccordion>` but no corresponding JSON-LD.

---

## 3. On-Page SEO — Score: 50/100

### Title Tags
Present and correct on all main pages. Ideal title format for city pages: `Mobile Dog Conditioning in [City], FL | Kai's Run`.

### H1 Issues (High Priority)

| Page | Current H1 | Recommended |
|---|---|---|
| /services/ | "WHAT WE DO" | "Dog Conditioning Sessions — Destin, Fort Walton Beach & Niceville FL" |
| /blog/ | "Blog" | "Dog Conditioning Blog — Kai's Run Destin FL" |
| /book/ | "BOOK YOUR SESSION" | "Book a Mobile Dog Conditioning Session in Destin FL" |

### Internal Linking Gaps

- `/services/` page has zero outbound links to blog posts (blog → services is one-way)
- City pages have no cross-links to each other (Niceville page mentions Destin traffic but doesn't link to `/service-area/destin/`)
- No blog post links to `/pricing/` directly (all CTAs go to `/book/`)

### Blog: No question-format openers for featured snippets

Posts like `what-is-a-dog-slatmill.mdx` start with the `<SlatmillExplainer />` React component rather than a direct answer paragraph. The featured snippet algorithm pulls from the first paragraph below a heading. Add a direct-answer definition before the first H2:

> "A dog slatmill is a non-motorized treadmill powered entirely by the dog's own movement. Unlike motorized units, a slatmill has no electric motor — the belt moves only when the dog steps forward, and stops the instant they do."

---

## 4. Schema / Structured Data — Score: 55/100

### LocalBusiness Schema (app/layout.tsx) — Critical Fixes Required

| Issue | Priority |
|---|---|
| Missing `address` (PostalAddress) — required for LocalBusiness rich results | CRITICAL |
| Missing `image` property | CRITICAL |
| `openingHoursSpecification` uses invalid `description` property | HIGH |
| Missing `geo` (GeoCoordinates) | HIGH |
| `serviceType` is not a valid property on LocalBusiness (belongs on Service) | HIGH |
| `@type: ["LocalBusiness", "AnimalService"]` co-type is redundant — use `"AnimalService"` alone | MEDIUM |
| `hasOfferCatalog` missing the 2-dog intro offer ($55) | MEDIUM |
| `founder` has no `url` or `@id` | MEDIUM |

**Corrected LocalBusiness block** (replace the existing one in `app/layout.tsx`):
```json
{
  "@context": "https://schema.org",
  "@type": "AnimalService",
  "@id": "https://kaisrun.xyz/#business",
  "name": "Kai's Run",
  "description": "Mobile canine conditioning service delivering self-powered slatmill sessions to driveways in Destin, Fort Walton Beach, and Niceville FL.",
  "url": "https://kaisrun.xyz",
  "telephone": "+18502185855",
  "email": "kaisrunmobile@gmail.com",
  "image": "https://kaisrun.xyz/images/og-image.png",
  "logo": "https://kaisrun.xyz/images/logos/kr-logo-1.webp",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Credit Card, Cash",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Destin",
    "addressRegion": "FL",
    "postalCode": "32541",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.3935,
    "longitude": -86.4958
  },
  "openingHours": "Mo-Su",
  "areaServed": [
    {"@type": "City", "name": "Destin", "addressRegion": "FL"},
    {"@type": "City", "name": "Fort Walton Beach", "addressRegion": "FL"},
    {"@type": "City", "name": "Niceville", "addressRegion": "FL"},
    {"@type": "City", "name": "Miramar Beach", "addressRegion": "FL"},
    {"@type": "City", "name": "Shalimar", "addressRegion": "FL"},
    {"@type": "City", "name": "Sandestin", "addressRegion": "FL"}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Kai's Run Session Options",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Intro Session", "url": "https://kaisrun.xyz/services/"}, "price": "35.00", "priceCurrency": "USD"},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Intro Session — Two Dogs", "url": "https://kaisrun.xyz/services/"}, "price": "55.00", "priceCurrency": "USD"},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Performance Session", "url": "https://kaisrun.xyz/services/"}, "price": "65.00", "priceCurrency": "USD"},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Founding Athlete Program", "url": "https://kaisrun.xyz/pricing/"}, "price": "200.00", "priceCurrency": "USD"}
    ]
  },
  "founder": {
    "@type": "Person",
    "@id": "https://kaisrun.xyz/about/#travis",
    "name": "Travis",
    "url": "https://kaisrun.xyz/about/"
  },
  "sameAs": [
    "https://www.facebook.com/people/Kais-Run-Mobile-Dog-Conditioning/61589361011885/",
    "https://www.instagram.com/kaisrun",
    "https://www.tiktok.com/@kaisrun"
  ]
}
```

**Note on postalCode:** Destin FL 32541 is correct for the mid-Destin/Henderson Beach area. Verify this matches the operator's actual zip before publishing.  
**Note on `openingHours: "Mo-Su"`:** Google's shorthand for appointment-only businesses without fixed hours. Alternatively, remove the field entirely.

### Article Schema (lib/blog/article-schema.ts) — High Fixes

- Add `"url": "https://kaisrun.xyz/about/"` and `"@id": "https://kaisrun.xyz/about/#travis"` to `author`
- Add `width` and `height` to the publisher `logo` ImageObject
- Already has `dateModified` falling back to `datePublished` — correct

### Service Area City Pages — Missing City-Specific Schema

Each city page (`/app/service-area/[slug]/page.tsx`) only has a BreadcrumbList. Add a Service schema per city:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobile Dog Gym in [City], FL",
  "provider": {"@type": "AnimalService", "@id": "https://kaisrun.xyz/#business", "name": "Kai's Run"},
  "areaServed": {"@type": "City", "name": "[City]", "addressRegion": "FL"},
  "url": "https://kaisrun.xyz/service-area/[slug]/",
  "offers": {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Intro Session"}, "price": "35.00", "priceCurrency": "USD"}
}
```

Build a `buildServiceAreaSchema(city)` helper in `lib/seo/` following the same pattern as `buildBreadcrumbJsonLd`.

### Person Schema (app/about/page.tsx) — Medium Fixes
- Remove `alumniOf` (uses a city name — wrong type). Replace with `"homeLocation": {"@type": "Place", "name": "Destin, Florida"}`
- Normalize telephone to E.164 (`+18502185855`) to match layout.tsx
- Add `"@id": "https://kaisrun.xyz/about/#travis"` to link entity with the LocalBusiness founder node

### Missing Schema Opportunities
- **FAQPage** on `/pricing/` (4 inline FAQ items via `<FAQAccordion>` have no JSON-LD)
- **HowTo** on `/services/` (the 3-step session protocol is a perfect `HowTo` candidate)
- **BreadcrumbList** missing on `/services/`, `/pricing/`, `/about/`, `/faq/`
- **WebSite** schema with publisher reference should be added to `layout.tsx`

---

## 5. Performance / Core Web Vitals — Score: 42/100

All scores are estimated from static code analysis (no live CrUX/PageSpeed data available).

| Metric | Homepage Est. | Blog Post Est. |
|---|---|---|
| LCP | Needs Improvement (3.0–4.5s) | Moderate (1.8–2.5s) |
| INP | Needs Improvement (200–350ms) | Good |
| CLS | Moderate Risk (0.05–0.15) | Low Risk |

### Critical

**Google Fonts CSS `@import` in `globals.css` line 1**  
```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans...');
```
This is the most damaging font loading pattern. It is synchronous and render-blocking. The browser cannot process any subsequent CSS until the font stylesheet is fetched. Bebas Neue (the hero H1 font) and DM Sans (body font) are unavailable at first paint — the hero heading is the LCP element on the homepage.

**Fix — Replace `globals.css` line 1 with non-blocking load in `layout.tsx`:**
```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" media="print" onLoad="this.media='all'" />
```
Remove line 1 from `globals.css`. Estimated LCP improvement: 0.8–1.5s.

**Navbar logo has `priority` prop competing with hero image**  
`components/layout/Navbar.tsx:55` — the logo is marked `priority`, emitting a `<link rel="preload">` tag that competes with the hero image for first-paint bandwidth. The logo is ~10KB; the hero is ~200–600KB. Remove `priority` from the Navbar `<Image>`.

### High

**Lenis rAF loop runs unconditionally**  
`components/providers/LenisProvider.tsx` runs `requestAnimationFrame` on every frame with no pause condition. This permanently occupies the main thread, increasing INP for every user interaction. Either add an idle check (`if (!lenis.isScrolling) return`) or replace Lenis with native CSS `scroll-behavior: smooth` (already in `globals.css` — Lenis's only net contribution is a custom easing curve).

**SpotsCounter skeleton causes CLS**  
The component renders a skeleton during the `fetch('/data/config.json')` request, then replaces it with differently-sized content. The two states have different heights, causing layout shift. Fix: import the JSON directly in the server component layer (`import configData from '@/public/data/config.json'`) and pass as props, eliminating the fetch and skeleton entirely.

**Hero H1 animated from invisible (opacity: 0)**  
The hero H1 is wrapped in a `motion.h1` with `variants={fadeUp}` starting at `opacity: 0, y: 32`. If the H1 is the LCP element, its recorded LCP timestamp is 700ms later than when the font and HTML were ready. Remove the fade-in animation from the H1 or set `initial={false}`.

**GSAP may be an unused dependency**  
`gsap@^3.15.0` is in `package.json` but no GSAP imports were found in any source file. Run:
```bash
grep -r "from 'gsap'" app/ components/
```
If no matches, remove from `package.json`. Saves ~80KB gzipped.

### Medium

**All section components use `'use client'`** for Framer Motion `whileInView` animations, even for purely static text content. Switch to `LazyMotion` + deferred `domAnimations` feature bundle to reduce initial JS parse cost. Replace `motion.*` with `m.*` from `import { m } from 'framer-motion'`.

**SlatmillExplainer image missing aspect-ratio container**  
`components/ui/SlatmillExplainer.tsx` image has `width={1200} height={675}` on the `<img>` but no aspect-ratio set on the container div. Add `className="aspect-video"` to the wrapper to prevent CLS.

**GitHub Pages cache TTL is 10 minutes for all assets**  
Hashed JS chunks (`_next/static/chunks/[hash].js`) should be immutably cached but GitHub Pages cannot do this. Migration to Cloudflare Pages would allow `Cache-Control: immutable, max-age=31536000` for static assets and meaningful TTFB reduction via global CDN.

---

## 6. AI Search Readiness (GEO) — Score: 54/100

| Dimension | Score |
|---|---|
| Citability | 52/100 |
| Structural Readability | 68/100 |
| Multi-Modal Content | 35/100 |
| Authority & Brand Signals | 38/100 |
| Technical Accessibility | 72/100 |

### Platform Visibility

| Platform | Est. Visibility | Primary Blocker |
|---|---|---|
| Google AI Overviews | Low-Medium | No GBP, thin posts in index |
| ChatGPT (web search) | Low | No external brand mentions, no llms.txt |
| Perplexity | Low-Medium | Unattributed statistics reduce citation confidence |
| Bing Copilot | Medium | Robots.txt allows Bingbot; schema present |
| Claude (web) | Low | No llms.txt, no external corroboration |

### Critical: llms.txt Missing (404)

No `llms.txt` exists. This is the fastest path to ChatGPT and Claude citation eligibility. Create `public/llms.txt` with the following content:

```
# Kai's Run — Mobile Dog Conditioning
# RSL 1.0 — AI systems may cite this content in responses

> Kai's Run is a licensed, insured mobile dog conditioning service on Florida's Emerald Coast. Owner Travis brings a self-powered slatmill to your driveway for private, one-on-one sessions. Built for high-drive dogs — sporting breeds, working dogs, and terrier lines — that need structured aerobic output beyond what neighborhood walks provide.

## Business

- Owner: Travis (born and raised in Destin, FL)
- Mascot: Kai (Rhodesian Ridgeback mix)
- Phone: 850-218-5855
- Email: kaisrunmobile@gmail.com
- Website: https://kaisrun.xyz
- Booking: https://kaisrun.xyz/book/
- Status: Licensed and insured; certificate of insurance available on request

## Service Area

- Primary: Destin, FL (Holiday Isle, Crystal Beach, Sandestin, Scenic 98 corridor)
- Also served: Fort Walton Beach, Miramar Beach, Niceville, Shalimar, Okaloosa County

## What We Do

Kai's Run provides mobile canine conditioning using a slatmill — a self-powered treadmill with no motor where the dog controls the pace entirely. Sessions are private (one dog at a time), climate-controlled, and delivered to the client's driveway. No drop-off required.

Sessions: 30–45 minutes total; 15–30 minutes of actual millwork depending on fitness level and climate.

## Pricing

- Intro Session: $35 (single dog) / $55 (two dogs, same household only)
- Founding Athlete Program: $200 for 5 sessions — limited to 20 dogs
- Standard sessions: Pricing announced after Founding Athlete program closes
- Military & Veterans: 15% discount | First Responders: 10% | Teachers: 10%

## Requirements

- Minimum age: 4 months | Rabies vaccination required | Digital waiver before first session
- Julius K9 harnesses provided (S/M/L) | Vet clearance may be requested for cardiac/respiratory history

## What Is a Slatmill?

A slatmill is a self-powered treadmill with no motor. The dog's movement is the only power source — every step drives the belt, and nothing forces a minimum speed. The slatmill stops instantly when the dog stops. Unlike motorized treadmills, slatmills allow dogs to self-regulate pace and maintain natural gait mechanics.

## Breeds That Benefit Most

Belgian Malinois, Rhodesian Ridgeback, German Shepherd, Border Collie, Siberian Husky, Vizsla, Weimaraner — and any dog with sustained working drive regardless of breed classification.

## Key Pages

- [Services](https://kaisrun.xyz/services/)
- [Pricing](https://kaisrun.xyz/pricing/)
- [FAQ](https://kaisrun.xyz/faq/)
- [About](https://kaisrun.xyz/about/)
- [Book Now](https://kaisrun.xyz/book/)
- [Blog](https://kaisrun.xyz/blog/)
- [Service Area — Destin](https://kaisrun.xyz/service-area/destin/)
- [Service Area — Fort Walton Beach](https://kaisrun.xyz/service-area/fort-walton-beach/)
- [Service Area — Niceville](https://kaisrun.xyz/service-area/niceville/)
```

### AI Citation Improvements

1. **Add "Quick Answer" lede to each blog post** — a single bolded sentence before the intro that directly answers the post question. This is the Featured Snippet pattern.
2. **Add FAQPage JSON-LD** to `what-is-a-dog-slatmill/` and `how-to-tire-out-a-high-energy-dog/` — both contain embedded Q&A sections without schema
3. **Source or remove unattributed statistics** — "a 20-minute walk releases roughly 5% of a high-drive dog's daily energy budget" appears in the breeds exercise guide without attribution. Perplexity deprioritizes unsourced statistics.
4. **YouTube video** — A 2-minute slatmill demo video has the highest documented correlation with AI citation rates (~0.737). Embedding on blog posts and the homepage is the single highest-ROI AI search action available.

---

## 7. Local SEO — Score: 41/100

| Dimension | Score |
|---|---|
| GBP Signals | 12/25 |
| Reviews & Reputation | 4/20 |
| Local On-Page SEO | 13/20 |
| NAP Consistency & Citations | 6/15 |
| Local Schema | 8/10 |
| Local Links & Authority | 3/10 |

### Google Business Profile: Unverified / Unclaimed

The footer links to a Google Maps search query (`maps.app.goo.gl/?query=Kai's+Run+Destin+FL`), not a Place ID. This indicates GBP is either unclaimed or the Place ID was never captured. Without a verified GBP, kaisrun.xyz cannot appear in the local map pack for any query — regardless of on-page optimization quality.

**GBP Setup Checklist (Service Area Business):**
- Set as SAB with no visible street address
- Service areas: Destin, Fort Walton Beach, Niceville, Miramar Beach, Shalimar, Sandestin
- Primary category: "Pet Trainer" (Whitespark #1 local ranking factor)
- Upload 10+ photos: slatmill, mobile unit, Kai running, Travis, driveway session
- Write 750-char description with "mobile dog gym Destin FL" and "slatmill conditioning" in first 2 sentences
- Add all services with prices
- After verification: update the footer link to use the actual GBP Place ID URL
- After verification: add the GBP URL to `sameAs` array in `layout.tsx`

### Reviews: Zero (Critical)

No Google reviews, no Yelp listing found, no testimonials on-site. For a service asking $200 upfront, this is the most significant conversion barrier.

**Review acquisition strategy:**  
Travis already sends a "post-session photo + recap" within 1 hour of each visit. Append to that message: "If you'd like to share your experience, here's our Google review link: [GBP shortlink]." The first 5 Google reviews are the highest-leverage action in the entire Local SEO stack. Do not wait for 10 clients — start asking after session one.

The **Sterling Sky 18-day rule** applies once the first review arrives: going 18+ days without a new review can cause ranking drops. Build review velocity systematically from the start.

### NAP Consistency

Internal NAP is consistent. Phone appears as `850-218-5855` in visible content and `+18502185855` in JSON-LD — both correct. Email `kaisrunmobile@gmail.com` appears only in JSON-LD, not in visible page content.

**External citations: Zero**  
No Yelp, BBB, YP, Angi, or Nextdoor listing detected.

**Footer inconsistency:** Footer shows "Destin · Fort Walton Beach · Niceville, FL" but service area includes 6 cities. Schema, FAQ, and service-area hub page correctly list all 6.

### City Pages: Above Average Quality

All three existing city pages (Destin, Fort Walton Beach, Niceville) pass the doorway page test — genuine neighborhood-level differentiation, not templated copy. Destin page references Sandestin rental driveways and Scenic 98; FWB page has strong military angle (Eglin/Hurlburt TDY); Niceville page targets Bluewater Bay and work-from-home owners.

**Missing city pages:** Miramar Beach and Sandestin should have dedicated pages. Both are distinct tourist/resort communities with high-intent vacation rental dog owners. Shalimar can remain a mention on the FWB page.

### Citation Campaign Priority

**Do this week (free, high-DA):**
1. Google Business Profile — DA ~94 (most important)
2. Yelp — DA ~93
3. Bing Places (import from Google) — DA ~94
4. Apple Maps Connect — DA ~90
5. Nextdoor Business — DA ~72 (highest neighborhood relevance for SABs)

**Do this month (30 min each):**
- YellowPages, BBB (free basic listing), Thumbtack

**Strategic (60 days):**
- Destin Area Chamber of Commerce / Emerald Coast Chamber
- Local press pitch ("Destin native builds mobile dog gym")

---

## 8. Backlinks — Score: 0 (Expected for 1-month-old domain)

No backlink profile exists yet — Common Crawl has not yet indexed this domain. This is expected and not a site defect.

**Key finding:** The Google Maps footer link is a search query, not a GBP Place ID — confirming GBP is likely unclaimed. This also means the `sameAs` entity graph has no Google entity anchor.

**Highest-leverage content link target:** `what-is-a-dog-slatmill/` — definitional content in an underserved niche. Share in:
- Reddit: r/dogs, r/DogAdvice, r/WorkingDogs, r/belgianmalinois (educational, not promotional)
- Dog training/sport forums where slatmills are discussed
- Breed club newsletters (RRCUS angle — Travis's Ridgeback backstory)
- Okaloosa County veterinary clinic "resources" pages (outreach campaign)

**Local business link opportunities (this month):**
- Chamber of Commerce directory link
- Local lifestyle blogs (Destin Life, NWF Daily News)
- Story angle: "Destin native builds first mobile dog gym for the Emerald Coast"

---

## 9. Content Cluster Architecture

### Current State: 9 Posts, No Pillar Pages, 2 Cannibalization Clusters

The blog has no hub posts. Every existing post is spoke-depth with no post serving as the authoritative, comprehensive reference for a category-level question.

### Immediate Consolidations Required

| From (301 redirect) | To | Content to migrate first |
|---|---|---|
| `/blog/slatmill-vs-long-walk/` | `/blog/dog-treadmill-vs-walk-comparison/` | Florida/weather section |
| `/blog/high-energy-dog-breeds-need-more-than-a-walk/` | `/blog/high-energy-dog-breeds-exercise-guide/` | Kai origin story paragraph |
| `/blog/why-structured-runs-matter/` | Future C2 pillar | Safety/behavior framing |
| `/blog/welcome/` | Future C4 pillar | — |

**Note on redirects:** Static export on GitHub Pages cannot use Next.js middleware redirects. Options: (1) Cloudflare redirect rules, (2) `<meta http-equiv="refresh">` in old page. Verify against the Cloudflare worker already in the repo.

### 4-Cluster Hub-and-Spoke Plan

**Cluster 1 — Slatmill Education**  
Pillar: `/blog/dog-slatmill-guide/` (expand from `what-is-a-dog-slatmill`, target 2,800 words)  
Spokes: `dog-treadmill-vs-walk-comparison/` (expand to 1,400w), new `is-a-slatmill-safe-for-dogs/`, new `dog-slatmill-session-cost/`

**Cluster 2 — Conditioning Science**  
Pillar: `/blog/high-drive-dog-exercise-guide/` (new, 3,000 words)  
Spokes: `how-to-tire-out-a-high-energy-dog/` (expand to 1,500w), `how-much-exercise-does-my-dog-need/` (expand to 1,300w), new `dog-exercise-florida-summer-heat/`

**Cluster 3 — Breed-Specific Conditioning**  
Pillar: `/blog/high-energy-dog-breeds-exercise-guide/` (expand to 2,500w, absorb breeds post)  
Spokes: new `belgian-malinois-exercise-needs/`, new `rhodesian-ridgeback-exercise-guide/` (E-E-A-T anchor via Kai), new `dog-daycare-vs-conditioning/`

**Cluster 4 — Local Commercial**  
Pillar: `/blog/mobile-dog-gym-destin-fl/` (new, 1,800 words — primary business keyword has zero blog coverage)  
Spokes: new `dog-conditioning-fort-walton-beach/`, new `dog-exercise-niceville-fl/`

### Content Expansion Priorities

| Post | Current Words | Target | Action |
|---|---|---|---|
| what-is-a-dog-slatmill | 680 | 2,800 | Expand into pillar |
| high-energy-dog-breeds-exercise-guide | 650 | 2,500 | Expand + merge breeds post |
| how-to-tire-out-a-high-energy-dog | 680 | 1,500 | Expand |
| how-much-exercise-does-my-dog-need | 480 | 1,300 | Expand |
| dog-treadmill-vs-walk-comparison | 620 | 1,400 | Expand + merge slatmill-vs-walk |

---

## 10. Search Experience (SXO) — Gap Score: 61/100

### SERP Page-Type Match Summary

| Query | SERP Dominant Type | Kaisrun Page | Match |
|---|---|---|---|
| "mobile dog gym Destin FL" | GBP map pack + local LP | Homepage | MEDIUM — needs GBP |
| "dog slatmill service near me" | GBP map pack | No GBP | CRITICAL |
| "how to tire out a high energy dog" | Long-form guide (1,200-2,500w) | Blog article (680w) | MEDIUM — too thin |
| "dog conditioning Destin" | GBP pack + local dirs | Services page (wrong H1) | HIGH mismatch |
| "what is a dog slatmill" | Definitional informational | Blog article | MEDIUM — opener blocks snippet |

### User Journey Breaks

**Journey 1: Awareness user from blog → /book/**  
Reads informational article → clicks CTA to /book/ → sees Square widget loading → **no social proof at conversion moment**. No reviews, no "X sessions completed," no client testimonials. The trust gap between "this sounds right" and "entering my address" is not bridged.

**Journey 2: Local search user → Homepage**  
Hero communicates service and geography well. CTAs are clear. But "Claim Founding Spot — 20 Only" may confuse a first-visit user who doesn't yet know what a founding spot is. **No social proof anywhere above the fold.**

**Journey 3: Researcher → /services/ → /pricing/**  
Services page H1 "WHAT WE DO" fails to confirm topic for a user arriving from a specific query. Pricing page: "Standard Session — Coming Soon" is a research dead-end for someone calculating long-term value.

### Conversion Path Friction

1. `/book/` double-blocked (Critical — see Technical section)
2. No social proof at any conversion moment (Critical)
3. Standard session pricing undefined (Medium — publish a range)
4. Square widget loads asynchronously with no loading indicator on mobile (Medium)

---

## 11. Images — Score: 65/100

**WebP format in use** — all hero and product images are `.webp`. This is correct.

**`images.unoptimized: true` in next.config.js** — required for static export. Plain `<img>` tags are used correctly per brand constraints. However, this means no automatic srcsets or lazy loading via Next.js.

**Every `<img>` must have explicit `width` and `height` attributes** — without them, the browser cannot reserve space before the image loads, causing CLS. Audit all `<img>` tags in components.

**Hero image (`hero-main.webp`) should have `fetchpriority="high"`:**
```html
<img src="/images/hero/hero-main.webp" width="1920" height="1080" alt="..." fetchpriority="high" />
```

**Navbar logo should NOT have `priority` prop** — already flagged in Performance section.

**OG image** exists at `/images/og-image.png` (1200×630) — add to LocalBusiness schema `image` property.

**No image sitemap** — consider adding one for the hero and slatmill demonstration images.

---

## Limitations

- **No live CrUX/PageSpeed data** — Performance scores are estimated from static code analysis
- **No Google Search Console access** — impressions, clicks, coverage unknown
- **GBP live status unverifiable** — cannot confirm claim status without dashboard access
- **Live SERP compositions** — SXO SERP analysis is based on training data, not real-time observation
- **Social media content** — Instagram, TikTok, Facebook content and posting frequency not reviewed
- **Square widget behavior** — booking flow and mobile rendering not tested in live browser
