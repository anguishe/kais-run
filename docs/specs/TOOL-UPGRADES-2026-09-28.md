# Kai's Run - Free Tool Upgrades

**Date:** 2026-09-28 · **Type:** spec only (no code was changed, nothing deployed)
**Scope:** the four live tools (`too-hot-to-walk`, `dog-exercise-calculator`, `dog-body-condition-score`, `puppy-exercise-planner`) plus the planned Emerald Coast Dog Beach Checker (`/tools/dog-beach-checker/`, full build spec in `docs/specs/DOG-BEACH-CHECKER-SPEC.md`).

The site is parked as a service business, so the tools now have one job: earn traffic and referring domains for a zero-backlink domain. This doc names the current incumbents in each niche, what they miss, and 2-3 features per tool that would make ours the best result for its query. Features are ranked in one table by impact against effort. Monetization notes at the end of each section are **future only**: CLAUDE.md says the site serves no display ads, and nothing below goes live without Travis saying so. No price appears in any copy suggestion.

**What already exists (do not rebuild):**
- All four tools render `?embed=1` and all four show `components/tools/EmbedThisTool.tsx` (snippet with a followed credit link outside the iframe, `EMBED_CHROME_CSS` hides nav/footer/cookie banner). `next.config.js:61-65` sends `frame-ancestors *` for `/tools`.
- Copy result: heat (`HeatChecker.tsx:214`), exercise (`Calculator.tsx:158`), puppy (`PuppyPlanner.tsx:47`). Print: exercise only (`Calculator.tsx`, `window.print()`).
- BCS keeps a local 12-entry trend log (`lib/bcs/history.ts`).
- The night-pavement bug from the 9/16 audit is fixed: `lib/heat/verdict.ts` now uses `SUN_HOURS` [9, 20) to switch the +50F sun delta to the +12F shade delta.
- Still open from the audit: every tool route is dynamic because `page.tsx` awaits `searchParams` just to read `embed`, so nothing is edge-cached.

**Score = impact x (6 - effort).** Impact and effort are 1-5; effort 5 = hardest. Max score 25.

---

## Ranked feature table

