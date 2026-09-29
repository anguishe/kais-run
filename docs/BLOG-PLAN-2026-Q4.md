# Blog Plan - Q4 2026 through January 2027

Written 2026-09-28. Status: **plan + 5 drafts, nothing committed, nothing deployed.**

> **Update, later 2026-09-28 (Travis's decisions applied):** calendar is now 12/17 puppy, 1/5 leash, **1/14 muscle, 1/28 beach (gated on the Dog Beach Checker), 2/11 zoomies**. Every post now ends with a free-tool line then a launch-list line (no `/book/`); open questions 1-3 and 5 below are resolved. Current index and approvals: `docs/APPROVAL-PACKAGE-2026-09-28.md`.
Business context: the mobile slatmill trailer is not operational and has no ETA. Blog and tools exist for
traffic and the launch waitlist until it is. No copy should promise a session that cannot happen.

---

## 1. How scheduling works (verified in code)

The frontmatter `date` is the publish gate. There is no cron and no deploy on publish day, **but the
file must already be committed and deployed** - a post sitting uncommitted in a working tree never goes live.

| Piece | File:line | What it does |
|---|---|---|
| Gate | `lib/blog/posts.ts:57-64` | `isPublished()`: not a draft AND `date <= today` |
| "Today" | `lib/blog/posts.ts:45-47` | `todayISO()` = today in `America/Chicago`, string-compared to the date |
| Index + related | `lib/blog/posts.ts:136-146`, `:185` | `getPublishedSlugs()` / `getAllPostMeta()` / related posts filter on `isPublished` |
| Post route | `app/blog/[slug]/page.tsx:20` | `export const revalidate = 3600` (ISR, hourly) |
| Post route 404 | `app/blog/[slug]/page.tsx:23-25`, `:50` | unpublished post 404s in production, renders in `npm run dev` |
| Build-time params | `app/blog/[slug]/page.tsx:34-38` | only live slugs prerendered; future slugs render on demand once the date passes |
| Blog index | `app/blog/page.tsx:10` | `revalidate = 3600` |
| Sitemap | `app/sitemap.ts:9` | `revalidate = 3600`, reads the same gate via `getAllPostMeta()` |
| Checker | `scripts/check-blog-schedule.mjs` (`npm run check:schedule`) | prints LIVE / SCHEDULED, flags missing `CATEGORY_MAP` + `llms.txt` lines |

**Answer:** a future-dated post that is already deployed goes live by itself within about an hour after
midnight Central on its date (post, `/blog/`, and `/sitemap.xml`). It needs no redeploy. It does need a
commit + push to `main` at some point before that date. `public/llms.txt` is hand-maintained and is not
gated - add each post's line after it goes live (`check:schedule` prints it).

Side note: `npm run build` runs `postbuild` -> `scripts/ping-indexnow.mjs`, which only pings on a Vercel
production build (`VERCEL_ENV=production`). Local builds skip it (verified 2026-09-28).

---

## 2. Inventory (32 files in `content/blog/`, 2026-09-28)

24 live · 6 scheduled (committed) · 2 new drafts (uncommitted, this plan) · 0 `draft: true`.

| # | Date | Slug | Title | Status |
|---|---|---|---|---|
| 1 | 2026-05-08 | why-structured-runs-matter | Why Structured Runs Matter | live |
| 2 | 2026-05-15 | how-much-exercise-does-my-dog-need | How Much Exercise Does My Dog Really Need? | live |
| 3 | 2026-05-20 | how-to-tire-out-a-high-energy-dog | How to Tire Out a High-Energy Dog (Without Wrecking Your Schedule) | live (dedicated route) |
| 4 | 2026-05-21 | dog-treadmill-vs-walk-comparison | Slatmill vs. Walk: The Real Difference for High-Drive Dogs | live |
| 5 | 2026-05-22 | high-energy-dog-breeds-exercise-guide | The 7 Dog Breeds That Need More Than a Walk (And What Actually Works) | live |
| 6 | 2026-05-22 | what-is-a-dog-slatmill | What Is a Dog Slatmill? How It Works and Why It Beats a Motorized Treadmill | live |
| 7 | 2026-06-02 | too-hot-to-walk-your-dog | When It's Too Hot to Walk Your Dog (And the Energy Still Has to Go Somewhere) | live |
| 8 | 2026-06-06 | dog-anxiety-destructive-behavior-exercise | Your Dog Isn't Anxious. Your Dog Is Undertrained. | live |
| 9 | 2026-06-08 | can-you-over-exercise-a-dog | Can You Over-Exercise a Dog? How to Read the Limit | live |
| 10 | 2026-06-09 | what-to-expect-first-slatmill-session | What to Expect at Your First Dog Slatmill Session | live |
| 11 | 2026-06-10 | calm-dog-during-fireworks | You Can't Calm a Dog That's Already Wound Up: A Real Fireworks Plan | live |
| 12 | 2026-06-15 | is-my-dog-overweight | Is My Dog Overweight? You're Probably Looking at the Wrong Number | live |
| 13 | 2026-06-19 | dog-adolescence-phase | The Wheels Came Off Around Eight Months. That's Adolescence, Not a Bad Dog. | live |
| 14 | 2026-06-21 | meet-kai-the-dog-behind-kais-run | Meet Kai: The Dog That Proved High Drive Isn't a Behavior Problem | live |
| 15 | 2026-06-22 | senior-dog-exercise | Your Senior Dog Doesn't Need More Rest. It Needs to Keep Moving. | live |
| 16 | 2026-07-01 | dog-thunderstorm-anxiety | It Storms Every Afternoon Now, and the Dog Still Has to Move | live |
| 17 | 2026-07-03 | dog-reactive-on-leash | Your Dog Isn't Aggressive on the Leash. It's Overloaded. | live |
| 18 | 2026-07-05 | dog-park-not-tiring-dog-out | The Dog Park Isn't Tiring Your Dog Out. It's Winding It Up. | live |
| 19 | 2026-07-07 | why-we-record-every-session | You Shouldn't Have to Take My Word for It | live |
| 20 | 2026-07-10 | ronzeil-slatmill-build | How I Built the Ronzeil Slatmill (and Why Conditioning Needs One) | live |
| 21 | 2026-08-09 | is-a-slatmill-safe-for-dogs | Is a Slatmill Safe for Dogs? An Honest Answer From a Guy Who Runs One Every Day | live |
| 22 | 2026-08-09 | mobile-dog-gym-destin-fl | Looking for a Dog Gym in Destin? Ours Parks in Your Driveway. | live |
| 23 | 2026-09-03 | dog-lost-fitness-over-summer | Your Dog Didn't Get Lazy This Summer. It Got Out of Shape. | live |
| 24 | 2026-09-22 | red-tide-dogs-emerald-coast | Red Tide Closes the Beach to Your Dog. Nobody Posts a Sign. | live (not yet in `llms.txt`) |
| 25 | 2026-10-08 | mental-stimulation-vs-exercise-dog | Ten Minutes of Sniffing Does Not Equal an Hour Walk. Here Is What It Actually Does. | scheduled |
| 26 | 2026-10-22 | dog-halloween-door-safety | Your Doorbell Will Ring Forty Times on Halloween. That Is the Actual Problem. | scheduled |
| 27 | 2026-10-29 | dog-walk-dark-after-time-change | On November 2 the Sun Sets at 4:58. Your Evening Walk Just Disappeared. | scheduled |
| 28 | 2026-11-12 | can-my-dog-run-a-5k-with-me | Your Dog Can Probably Run a 5K. It Has Not Trained for One. | scheduled |
| 29 | 2026-11-24 | is-a-dog-treadmill-worth-it | Is a Dog Treadmill Worth It? Not Until You Can Answer Four Questions. | scheduled |
| 30 | 2026-12-10 | how-cold-is-too-cold-for-dogs | How Cold Is Too Cold for Your Dog? In Florida, the Thermometer Is the Least of It. | scheduled |
| 31 | 2026-12-17 | overtired-puppy-witching-hour | Your New Puppy Isn't Wild. It Hasn't Slept. | **DRAFT, uncommitted** |
| 32 | 2027-01-05 | why-does-my-dog-pull-on-the-leash | Your Dog Doesn't Pull Because It's Rude. You Walk at the Wrong Speed for It. | **DRAFT, uncommitted** |

Existing cadence: about every two weeks (Oct-Dec: 10/08, 10/22, 10/29, 11/12, 11/24, 12/10), tighter
around dated hooks. The calendar below keeps that rhythm.

---

## 3. Gap analysis

**Covered clusters (do not re-tread):** how much exercise / tiring out / high-energy breeds / structured
runs; slatmill (what it is, first session, safety, vs walk, worth buying, build); over-exercise; overweight;
senior; adolescence; anxiety + destruction; leash *reactivity*; dog park; mental stimulation; seasonal -
heat, fireworks, thunderstorms, summer detraining, red tide, Halloween door, time change, 5K, cold.
Tools cover puppy exercise amounts + the five-minute rule, body condition, heat, daily exercise.

**Open owner pain points, checked against search on 2026-09-28:**

| Pain point (owner phrasing) | Why now / evidence | Overlap check | Verdict |
|---|---|---|---|
| "why is my puppy so crazy at night" / "puppy witching hour" / "overtired puppy" | Holiday adoption push and Christmas puppies every December; rescues report post-holiday surrenders (WKYT, 2025-12-24; WECT, 2025-12-23). Heavy trainer content on the witching hour | No puppy *behavior* post. Puppy planner tool covers exercise amounts, not sleep | **Draft 1 (12/17)** |
| "why does my dog pull on the leash" / "harness vs collar" | January = Walk Your Dog Month; 2021 UQ/RSPCA Qld harness study; 2025 UBC review of restraint devices | `dog-reactive-on-leash` is threshold/arousal, not pulling. New angle = gait speed + reinforcement | **Draft 2 (1/5)** |
| "can I take my dog to the beach in Destin" / "dog friendly beaches Destin" | Snowbird + winter-visitor season; Okaloosa bans dogs on public beaches, Walton allows with a resident/owner permit in limited hours | Red tide post touches beaches, not access rules | Calendar 1/14 |
| "how to build muscle on a dog" / "dog losing muscle in back legs" | Year-round; rehab clinics publish heavily; strongest conditioning bridge | Senior + overweight mention muscle, none target building it | Calendar 1/28 |
| "why does my dog get zoomies at night" | Evergreen, broad | One passing mention only | Alternate |
| "exercise for a dog with hip dysplasia" | Evergreen, high intent | Vet-heavy; overlaps senior partly | Alternate (needs vet review) |
| "dog gained weight over the holidays" | Seasonal | Overlaps `is-my-dog-overweight` | Rejected |
| Holiday houseguests / door | Seasonal | Overlaps Halloween door post | Rejected |
| "puppy five minute rule" | Evergreen | Would cannibalize `/tools/puppy-exercise-planner/` | Rejected |

---

## 4. Calendar, 2026-12-10 through 2027-01-31

| Date | Slug | Title (working) | Target query | Intent | Internal links | Angle |
|---|---|---|---|---|---|---|
| 2026-12-10 (Thu) | how-cold-is-too-cold-for-dogs | already scheduled | how cold is too cold for dogs | informational/seasonal | - | already committed |
| **2026-12-17 (Thu)** | overtired-puppy-witching-hour | Your New Puppy Isn't Wild. It Hasn't Slept. | why is my puppy so crazy at night / overtired puppy | informational, problem-solving | meet-kai, mental-stimulation, puppy planner tool, adolescence, dog-park, anxiety, how-much-exercise, /pricing/ | The witching hour is missing sleep, not surplus energy; fetch makes it worse. DRAFTED |
| **2027-01-05 (Tue)** | why-does-my-dog-pull-on-the-leash | Your Dog Doesn't Pull Because It's Rude. You Walk at the Wrong Speed for It. | why does my dog pull on the leash / harness vs collar | informational + light commercial (harness) | reactive-on-leash, mental-stimulation, slatmill, treadmill-vs-walk, tire-out, exercise calculator, 5K, time change, Julius-K9 page, /pricing/ | A human walk sits between a dog's walk and trot, and every pull gets paid; split the walk from the outlet. DRAFTED |
| 2027-01-14 (Thu) | can-you-take-your-dog-to-the-beach-destin | Your Dog Can't Go on Most Destin Beaches. Here Is Where It Can Go. | are dogs allowed on Destin beaches / dog friendly beaches Destin | local informational | red-tide, too-hot, how-cold, mobile-dog-gym-destin-fl, dog-park, /service-area/destin/, /service-area/santa-rosa-beach/ | The local rules in one place for snowbirds and new residents (Okaloosa vs Walton), and why the beach was never the workout anyway. Verify every ordinance at the county source the week of drafting; no fee amounts in copy |
| 2027-01-28 (Thu) | how-to-build-muscle-on-a-dog | Walking Maintains Muscle. It Does Not Build It. | how to build muscle on a dog / dog losing muscle back legs | informational, conditioning core | senior, is-my-dog-overweight, BCS tool, is-a-slatmill-safe, can-you-over-exercise, what-is-a-dog-slatmill, ronzeil equipment page | Muscle comes from progressive load and recovery, not more miles; sudden hind-end loss is a vet visit first |
| Alternate | why-does-my-dog-get-zoomies | Zoomies Are Not a Personality. They Are a Release Valve. | why does my dog get zoomies at night | informational | puppy post, anxiety, tire-out, first-session | Nightly zoomies are pent-up arousal with nowhere to go; the timing tells you what the day was missing |
| Alternate | exercise-for-dogs-with-hip-dysplasia | - | exercise for dog with hip dysplasia | informational, medical-adjacent | senior, over-exercise, overweight, slatmill safety | Muscle protects joints; only with a vet plan - needs a vet read before publishing |

Cadence note: publishing faster will not move traffic while the site has 0 backlinks, an unverified GBP,
and weak Bing crawl trust. Two posts a month is enough; the leverage is in links and the GBP.

---

## 5. Drafts produced (uncommitted)

| File | Date | Body words (incl. FAQ) | Internal links |
|---|---|---|---|
| `content/blog/overtired-puppy-witching-hour.mdx` | 2026-12-17 | ~1,950 | 8 |
| `content/blog/why-does-my-dog-pull-on-the-leash.mdx` | 2027-01-05 | ~1,910 | 10 |

Also changed (uncommitted): `lib/blog/categories.ts` (2 `CATEGORY_MAP` entries, both `Behavior`),
`docs/PUBLISHING.md` (schedule rows + FB copy sections 9 and 10, marked DRAFT).
`npm run build` passes; `npm run check:schedule` lists both as SCHEDULED, "Schedule OK".

CTA choice: both drafts close on the **launch list** (the `LaunchWaitlist` block already rendered under
every post) plus the **Founding Athlete Program** by name, linked to `/pricing/`. Neither links `/book/` or
offers an intro session, because the trailer is not running.

Sources used (all paraphrased, attributed in-body):
- Kinsman et al. 2020, Dogs Trust Generation Pup + University of Bristol, *Animals* - owner-reported sleep 11.2 h at 16 weeks, 10.8 h at 12 months (pubmed 32664232)
- Kis et al. 2017, Hungarian researchers, *Scientific Reports* - sleep-dependent memory consolidation in dogs (srep41873)
- WKYT 2025-12-24 (post-Christmas surrenders); WECT 2025-12-23 and Albuquerque Journal (against surprise gift pets)
- Blaszczyk 2001, 22 dogs, unrestrained gait transitions (walk to about 0.93-1.21 m/s, mostly trotted)
- Shih et al. 2021, University of Queensland + RSPCA Queensland, *Frontiers in Veterinary Science*, 52 shelter dogs, collar vs back-clip harness
- Cavalli & Protopopova 2025, UBC Animal Welfare Program, *Animals* review of collars, harnesses, head collars

---

## 6. Asset templates (mirror these for every post)

| Asset | Template / generator | Live example | Staged for the 2 drafts |
|---|---|---|---|
| OG / social image (site) | `app/og/route.tsx` renders a branded card from the title; `lib/blog/post-metadata.ts:10-25` (`generatedOgUrl`, `resolvePostOgImage`) uses it when a post has no `image:` | every scheduled fall/winter post (no `image:` in frontmatter) - e.g. `/og/?title=...&eyebrow=Field%20Notes` | Nothing to stage - drafts omit `image:` like the other scheduled posts, so the route builds their cards |
| Site default OG | `scripts/generate-og.mjs` (`npm run generate:og`) -> `public/images/og-image.png` | `/images/og-image.png` | Not used for posts; not run (writes into the tracked repo) |
| Hero / in-post photos | `<Figure>` MDX component (`components/blog/blogMdxComponents`), images under `public/images/blog/<slug>/` | `meet-kai-the-dog-behind-kais-run.mdx` | None - scheduled posts ship without photos; optional add later |
| Schema | `lib/blog/article-schema.ts` (BlogPosting), `lib/seo/breadcrumb-schema` (BreadcrumbList), `lib/blog/faq-schema.ts` (FAQPage parsed from `## FAQ` + `**Question?**` lines) | any live post, e.g. `/blog/is-a-slatmill-safe-for-dogs/` | Inputs are in the MDX: frontmatter + `## FAQ` block with 5 bold questions each |
| FB companion copy | Copy of record `docs/PUBLISHING.md` (Travis hook, tension, "link in the first comment", Kai sign-off, 3 hashtags, apex URL in first comment) | sections 1-8 of that file | Sections 9-10 added (DRAFT) |
| FB card + POST.txt kit | `~/Projects/kais-run-dogust-2026/scripts/build_fieldnotes_card.sh <fb\|p45> "<series>" "<ogTitle>" kaisrun.xyz out.png` (fonts from `~/Projects/kais-run-tools-content/_brand/`) | `~/Projects/kais-run-assets/social-cards/blog-fb-fall-winter-2026/` (README + card-fb.png + card-4x5.png + POST.txt per post) | **Built** in `~/Projects/kais-run-assets/social-cards/blog-fb-winter-2026-27/` (not a git repo): `09-12-17-overtired-puppy-witching-hour/`, `10-01-05-why-does-my-dog-pull-on-the-leash/`, each with card-fb.png, card-4x5.png, POST.txt, plus README.txt |
| Tool social kits (reference only) | `~/Projects/kais-run-tools-content/scripts/` (build_social_card.sh, build_carousels.sh, build_tool_short.sh ...) | `~/Projects/kais-run-tools-content/assets/<tool>/` | Not needed for blog posts |

---

## 7. Ship checklist (for Travis, when approved)

1. Read both drafts. Confirm the Kai details flagged below.
2. `npm run build` + `npm run check:schedule`, then commit the two MDX files, `lib/blog/categories.ts`,
   `docs/PUBLISHING.md`, and this plan; push `main`. Must happen before 2026-12-17.
3. On each publish day: FB post with the staged card, URL in the first comment within about a minute.
4. That week: paste the `llms.txt` line `check:schedule` prints, IndexNow, GSC URL inspection.

## 8. Open questions / blockers

1. **Every scheduled post (10/08 to 12/10) and the live red tide post CTA to `/book/` and an "intro session."**
   The trailer is parked. Decide before 10/08 whether to swap those closers to the launch-list wording used in
   the two drafts. The author box in `components/blog/BlogPostBody.tsx` also says Travis "personally runs every
   Kai's Run session" in driveways, which reads as current.
2. **Facts to confirm with Travis:** (a) puppy post says some of Kai's always-on first year was overtiredness,
   which interprets the story in `meet-kai`; (b) leash post says Kai trots, not walks, on a long open stretch;
   (c) leash post says Travis uses the Julius-K9 back-clip harness for conditioning work.
3. **Skill conflicts:** `kaisrun-blog-post` says canonical URLs are `www`; the repo `CLAUDE.md` says apex
   (followed apex). `kaisrun-context` said "Plain dashes" with an em dash; brand rules ban em dashes (followed spaced hyphens).
   Worth fixing both skills.
4. The study name "Generation Pup" contains a banned word as a proper noun. Kept, since it is the study's name.
5. `public/llms.txt` is missing `red-tide-dogs-emerald-coast` (live since 9/22).
6. 1/14 beach post: confirm the Okaloosa and Walton rules at the county sources before drafting. Walton's dog
   permit is for residents and property owners, so the snowbird angle needs care.
