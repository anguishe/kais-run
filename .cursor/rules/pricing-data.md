---
description: All pricing, services, and business data for Kai's Run. Reference when building pricing, services, booking, or any section with prices.
globs: ["app/pricing/**", "app/services/**", "app/book/**", "components/sections/ServicesOverview*", "components/sections/FoundingOffer*", "components/ui/PricingCard*", "components/ui/SpotsCounter*"]
alwaysApply: false
---

# KAI'S RUN — PRICING & BUSINESS DATA

## Founding Athlete Program (PRIORITY OFFER)
- Price: $200 upfront for 5 sessions ($40/session effective)
- Limit: 20 dogs — hard cap, publicly displayed
- `const SPOTS_REMAINING = 20` in `SpotsCounter.tsx` — manually updated
- One-time offer. No rate lock. No lifetime pricing.
- Framing: "A rate that will never exist again. For the 20 who believed first."
- After founding phase: standard sessions start at $65

## Tier 1 — Intro Session (Kai's Run Welcome)
- 1 dog: $35 · 2 dogs same household: $55
- Duration: 30–45 min
- Includes: fitness assessment, "Run Profile" card, progress photo texted

## Tier 2 — On-Demand Single Session
- 1 dog: $65 · 2 dogs: $85
- Duration: 30–45 min · No commitment

## Tier 3 — Bundles (never expire)
- 4-pack: $220 (1 dog) / $300 (2 dogs) → $55/$75 per session
- 8-pack: $400 (1 dog) / $560 (2 dogs) → $50/$70 per session

## Tier 4 — Monthly Memberships
- Coastal Member (bi-weekly, 2×/mo): $120/mo (1 dog) / $170/mo (2 dogs)
- Emerald Member (weekly, 4×/mo): $220/mo (1 dog) / $300/mo (2 dogs) — priority booking
- Cancel anytime with 30-day notice

## Tier 5 — Snowbird Package
- 5 sessions: $275 · Valid Oct–Apr · Book before arrival

## Discounts (always on, mention at booking)
- Military/Veterans (Eglin AFB, Hurlburt Field): 15% off
- First Responders (Police, Fire, EMS): 10% off
- Teachers: 10% off

## Referral Program — "The Run Crew"
- 1 referral completes first paid session = 1 free add-on session
- 3 referrals = 1 free single session
- 5 referrals = 1 free month bi-weekly membership

## Milestone Rewards (dog mileage)
- 10 miles: digital badge + Instagram shoutout
- 25 miles: free 15-min add-on next session
- 50 miles: branded bandana or dog tag
- 100 miles: free session + website leaderboard feature

## Session Operations
- Duration: 30–45 min
- Harnesses: Julius K9 provided S/M/L (owner may bring own)
- Vaccination: Rabies required minimum
- Age: 4 months minimum
- Health exclusions: congestive heart disease, active heartworm
- Breeds: all welcome including reactive dogs
- Payment: Square Appointments (all cards + Apple/Google Pay)
- Cancellation: 24-hour notice for full refund · No-shows forfeit fee
- Post-session: photo + run report texted within 1 hour
- Confirmation: text same day + ETA text morning of session

## Booking System
- Platform: Square Appointments (free tier)
- Embed via iframe in `/book` page
- Square services to configure:
  - Kai's Run Welcome (Intro) — 45 min — $35/$55
  - Performance Session — 45 min — $65/$85
  - Founding Athlete Session — 45 min — $0 at booking (paid via form)
  - Membership Session — 45 min — $0 at booking (billed recurring)
