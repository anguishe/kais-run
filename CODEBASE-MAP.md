# Kai's Run — Codebase Ground-Truth Map
Generated: 2026-06-19 · Auditor: Claude Code (Opus 4.8) · READ-ONLY recon

> Every claim cites a real file (~line) and is tagged `VERIFIED` (file opened/grepped) or `INFERRED`.
> **Code beats docs.** Where a repo doc and the code disagree, the code reality is recorded here and the doc claim is logged in §12.

---

## 0. TL;DR — what's true today

- **Hosting:** Vercel SSR. `next.config.js` has **no `output: 'export'`**, no `images.unoptimized`. Build = `next build`, start = `next start`, output `.next`. `VERIFIED` (next.config.js, package.json). Dead GitHub-Pages machinery still sits in the repo (`/out` build dir, `public/CNAME`, `public/.nojekyll`, `public/_redirects`).
- **Blog pipeline:** Filesystem-driven. Dropping `content/blog/<slug>.mdx` is the **entire** registration step. `lib/blog/posts.ts` is a **parser, not a registry** — you never add an entry. Related posts auto-derive (newest-first, not semantic). Sitemap + llms.txt are the only **manual** follow-ups. `VERIFIED` (lib/blog/posts.ts, app/blog/[slug]/page.tsx).
- **Canonical host:** **Apex everywhere** — `https://kaisrun.xyz`, consistently, in every metadata block, schema `@id`, sitemap, robots, llms. `VERIFIED` (99 apex hits vs 2 www hits; the 2 www hits are in `public/_redirects` only). The recon brief's premise that "the decision is www / live emits apex" is itself out of date: the latest commit (`f76b08a fix: flip canonical host www → apex`) deliberately standardized on apex, and the authoritative `CLAUDE.md` agrees. **There is no www/apex gap in code today** — the only www strings are in a dead Cloudflare file. `SEO-STATUS.md` still claims "normalized to www" — that doc is wrong (§12).
- **AdSense:** ~90% verification-ready. Loader script present sitewide with the **correct** pub ID `ca-pub-5399156622542127`; stale `ca-pub-6289405922667797` is **fully absent**; `ads.txt` correct; privacy policy has a compliant Advertising section. **Two blockers:** (1) loader script in `<head>` is **not consent-gated** (GA4 is — compliance asymmetry); (2) no ad units actually render — both insertion points are hard-disabled with `{false && …}` and placeholder `SLOT_ID_HERE`. No `google-adsense-account` meta tag (the client-param loader script substitutes for it).
- **Biggest doc/code mismatches:** `AGENTS.md` (says GitHub Pages static export, `output:'export'`, `images.unoptimized`, no API routes, "add entry to `lib/blog/posts.ts`" — all stale, and it self-contradicts in a later addendum), the `kaisrun-context` skill (says GitHub Pages), `SEO-STATUS.md` (says www-canonical), `INTEGRATIONS.md` (Founding-20 → `mojrrvdd` Formspree form that **does not exist in source**).

---

## 1. Hosting, Build & Deploy

| Fact | Evidence | Tag |
|---|---|---|
| SSR, **not** static export | `next.config.js` — no `output: 'export'` key anywhere | VERIFIED |
| `trailingSlash: true` | next.config.js:3 | VERIFIED |
| Security headers via `headers()` | next.config.js `async headers()` — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy + sitemap Cache-Control | VERIFIED (only runs on SSR host) |
| `images` config present but inert | next.config.js:4-8 — `formats:['image/webp','image/avif']`, `remotePatterns:[]`. No `next/image` consumer exists, so this is dormant | VERIFIED |
| Build / start | package.json:6-8 — `build: next build`, `start: next start`, `dev: next dev`. Output `.next` | VERIFIED |
| No `vercel.json` / `vercel.ts` / `.vercel` | absent | VERIFIED |
| No CI/CD | `.github/workflows/` absent | VERIFIED |
| ISR signals | none. No `export const revalidate` / `export const dynamic`. Only `generateStaticParams()` in `app/blog/[slug]/page.tsx:24` and `app/service-area/[slug]/page.tsx:17` (build-time SSG of dynamic routes) | VERIFIED |

**Dead GitHub-Pages / static-export machinery still in repo (now inert under Vercel):**
- `/out/` — a committed static-export build artifact (contains `index.html`, `404.html`, `_redirects`, `.nojekyll`, `ads.txt`, `sitemap.xml`, etc., dated Jun 8). `VERIFIED`
- `public/CNAME` (`kaisrun.xyz`) — GitHub Pages custom-domain file. `VERIFIED`
- `public/.nojekyll` — GitHub Pages directive. `VERIFIED`
- `public/_redirects` — Cloudflare/Netlify-style redirect file. **Vercel does not process `public/_redirects`** — it is served as a static text file and does nothing. `VERIFIED`

---

## 2. HOW TO PUBLISH A NEW POST

`VERIFIED` against `lib/blog/posts.ts`, `app/blog/[slug]/page.tsx`, `components/blog/BlogPostWithAds.tsx`, `components/blog/blogMdxComponents.tsx`.