| Rank | Tool | Feature | Why it beats incumbents | Impact | Effort | Score | Files touched |
|---|---|---|---|---|---|---|---|
| 1 | All four | Static embed routes with host presets (`/tools/<tool>/embed/?zip=` etc.) plus a one-click copy button | No incumbent (2Hot4Paws, Paw Safety Check, APOP, Sniffspot) offers an embed at all; a Niceville vet can embed the heat tool preset to its own ZIP. Also makes the canonical pages static and cacheable | 5 | 2 | 20 | `app/tools/*/page.tsx`, new `app/tools/*/embed/page.tsx`, `components/tools/EmbedThisTool.tsx`, `app/robots.ts` or meta noindex |
| 2 | Beach | Crawlable rules matrix with official source and `verifiedOn` per spot, plus a public change log | Dogster, 30a.com, Destin Dreamers and BringFido are single-county, undated or unsourced; the matrix is what AI answers cite when blogs conflict | 5 | 2 | 20 | new `lib/beach/rules.ts`, `app/tools/dog-beach-checker/page.tsx` |
| 3 | Beach | Rental-host kit: printable guest card with QR and a spot-preset embed | Rental managers (ECVR, Benchmark 30A, Destin Dreamers) already publish thin dog-beach posts; a better asset they can hand guests earns the link | 4 | 2 | 16 | `app/tools/dog-beach-checker/*`, `EmbedThisTool.tsx`, print CSS in `app/globals.css` |
| 4 | Heat | 48-hour walk windows (today + tomorrow) and a shareable result URL | weather.com's new scale and Paw Safety Check are generic; ours is the only one tied to Gulf Coast cities, a dog profile, and a link someone can text to a spouse | 4 | 2 | 16 | `app/api/heat/route.ts`, `lib/heat/verdict.ts`, `HeatChecker.tsx`, `scripts/check-tools.mjs` |
| 5 | Puppy | "Is this OK for my puppy?" activity lookup (stairs, fetch, running, swimming, beach sand, agility) | Static charts (puppyweightcalculator.net, PDSA) answer only minutes; long-tail "can my 5 month old go running" queries get no direct answer | 4 | 2 | 16 | `lib/puppy/growth.ts`, `PuppyPlanner.tsx`, `app/tools/puppy-exercise-planner/page.tsx` (FAQ schema) |
| 6 | BCS | Target weight range from current weight + score | APOP is a static chart; Paws & Pounds does not use weight; Purina's 3D tool is vet-facing. A range with a vet caveat is the next question every owner asks | 4 | 2 | 16 | new `lib/bcs/target.ts`, `BodyConditionChecker.tsx`, `scripts/check-tools.mjs` |
| 7 | Exercise | 7-day plan with print layout and `.ics` download | Sniffspot, dogscalculator.com, Barkercise and SpotOn stop at one daily number | 4 | 2 | 16 | new `lib/exercise/plan.ts`, `Calculator.tsx` |
| 8 | Puppy | Month-by-month timeline to growth-plate clearance, printable fridge chart and `.ics` milestones | Every incumbent is a single table; none tells an owner "your dog is cleared in about N months, here is each step" | 4 | 2 | 16 | `lib/puppy/growth.ts` (uses `monthsToCleared`), `PuppyPlanner.tsx` |
| 9 | Beach | "Next legal window" countdown and nearest legal alternative with drive time | No incumbent computes time-of-day legality or routes a Destin visitor to Pensacola Beach or the PCB dog beach | 5 | 3 | 15 | `lib/beach/verdict.ts` (new), checker client component |
| 10 | Heat | Radiation-based pavement model plus surface picker (asphalt, concrete, sand, grass) | Replaces the fixed 9-20 `SUN_HOURS` clock with cloud cover and solar radiation; 2Hot4Paws lists surfaces but only as static text | 4 | 3 | 12 | `app/api/heat/route.ts`, `lib/heat/verdict.ts`, `HeatChecker.tsx`, `scripts/check-tools.mjs` |
| 11 | Heat | Printable "Summer walk card" for clinics and groomers (air vs pavement chart plus QR) | A physical asset for front desks is a reason for a local business to link and mention; no incumbent offers one | 3 | 2 | 12 | new `app/tools/too-hot-to-walk/card/page.tsx`, print CSS |
| 12 | Exercise | Shareable state URL and a larger breed list (about 40 to 120+) | Calculator farms win on breed coverage; a prefilled URL lets trainers send a client their exact result | 3 | 2 | 12 | `lib/exercise/targets.ts`, `Calculator.tsx` |
| 13 | BCS | Inline SVG silhouettes (top and side) for every answer | Purina, APOP and Paws & Pounds all show images; ours is text-only, which is the biggest gap in the tool | 4 | 3 | 12 | new `components/tools/BcsSilhouette.tsx`, `BodyConditionChecker.tsx` |
| 14 | BCS | Vet-ready printable summary with the trend log and a monthly re-check `.ics` | Paws & Pounds pushes an app for this; ours works with no account and nothing leaves the device | 3 | 2 | 12 | `BodyConditionChecker.tsx`, `lib/bcs/history.ts` (read only via existing exports) |
| 15 | Exercise | Heat-aware "when to do today's structured minutes" for Gulf ZIPs | No exercise calculator knows the weather; this joins our two tools into one answer | 3 | 3 | 9 | `Calculator.tsx`, reuse `/api/heat` and `lib/heat/verdict.ts` |
| 16 | Puppy | Breed picker mapped to size class, one shared puppy model, and handoff to the calculator at clearance | Fixes the site's own contradiction (audit: `compute.ts` vs `growth.ts`) and removes the "which size is my dog" guess | 3 | 3 | 9 | `lib/puppy/growth.ts`, `lib/exercise/compute.ts`, `PuppyPlanner.tsx` |

Suggested order: ship rank 1 first (it touches all four tools and fixes caching), then ranks 2, 3 and 9 with the beach checker launch, then the 16-score items in any order.

---

