# Kai's Run — GSC Fix + Benefits Section Prompt Deck
**Generated:** 2026-07-04 | **Source:** GSC audit findings (2026-07-04) | **Target:** Cursor Pro

---

**Not a Cursor prompt** — Issue 3 needs no code change. Click "Validate Fix" in GSC now; live redirect is already clean.

---

## PROMPT 1 — Stop Google indexing the decorative video

**Model:** Composer 2.5
**Mode:** Agent
**Chat:** New chat
**Est. cost:** $0.02
**Expect on finish:** `public/robots.txt` gains a `Disallow: /videos/` rule; nothing else changes.

```
Open public/robots.txt and add a rule disallowing the /videos/ path — kai-loop.webm/mp4
is a decorative autoplay background loop with no transcript or dedicated watch page,
and Google is trying to index it as a video result. Blocking the directory tells
Googlebot to stop.

═══════════════════════════════════════════
GREP FIRST: cat public/robots.txt — show me the current rules before editing
SCOPE: public/robots.txt only
DO NOT TOUCH: the existing rule that keeps /book/ indexable — do not add any
  Disallow line for /book/, and do not touch the sitemap reference line
CONSTRAINTS: preserve exact existing formatting/casing style of the file
═══════════════════════════════════════════

Add:
Disallow: /videos/

Place it grouped with the other Disallow rules (not at the bottom after Sitemap:).
```

### VERIFY — Prompt 1
- [ ] Zero console / build errors
- [ ] `cat public/robots.txt` shows `Disallow: /videos/` present
- [ ] `Disallow: /book/` is NOT present anywhere in the file
- [ ] `Sitemap:` line still present and unchanged
- [ ] All pass → Prompt 2

---

## PROMPT 2 — Delete stale pre-Vercel hosting artifacts

**Model:** Composer 2.5
**Mode:** Agent
**Chat:** New chat
**Est. cost:** $0.02
**Expect on finish:** Two dead files removed; no behavior change (Vercel already ignores both).

```
Delete two leftover files from the pre-Vercel hosting setup (GitHub Pages / Netlify).
Neither is consumed by the current Vercel deployment — public/_redirects is
Netlify-syntax and served as an inert static text file; public/CNAME is a GitHub
Pages artifact. They've been flagged as confusing in three prior audit docs.

═══════════════════════════════════════════
GREP FIRST: cat public/_redirects and cat public/CNAME — confirm contents match
  "Netlify redirect syntax" and "a bare domain string" before deleting anything
SCOPE: public/_redirects, public/CNAME only
DO NOT TOUCH: public/sitemap.xml, public/robots.txt, public/data/config.json,
  public/llms.txt
CONSTRAINTS: no code changes beyond the two deletions
═══════════════════════════════════════════

rm public/_redirects
rm public/CNAME
```

### VERIFY — Prompt 2
- [ ] Zero console / build errors
- [ ] `ls public/_redirects public/CNAME` → both report "No such file"
- [ ] `npm run build` still exits 0
- [ ] All pass → Prompt 3

---

## PROMPT 3 — Remove hardcoded pre-opening pricing from service-area pages

**Model:** Composer 2.5
**Mode:** Agent
**Chat:** New chat
**Est. cost:** $0.05
**Expect on finish:** `$35`/`$55` no longer appear in `lib/service-area/cities.ts`; pricing is pulled from wherever the rest of the site sources it (single source of truth), not hardcoded a second time.

```
lib/service-area/cities.ts renders "$35" and "$55" intro-session pricing on all 12
city pages. CLAUDE.md's locked pricing rule says standard walk-up pricing is
"TBD — pricing announced after Founding closes" and must not be rendered site-wide.
Some other component on the site (likely FoundingOffer.tsx or SpotsCounter.tsx)
already displays pricing correctly per that rule — find it and reuse its copy/logic
instead of inventing a new number here.

═══════════════════════════════════════════
GREP FIRST:
  grep -n "\$35\|\$55" lib/service-area/cities.ts
  grep -rn "Founding Athlete\|pricing\|\$" components/sections/FoundingOffer.tsx
GREP CLAUDE.md FIRST for the exact locked pricing rule wording — quote it back
  before making any change.
SCOPE: lib/service-area/cities.ts only
DO NOT TOUCH: components/sections/FoundingOffer.tsx (read-only reference),
  any other pricing display elsewhere on the site
CONSTRAINTS: do not invent a dollar figure — either remove the sentence entirely
  or replace it with the same non-numeric Founding Athlete framing used elsewhere
  on the site
═══════════════════════════════════════════

Replace every "$35 for one dog" / "$55 for two dogs" instance in cities.ts with
whichever pattern FoundingOffer.tsx uses to describe pricing without a hardcoded
number. If no reusable pattern exists, delete the pricing sentence from the city
template entirely rather than guess a figure.
```

