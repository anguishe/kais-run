# AGENTS.md — Kai's Run

> This file defines rules for all AI agents (Claude Code, Cursor, etc.) working in this codebase.
> Read this before touching any file. It supersedes any conflicting instruction.

---

## Locked Facts — Never Override Without Explicit Confirmation

| Fact | Value |
|---|---|
| Business name | Kai's Run |
| Retired name | ~~Emerald Paws Athletic Club~~ — never use, never generate |
| Domain | https://kaisrun.xyz (trailing slash on all URLs) |
| Repo | anguishe/kais-run |
| Hosting | **GitHub Pages — static export only** |
| Build output | `/out` directory |
| Framework | Next.js 16 App Router, `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true` |
| Image tags | Plain `<img>` only — never `next/image` |
| API routes | **Do not exist in production** — static export means no `/api/*` routes run on GitHub Pages |
| Mailchimp bridge | Cloudflare Worker at `kaisrun-subscribe.kaisrunmobile.workers.dev` |
| CSS framework | Tailwind CSS v4 |
| Fonts | Bebas Neue (display), DM Sans (body) — loaded via non-blocking `<link>` in `layout.tsx`, NOT `@import` in CSS |
| Phone | 850-218-5855 (display) / +18502185855 (E.164 for schema/href) |
| Email | kaisrunmobile@gmail.com |

---

## Pricing — Locked, Do Not Modify Without Explicit Instruction

| Product | Price | Notes |
|---|---|---|
| Intro Session — 1 dog | $35 | |
| Intro Session — 2 dogs | $55 | Same household only — never imply group sessions |
| Founding Athlete Program | $200 / 5 sessions ($40 effective) | Limited 20 dogs, one-time — not a lifetime rate lock |
| Standard walk-up | TBD ($60–$100 range) | Copy: "pricing announced after Founding closes" |

---

## Service Area

**Live pages:** Destin · Fort Walton Beach · Niceville
**Planned pages:** Miramar Beach · Sandestin
**Mention-only:** Shalimar (reference on Fort Walton Beach page)

All 6 cities appear in `areaServed` in LocalBusiness schema.

---

## Agent Roles

### 🏗️ Architect Agent
**When active:** Planning new pages, routes, or structural changes
- Update `ARCHITECTURE.md` before implementing any new route
- Never add server-side features (API routes, middleware redirects, SSR) — static export ceiling is hard
- 301 redirects must use Cloudflare redirect rules or `<meta http-equiv="refresh">` — Next.js middleware does not run on GitHub Pages

### 🎨 UI/Design Agent
**When active:** Building or modifying any component or visual section
- Follow design tokens in `tailwind.config.ts` — never hardcode hex values
- Brand tokens: `brand-black` `brand-charcoal` `brand-teal` `brand-gold` `brand-offwhite` `brand-gray`
- Aesthetic: dark cinematic premium — never use pastel, bubble, or playful pet-industry styling
- All components responsive, mobile-first

### 💻 Dev Agent
**When active:** Writing code, fixing bugs
- TypeScript strict — no `any`
- No `console.log` in production code
- No unused imports
- Build must pass: `npm run build` exit code 0 before reporting complete
- Loading and error states required for any async operation
- Never hardcode contact info — import from the appropriate lib file

### 📝 Content Agent
**When active:** Writing or editing any text
- Voice: short declarative sentences, plain dashes (—), no hype, no fluff
- Use: dog, high-drive dog, athlete, session, conditioning, slatmill
- Avoid: furry friend, pup, pooch, fur baby, cutesy pet language
- Blog posts: embed body content verbatim in Cursor prompts — never let the agent rewrite it
- No unattributed statistics — Perplexity and AI citation systems deprioritize unsourced claims
- Quick Answer lede required on every blog post (bolded direct-answer sentence before first H2)