## 1. Too Hot to Walk (`/tools/too-hot-to-walk/`)

**Incumbents:**
- weather.com dog-walking heat scale (launched 2026-07-30) - hourly, location from the site's picker, max pavement surface temperature. No dog profile, no shade/surface split, one national scale. https://weather.com/2026/07/30/pets/dog-walking-scale-heat-wave-hot-weather
- Paw Safety Check - personalised verdict (size, age, coat, flat face, health), hourly safe windows, local-only profile. Generic global tool, no local context, no embed. https://pawsafetycheck.com/
- 2Hot4Paws - city/ZIP lookup, static hourly snapshots, surface comparison table, Amazon affiliate for boots and wax. No breed modifiers, no embed. https://www.2hot4paws.com/asphalt-temperature-chart
- Get Your Pet Active - air temp + UV + sky to a surface estimate; heavy display ads (300x600, 728x90). No hourly, no surfaces. https://getyourpetactive.com/pavement-temperature
- Apps: PawCast, Weather Pet, HotPaws. Require install; not linkable.

**Gaps they leave:** nobody is embeddable, nobody plans tomorrow for a specific Gulf Coast town, and nobody gives a local business something to put on a wall. Ours already has modifiers, a sourced pavement model and an hourly strip, so the gap is distribution and planning, not core math.

**Features:**
- **48-hour windows + shareable URL (rank 4).** Set `forecast_days=2` in `fromOpenMeteo` (`app/api/heat/route.ts`) and label the second day "Tomorrow" in `HourStrip`. Serialize `zip` and modifier flags into the query string (`?zip=32541&m=bs`) and read them on mount in `HeatChecker.tsx`, so a shared link reruns the check. The OpenWeather branch returns 3-hour steps under an hourly label (audit finding); either stop preferring OWM for the forecast or relabel it. Extend `scripts/check-tools.mjs` with a humid 78F night fixture so the fixed night bug stays fixed.
- **Radiation-based pavement + surface picker (rank 10).** Open-Meteo exposes hourly `shortwave_radiation` and `cloud_cover`. Scale the sun delta by radiation instead of the fixed `SUN_HOURS` clock in `lib/heat/verdict.ts`, keep Berens as the full-sun anchor, and add surface deltas (asphalt, concrete, sand, grass) with one cited source each. Sand matters because the beach checker will link here.
- **Printable Summer walk card (rank 11).** A print-only route with the air-vs-pavement band table, the 7-second hand test and a QR to the tool. Pitch it with the embed to vets and groomers in `docs/BACKLINK-PLAN.md`.

**Future monetization hooks (gated on Travis):**
- Ad slot: below the `HourStrip` and the Copy button, or in a right rail on desktop. Never inside the verdict card, never in the embed.
- Affiliate-safe spots: a "Gear for hot days" row under the strip (booties, cooling vest, collapsible bowl) via `components/ui/AffiliateLink.tsx`; requires `NEXT_PUBLIC_AMAZON_TAG` set in Vercel. On a Dangerous or Do-not-walk verdict, the existing "climate-controlled session" line can point to `/equipment/ronzeil-slatmill/` as well as `/book/`.
- Sponsor: "Summer walk card presented by [local vet]" on the printable card only.

---

## 2. Dog Exercise Calculator (`/tools/dog-exercise-calculator/`)

**Incumbents:**
- Sniffspot calculator article - breed, age, health, lifestyle to a daily recommendation; every CTA sells Sniffspot bookings. No weekly plan, no export. https://www.sniffspot.com/blog/dog-exercise/dog-exercise-calculator-how-much-exercise-does-your-dog-need
- Calculator farms: dogscalculator.com, dogscalculators.com, calculatorsfordogs.com, worldanimalfoundation.org, Barkercise. One number, thin method, ads. https://www.dogscalculator.com/calculators/exercise
- Brand pages: SpotOn (fence brand) and Homes Alive, GoodRx editorial. https://spotonfence.com/pages/how-much-exercise-does-my-dog-need

**Gaps:** a single daily number with no split, no week, no weather. Ours already gives a structured/play/enrichment split and a gap vs current minutes; what is missing is something an owner keeps.