### VERIFY — Prompt 3
- [ ] Zero console / build errors
- [ ] `grep -rn "\$35\|\$55" lib/service-area/cities.ts` → no matches
- [ ] `npm run build` exits 0
- [ ] Spot-check one rendered city page in dev server — no invented price shown
- [ ] All pass → Prompt 4

---

## PROMPT 4 — Make related-posts selection category-aware, not just recency

**Model:** Composer 2.5
**Mode:** Agent
**Chat:** New chat
**Est. cost:** $0.08
**Expect on finish:** `getRelatedPosts()` in `lib/blog/posts.ts` weights same-category posts before falling back to recency, so older evergreen posts keep receiving internal links as new posts publish.

```
lib/blog/posts.ts:131-136 getRelatedPosts() is purely date-sorted:

export function getRelatedPosts(currentSlug: string, limit = 2): BlogPostMeta[] {
  return getAllPostMeta()
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

This causes older posts to drop out of every related-widget once 3 newer posts
publish, starving them of internal links (calm-dog-during-fireworks has only 3
inbound links vs 14-16 for others). components/blog/FieldNotesIndex.tsx:17-37
already has a CATEGORY_MAP this function ignores.

═══════════════════════════════════════════
GREP FIRST:
  sed -n '1,40p' components/blog/FieldNotesIndex.tsx   (read CATEGORY_MAP shape)
  sed -n '100,140p' lib/blog/posts.ts   (read current getRelatedPosts + its callers)
SCOPE: lib/blog/posts.ts only (import CATEGORY_MAP from FieldNotesIndex.tsx if it's
  exported; if not exported, export it there first — that's the only allowed edit
  outside posts.ts)
DO NOT TOUCH: getAllPostMeta(), BlogPostMeta type, any call site of getRelatedPosts
CONSTRAINTS: no new dependencies; keep the function signature identical
  (currentSlug, limit) so callers don't need changes
═══════════════════════════════════════════

Rewrite getRelatedPosts to:
1. Look up currentSlug's category via CATEGORY_MAP
2. Filter same-category posts first, sorted by date desc
3. If fewer than `limit` same-category matches, fill remaining slots with the
   next most-recent posts from other categories (current fallback behavior)
4. Never include currentSlug itself
```

### VERIFY — Prompt 4
- [ ] Zero console / build errors
- [ ] `npm run build` exits 0
- [ ] In dev server, open /blog/calm-dog-during-fireworks/ — related posts widget
      shows same-category posts first (not just the 2 newest overall)
- [ ] All 4 named blog posts in the audit still render without errors
- [ ] All pass → Prompt 5

---

## PROMPT 5 — De-templatize thin/duplicate service-area content

**Model:** Opus 4.8
**Mode:** Agent
**Chat:** New chat
**Est. cost:** $0.35
**Expect on finish:** Miramar Beach and Sandestin pages reach the same depth as the other 10 cities; the repeated closing-CTA paragraph is no longer verbatim-identical across all 12.

```
lib/service-area/cities.ts has two content problems flagged by GSC as
"discovered, not indexed":

1. Miramar Beach (190 words) and Sandestin (189 words) are roughly half the depth
   of the other 10 cities (~350-400 words each) — genuinely thin.
2. All 12 cities share a near-identical closing CTA paragraph (only the city name
   swapped), plus repeated boilerplate phrases: "Founding Athlete program" (11x),
   "climate-controlled" (9x), which reads as templated/doorway-page content to
   Google's duplicate-content detection.

Brand voice (from CLAUDE.md): short declarative sentences, plain dashes (—), no
exclamation points. Use: dog, high-drive dog, athlete, session, conditioning,
slatmill. Never: furry friend, pup, pooch, fur baby, cutesy language.

═══════════════════════════════════════════
GREP FIRST:
  sed -n '1,400p' lib/service-area/cities.ts  — read the full file, every city
    entry, before writing anything
  grep -n "Founding Athlete\|climate-controlled" lib/service-area/cities.ts
    — confirm the repeated phrases and their exact locations
SCOPE: lib/service-area/cities.ts only
DO NOT TOUCH: the component/template that renders this data
  (app/service-area/[slug]/), routing, metadata, or schema — only the content
  object's string values
CONSTRAINTS: keep each city entry the same shape/keys as the existing 10 —
  do not add new fields; do not remove factual local details already present
  in the well-developed cities (Destin, Fort Walton Beach, etc.)
═══════════════════════════════════════════

1. Expand Miramar Beach and Sandestin entries to ~350-400 words matching the
   depth/structure of Destin's entry, with genuinely distinct local framing for
   each (different opening hook, different closing paragraph — do not reuse
   Destin's or each other's sentences).
2. Rewrite the closing CTA paragraph for ALL 12 cities so no two are
   verbatim-identical — vary the sentence structure and local reference per
   city while keeping the same call-to-action intent. Vary "Founding Athlete
   program" and "climate-controlled" phrasing city-to-city (synonyms/rephrasing)
   so the repo-wide repeat count drops meaningfully.
```

