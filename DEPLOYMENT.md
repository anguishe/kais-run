# Kai's Run — Deployment Reference

**Host:** GitHub Pages (static export)
**Repo:** anguishe/kais-run
**Live site:** https://kaisrun.xyz
**Last updated:** 2026-06-04

---

## Stack Constraints — Read First

This is a Next.js static export deployed to GitHub Pages. That means:

- `output: 'export'` in `next.config.js` — hard constraint
- No SSR, no API routes, no server actions, no middleware in production
- No custom HTTP headers (no CSP, no HSTS via GitHub Pages)
- No automatic image optimization (`images.unoptimized: true`)
- Use plain `<img>` tags — never `next/image`
- 301 redirects via Cloudflare redirect rules, not Next.js middleware
- `trailingSlash: true` — all internal links and sitemaps use trailing slashes

---

## Deploy Flow

Every push to `main` triggers the GitHub Actions workflow:

```
git add .
git commit -m "your message"
git push origin main
```

Build runs in ~2 minutes. Check status at: `https://github.com/anguishe/kais-run/actions`

---

## Environment Variables

All `NEXT_PUBLIC_*` variables must exist in **two places** or they are undefined in production:

1. GitHub repo → Settings → Secrets and Variables → Actions → **New repository secret**
2. `.github/workflows/deploy.yml` → `env:` block in the build step

Example `deploy.yml` build step:
```yaml
- name: Build
  run: npm run build
  env:
    NEXT_PUBLIC_GOOGLE_ADS_ID: ${{ secrets.NEXT_PUBLIC_GOOGLE_ADS_ID }}
    NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL: ${{ secrets.NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL }}
```

Variables only in GitHub Secrets but not in `deploy.yml` will be `undefined` at build time.

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

Site rebuilds in ~2 minutes. The `SpotsCounter` component imports this JSON at build time — no client-side fetch.

---

## Adding Blog Posts

1. Create `content/blog/[slug].mdx` with MDX content
2. Add entry to `lib/blog/posts.ts` with all metadata fields
3. Update `public/sitemap.xml` — add new `<url>` block
4. Update `public/llms.txt` — add post under blog section
5. Run `npm run build` locally and confirm exit code 0
6. Push to main and wait for GitHub Actions to complete
7. Ping IndexNow after pages are live:
   ```bash
   curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/blog/[SLUG]/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
   curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/blog/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
   ```
8. In Google Search Console → URL Inspection → request indexing for the new URL

---

## Adding Service Area Pages

1. Add city slug to `lib/service-area/cities.ts` (or wherever `generateStaticParams` reads from)
2. Create page content — minimum 700 words with genuine neighborhood differentiation
3. Add `Service` schema using `buildServiceAreaSchema(city)` helper in `lib/seo/`
4. Add `BreadcrumbList` schema
5. Add to `public/sitemap.xml`
6. Add to `public/llms.txt`
7. Update footer city links if needed
8. Add cross-links from adjacent city pages
9. Ping IndexNow after deploy

---

## Redirects (301)

Static export cannot handle redirects via Next.js middleware. Options:

**Option A — Cloudflare redirect rules (preferred):**
Set up in Cloudflare dashboard → Rules → Redirect Rules. Requires Cloudflare as DNS proxy (already in use for the Cloudflare Worker).

**Option B — Meta refresh (fallback):**
Replace old page content with:
```html
<meta http-equiv="refresh" content="0;url=/blog/[target-slug]/" />
```
Not ideal for SEO but functional.

---

## Custom Domain

Custom domain is live: `kaisrun.xyz`
- `public/CNAME` contains `kaisrun.xyz`
- DNS configured at registrar pointing to GitHub Pages
- HTTPS enforced in GitHub Pages settings
- www redirect handled by GitHub Pages

---

## Local Development

```bash
npm install
npm run dev          # dev server at localhost:3000
npm run build        # static export to /out — always verify before pushing
npm run lint
```

**Browser cache is a common false alarm.** When deploying, always test in incognito or hard refresh (`Cmd+Shift+R`) before doing a re-deploy. Confirm with curl before assuming a bug.

---

## Post-Deploy Verification Checklist

After every significant deploy:

- [ ] Visit canonical URL, confirm content renders
- [ ] View source: check `<title>`, `<meta description>`, canonical tag, JSON-LD
- [ ] Check `/sitemap.xml` is accessible
- [ ] Check `/llms.txt` is accessible
- [ ] Check `/robots.txt` — confirm `/book/` is NOT in Disallow
- [ ] Test `/book/` loads the Square booking widget
- [ ] IndexNow pinged for any new URLs
- [ ] Google Search Console: request indexing for new URLs if high priority
