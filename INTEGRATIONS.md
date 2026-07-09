# Kai's Run — Integration Reference

All live integrations and their current status.
**Host:** Vercel SSR (Next.js App Router). Canonical = apex `https://kaisrun.xyz` — www is NOT used anywhere.
**Last updated:** 2026-06-09
**Last doc-sync:** 2026-07-06 — corrected hosting to Vercel SSR, affirmed apex canonical

> ⚠️ This file is for architecture reference only. Never commit API keys here.
> All secrets live in `.env.local` (local) and the Vercel dashboard Environment Variables (production).

---

## How Forms Work — Vercel SSR Pattern

Formspree and Cloudflare Worker remain the live form architecture. Even though Vercel supports API routes, the existing pattern (Formspree + Cloudflare Worker) stays in place.

Every form currently follows this pattern:

```
User submits form
  → fetch() to Formspree endpoint (handles email notification to Travis)
  → fetch() to Cloudflare Worker (handles Mailchimp subscription)
  → Show inline success or error state
```

**Never call the Mailchimp API directly from the client.** The Cloudflare Worker is the only bridge.

---

## Formspree Endpoints

| Form | Endpoint | Mailchimp Tag | Component |
|---|---|---|---|
| Footer signup | https://formspree.io/f/xykolrrr | footer-signup | `components/sections/WaitlistForm.tsx` via Footer |
| Contact form | https://formspree.io/f/mvzllpwg | contact-inquiry | `components/sections/ContactFormSection.tsx` |
| Founding 20 | https://formspree.io/f/mojrrvdd | founding-20 | Provisioned in Formspree, not currently wired in code |
| Energy Guide | https://formspree.io/f/mpqbbwrl | energy-guide | `components/ui/LeadMagnetForm.tsx` |

**Endpoint mapping is locked.** These were corrected once — do not remap without explicit confirmation.

---

## Mailchimp

- Audience: Kai's Run — Main List
- Audience ID: 334201f588
- Data Center: us4
- API key: `.env.local` only — `MAILCHIMP_API_KEY`

**Cloudflare Worker bridge:** `kaisrun-subscribe.kaisrunmobile.workers.dev`
POST payload expected by Worker:
```json
{
  "email": "user@example.com",
  "name": "First name",
  "tags": ["tag-name-here"]
}
```
Tags must exactly match: `contact-inquiry`, `founding-20`, `energy-guide`, `footer-signup`

---

## Analytics

| Service | ID/Key | Status |
|---|---|---|
| Google Analytics 4 | G-1P5ST40L2E | ✅ Live |
| Microsoft Clarity | wurwoh6v8a | ✅ Live |
| Google Search Console | Verification key: suiO-1Ptv6S8pmMU60QJiNoNnlwQfzXBV2F0UurKxrg | ✅ Verified |

---

## Google Ads

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads ID `AW-…` |
| `NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL` | Founding athlete conversion label |
| `NEXT_PUBLIC_INTRO_SESSION_LABEL` | Intro session booking conversion label |
| `NEXT_PUBLIC_MEMBERSHIP_LABEL` | Membership conversion label |
| `NEXT_PUBLIC_LEAD_CAPTURE_LABEL` | Lead / email capture conversion label |

> All `NEXT_PUBLIC_` variables must be set in the **Vercel dashboard** → Project → Settings → Environment Variables. Variables not set in Vercel will be undefined in production.
---

## AdSense

- Publisher ID: ca-pub-5399156622542127 (CONFIRMED CORRECT from dashboard)
- Status: Verification script live in root layout `<head>` — Auto Ads OFF
- Ad slot IDs: NOT YET OBTAINED — pending AdSense approval
- BlogPostWithAds.tsx: ad units are commented out with TODO until slot IDs received
- When slot IDs are received: uncomment ad units in BlogPostWithAds.tsx and replace
  the slot prop value with the real slot ID (format: "1234567890")
- ads.txt: located at public/ads.txt — contains ca-pub-5399156622542127

---

## Booking

- Platform: Square Appointments
- Widget script: `https://square.site/appointments/buyer/widget/x06wxfzw47ogj7/LY4W4QTX4A1PF.js`

---

## Indexing

| Service | Key/Detail |
|---|---|
| IndexNow | Key: `kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n` |
| IndexNow key file | `https://kaisrun.xyz/kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n.txt` |
| Last bulk submit | 2026-05-21 (9 pages) |

**IndexNow ping — single URL:**
```bash
curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/blog/[SLUG]/&key=kaisrun2026a7b3c9d1e4f6g8h2i5j7k0m3n"
```
> Only submit live URLs. Submitting 404 slugs causes silent batch rejection.

---

## Google Business Profile

- Status: Created, **unverified** — pending equipment arrival for video verification
- Verification method: Video walkthrough of equipment/mobile unit
- GBP footer link: Update from search query URL to actual Place ID URL after verification
- After verification: add GBP URL to `sameAs` array in `app/layout.tsx`

---

## Citation Directory Status

| Platform | Status |
|---|---|
| Google Business Profile | Created, unverified |
| Yelp | Not yet created |
| Bing Places | Not yet created |
| Apple Maps Connect | Not yet created |
| Nextdoor Business | Not yet created |
| BBB | Not yet created |
| YellowPages | Not yet created |

---

## Vercel / Deploy

- Trigger: push to `main` → automatic Vercel build
- Build: `npm run build` → Vercel SSR (`.next/`)
- Build time: ~2 minutes
- Dashboard: https://vercel.com/dashboard

> Environment variables must be set in Vercel dashboard → Project → Settings → Environment Variables. No deploy.yml or GitHub Actions workflow required.
