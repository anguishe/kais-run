# Kai's Run - Next Free Tool Research

**Date:** 2026-09-28 · **Type:** research only (nothing was built, edited, or deployed)
**Question:** What is the single best next free interactive tool for kaisrun.xyz? It has to earn organic traffic and links on its own, because the business is parked (trailer not operational) and the site has 0 backlinks, weak Bing crawl trust, and weak Google visibility.

**Answer:** Build the **Emerald Coast Dog Beach Checker** ("Can my dog go here today?"). The runner-up is a **Dog Hurricane Go-Kit + County Pet-Shelter Planner**, timed to launch before the 2027 hurricane season.

---

## 1. Inventory of existing tools (no duplicates allowed)

| Route | What it does | Target query (title) | In sitemap | Files |
|---|---|---|---|---|
| `/tools/` | Hub for the four tools | "Free Dog Tools \| Kai's Run - Emerald Coast FL" | yes (`app/sitemap.ts:23`) | `app/tools/page.tsx` |
| `/tools/too-hot-to-walk/` | ZIP → live air temp, heat index, pavement temp, and an hour-by-hour walk strip. Uses `/api/heat` and NWS Rothfusz heat index (`lib/heat/verdict.ts`) | "Too Hot to Walk Your Dog? Pavement Temperature Checker" | yes (`:24`) | `app/tools/too-hot-to-walk/{page,HeatChecker}.tsx` |
| `/tools/dog-exercise-calculator/` | Breed group, age, weight, and drive → daily minutes with structured/play/enrichment splits and the gap vs. current activity. Includes life stages (adolescent/senior) via `lib/exercise/targets` | "Dog Exercise Calculator - How Much Does My Dog Need?" | yes (`:25`) | `app/tools/dog-exercise-calculator/{page,Calculator}.tsx` |
| `/tools/dog-body-condition-score/` | 3-question hands-on 9-point BCS estimate with a local trend log | "Dog Body Condition Score Checker (No Scale)" | yes (`:26`) | `app/tools/dog-body-condition-score/{page,BodyConditionChecker}.tsx` |
| `/tools/puppy-exercise-planner/` | Age + adult size → growth-plate window, forced-exercise cap, 5-minute rule explained | "Puppy Exercise Planner - Growth Plates & the 5-Minute Rule" | yes (`:27`) | `app/tools/puppy-exercise-planner/{page,PuppyPlanner}.tsx` |

Other interactive surfaces are not tools: `/pricing/`, `/book/` (Square widget), `/vote`, `/equipment/first-aid-kit/` (affiliate page with FAQ). Shared plumbing: `components/tools/EmbedThisTool.tsx`, `lib/analytics/trackToolUse.ts`, `scripts/check-tools.mjs`. Social assets for all four are in `~/Projects/kais-run-tools-content/` (cards, carousels, shorts, per-platform copy).

**Themes already covered, so they are excluded as duplicates:** heat and pavement (including a "best walk window"), daily exercise need by breed/age (including senior), weight/BCS, puppy limits and the 5-minute rule. A hot-car calculator or a "best time to walk today" tool would overlap the heat tool.

**Current performance (from `docs/AUDIT-BLOG-TOOLS-2026-09-16.md`):** 0 clicks on every tool. The heat tool sits at position 9.0 on 7 impressions, the only tool on page 1, and it is the most local and most live of the four. The exercise calculator is at position 48 and the BCS checker at 35. They are national, head-term calculators competing against calculator farms. That supports the main finding of this report: **local plus live beats national plus generic for a zero-link domain.**

---

## 2. Pain-point and demand research

### Demand signals (Google autocomplete, pulled 2026-09-28)
Caveat: the request came from an Emerald Coast IP, so local suggestions may be boosted. That boost is also a fair picture of what local and visiting searchers see.