### VERIFY — Prompt 5
- [ ] Zero console / build errors
- [ ] `npm run build` exits 0
- [ ] `wc -w` (or manual word count) on Miramar Beach + Sandestin entries ≥ 320 words each
- [ ] `grep -c "Founding Athlete program"` in cities.ts is lower than 11, and no
      two cities' closing paragraphs are byte-identical (diff two entries manually)
- [ ] All pass → Prompt 6

---

## PROMPT 6 — De-duplicate the SlatmillExplainer block across 4 pages

**Model:** Opus 4.8
**Mode:** Agent
**Chat:** New chat
**Est. cost:** $0.30
**Expect on finish:** The same explainer paragraph no longer renders verbatim on `/`, `/faq/`, `/services/`, and `/about/` — one canonical full version stays on `/faq/`, the other three get short unique teasers or a distinct angle.

```
components/ui/SlatmillExplainer.tsx (lines 54-66) is rendered verbatim on 4 URLs:
- / via components/sections/SolutionSection.tsx:63
- /faq/ via app/faq/FAQPageClient.tsx:47
- /services/ via app/services/ServicesPageClient.tsx:127
- /about/ via app/about/AboutPageClient.tsx:146

This duplicate body copy is why Google is folding /faq/ and /about/ into one
canonical instead of indexing them separately.

Brand voice: short declarative sentences, dashes (—), no exclamation points.
Vocabulary: dog, high-drive dog, athlete, session, conditioning, slatmill.
Never: furry friend, pup, pooch, fur baby.

═══════════════════════════════════════════
GREP FIRST:
  sed -n '1,80p' components/ui/SlatmillExplainer.tsx — read the actual current
    component (props, hardcoded copy, image, alt text) before changing anything
  sed -n '55,75p' components/sections/SolutionSection.tsx
  sed -n '40,55p' app/faq/FAQPageClient.tsx
  sed -n '120,135p' app/services/ServicesPageClient.tsx
  sed -n '140,155p' app/about/AboutPageClient.tsx
SCOPE: components/ui/SlatmillExplainer.tsx (add an optional `variant` or
  `children`/`body` prop if the component currently hardcodes its copy), plus
  the 4 call sites listed above
DO NOT TOUCH: the explainer's image, alt text, or any schema/JSON-LD
CONSTRAINTS: no new dependencies; if adding a prop, default it to the existing
  full-length copy so no call site breaks if left unspecified
═══════════════════════════════════════════

1. Make SlatmillExplainer accept a `body` (or `variant`) prop instead of
   hardcoding one paragraph, defaulting to the current full text.
2. /faq/ keeps the existing full paragraph unchanged (pass no prop, or the
   "full" variant) — this stays the one canonical in-depth explanation.
3. / (SolutionSection) — pass this short teaser:
   "A slatmill drives structured, low-impact conditioning most backyards can't
   replicate. See exactly how a session works." — link the sentence (or a
   "How it works" line beneath it) to /faq/.
4. /services/ — pass this short teaser:
   "Every session runs on a commercial slatmill — built for controlled pace,
   not backyard chaos." — link to /faq/ for the full breakdown.
5. /about/ — pass this story-angle replacement (not a teaser, a different
   angle entirely, since this page's context is Kai's own story):
   "Kai needed more than a backyard could give him — that's the slatmill's
   whole job. Structured pace, real output, every session."
```

