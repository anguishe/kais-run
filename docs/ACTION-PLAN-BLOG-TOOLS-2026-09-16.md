# Kai's Run - Blog + Tools Action Plan to 2026-11-04
**Generated:** 2026-09-16 | **Full report:** [`AUDIT-BLOG-TOOLS-2026-09-16.md`](AUDIT-BLOG-TOOLS-2026-09-16.md)

**The date.** Travis (2026-09-16) wants every monetized surface live by **2026-11-04**, the WoW: Forever launch, with light weekly upkeep after. Travis's time until then goes to the Super Dad rounds (through 11/12) and the WoW beta (9/17-10/21), so Claude does the code work and Travis's share is a few one-off answers.

**Honest expectation.** Blog and tools produced 1 click in 3 months, so they will not make meaningful money by 11/04. Bookings are the income, and they come from local searches on the homepage and city pages, the GBP and Facebook. What this plan buys:
1. The September work finally ships. AdSense goes, FAQ schema starts rendering, and the fall posts go live early enough to be indexed.
2. The one near-page-1 blog cluster (slatmill) starts pointing at the one affiliate that pays real money.
3. The tools stop giving wrong answers, and the embeds can earn links once outreach happens.
4. The blog publishes itself through the winter, so upkeep after 11/04 is roughly one Facebook post per publish day.

---

## CRITICAL - Fix Immediately
### C1 · Merge `feat/demonetize-and-seo-2026-09` into main and deploy (needs Travis's go: deploy is public) — ✅ 2026-09-16 (1797fb4)
**Files:** the branch (8 commits). Verified 2026-09-16 in a temporary worktree:
- clean merge
- build passes, 61/61 pages
- `check:schedule` and `check:tools` both OK
- `/vote` and Vercel Analytics untouched

**Impact:**
- Removes AdSense from every blog page.
- Turns on FAQPage schema for 5 live posts.
- Ships the puppy planner, the tool upgrades and the fall posts.
- Brings `docs/AUDIT-2026-09.md`, `MONETIZATION.md`, `BACKLINK-PLAN.md` and `PUBLISHING.md` onto main.

**Fix:**
```bash
cd ~/Projects/kais-run
git checkout main && git merge --no-ff feat/demonetize-and-seo-2026-09
npm run build && npm run check:schedule && npm run check:tools
# paste the sitemap + llms.txt lines check:schedule prints (dog-lost-fitness-over-summer, puppy planner)
git push   # Vercel deploys
```
Combine C1 with H1-H3 in the same deploy, then run IndexNow on the new URLs and use GSC URL inspection → Request indexing for the fall posts and `/tools/puppy-exercise-planner/`.

---

## HIGH - This Week (by Sun 9/20)
### H1 · Publish the two seasonal posts on deploy, not 3-9 days before their events — ❎ Travis kept the scheduled dates (10/22, 10/29)
**Files:** frontmatter `date:` in `content/blog/dog-halloween-door-safety.mdx` (10-22) and `content/blog/dog-walk-dark-after-time-change.mdx` (10-29)
**Impact:** with zero backlinks, new URLs wait weeks for a crawl, so posts dated this close to Halloween and the clock change won't be indexed in time.
**Fix:** set both dates to the deploy date. Keep the Facebook posts in `PUBLISHING.md` on their original dates, since the URL can be live before the social push. `red-tide` (9/22) and `mental-stimulation` (10/08) can stay as scheduled. **Travis decision:** if he'd rather keep the drip, move them to 9/29 and 10/6 instead.

### H2 · Fix the heat checker's night hours — ✅ 2026-09-16 (7c9ca08)
**File:** `lib/heat/verdict.ts` (`hourlyBands`, ~line 164 on the branch)
**Impact:** Destin summer nights stay above 75F, and the tool currently marks those hours as paw-burn risk. It says "No safe window today" for most of summer, which is the core question it exists to answer, and it can't be pitched to vets in that state.
**Fix:**
```ts
// ponytail: fixed daylight window, not solar elevation; tune SUN_HOURS if dawn/dusk readings look wrong
const SUN_HOURS: [number, number] = [9, 18]; // local wall-clock hours, [start, end)
function exposureAt(hourISO: string): Exposure {
  const hh = Number(hourISO.slice(11, 13));
  return hh >= SUN_HOURS[0] && hh < SUN_HOURS[1] ? "sun" : "shade";
}
// in hourlyBands():
const pavementSunF = pavementEstimateF(h.tempF, exposureAt(h.hourISO));
```
Also fix the "Conditions are currently safe." fallback at `HeatChecker.tsx:399` so it cannot render inside a non-safe card. Add a July-night case to `scripts/check-tools.mjs` (low 78, high 90, humidity 80): expect walkable hours to be at least 1.