| Seed | Suggestions (in rank order) |
|---|---|
| "dog friendly beaches" | near me, **destin**, **pensacola**, gulf shores, -, **destin fl**, alabama, orange beach, florida, **navarre fl** |
| "can dogs go on the beach in" | **destin** (#1), myrtle beach, **panama city beach**, florida, ..., **pensacola** |
| "are dogs allowed on destin" | beaches, beach florida, **boardwalk**, **harbor boardwalk**, pets allowed on destin beach, **service dogs** allowed on destin beach |
| "dog beach near" | near me, **navarre fl**, **destin fl**, near me now, near me where dogs are allowed, **pensacola**, **destin** |
| "walton county dog" | beach permit, dog park, permit, dog beach, **dog tag**, **friendly beach**, permit online, **beach pass**, **beach rules** |
| "dog friendly 30a" / "dogs on 30a" | 30a beaches, **are dogs allowed on 30a beaches**, dog friendly beaches 30a florida |
| "liza jackson" | park, **dog park**, boat ramp |
| "dog hurricane" | preparedness, **kit** (weak, seasonal) |
| "senior dog exercise" | exercises, class, routine, **mobility exercises**, stretches |
| "dog calorie" / "dog age" / "dog weight loss" | calculator variants (high demand, see competition) |

**Reading:** dog-beach questions for Destin, Navarre, Pensacola, PCB, and 30A take several top slots across four different seeds. That is unusually dense local demand, and it lasts all year: summer tourists, spring break, and October-March snowbirds.

### Pain points by theme
- **Beach access (strongest local pain):** Visitors arrive expecting a Gulf beach day with the dog and find that Okaloosa County bans dogs from all public beaches (Ord. 77-19; "No dog or cat shall be permitted upon the public beaches of the county"). Walton allows dogs only with a resident or property-owner tag. Santa Rosa lists Navarre Beach as no pets. State parks (Henderson, Grayton, Topsail) ban dogs on the sand but allow them on some trails. The only visitor-legal Gulf sand nearby is at Pensacola Beach (two designated dog beaches) and Panama City Beach (west of the City Pier). The same question repeats on Tripadvisor forums (Destin, Fort Walton Beach, Okaloosa Island threads) and in FB groups ("What beaches in Pensacola allow dogs?").
- **The information is wrong or inconsistent:**
  - Walton hours are quoted three ways: "before 9am/after 5pm Memorial-Labor Day", "4 PM-8 AM spring/summer and 3 PM-9 AM fall/winter", and "3:30 PM-8:30 AM year-round". The last matches the current ordinance per 30a.com and the county summary. A 2025 amending ordinance exists (`mywaltonfl.gov/DocumentCenter/View/44641`).
  - dogsbeaches.com gives no hours and blurs state-park rules.
  - An AI search summary returned during this research told Destin visitors to use "Dog Beach at Pier Park" without saying it is in Panama City Beach, about an hour east.
  - The PCB official page gives no hours.

  The top answers are thin, stale, or contradictory. That is the gap.
- **Water safety layer:** DOH-Okaloosa samples Liza Jackson Park (the FWB off-leash dog park with bay swimming), Garniers, Marler, and Wayside Parks every two weeks, March-October, and has issued enterococci advisories for Liza Jackson specifically. Red tide reaches Okaloosa most often in September-October (the site's own post, `content/blog/red-tide-dogs-emerald-coast.mdx`). FWC publishes daily *K. brevis* sample maps via ArcGIS.
- **Hurricane prep (severe but seasonal):** County pet shelters differ a lot:
  - Okaloosa: Antioch Elementary, Davidson Middle, NWFSC, about 600 pets combined. Per county FAQ the pets are housed at a separate facility with an onsite vet, not with the owner.
  - Santa Rosa: Avalon Middle, annual pre-registration required.
  - Walton: Freeport High.

  Every guide says crate plus 3-5+ days of food/water plus records. Existing tools are static checklists (ASPCA, Ready.gov, FVMA, UF CVM) or generic interactive ones (thisstormseason.com). None calculates per-dog quantities or crate size, and none gives county-specific shelter rules.
- **Exercise, senior, running:** Covered by the existing tools, or dominated by brand content: Ruffwear, Kurgo, and Nonstop Dogwear own "couch to 5K dog", and PetMD, Zoetis, and vet clinics own "senior dog exercises".
- **Calories, age, chocolate, weight loss, crate size:** Saturated. Merck, VIN, Pet Poison Helpline, and PetMD run chocolate calculators. APOP and WPOA run calorie and weight-loss calculators. AKC/UCSD cover age, and 6-10 calculator farms per SERP cover all of these (calculatorsfordogs, furcalc, pawcalculator, thepetcalculator, dogscalculators). A zero-link site will not rank.

---

## 3. Candidate scoring

Scale 1-5 (5 = best; for effort, 5 = easiest). Weights: pain 15%, demand 20%, competition weakness 20%, linkability 15%, local angle 10%, build effort 5%, brand/E-E-A-T fit 10%, AI-citation 5%.

| # | Candidate | Pain | Demand | Comp. weak | Link | Local | Effort | Fit | AI | **Weighted** |
|---|---|---|---|---|---|---|---|---|---|---|
| A | **Emerald Coast Dog Beach Checker** | 3 | 5 | 5 | 5 | 5 | 3 | 3 | 5 | **4.40** |
| C | Dog Hurricane Go-Kit + County Shelter Planner | 5 | 3 | 4 | 4 | 5 | 4 | 2 | 4 | **3.85** |
| D | Senior Dog Mobility Routine Builder | 4 | 4 | 3 | 3 | 1 | 4 | 5 | 3 | 3.40 |
| B | Dog Running Plan Builder (humidity-adjusted C25K) | 3 | 3 | 3 | 3 | 3 | 4 | 5 | 3 | 3.25 |
| E | Dog Weight-Loss Plan (RER at goal weight) | 3 | 4 | 2 | 2 | 1 | 4 | 4 | 2 | 2.75 |
| H | Chocolate / toxic-food checker | 5 | 4 | 1 | 2 | 1 | 4 | 1 | 1 | 2.50 |
| I | Hot-car temperature calculator (overlaps heat tool) | 4 | 2 | 2 | 2 | 3 | 4 | 2 | 2 | 2.50 |
| J | Reactive-dog quiet-walk window planner | 3 | 1 | 4 | 1 | 2 | 3 | 3 | 2 | 2.35 |
| F | Dog calorie calculator | 2 | 5 | 1 | 1 | 1 | 5 | 2 | 1 | 2.25 |
| G | Dog age calculator (UCSD epigenetic) | 1 | 5 | 1 | 1 | 1 | 5 | 1 | 1 | 2.00 |

Notes:
- A scores only 3 on brand fit because beach access is lifestyle, not conditioning. The mitigation is to frame it as "where your dog can actually run on this coast" and link every verdict to the exercise tools. It scores 5 on linkability because a whole class of local sites (vacation-rental managers, pet-friendly hosts, 30A/Destin blogs) already publishes dog-beach pages and links out to resources.
- D and B are the best brand fits but lose to national brand content. Keep D as the evergreen follow-up once local links exist.

---

## 4. Recommendation

### Winner: Emerald Coast Dog Beach Checker

**Route:** `/tools/dog-beach-checker/` (title below). Static rules data plus an optional live layer, client-side Next.js. It reuses `/api/heat` and the existing `EmbedThisTool`.

**Concept:** Pick a spot (or "near me") and say whether you are a Walton County resident/property owner or a visitor. The tool returns a verdict for right now or a chosen date/time:
- **Allowed** / **Allowed with Walton tag, 3:30 PM-8:30 AM, leashed** / **Not allowed on the sand, trails OK** / **Not allowed**
- The ordinance or official page behind the verdict, the fine, and a "last verified" date.
- The **nearest legal alternative** with approximate drive time. From Destin that is Liza Jackson off-leash park and bay (FWB), Pensacola Beach dog beaches (Lot B/21E and Lot E/28B), and the PCB dog beach west of the City Pier.
- **Conditions today** for that spot: the pavement/heat verdict (existing engine), and in v2 the FDOH Healthy Beaches advisory status where sampled and the FWC nearest red tide sample level.

**Inputs:** location (dropdown of about 20 named spots plus a county filter), residency (Walton resident/owner vs. visitor), date/time (default now), optional ZIP for heat.

**Spots in v1:**
- Destin public beaches and Henderson Beach SP
- Okaloosa Island, the Boardwalk, and Destin Harbor Boardwalk
- Liza Jackson Park dog park
- Navarre Beach (Gulf) and Navarre parks (Central Bark, Shoreline Park dog park)
- Walton County beaches (30A / Miramar), plus Grayton Beach SP, Topsail Hill, and Deer Lake SP
- Point Washington SF trails and Timpoochee Trail
- Pensacola Beach West and East dog beaches
- PCB Pier Park dog beach
- Crab Island (boat access)

**Outputs:** verdict chip, why (citation), hours window, fine, alternatives, conditions strip, and a shareable result URL (`?spot=&resident=`). The page body also needs a crawlable **rules matrix table** (every spot × allowed/hours/permit/source). The table is the AI-citation payload. The widget is the engagement layer.

**Title/H1:** "Can My Dog Go to the Beach? Destin, 30A, Navarre & Pensacola Dog Beach Checker"

**Target keywords:** can dogs go on the beach in destin · dog friendly beaches destin (fl) · dog beach near destin · are dogs allowed on destin beaches · are dogs allowed on destin harbor boardwalk · dog beach near navarre fl · dog friendly beaches navarre fl · are dogs allowed on 30a beaches · walton county dog beach rules / permit / dog tag · dog friendly beaches pensacola · can dogs go on the beach in panama city beach · liza jackson dog park.

**SERP teardown (current top results and what they miss):**

| Result | Type | Misses |
|---|---|---|
| destinflorida.com (CVB) "Pet Friendly Places" | Official listicle | No hours, no residency logic, no live conditions |
| dogsbeaches.com Destin guide (May 2026) | Thin affiliate guide | "No specific hours", vague state-park rules, no sources |
| destinmiramar.com, destindreamers.com, thegoodlifedestin.com | Local blogs | Static; Walton hours often stale (pre-2025 seasonal windows) |
| 30a.com "Dogs on 30A" | Correct hours (3:30-8:30) | Walton only; no alternatives across counties; undated |
| yourbeachyourplace.com (county) | Official | Rules only, one county at a time, no alternatives |
| Rental managers (ECVR, Benchmark 30A, Davis Properties, Seaspray, Beach Condos in Destin) | Blog posts | Single county, marketing-first, no verdict tool |
| BringFido / Yelp / Tripadvisor | Directories/forums | User-generated, contradictory, no ordinance basis |

**What wins:**
- One tool across four counties.
- Residency-aware verdicts.
- A "what's legal instead" answer.
- Cited ordinances with a verified date.
- A live conditions layer no one else has (heat now, water advisories and red tide in v2).

**Data sources to cite (official first):**
- Okaloosa County Code Ch. 5 (Municode) / Ord. 77-19 §6; county beach rules page (yourbeachyourplace.com/okaloosa-beaches); Okaloosa County Sheriff enforcement.
- Walton County: Dog Beach License page and 2025/2026 application (mywaltonfl.gov/1329), 2025 amending ordinance (DocumentCenter/View/44641; **read the text before building to confirm the 3:30 PM-8:30 AM year-round window**), $40/yr per dog, Aug 1-Jul 31 validity, rabies certificate, residents/owners only.
- Florida State Parks pet policy (beaches, bathing areas, playgrounds, and buildings prohibited; 6-ft leash on trails).
- Santa Rosa County / Navarre Beach no-pets listing; santarosa.fl.gov facility pages for Navarre Central Bark.
- Escambia County / Santa Rosa Island Authority dog beach page: Lot B (21E) and Lot E (28B); 7 AM-sunset May 1-Oct 31, sunrise-sunset Nov 1-Apr 30; leash plus tags.
- City of Panama City Beach Dogs page (west side of City Pier, leashed).
- FDOH-Okaloosa and FDOH-Walton Healthy Beaches (enterococci >70 CFU/100 mL, confirmed on resample, triggers an advisory; biweekly March-October).
- FWC Red Tide Current Status (gis.myfwc.com/redtidecurrentstatus; ArcGIS item 87162eec...).
- NWS heat index (already in `lib/heat/verdict.ts`).

**Build notes (for the future build prompt, not done now):**
- Rules live in one typed data file with `source`, `verifiedOn`, and `notes` per spot.
- Keep the page static and fast. The audit found all tool routes dynamic because of `searchParams`, so fix that pattern here instead of copying it.
- Use WebApplication + FAQPage + BreadcrumbList schema.
- Add it to `app/tools/page.tsx`, `app/sitemap.ts`, and `llms.txt`.
- Run IndexNow on publish.
- Cross-link from `/blog/red-tide-dogs-emerald-coast/` and `/blog/too-hot-to-walk-your-dog/`. Link from each verdict to the exercise calculator ("no beach today? here is the replacement workload").
- Put the embed snippet on the page with a real followed link outside the iframe (the audit flagged in-iframe attribution as worthless).
- Separate prerequisite: fix the red tide post before publishing. It implies the beach is where local dogs run (`red-tide-dogs-emerald-coast.mdx:54`). In Okaloosa that is illegal, so the new tool would contradict the site's own post.

**Distribution plan:**
1. **Owned:**
   - GBP "What's new" post and a Nextdoor post (the highest-fit platform per `kais-run-tools-content/CONTENT-STRATEGY.md`).
   - FB: Travis posts to local dog and visitor groups by hand. Per the 2026-09-11 rule, Claude never scrapes or automates Meta. Screenshots and clicks only, Chrome 7b769056, 12 page loads per hour or fewer.
   - Asset set from the existing card and short generators in `kais-run-tools-content/scripts/`. Hook: "Your dog is not allowed on a single public beach in Okaloosa County. Here is where it is."
2. **Link outreach (highest yield first):**
   - Vacation-rental managers that already publish dog-beach or pet pages: ECVR, Benchmark 30A, Davis Properties, Seaspray, Beach Condos in Destin, Holiday Beach Rentals, Destin Dreamers, Breakers FWB. Pitch: "a free, sourced, always-current checker your guests can use; embed or link."
   - Pet-friendly Airbnb hosts' guidebooks.
   - Local vets, groomers, and boarding: offer the embed.
   - Walton-side pet businesses (e.g. Huck and Harlowe, which already explains the permit).
   - Visit South Walton and the Destin CVB partner listings, if eligible.
3. **Local media:**
   - Niceville.com, NWF Daily News, WEAR, WKRG.
   - Hooks: snowbird arrival (October-November), spring break (March), and any red tide or water advisory event. The last is a public-service angle with a live tool and a local expert attached, per `docs/BACKLINK-PLAN.md:55`.
4. **AI/answer engines:** Put the rules matrix in plain HTML with dates and sources, which is what AI Overviews and Copilot cite when blogs conflict.

**Success metrics:**
- Indexed in Google and Bing within 14 days of launch.
- **5 or more referring domains within 90 days**, the metric that matters for the 0-backlink crawl-trust problem.
- Top 10 for 3 or more target queries by 2027-03-15 (spring break).
- 500 or more monthly tool sessions by June 2027 (Vercel Analytics plus `trackToolUse`).
- At least one AI-engine citation (Copilot, Perplexity) for "can dogs go on the beach in destin".
- Downstream signal: GSC "Discovered - not indexed" count falling.

**Risks:**
- **Accuracy/liability:** Rules change (Walton amended in 2025). Mitigate with the "last verified" date per rule, official links, a quarterly re-verify calendar entry, and "not legal advice; posted signs govern" copy.
- **Brand drift:** Tourist traffic will not book a parked mobile gym. That is acceptable, because the goal is traffic and links. Keep the conditioning tie-in in every verdict.
- **Live-data fragility:** FDOH posts advisories as press releases and FWC data sits in ArcGIS. Ship v1 without live water data and add it in v2 behind a graceful fallback.
- **Negative framing:** "No" is the answer for most Okaloosa spots, so always lead with the legal alternative.
- **Autocomplete bias:** The demand read is geo-boosted. Confirm with GSC and Bing keyword tools after launch.

### Runner-up: Dog Hurricane Go-Kit + County Pet-Shelter Planner

**Inputs:** number of dogs; each dog's weight, length, and height; meds; food kcal/cup; county (Okaloosa/Walton/Santa Rosa/Escambia); evacuation plan (shelter/hotel/inland).

**Outputs:**
- Water in gallons for N days, from the ASPCA/Ready.gov guidance.
- Food in cups from RER = 70 × kg^0.75 × maintenance factor (WSAVA/AAHA).
- Minimum crate size: dog length/height + 4 in, "stand, turn, lie down".
- That county's pet-shelter facts. Okaloosa pets go to a separate facility with an onsite vet; Santa Rosa requires annual pre-registration.
- A printable one-page go-card.

**Assessment:** Highest pain severity and very linkable (county EM, UF/IFAS, vets, news during storm threats). Demand is spiky and the season ends 2026-11-30. **Build in spring 2027 and launch by 2027-05-15** so it is indexed and pitched before June 1. Brand fit is low. Evergreen alternate if a brand-fit tool is preferred instead: **Senior Dog Mobility Routine Builder** (score 3.40).

---

## Sources

**Project files:**
- `/home/angsec/Projects/kais-run/CLAUDE.md`
- `app/tools/*/page.tsx`
- `app/sitemap.ts`
- `docs/AUDIT-BLOG-TOOLS-2026-09-16.md`
- `docs/BACKLINK-PLAN.md`
- `content/blog/red-tide-dogs-emerald-coast.mdx`
- `lib/heat/verdict.ts`
- `/home/angsec/Projects/kais-run-tools-content/CONTENT-STRATEGY.md`

**Beach rules:**
- https://www.yourbeachyourplace.com/okaloosa-beaches
- https://www.yourbeachyourplace.com/walton-beaches
- https://library.municode.com/fl/okaloosa_county/codes/code_of_ordinances?nodeId=COOR_CH5ANFO_ARTIVSETUCO_S5-92GEST
- https://www.ecvr.com/okaloosa-county-beach-regulations/
- https://www.destin-ation.com/blog/can-take-dog-beach-destin/
- https://destinmiramar.com/guides/destin-beach-rules/
- https://www.mywaltonfl.gov/1329/Beach-Driving-Charter-Fishing-Dog-Beach-
- https://www.mywaltonfl.gov/DocumentCenter/View/44641
- https://www.mywaltonfl.gov/DocumentCenter/View/43694/Dog-Beach-Permit-Application-2025
- https://30a.com/dogs-on-30a/
- https://www.davisprop.com/blog/are-dogs-allowed-on-the-beach-in-south-walton/
- https://www.benchmark30a.com/emerald-coast-blog/beaches/south-walton-beach-rules-what-you-need-know
- https://www.huckandharlowe.com/pages/how-to-get-a-beach-permit-for-your-dog
- https://www.browsedestin.com/beach-permits.php
- https://www.floridastateparks.org/parks-and-trails/grayton-beach-state-park/experiences-amenities
- https://emeraldcoastinsider.com/2022/05/13/is-navarre-beach-dog-friendly
- https://www.santarosa.fl.gov/Facilities/Facility/Details/Navarre-Central-Bark-Large-Dog-Park-45
- https://myescambia.com/pensacola-beach/beach-dog-parks
- https://visitpensacolabeach.com/things-to-do-dog-beach/
- https://www.pcbfl.gov/179/Dogs
- https://www.visitpanamacitybeach.com/plan-your-trip/faqs/

**SERP competitors:**
- https://dogsbeaches.com/dog-friendly-beaches-in-destin-florida/
- https://www.destinflorida.com/things-to-do/pet-friendly-places-in-destin-florida
- https://destinmiramar.com/guides/pet-friendly-destin/
- https://thegoodlifedestin.com/dog-friendly-in-destin/
- https://www.destindreamers.com/dog-friendly-beaches-near-destin-all-you-need-to-know/
- https://www.bringfido.com/attraction/beaches/city/fort_walton_beach_fl_us/
- https://www.tripadvisor.com/ShowTopic-g34182-i111-k8034727-Any_place_in_Panhandle_where_dogs_are_allowed_on_the_beach-Destin_Florida.html
- https://www.tripadvisor.com/ShowTopic-g34234-i366-k11627602-Pet_friendly_beach_areas-Fort_Walton_Beach_Florida.html
- https://www.seaspraycondos.com/fort-walton-beach-blog/pet-friendly-fort-walton-beach
- https://www.beachcondosindestin.com/pet-friendly-destin-and-miramar-beach-a-guide-to-traveling-with-your-dog/
- https://www.holidaybeachrentals.com/panama-city-beach-dog-beach-dog-friendly-parks-guide/

**Water safety:**
- https://okaloosa.floridahealth.gov/programs-and-services/environmental-public-health/healthy-beaches/
- https://okaloosa.floridahealth.gov/2025/04/30/doh-okaloosa-water-quality-health-advisory-2/
- https://walton.floridahealth.gov/programs-and-services/environmental-health/healthy-beaches/index.html
- https://www.floridahealth.gov/community-environmental-public-health/environmental-public-health/water-quality/aquatic-toxins/beach-water-quality/
- https://www.yahoo.com/news/florida-department-health-issues-water-140455726.html
- https://myfwc.com/research/redtide/statewide/
- https://gis.myfwc.com/redtidecurrentstatus/
- https://myfwc.com/research/redtide/tools/
- https://secoora.org/red-tide-data-resources-for-florida/

**Hurricane / pets:**
- https://myokaloosa.com/emergency-management/faqs
- https://myokaloosa.gov/sites/default/files/ShelterInformation-Updated050223.pdf
- https://weartv.com/news/local/prepare-now-pet-friendly-hurricane-shelters-in-northwest-florida
- https://smallanimal.vethospital.ufl.edu/2026/05/11/hurricane-checklist-for-companion-animals/
- https://fvma.org/hurricane-preparedness-kit-for-pet-owners/
- https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness
- https://www.ready.gov/pets
- https://thisstormseason.com/evacuation-checklist/
- https://blogs.ifas.ufl.edu/bayco/2023/06/21/hurricanedog/

**Saturated-calculator evidence:**
- https://www.petobesityprevention.org/veterinary-der-calculator
- https://www.petobesityprevention.org/step-weight-loss-calculator
- https://worldpetobesity.org/caloriccalculators
- https://www.merckvetmanual.com/multimedia/clinical-calculator/chocolate-toxicity-calculator
- https://www.petpoisonhelpline.com/blog/dog-chocolate-toxicity-calculator/
- https://www.akc.org/expert-advice/health/how-to-calculate-dog-years-to-human-years/
- https://today.ucsd.edu/story/how-old-is-your-dog-in-human-years-scientists-develop-better-method-than-multiply-by-7
- https://www.calculatorsfordogs.com/cost-budget-calculators/dog-crate-size-calculator
- https://furcalc.com/dog/age-calculator

**Running / senior:**
- https://ruffwear.com/blogs/explored/4-week-5k-training-plan-for-running-with-your-dog
- https://www.kurgo.com/dog-5k-training-plan
- https://landing.nonstopdogwear.com/couchto5k
- https://www.dogster.com/dog-health-care/how-far-can-i-run-with-my-dog/
- https://vetmed.tamu.edu/news/pet-talk/jogging-with-your-dog
- https://www.petmd.com/dog/general-health/how-to-exercise-your-senior-dog
- https://www.zoetispetcare.com/blog/article/4-senior-dog-exercises

**Demand:** Google autocomplete (suggestqueries.google.com, client=firefox), pulled 2026-09-28 from an Emerald Coast IP.
