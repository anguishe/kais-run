# Kai's Run — Claude Code Context

Read this file completely before writing any code.
This is the authoritative reference for stack, constraints, integrations, and brand rules.

## Stack

- Next.js 16 App Router · TypeScript · Tailwind CSS v4
- Static export ONLY: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`
- Deployed to GitHub Pages — NO API routes, NO server actions, NO SSR
- Plain `<img>` tags only — never introduce `next/image`
- Redirects via HTML meta-refresh pages ONLY — `redirects()` in `next.config.js` does NOT execute on static export
- Build command: `npm run build` — always verify zero errors before finishing any task

## Tailwind Tokens

| Token | Hex |
|---|---|
| brand-black | #0F1117 |
| brand-charcoal | #1A1F2E |
| brand-teal | #0A5C52 |
| brand-gold | #C9963A |
| brand-offwhite | #F0EDE6 |
| brand-gray | #9A9590 |

Fonts: `font-display` = Bebas Neue · `font-body` = DM Sans

## Content Architecture

- Blog MDX posts: `content/blog/[slug].mdx`
- Blog indexed via: `lib/blog/posts.ts`
- City pages: `app/service-area/[city]/page.tsx`
- Deprecated posts: renamed with `_deprecated_` prefix — hidden from auto-discovery

## Integrations

- GA4: G-1P5ST40L2E — consent-gated, only loads after `cookie-consent-accepted` event
- Microsoft Clarity: wurwoh6v8a
- Square Appointments: `https://square.site/appointments/buyer/widget/x06wxfzw47ogj7/LY4W4QTX4A1PF.js` — loaded via `useEffect` only, never `next/script`
- Formspree: see `INTEGRATIONS.md` for all endpoint IDs
- Mailchimp: Cloudflare Worker at `kaisrun-subscribe.kaisrunmobile.workers.dev`

## Pricing Rules — LOCKED

- Intro Session: $35 (1 dog) / $55 (2 dogs, same household only)
- Founding Athlete: $200 / 5 sessions — limited to 20 dogs total
- Founding spots remaining: read from `lib/constants.ts` → `FOUNDING_SPOTS_REMAINING`
- Standard walk-up pricing: TBD — DO NOT render in any page, component, or schema until Travis announces it

## Brand Rules

- Business name: Kai's Run
- NEVER USE: "Emerald Paws Athletic Club" — retired brand name, must never appear anywhere
- Origin dog: Kai (Rhodesian Ridgeback mix), owned by Travis
- Tone: athletic, direct, premium — short sentences, active voice
- NEVER USE: pup, fur baby, pooch, furry friend, or any cutesy pet language
- Positioning: private one-on-one mobile canine conditioning — not dog walking, not daycare, not group sessions
- Equipment: self-powered slatmill (no motor — dog sets the pace) brought to client's driveway

## Service Area — Full List

Destin · Fort Walton Beach · Niceville · Miramar Beach · Sandestin · Shalimar · Mary Esther · Navarre · Santa Rosa Beach · Bluewater Bay · Valparaiso

## HOLD Items — Do Not Run Without Travis's Real Content

- Miramar Beach, Sandestin, Shalimar neighborhood texture copy
- Kai's authentic backstory with slatmill make/model and session protocol specifics
- Snowbird/vacation-rental audience content
- GBP verification (awaiting equipment arrival)
- Standard walk-up pricing (TBD — do not publish)

## Pre-Flight Pattern for Every Task

1. Run the grep/ls check specified in the prompt — report every file found
2. Make only the changes described — do not touch unrelated files
3. Run `npm run build`
4. Report zero errors OR list every error with file + line number
