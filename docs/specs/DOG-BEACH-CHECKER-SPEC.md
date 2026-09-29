# Emerald Coast Dog Beach Checker - Build Spec

**Date:** 2026-09-28 · **Status:** spec only, nothing built · **Route:** `/tools/dog-beach-checker/`
**Why this tool:** `docs/research/NEXT-TOOL-RESEARCH-2026-09-28.md` (scored 4.40, winner). Feature ranking vs
incumbents: `docs/specs/TOOL-UPGRADES-2026-09-28.md` (ranks 2, 3, 9).
**Ship target:** build in November 2026, live by **2026-12-15**. **Hard gate:** it must be live by **2027-01-21**,
because two queued posts link to it (`can-you-take-your-dog-to-the-beach-destin` on 1/28 and
`why-does-my-dog-get-zoomies` on 2/11). If it slips, move those two dates (see section 10).

---

## 1. What it answers

"Can my dog go here, right now, and if not, where can it go?" The answer depends on the spot, whether the visitor is a
Walton County resident or property owner with a permit, and the date and time. Every verdict shows the ordinance behind
it and a "last verified" date. It never shows a fee or a fine amount. Copy says "a civil fine" and links the source.

Verdict values (one chip per result):

| Code | Chip text | Color token |
|---|---|---|
| `allowed` | Dogs allowed now | brand-teal |
| `allowed-window` | Allowed with a Walton permit, 3:30 PM to 8:30 AM, leashed | brand-gold |
| `closed-now` | Allowed here, but not at this hour | brand-gold |
| `trails-only` | Not on the sand - leashed on trails is OK | brand-gray |
| `not-allowed` | Dogs not allowed | red-ish (existing heat "do-not-walk" token) |
| `unverified` | No official rule found - check posted signs | brand-gray |

---

## 2. Rules data (verified 2026-09-28 against primary sources)

Lives in one typed file, `lib/beach/rules.ts`. Every row carries `source`, `sourceUrl`, `section`, `sourceVersion`,
`verifiedOn`, `confidence`. The same array renders the crawlable matrix on the page (section 4) and drives the widget.
**Do not publish fees or fine amounts** (internal notes only).