1. **Create the file** — `content/blog/<slug>.mdx`. The filename (minus `.mdx`) **is** the URL slug → `/blog/<slug>/`. Nothing else registers a post; `getPostSlugs()` reads the directory at build time (`lib/blog/posts.ts:55-63`).
2. **Front-matter** — parsed by a hand-rolled regex parser (`parseSimpleFrontmatter`, posts.ts:33-50), **not** `gray-matter` (not a dependency). It only understands flat `key: value` lines with optional quotes. Keys actually read (posts.ts:78-88):

   | Key | Required? | Notes |
   |---|---|---|
   | `title` | recommended | falls back to the slug if missing |
   | `description` | recommended | falls back to `''` |
   | `date` | recommended | `YYYY-MM-DD` string; drives sort order & sitemap-style ordering |
   | `dateModified` | optional | falls back to `date` |
   | `author` | optional | defaults to `Travis` |
   | `keywords` | optional | comma-separated → meta keywords; falls back to `DEFAULT_SITE_KEYWORDS` |
   | `image` | optional | OG/schema image only (absolute URL or site-relative `/images/...`); **not** an inline image |
   | `draft` | optional | `true`/`1`/`yes` → excluded from index, `generateStaticParams`, related, sitemap |

   No `related`, `tags`, `category`, or `slug` keys are read — don't bother adding them.
3. **Do any other files need editing?**
   - `lib/blog/posts.ts` → **NO.** It is a parser, not a registry. (This is the single biggest stale-doc trap — see §12.)
   - `public/sitemap.xml` → **YES, manual.** Sitemap is static (no `app/sitemap.ts`). Add a `<url><loc>https://kaisrun.xyz/blog/<slug>/</loc>…</url>` entry.
   - `public/llms.txt` → **Optional/manual.** Only a curated subset of posts is listed (4 of 13 today). Add a bullet under "Blog — Key Topics Covered" if you want AI-citation coverage.
   - Redirects/related arrays → none required.
4. **Related posts** — `getRelatedPosts(slug, 3)` (posts.ts:140-145) = all published posts except the current one, **sorted newest-first, sliced to 3**. Pure recency, **no semantic/topical matching**. Rendered by `BlogPostWithAds.tsx`.
5. **Rendering & usable MDX components** — body is rendered by `MDXRemote` from `next-mdx-remote/rsc` (`components/blog/BlogPostWithAds.tsx:31`) with the map in `components/blog/blogMdxComponents.tsx`. Usable inside an MDX body:
   - Markdown elements styled by the map: `h2 h3 h4 p ul ol li a strong em blockquote code pre hr`. Internal `/…` links auto-route through `next/link`; external links get `target=_blank rel=noopener`.
   - One custom component: `<SlatmillExplainer />`.
   - **No `img`/`figure`/`Callout`/`Image` override exists.** Raw `<img>` HTML in MDX will render but **unstyled and with no CLS-safe attributes** — see §5.
6. **Post-deploy (manual, per docs/skill):** ping IndexNow, e.g. `curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/blog/<slug>/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"`. `INFERRED` (key file exists at `public/kaisrun2026…txt`; not automated in code).

### True post inventory — `content/blog/` (15 files, 13 live + 2 draft)
| Front-matter `date` | draft | file |
|---|---|---|
| 2026-05-01 | — | welcome.mdx |
| 2026-05-08 | — | why-structured-runs-matter.mdx |
| 2026-05-15 | — | how-much-exercise-does-my-dog-need.mdx |
| 2026-05-20 | — | how-to-tire-out-a-high-energy-dog.mdx ⚠ see note |
| 2026-05-21 | — | dog-treadmill-vs-walk-comparison.mdx |
| 2026-05-22 | false | high-energy-dog-breeds-exercise-guide.mdx |
| 2026-05-22 | — | what-is-a-dog-slatmill.mdx |
| 2026-06-02 | — | too-hot-to-walk-your-dog.mdx |
| 2026-06-06 | — | dog-anxiety-destructive-behavior-exercise.mdx |
| 2026-06-08 | — | can-you-over-exercise-a-dog.mdx |
| 2026-06-09 | — | what-to-expect-first-slatmill-session.mdx |
| 2026-06-10 | — | calm-dog-during-fireworks.mdx |
| 2026-06-15 | — | is-my-dog-overweight.mdx |
| 2026-05-22 | **true** | _deprecated_slatmill-vs-long-walk.mdx |
| 2026-05-28 | **true** | _deprecated_high-energy-dog-breeds-need-more-than-a-walk.mdx |

⚠ **`how-to-tire-out-a-high-energy-dog`** has BOTH an `.mdx` file AND a hardcoded dedicated route (`app/blog/how-to-tire-out-a-high-energy-dog/page.tsx`). The dedicated route wins; the slug is excluded from `generateStaticParams` via the `DEDICATED_POST_SLUGS` set (`app/blog/[slug]/page.tsx:18`). The dedicated page builds its own `buildArticleSchema` + breadcrumb. `VERIFIED`

---

## 3. Canonical Host Map (www vs apex)

Everything emits **apex `https://kaisrun.xyz`**. There is no live www emission. `VERIFIED` (grep: 99 `https://kaisrun.xyz` hits; 2 `www.kaisrun.xyz` hits, both in `public/_redirects`).

