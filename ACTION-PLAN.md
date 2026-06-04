# Kai's Run — SEO Action Plan
**Generated:** June 4, 2026 | **Overall Score:** 56/100 | **Full report:** FULL-AUDIT-REPORT.md

---

## CRITICAL — Fix Immediately (Hours, Not Days)

### C1. Unblock `/book/` from robots.txt and page metadata
**Impact:** Highest on site — the primary CTA page is invisible to Googlebot  
**Effort:** 5 minutes

1. Edit `public/robots.txt` — remove `Disallow: /book/`
2. Edit `app/book/page.tsx` — remove `robots: { index: false, follow: false }` from metadata
3. Rewrite the `description` field in `app/book/page.tsx` metadata to:  
   `"Book a mobile dog conditioning session in Destin, Fort Walton Beach or Niceville FL. Intro sessions start at $35. Schedule online and we come to your driveway."`
4. Add static server-rendered content to the booking page: an H1, a 1-sentence service description, and the phone number — so Googlebot has indexable content before the Square widget loads
5. Add `/book/` to `public/sitemap.xml` with `<priority>0.9</priority>` and `<changefreq>monthly</changefreq>`

---

### C2. Fix Google Fonts render-blocking load
**Impact:** Estimated LCP improvement 0.8–1.5s across every page  
**Effort:** 15 minutes

1. Delete line 1 of `app/globals.css` (the `@import url('https://fonts.googleapis.com/...')` line)
2. Add these tags to `<head>` in `app/layout.tsx` (replace the existing preconnect links):
```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap"
  media="print"
  onLoad="this.media='all'"
/>
```

---

### C3. Fix LocalBusiness schema — add `address` and `image`
**Impact:** Required for LocalBusiness rich result eligibility; fixes 3 validation errors  
**Effort:** 20 minutes

In `app/layout.tsx`, replace the `localBusinessJsonLd` object with the corrected version from **FULL-AUDIT-REPORT.md §4**. Key changes:
- `"@type": "AnimalService"` (drop the redundant `"LocalBusiness"` co-type)
- Add `"@id": "https://kaisrun.xyz/#business"`
- Add `"image": "https://kaisrun.xyz/images/og-image.png"`
- Add `"logo": "https://kaisrun.xyz/images/logos/kr-logo-1.webp"`
- Add `"address": { "@type": "PostalAddress", "addressLocality": "Destin", "addressRegion": "FL", "postalCode": "32541", "addressCountry": "US" }`
- Add `"geo": { "@type": "GeoCoordinates", "latitude": 30.3935, "longitude": -86.4958 }`
- Replace `"openingHoursSpecification": { "description": "..." }` with `"openingHours": "Mo-Su"`
- Remove `"serviceType"` (not valid on LocalBusiness)
- Add `"@id"` and `"url"` to `founder` Person node
- Add the 2-dog intro offer ($55) to `hasOfferCatalog`
- Add `"url"` to each `itemOffered` Service node

---

### C4. Create `public/llms.txt`
**Impact:** Immediately makes the site citable by ChatGPT, Claude, and Perplexity  
**Effort:** 2 hours (copy content from FULL-AUDIT-REPORT.md §6)

Place the file at `public/llms.txt` — Next.js static export will serve it at `https://kaisrun.xyz/llms.txt`.

---

### C5. Remove `priority` from Navbar logo
**Impact:** Stops logo from competing with hero image for LCP bandwidth  
**Effort:** 1 minute

In `components/layout/Navbar.tsx` line ~55, remove the `priority` prop from the logo `<Image>`.

---

## HIGH — Fix This Week

### H1. Claim and verify Google Business Profile (SAB mode)
**Impact:** Enables map pack visibility — currently the entire local search pack is inaccessible  
**Effort:** 3–4 hours + 1–2 weeks for Google postcard verification

