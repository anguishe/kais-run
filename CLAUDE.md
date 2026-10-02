# Kai's Run — Claude Code Context

Read this file completely before writing any code.
This is the authoritative reference for stack, constraints, integrations, and brand rules.

## Deployment

- **Host:** Vercel SSR (migrated from GitHub Pages, June 2026)
- **Canonical domain:** https://kaisrun.xyz (apex — www redirects to apex)
- **Repo:** anguishe/kais-run
- API routes: WORK in production (Vercel SSR)
- Server actions: WORK in production
- next/image: AVAILABLE but NOT YET INTRODUCED — existing plain <img> tags stay until a specific migration prompt runs
- redirects() in next.config.js: WORKS in production

## Stack

- Next.js App Router · TypeScript · Tailwind CSS v4
- Deployment: Vercel SSR — API routes, server components, and headers() all active
- Host: https://kaisrun.xyz (apex canonical; www 301 redirects to apex)
- Plain `<img>` tags only — never introduce `next/image`
- trailingSlash: true — all internal links and sitemaps use trailing slashes
- Build command: `npm run build` — always verify zero errors before finishing any task

## Canonical & Schema URL Rule

ALL of the following must use https://kaisrun.xyz (apex — never www):
- alternates.canonical in every page's metadata
- openGraph.url in every page's metadata
- Schema @id fields: https://kaisrun.xyz/#business, https://kaisrun.xyz/#website, https://kaisrun.xyz/about/#travis
- Sitemap <loc> entries
- llms.txt references
- Any hardcoded domain string in app/, components/, lib/

## Advertising: NONE (removed 2026-09-01)

- The site serves **no display ads**. AdSense was removed sitewide: loader,
  ad units, `ads.txt`, and the privacy/terms disclosures.
- Do **not** reintroduce AdSense, `adsbygoogle`, `ca-pub-*`, or any display network
  without an explicit instruction from Travis.
- `components/GoogleAds.tsx` is **Google Ads conversion tracking** (`AW-*`), not AdSense.
  It stays — it measures paid campaigns and sets no ad inventory.
- Business is PARKED (2026-09-28): not taking dogs. Goal now = traffic to blog + free
  tools, launch-list signups, and future ads/tool monetization (gated on Travis).
  Current monetization: affiliate links on `/equipment/*` only. See docs/MONETIZATION.md.

## Tailwind Tokens

| Token | Hex |
|---|---|
| brand-black | #0F1117 |
| brand-charcoal | #1A1F2E |
| brand-teal | #0A5C52 |
| brand-gold | #C9963A |
| brand-offwhite | #F0EDE6 |
| brand-gray | #9A9590 |

Fonts: font-display = Bebas Neue · font-body = DM Sans

## Business Stage: PARKED (since 2026-09-28)

Kai's Run is **not taking dogs yet**. The trailer is not operational. Travis approved (2026-09-28):
- Every "Book Now" / booking CTA is now **"Join the Launch List"** and points to `/book/`.
  `/book/` stays live (no 404s) but renders the launch list (`LaunchWaitlist source="book-page"`)
  plus the free tools, not the Square widget. The old widget page is in git history
  (`app/book/BookPageClient.tsx`, removed 2026-09-28) for when sessions open.
- Blog posts end with a `**Free tool:**` line, then the launch-list line
  ("Kai's Run is not taking dogs yet. [Join the launch list](#launch-list) ..."). No `/book/` or
  intro-session CTAs in posts.
- `/pricing/`, `/services/`, `/faq/` and `public/llms.txt` carry a "not taking dogs yet" notice;
  rates on `/pricing/` are labelled planned launch rates.
- **No prices in copy** anywhere new (standing rule). `/pricing/` tier cards and schema offers are
  the only surfaces that still show numbers.
- Do not reintroduce booking CTAs until Travis says sessions are open.

## Pricing Rules (LOCKED, planned launch rates - not bookable while parked)

- Founding Athlete: $200 / 5 sessions ($40 effective) — limited 20 dogs, one-time offer, NO lifetime rate lock
- Intro Session: $35 (1 dog) / $55 (2 dogs, same household) — includes fitness assessment, "Run Profile" card, and a protein treat after the session
- Private Conditioning Session: $70 (1 dog) / $135 (2 dogs, same household — two individual back-to-back sessions, up to 45 min each)
- Session Packages: 3-session $195 (1 dog) / $380 (2 dogs) · 5-session $300 (1 dog) / $580 (2 dogs) — no stated expiration, do not claim "never expire"
- Discounts: Military & First Responder Discount — 10% off all paid sessions and packages, EXCLUDES the Intro Session. No teacher discount.
- Monthly Memberships (Tier 4) and Snowbird Package (Tier 5): still gated — do not render or promote

## Brand Rules

- Business name: Kai's Run
- NEVER USE: "Emerald Paws Athletic Club" — retired, purged, never regenerate
- Origin dog: Kai (Rhodesian Ridgeback mix), owned by Travis
- Tone: athletic, direct, premium - short sentences, active voice. Spaced hyphens only ( - ). Em dashes are banned in all copy, metadata, and schema text. Zero exclamation points in body copy.
- Prices never appear in editorial body copy. Pricing surfaces (/pricing/, /services/ tier cards, schema offers) are exempt.
- NEVER USE: pup, fur baby, pooch, furry friend, cutesy, spoil, pamper
- Positioning: private one-on-one mobile canine conditioning — not dog walking, not daycare

## Service Area

Destin · Fort Walton Beach · Niceville · Miramar Beach · Sandestin · Shalimar ·
Mary Esther · Navarre · Santa Rosa Beach · Bluewater Bay · Valparaiso

## Integrations

- GA4: G-1P5ST40L2E — Consent Mode v2, region-scoped (2026-10-02): EEA/UK/CH opt-in; elsewhere analytics granted by default and the banner's Decline opts out. Ad storage denied everywhere. Never revert to a global analytics deny (it hid ~all traffic).
- Microsoft Clarity: wurwoh6v8a
- Formspree endpoints: see INTEGRATIONS.md
- Mailchimp: Cloudflare Worker at kaisrun-subscribe.kaisrunmobile.workers.dev
  (Still the Mailchimp bridge — do not replace with /api/subscribe route without instruction)
- Square Appointments widget: loaded via useEffect only, never next/script

## Blog Post Checklist Reminder

The MDX pipeline runs `remark-gfm` (tables render; single-tilde strikethrough is off).

Every new blog post requires a `CATEGORY_MAP` entry in `lib/blog/categories.ts` — omitting it causes the post to disappear from all category filters on /blog.

## Pre-Flight Pattern for Every Task

1. Run the grep/ls checks specified in the prompt — report every file found
2. Make only the changes described — do not touch unrelated files
3. Run npm run build
4. Report zero errors OR list every error with file + line number