| Location (file ~line) | Emits | Source of truth? |
|---|---|---|
| `metadataBase` — app/layout.tsx:14 | apex | ✔ inherited base for all relative metadata |
| OG `url` (site) — app/layout.tsx:31, og-image:35 | apex | — |
| Schema `@id` business — app/layout.tsx:64 `…/#business` | apex | ✔ |
| Schema `@id` website — app/layout.tsx:153 `…/#website` | apex | ✔ |
| Schema person — app/layout.tsx:139 `…/about/#travis` | apex | ✔ |
| Per-page `alternates.canonical` — app/page.tsx:37, about:10, services:17, pricing:17, faq:12, book:8, privacy:7, service-area/page:9 | apex | hardcoded per page |
| Service-area `[slug]` canonical + OG url — app/service-area/[slug]/page.tsx:30,41 | apex | built from `BASE_URL` const |
| Blog post canonical/OG — lib/blog/post-metadata.ts:6,26,34,39 | apex (`const BASE_URL`) | ✔ blog metadata source |
| Article schema `@id`/author/publisher — lib/blog/article-schema.ts:3,38-46 | apex | ✔ |
| Blog index schema — lib/blog/blog-index-schema.ts:4 | apex | ✔ |
| Blog listing metadata — lib/blog/blog-listing-metadata.ts:14,15 | apex | ✔ |
| Breadcrumb schema — lib/seo/breadcrumb-schema.ts:1 | apex | ✔ |
| Service-area schema — lib/seo/service-area-schema.ts:1 | apex | ✔ |
| FAQ data links — lib/faq-data.ts | apex | ✔ |
| Old-slug redirect pages — app/blog/slatmill-vs-long-walk/page.tsx:7,15 & …/high-energy-dog-breeds-need-more-than-a-walk/page.tsx | apex | — |
| robots Sitemap line — public/robots.txt | apex | ✔ |
| Sitemap `<loc>` — public/sitemap.xml | apex (all) | ✔ |
| llms.txt links — public/llms.txt | apex | ✔ |
| `public/CNAME` | apex (`kaisrun.xyz`) | GitHub Pages artifact (inert) |
| **`public/_redirects:4-5`** | **www → apex 301** | dead under Vercel (only www strings in repo) |

