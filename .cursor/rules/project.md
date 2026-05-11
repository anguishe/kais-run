---
description: Core project identity. Reference for every task in this repo.
globs: ["**/*"]
alwaysApply: true
---

# KAI'S RUN — PROJECT CONTEXT

## Identity
- Business: Kai's Run — mobile canine conditioning service
- Owner: Travis | Mascot/origin dog: Kai (Rhodesian Ridgeback Mix)
- Markets: Destin FL · Fort Walton Beach FL · Niceville FL
- Phone: 850-218-5855
- Tagline: "Equinox for dogs, delivered to your driveway."
- This is NOT dog walking. It is performance conditioning for high-drive dogs.

## Tech Stack
- Next.js 14 App Router · TypeScript · Tailwind CSS
- framer-motion (UI transitions) · gsap + ScrollTrigger (scroll animation) · lenis (smooth scroll)
- Static export only (`output: 'export'`) — deployed to GitHub Pages
- NO Vercel. NO SSR. NO server actions. Static files only.

## Deployment
- `npm run build` → outputs to `/out`
- basePath: `/kais-run` in production (GitHub Pages repo name)
- Remove basePath when custom domain connected
- `public/.nojekyll` required

## File Conventions
- Components: `components/sections/` (page sections) · `components/layout/` (nav/footer) · `components/ui/` (atoms)
- Lib: `lib/variants.ts` (framer-motion) · `lib/utils.ts` (cn helper) · `lib/gsap.ts` (GSAP setup)
- Pages: `app/[route]/page.tsx`
- All imports use `@/` alias

## Token Rules
- Never re-explain the brand or stack in responses — it's in this file
- Never output boilerplate already established in earlier steps
- Confirm builds pass with `npm run build` — report errors only, not successes