### H3 · Link the slatmill cluster to the affiliate page — ✅ 2026-09-16 (c052a47)
**Files:**
- `content/blog/what-is-a-dog-slatmill.mdx`
- `content/blog/is-a-slatmill-safe-for-dogs.mdx`
- `content/blog/dog-treadmill-vs-walk-comparison.mdx`
- `content/blog/what-to-expect-first-slatmill-session.mdx`
- `content/blog/why-structured-runs-matter.mdx`
- `content/blog/how-to-tire-out-a-high-energy-dog.mdx`

**Impact:** these posts hold about 125 of the blog's impressions at positions 9-15. It's the only blog cluster near page 1, and none of them links to `/equipment/ronzeil-slatmill/`.
**Fix:** one sentence per post, placed where the mill is described, linking to `/equipment/ronzeil-slatmill/` ("the mill we run, and why"). Link the internal page, not Ronzeil directly: the disclosure and `rel="sponsored"` live there. No prices in the sentence.

### H4 · Take the price out of the post-footer CTA — ✅ 2026-09-16 (c052a47)
**File:** `components/blog/BlogPostBody.tsx` (after merge)
**Impact:** CLAUDE.md says "Prices never appear in editorial body copy". The live text is "Lock in 5 sessions for $200 - $40 each".
**Fix:** use the offer name only, linked to `/pricing/`, e.g. "Founding Athlete Program - limited to 20 dogs. See pricing."

### H5 · Travis: four answers, about 5 minutes each — answered 9/16: KAI26 active, no Amazon tag, no GBP yet, Bing property exists; Ronzeil commission rate still unknown
1. **Ronzeil:** is the affiliate link active, and what does it pay per sale? (MONETIZATION.md step 3)
2. **Amazon Associates:** does an account and tag exist? If yes, set `NEXT_PUBLIC_AMAZON_TAG` in Vercel. The Julius-K9 page routes 7 posts' readers to a link that earns nothing today. If no, leave it alone; it's small money.
3. **GBP:** is the Google Business Profile verified yet? It was unverified on 9/01.
4. **Bing:** was `kaisrun.xyz` added to Bing Webmaster Tools? It wasn't on 9/01, and Bing WMT is signed out in the anguisheh1 Chrome today.

---

## MEDIUM - Before 2026-10-21 (beta ends)
### M1 · Make scheduled publishing actually hands-off — ✅ 2026-09-16 (3934fe4, verified with a faked clock)
**Files:** delete `public/sitemap.xml`, add `app/sitemap.ts`
**Impact:** today each publish date still needs a hand-edited sitemap, a commit and a deploy. Generating the sitemap from the same `isPublished` gate the blog already uses makes a dated post go live and enter the sitemap within the hour, with no deploy. That's the single change that makes post-11/04 upkeep light.
**Fix:** `app/sitemap.ts` returns the static routes + published posts (via `lib/blog/posts.ts`) + city pages + tools + equipment, with trailing slashes and apex URLs, and `export const revalidate = 3600`. Keep `llms.txt` manual and refresh it once a month.

### M2 · Queue the winter posts now, dated through January — ✅ 3 approved + scheduled 11/12, 11/24, 12/10 (15afcfd)
**Skill:** `kaisrun-blog-post` (topic research, 1,250+ words, Facebook copy)
**Impact:** once M1 ships, posts written in October publish themselves through WoW launch and after. Travis's weekly job is the pre-written Facebook post.
**Fix:** 4-6 posts dated roughly every 2 weeks from 11/05 to mid-January, each with its Facebook copy appended to `docs/PUBLISHING.md`. Topics come from the skill's research, not guesses. Leave out the Snowbird tier, which is still gated.

### M3 · Make the embeds earn links, and make the tools static — ✅ embed snippet + chrome-free embed mode 2026-09-16 (7f8f7fe); tools still dynamic (static conversion skipped: no traffic to speed up)
**Files:** new `app/tools/<tool>/embed/page.tsx` ×4 (chrome-less layout), `app/tools/<tool>/page.tsx` ×4 (drop the `searchParams` read, add an "Embed this tool" block)
**Impact:** BACKLINK-PLAN Tier 4 (vets, groomers, rescues) only produces links if the host page carries a plain `<a>` outside the iframe. Moving embed to its own route also makes the 4 tool pages static and cacheable.
**Fix:** the copy block each tool page offers:
```html
<iframe src="https://kaisrun.xyz/tools/too-hot-to-walk/embed/" width="100%" height="720" style="border:0" title="Too hot to walk your dog? - Kai's Run"></iframe>
<p>Pavement heat checker by <a href="https://kaisrun.xyz/tools/too-hot-to-walk/">Kai's Run</a></p>
```
Point the old `?embed=1` URLs at `/embed/` with a redirect, so nothing already embedded breaks. The in-frame "Powered by" link gets `target="_blank"`. The embed layout has no navbar, footer form, cookie banner, popup, GA4 or Clarity.