**To flip the whole site to www-canonical, you would edit ~20 files** (host is hardcoded as a per-file `const BASE_URL = 'https://kaisrun.xyz'` rather than a single shared constant — there is **no central host constant**): `app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`, `app/pricing/page.tsx`, `app/faq/page.tsx`, `app/book/page.tsx`, `app/privacy/page.tsx`, `app/service-area/page.tsx`, `app/service-area/[slug]/page.tsx`, `app/thank-you/ThankYouContent.tsx`, both `app/blog/<old-slug>/page.tsx` redirect pages, `lib/blog/post-metadata.ts`, `lib/blog/article-schema.ts`, `lib/blog/blog-index-schema.ts`, `lib/blog/blog-listing-metadata.ts`, `lib/seo/breadcrumb-schema.ts`, `lib/seo/service-area-schema.ts`, `lib/faq-data.ts`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`. **Recommendation for a future normalization pass: introduce one exported `SITE_URL` constant** and have every file import it, so host changes become a one-line edit. (Current state is already apex-consistent, so no flip is needed unless the www decision is revived.)

---

## 4. AdSense State

`VERIFIED` across app/layout.tsx, components/ui/AdUnit.tsx, components/ui/MidArticleAd.tsx, components/blog/BlogPostWithAds.tsx, public/ads.txt, app/privacy/page.tsx.

- **Loader script:** present **sitewide** in `<head>` — `app/layout.tsx:188-192` `<script async src="…adsbygoogle.js?client=ca-pub-5399156622542127" crossOrigin>`. Not scoped to blog.
- **Pub ID:** correct `ca-pub-5399156622542127` in layout:190 and `components/ui/AdUnit.tsx:38`. Stale `ca-pub-6289405922667797` = **fully absent** (grep clean). `ads.txt` = `google.com, pub-5399156622542127, DIRECT, f08c47fec0942fa0` ✔.
- **Verification meta tag:** **no** `<meta name="google-adsense-account">`. The client-param loader script is the verification mechanism instead. (A separate Google Search Console verification meta is present: layout.tsx:50-52.)
- **Ad units rendered:** **none today.** `components/blog/BlogPostWithAds.tsx:21-25` has both `<MidArticleAd slot="SLOT_ID_HERE"/>` and `<AdUnit slot="SLOT_ID_HERE" …/>` hard-disabled behind `{false && …}` with placeholder slot IDs. `AdUnit` (`<ins class="adsbygoogle">`) and `MidArticleAd` (portal-injects after the 2nd `<h2>`) both exist and are ready but dormant.
- **Consent:** **asymmetric / a compliance gap.** The ad **units** are consent-gated (AdUnit.tsx:13-23 / MidArticleAd via AdUnit — both require `localStorage 'cookie-consent' === 'accepted'`, mirroring GA4). **But the loader `<script>` in layout `<head>` is NOT gated** — it loads for every visitor regardless of consent, unlike GA4 (`GA4Script.tsx` gates) and unlike the units. For GDPR/AdSense-consent parity the loader should also be deferred until `cookie-consent-accepted`.
- **Privacy policy:** **AdSense-compliant.** `app/privacy/page.tsx:39-44` has a dedicated "Advertising" heading naming Google AdSense, third-party advertising cookies, DART-style personalized ads, and opt-out links (`google.com/settings/ads`, `aboutads.info/choices`, `policies.google.com/technologies/partner-sites`), plus "Ads appear on our blog content only."

**To show ads ONLY on blog post pages, the single cleanest insertion point is `components/blog/BlogPostWithAds.tsx`** (flip the two `{false && …}` guards to real slot IDs). This component renders exclusively inside `app/blog/[slug]/page.tsx`, so ads stay confined to posts. (For the standalone dedicated post, you'd also wire it into `app/blog/how-to-tire-out-a-high-energy-dog/page.tsx`, which does not use `BlogPostWithAds`.) **Do not move the loader script** — it can stay sitewide, but should be consent-gated.

---

## 5. Image Handling

`VERIFIED` (grep + next.config.js + public/images).

- **`next/image` is NOT used** anywhere — zero `<Image>` / `next/image` imports. All images are plain `<img>` (6 files: `components/sections/Hero.tsx`, `components/ui/SlatmillExplainer.tsx`, `components/layout/Navbar.tsx`, `components/sections/AboutSection.tsx`, `components/layout/Footer.tsx`, `app/about/AboutPageClient.tsx`×2). Matches the hard rule "plain `<img>` only."
- **Image config:** `next.config.js` declares `formats` + empty `remotePatterns`, but it is inert with no `next/image` consumer. No remote image host is whitelisted.
- **Location & convention:** `public/images/` with category subfolders — `about/`, `banners/`, `hero/`, `logos/`, `profile/`, `slatmill/`, plus root `og-image.png`. Logo referenced in schema as `/images/logos/kr-logo-1.webp`. WebP is the established format. `public/images/README.md` exists (naming guide — not opened).
- **Inline blog images:** there is **no MDX `img`/figure/`Image` component**, so an inline image must be raw `<img>` HTML inside the `.mdx` body, sourced from `public/images/…`. For zero-CLS it must carry explicit `width`/`height` (or an `aspect-[…]` wrapper), `loading="lazy"`, and `decoding="async"` **manually** — nothing enforces this today. **Recommendation (future):** add a styled `img`/`Figure` to `blogMdxComponents.tsx` that bakes in those attributes.

---

## 6. Redirects

`VERIFIED`.

- **No `redirects()` in `next.config.js`** and no `vercel.json`. The platform-level redirect mechanism is currently **unwired on Vercel**.
- **Old blog slug consolidation** is done with **client-side meta-refresh route pages**, NOT 301s:
  - `app/blog/slatmill-vs-long-walk/page.tsx` → `<meta httpEquiv="refresh" content="0;url=/blog/dog-treadmill-vs-walk-comparison/">`, `robots:{index:false,follow:false}`, canonical to the new slug.
  - `app/blog/high-energy-dog-breeds-need-more-than-a-walk/page.tsx` → same pattern → `/blog/high-energy-dog-breeds-exercise-guide/`.
  - These resolve (the routes exist) but emit a **soft 200 + meta-refresh**, not a server 301. The matching MDX files were retired as `_deprecated_*.mdx` with `draft:true`.
- **www → apex** lives only in `public/_redirects:4-5` (Cloudflare/Netlify syntax). **Vercel ignores this file** → www→apex 301 is effectively **not enforced by the app**. It must be handled at the Vercel domain config (redirect www to apex) or via `next.config.js redirects()`.

**Adding a new redirect requires editing** `next.config.js` (`async redirects()` — works on Vercel) **or** the Vercel project domain settings. The current meta-refresh-page pattern is the de-facto convention for old→new slug moves but is SEO-weaker than a real 301.

---

## 7. Theme & Design System

`VERIFIED` (app/globals.css, find components, grep framer-motion).

- **Tokens:** Tailwind v4, defined in CSS via `@theme` in `app/globals.css:3-13` (no `tailwind.config.*` file). Six brand colors confirmed: `--color-brand-black #0F1117`, `-charcoal #1A1F2E`, `-teal #0A5C52`, `-gold #C9963A`, `-offwhite #F0EDE6`, `-gray #9A9590`. Two fonts: `--font-display 'Bebas Neue'`, `--font-body 'DM Sans'`.
- **Font loading:** **non-blocking, correct.** `app/layout.tsx:167-179` does `preconnect` + `preload as=style` + an injected-`<link>` script that appends the Google Fonts stylesheet asynchronously. The only CSS `@import` is `@import "tailwindcss"` (globals.css:1) — **no render-blocking `@import` of Google Fonts.** ✔ matches the hard rule.
- **Global CSS extras:** `scroll-behavior:smooth` on `html`; Lenis support classes (`html.lenis`, `.lenis-smooth`, `[data-lenis-prevent]`); a `grain` keyframe + `.grain-overlay` SVG-noise effect; `.entity-statement` helper.
- **Animation convention:** **framer-motion v12** with the variants pattern — `initial="hidden"/animate="visible"` or `whileInView`, shared variants like `fadeUp` (see `components/sections/Hero.tsx:31-90`; variants likely centralized in `lib/variants.ts`). Smooth scroll via **`@studio-freight/lenis`** wrapped in `components/providers/LenisProvider.tsx` (mounted around `{children}` in layout). 22 components/pages use motion/Lenis.

**Component inventory** (`find components`):