1. Go to business.google.com and search for "Kai's Run Destin FL"
2. If a listing exists, claim it. If not, create one.
3. Set as **Service Area Business** — do NOT enter a physical address that displays publicly
4. Add all 6 service cities: Destin, Fort Walton Beach, Niceville, Miramar Beach, Shalimar, Sandestin
5. Primary category: **"Pet Trainer"** (verify exact GBP category name — this is the #1 local ranking factor)
6. Write a 750-character description opening with "mobile dog gym Destin FL" and "slatmill conditioning"
7. Upload 10+ photos: slatmill equipment, mobile unit, Kai running, Travis, a driveway session
8. Add all services with prices from `/pricing/`
9. After verification: update the footer Google Maps link from the search query URL to the actual Place ID URL
10. After verification: add the GBP URL to the `sameAs` array in `app/layout.tsx`

---

### H2. Start collecting Google reviews
**Impact:** Zero reviews is the #1 conversion barrier for a $200 upfront service  
**Effort:** Ongoing — start after first session

1. Generate the GBP review shortlink from the GBP dashboard (format: `g.page/[name]/review`)
2. Append to every post-session recap SMS/message: "If you'd like to share your experience, here's our Google review link: [link]"
3. Target: 5 reviews within 30 days of first sessions

---

### H3. Fix /services/ H1
**Impact:** "WHAT WE DO" provides no keyword signal for local service queries  
**Effort:** 5 minutes

In `app/services/ServicesPageClient.tsx` ~line 106, change the H1 from "WHAT WE DO" to:  
`"Dog Conditioning Sessions — Destin, Fort Walton Beach & Niceville FL"`

---

### H4. Build initial citation presence (Tier A)
**Impact:** Zero external citations — Google has no corroboration for NAP signals  
**Effort:** 2 hours total (30 min each)

- **Yelp:** yelp.com/businesses/claim — category "Pet Services > Pet Training"
- **Bing Places:** import from Google after GBP is live
- **Apple Maps Connect:** applemapc.com
- **Nextdoor Business:** nextdoor.com/business/ — highest neighborhood relevance for driveway SABs
- **YellowPages:** yp.com
- NAP for all: "Kai's Run", 850-218-5855, kaisrun.xyz, Destin FL

---

### H5. Add Article schema `author.url` and fix Person schema
**Impact:** Author entity disambiguation for blog posts; fixes schema validation errors  
**Effort:** 30 minutes across 2 files

**`lib/blog/article-schema.ts`:**
- Add `"url": "https://kaisrun.xyz/about/"` and `"@id": "https://kaisrun.xyz/about/#travis"` to `author`
- Add `width` and `height` to publisher `logo` ImageObject (use actual pixel dimensions of `kr-logo-1.webp`)

**`app/about/page.tsx`:**
- Remove `alumniOf` (uses a city name — wrong type). Replace with `"homeLocation": {"@type": "Place", "name": "Destin, Florida"}`
- Normalize telephone to `+18502185855` (E.164)
- Add `"@id": "https://kaisrun.xyz/about/#travis"` to the Person node

---

### H6. Add city-specific Service schema to service area pages
**Impact:** Enables city-level geographic signals for local SEO  
**Effort:** 2 hours

Create `lib/seo/service-area-schema.ts`:
```ts
export function buildServiceAreaSchema(city: { name: string; slug: string }): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Mobile Dog Gym in ${city.name}, FL`,
    "url": `https://kaisrun.xyz/service-area/${city.slug}/`,
    "provider": { "@type": "AnimalService", "@id": "https://kaisrun.xyz/#business", "name": "Kai's Run" },
    "areaServed": { "@type": "City", "name": city.name, "addressRegion": "FL" },
    "offers": { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Intro Session" }, "price": "35.00", "priceCurrency": "USD" }
  };
}
```
Call it in `app/service-area/[slug]/page.tsx` alongside the existing BreadcrumbList.

---

### H7. Consolidate near-duplicate blog posts
**Impact:** Eliminates keyword cannibalization for two high-priority query clusters  
**Effort:** 3–4 hours

**Step 1: Merge slatmill-vs-walk posts**
- Copy the Florida/summer heat section from `content/blog/slatmill-vs-long-walk.mdx` into `content/blog/dog-treadmill-vs-walk-comparison.mdx`
- Expand `dog-treadmill-vs-walk-comparison` to 1,400 words
- 301 redirect `/blog/slatmill-vs-long-walk/` → `/blog/dog-treadmill-vs-walk-comparison/`

**Step 2: Merge breed posts**
- Copy the Kai origin story paragraph and breed blurbs from `content/blog/high-energy-dog-breeds-need-more-than-a-walk.mdx` into `content/blog/high-energy-dog-breeds-exercise-guide.mdx`
- Expand `high-energy-dog-breeds-exercise-guide` to 2,500 words (it becomes the Cluster 3 pillar)
- 301 redirect `/blog/high-energy-dog-breeds-need-more-than-a-walk/` → `/blog/high-energy-dog-breeds-exercise-guide/`

**Redirect implementation:** Static export cannot use Next.js middleware. Options: (1) Cloudflare redirect rules (preferred — verify against existing Cloudflare worker in repo), or (2) replace old page content with `<meta http-equiv="refresh" content="0;url=/blog/[target]/" />`.

---

### H8. Fix SpotsCounter CLS
**Impact:** Eliminates a visible layout shift on the homepage  
**Effort:** 1 hour

In `app/page.tsx` (server component), import the spots config directly:
```ts
import configData from '@/public/data/config.json';
```
Pass `remaining={configData.remaining}` as a prop to `<SpotsCounter>`. Remove the client-side `fetch('/data/config.json')` from `SpotsCounter.tsx` and replace the loading skeleton with the prop value. This renders the correct count at build time, eliminating the skeleton swap.

---

### H9. Remove GSAP if unused
**Impact:** Removes ~80KB gzipped from the JS bundle  
**Effort:** 5 minutes

```bash
grep -r "from 'gsap'" app/ components/ lib/
```
If no matches: remove `"gsap": "^3.15.0"` from `package.json` and run `npm install`.

---

## MEDIUM — Fix Within 1 Month

### M1. Add "Quick Answer" lede to every blog post
Add a bolded direct-answer sentence as the very first content in each blog post (before the first H2). This is the Featured Snippet pattern. Example for `how-much-exercise-does-my-dog-need.mdx`:
> **Most high-drive dogs need 45–60 minutes of moderate-to-high intensity aerobic work daily — significantly more than a standard neighborhood walk provides.**

---

### M2. Add FAQPage JSON-LD to Pricing page
The `/pricing/` page has 4 inline FAQ items via `<FAQAccordion>` with no structured data. Add `FAQPage` JSON-LD matching those 4 items. This gives AI systems a machine-readable pricing FAQ to cite.

---

### M3. Add HowTo schema to /services/
The session protocol section ("Book Online → We Come to You → Your Dog Runs") is a perfect `HowTo` schema candidate. Mark it up to make the session process AI-extractable.

---

### M4. Add BreadcrumbList to /services/, /pricing/, /about/, /faq/
These 4 pages have no breadcrumb schema. Add 2-item breadcrumbs: `[Home > Services]`, `[Home > Pricing]`, etc., using the existing `buildBreadcrumbJsonLd()` helper.

---

### M5. Add author bio to blog posts
Travis's identity (Destin native, Kai's story, first-person problem-solving backstory) is an E-E-A-T asset that appears nowhere on individual blog posts. Add a 3-sentence author bio component with Travis's photo and a link to `/about/` at the bottom of each post. This can be a static component added to the blog post template.

---

### M6. Create `/service-area/miramar-beach/` page
Miramar Beach is a distinct search market (Grand Boulevard corridor, Silver Sands, Maravilla vacation rentals). The current service area hub mentions it in 2-3 sentences. Build a full 700-800 word page matching the quality of the Destin page. Add the slug to `lib/service-area/cities.ts` and update `generateStaticParams` in the service area route.

---

### M7. Create `/service-area/sandestin/` page
Same as above — Sandestin resort community (Baytowne/Dunes/Links/Burnt Pine) has a distinct audience of HOA members and vacation home owners perfectly suited to the driveway mobile service model.

---

### M8. Publish price range for standard sessions
"Standard Session — Coming Soon" on `/pricing/` is a research dead-end for consideration-phase users. Publish a placeholder: "Standard sessions from $65 — pricing confirmed when Founding Athlete spots close." This removes a conversion friction point.

---

### M9. Trim Pricing page meta description
Current: 172 characters (will truncate in SERPs). Target: under 160. Edit in `app/pricing/page.tsx` metadata.

---

### M10. Fix Lenis rAF loop
In `components/providers/LenisProvider.tsx`, add an idle condition to the rAF callback to prevent the loop from running when there is no active scroll. Or evaluate removing Lenis entirely — native `scroll-behavior: smooth` (already in `globals.css`) provides equivalent UX at zero JS cost.

---

### M11. Add SlatmillExplainer container aspect-ratio
In `components/ui/SlatmillExplainer.tsx`, add `className="aspect-video"` to the image wrapper div. This prevents the CLS caused by the container collapsing to zero height before the image loads.

---

### M12. Add cross-links between city pages
The Niceville page mentions Destin in the context of avoiding traffic — that sentence should include an anchor link to `/service-area/destin/`. The FWB page mentions Niceville routing — link it. Internal peer links between city pages distribute PageRank and signal geographic relationships.

---

### M13. Create "Florida summer dog exercise" blog post
Target: "dog exercise Florida summer heat" — a high-intent local query completely unaddressed by current content. The driveway/climate-controlled mobile model is a direct answer to this query that no national competitor can make. Target 1,200 words. Assign to Cluster 2 as a spoke.

---

### M14. Add `dateModified` visibility to blog posts
Article schema already includes `dateModified` (falls back to `datePublished`). Add a visible "Last updated: [date]" display element to the blog post template. This signals freshness to AI systems and Perplexity, which prefer recently-dated answers for evergreen questions.

---

## LOW — Backlog

### L1. Expand the three main pillar content targets
This is a significant content investment but the highest long-term traffic leverage:
1. `what-is-a-dog-slatmill` → expand from 680 to 2,800 words, move to `/blog/dog-slatmill-guide/`, 301 original
2. Create `/blog/high-drive-dog-exercise-guide/` (3,000 words) as the Cluster 2 hub
3. Create `/blog/mobile-dog-gym-destin-fl/` (1,800 words) — the primary business keyword has zero blog coverage

---

### L2. Breed-specific content (highest-intent niche posts)
- `/blog/belgian-malinois-exercise-needs/` — Malinois owners are the highest-intent audience
- `/blog/rhodesian-ridgeback-exercise-guide/` — E-E-A-T anchor via Kai's origin story

---

### L3. YouTube channel
A 90-second slatmill demonstration video with Kai has the highest documented AI citation correlation (~0.737) of any single action available. Embed on homepage, `/services/`, and `what-is-a-dog-slatmill/`. Add channel URL to `llms.txt`.

---

### L4. BBB and Chamber of Commerce listings
- BBB free basic listing: bbb.org (supports "Licensed & Insured" positioning)
- Destin Area Chamber of Commerce / Emerald Coast Chamber: local authority + directory backlink

---

### L5. Add WebSite schema to layout.tsx
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://kaisrun.xyz/#website",
  "url": "https://kaisrun.xyz",
  "name": "Kai's Run",
  "publisher": { "@id": "https://kaisrun.xyz/#business" }
}
```
Add as a second `<script type="application/ld+json">` tag in the layout `<head>`.