### M4 · One puppy answer across the site — ✅ 2026-09-16 (4c69f06)
**Files:** `lib/exercise/compute.ts`, `lib/puppy/growth.ts`, `content/blog/is-a-slatmill-safe-for-dogs.mdx`
**Fix:** decide per session vs per day and the growth-plate range, then make all three say the same thing. The calculator should defer to the planner for dogs under 18 months on giant breeds.

### M5 · Next steps from the tools — ✅ 2026-09-16 (7f8f7fe); first-aid buy link skipped (no Amazon tag)
**Files:** `app/tools/dog-body-condition-score/*`, `app/tools/puppy-exercise-planner/*`, and all tool result states
**Fix:**
- Add a `/book/` CTA to the BCS and puppy results (the only two without one).
- Link the slatmill equipment page from exercise-calculator results for high-drive dogs.
- Add a buy link to `/equipment/first-aid-kit/`, but only if H5.2 yields a tag.

---

## LOW - Backlog
### L1 · De-cannibalize tool vs post titles
Retitle the tool pages and cards toward the tool wording, e.g. "Pavement Heat Checker", "Body Condition Score Calculator", "Dog Exercise Calculator". Leave the question phrasing to the posts, and cross-link each pair.

### L2 · Hygiene (one commit)
- CLAUDE.md:98 → `lib/blog/categories.ts`.
- Replace CLAUDE.md's AdSense section with "Removed 2026-09-01. Do not reintroduce."
- ✅ Ronzeil Sources link with the affiliate code (dffffad).
- FAQ for `ronzeil-slatmill-build`.
- The 4 `set-state-in-effect` lint errors.
- In-body `/book/` link in the 4 posts that lack one.
- ❎ BCS "Obese" label boundary: not a defect, scores round to the half point and 7.5 rounds to 8.
- "Climate-controlled" wording.
- Check the `app/api/heat/route.ts` hourly label against 3-hour data if `OPENWEATHER` is set in Vercel.

### L3 · Email capture for out-of-area readers
Put the existing `LeadMagnetForm` on tool results. Wait until blog or tool traffic exists; at 0 visitors a week it's a form nobody sees.

### L4 · Owner-protocol product (MONETIZATION.md §3)
Unchanged: only after the Ronzeil affiliate converts.

---

## Estimated Impact by Priority
| Group | Effort | Impact |
|---|---|---|
| C1 + H1-H4 (Claude, one deploy) | ~2 h | AdSense gone; FAQ schema on 5 posts; 5 posts + planner live early enough to index; heat tool correct in summer; slatmill cluster → affiliate |
| H5 (Travis) | ~20 min | Decides whether affiliate links earn anything at all |
| M1-M5 (Claude) | ~6-8 h across October | Publishing runs itself past 11/04; embeds can earn links; consistent tool answers |
| L1-L4 | ~3 h | Cleanliness, small CTR gains |

## Weekly upkeep from 2026-11-05 (target: 20 minutes)
1. On each publish date (about every 2 weeks), post the pre-written Facebook copy from `docs/PUBLISHING.md`, with the link in the first comment.
2. Monthly: GSC blog + tools rows against this report's table, and a `llms.txt` refresh.
3. When there's a free evening: one embed pitch to a local vet, groomer or rescue (BACKLINK-PLAN Tier 4).

---

## Post-Fix Checklist
1. `npm run build` passes with zero errors, and `npm run check:schedule` and `npm run check:tools` both pass (with the new July-night case).
2. `git push` (Vercel deploys), then verify live:
   - `curl -s https://kaisrun.xyz/blog/senior-dog-exercise/ | grep -c adsbygoogle` → `0`
   - `curl -sI https://kaisrun.xyz/ads.txt` → 404
   - `/tools/puppy-exercise-planner/` → 200
   - FAQPage JSON-LD present on `/blog/is-a-slatmill-safe-for-dogs/`
3. IndexNow for every new or changed URL (key `/1ce502e4baf14d7698a2ca357863925d.txt`).
4. GSC (`sc-domain:kaisrun.xyz`) URL inspection → Request indexing on the fall posts, the puppy planner and the 6 slatmill posts.
5. Schema check: Rich Results Test on one fall post and one tool.