- **`components/layout/`** — `Navbar.tsx`, `Footer.tsx`.
- **`components/providers/`** — `LenisProvider.tsx`.
- **`components/analytics/`** — `MicrosoftClarity.tsx`.
- **`components/blog/`** — `BlogPostWithAds.tsx` (post body + ads + related + author + CTA), `blogMdxComponents.tsx` (MDX element map).
- **`components/sections/`** (page-level) — `Hero`, `ProblemSection`, `SolutionSection`, `MobileAdvantage`, `ServicesOverview`, `FoundingOffer`, `FinalCTA`, `AboutSection`, `ContactFormSection`, `WaitlistForm`, `CityServiceAreaClient`, `SpotsCounter`.
- **`components/ui/`** (atomic / reusable building blocks) — `Button`, `FaqAccordion` (reusable for blog FAQs), `SlatmillExplainer` (also exposed to MDX), `SpotsCounter`, `ReadingProgressBar` (used on posts), `LeadMagnetForm` (lead magnet), `ExitIntentPopup`, `CookieConsent`, `GA4Script`, `AdUnit`, `MidArticleAd`.
- **Top-level** — `GoogleAds.tsx`, `DevTools.tsx`.

Reusable for new blog UI: `FaqAccordion`, `Button`, `ReadingProgressBar`, `SlatmillExplainer`, `LeadMagnetForm`, `SpotsCounter`.

---

## 8. Schema / SEO Helpers

