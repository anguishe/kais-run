# Kai's Run — Claude Code Optimization Deck
**Generated:** 2026-06-04
**Based on:** Full SEO audit (56/100), GSC data, action plan
**Run in:** Cursor Pro Agent mode (Claude Code)
**Order:** Run prompts in sequence. Each is self-contained. Verify build after each.

---

## PROMPT 0 — REPO HYGIENE (run first, every session)

```
# KAISRUN.XYZ — REPO FILE UPDATE

Read AGENTS.md before starting. Do not modify any application code in this prompt.

TASK: Update the following reference files in the repo root with the content I'm providing.
These are the authoritative context files for all future Claude Code sessions.

## Files to create or overwrite (verbatim — do not rewrite):

### CLAUDE.md
[paste content of CLAUDE.md output file here]

### AGENTS.md
[paste content of AGENTS.md output file here]

### brand-reference.md
[paste content of brand-reference.md output file here]

### INTEGRATIONS.md
[paste content of INTEGRATIONS.md output file here]

### DEPLOYMENT.md
[paste content of DEPLOYMENT.md output file here]

### SEO-STATUS.md (new file)
[paste content of SEO-STATUS.md output file here]

## Skill files to create:

### .claude/skills/kaisrun-context/SKILL.md (new)
[paste content of kaisrun-context SKILL.md here]

### .claude/skills/lsa-nextjs-static/SKILL.md (new)
[paste content of lsa-nextjs-static SKILL.md here]

After creating all files:
- Run `npm run build` — confirm exit code 0
- Report: list every file created/modified
```

---

## PROMPT 1 — CRITICAL FIXES (5 items, ~1 hour total)

```
# KAISRUN.XYZ — CRITICAL SEO FIXES

Read AGENTS.md and brand-reference.md before starting.

These are the 5 highest-impact fixes on the site. Run them in order.
After all changes: run `npm run build`, confirm exit code 0, report every file changed.

---

## FIX 1 — Unblock /book/ from indexing (5 min)

Problem: /book/ is double-blocked — robots.txt Disallow + page metadata robots: {index: false}.
The primary booking page is invisible to Googlebot.

### public/robots.txt — replace entire file content with:
```
User-agent: *
Allow: /
Disallow: /thank-you/
Disallow: /api/
Sitemap: https://kaisrun.xyz/sitemap.xml
```

### app/book/page.tsx — make these changes:
1. Remove the `robots: { index: false, follow: false }` field from the metadata export
2. Replace the `description` field with:
   "Book a mobile dog conditioning session in Destin, Fort Walton Beach or Niceville FL. Intro sessions start at $35. Schedule online — we come to your driveway."
3. Immediately below the `<BookPageClient />` component render, add static server-rendered content
   that Googlebot can index (this is in addition to the Square widget, which loads client-side):
```tsx
<div className="sr-only">
  <h1>Book a Mobile Dog Conditioning Session</h1>
  <p>Kai's Run brings a self-powered slatmill to your driveway in Destin, Fort Walton Beach, and Niceville FL. Intro sessions start at $35. Call or text 850-218-5855 to book directly.</p>
</div>
```

### public/sitemap.xml — add this block (after /faq/ entry, before closing </urlset>):
```xml
<url>
  <loc>https://kaisrun.xyz/book/</loc>
  <lastmod>2026-06-04</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

---

## FIX 2 — Fix Google Fonts render-blocking load (15 min)

Problem: `globals.css` line 1 has `@import url('https://fonts.googleapis.com/...')` which is
synchronous and render-blocking. This is the primary LCP bottleneck on every page.

### app/globals.css — remove line 1 (the @import for Google Fonts). Delete only that line.

### app/layout.tsx — replace the existing Google Fonts preconnect/link tags (or add if missing)
in the <head> with this non-blocking pattern:
```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
  media="print"
  onLoad="this.media='all'"
/>
```
Verify fonts still render correctly after this change. If DM Sans or Bebas Neue stops loading,
check the font URL matches what was in the original @import.