| id | Spot | Jurisdiction | Dogs on the sand | Hours | Who | Leash | Ordinance / source | Conf. |
|---|---|---|---|---|---|---|---|---|
| `okaloosa-island` | Okaloosa Island Gulf beaches (incl. The Boardwalk, Beasley Park) | Okaloosa County | No | - | Everyone | - | Okaloosa County Code Ch. 5, **Sec. 5-25(a)(6)** (Ord. 22-07, 4-5-22; Municode ver. 2025-12-02): "No dog or cat shall be permitted upon the public beaches of the county, unless specifically authorized by a sign clearly posted by the county." Penalty Sec. 5-40 (civil infraction; first offense may be a warning). Supporting: Okaloosa Island Protective Covenants, OR Book 121 pp. 233-250 | H |
| `fwb-gulf` | Fort Walton Beach area public Gulf beaches (county) | Okaloosa County | No | - | Everyone | - | Same as above | H |
| `destin-city` | Destin city public beaches (incl. Norriego Point, city Gulf accesses) | City of Destin | No (any animal) | - | Everyone | - | Destin Code Ch. 4, **Sec. 4-7(a)(6)** (Ord. 20-28-CC, 10-19-20; Municode ver. 2026-07-22): "No animal shall be permitted upon the public beaches of the city unless specifically authorized by a sign clearly posted by the city." Fines Sec. 4-23. City FAQ https://www.cityofdestin.com/FAQ.aspx?QID=75. Open item: Ord. 26-17-CC (8-3-26) amended the "beach" definition in Sec. 14-203 - read before launch | H |
| `henderson-sp` | Henderson Beach State Park (Destin) | FL State Parks | No; leashed OK in parking, nature trail, day-use sidewalk | Park hours | Everyone | 6 ft max | Rule **62D-2.014(13), F.A.C.**; https://www.floridastateparks.org/PetPolicy; park amenities page | H |
| `grayton-sp` | Grayton Beach State Park | FL State Parks | No; trails OK | Park hours | Everyone | 6 ft | Same rule; park page: "Pets are not permitted on beaches..." | H |
| `topsail-sp` | Topsail Hill Preserve State Park | FL State Parks | No (also tram, boardwalks, dunes, lakes); 15 mi of trails OK | Park hours | Everyone | 6 ft | Same rule; park page | H |
| `deer-lake-sp` | Deer Lake State Park | FL State Parks | No (also boardwalk); park OK | Park hours | Everyone | 6 ft | Same rule; park page | H |
| `guis-okaloosa` / `guis-opal` | Gulf Islands National Seashore - Okaloosa Area, Opal Beach | NPS | No, Gulf and bay side; trails/paths/roads OK | Park hours | Everyone | 6 ft | https://home.nps.gov/guis/planyourvisit/pets.htm (updated 2025-08-05): prohibited "On all park beaches gulf and bay side, and in water less than five feet in Florida." | H |
| `walton-public` | Walton County public beaches (30A, Miramar Beach, Santa Rosa Beach, Inlet Beach) | Walton County | Permit holders only | **3:30 PM - 8:30 AM next day, year-round** | County real-property owners or permanent residents with a current permit (expires midnight July 31) | Leash, "direct control" | Walton County Code Ch. 22, **Sec. 22-31** as amended by **Ord. 2025-22 (adopted 11-24-2025)**, PDF https://www.mywaltonfl.gov/DocumentCenter/View/44641, Municode ver. 2026-08-13: "The permit will allow leashed dogs on the beach between the hours of 3:30 p.m. and 8:30 a.m. of the following day." Permit page https://www.mywaltonfl.gov/1329. Rabies certificate required; waste pickup; tag on collar or on person; non-transferable; revoked on conviction (22-31(f)). Fine Sec. 22-62 (each day separate). Internal only: fee per the 2025 application, DocumentCenter/View/43694 | H |
| `navarre-beach` | Navarre Beach (Gulf), Navarre Beach Marine Park | Santa Rosa County | No | - | Everyone | - | Santa Rosa County Code Ch. 4, **Sec. 4-37(b)** (Ord. 2023-04, 4-27-23; Municode ver. 2026-08-06): unlawful to allow an animal in public places "such as school grounds, beaches and playgrounds except dog friendly parks." County page https://www.santarosa.fl.gov/318/Navarre-Beach-Pavilions: "No pets allowed on beach." No official dog beach exists | H |
| `pcola-west` | Pensacola Beach "Park West" dog beach, next to Parking Lot B (100 yd west of the walkover) | Escambia County / SRIA | **Yes** | May 1 - Oct 31: 7:00 AM - sunset. Nov 1 - Apr 30: sunrise - sunset | Everyone | 8 ft max, held; license tags | Escambia County Code Ch. 10, **Sec. 10-24** (recodified by Ord. 2026-22, 5-21-2026; Municode ver. 2026-08-18). General ban 10-24(c)(1), 10-11(b)(1); penalty 10-22(b). SRIA labels the lots "21.5 / 28.5" or "21E / 28B" - show both names https://visitpensacolabeach.com/things-to-do-dog-beach/ | H (lot naming M) |
| `pcola-east` | Pensacola Beach "Park East" dog beach, next to Parking Lot E (250 ft either side of the walkover) | Escambia County / SRIA | **Yes** | Same as above | Everyone | Same | Same | H |
| `pcola-other` | All other Pensacola Beach sand (incl. Casino Beach) | Escambia County | No | - | Everyone | - | Sec. 10-24(c)(1); SRIA page | H |
| `perdido-dog-park` | Perdido Key Dog Park, 14484 River Road | Escambia County | Off-leash dog park | Sunrise - sunset | Everyone | Off leash inside | Escambia Code **Sec. 10-25** (new under Ord. 2026-22) | H |
| `pcb-pier` | Panama City Beach, west side of the City Pier | City of PCB | **Yes** (designated exception) | Unverified (tourism sites say 24 h - do not publish) | Everyone | Leashed | PCB Code **Sec. 7-9** (Ord. 1616, 3-9-2023; Municode ver. 2026-04-21), Council may except beaches by resolution; city page https://www.pcbfl.gov/179/Dogs: "The beach on the west side of the City Pier is dog friendly. Dogs must be leashed." Resolution and boundaries not found | H rule / L hours |
| `pcb-other` | All other PCB Gulf sand | City of PCB | No | - | Everyone | - | Sec. 7-9 | H |
| `liza-jackson` | Liza Jackson Park fenced dog park, 338 Miracle Strip Pkwy SW, FWB | City of FWB | Off-leash dog park (not a beach) | Park: sunrise - 9 PM | Everyone | Off leash inside | https://www.fwb.org/Faq.aspx?TID=52: "Dogs are allowed unleashed in the fenced dog park located at Liza Jackson Park." Renovation from week of 2026-09-14 (~6 months); city says the dog parks stay open (FWB News Flash 2026-08-03). **Bay/water access for dogs NOT confirmed officially - do not claim** | H |
| `weidenhamer` | Nancy Weidenhamer Dog Park, 4100 Indian Bayou Trail, Destin | City of Destin | Off-leash dog park | Sunrise - sunset | Everyone | Leashed until inside | City FAQ QID=75 | H |
| `central-bark` | Navarre Central Bark, 8840 High School Blvd | Santa Rosa County | Dog park | Dawn - dusk | Everyone | Per park rules | https://www.santarosa.fl.gov/Facilities/Facility/Details/Navarre-Central-Bark-Large-Dog-Park-45 (fencing not stated) | M |
| `destin-harbor-boardwalk` | Destin Harbor Boardwalk | City of Destin | Not a beach; leash rules apply | - | Everyone | Leash | **No specific official rule found** -> verdict `unverified` | L |
| `crab-island` | Crab Island (sandbar, boat access) | - | **No official rule found** -> `unverified` | - | - | - | Do not make a claim | L |