---

### L6. Bing Webmaster Tools indexation
Submit `https://kaisrun.xyz/sitemap.xml` at bing.com/webmasters. Free. Accelerates Bing/Copilot indexation.

---

### L7. Local press pitch
Story angle: "Destin native builds first mobile dog gym for the Emerald Coast." Pitch to Destin Log and NWF Daily News. A local press mention creates a DA 30-50 citation and provides an authoritative third-party signal for AI systems.

---

### L8. aggregateRating in schema (add when reviews arrive)
**Do not add with placeholder values.** Once 5+ legitimate Google reviews are in, add to the LocalBusiness schema in `app/layout.tsx`:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "[actual average]",
  "reviewCount": "[actual count]",
  "bestRating": "5"
}
```
This enables star ratings in organic SERPs — expect 15-35% CTR improvement.

---

### L9. Migrate to Cloudflare Pages (optional, medium effort)
GitHub Pages limitations: no custom security headers, no immutable asset caching, limited CDN distribution. Cloudflare Pages (free tier) solves all three via `_headers` file and global CDN, with no changes to the static export workflow. Evaluate when the site has consistent traffic.

---

## Implementation Sequence

**Day 1 (Today):**
- C1: Unblock /book/ in robots.txt and page metadata (5 min)
- C5: Remove `priority` from Navbar logo (1 min)
- C2: Fix Google Fonts @import (15 min)

**Day 2–3:**
- C3: Fix LocalBusiness schema (20 min)
- C4: Create llms.txt (2 hours)
- H3: Fix /services/ H1 (5 min)
- H9: Check/remove GSAP (5 min)

**Week 1:**
- H1: Claim GBP (3–4 hours + verification wait)
- H4: Build Tier A citations — Yelp, Bing Places, Apple Maps, Nextdoor (2 hours total)
- H7: Consolidate duplicate blog posts (3–4 hours)
- H8: Fix SpotsCounter CLS (1 hour)
- H5: Fix Article schema author.url (30 min)

**Week 2:**
- H6: Add Service schema to city pages (2 hours)
- H2: Set up review ask flow (send with first session recap)
- M1: Add Quick Answer ledes to all blog posts
- M9: Trim Pricing meta description
- M11: Fix SlatmillExplainer aspect-ratio

**Month 1:**
- M4, M2, M3: BreadcrumbList, FAQ schema on Pricing, HowTo on Services
- M5: Author bio component on blog posts
- M6, M7: Miramar Beach + Sandestin city pages
- M13: Florida summer dog exercise blog post
- M10: Fix Lenis rAF loop

**Month 2–3:**
- L1: Content pillar creation (slatmill guide, conditioning science hub, local commercial hub)
- L2: Breed-specific posts
- L3: YouTube video production
- L4: BBB + Chamber listings
- L7: Local press pitch
