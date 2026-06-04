# Skill: lsa-nextjs-static

**Purpose:** Standards and constraints for building local service area business (LSA) websites on the Next.js static export + GitHub Pages stack. Reusable across clients. Covers SEO, schema, content architecture, and deployment patterns specific to service-area businesses with no physical storefront.

**When to load:** Any LSA client project using Next.js static export on GitHub Pages. Load alongside the client-specific context skill.

---

## What Is an LSA Website

A local service area business (SAB) serves customers at their location — no storefront, no drop-off facility. The business comes to the customer. This creates specific requirements across schema, GBP setup, content strategy, and conversion architecture that differ from brick-and-mortar local businesses.

---

## Static Export Constraints (Non-Negotiable)

```
output: 'export'
trailingSlash: true
images.unoptimized: true
```

| Constraint | Implication |
|---|---|
| No SSR | No `getServerSideProps`, no server actions |
| No API routes | All third-party API calls need a bridge (Cloudflare Worker, external service) |
| No middleware | 301 redirects via Cloudflare rules or `<meta http-equiv="refresh">` |
| No custom headers | Security headers not possible without CDN layer |
| No next/image optimization | Plain `<img>` tags with explicit `width` and `height` on every image |
| `trailingSlash: true` | All internal links, canonical URLs, and sitemaps use trailing slashes |

---

## SEO Architecture for SABs

### LocalBusiness Schema Requirements

```json
{
  "@context": "https://schema.org",
  "@type": "[appropriate subtype — AnimalService, Plumber, etc.]",
  "@id": "https://[domain]/#business",
  "name": "[Business Name]",
  "url": "https://[domain]",
  "telephone": "+1[10-digit]",
  "email": "[contact email]",
  "image": "https://[domain]/images/og-image.png",
  "logo": "https://[domain]/images/logo.webp",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[primary city]",
    "addressRegion": "[state abbreviation]",
    "postalCode": "[zip]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [lat],
    "longitude": [lng]
  },
  "areaServed": [
    {"@type": "City", "name": "[City]", "addressRegion": "[State]"}
  ]
}
```

**SAB-specific notes:**
- Include `address` even though it's not displayed publicly — required for LocalBusiness rich results
- Use the operator's actual service zip for `postalCode`, not a PO box
- `openingHours: "Mo-Su"` for appointment-only businesses without fixed hours
- Do NOT add `aggregateRating` until real reviews exist — Google will suppress invalid markup
- `sameAs` array: add verified GBP URL after verification, social profiles

### Service Area Page Architecture

Each city served by the SAB should have its own landing page. The doorway page test: does this page contain genuine neighborhood-level differentiation, or is it a template with the city name swapped in? If the latter, it will be treated as a doorway page and may be deindexed.

**Genuine differentiation signals:**
- Named neighborhoods, subdivisions, landmarks specific to that city
- Local demand context (military presence, vacation rentals, HOA communities, etc.)
- Specific geographic references (named roads, corridors, districts)
- Audience-specific framing unique to that community

**Schema for city pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service] in [City], [State]",
  "provider": {"@type": "[BusinessType]", "@id": "https://[domain]/#business"},
  "areaServed": {"@type": "City", "name": "[City]", "addressRegion": "[State]"},
  "url": "https://[domain]/service-area/[slug]/",
  "offers": {"@type": "Offer", "price": "[price]", "priceCurrency": "USD"}
}
```

Build a `buildServiceAreaSchema(city)` helper in `lib/seo/` so schema is generated consistently.

### Blog Content Architecture

**The 4-cluster hub-and-spoke model for LSA blogs:**

- Cluster 1: Product/service education (what is the thing, how it works)
- Cluster 2: Problem/solution science (why customers need it, what happens without it)
- Cluster 3: Audience-specific (breed, job type, lifestyle segment)
- Cluster 4: Local commercial (service + city keyword — often zero competition)

Each cluster needs one pillar (1,500–3,000 words) and 3–5 spokes (1,000–1,500 words each). Spokes link to pillar. Pillar links back to spokes and to service/booking pages.

**Minimum word count:** 1,200 words for any post competing for informational queries. Posts under 700 words are below citation threshold for AI systems.

**Quick Answer lede:** Every blog post should open with a bolded direct-answer sentence before the first H2. This is the Featured Snippet target and the AI citation anchor.

---

## GBP Setup for SABs

1. Set as **Service Area Business** — do NOT enter a physical address that displays publicly
2. Add all served cities to service area
3. Primary category: verify exact GBP category name in Whitespark's category tool (category is the #1 local ranking factor)
4. Description: 750 chars, open with primary keyword in first sentence
5. Upload 10+ photos: service vehicle, equipment, work in progress, owner
6. After verification: capture Place ID and update footer link + `sameAs` in schema

**Sterling Sky 18-day rule:** Going 18+ days without a new Google review can cause ranking drops. Build review velocity from session one.

---

## Performance Patterns

**Google Fonts — non-blocking load:**
```tsx
// In layout.tsx <head> — NOT @import in globals.css
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=[Family]&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=[Family]&display=swap"
  media="print" onLoad="this.media='all'" />