Not verified, excluded from v1: Shoreline Park (Gulf Breeze), Point Washington State Forest trail rules, Timpoochee Trail.
Add only after reading the managing agency's page.

**Conflicts resolved by the primary text:** Walton hours quoted elsewhere as 4 PM-8 AM, 3 PM-9 AM, or "before 9 / after 5"
are wrong; the ordinance is 3:30 PM-8:30 AM year-round. The earlier research note "Okaloosa Ord. 77-19 / Sec 5-92" is
outdated; cite Sec. 5-25(a)(6). Escambia renumbered: Pensacola Beach dog beaches are now 10-24 (older sources say 10-25).

**Already fixed alongside this spec:** `lib/service-area/cities.ts` (Santa Rosa Beach page) said Walton hours were
"4 p.m. to 8 a.m. through spring and summer"; now 3:30 p.m. to 8:30 a.m., residents and property owners only.

### Data shape

```ts
// lib/beach/rules.ts
export type Verdict = 'allowed' | 'allowed-window' | 'closed-now' | 'trails-only' | 'not-allowed' | 'unverified';
export type Spot = {
  id: string; name: string; area: 'Destin' | 'Okaloosa Island' | 'Fort Walton Beach' | '30A / South Walton'
    | 'Navarre' | 'Pensacola Beach' | 'Perdido Key' | 'Panama City Beach';
  county: 'Okaloosa' | 'Walton' | 'Santa Rosa' | 'Escambia' | 'Bay';
  kind: 'gulf-beach' | 'dog-beach' | 'dog-park' | 'state-park' | 'national-seashore' | 'boardwalk' | 'sandbar';
  lat: number; lon: number;                 // feeds /api/heat
  rule: { sand: 'yes' | 'no' | 'permit' | 'unknown'; trails?: boolean;
          hours?: { from: string; to: string; months?: [number, number] }[];   // local wall clock
          residentOnly?: boolean; leashFt?: number; notes: string };
  source: { label: string; section?: string; url: string; version: string; quote: string };
  verifiedOn: string; confidence: 'H' | 'M' | 'L';
  alternatives: string[];                   // spot ids, nearest first
  driveMinutesFromDestin?: number;          // static, approximate, labelled "about"
};
```