### 🔌 Integration Agent
**When active:** Setting up or modifying third-party services
- See `INTEGRATIONS.md` for all endpoint mappings
- Never commit API keys — all secrets in `.env.local` and GitHub Actions repo secrets
- `NEXT_PUBLIC_` variables must be added as repo secrets AND exposed in `deploy.yml` build step or they are undefined in production
- Mailchimp calls go through Cloudflare Worker — never call Mailchimp API directly from client

---

## Universal Rules

### Before Any Task
1. Read this file
2. Read the relevant domain file (`ARCHITECTURE.md`, `INTEGRATIONS.md`, etc.)
3. Confirm the task against locked facts above — if anything conflicts, stop and ask

### Code Quality Non-Negotiables
- No `@ts-ignore` without a comment explaining why
- No commented-out code blocks
- All async ops have loading + error states
- `npm run build` must exit 0

### File Placement
- New page components → `app/[route]/page.tsx` + `app/[route]/[Name]PageClient.tsx`
- New shared components → `components/sections/` (page-level) or `components/ui/` (atoms)
- New SEO helpers → `lib/seo/`
- New blog posts → `content/blog/[slug].mdx`
- Blog post data → `lib/blog/posts.ts`
- Static assets → `public/`

### Schema Rules
- LocalBusiness `@id`: `https://kaisrun.xyz/#business`
- Person (Travis) `@id`: `https://kaisrun.xyz/about/#travis`
- WebSite `@id`: `https://kaisrun.xyz/#website`
- All schema uses `@type: "AnimalService"` (not the redundant `["LocalBusiness", "AnimalService"]` co-type)
- Never add `aggregateRating` with placeholder values — add only when real Google reviews exist

### SEO Non-Negotiables
- Every page: unique `<title>`, unique `<meta description>` under 160 chars, canonical URL with trailing slash
- `/book/` must NOT be in `robots.txt` Disallow — the booking page must be indexable
- Sitemap: `public/sitemap.xml` is static — add new slugs manually
- llms.txt: `public/llms.txt` — add new blog posts and pages when created
- IndexNow: ping after every new page or post goes live (see `INTEGRATIONS.md` for curl command)

### Blog Post Checklist (every new post)
- [ ] MDX file at `content/blog/[slug].mdx`
- [ ] Entry in `lib/blog/posts.ts` with all metadata fields
- [ ] BlogPosting JSON-LD with `datePublished`, `author @id`, `publisher`
- [ ] BreadcrumbList JSON-LD
- [ ] Quick Answer lede (bolded sentence before first H2)
- [ ] At least 3 internal links
- [ ] Related posts array updated (and reciprocal updates on linked posts)
- [ ] Sitemap entry added
- [ ] llms.txt entry added
- [ ] IndexNow curl command ready to run post-deploy

---

## Known Technical Constraints

| Constraint | Detail |
|---|---|
| No middleware redirects | Static export — use Cloudflare redirect rules for 301s |
| No server actions | Static export only |
| No custom HTTP headers | GitHub Pages limitation — security headers not possible without Cloudflare Pages migration |
| SpotsCounter | Import `public/data/config.json` directly in server component — no client fetch |
| Lenis rAF | Add idle check or remove entirely — native `scroll-behavior: smooth` is in `globals.css` |
| Hero H1 animation | Do not wrap in `opacity: 0` initial state — LCP penalty |

---

## Common Mistakes to Avoid

- Adding `Disallow: /book/` to `robots.txt` — the booking page must be crawlable
- Using CSS `@import` for Google Fonts in `globals.css` — render-blocking, use `<link>` preload in `layout.tsx`
- Setting `priority` on Navbar logo image — competes with hero image for LCP bandwidth
- Adding `next/image` — incompatible with static export
- Calling Mailchimp API from client — must go through Cloudflare Worker
- Submitting 404 slugs to IndexNow — silent batch rejection
- Adding `aggregateRating` before real reviews exist
- Writing blog post body inside the MDX data object — embed verbatim content in the prompt