### VERIFY — Prompt 6
- [ ] Zero console / build errors
- [ ] `npm run build` exits 0
- [ ] `grep -rn "See exactly how a session works\|built for controlled pace\|Kai needed more than a backyard" components/ app/` → 3 distinct hits, one per file, none identical to another
- [ ] `/faq/` page still shows the original full paragraph unchanged
- [ ] All pass → Prompt 7

---

## PROMPT 7 — Shorten the homepage About blurb so it teases, not restates

**Model:** Composer 2.5
**Mode:** Agent
**Chat:** New chat
**Est. cost:** $0.06
**Expect on finish:** `components/sections/AboutSection.tsx` no longer paraphrases `/about/`'s origin story — it teases with 2 sentences and links out.

```
components/sections/AboutSection.tsx:61-69 paraphrases the same origin-story
beats as app/about/AboutPageClient.tsx:107-140, including the shared tagline
"Built for Kai" — this overlap signals to Google that /about/ is just a
continuation of the homepage rather than a distinct page.

═══════════════════════════════════════════
GREP FIRST: sed -n '55,75p' components/sections/AboutSection.tsx — read the
  current paragraph before replacing it
SCOPE: components/sections/AboutSection.tsx only
DO NOT TOUCH: app/about/AboutPageClient.tsx (that page's content stays as-is —
  it's the canonical full story)
CONSTRAINTS: keep the existing link to /about/ if one exists; if not, add one
═══════════════════════════════════════════

Replace the paragraph block (lines 61-69) with:
"Kai's Run started with one high-drive dog and a driveway. Now Travis brings the
same structured conditioning to yours." followed by a link: "The full story →"
pointing to /about/.

Remove the "Built for Kai" tagline from this section if it currently appears here
— keep it only on the /about/ page.
```

### VERIFY — Prompt 7
- [ ] Zero console / build errors
- [ ] `npm run build` exits 0
- [ ] `grep -n "Built for Kai" components/sections/AboutSection.tsx` → no match
- [ ] Homepage About section links to /about/
- [ ] All pass → Prompt 8

---

## PROMPT 8 — New homepage Benefits section (icon-only, larger branded icons)