`lib/beach/verdict.ts` (pure, unit-tested in `scripts/check-tools.mjs`): `verdictFor(spot, { resident: boolean, at: Date })`
returns `{ verdict, reason, nextLegalWindow?: { start, end }, alternatives }`. Sunrise/sunset for Pensacola Beach comes from
a small solar calc (no API) at the spot lat/lon. All times America/Chicago.

Test cases to lock in: Walton spot, resident, 3:29 PM -> `closed-now` with next window 3:30 PM; 8:30 AM -> `closed-now`;
visitor any time -> `not-allowed` + alternatives; Pensacola West on 2027-01-10 07:00 before sunrise -> `closed-now`; 2026-07-01
06:30 -> `closed-now` (7 AM rule); Destin -> `not-allowed`; Crab Island -> `unverified`.

---

## 3. UI

Page order (mobile first, 16px gutters, existing tokens, Bebas/DM Sans):

1. **H1** "Can My Dog Go to the Beach? Destin, 30A, Navarre & Pensacola Dog Beach Checker". One-line lede with the
   answer for Destin in plain text (for AI Overviews): "Not in Okaloosa County or Destin. Walton allows permit holders
   3:30 PM to 8:30 AM. Visitors can use the Pensacola Beach and Panama City Beach dog beaches."
2. **Widget** (client component `BeachChecker.tsx`):
   - Spot select, grouped by area (optgroups). Optional "Near me" is **out of scope for v1**: `next.config.js` sends
     `Permissions-Policy: geolocation=()` for `/tools/(.*)`, and embeds would need `allow="geolocation"`. Revisit in v2.
   - Toggle: "I live in or own property in Walton County and have a dog beach permit" (default off).
   - Date/time: defaults to now; "Change" reveals a datetime-local input.
   - Result card: verdict chip; one-sentence reason; hours window; "Next legal window: today 3:30 PM" when relevant;
     source line ("Walton County Code Sec. 22-31, verified Sep 28, 2026" linked to the official URL);
     **Nearest legal alternatives** (2-3 cards with drive time "about 55 min from Destin");
     **Conditions now** strip from `/api/heat?lat=&lon=` (reuse, see below);
     "No beach today? Get your dog's daily number" -> `/tools/dog-exercise-calculator/`.
   - Share: "Copy link" builds `?spot=walton-public&resident=1` (read client-side via `useSearchParams` inside a Suspense
     boundary so the page stays static; do NOT await `searchParams` in `page.tsx` - that is what made every other tool
     dynamic per `docs/AUDIT-BLOG-TOOLS-2026-09-16.md`).
   - Print: "Print this rule" prints the result card plus source (print CSS hides the rest).
3. **Rules matrix** - plain server-rendered HTML `<table>` from `rules.ts` (JSX, not Markdown: the MDX pipeline has no
   remark-gfm, so Markdown tables render as raw pipes). Columns: Spot, Dogs on sand, Hours, Who, Leash, Source, Verified.
4. **Rule changes log** - dated list (e.g. "2025-11-24 Walton Ord. 2025-22 set 3:30 PM-8:30 AM year-round";
   "2026-05-21 Escambia Ord. 2026-22 renumbered the Pensacola Beach dog beach section and added Perdido Key Dog Park").
5. **FAQ** (5 items, same as schema).
6. **Related reading** (section 7 outbound list; beach post shown only once published - use `getAllPostMeta()`,
   which applies the same date gate).
7. `EmbedThisTool` (embed section, see 6). 8. `LaunchWaitlist source="tool-dog-beach-checker"`.
9. Disclaimer: "Not legal advice. Posted signs and the current ordinance govern. Rules change - each rule shows the date
   we last checked it."

### Reuse of `/api/heat`