**Features:**
- **7-day plan with print + `.ics` (rank 7).** New `lib/exercise/plan.ts` turns `ComputeResult.split` and `weeklyShape` into seven rows (structured, play, enrichment, rest day). Render under the result in `Calculator.tsx`, reuse the existing print button with a print stylesheet, and add a client-side `.ics` blob (no server) with a daily reminder. Keep the file dependency-free so `scripts/check-tools.mjs` can test it.
- **Shareable state URL + bigger breed list (rank 12).** Encode inputs as `?b=&a=&w=&act=&f=` and hydrate on mount. Grow `BREEDS` in `lib/exercise/targets.ts` toward 120 using the same four tiers; each addition needs a tier and, for flat-faced breeds, an entry in `BRACHY_BREEDS`.
- **Heat-aware timing (rank 15).** Optional ZIP field; fetch `/api/heat` and use `safeWindows()` to say "do the structured block before 8 AM today". No incumbent calculator knows the weather.

**Future monetization hooks:**
- Ad slot: below the weekly plan, never between the daily number and the split.
- Affiliate-safe spots: `walk-wont-cover-this` results already link `/equipment/ronzeil-slatmill/`; keep that as the primary spot. Harness via `/equipment/julius-k9-idc-powerharness/`; puzzle feeders in the enrichment row.
- Sponsor: a local trainer "plan reviewed by" line on the printable plan.

---

## 3. Dog Body Condition Score (`/tools/dog-body-condition-score/`)

**Incumbents:**
- Purina Institute 3D BCS tool - rotatable 3D models, vet-facing. https://www.purinainstitute.com/centresquare/nutritional-and-clinical-assessment/3d-body-condition-score-tool
- APOP (petobesityprevention.org) - static 1-9 chart, PDF, body fat ranges; nonprofit; separate disconnected calculators. https://www.petobesityprevention.org/dogbcs
- WSAVA / AAHA 9-point PDF. https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2021-nutrition-and-weight-management/resourcepdfs/nutritiongl_bcs.pdf
- Paws & Pounds - slider plus three-step check, silhouettes, pushes an app for tracking. https://pawsandpounds.com/tools/dog-body-condition-score
- PetMD and VCA guides.

**Gaps:** images everywhere except ours; nobody converts a score plus a scale reading into a target weight range; tracking lives behind apps. Ours already has a hands-on quiz and a local trend log.

**Features:**
- **Target weight range (rank 6).** Optional current-weight input. Each point above 5 is roughly 10 percent excess weight (the relationship used in WSAVA/AAHA guidance; cite it on page), so `lib/bcs/target.ts` returns a range, never a single number, with the existing vet-humility line. Underweight results show no target, only the vet referral already in `BAND_PLAN`. Test it in `scripts/check-tools.mjs`.
- **SVG silhouettes (rank 13).** One small inline SVG per answer option (top view for the waist question, side view for the profile question) in a new `components/tools/BcsSilhouette.tsx`. Plain inline SVG, no `next/image`.
- **Vet-ready printable summary + monthly reminder (rank 14).** Print view with score, band, trend from `summarize()`, and the date; an `.ics` for a monthly re-check. Nothing leaves the device, which is a real differentiator against app-gated tracking.

Also fix the audit's label issue ("Obese (8-9)" while 7.5 already maps to obese) in the same pass.

**Future monetization hooks:**
- Ad slot: below the plan paragraph, never on an Obese or Underweight verdict card.
- Affiliate-safe spots: a pet scale and a soft measuring tape in the "track it" row; the slatmill link belongs on Slightly over and Overweight plans only.
- Sponsor: local vet "free weigh-in" line on the printable summary.

---

## 4. Puppy Exercise Planner (`/tools/puppy-exercise-planner/`)

