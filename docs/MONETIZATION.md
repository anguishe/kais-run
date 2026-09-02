# Kai's Run - Monetization

**Date:** 2026-09-01
**Status:** AdSense removed sitewide. Revenue is bookings (primary) and equipment affiliate (secondary, underbuilt).

---

## Why this site is not BashSnippets

The two projects reached the same conclusion about display ads for opposite reasons, and copying the BashSnippets playbook wholesale would be a mistake.

| | BashSnippets | Kai's Run |
|---|---|---|
| Audience | Developers, global, unbounded | Dog owners, **split by geography** |
| Ads failed because | Dev audience blocks them; RPM on technical content is near zero | **Opportunity cost** - the ad competes with a far more valuable click |
| Value per visitor | Low and flat | **Bimodal**: ~$0 or ~$300 |
| Natural product | A $9 digital product for the whole audience | Two different things for two different audiences |
| Ceiling | Traffic-bound | Local revenue is **calendar-bound**; passive revenue is traffic-bound |

That third row is the one that matters.

BashSnippets has one audience worth roughly the same each. Kai's Run has **two audiences that share a website and have almost nothing else in common**:

**Audience A - inside the service area.** Eleven cities, call it 250,000 people, of whom the high-drive-dog subset is maybe two to five thousand households. A single one of these visitors who books is worth $70 for one session and several hundred over a package. They are the business.

**Audience B - everyone else.** Someone in Ohio reading "is my dog overweight." They will never book. They currently generate **exactly zero**. They are the majority of traffic, and they are where passive income lives.

### The specific reason ads were wrong here

Not adblock. Arithmetic.

At 400 impressions per quarter, AdSense would have paid a rounding error. But even at 100x the traffic the math does not flip, because a visitor reading a conditioning article is a person who might buy a **$1,200 to $3,000 slatmill**. A display unit monetizes that person at fractions of a cent while actively competing for the click that monetizes them at two to three figures.

Display ads on a site with a high-ticket affiliate offer are not a revenue stream. They are a discount on your best one.

---

## Where the money actually is

### 1. Bookings - the business, not passive

The primary revenue and the reason the site exists. Ceiling is Travis's calendar, not traffic. Serving Audience A well is what `/services/`, `/pricing/`, `/book/` and the eleven city pages exist to do.

**Current blocker is not monetization, it is visibility.** Ten of eleven city pages are not in Google's index and the Google Business Profile is unverified. Fix those two and this line moves before anything else on this page does. See `docs/AUDIT-2026-09.md`.

Nothing here is passive. Included because it dwarfs everything below and should not be starved to chase passive revenue.

### 2. High-ticket equipment affiliate - the real passive lever

**This is the one to build.**

Dog conditioning gear has affiliate economics that dev tooling simply does not:

| Item | Ticket | Realistic commission | Per sale |
|---|---|---|---|
| **Slatmill (Ronzeil and similar)** | $1,200 - $3,000+ | 5 - 10% | **$60 - $300** |
| Motorized dog treadmill (dogPACER, GoPet) | $500 - $1,500 | 4 - 8% | $20 - $120 |
| Julius-K9 harness | $60 - $90 | 3% Amazon | $2 - $3 |
| First aid kit | $30 - $60 | 3% Amazon | $1 - $2 |

One slatmill sale is worth more than the entire realistic annual AdSense revenue at this traffic level. **The slatmill is the asset. Everything else is rounding.**

What already exists: `/equipment/ronzeil-slatmill/`, a build post, an `AffiliateLink` component, and a disclosure in the privacy policy. That is a real foundation.

What is missing:

- **All three equipment pages are uncrawled by Google.** The affiliate surface is not in the index. This is the binding constraint, not the content.
- **No purchase-intent content.** The library explains *why* conditioning works. It has nothing targeting someone with a credit card out: "how much does a dog slatmill cost", "best dog treadmill for large dogs", "slatmill vs motorized treadmill for a Malinois", "is a dog slatmill worth it". These are lower-volume and far higher-value than the informational posts.
- **`Article` schema instead of `Product` + `Review`.** Costs the rich result and, increasingly, the AI citation when someone asks an assistant whether the thing is any good.
- **Commission terms unverified.** Confirm what the Ronzeil arrangement actually pays. At this ticket size, negotiating 8 - 10% directly with a manufacturer is normal and worth an email.

Credibility note: Travis runs this equipment daily and films every session. A review written from ownership outranks and outconverts affiliate-farm content, and it is the one thing a competitor cannot copy. Never link gear that is not actually run.

### 3. A digital product that pairs with the affiliate

The obvious product - a conditioning program - competes with the service for Audience A. The non-obvious one does not.

**Sell the protocol to the people the affiliate link just sold a mill to.**

Someone buys a $2,000 slatmill through the site. They now own a large piece of equipment and no idea how to introduce a dog to it, how long a first session should be, how to read gait, when to progress, or what to do when the dog refuses. That is exactly what Travis does professionally, and it is worthless to Audience A (who are buying the service instead) and valuable to Audience B (who are on their own).

- Format: written protocol plus the session footage that already exists from `/how-we-record/`.
- Price: $29 - $49. High enough to be taken seriously, low enough to be an impulse next to a $2,000 purchase.
- Placement: on the equipment pages, in the post-purchase moment, not in the blog sidebar.
- Build it **after** the affiliate is converting. A product with no traffic is a hobby.

### 4. The tools are a backlink engine, not a revenue line

Four free tools, all with a documented `?embed=1` mode and `frame-ancestors *` already configured. Direct revenue potential: roughly zero.

Strategic value: **high, because backlinks are the site's actual blocker.**

A vet clinic, groomer, boarding facility or rescue that embeds the pavement-heat checker links back. That is the cheapest legitimate link acquisition available, it is already built, and it is the sort of link Google weights well because it is topically relevant and editorially placed.

Treat the tools as link bait with a monetization side effect, not the reverse.

### 5. Things to leave alone

- **Display ads.** Removed. Covered above.
- **Referring out-of-area leads for a fee.** Volume is too low to matter and it puts a stranger's service quality on your brand.
- **Sponsored posts.** Would compromise the one asset that is genuinely defensible here, which is that every recommendation comes from equipment Travis actually runs.
- **Gating the tools.** They are the link engine. A gate kills the links.

---

## Sequence

Ordered by return per hour. Do not skip ahead.

| # | Action | Why now |
|---|---|---|
| 1 | Verify the GBP; earn the first backlinks; add Bing | Nothing below produces revenue at 13 clicks a quarter |
| 2 | Get `/equipment/*` crawled and indexed | The affiliate surface is currently invisible to Google |
| 3 | Confirm the real Ronzeil commission rate | Determines whether this is a $60 or a $300 per-sale business |
| 4 | `Product` + `Review` schema on equipment pages | Rich results and AI citations on the revenue pages |
| 5 | Write 2 - 3 purchase-intent posts | "how much does a dog slatmill cost", "best dog treadmill for large dogs" |
| 6 | Pitch tool embeds to local vets, groomers, rescues | Solves the backlink problem and the distribution problem together |
| 7 | Build the owner protocol product | Only once the affiliate is converting |

**Realistic expectation.** Steps 1 - 2 are worth more than 3 - 7 combined and take the longest to pay off. There is no passive income at 13 clicks per quarter. The monetization plan is downstream of the indexing plan, and pretending otherwise wastes a quarter.
