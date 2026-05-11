---
description: SEO rules, metadata patterns, schema markup, and keyword targets. Reference when building any page.tsx or layout.tsx.
globs: ["app/**/page.tsx", "app/**/layout.tsx", "app/sitemap.ts", "app/robots.ts"]
alwaysApply: false
---

# KAI'S RUN — SEO RULES

## Page Title Pattern
`[Page Name] | Kai's Run — Mobile Dog Gym Destin FL`

## Page Metadata Map
| Route | Title | Description |
|---|---|---|
| `/` | Kai's Run \| Mobile Dog Gym — Destin, Fort Walton Beach & Niceville FL | Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL. |
| `/services` | Dog Conditioning Services \| Kai's Run Mobile Dog Gym Destin FL | Performance slatmill sessions for high-drive dogs. We come to your driveway in Destin, Fort Walton Beach & Niceville. |
| `/pricing` | Pricing \| Kai's Run Mobile Dog Gym Destin FL | Intro sessions from $35. Memberships, bundles, and the Founding Athlete Program. Serving Destin FL. |
| `/about` | About Kai's Run \| Mobile Dog Gym Destin Florida | Travis and Kai's story — born and raised in Destin. The slatmill changed everything. |
| `/service-area` | Service Area \| Mobile Dog Gym Destin Fort Walton Beach Niceville FL | Kai's Run serves Destin, Miramar Beach, Fort Walton Beach, Niceville & surrounding Okaloosa County. |
| `/faq` | FAQ \| Kai's Run Mobile Dog Gym Destin FL | Common questions about slatmill sessions, booking, pricing, and what to expect. |
| `/book` | Book a Session \| Kai's Run Mobile Dog Gym Destin FL | Book your mobile dog gym session online. Serving Destin, Fort Walton Beach & Niceville FL. |

## Primary Keywords (homepage targets)
- `mobile dog gym Destin FL` ← highest priority
- `dog treadmill service Destin`
- `slatmill dog Destin Florida`
- `dog exercise service Fort Walton Beach`
- `mobile dog gym Okaloosa County`
- `canine conditioning Niceville Florida`

## Local SEO Rules
- Every city page section needs unique copy (not duplicated)
- Use city name + "FL" in h2 tags on service-area page
- Service area cities: Destin, Miramar Beach, Sandestin, Fort Walton Beach, Niceville, Shalimar
- Military angle: Eglin AFB, Hurlburt Field in copy where relevant

## Required JSON-LD Schemas

### Root layout — LocalBusiness
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Kai's Run",
  "description": "Mobile canine conditioning and slatmill service in Destin FL",
  "url": "https://kaisrun.com",
  "telephone": "850-218-5855",
  "areaServed": ["Destin FL", "Fort Walton Beach FL", "Niceville FL", "Miramar Beach FL"],
  "priceRange": "$$",
  "serviceType": "Mobile Dog Gym"
}
```

### /faq — FAQPage (generate from accordion content)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{ "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }]
}
```

### /services — Service schema per service type

## Implementation Pattern
```tsx
// In page.tsx
export const metadata: Metadata = {
  title: "...",
  description: "...",
  openGraph: { title: "...", description: "...", images: ['/images/og-image.jpg'] },
}

// JSON-LD in layout or page
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
```

## Sitemap Routes
`/` · `/services` · `/pricing` · `/about` · `/service-area` · `/faq` · `/book`
Base URL: `https://kaisrun.com` (placeholder until domain purchased)
