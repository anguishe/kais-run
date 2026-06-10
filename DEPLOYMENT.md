# Kai's Run — Deployment Reference

**Host:** Vercel SSR
**Repo:** anguishe/kais-run
**Live site:** https://www.kaisrun.xyz
**Canonical:** www (apex redirects to www via Vercel — do not change this)
**Last updated:** 2026-06-09

---

## Stack Constraints

This is a Next.js App Router project deployed to Vercel SSR. That means:

- API routes work in production
- Server actions work in production
- redirects() in next.config.js work in production
- headers() in next.config.js work in production (security headers ARE served)
- next/image optimization is available — plain <img> tags exist but may be migrated
- trailingSlash: true — all links and sitemaps use trailing slashes

## Deploy Flow

Every push to main triggers an automatic Vercel deployment:
git add .
git commit -m "your message"
git push origin main

Vercel builds in ~1–2 minutes. Check status at the Vercel dashboard.

## Environment Variables

All NEXT_PUBLIC_* variables must be set in the Vercel dashboard under
Project Settings → Environment Variables, scoped to Production (and Preview if needed).
Variables not in Vercel dashboard are undefined in the production build.

## Canonical Domain

www.kaisrun.xyz is the canonical domain.
kaisrun.xyz (apex) → 300 redirects to www.kaisrun.xyz (Vercel handles this).
Do not hardcode the apex form anywhere in the codebase.

## Updating Founding Athlete Spots

When a spot is claimed, update the counter:

```bash
# Edit public/data/config.json
# Decrease "remaining" by 1
# Update "lastUpdated" to today's date
git add public/data/config.json
git commit -m "Spots: [N] remaining"
git push
```

The SpotsCounter component imports this JSON at build time.
After push, Vercel rebuilds in ~1-2 minutes.

## Adding Blog Posts

1. Create content/blog/[slug].mdx with frontmatter and body
2. Verify lib/blog/posts.ts picks it up (check generateStaticParams)
3. Run npm run build locally and confirm exit code 0
4. Push to main
5. Ping IndexNow after deploy:
   curl "https://yandex.com/indexnow?url=https://www.kaisrun.xyz/blog/[SLUG]/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
6. Request indexing in Google Search Console → URL Inspection

## Redirects

redirects() in next.config.js works on Vercel. Use it for any 301 redirects.

Example:
```js
async redirects() {
  return [
    {
      source: '/blog/old-slug',
      destination: '/blog/new-slug',
      permanent: true,
    },
  ]
}
```

## Post-Deploy Verification Checklist

After every significant deploy:

- [ ] Visit https://www.kaisrun.xyz — confirm loads from www, not apex
- [ ] View source: check <title>, <meta description>, canonical tag, JSON-LD
- [ ] Confirm canonical is https://www.kaisrun.xyz/ (with www)
- [ ] Check /sitemap.xml is accessible and all <loc> entries use www
- [ ] Check /robots.txt — confirm /book/ is NOT in Disallow
- [ ] Test /book/ loads the Founding Athlete form
- [ ] IndexNow pinged for any new URLs
- [ ] Google Search Console: request indexing for new high-priority URLs