`app/api/heat/route.ts` already accepts `?lat=&lon=` (lines ~44-80) and returns `tempF`, `humidity`, `feelsLikeF`, and
`hourly`. The checker calls it with the spot's coordinates and runs the existing `verdict()` / `pavementEstimateF()`
from `lib/heat/verdict.ts` to render "Sand and pavement: caution until 6 PM" and links "Full hour-by-hour" to
`/tools/too-hot-to-walk/?zip=` (nearest known ZIP from `lib/heat/cities.ts`). Sand gets the same sun delta as asphalt
until the upgrades doc's surface picker (TOOL-UPGRADES rank 10) exists. Failure mode: hide the strip, never block the verdict.
v2 (not v1): FDOH Healthy Beaches advisories (Okaloosa/Walton, biweekly Mar-Oct) and FWC red tide status, behind the same
graceful fallback.

---

## 4. Metadata

```ts
const TITLE = "Can My Dog Go to the Beach? Destin, 30A, Navarre & Pensacola Dog Beach Checker";
const DESC  = "Pick a beach and see if your dog is allowed right now - Okaloosa, Destin, Walton permit hours (3:30 PM to 8:30 AM), Navarre, Pensacola Beach and PCB dog beaches, with the ordinance for each.";
const CANONICAL = "https://kaisrun.xyz/tools/dog-beach-checker/";
const OG_CARD = generatedOgUrl('Dog Beach Checker', 'Free Tool');
```

Same `openGraph` / `twitter` shape as `app/tools/too-hot-to-walk/page.tsx:15-40`. Apex only, trailing slash. No em dashes
in any string (spaced hyphens). Target queries: can dogs go on the beach in destin, are dogs allowed on destin beaches,
dog friendly beaches destin fl, dog beach near destin, walton county dog beach permit hours, are dogs allowed on 30a
beaches, dog friendly beaches navarre fl, pensacola beach dog beach, panama city beach dog beach.

## 5. Schema (JSON-LD, one `@graph`)

- `WebApplication`: name, url, `applicationCategory: 'UtilitiesApplication'`, `isAccessibleForFree: true`,
  `provider: { '@id': 'https://kaisrun.xyz/#business' }`, `dateModified` = newest `verifiedOn`.
- `FAQPage`: the 5 FAQ items rendered on the page (text identical):
  1. Are dogs allowed on the beach in Destin? 2. What are the Walton County dog beach hours? 3. Can visitors bring a dog
  to the beach on 30A? 4. Is there a dog beach in Navarre? 5. Where is the closest dog-friendly beach to Destin?
- `BreadcrumbList` via `buildBreadcrumbJsonLd` (Home > Tools > Dog Beach Checker).
- Optional `Dataset` for the rules matrix (`name`, `description`, `dateModified`, `license`: none, `creator` #business,
  `isBasedOn` = the ordinance URLs). Low risk, helps AI engines treat the table as a source.
No `aggregateRating`, no `Offer`.

Register the route in: `app/tools/page.tsx` (5th card), `app/sitemap.ts` STATIC list, `public/llms.txt` Free Tools
section, and `scripts/check-tools.mjs` (verdict tests). IndexNow on the production deploy (postbuild already pings).

---

## 6. Embed mode (for the local pet-business outreach)

Goal: vets, groomers, pet-friendly rental hosts and 30A/Destin blogs put the checker on their site, and each embed
carries a **followed link on the host page, outside the iframe** (the in-iframe credit is worth nothing for links, per
the comment in `components/tools/EmbedThisTool.tsx`).

- **Route:** a static `app/tools/dog-beach-checker/embed/page.tsx` (not `?embed=1` on the main page, so the main page
  stays static; matches TOOL-UPGRADES rank 1). It renders the widget only, no nav/footer/cookie banner (reuse
  `EMBED_CHROME_CSS`), a small in-frame "Powered by Kai's Run" (`EmbedCredit`), and `<meta name="robots" content="noindex">`
  with `alternates.canonical` pointing at the main tool URL.
- **Presets:** `?spot=<id>` locks the default spot (a Miramar Beach rental host presets `walton-public`); `?area=` filters
  the dropdown; `?resident=0|1`; `?theme=light` for light host pages. Unknown params are ignored.
- **Framing:** `/tools/(.*)` already sends `frame-ancestors *` (`next.config.js:61`), which covers `/embed/`.
- **Height:** default 640px. Optional: the embed posts `{ type: 'kaisrun-embed-height', height }` via `postMessage`
  and the snippet includes a 3-line listener; the plain iframe works without it.