**Model:** Composer 2.5
**Mode:** Agent
**Chat:** New chat
**Est. cost:** $0.45
**Expect on finish:** New `BenefitsSection` component renders 6 category cards between Solution and Mobile Advantage on the homepage — larger custom line icons (48px, up from the site's existing 32px convention), alternating brand-teal/brand-gold badge chips, no photos.

```
Build a new homepage section: 6 benefit categories of slatmill conditioning,
icon-only cards (no photos). This is new content, not a copy of any competitor's
site — wording below is final, use it verbatim.

The site's existing icon convention (components/sections/MobileAdvantage.tsx) is
inline SVG, viewBox="0 0 24 24", stroke="currentColor", strokeWidth="1.5",
sized w-8 h-8 (32px). This section's icons should be LARGER than that baseline —
w-12 h-12 (48px) — since they're the visual anchor of the section, not a small
supporting bullet icon.

Brand tokens (from globals.css / tailwind config):
brand-black #0F1117, brand-charcoal #1A1F2E, brand-teal #0A5C52,
brand-gold #C9963A, brand-offwhite #F0EDE6, brand-gray #9A9590
Fonts: font-display (Bebas Neue) for headings, font-body (DM Sans) for copy.

═══════════════════════════════════════════
GREP FIRST:
  sed -n '1,50p' components/sections/MobileAdvantage.tsx — copy the exact icon/
    card markup pattern and Framer Motion fadeUp variant this site already uses
  sed -n '1,20p' app/page.tsx — confirm import/section order before wiring in
SCOPE: new file components/sections/BenefitsSection.tsx; edit app/page.tsx to
  import and place it
DO NOT TOUCH: next/image is banned repo-wide — use inline <svg> only, no <img>
  in this component; do not add any new npm dependency (no icon library)
CONSTRAINTS: Tailwind classes only, no inline style attributes except SVG path
  data; component must be a server component (no "use client" unless the
  existing Framer Motion pattern in MobileAdvantage.tsx requires it — match
  whatever that file does)
═══════════════════════════════════════════

Create components/sections/BenefitsSection.tsx with 6 cards in a responsive grid
(3 columns desktop, 2 tablet, 1 mobile — match MobileAdvantage's grid breakpoints).
Each card: icon badge (w-12 h-12 icon inside a rounded badge chip, alternating
brand-teal and brand-gold background at low opacity per card, icon itself
currentColor), heading (font-display), one-sentence body (font-body).

Card content, in this exact order:
1. Cardiovascular Conditioning — heartbeat/pulse-line icon — brand-teal badge
   "Builds heart and lung capacity — the engine under every high-drive dog's
   stamina."
2. Low-Impact Joint Conditioning — paw print over a soft wave/cushion line icon
   — brand-gold badge
   "Slatmill sessions load muscle, not joints — conditioning without the wear
   of pavement or repeated jumping."
3. Weight Management — a simple scale/balance icon — brand-teal badge
   "Consistent sessions burn real calories — a measurable tool against weight
   creep, not just exercise for exercise's sake."
4. Confidence & Impulse Control — a target/bullseye (concentric circles) icon
   — brand-gold badge
   "Structured movement teaches a dog to work through arousal instead of react
   to it — control that carries into daily life."
5. Behavioral Regulation — a half-full gauge/battery icon — brand-teal badge
   "A dog with drain has less left over for barking, destruction, or
   reactivity — the slatmill gives that drive somewhere to go."
6. Performance — a stopwatch icon — brand-gold badge
   "For sport and working dogs, targeted conditioning closes the gap between
   talent and output."

Section heading above the grid (font-display, brand-offwhite on brand-black bg
or match the section immediately before it): "What Structured Conditioning
Actually Does"

Wire into app/page.tsx: import BenefitsSection and place it immediately after
<SolutionSection /> and before <MobileAdvantage />.
```

### VERIFY — Prompt 8
- [ ] Zero console / build errors
- [ ] `npm run build` exits 0
- [ ] Dev server homepage shows the new section between Solution and Mobile
      Advantage, 6 cards, icons visibly larger than the 32px icons elsewhere
      on the page
- [ ] No `<img>` or `next/image` in the new file — `grep -n "next/image\|<img" components/sections/BenefitsSection.tsx` returns nothing
- [ ] Mobile viewport (375px) — cards stack to 1 column, no overflow
- [ ] All pass → Prompt 9

---

## PROMPT 9 — Build, verify, deploy

**Model:** Composer 2.5
**Mode:** Agent
**Chat:** New chat
**Est. cost:** $0.05
**Expect on finish:** Clean production build; changes pushed; Vercel auto-deploys.

```
Final build and deploy pass.

═══════════════════════════════════════════
SCOPE: full repo build check + git commit/push only — no code edits
═══════════════════════════════════════════

1. Run: npm run build — confirm exit code 0, no type errors, no warnings about
   the new BenefitsSection or edited files
2. Run: grep -rn "\$35\|\$55" lib/service-area/cities.ts — confirm still empty
3. Run: grep -n "Disallow: /videos/" public/robots.txt — confirm present
4. git add -A
5. git commit -m "fix: resolve GSC indexing issues (video schema, thin/duplicate
   content, stale redirect artifacts) + add homepage benefits section"
6. git push origin main
```

### VERIFY — Prompt 9
- [ ] `npm run build` exit code 0
- [ ] Git push succeeds, Vercel deployment triggers (check Vercel dashboard)
- [ ] Once live: re-run GSC "Validate Fix" on the "Page with redirect" report
- [ ] Once live: submit updated URLs (service-area pages, /faq/, /about/,
      /services/, /) via GSC URL Inspection → Request Indexing, or run the
      IndexNow curl command from CLAUDE.md per changed URL
- [ ] All pass → done

---

## Execution Summary

| Prompt | Model | Chat | Est. cost |
|--------|-------|------|-----------|
| 1. robots.txt /videos/ block | Composer 2.5 | New | $0.02 |
| 2. Delete stale artifacts | Composer 2.5 | New | $0.02 |
| 3. Strip hardcoded pricing | Composer 2.5 | New | $0.05 |
| 4. Category-aware related posts | Composer 2.5 | New | $0.08 |
| 5. De-templatize service-area content | Opus 4.8 | New | $0.35 |
| 6. De-duplicate SlatmillExplainer | Opus 4.8 | New | $0.30 |
| 7. Shorten About blurb | Composer 2.5 | New | $0.06 |
| 8. New Benefits section | Composer 2.5 | New | $0.45 |
| 9. Build + deploy | Composer 2.5 | New | $0.05 |
| **Total** | | | **$1.38** |

Skipped: rewriting all 12 service-area pages start-to-finish (only the 2 thin ones get full rewrites; the other 10 just lose their verbatim-shared sentences) — add if GSC still flags specific cities after revalidation.