`VERIFIED` (lib/blog/*, lib/seo/*, grep @type across app/lib/components).

- **Helper files:** `lib/blog/article-schema.ts` (BlogPosting), `lib/blog/blog-index-schema.ts` (Blog + ItemList graph), `lib/blog/blog-listing-metadata.ts`, `lib/blog/post-metadata.ts`, `lib/seo/breadcrumb-schema.ts` (BreadcrumbList), `lib/seo/service-area-schema.ts` (LocalBusiness), `lib/seo/defaults.ts` (keyword fallbacks), `lib/site-images.ts` (`OG_IMAGE_URL`).
- **Schema by page type:**
  - **Sitewide (layout)** — `AnimalService` LocalBusiness (`@id …/#business`, with `hasOfferCatalog` of 3 Offers + founder `Person`) and `WebSite` (`@id …/#website`). app/layout.tsx:61-157.
  - **Blog post** — `BlogPosting` (article-schema.ts) + `BreadcrumbList` (breadcrumb-schema.ts), injected in `app/blog/[slug]/page.tsx:58-67`; author = `Person @id …/about/#travis`, publisher ref `…/#business`.
  - **Blog index** — `Blog` + `ItemList` graph + nested `BlogPosting`/`Organization` (blog-index-schema.ts), in `app/blog/page.tsx`.
  - **Dedicated post** — `app/blog/how-to-tire-out-a-high-energy-dog/page.tsx` builds its own BlogPosting + breadcrumb.
  - **Service-area `[slug]`** — `LocalBusiness` child with `parentOrganization` ref (service-area-schema.ts), plus City/FAQ data from `lib/service-area/cities.ts`.
  - **FAQ surfaces** — `FAQPage`/`Question`/`Answer` in `app/faq/`, `app/pricing/PricingPageClient.tsx`, `components/ui/FaqAccordion.tsx`, and service-area pages.
  - **About / Services / Thank-you** — additional JSON-LD blocks present.
- **`@id` host:** all **apex**. `VERIFIED`.
- **`aggregateRating`:** **absent everywhere** ✔ (correct — no real reviews exist yet).
- ⚠ The sitewide `hasOfferCatalog` advertises **Intro Session $35 / Two-Dog $55 / Founding $200** (layout.tsx:104-135). Per `CLAUDE.md` the business is PRE-OPENING and only the Founding offer is meant to be public — the Intro Session offers in schema (and llms.txt) may contradict that policy. Recorded under Issues, not changed.

---

## 9. Analytics & Consent

`VERIFIED` (components/ui/CookieConsent.tsx, GA4Script.tsx, analytics/MicrosoftClarity.tsx, GoogleAds.tsx, DevTools.tsx, lib/googleAds.ts).

- **Consent gate:** `components/ui/CookieConsent.tsx` — banner shows when `localStorage 'cookie-consent'` is unset. Accept → sets `'accepted'` and **dispatches `window` event `'cookie-consent-accepted'`**. Decline → sets `'declined'`, fires no event. This event name is the gating signal across the app.
- **GA4:** `G-1P5ST40L2E`, hardcoded in `components/ui/GA4Script.tsx:5`. **Consent-gated** — renders nothing until `localStorage==='accepted'` or the `cookie-consent-accepted` event fires; then loads gtag via `next/script afterInteractive`.
- **Microsoft Clarity:** `wurwoh6v8a`, hardcoded in `components/analytics/MicrosoftClarity.tsx:3`. Loaded via `next/script afterInteractive` — **NOT consent-gated** (loads immediately). (`.env.local.example` advertises `NEXT_PUBLIC_CLARITY_ID` but the component ignores env and hardcodes the ID — mismatch.)
- **Google Ads (conversion gtag):** `components/GoogleAds.tsx`, mounted in layout `<head>` as `<GoogleAds conversionId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID} />`. Renders nothing unless the env var is set. Conversion logic + dev logging in `lib/googleAds.ts` (+ `lib/googleAds.test.ts`). Not consent-gated.
- **AdSense loader:** sitewide, **NOT consent-gated** (see §4).
- **DevTools:** `components/DevTools.tsx` rendered only in `NODE_ENV==='development'` (layout.tsx:204).
- **`NEXT_PUBLIC_*` env vars the app reads:** `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_SUBSCRIBE_URL`, `NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL`, `NEXT_PUBLIC_INTRO_SESSION_LABEL`, `NEXT_PUBLIC_MEMBERSHIP_LABEL`, `NEXT_PUBLIC_LEAD_CAPTURE_LABEL`. Declared-but-unused in code: `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_ADSENSE_PUB_ID` (both hardcoded instead). GA4 ID is hardcoded, not an env var.

---

## 10. Forms & Integrations

`VERIFIED` (components/ui/LeadMagnetForm.tsx, components/sections/ContactFormSection.tsx, WaitlistForm.tsx, lib/subscribe.ts, app/book/BookPageClient.tsx).

- **No `app/api/*` routes exist** — forms still post directly to Formspree + a Cloudflare Worker (the SSR-enabled stack has not been used to add API routes).
- **Formspree endpoints actually wired in source:**

  | Form (file) | Formspree endpoint | Mailchimp tag |
  |---|---|---|
  | Footer / waitlist — `components/sections/WaitlistForm.tsx:9` | `xykolrrr` | `footer-signup` |
  | Contact (default) — `components/sections/ContactFormSection.tsx:8` | `mvzllpwg` | `contact-inquiry`/`contact-form` |
  | Lead magnet (Energy Guide) — `components/ui/LeadMagnetForm.tsx:7` | `mpqbbwrl` | `energy-guide` |
  | Founding-20 | **NOT FOUND in source** | `founding-20` (dead code path) |

  ⚠ The docs/skill map Founding-20 → Formspree `mojrrvdd` via a "FoundingInlineForm" in `app/book/BookPageClient.tsx`. **Neither `mojrrvdd` nor a Formspree call exists in `BookPageClient.tsx`.** The string `mojrrvdd` appears **only** in `INTEGRATIONS.md` and the `kaisrun-context` skill. `ContactFormSection` does contain a `founding-20` branch (ContactFormSection.tsx:33-36) but **nothing instantiates it with that tag** and it has no `mojrrvdd` default — so the founding-20 Formspree path is currently **unwired**.
- **Booking / founding purchase:** uses a **Square Appointments widget**, DOM-injected (not `next/script`, not Formspree) — `app/book/BookPageClient.tsx:87-92` injects `https://square.site/appointments/buyer/widget/x06wxfzw47ogj7/LY4W4QTX4A1PF.js`, with Square-origin postMessage conversion tracking. This is the real founding-conversion mechanism today.
- **Mailchimp:** still the **Cloudflare Worker bridge** — `lib/subscribe.ts` POSTs JSON `{email,name,tags}` to `process.env.NEXT_PUBLIC_SUBSCRIBE_URL || 'https://kaisrun-subscribe.kaisrunmobile.workers.dev'` from the **client**. No direct Mailchimp API call. ✔
- **Spots counter data:** `public/data/config.json` → `foundingSpots {total:20, remaining:17, lastUpdated:2026-06-06}` (matches "17 spots remaining"); fetched client-side in `BookPageClient.tsx:21`.

---

## 11. Sitemap / robots / llms / IndexNow

`VERIFIED`.

- **Sitemap:** **static & manual** — `public/sitemap.xml` (no `app/sitemap.ts`). Currently lists `/blog/` + **13 live post slugs** (all present, including the four June posts and the consolidated `dog-treadmill-vs-walk-comparison` / `high-energy-dog-breeds-exercise-guide`). lastmod values are stale-ish (`2026-06-05` on many) but URLs are complete.
- **robots.txt:** `public/robots.txt` — `Allow: /`, `Disallow: /thank-you/`, `Disallow: /api/`. **`/book/` is NOT disallowed → indexable** ✔. Explicitly allows AI crawlers (GPTBot, Google-Extended, ClaudeBot, OAI-SearchBot, PerplexityBot, Amazonbot). `Sitemap: https://kaisrun.xyz/sitemap.xml` (apex).
- **llms.txt:** **static & manual** — `public/llms.txt`. Lists only **4** of 13 posts under "Blog — Key Topics Covered." Contains Intro Session pricing ($35/$55) — same pre-opening-policy caveat as §8. (Region phrase "Emerald Coast" appears — that is the geography, **not** the retired "Emerald Paws Athletic Club" brand; no banned-brand leakage found.)
- **IndexNow / verification key files in `public/`:** `kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n.txt` (IndexNow key, self-named content) **and** a second key `1ce502e4baf14d7698a2ca357863925d.txt`; plus `BingSiteAuth.xml`, `yandex_75311799be916255.html`, Google verification meta in layout. ✔
- **Auto-update on new post?** **No.** New posts require **manual** edits to `public/sitemap.xml` (required for indexing) and optionally `public/llms.txt`. **Recommendation (future):** migrate to a generated `app/sitemap.ts` driven by `getPublishedSlugs()` so the sitemap tracks `content/blog/` automatically.

---

## 12. Stale-Doc Reconciliation Table

Docs are known-stale; code is ground truth. One row per specific stale claim. (Not edited — this feeds a later doc-sync pass.)

| Doc (line) | Stale claim | Code reality |
|---|---|---|
| **AGENTS.md:10,34-36** | "Static export (`output:'export'`) · GitHub Pages", "Build output `/out`", "`images.unoptimized:true`" | Vercel SSR; no `output:'export'`; output `.next`; no `unoptimized` |
| AGENTS.md:38,163-165,177 | "API routes do not exist in production", "No server actions", "No custom HTTP headers (GitHub Pages)", "Adding next/image incompatible" | SSR supports all of these; `headers()` is active in next.config.js |
| AGENTS.md:128,147 | "Blog post data → `lib/blog/posts.ts`", "Entry in `lib/blog/posts.ts` with all metadata fields" | posts.ts is a filesystem **parser**; no manual entry — creating the `.mdx` is the whole step |
| AGENTS.md:73-74 | (addendum) "Vercel SSR is active… Cloudflare rules remain valid for apex→**www**" | Self-contradicts the doc's own top half; and canonical is **apex**, not www |
| **kaisrun-context skill (SKILL.md)** | "Hosting: GitHub Pages static export — `output:'export'`, no SSR, no API routes", "No `/api/*`", "No middleware redirects", "No Vercel" | All false now — Vercel SSR. Skill also lists Founding-20 → `mojrrvdd` (not in source) |
| **SEO-STATUS.md:5** | "All canonical, schema @id, OG url, sitemap normalized to **www** (Prompt 4)" | All emit **apex**; latest commit flipped www→apex |
| SEO-STATUS.md:4 | "GitHub Pages static export → Vercel SSR (migrated 2026-06-09)" | SSR half is right; "static export" no longer applies |
| **INTEGRATIONS.md:34** | "Founding 20 → `https://formspree.io/f/mojrrvdd` in `app/book/BookPageClient.tsx` (FoundingInlineForm)" | No `mojrrvdd`, no `FoundingInlineForm`, no Formspree call in BookPageClient; founding uses the **Square widget** |
| **CLAUDE.md:71** | "Tone: … em-dashes (—)" | Matches most content, but see voice note below — the recon brief's "spaced hyphens, never em dashes" rule is **not** what the docs or bulk content use |
| brand-reference.md:104-105 / AGENTS.md:94 | "Plain dashes (—) not hyphens", "No exclamation points in body copy" | Em-dash rule holds in older content; newest 2 posts use 0 em dashes (possible drift). No `!` found in sampled post bodies ✔ |
| `.env.local.example` / `components/GoogleAds.tsx` comments | "For GitHub Pages, set repository secret…", "safe for static export builds" | GitHub Pages no longer the host |
| README.md:3 | "Vercel SSR" | ✔ accurate (the freshest doc, along with DEPLOYMENT.md) |
| DEPLOYMENT.md:15,70,136 | "NO `output:'export'`", "filesystem auto-discovery — no manual entry", "output `.next`" | ✔ **accurate** — DEPLOYMENT.md and README.md are the trustworthy docs |

**Voice-rule note (evidence-based):** The recon brief asserts the convention is "spaced hyphens ( - ), never em dashes (—)." That contradicts **every** voice doc in the repo (CLAUDE.md, brand-reference.md, AGENTS.md all say em/plain dashes "—") **and** most content (`too-hot-to-walk-your-dog.mdx` = 19 em dashes; site copy/llms.txt use em dashes throughout). The two newest posts (`is-my-dog-overweight`, `can-you-over-exercise-a-dog`) contain **0** em dashes, hinting at a recent stylistic shift toward spaced hyphens — but that is not codified anywhere. **Conclusion: the codebase's actual/documented rule is em dashes; the "spaced hyphens" rule is unconfirmed by code.** Flagged for a human decision (below), not assumed.

---

## Issues Noticed (recorded, NOT fixed)

1. **AdSense loader not consent-gated** — `app/layout.tsx:188-192` loads `adsbygoogle.js` for all visitors regardless of cookie consent, while GA4 and the ad units are gated. GDPR/consent-parity gap.
2. **Pre-opening policy vs. published Intro pricing** — Intro Session $35/$55 Offers appear in `app/layout.tsx:104-124` schema and `public/llms.txt`, despite `CLAUDE.md` stating only the Founding offer should be public pre-launch.
3. **Founding-20 form unwired** — `INTEGRATIONS.md`/skill claim a `mojrrvdd` Formspree founding form; it does not exist in source. The `founding-20` branch in `ContactFormSection.tsx:33-36` is dead (never instantiated with that tag).
4. **Committed dead build artifact** — `/out/` (static-export output) is committed and stale; `public/_redirects`, `public/CNAME`, `public/.nojekyll` are GitHub-Pages relics inert on Vercel.
5. **www→apex 301 not enforced by the app** — only declared in the ignored `public/_redirects`; needs Vercel domain config or `next.config.js redirects()`.
6. **Old-slug redirects are meta-refresh, not 301** — `app/blog/slatmill-vs-long-walk/` and `…/high-energy-dog-breeds-need-more-than-a-walk/` use `<meta httpEquiv="refresh">` (soft, SEO-weaker) instead of server 301s now that SSR allows real redirects.
7. **Env vs. hardcode drift** — `NEXT_PUBLIC_CLARITY_ID` and `NEXT_PUBLIC_ADSENSE_PUB_ID` are documented in `.env.local.example` but ignored (IDs hardcoded in components); GA4 ID also hardcoded.
8. **No central host constant** — host is repeated as a per-file `const BASE_URL` in ~10 lib/app files, making any future host change error-prone.
9. **Two deprecated `.mdx` files retained** — `_deprecated_*.mdx` (draft:true) are correctly hidden but still produce candidate slugs if `draft` were ever removed.
10. **No `img` MDX component** — inline blog images have no CLS-safe defaults (§5).

---

## Open Questions / Human Decisions Needed

1. **Dash convention:** Is the rule em dashes (—) (per all repo docs + most content) or spaced hyphens (per the recon brief + the 2 newest posts)? The two disagree; pick one before the next content pass.
2. **Canonical host:** Confirm **apex** is the final decision (code + CLAUDE.md say apex; SEO-STATUS.md says www). If apex, fix SEO-STATUS.md and ensure Vercel enforces www→apex 301.
3. **AdSense go-live:** When slot IDs arrive, flip the two `{false && …}` guards in `BlogPostWithAds.tsx`; decide whether to consent-gate the loader script too.
4. **Pre-opening Intro pricing:** Should the $35/$55 Intro Offers be removed from layout schema + llms.txt until launch (per CLAUDE.md), or are they intentionally live?
5. **Cleanup:** Safe to delete `/out/`, `public/_redirects`, `public/CNAME`, `public/.nojekyll`? (They appear fully inert on Vercel — confirm before removing.)
6. **Sitemap/llms automation:** Adopt generated `app/sitemap.ts` + auto llms.txt, or keep manual?

---

## Appendix: Full File Tree (2 levels)

```
app/
  layout.tsx · page.tsx · globals.css
  about/        page.tsx · AboutPageClient.tsx
  blog/         layout.tsx · page.tsx · [slug]/page.tsx
                how-to-tire-out-a-high-energy-dog/page.tsx   (dedicated)
                slatmill-vs-long-walk/page.tsx               (meta-refresh redirect)
                high-energy-dog-breeds-need-more-than-a-walk/page.tsx (meta-refresh redirect)
  book/         page.tsx · BookPageClient.tsx · BookingContent.tsx
  faq/          page.tsx · FAQPageClient.tsx
  pricing/      page.tsx · PricingPageClient.tsx
  privacy/      page.tsx
  service-area/ page.tsx · ServiceAreaPageClient.tsx · [slug]/page.tsx
  services/     page.tsx · ServicesPageClient.tsx
  thank-you/    page.tsx · ThankYouContent.tsx · ThankYouConversionTracker.tsx
  (no app/api · no app/sitemap.ts · no app/robots.ts)

components/
  analytics/  MicrosoftClarity.tsx
  blog/       BlogPostWithAds.tsx · blogMdxComponents.tsx
  layout/     Navbar.tsx · Footer.tsx
  providers/  LenisProvider.tsx
  sections/   Hero · ProblemSection · SolutionSection · MobileAdvantage · ServicesOverview ·
              FoundingOffer · FinalCTA · AboutSection · ContactFormSection · WaitlistForm ·
              CityServiceAreaClient · SpotsCounter
  ui/         Button · FaqAccordion · SlatmillExplainer · SpotsCounter · ReadingProgressBar ·
              LeadMagnetForm · ExitIntentPopup · CookieConsent · GA4Script · AdUnit · MidArticleAd
  GoogleAds.tsx · DevTools.tsx

lib/
  blog/        posts.ts (parser) · article-schema.ts · blog-index-schema.ts ·
               blog-listing-metadata.ts · post-metadata.ts
  seo/         breadcrumb-schema.ts · service-area-schema.ts · defaults.ts
  service-area/ cities.ts
  bookIntent.ts · constants.ts · faq-data.ts · googleAds.ts · googleAds.test.ts ·
  site-images.ts · subscribe.ts · utils.ts · variants.ts

content/
  blog/        15 .mdx (13 live + 2 _deprecated_ draft) — see §2 inventory

public/
  sitemap.xml (static) · robots.txt · llms.txt · ads.txt · manifest.json
  CNAME · .nojekyll · _redirects            (dead GitHub-Pages/Cloudflare relics)
  kaisrun2026….txt · 1ce502e4….txt          (IndexNow keys)
  BingSiteAuth.xml · yandex_75311799….html  (search-engine verification)
  data/config.json (foundingSpots)
  images/ {about,banners,hero,logos,profile,slatmill}/ · og-image.png · README.md
  favicons/icons (favicon.ico, *-16/32, apple-touch, icon-192/512)

repo root (docs — stale unless noted): CLAUDE.md(auth.) · AGENTS.md(stale) ·
  DEPLOYMENT.md(accurate) · README.md(accurate) · INTEGRATIONS.md(stale) ·
  brand-reference.md · SEO-STATUS.md(stale) · docs/GOOGLE_ADS_SETUP.md
  config: next.config.js · package.json · .env.example · .env.local.example
  build artifact (dead): /out/
```

---
*End of map. No files other than `CODEBASE-MAP.md` were created or modified. No build was run (read-only recon).*