---

## FIX 3 — Remove priority from Navbar logo (1 min)

Problem: The logo image in Navbar.tsx has `priority` (or `fetchpriority="high"`) which emits a
<link rel="preload"> that competes with the hero image for LCP bandwidth.

### components/layout/Navbar.tsx — find the logo image element (approximately line 55).
Remove the `priority` prop if this is a Next.js Image component.
If it's a plain <img>, ensure there is no `fetchpriority="high"` attribute.
The logo should load normally, not be preloaded.

---

## FIX 4 — Fix LocalBusiness schema (20 min)

Problem: LocalBusiness schema in layout.tsx is missing required `address` and `image` fields,
has a malformed `openingHoursSpecification`, and uses an invalid co-type.

### app/layout.tsx — find the `localBusinessJsonLd` object (or equivalent variable name).
Replace it entirely with:
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
      {
        "@type": "Offer",
        "itemOffered": {"@type": "Service", "name": "Intro Session", "url": "https://kaisrun.xyz/services/"},
        "price": "35.00",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {"@type": "Service", "name": "Intro Session — Two Dogs", "url": "https://kaisrun.xyz/services/"},
        "price": "55.00",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {"@type": "Service", "name": "Founding Athlete Program", "url": "https://kaisrun.xyz/pricing/"},
        "price": "200.00",
        "priceCurrency": "USD"
      }
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

Also add a second `<script type="application/ld+json">` tag in the <head> for WebSite schema:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://kaisrun.xyz/#website",
  "url": "https://kaisrun.xyz",
  "name": "Kai's Run",
  "publisher": {"@id": "https://kaisrun.xyz/#business"}
}
```

---

## FIX 5 — Create public/llms.txt (AI citation eligibility)

Create `public/llms.txt` with this exact content — do not rewrite or summarize:

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
- Also served: Fort Walton Beach, Miramar Beach, Niceville, Shalimar, Sandestin, Okaloosa County

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

## Blog

- [When It's Too Hot to Walk Your Dog](https://kaisrun.xyz/blog/too-hot-to-walk-your-dog/)
- [How to Tire Out a High-Energy Dog](https://kaisrun.xyz/blog/how-to-tire-out-a-high-energy-dog/)
- [What Is a Dog Slatmill?](https://kaisrun.xyz/blog/what-is-a-dog-slatmill/)
- [Slatmill vs. a Long Walk](https://kaisrun.xyz/blog/dog-treadmill-vs-walk-comparison/)
- [High-Energy Dog Breeds Exercise Guide](https://kaisrun.xyz/blog/high-energy-dog-breeds-exercise-guide/)
- [How Much Exercise Does My Dog Need?](https://kaisrun.xyz/blog/how-much-exercise-does-my-dog-need/)
```

After all fixes: run `npm run build`, confirm exit code 0.
Report every file changed and paste the final robots.txt content.
```

---

## PROMPT 2 — HIGH PRIORITY FIXES (schema, H1s, performance)

```
# KAISRUN.XYZ — HIGH PRIORITY FIXES

Read AGENTS.md before starting. Run `npm run build` after all changes.

---

## FIX 1 — /services/ H1 (5 min)

In `app/services/ServicesPageClient.tsx` (or wherever the /services/ H1 renders), change:
- FROM: "WHAT WE DO" (or similar generic text)
- TO: "Dog Conditioning Sessions — Destin, Fort Walton Beach & Niceville FL"

---

## FIX 2 — Fix Person schema on About page (30 min)

In `app/about/page.tsx`, find the Person JSON-LD block. Make these changes:
1. Remove `alumniOf` — it uses a city name which is the wrong type for this property
2. Replace with: `"homeLocation": {"@type": "Place", "name": "Destin, Florida"}`
3. Normalize telephone to E.164: `"+18502185855"`
4. Add `"@id": "https://kaisrun.xyz/about/#travis"` to the Person node
5. Verify `"url": "https://kaisrun.xyz/about/"` is present