- **Snippet** (shown in `EmbedThisTool` with a copy button and a spot picker that rewrites it):

```html
<iframe src="https://kaisrun.xyz/tools/dog-beach-checker/embed/?spot=walton-public" width="100%" height="640"
  style="border:0" loading="lazy" title="Emerald Coast Dog Beach Checker"></iframe>
<p>Dog beach rules for Destin, 30A, Navarre and Pensacola from the
  <a href="https://kaisrun.xyz/tools/dog-beach-checker/">Emerald Coast Dog Beach Checker</a> by Kai's Run.</p>
```

- **Guest card (rental-host kit, TOOL-UPGRADES rank 3):** `/tools/dog-beach-checker/card/?spot=` - a print-ready
  half-page with the spot's rule, hours, nearest legal alternative, and a QR code to the tool (QR generated at build or
  client-side, no third-party service). Hosts print it for the house binder; the ask in outreach is "link it on your pet
  policy page."
- **Tracking:** `trackToolUse('dog-beach-checker', { spot, resident, embed: true, host: document.referrer origin })`
  from `lib/analytics/trackToolUse.ts`, so embeds can be counted per host.
- **Outreach list and pitch:** `docs/research/NEXT-TOOL-RESEARCH-2026-09-28.md` section 4, "Distribution plan". Nothing
  is sent without Travis.

---

## 7. Complete internal link map

Status key: **[IN DRAFT]** = link already written into an uncommitted draft today; **[ON SHIP]** = add in the same
commit that ships the tool (these pages are live or scheduled before the tool exists, so a link now would 404);
**[TOOL]** = link lives on the tool page.

### 7a. Links INTO the checker

| From | Where / anchor text | Status |
|---|---|---|
| `content/blog/can-you-take-your-dog-to-the-beach-destin.mdx` (1/28) | Intro: "the [Dog Beach Checker]" + closing **Free tool** line | [IN DRAFT] |
| `content/blog/why-does-my-dog-get-zoomies.mdx` (2/11) | "Mind the surface outdoors" section: "the [Dog Beach Checker] sorts the rules by spot" | [IN DRAFT] |
| `content/blog/how-to-build-muscle-on-a-dog.mdx` (1/14) | none - publishes before the gate date; no beach angle | - |
| `content/blog/why-does-my-dog-pull-on-the-leash.mdx` (1/5) | none - predates the tool; no beach angle | - |
| `content/blog/overtired-puppy-witching-hour.mdx` (12/17) | none - puppy topic, predates the ship target | - |
| `content/blog/red-tide-dogs-emerald-coast.mdx` (live) | Line 54 paragraph: link "the outdoor outlet is somewhere else" to the tool; **swap the closing Free tool line** from the exercise calculator to the checker ("check whether the spot you use is even legal, and what is open instead") | [ON SHIP] |
| `content/blog/too-hot-to-walk-your-dog.mdx` (live) | Add one sentence in the body: "Thinking of the beach instead? Most of it is off limits to dogs here - [check the spot first]" | [ON SHIP] |
| `content/blog/mobile-dog-gym-destin-fl.mdx` (live) | Where it discusses Destin outdoor options: "dogs are not allowed on Destin beaches ([Dog Beach Checker])" | [ON SHIP] |
| `content/blog/dog-park-not-tiring-dog-out.mdx` (live) | One line naming the legal off-leash parks, linked to the checker's dog-park rows | [ON SHIP] |
| `content/blog/mental-stimulation-vs-exercise-dog.mdx` (10/08) | Line ~80 "red tide on the beach" -> add "(and most of the beach here is closed to dogs anyway - [check a spot])" | [ON SHIP] |
| `content/blog/how-cold-is-too-cold-for-dogs.mdx` (12/10) | Winter outdoor options paragraph: link the checker for legal beach and trail spots | [ON SHIP] |
| `app/tools/page.tsx` | 5th tool card "Dog Beach Checker" | [ON SHIP] |
| `app/tools/too-hot-to-walk/page.tsx` | "More free tools" row: "Heading to the beach? Check if dogs are allowed" | [ON SHIP] |
| `app/tools/dog-exercise-calculator/page.tsx` | "More free tools" row: "Where can your dog legally run near the water?" | [ON SHIP] |
| `app/tools/puppy-exercise-planner/page.tsx` | "More free tools" row, tied to the beach-sand activity (TOOL-UPGRADES rank 5) | [ON SHIP] |
| `app/tools/dog-body-condition-score/page.tsx` | "More free tools" row (lowest relevance; keep for hub parity) | [ON SHIP] |
| `lib/service-area/cities.ts` | Destin, Fort Walton Beach, Navarre, Santa Rosa Beach, Miramar Beach, Sandestin city copy: one linked sentence each on local beach rules | [ON SHIP] |
| `public/llms.txt` | Free Tools section entry + one-line rules summary with the ordinance cites | [ON SHIP] |
| `app/sitemap.ts` | `['/tools/dog-beach-checker/', '<ship date>', 'monthly', 0.8]` | [ON SHIP] |