**Incumbents:**
- puppyweightcalculator.net age-by-size chart - static table, cites Salt et al. 2017. https://puppyweightcalculator.net/blog/puppy-exercise-by-age-chart/
- PDSA and Vet Voices - UK advice pages questioning the 5-minute rule. https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/puppies-dogs/exercising-your-puppy · https://www.vetvoices.co.uk/post/puppy-exercise-5-minuets-per-month-of-life
- Canine Health & Rehabilitation growth-plate post. https://www.caninehealthandrehabilitation.com/blog/puppies-exercise-and-growth-plates
- Calculator farms: calculatorsfordogs.com, pawcalculator.com walking calculator, dogscalculators.com. https://www.calculatorsfordogs.com/age-life-stage-calculators/exercise-requirements-calculator

**Gaps:** all give minutes; none answers "is this specific activity OK", none gives a dated path to clearance. Ours already separates forced work from free play and cites Krontveit 2012, which is a better model than any of them.

**Features:**
- **Activity lookup (rank 5).** Add an `ACTIVITIES` table to `lib/puppy/growth.ts` (stairs, fetch, jogging, swimming, beach sand, agility jumps, tug, hikes) with a verdict per stage. Render as chips under the plan in `PuppyPlanner.tsx`, and mirror the top questions as FAQ items in `page.tsx` so the page answers long-tail queries in plain HTML.
- **Month-by-month timeline (rank 8).** Use `monthsToCleared` and `closureMonths` to render one row per month to clearance; print stylesheet for a fridge chart; `.ics` milestones ("plates-closing window starts").
- **Breed picker + one model + handoff (rank 16).** Map a breed list to `SizeClass` (reuse names from `lib/exercise/targets.ts`), make `lib/exercise/compute.ts` call the growth module for under-12-month dogs so the site gives one answer, and at plates-closed deep-link to the calculator with the prefilled URL from rank 12.

**Future monetization hooks:**
- Ad slot: below the timeline, never beside the red list.
- Affiliate-safe spots: puppy harness and sniff mat in the green-activities row.
- Sponsor: local puppy class or vet "presented by" on the printable timeline.

---

## 5. Emerald Coast Dog Beach Checker (planned, `/tools/dog-beach-checker/`)

**Incumbents:**
- Dogster "Are Dogs Allowed on Destin Beaches in 2026" - Okaloosa ban with City of Destin links, updated 2026-06-17; no Walton, no hours, no residency logic. https://www.dogster.com/lifestyle/are-dogs-allowed-on-destin-beaches
- 30a.com "Dogs on 30A" - correct 3:30 PM-8:30 AM window and permit details; Walton only, heavy merch and newsletter promos. https://30a.com/dogs-on-30a/
- Destin Dreamers and other rental-manager posts - no hours, no sources, no date, marketing-first. https://www.destindreamers.com/dog-friendly-beaches-near-destin-all-you-need-to-know/
- BringFido, dogsbeaches.com, Tripadvisor forums - user-generated or thin; contradictory. https://dogsbeaches.com/dog-friendly-beaches-in-destin-florida/
- County pages (Escambia dog beach page, yourbeachyourplace.com) - accurate, one county each, no alternatives. https://myescambia.com/pensacola-beach/beach-dog-parks

**Gaps:** no single source spans Okaloosa, Walton, Santa Rosa, Escambia and Bay; nobody computes "legal right now for me"; nobody dates their rules. See `docs/research/NEXT-TOOL-RESEARCH-2026-09-28.md` section 4 and the build spec for the base tool.

**Features (on top of the base spec):**
- **Rules matrix with change log (rank 2).** Render every spot from `lib/beach/rules.ts` as a plain HTML table (allowed, hours, permit, leash, source link, `verifiedOn`). Add a short "Rule changes" list under it, dated, so the page shows it is maintained. This is the AI-citation payload.
- **Rental-host kit (rank 3).** A print view per spot or county with the verdict matrix, a QR back to the tool and "posted signs govern" copy, plus an embed preset (`?embed=1&spot=walton-30a`). Pitch directly in the rental-manager outreach list from the research doc.
- **Next legal window + nearest alternative (rank 9).** For time-gated spots show "legal again at 3:30 PM (in 2 h 10 m)"; for banned spots always lead with the closest legal option and approximate drive time. The live conditions strip (reuse `/api/heat`, FDOH and FWC in v2) stays in the base spec.

