# Action plan - 2026-10-02

Companion: [FULL-AUDIT-REPORT-2026-10-02.md](./FULL-AUDIT-REPORT-2026-10-02.md)

## Critical
None.

## High
- **H1 - FIXED (c1ead36).** Success message contrast on contact and footer signup forms. Changed `text-[#0A5C52]` to `text-brand-teal-light` in `components/sections/ContactFormSection.tsx` and `components/sections/WaitlistForm.tsx`.

## Medium (later session)
- **M1.** Trim meta descriptions to 160 characters or fewer. Pages: `/tools/` (230), `/blog/red-tide-dogs-emerald-coast/` (215), `/blog/is-a-slatmill-safe-for-dogs/` (194), `/tools/dog-beach-checker/` (190), `/book/` (177), `/tools/puppy-exercise-planner/` (175), `/equipment/` and equipment detail pages (164-174), `/blog/dog-lost-fitness-over-summer/` (182), several others over 160. Edit each page's `metadata.description` or blog frontmatter; not blog body prose.
- **M2.** Shorten titles to 65 characters or fewer, longest first: `/blog/too-hot-to-walk-your-dog/`, `/tools/dog-beach-checker/` (82), `/blog/dog-adolescence-phase/` (80), `/blog/is-a-slatmill-safe-for-dogs/` and `/tools/puppy-exercise-planner/` (79), `/blog/calm-dog-during-fireworks/` (77).
- **M3.** In `components/sections/Hero.tsx`, render the h1 without `initial="hidden"` (or SSR it visible and animate only transforms) so the text LCP does not wait on hydration. Re-measure with Lighthouse mobile.
- **M4.** In `app/api/heat/route.ts`, clamp `lat` to [-90, 90] and `lon` to [-180, 180] and return 400 outside that; consider Vercel rate limiting (config, owner decision).

## Low
- **L1.** `components/layout/Navbar.tsx` ~L69: copy `hamburgerRef.current` to a local variable inside the effect and use it in cleanup.
- **L2.** `components/ui/ExitIntentPopup.tsx`: give the close button `p-2` and `min-h-[44px] min-w-[44px]` before the popup is re-enabled (2026-12-11).
- **L3.** `components/VoteCta.tsx` ~L105: replace the em dash with a spaced hyphen.
- **L4.** `eslint.config.mjs`: turn off `@next/next/no-img-element` (plain `<img>` is project policy) to cut the 32 warnings to 2.
- **L5.** `app/sitemap.ts`: derive static lastmod from a single constant or file mtimes, or bump on real edits only.
- **L6.** Refresh the "Last updated" line in `INTEGRATIONS.md`.

## Owner concerns (no change made)
CN1 priceRange in root schema, CN2 default title/description and OG copy do not mention parked status, CN3 "within 24 hours" reply claim, CN4 "before booking" wording in contact intro, CN5 beach checker data accuracy. Details in the report.
