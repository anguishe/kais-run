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

## AdSense

- Correct pub ID: ca-pub-5399156622542127
- If you see ca-pub-6289405922667797 anywhere: it is wrong — replace it

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

## Business Stage: PRE-OPENING

Only active offer: Founding Athlete Program ($200/5 sessions, 17 spots remaining).
All other services (intro sessions, standard walk-up, memberships) are NOT published
or promoted until Travis announces opening. Do not add CTAs, pricing copy, or schema
for unlaunched services unless explicitly instructed.

## Pricing Rules (LOCKED)

- Founding Athlete: $200 / 5 sessions ($40 effective) — limited 20 dogs, one-time offer, NO lifetime rate lock
- Standard walk-up: TBD — DO NOT RENDER
- Intro Session: Exists in legacy components — do not add new CTAs for it

## Brand Rules

- Business name: Kai's Run
- NEVER USE: "Emerald Paws Athletic Club" — retired, purged, never regenerate
- Origin dog: Kai (Rhodesian Ridgeback mix), owned by Travis
- Tone: athletic, direct, premium — short sentences, active voice, em-dashes (—)
- NEVER USE: pup, fur baby, pooch, furry friend, cutesy, spoil, pamper
- Positioning: private one-on-one mobile canine conditioning — not dog walking, not daycare

## Service Area

Destin · Fort Walton Beach · Niceville · Miramar Beach · Sandestin · Shalimar ·
Mary Esther · Navarre · Santa Rosa Beach · Bluewater Bay · Valparaiso

## Integrations

- GA4: G-1P5ST40L2E — consent-gated (loads after cookie-consent-accepted event)
- Microsoft Clarity: wurwoh6v8a
- Formspree endpoints: see INTEGRATIONS.md
- Mailchimp: Cloudflare Worker at kaisrun-subscribe.kaisrunmobile.workers.dev
  (Still the Mailchimp bridge — do not replace with /api/subscribe route without instruction)
- Square Appointments widget: loaded via useEffect only, never next/script
- AdSense pub: ca-pub-5399156622542127 (Auto Ads OFF — verification script only until approval)

## Pre-Flight Pattern for Every Task

1. Run the grep/ls checks specified in the prompt — report every file found
2. Make only the changes described — do not touch unrelated files
3. Run npm run build
4. Report zero errors OR list every error with file + line number