---

## FIX 3 — Fix Article schema author fields (30 min)

In `lib/blog/article-schema.ts` (or wherever BlogPosting schema is built), find the `author` object.
Add:
- `"url": "https://kaisrun.xyz/about/"`
- `"@id": "https://kaisrun.xyz/about/#travis"`

For the publisher `logo` ImageObject, add `width` and `height` properties.
Check the actual pixel dimensions of `kr-logo-1.webp` in `public/images/logos/` and use those values.

---

## FIX 4 — Add BreadcrumbList to 4 missing pages (30 min)

The pages /services/, /pricing/, /about/, and /faq/ have no BreadcrumbList schema.
Add 2-item breadcrumbs to each using the existing `buildBreadcrumbJsonLd()` helper (or equivalent).

Format:
- Home > Services
- Home > Pricing
- Home > About
- Home > FAQ

Each breadcrumb item: `{"@type": "ListItem", "position": N, "name": "[Name]", "item": "https://kaisrun.xyz/[path]/"}`

---

## FIX 5 — Add Service schema to city pages (2 hours)

### Step 1: Create lib/seo/service-area-schema.ts
```ts
export function buildServiceAreaSchema(city: {
  name: string;
  slug: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Mobile Dog Gym in ${city.name}, FL`,
    "url": `https://kaisrun.xyz/service-area/${city.slug}/`,
    "provider": {
      "@type": "AnimalService",
      "@id": "https://kaisrun.xyz/#business",
      "name": "Kai's Run"
    },
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "addressRegion": "FL"
    },
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Intro Session"
      },
      "price": "35.00",
      "priceCurrency": "USD"
    }
  };
}
```

### Step 2: Call buildServiceAreaSchema() in app/service-area/[slug]/page.tsx
Import the function and add the schema output as a second `<script type="application/ld+json">` tag
alongside the existing BreadcrumbList. Pass the city name and slug from whatever data source
the page already uses (cities.ts or equivalent).

---

## FIX 6 — Check and remove GSAP if unused (5 min)

Run this in terminal:
```bash
grep -r "from 'gsap'" app/ components/ lib/
grep -r "require('gsap')" app/ components/ lib/
```

If no matches found, remove `"gsap": "^3.15.0"` from `package.json` and run `npm install`.
This saves ~80KB from the JS bundle.

---

## FIX 7 — Fix SpotsCounter CLS (1 hour)

Problem: SpotsCounter component fetches `/data/config.json` client-side and shows a skeleton
while loading, causing layout shift when content swaps in.

### app/page.tsx (server component):
Import the config at the top of the file:
```ts
import configData from '@/public/data/config.json';
```
Pass the count as a prop to SpotsCounter:
```tsx
<SpotsCounter remaining={configData.remaining} />
```

### components/ui/SpotsCounter.tsx (or equivalent):
Update the component to accept `remaining` as a prop instead of fetching it.
Remove the `fetch('/data/config.json')` call entirely.
Remove the loading skeleton — render the prop value directly.

The component should no longer need `'use client'` if its only state was the fetched count.
Check if other interactive features in the component require client mode — if not, remove it.

---

## FIX 8 — Trim Pricing page meta description (5 min)

In `app/pricing/page.tsx`, find the metadata `description` field.
If it is over 160 characters, trim it to under 160 while preserving the key message.
Target: under 155 characters. Do not truncate mid-sentence.

---

## FIX 9 — Hero image fetchpriority (5 min)

Find the hero image <img> tag (likely in app/page.tsx or the hero section component).
Add `fetchpriority="high"` attribute if not present.
Verify it has explicit `width` and `height` attributes — add them if missing (use the actual
pixel dimensions of hero-main.webp).

Run `npm run build`. Confirm exit code 0. Report every file changed.
```

---

## PROMPT 3 — BLOG POST #10 (add too-hot-to-walk-your-dog)

