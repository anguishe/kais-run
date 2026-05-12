# kais-run

Kai's Run — mobile dog conditioning (Next.js, static export).

## Google Ads integration

Conversion tracking uses **gtag.js** with your Google Ads **conversion ID** (`AW-…`) and per-action **conversion labels**. The tag is injected from `components/GoogleAds.tsx`; helpers live in `lib/googleAds.ts`.

### Quick start

1. In Google Ads, create **website** conversion actions for founding athlete, intro session, membership, and lead capture (see full steps below).
2. Copy `.env.local.example` to `.env.local`.
3. Set `NEXT_PUBLIC_GOOGLE_ADS_ID` to your `AW-…` value and each `NEXT_PUBLIC_*_LABEL` to the **label only** (the part after `/` in `send_to`).
4. Run `npm run dev`, confirm gtag loads in the Network tab, and use the **Ads dev** panel (bottom-right, development only) to fire test conversions.

**Full documentation:** [docs/GOOGLE_ADS_SETUP.md](docs/GOOGLE_ADS_SETUP.md) — account setup, where labels live, testing checklist, troubleshooting.

### Environment variables (Google Ads)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads ID `AW-…` for `gtag('config', …)` |
| `NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL` | Founding athlete conversion label |
| `NEXT_PUBLIC_INTRO_SESSION_LABEL` | Intro session booking conversion label |
| `NEXT_PUBLIC_MEMBERSHIP_LABEL` | Membership conversion label |
| `NEXT_PUBLIC_LEAD_CAPTURE_LABEL` | Lead / email capture conversion label |

### Testing utilities

- **`lib/googleAds.test.ts`** — `isGtagLoaded()`, `simulateTestConversion()`, `MOCK_CONVERSION_SCENARIOS`, `createGoogleAdsDebugLogger()`, plus re-exports for the dev conversion log (`getAdsDevEventLog`, `clearAdsDevEventLog`, `GOOGLE_ADS_DEV_LOG_EVENT`).
- **`components/DevTools.tsx`** — development-only panel to trigger test conversions and inspect recent fired events (wired from `app/layout.tsx` when `NODE_ENV === 'development'`).

### Scripts

```bash
npm run dev    # local development
npm run build  # static export (required before go-live checklist)
npm run lint
```
