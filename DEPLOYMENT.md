# Kai's Run — Deployment Reference

**Host:** Vercel SSR
**Repo:** anguishe/kais-run
**Live site:** https://www.kaisrun.xyz
**Canonical:** www — apex (kaisrun.xyz) 308 redirects to www automatically via Vercel
**Last updated:** 2026-06-09

---

## Stack Constraints — Read First

This is a Next.js App Router app deployed to Vercel SSR. That means:

- NO `output: 'export'` — Vercel handles SSR, ISR, and static pages automatically
- API routes ARE supported — `/api/*` routes execute on Vercel serverless functions
- `headers()` in `next.config.js` IS active — security headers served by Vercel
- `next/image` IS supported — Vercel handles image optimization automatically
- `trailingSlash: true` — all internal links and sitemaps use trailing slashes
- `redirects()` in `next.config.js` IS supported on Vercel

---

## Deploy Flow

Every push to `main` triggers an automatic Vercel build:
git add .
git commit -m "your message"
git push origin main

Build runs in ~2 minutes. Check status at: https://vercel.com/dashboard
There is NO GitHub Actions deploy workflow — Vercel's GitHub integration handles everything.

---

## Environment Variables

All `NEXT_PUBLIC_*` variables must be set in the **Vercel dashboard**:

1. Vercel dashboard → Project → Settings → Environment Variables
2. Add each variable with its value
3. Set environment scope: Production (and Preview if needed)
4. Redeploy after adding new variables

Variables set only in `.env.local` will be undefined in production.

---

## Updating Founding Athlete Spots

When a spot sells, update the counter:

```bash
# Edit public/data/config.json
# Decrease "remaining" by 1
# Update "lastUpdated" to today's date

git add public/data/config.json
git commit -m "Spots: [N] remaining"
git push
```

Vercel rebuilds automatically in ~2 minutes.

---

## Adding Blog Posts

1. Create `content/blog/[slug].mdx` with MDX content
2. `lib/blog/posts.ts` uses filesystem auto-discovery — no manual entry required
3. Update `public/sitemap.xml` — add new `<url>` block
4. Update `public/llms.txt` — add post under blog section
5. Run `npm run build` locally and confirm exit code 0
6. Push to main and wait for Vercel build to complete
7. Ping IndexNow after pages are live:
```bash
   curl "https://yandex.com/indexnow?url=https://www.kaisrun.xyz/blog/[SLUG]/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
```
8. In Google Search Console → URL Inspection → request indexing for the new URL

---

## Adding Service Area Pages

1. Add city slug to `lib/service-area/cities.ts`
2. Create page content — minimum 700 words with genuine neighborhood differentiation
3. Add `Service` schema using `buildServiceAreaSchema(city)` helper in `lib/seo/`
4. Add `BreadcrumbList` schema
5. Add to `public/sitemap.xml`
6. Add to `public/llms.txt`
7. Update footer city links if needed
8. Add cross-links from adjacent city pages
9. Ping IndexNow after deploy

---

## Custom Domain

Custom domain live: `www.kaisrun.xyz`
- DNS configured at registrar pointing to Vercel
- www is the canonical — apex 308 redirects to www via Vercel
- HTTPS enforced automatically by Vercel

---

## Local Development

```bash
npm install
npm run dev          # dev server at localhost:3000
npm run build        # verify build passes before pushing
npm run lint
```

---

## Post-Deploy Verification Checklist

After every significant deploy:

- [ ] Visit https://www.kaisrun.xyz, confirm content renders
- [ ] View source: check `<title>`, `<meta description>`, canonical tag, JSON-LD
- [ ] Check `/sitemap.xml` is accessible
- [ ] Check `/llms.txt` is accessible
- [ ] Check `/robots.txt` — confirm `/book/` is NOT in Disallow
- [ ] Test `/book/` loads the Square booking widget
- [ ] IndexNow pinged for any new URLs
- [ ] Google Search Console: request indexing for new URLs if high priority

---

## Vercel / Deploy

- Trigger: push to `main` → automatic Vercel build
- Build command: `npm run build`
- Output directory: `.next` (Vercel SSR — not `/out`)
- Build time: ~2 minutes
- Dashboard: https://vercel.com/dashboard

> Environment variables must be set in Vercel dashboard → Project → Settings → Environment Variables.
