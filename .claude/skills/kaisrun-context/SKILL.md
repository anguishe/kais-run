# Skill: kaisrun-context

**Purpose:** Inject authoritative Kai's Run project context into any Claude Code session, preventing stale brand names, wrong hosting references, and constraint violations from leaking into generated code or copy.

**When to load:** At the start of every Claude Code session in the `kais-run` repo. Load this before any other task.

---

## Project Identity

- **Business:** Kai's Run — mobile canine conditioning, Destin FL
- **Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion v12
- **Hosting:** GitHub Pages static export — `output: 'export'`, no SSR, no API routes in production
- **Repo:** anguishe/kais-run
- **Live domain:** https://kaisrun.xyz (trailing slash on all URLs)
- **Build:** `npm run build` → `/out` — always verify exit code 0

---

## Hard Constraints (Never Violate)

1. **No `next/image`** — use plain `<img>` tags only
2. **No `/api/*` routes in production** — GitHub Pages is static
3. **No middleware redirects** — use Cloudflare redirect rules for 301s
4. **No Vercel** — hosting is GitHub Pages only
5. **Never use "Emerald Paws Athletic Club"** — retired brand, fully purged
6. **No `@import` for Google Fonts in CSS** — use `<link>` preload in `layout.tsx`
7. **No `priority` prop on Navbar logo** — LCP bandwidth conflict
8. **No Disallow: /book/ in robots.txt** — booking page must be indexable
9. **No Mailchimp API calls from client** — must go through Cloudflare Worker
10. **No `aggregateRating` with placeholder values** — add only when real reviews exist

---

## Pricing (Locked)

| Product | Price |
|---|---|
| Intro Session — 1 dog | $35 |
| Intro Session — 2 dogs (same household) | $55 |
| Founding Athlete Program | $200 / 5 sessions |
| Standard walk-up | TBD — "pricing announced after Founding closes" |

---

## File Structure (Key Paths)

```
app/                        Next.js App Router pages
app/layout.tsx              Root layout — LocalBusiness schema, font preload, GA4
app/page.tsx                Homepage (server component)
app/blog/[slug]/page.tsx    Blog post renderer
app/service-area/[slug]/    City landing pages
components/layout/          Navbar, Footer
components/sections/        Page-level sections
components/ui/              Atomic components
content/blog/[slug].mdx     Blog post content
lib/blog/posts.ts           Blog post metadata
lib/seo/                    Schema builders
public/sitemap.xml          Static sitemap (update manually)
public/llms.txt             AI citation file
public/robots.txt           Must NOT block /book/
public/data/config.json     Spots counter data
```

---

## Schema Entity IDs

```
Business:  https://kaisrun.xyz/#business  (@type: AnimalService)
Person:    https://kaisrun.xyz/about/#travis
WebSite:   https://kaisrun.xyz/#website
```

---

## Form → Endpoint Map

| Form | Formspree | Mailchimp Tag |
|---|---|---|
| Footer signup | xykolrrr | footer-signup |
| Contact | mvzllpwg | contact-inquiry |
| Founding 20 | mojrrvdd | founding-20 |
| Energy Guide | mpqbbwrl | energy-guide |

Cloudflare Worker: `kaisrun-subscribe.kaisrunmobile.workers.dev`

---

## IndexNow

```bash
# Ping after any new page or blog post goes live:
curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/blog/[SLUG]/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
```

---

## Design Tokens

```
brand-black:    #0F1117   brand-charcoal: #1A1F2E
brand-teal:     #0A5C52   brand-gold:     #C9963A
brand-offwhite: #F0EDE6   brand-gray:     #9A9590
```
Fonts: `font-display` (Bebas Neue) · `font-body` (DM Sans)

---

## Voice Rules

- Short declarative sentences. Plain dashes (—). No exclamation points.
- Use: dog, high-drive dog, athlete, session, conditioning, slatmill
- Never: furry friend, pup, pooch, fur baby, cutesy

## Blog Post Requirements (every post)

- [ ] Quick Answer lede: bolded direct-answer sentence before first H2
- [ ] Minimum 1,200 words
- [ ] At least 3 internal links
- [ ] BlogPosting + BreadcrumbList JSON-LD
- [ ] Entry in `lib/blog/posts.ts`
- [ ] Sitemap + llms.txt updated
- [ ] IndexNow pinged post-deploy
