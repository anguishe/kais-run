# Approval Package - 2026-09-28

Everything below is in the **working tree only**. Nothing is committed, pushed, or deployed.
Verified at the end of the session: `npm run build` exit 0; `npm run check:schedule` "Schedule OK" (24 live, 11 scheduled).

Travis's decisions applied (2026-09-28): business parked; goal is traffic to posts and tools; every post ends with the
most relevant free tool link and then a launch-list line; no `/book/` or intro-session CTAs in posts; true author
claim; canonical is the apex (kaisrun.xyz); no em dashes anywhere.

---

## 1. The five queued posts

| # | Publish date | Slug | Title | Words (body) | Ends with tool | Status |
|---|---|---|---|---|---|---|
| 1 | 2026-12-17 (Thu) | `overtired-puppy-witching-hour` | Your New Puppy Isn't Wild. It Hasn't Slept. | ~1,950 | Puppy Exercise Planner | Draft (existing), closing updated |
| 2 | 2027-01-05 (Tue) | `why-does-my-dog-pull-on-the-leash` | Your Dog Doesn't Pull Because It's Rude. You Walk at the Wrong Speed for It. | ~1,910 | Dog Exercise Calculator | Draft (existing), closing updated |
| 3 | 2027-01-14 (Thu) | `how-to-build-muscle-on-a-dog` | Walking Maintains Muscle. It Does Not Build It. | ~2,150 | Body Condition Score Checker | **New** |
| 4 | 2027-01-28 (Thu) | `can-you-take-your-dog-to-the-beach-destin` | Your Dog Can't Go on Most Destin Beaches. Here Is Where It Can Go. | ~2,130 | Dog Beach Checker | **New, GATED** |
| 5 | 2027-02-11 (Thu) | `why-does-my-dog-get-zoomies` | Zoomies Are Not a Personality. They Are a Release Valve. | ~1,650 | Dog Exercise Calculator | **New** (the plan's best alternate; hip dysplasia needs a vet read) |

**Date change vs. your brief:** you asked for beach 1/14 and muscle 1/28. I swapped them. The beach post links the Dog
Beach Checker, which does not exist yet, and your rule was that the beach post goes out after the tool ships. That gives
the build until **2027-01-21** (hard gate). If the tool is not live by then, move posts 4 and 5 (the zoomies post links
the checker too). The procedure is in `docs/specs/DOG-BEACH-CHECKER-SPEC.md` section 10.

Sources used in the new posts (attributed in plain language in the body):
- **Muscle:** McLean, Millis & Levine 2019, University of Tennessee, *Frontiers in Veterinary Science*, 12 dogs, EMG of
  rehab exercises; Miro et al. 2020, University of Cordoba, *Animals*, greyhounds uphill/downhill EMG; Freeman et al.
  2019, *AJVR*, 40 dogs, muscle condition score (Tufts); Pagano et al. 2015, University of Naples, *Vet J*, 25 geriatric dogs.
- **Beach:** primary ordinance text, see the spec section 2 (Okaloosa Sec. 5-25(a)(6); Destin Sec. 4-7(a)(6); Walton
  Sec. 22-31 per Ord. 2025-22, **hours confirmed 3:30 PM to 8:30 AM year-round**; FL Admin Code 62D-2.014(13); NPS
  Gulf Islands pets page; Santa Rosa Sec. 4-37(b); Escambia Sec. 10-24/10-25; PCB Sec. 7-9 + city page; FWB and Destin
  dog park pages). No fee or fine amounts appear in copy.
- **Zoomies:** Cornell College of Veterinary Medicine, Riney Canine Health Center, "What are zoomies?"

## 2. What Travis must approve

1. **The five posts** (read all five; the three new ones have not been seen).
2. **The date swap**: 1/14 muscle, 1/28 beach, 2/11 zoomies.
3. **Facts in the new posts**:
   - Beach post: "I was born and raised in Destin" and "Every winter I get some version of the same message" from
     snowbirds. The first is from the blog skill. The second is a framing line. Confirm it is fair, or I will cut it.
   - Beach post Kai sign-off: "I have lived in Okaloosa County my entire life."
   - Muscle post: "I condition Kai on one in a Julius-K9 harness" and "Kai trots when he has open ground" (you confirmed both).
   - Zoomies post: no Kai facts beyond the sign-off ("I do my running on a mill").
4. **The CTA sweep across all 32 posts**: every post now ends with `**Free tool:** ...` and then "Kai's Run is not taking
   dogs yet. Join the launch list...". Several posts also had mid-body lines rewritten (listed in section 4).
5. **The author box** (`components/blog/BlogPostBody.tsx`) now reads: "Travis builds and tests the Kai's Run tools and
   conditioning programs with Kai, his own high-drive dog, on the self-powered slatmill he built in Destin." The
   "Become a Founding Athlete / Claim Your Spot" block under every post is now "Free tools for your dog", which links `/tools/`.
6. **The Dog Beach Checker spec** (build go/no-go, ship target 2026-12-15).
7. **The tool upgrades ranking** (which features to build first).
8. **The three new FB posts** (sections 11-13 in `docs/PUBLISHING.md`, and the POST.txt files).

## 3. Ship checklist (after approval)

1. Commit and push to `main` before **2026-12-17**. That covers everything in section 4, the two docs folders, and the plan.
2. Build the Dog Beach Checker. Ship it with all of the spec's "[ON SHIP]" link edits in the same commit. Deadline **2027-01-21**.
3. Re-verify the beach rules the week of **2027-01-18**.
4. On each publish day, post to FB with the staged card, and put the URL in the first comment within about a minute. That week, paste the `llms.txt` line printed by `check:schedule`, ping IndexNow, and run GSC URL inspection.

---

## 4. Every changed or new file

### New content (uncommitted)
- `content/blog/how-to-build-muscle-on-a-dog.mdx` (1/14)
- `content/blog/can-you-take-your-dog-to-the-beach-destin.mdx` (1/28)
- `content/blog/why-does-my-dog-get-zoomies.mdx` (2/11)
- `content/blog/overtired-puppy-witching-hour.mdx` (12/17, existing draft): closing replaced
- `content/blog/why-does-my-dog-pull-on-the-leash.mdx` (1/5, existing draft): closing replaced

### Existing posts, closing CTA replaced (tool line + launch-list line)
Posts that now point to the **Dog Exercise Calculator**:
- `can-my-dog-run-a-5k-with-me`
- `can-you-over-exercise-a-dog`
- `dog-anxiety-destructive-behavior-exercise`
- `dog-halloween-door-safety`
- `dog-lost-fitness-over-summer`
- `dog-park-not-tiring-dog-out`
- `dog-reactive-on-leash`
- `dog-treadmill-vs-walk-comparison`
- `dog-walk-dark-after-time-change`
- `high-energy-dog-breeds-exercise-guide`
- `how-cold-is-too-cold-for-dogs`
- `how-much-exercise-does-my-dog-need`
- `how-to-tire-out-a-high-energy-dog`
- `is-a-dog-treadmill-worth-it`
- `is-a-slatmill-safe-for-dogs`
- `meet-kai-the-dog-behind-kais-run`
- `mental-stimulation-vs-exercise-dog`
- `red-tide-dogs-emerald-coast`
- `ronzeil-slatmill-build`
- `senior-dog-exercise`
- `what-is-a-dog-slatmill`
- `what-to-expect-first-slatmill-session`
- `why-structured-runs-matter`
- `why-we-record-every-session`

Posts that point to **Too Hot to Walk**:
- `calm-dog-during-fireworks`
- `dog-thunderstorm-anxiety`
- `mobile-dog-gym-destin-fl`
- `too-hot-to-walk-your-dog`

The other two:
- `is-my-dog-overweight` points to the **Body Condition Score** checker.
- `dog-adolescence-phase` points to the **Puppy Exercise Planner**.

Where a post ends in an FAQ, the closing block sits under a `## Keep going` heading. Otherwise the FAQ parser would read it as a question. This also fixed an existing leak in `calm-dog-during-fireworks`, where the booking paragraph had been parsed into the last FAQ answer.

**Mid-body rewrites** (booking invitations removed; review these):
- `can-you-over-exercise-a-dog` :85
- `dog-anxiety-destructive-behavior-exercise` :84
- `how-to-tire-out-a-high-energy-dog` :108-114 (the service section is now framed as "being built")
- `high-energy-dog-breeds-exercise-guide` :124-126
- `is-a-dog-treadmill-worth-it` :86
- `dog-walk-dark-after-time-change` :82
- `too-hot-to-walk-your-dog` :66
- `mobile-dog-gym-destin-fl` :43, :53, :61, closing
- `what-to-expect-first-slatmill-session` :69, :95, :111 (the phone number is now "call your vet"), and the closing text-me line was removed
- `why-structured-runs-matter` :75
- `ronzeil-slatmill-build` :87

**`red-tide-dogs-emerald-coast.mdx`:**
- Line 54 no longer implies that local dogs run on the beach. It now says Okaloosa bans dogs on public beaches, Destin has its own ban, and it names the legal alternatives.
- The last line says "go back to your outdoor routine".
- `dateModified` is now 2026-09-28.

### Components / lib / public
- `components/blog/BlogPostBody.tsx`: the author box claim is corrected, and the Founding Athlete / `/book/` block is replaced with a free-tools block.
- `components/ui/LaunchWaitlist.tsx`: added `id="launch-list"` so the in-post link has an anchor.
- `lib/blog/categories.ts`: added 3 `CATEGORY_MAP` entries (muscle: Conditioning, beach: Seasonal, zoomies: Behavior).
- `lib/service-area/cities.ts`: corrected the **live factual error** on the Santa Rosa Beach page. It said the Walton dog hours were "4 p.m. to 8 a.m. through spring and summer". It now says 3:30 p.m. to 8:30 a.m., residents and property owners only.
- `public/llms.txt`: added the red tide post.

### Docs
- `docs/specs/DOG-BEACH-CHECKER-SPEC.md` (new): verified rules table with citations, UI, `/api/heat` reuse, metadata, schema, embed route and snippet, rental-host card, the full internal link map, and dates.
- `docs/specs/TOOL-UPGRADES-2026-09-28.md` (new): 16 features across 5 tools, ranked by impact and effort, with the incumbents and monetization hooks for each tool. The top 5 are:
  1. Static embed routes with presets, for all tools. This also fixes the caching problem.
  2. A beach rules matrix with a change log.
  3. A beach rental-host kit.
  4. 48-hour heat walk windows with a share URL.
  5. A puppy "is this OK" activity lookup.
- `docs/PUBLISHING.md`: added 3 schedule rows and FB sections 11-13 (all marked DRAFT). The header points here.
- `docs/BLOG-PLAN-2026-Q4.md`: added an update note, and em dashes were removed.
- `docs/APPROVAL-PACKAGE-2026-09-28.md`: this file.

### Outside the repo
- `~/Projects/kais-run-assets/social-cards/blog-fb-winter-2026-27/` (not a git repo):
  - New folders `11-01-14-how-to-build-muscle-on-a-dog/`, `12-01-28-can-you-take-your-dog-to-the-beach-destin/` and `13-02-11-why-does-my-dog-get-zoomies/`. Each has `card-fb.png`, `card-4x5.png` and a DRAFT `POST.txt`, built with `build_fieldnotes_card.sh`, series "WINTER 2027 · FIELD NOTES".
  - `README.txt` updated.
- Skill files, now in line with the repo:
  - `~/.claude/skills/kaisrun-blog-post/SKILL.md`, plus the same copy in `~/.claude/skills/synced/.../kaisrun-blog-post/SKILL.md`. Changes:
    - www is now the apex.
    - The CTA rule is now the tool line plus the launch-list line, with no `/book/`.
    - The front matter matches the repo, and posts are `content/blog/<slug>.mdx` with a CATEGORY_MAP entry.
    - Em dashes are removed from the skill's own text.
  - `~/.claude/skills/kaisrun-context/SKILL.md` and `.claude/skills/kaisrun-context/SKILL.md`. Changes:
    - "Plain dashes" with an em dash now says spaced hyphens only, em dashes banned.
    - The blog checklist is updated.
    - Em dashes are removed.
  - Backup of the original blog skill: scratchpad `kaisrun-blog-post.SKILL.bak`.

---

## 5. Open questions

1. **Navbar and footer still say "Book Now" and link to `/book/`** on every page (`components/layout/Navbar.tsx:105,179`
   plus the footer). This was outside the "posts + author component" scope, so I left it. Should it become "Join the
   launch list" or "Free tools"?
2. **Markdown tables render as raw pipes.** The MDX pipeline has no `remark-gfm`, so the tables in
   `what-is-a-dog-slatmill`, `dog-treadmill-vs-walk-comparison` and `high-energy-dog-breeds-exercise-guide` show up on
   the live site as `| ... |` text (confirmed in the built HTML). Adding `remark-gfm` is a small fix, but it touches
   the renderer. Approve it?
3. **Other surfaces still read as "open for sessions":**
   - `public/llms.txt` has a Pricing section and "What Happens During a Session".
   - `/pricing/`, `/services/` and `/faq/` are unchanged.
   - `CLAUDE.md` still says booked sessions are the primary monetization.
   - Should the parked framing reach these too?
4. **Leftover stale bits in the skills:**
   - `kaisrun-context` still lists pricing ("Standard walk-up TBD") and "public/sitemap.xml (update manually)". The sitemap is now generated by `app/sitemap.ts`.
   - The synced claude.ai copy of `kaisrun-blog-post` may be overwritten by the next sync. Update it in claude.ai too.
5. **Beach post unknowns, kept out of the copy:**
   - Destin Ord. 26-17-CC (8/3/26) changed the city's "beach" definition, and I have not read it.
   - No official source covers the Destin Harbor Boardwalk or Crab Island. The post says so.
   - The hours for the PCB dog beach are unverified. The post gives none.
   - Bay access at Liza Jackson is unconfirmed. The post does not claim it.
6. **Zoomies vs. hip dysplasia as the alternate.** I chose zoomies because hip dysplasia needs a vet review first.
   Zoomies sits next to the puppy post. The zoomies post covers adult dogs and links the puppy post for young ones.
7. **"Generation Pup"** (a study name in the puppy post) contains a banned word as a proper noun. It is kept as is.
