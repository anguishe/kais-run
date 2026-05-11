---
description: Static export constraints and GitHub Pages deployment rules. Reference when editing next.config.js, layout.tsx, any page with dynamic features, or deployment config.
globs: ["next.config.*", ".github/**", "app/layout.tsx", "app/sitemap.ts", "app/robots.ts"]
alwaysApply: false
---

# KAI'S RUN — STATIC EXPORT CONSTRAINTS

## Hard Rules — Static Export Only
- `output: 'export'` is non-negotiable — never remove
- NO `getServerSideProps` · NO server actions · NO API routes
- NO `next/headers` · NO cookies server-side · NO streaming
- All data must be static or client-side fetched
- `next/image` requires `unoptimized: true`

## next.config.js — Locked Config
```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/kais-run' : '',
  trailingSlash: true,
};
```
Replace `'/kais-run'` with actual GitHub repo name if different.
Remove `basePath` entirely when custom domain is connected.

## Dynamic Routes
If adding dynamic routes (e.g. blog): must include `generateStaticParams()`.
Without it, build will fail for dynamic segments.

## Client Components
Any component using hooks, browser APIs, framer-motion, or GSAP must have `'use client'` at top.
Lenis smooth scroll must be in a client component provider.

## Image Handling
```tsx
import Image from 'next/image'
// Always include width + height or fill prop
// Always unoptimized (set globally in next.config.js)
<Image src="/images/kai-hero.jpg" alt="Kai running on slatmill" width={1920} height={1080} />
```
Placeholder pattern for missing images:
```tsx
{/* REPLACE WITH: <Image src="/images/[filename].jpg" ... /> */}
<div className="w-full aspect-video bg-brand-charcoal border border-brand-teal/10 rounded-xl" />
```

## GitHub Pages Requirements
- `public/.nojekyll` must exist (empty file — prevents Jekyll processing)
- All internal links must use Next.js `<Link>` — not `<a href>`
- Assets in `/public` directory only
- No absolute URLs to localhost in production code

## GitHub Actions Workflow — Do Not Modify
Located at `.github/workflows/deploy.yml`
Trigger: push to `main` branch
Build command: `npm run build`
Artifact path: `./out`
Node version: 20

## Build Verification Command
```bash
npm run build
```
Must complete with zero errors before any commit.
TypeScript errors = build failure = broken deployment.

## Environment Variables
None required for MVP. If adding (e.g. Formspree ID):
- Use `NEXT_PUBLIC_` prefix for client-accessible vars
- Add to GitHub repo Settings → Secrets → Actions for CI builds
- Never hardcode API keys in source files
