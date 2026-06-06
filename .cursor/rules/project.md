---
description: Core project identity. Reference for every task in this repo.
globs: ["**/*"]
alwaysApply: true
---

# KAI'S RUN — PROJECT CONTEXT

## Identity
- Business: Kai's Run — mobile canine conditioning service
- Owner: Travis | Mascot/origin dog: Kai (Rhodesian Ridgeback Mix)
- Domain: kaisrun.xyz · Repo: anguishe/kais-run
- Email: kaisrunmobile@gmail.com · Phone: 850-218-5855
- Markets: Destin FL · Fort Walton Beach FL · Niceville FL · Miramar Beach FL · Shalimar FL
- Tagline: "Your Dog Deserves to Run."
- This is NOT dog walking. It is performance conditioning for high-drive dogs.
- Full brand facts: `brand-reference.md`

## Tech Stack
- See `.cursor/rules/stack-constraints.md` — read before every prompt
- Next.js 16 App Router · TypeScript strict · Tailwind CSS v4
- framer-motion (UI transitions) · gsap + ScrollTrigger (scroll animation) · lenis (smooth scroll)
- Static export only (`output: 'export'`) — deployed to GitHub Pages
- NO API routes · NO server actions · NO `next/image` · plain `<img>` only

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