### 7b. Links OUT of the checker [TOOL]

| To | Placement |
|---|---|
| `/tools/dog-exercise-calculator/` | Every `not-allowed` / `closed-now` result: "No beach today? Get your dog's daily number" |
| `/tools/too-hot-to-walk/?zip=` | Conditions strip "Full hour-by-hour" |
| `/tools/puppy-exercise-planner/` | FAQ/related: "Is beach sand OK for a puppy?" |
| `/blog/can-you-take-your-dog-to-the-beach-destin/` | Related reading, rendered only once published (date gate) |
| `/blog/red-tide-dogs-emerald-coast/` | Related reading + Gulf spot notes ("during a bloom, stay off even where it is legal") |
| `/blog/too-hot-to-walk-your-dog/` | Related reading (summer hours) |
| `/blog/dog-park-not-tiring-dog-out/` | Dog-park alternative cards |
| `/blog/why-does-my-dog-get-zoomies/` | Related reading (sand as a slip surface), once published |
| `/service-area/destin/`, `/fort-walton-beach/`, `/navarre/`, `/santa-rosa-beach/`, `/miramar-beach/` | Area headers in the rules matrix |
| Official sources (external, `rel="noopener"`) | Every rule row and result card |

The other four tools do not need to link to each other beyond the hub and the "More free tools" row.

---

## 8. Future monetization hooks (gated on Travis; CLAUDE.md says no ads now)

- Sponsor line under the result, never inside the verdict: "Beach rules presented by <local vet / pet-friendly rental
  company>". One sponsor per area, clearly labelled.
- Affiliate-safe row below alternatives: portable water bowl, sand-safe booties, a long line, a dog life jacket for
  boat days (existing `/equipment/` pattern, disclosed). Never on a `not-allowed` result as a workaround.
- Ad slot: below the rules matrix only. Never in the embed.

## 9. Maintenance

- `verifiedOn` per row; a quarterly re-verify (Jan, Apr, Jul, Oct) of every source in section 2. Next: week of
  **2027-01-18**, which also clears the 1/28 post.
- Watch items: Destin Ord. 26-17-CC beach definition; Walton permit year rolls over each Aug 1; Liza Jackson renovation
  (ends ~March 2027); PCB exempting resolution (boundaries/hours still unverified); Navarre dog beach petition.
- Any rule change: update the row, add a change-log line, bump `dateModified`, IndexNow the URL.

## 10. Dependency and dates

| Item | Date | Depends on |
|---|---|---|
| Tool build | November 2026 | Travis approval of this spec |
| Tool live (target) | 2026-12-15 | Build + [ON SHIP] link edits in the same commit |
| Tool live (hard gate) | 2027-01-21 | - |
| Beach post | 2027-01-28 | Tool live; rules re-verified week of 1/18 |
| Zoomies post | 2027-02-11 | Tool live |

If the tool is not live by 1/21: move the beach post and the zoomies post to two weeks after the real ship date (edit the
`date` and `dateModified` in both MDX files and the rows in `docs/PUBLISHING.md`), and run `npm run check:schedule`.