```
# KAISRUN.XYZ — ADD BLOG POST #10

Read AGENTS.md before starting. Match the exact structure of the most recent post
(high-energy-dog-breeds-need-more-than-a-walk or whatever is most recent in lib/blog/posts.ts).
Do not invent a new structure. Do not rewrite the body content.

## POST METADATA
- slug: too-hot-to-walk-your-dog
- title: When It's Too Hot to Walk Your Dog (And the Energy Still Has to Go Somewhere)
- page <title>: When It's Too Hot to Walk Your Dog | Kai's Run
- description: Florida summer pavement can hit 135°F. When it's too hot to walk your dog — and how to actually drain a high-drive dog without the heat. Destin, FL.
- date / datePublished: 2026-06-02
- readTime: 5 min
- author: Travis
- keywords: too hot to walk dog Florida, is it too hot to walk my dog, hot pavement dog paws, summer dog exercise heat, exercise dog in summer heat
- og:type: article
- og:image: /images/og-image.png (default, same as other posts)
- canonical: https://kaisrun.xyz/blog/too-hot-to-walk-your-dog/

## RELATED POSTS
- how-to-tire-out-a-high-energy-dog
- what-is-a-dog-slatmill
- slatmill-vs-long-walk (or dog-treadmill-vs-walk-comparison — use whichever slug is live)

## BODY CONTENT
Insert this body verbatim in whatever format existing posts use (MDX or structured blocks).
Do not rewrite, summarize, or paraphrase any of this content:

---
Eyebrow: Field notes

H1: When It's Too Hot to Walk Your Dog (And the Energy Still Has to Go Somewhere)

Subtitle: Florida summer pavement can hit 135°F. When it's too hot to walk your dog — and how to actually drain a high-drive dog without the heat. Destin, FL.

Byline: Author — Travis · Published — 2026-06-02 · Read time — 5 min

[No heading — intro paragraph]
By the second week of June, the morning walk has a deadline. You're out the door by seven, and by the time you've looped the block the sun is already cooking the sidewalk past anything your dog should be standing on. By noon, the driveway is a griddle. This is the part of summer on the Emerald Coast that nobody warns new dog owners about: the heat doesn't just make walks miserable — it takes them off the table for most of the daylight hours.

Here's the problem with that. Your dog's energy didn't read the forecast. A high-drive dog needs the same output in July that it needed back in March. The season changed. The dog didn't. And a working breed that doesn't get drained is going to find its own way to spend that fuel — usually on your couch, your baseboards, or your patience.

H2: So when is it actually too hot to walk your dog?
The rule most vets give is simple: once the air hits about 85°F and stays there through the day, walking gets risky — and not because of the air. It's the ground. When the air reads 86°F, asphalt in the sun can climb to around 135°F. A surface that hot can blister a paw pad in under a minute, and your dog has no way to tell you it's happening until the damage is done.

The fastest check is the seven-second test: press the back of your hand flat on the pavement and hold it. If you can't make it to seven seconds, it's too hot for your dog's paws. No thermometer, no guessing. If your hand taps out, so do they.

H2: The part everyone misses is the ground, not the air
People check the air temperature and call it. But asphalt and concrete soak up heat all day and hold it for hours — which is why a "cool" 7 p.m. walk after a hot afternoon can still mean your dog is padding across a surface that's been cooking since lunch. Cloud cover doesn't save you either. The ground holds what it absorbed.

The other trap is that dogs hide it. Most won't yelp and sit down. They'll keep walking right beside you because that's what they were bred to do, and you won't know anything's wrong until you see the limping, the paw-licking, or the red, tender pads at home. By then it's a vet visit, not a precaution.

H2: On the coast, it isn't just hot — it's long
A heat wave somewhere else is a bad week. Here it's a season. In Destin, Fort Walton Beach, and Niceville, the heat index sits north of 100 for a solid stretch from roughly June through September, and the humidity keeps the ground warm well past sundown. On top of that, our dogs cool themselves mainly by panting, and panting barely works when the air is already thick and hot.

So this isn't a "wait for a cooler day" situation. It's a third of the year where your normal exercise routine is gone for most of the day. That's a long time to ask a high-drive dog to sit still.

H2: "Just walk earlier" isn't really a fix for a working dog
Say you nail the 6 a.m. window. Good — that's the safe move, and you should take it. But a cooler walk is still a walk, and we've already gone deep on [why a walk doesn't drain a working breed](/blog/how-to-tire-out-a-high-energy-dog/) in the first place. Now you've got a shorter, milder version of the thing that already wasn't enough. The dog comes home from a sweaty loop physically unbothered, mentally still hunting for a job — and now it's too hot to do anything else until dark.

That's the squeeze summer puts on you. It doesn't just make exercise harder. It quietly removes every tool you had — the midday walk, the backyard fetch, the trip to the dog park that's now a bowl of hot sand — and leaves you with a wired dog and no outlet.

H2: What actually works when it's too hot outside
You don't beat the heat by toughing it out earlier. You beat it by moving the work somewhere the heat can't reach. That's the whole reason [the slatmill](/blog/what-is-a-dog-slatmill/) makes sense in a Florida summer — it runs inside a climate-controlled unit, in the air conditioning, with no pavement involved, at whatever hour works for you. August or January, the session is the same.

And because it's sustained, structured effort instead of a stop-start stroll, it does in twenty or thirty focused minutes what a ninety-minute suffer-walk never could. [Slatmill work tires a dog differently than a walk](/blog/dog-treadmill-vs-walk-comparison/) — heart rate up and holding, a real warm-up and cool-down — which is exactly the kind of output these dogs were built to burn through. No hot ground, no heat exhaustion, no 5 a.m. alarm.

This is honestly the part of the year that started all of it. Summer was when [Kai's](/about/) energy got the worst — I couldn't walk him in the middle of the day, the yard was an oven, and a Ridgeback mix with nowhere to put 70 pounds of drive is a long afternoon. The slatmill was the thing that gave him a real workout when the weather had taken everything else away.

H2: The one rule to keep this summer
Back of the hand. Seven seconds. If you can't hold it, neither can your dog — and on the coast, the honest answer most afternoons is going to be "too hot."

When that's the answer, the move isn't to wait it out and hope the dog naps through it. A high-drive dog stuck inside all day doesn't power down — it finds its own entertainment, and you usually don't like the activity it picks. Have a plan that drains the energy without sending anyone onto 135-degree pavement.

H2: If this is your summer
If your dog is climbing the walls by 2 p.m. and the heat has cut your walks down to a sad little dawn loop, that gap is exactly what we're built for. [Book an intro session](/book/) in [Destin](/service-area/destin/), [Fort Walton Beach](/service-area/fort-walton-beach/), or [Niceville](/service-area/niceville/), and we'll bring a real workout to your driveway — in the AC, on your schedule, no matter what the pavement's doing.
---

## ALSO UPDATE

1. SITEMAP: add to public/sitemap.xml:
```xml
<url>
  <loc>https://kaisrun.xyz/blog/too-hot-to-walk-your-dog/</loc>
  <lastmod>2026-06-02</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```
Also update lastmod on the /blog/ entry to 2026-06-02.

2. BLOG INDEX: if the blog index is not auto-generated, add this post to the top of the list
(newest post, date 2026-06-02). If auto-generated from the data source, confirm it will appear
sorted newest-first.

3. RELATED POST RECIPROCITY: add "too-hot-to-walk-your-dog" to the related arrays of these posts:
- how-to-tire-out-a-high-energy-dog
- what-is-a-dog-slatmill
- dog-treadmill-vs-walk-comparison (or slatmill-vs-long-walk — whichever is the live slug)

4. JSON-LD: ensure BlogPosting schema outputs:
- datePublished: "2026-06-02"
- author: @id "https://kaisrun.xyz/about/#travis", name "Travis", url "https://kaisrun.xyz/about/"
- publisher: name "Kai's Run", url "https://kaisrun.xyz"
- mainEntityOfPage: "https://kaisrun.xyz/blog/too-hot-to-walk-your-dog/"
- image: "https://kaisrun.xyz/images/og-image.png"

Run `npm run build`. Confirm /blog/too-hot-to-walk-your-dog/ is generated in /out/.
Report every file changed, paste the final generateMetadata output and JSON-LD for this post.
```

