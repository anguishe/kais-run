# Kai's Run — Brand Reference

Authoritative brand facts for copy, code, schema, and agent context.
**Last updated:** 2026-06-04

---

## Identity

| Field | Value |
|---|---|
| Business name | Kai's Run |
| Retired name | ~~Emerald Paws Athletic Club~~ — purged, never regenerate |
| Tagline | Your Dog Deserves to Run. |
| Positioning | Private mobile canine conditioning — not dog walking, daycare, or group sessions |
| One-liner | Mobile dog slatmill sessions delivered to your driveway on the Emerald Coast |
| Aesthetic | Dark, cinematic, premium — "Equinox for dogs, delivered to your driveway" |
| Owner | Travis (born and raised in Destin, FL) |
| Origin dog / mascot | Kai — Rhodesian Ridgeback mix |

---

## Contact & Web

| Field | Value |
|---|---|
| Domain | https://kaisrun.xyz |
| Repo | anguishe/kais-run (GitHub Pages static export) |
| Phone — display | 850-218-5855 |
| Phone — E.164 / schema | +18502185855 |
| Phone — href | tel:850-218-5855 |
| Email | kaisrunmobile@gmail.com |
| Booking widget | Square Appointments |

---

## Social

| Platform | URL |
|---|---|
| Facebook | https://www.facebook.com/people/Kais-Run-Mobile-Dog-Conditioning/61589361011885/ |
| Instagram | https://www.instagram.com/kaisrun |
| TikTok | https://www.tiktok.com/@kaisrun |

---

## Service Area

Destin FL · Fort Walton Beach FL · Niceville FL · Miramar Beach FL · Sandestin FL · Shalimar FL · Mary Esther FL · Navarre FL · Santa Rosa Beach FL · Bluewater Bay FL · Valparaiso FL

**Live landing pages:**
- Destin FL → `/service-area/destin/`
- Fort Walton Beach FL → `/service-area/fort-walton-beach/`
- Niceville FL → `/service-area/niceville/`
- Miramar Beach FL → `/service-area/miramar-beach/`
- Sandestin FL → `/service-area/sandestin/`
- Shalimar FL → `/service-area/shalimar/`
- Mary Esther FL → `/service-area/mary-esther/`
- Navarre FL → `/service-area/navarre/`
- Santa Rosa Beach FL → `/service-area/santa-rosa-beach/`
- Bluewater Bay FL → `/service-area/bluewater-bay/`
- Valparaiso FL → `/service-area/valparaiso/`

**All 11 cities appear in `areaServed` schema:** Destin, Fort Walton Beach, Niceville, Miramar Beach, Sandestin, Shalimar, Mary Esther, Navarre, Santa Rosa Beach, Bluewater Bay, Valparaiso

Mobile service — we come to the client's driveway. No facility, no drop-off.

---

## Pricing — Locked

| Product | Price | Copy Notes |
|---|---|---|
| Intro Session — 1 dog | $35 | |
| Intro Session — 2 dogs (same household) | $55 | Never imply group or daycare sessions |
| Founding Athlete Program | $200 / 5 sessions | Limited 20 dogs, one-time offer — $40 effective rate, not a lifetime lock |
| Standard walk-up | TBD | Copy: "pricing announced after Founding Athlete program closes" |

---

## Design Tokens

```
brand-black:    #0F1117
brand-charcoal: #1A1F2E
brand-teal:     #0A5C52
brand-gold:     #C9963A
brand-offwhite: #F0EDE6
brand-gray:     #9A9590
```

**Fonts:** Bebas Neue (display/headings) · DM Sans 400/500/600 (body)
**Font loading:** Non-blocking `<link>` preload in `layout.tsx` — never `@import` in CSS

---

## Voice & Tone

**Use:** dog, high-drive dog, athlete, session, conditioning, slatmill, structured, performance
**Never use:** furry friend, pup, pooch, fur baby, cutesy, adorable, cute, spoil, pamper

**Style:**
- Short declarative sentences
- Plain dashes (—) not hyphens
- No exclamation points in body copy
- No hype language — the work sells itself
- Active voice, present tense where possible

**Blog voice:** Travis writing from direct experience with Kai. First-person personal observations, not generic pet content. No unattributed statistics.

**Social voice:** Posts from Kai's POV — playful, self-aware, witty. Travis referenced as "my human." Bailey (older household dog) used as supporting character/office manager.

---

## Service Description (for copy/schema use)

Kai's Run is a mobile canine conditioning service serving Destin, Fort Walton Beach, and Niceville FL. Owner Travis brings a self-powered slatmill to the client's driveway for private, one-on-one sessions. Sessions are climate-controlled, 30–45 minutes total, with 15–30 minutes of actual millwork depending on fitness level. No drop-off, no other dogs, no facility to drive to.

A slatmill is a non-motorized treadmill — the dog's own movement powers the belt. Nothing forces a minimum speed. The dog controls the pace entirely.

---

## Requirements (for FAQ/schema use)

- Minimum age: 4 months
- Rabies vaccination required
- Digital waiver required before first session
- Julius K9 harnesses provided (S/M/L)
- Vet clearance may be requested for cardiac or respiratory history
- Two-dog sessions: same household only

---

## Discounts

- Military & Veterans: 15%
- First Responders: 10%
- Teachers: 10%

---

## Schema Entity IDs (canonical, do not change)

| Entity | @id |
|---|---|
| Business | https://kaisrun.xyz/#business |
| Person (Travis) | https://kaisrun.xyz/about/#travis |
| WebSite | https://kaisrun.xyz/#website |

---

## Breeds That Benefit Most (for content/AEO use)

Belgian Malinois, Rhodesian Ridgeback, German Shepherd, Border Collie, Siberian Husky, Vizsla, Weimaraner — and any dog with sustained working drive regardless of breed classification.