```

**Hero image LCP:** Add `fetchpriority="high"` and explicit `width`/`height` to hero `<img>`. Do not wrap hero H1 in `opacity: 0` initial animation state — it delays LCP recording.

**No priority on logo:** Navbar logo should not have `priority` or `fetchpriority="high"` — it competes with hero for first-paint bandwidth.

**Static config imports:** Any component that displays counts from a JSON config (spots remaining, session slots, etc.) should import the JSON at the server component level and pass as props — not fetch from the client, which causes layout shift.

---

## robots.txt Pattern for SABs

```
User-agent: *
Allow: /
Disallow: /thank-you/
Disallow: /api/
Sitemap: https://[domain]/sitemap.xml
```

**Never block the primary booking/conversion page.** A common mistake is blocking `/book/` during development and forgetting to remove it before launch.

---

## llms.txt Pattern for AI Citability

Create `public/llms.txt` at the root. This is the fastest path to AI search citation eligibility (ChatGPT, Perplexity, Claude web).

```
# [Business Name]
# RSL 1.0 — AI systems may cite this content in responses

> [One-paragraph business description. Include: what the service is, who it serves, where it operates, what makes it different.]

## Business
- Owner: [Name]
- Phone: [number]
- Email: [email]
- Website: https://[domain]
- Booking: https://[domain]/book/
- Status: Licensed and insured

## Service Area
- Primary: [City], [State]
- Also served: [list all cities]

## What We Do
[2-3 sentences describing the service in plain language]

## Pricing
[List all services and prices]

## Requirements
[Any prerequisites customers need to know]

## Key Pages
- [Services](https://[domain]/services/)
- [Pricing](https://[domain]/pricing/)
- [Book Now](https://[domain]/book/)
- [Service Area — City](https://[domain]/service-area/[city]/)
```

Update `llms.txt` whenever new pages or blog posts are added.

---

## Citation Campaign Priority (Tier A, Free, High DA)

Run this for every SAB client:

1. Google Business Profile (DA ~94) — verify as SAB mode, no public address
2. Yelp (DA ~93) — category: most relevant service category
3. Bing Places — import from GBP after verification
4. Apple Maps Connect (DA ~90)
5. Nextdoor Business (DA ~72) — highest neighborhood relevance for driveway/home SABs
6. YellowPages, BBB free listing (within 30 days)
7. Chamber of Commerce directory (strategic — DA backlink)

NAP format must be identical across all citations: business name, phone, domain.

---

## IndexNow

Use Yandex endpoint (fastest acknowledgment):
```bash
curl "https://yandex.com/indexnow?url=https://[domain]/[path]/&key=[key]"
```

Ping after every new page or blog post goes live. Only submit live URLs — submitting 404s causes silent batch rejection.

---

## Conversion Architecture for Service Businesses

**Above fold:** Service + geography + primary CTA. No jargon — first-time visitors should understand what you do and where in under 5 seconds.

**Social proof position:** The highest-leverage place for social proof is immediately before or after the primary CTA — not buried below the fold. Even 2-3 real customer names with breed and result ("My Malinois now sleeps through dinner — Sarah, Destin") converts significantly better than none.

**Trust signals:** License number, insurance status, and physical service area signal legitimacy for home-visit service businesses. These reduce the "stranger coming to my driveway" friction.

**Pricing page:** Never leave "coming soon" as the only answer for a pricing tier. Publish a range if the exact price isn't set yet.

---

## Content Voice Rules for LSA

- Write from the operator's direct experience, not generic industry knowledge
- Specific beats general: named neighborhoods, specific breeds, real behavioral observations
- No unattributed statistics — AI systems deprioritize unsourced claims
- No hype, no cutesy — the work and the result are the story
- Local signals in copy: city names, neighborhood names, landmarks, local context