---

## PROMPT 4 — NEW CITY PAGES (Miramar Beach + Sandestin)

```
# KAISRUN.XYZ — ADD MIRAMAR BEACH + SANDESTIN CITY PAGES

Read AGENTS.md and brand-reference.md before starting.
Mirror the structure of the existing city pages (Destin, Fort Walton Beach, Niceville) exactly.
These must pass the doorway page test — genuine neighborhood differentiation, not templated copy.

---

## PAGE 1: Miramar Beach

### Route: /service-area/miramar-beach/
### Metadata:
- title: Mobile Dog Gym in Miramar Beach, FL | Kai's Run
- description: Kai's Run brings slatmill conditioning to Miramar Beach driveways — Grand Boulevard, Silver Sands, Maravilla. Private sessions for high-drive dogs on 30A. Book online.
- canonical: https://kaisrun.xyz/service-area/miramar-beach/

### Schema: add BreadcrumbList (Home > Service Area > Miramar Beach) and Service schema using buildServiceAreaSchema({name: "Miramar Beach", slug: "miramar-beach"})

### Content (embed verbatim — do not rewrite):

H1: Mobile Dog Gym in Miramar Beach, FL

Intro: Miramar Beach sits between Destin and 30A — dense with vacation rentals, second homes, and HOA communities where 6 a.m. walks mean navigating parking lots and beach traffic before the day even starts. If your dog is wired and the beach access points are already crowded, a structured conditioning session at your door is a different kind of solution.

H2: The neighborhood
The Grand Boulevard corridor brings traffic through all summer. The Silver Sands and Maravilla communities are full of owners who work from home, run short-term rentals, or spend months at a stretch on the coast — dogs included. Vacation rental schedules don't always line up with daylight hours suitable for a real workout. The slatmill does.

H2: What a session looks like in Miramar Beach
We pull up to your driveway — or your vacation rental's parking area, if accessible — and set up in the shade or in the climate-controlled unit. Your dog runs one-on-one. Nobody else's dog, no facility to drive to, no check-in. The session runs 30–45 minutes, and your dog goes back inside calm.

H2: Ready to book?
[Book an intro session](/book/) — $35 for one dog, $55 for two from the same household. Or reach out directly at 850-218-5855 if you have questions about your dog's fit.

### Also: add "miramar-beach" to the service area slug list (cities.ts or generateStaticParams) so the route is generated at build time.

---

## PAGE 2: Sandestin

### Route: /service-area/sandestin/
### Metadata:
- title: Mobile Dog Gym in Sandestin, FL | Kai's Run
- description: Kai's Run serves Sandestin resort community — Baytowne, the Dunes, Burnt Pine, and the Links. Private slatmill conditioning at your door. No drop-off required.
- canonical: https://kaisrun.xyz/service-area/sandestin/

### Schema: add BreadcrumbList (Home > Service Area > Sandestin) and Service schema using buildServiceAreaSchema({name: "Sandestin", slug: "sandestin"})

### Content (embed verbatim — do not rewrite):

H1: Mobile Dog Gym in Sandestin, FL

Intro: Sandestin is a gated resort community with HOA rules, tight street parking, and long distances between the Baytowne, Dunes, Links, and Burnt Pine villages. It's a place where people bring their dogs for extended stays — and where the normal "drive to the dog park" routine requires a car trip through a toll gate just to leave. The mobile model was made for this.

H2: Who we serve here
Sandestin owners tend to have high-drive dogs and inconsistent schedules — they're here for a month, then gone, then back for the season. The Founding Athlete Program is a natural fit for this pattern: five sessions with priority booking, at a rate that lets you plan ahead without committing to a weekly standing appointment.

H2: How it works in Sandestin
We schedule around your availability and your HOA's access rules. If your unit allows vehicles at the door, that's where we set up. If not, we work from a nearby permitted area. Session length and structure are the same anywhere — one dog, 30–45 minutes, no other animals, no distractions.

H2: Book a session
[Start with an intro session](/book/) at $35, or [claim a Founding Athlete spot](/book/?offer=founding) if you're planning to make conditioning part of your regular routine here. Questions? Call or text 850-218-5855.

### Also: add "sandestin" to the service area slug list.

---

## ALSO UPDATE

1. public/sitemap.xml — add both new city page URLs:
```xml
<url>
  <loc>https://kaisrun.xyz/service-area/miramar-beach/</loc>
  <lastmod>2026-06-04</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://kaisrun.xyz/service-area/sandestin/</loc>
  <lastmod>2026-06-04</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