**Future monetization hooks:**
- Sponsor: the natural fit on the site. "Presented by [local vet or pet-friendly rental manager]" as a one-line credit under the matrix, never inside the verdict chip and never altering a rule.
- Ad slot: below the rules matrix; none in the embed or print card.
- Affiliate-safe spots: dog life jacket (Crab Island, boat access), sand-safe booties, portable water bowl, in a "Pack for the dog beach" row below alternatives.

---

## Sources

**Project files:** `/home/angsec/Projects/kais-run/CLAUDE.md` · `docs/research/NEXT-TOOL-RESEARCH-2026-09-28.md` · `docs/AUDIT-BLOG-TOOLS-2026-09-16.md` · `docs/MONETIZATION.md` · `components/tools/EmbedThisTool.tsx` · `app/tools/*/page.tsx` and client components · `lib/heat/verdict.ts` · `lib/heat/cities.ts` · `app/api/heat/route.ts` · `lib/exercise/{compute,gap,targets}.ts` · `lib/bcs/history.ts` · `lib/puppy/growth.ts` · `next.config.js` · `components/ui/AffiliateLink.tsx`

**Heat:**
- https://weather.com/2026/07/30/pets/dog-walking-scale-heat-wave-hot-weather
- https://pawsafetycheck.com/
- https://www.2hot4paws.com/asphalt-temperature-chart
- https://getyourpetactive.com/pavement-temperature
- https://doggycalculators.com/dog-pavement-temperature-calculator/
- https://pawcast.org/
- https://www.whole-dog-journal.com/care/is-the-pavement-too-hot-to-walk-my-dog/

**Exercise:**
- https://www.sniffspot.com/blog/dog-exercise/dog-exercise-calculator-how-much-exercise-does-your-dog-need
- https://www.dogscalculator.com/calculators/exercise
- https://spotonfence.com/pages/how-much-exercise-does-my-dog-need
- https://barkercise.com/dog-exercise-calculator/
- https://worldanimalfoundation.org/dogs/exercise-calculator/
- https://www.goodrx.com/pet-health/dog/how-much-exercise-does-a-dog-need

**Body condition:**
- https://www.purinainstitute.com/centresquare/nutritional-and-clinical-assessment/3d-body-condition-score-tool
- https://www.petobesityprevention.org/dogbcs
- https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2021-nutrition-and-weight-management/resourcepdfs/nutritiongl_bcs.pdf
- https://pawsandpounds.com/tools/dog-body-condition-score
- https://www.petmd.com/dog/nutrition/how-find-your-dogs-body-condition-score
- https://vcahospitals.com/know-your-pet/body-condition-scores

**Puppy:**
- https://puppyweightcalculator.net/blog/puppy-exercise-by-age-chart/
- https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/puppies-dogs/exercising-your-puppy
- https://www.vetvoices.co.uk/post/puppy-exercise-5-minuets-per-month-of-life
- https://www.caninehealthandrehabilitation.com/blog/puppies-exercise-and-growth-plates
- https://www.calculatorsfordogs.com/age-life-stage-calculators/exercise-requirements-calculator
- https://www.pawcalculator.com/lifestyle/walking-calculator

**Beach:**
- https://www.dogster.com/lifestyle/are-dogs-allowed-on-destin-beaches
- https://30a.com/dogs-on-30a/
- https://www.destindreamers.com/dog-friendly-beaches-near-destin-all-you-need-to-know/
- https://dogsbeaches.com/dog-friendly-beaches-in-destin-florida/
- https://www.bringfido.com/attraction/beaches/city/fort_walton_beach_fl_us/
- https://myescambia.com/pensacola-beach/beach-dog-parks
- https://www.destin-ation.com/blog/can-take-dog-beach-destin/
- https://emeraldcoastinsider.com/2022/05/13/is-navarre-beach-dog-friendly

Research pulled 2026-09-28 with WebSearch/WebFetch. Purina Institute and BringFido returned HTTP 403 to the fetcher; their descriptions come from search snippets and the prior research doc.