2. public/llms.txt — add both cities to the Service Area section.

3. Footer city links — add Miramar Beach and Sandestin to the "Service Cities" list in the Footer component.

4. Service area hub page (/service-area/) — add links to the two new pages.

5. Cross-links: add a reference + link to Miramar Beach on the Destin city page
(they share the 98 corridor). Add a reference + link to Sandestin on the Destin page as well.

Run `npm run build`. Confirm both city routes appear in /out/service-area/. Report every file changed.
```

---

## PROMPT 5 — AEO CONTENT FIXES (quick answers + FAQ schema)

```
# KAISRUN.XYZ — AEO CONTENT IMPROVEMENTS

Read AGENTS.md before starting.
These changes improve AI search citability and Featured Snippet eligibility.
Do not rewrite or expand existing post content — these are targeted insertions only.

---

## TASK 1 — Add Quick Answer ledes to all blog posts

A "Quick Answer" lede is a bolded direct-answer sentence inserted as the very first content
in each blog post, before any intro paragraph or first H2. This is the Featured Snippet target.

For each blog post listed below, find the content file (content/blog/[slug].mdx or equivalent)
and insert the lede as the first line of body content.
Do not change any other content. Do not alter headings, paragraphs, or structure.

Add these exact ledes:

### how-to-tire-out-a-high-energy-dog
**A 20-minute walk releases roughly 5% of a working breed's daily energy — structured aerobic work like slatmill conditioning is what actually depletes a high-drive dog.**

### what-is-a-dog-slatmill
**A dog slatmill is a non-motorized treadmill powered entirely by the dog's own movement — no motor, no minimum speed, no forced pace.**

### dog-treadmill-vs-walk-comparison
**A slatmill session raises a dog's heart rate and holds it for 20–30 minutes; a neighborhood walk rarely achieves sustained aerobic effort at all.**

### high-energy-dog-breeds-exercise-guide
**High-energy working breeds need 60–90 minutes of true aerobic output daily — not a walk, but sustained cardiovascular work that actually depletes their energy reserve.**

### how-much-exercise-does-my-dog-need
**Most high-drive dogs need 45–90 minutes of moderate-to-high intensity aerobic work daily — significantly more than a standard neighborhood walk provides.**

### too-hot-to-walk-your-dog
**When Florida air temperatures hit 85°F, asphalt in direct sun can reach 135°F — hot enough to blister a dog's paw pad in under a minute.**

---

## TASK 2 — Add FAQPage JSON-LD to Pricing page

The /pricing/ page has 4 FAQ items in an accordion component but no structured data.
Add FAQPage JSON-LD to app/pricing/page.tsx.

Read the actual FAQ question and answer text from the existing <FAQAccordion> component
(or wherever the pricing FAQ items are defined). Use that exact text — do not invent questions.

The JSON-LD format:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[answer text]"
      }
    }
  ]
}
```

---

## TASK 3 — Add direct-answer definition to /blog/what-is-a-dog-slatmill/

The slatmill post likely opens with a React component (SlatmillExplainer) rather than a
direct-answer paragraph. The Featured Snippet algorithm pulls from the first paragraph below a heading.

After the main H1 and before any React components or the first H2, insert this paragraph
as plain text/MDX prose (not inside a component):

"A dog slatmill is a non-motorized treadmill powered entirely by the dog's own movement.
Unlike motorized units, a slatmill has no electric motor — the belt moves only when the dog
steps forward, and stops the instant they do. The dog controls the pace entirely, from first
step to finish. This self-paced work builds sustained aerobic output the way natural running
does: the dog chooses the effort, holds it, and every minute on the mill is real work."

---

## TASK 4 — Add SlatmillExplainer aspect-ratio container

In components/ui/SlatmillExplainer.tsx (or wherever the slatmill explainer image renders),
find the image wrapper div. Add `className` that includes `aspect-video` to the wrapper.
This prevents CLS caused by the container collapsing to zero height before the image loads.

Run `npm run build`. Confirm exit code 0. Report every file changed.
```

---

## PROMPT 6 — POST-DEPLOY (run after GitHub Pages build completes)

```bash
# Run these in Kali terminal after GitHub Pages finishes deploying

# 1. IndexNow — ping all new/changed URLs
curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/blog/too-hot-to-walk-your-dog/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/service-area/miramar-beach/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/service-area/sandestin/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/book/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/blog/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/llms.txt&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"

# 2. Verify robots.txt doesn't block /book/
curl https://kaisrun.xyz/robots.txt

# 3. Verify llms.txt is accessible
curl https://kaisrun.xyz/llms.txt

# 4. Verify sitemap includes new URLs
curl https://kaisrun.xyz/sitemap.xml | grep -E "(too-hot|miramar|sandestin|book)"
```

**Then in Google Search Console (browser):**
- URL Inspection → `https://kaisrun.xyz/blog/too-hot-to-walk-your-dog/` → Request Indexing
- URL Inspection → `https://kaisrun.xyz/service-area/miramar-beach/` → Request Indexing
- URL Inspection → `https://kaisrun.xyz/service-area/sandestin/` → Request Indexing
- URL Inspection → `https://kaisrun.xyz/book/` → Request Indexing

---

## Post-Deploy Verification Checklist

- [ ] `/robots.txt` — `/book/` NOT in Disallow, `/thank-you/` and `/api/` are
- [ ] `/llms.txt` — returns 200, content readable
- [ ] `/sitemap.xml` — contains all new URLs with trailing slashes
- [ ] `/book/` — loads, Square widget present, not blocked
- [ ] `/blog/too-hot-to-walk-your-dog/` — renders, BlogPosting JSON-LD in source, datePublished 2026-06-02
- [ ] `/service-area/miramar-beach/` — renders, Service schema in source
- [ ] `/service-area/sandestin/` — renders, Service schema in source
- [ ] Blog index — new post appears at top (sorted newest-first)
- [ ] View source on homepage — LocalBusiness schema has `address` and `image` fields
- [ ] View source on homepage — Google Fonts loaded via `<link>` not `@import`
- [ ] IndexNow returned 200 for all pinged URLs

---

## What Is NOT in This Deck (Handled Manually or in Future Sessions)

The following are tracked in SEO-STATUS.md but not in this deck because they require
live data, external platforms, or significant content investment:

- Google Business Profile verification (requires equipment video)
- Yelp, Bing Places, Apple Maps, Nextdoor listing creation (browser tasks)
- Review acquisition strategy (starts at first session)
- Blog post expansions (Cluster 1, 2, 3, 4 pillars — tracked in SEO-STATUS.md)
- Lenis rAF idle fix (evaluate removing Lenis entirely vs patching)
- Cloudflare Pages migration (evaluate when consistent traffic established)
- aggregateRating schema (add only when real Google reviews exist)
- YouTube video production
```
