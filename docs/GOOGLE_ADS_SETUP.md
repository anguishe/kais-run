# Google Ads — Conversion tracking setup (Kai's Run)

This project loads **Google Ads gtag.js** in the root layout (`components/GoogleAds.tsx`) and fires conversions from `lib/googleAds.ts` (founding athlete, intro session, membership, lead capture). AdSense display units are separate (`components/analytics/GoogleAdSense.tsx`).

For a concise env reference, see [README.md](../README.md#google-ads-integration). This document is the full operational guide.

---

## 1. Google Ads account prerequisites

1. Sign in to [Google Ads](https://ads.google.com/).
2. Confirm you have **admin or standard** access to the account that owns the website conversions.
3. Ensure **Google Tag** / **gtag.js** is allowed by your privacy policy and consent approach (this site loads gtag in `<head>` when `NEXT_PUBLIC_GOOGLE_ADS_ID` is set).

---

## 2. Step-by-step: create conversion actions

Conversions tell Google Ads which website actions count as goals (e.g. form submit, booking).

1. In Google Ads, open **Goals** (or **Tools and settings** → **Measurement** → **Conversions** — UI labels vary by account version).
2. Click **New conversion action** (or **+**).
3. Choose **Website** (or **Web**).
4. Enter your site URL when prompted; Google may offer to scan the site (optional).
5. For each business action, create a **separate** conversion action (recommended for Kai's Run):

   | App use | Suggested conversion name | How the site fires it |
   |--------|---------------------------|------------------------|
   | Founding athlete | Founding athlete signup | `trackFoundingAthlete` after founding form / thank-you |
   | Intro session booked | Intro session | `trackIntroSession` after Square booking / thank-you |
   | Membership | Membership purchase | `trackMembership` on thank-you |
   | Lead / email | Lead capture | `trackLeadCapture` on energy guide & email capture forms |

6. Set **value** options per action (e.g. use default values, transaction-specific values, or “don’t use a value” — the app sends values from code for founding/intro/membership where applicable).
7. Save each action.

---

## 3. Where to find the conversion ID and labels

After creating a **Website** conversion, Google shows installation instructions.

- **Conversion ID** (also called Google tag ID): looks like `AW-123456789`. This is the full token used in `gtag('config', 'AW-…')` and as the **prefix** in `send_to`.
- **Conversion label**: a string that looks like `AbCdEfGhIjKlMnOp` (alphanumeric, often mixed case). It is **only the label segment**, not `AW-…`.

In many Google Ads UIs, open the conversion action → **Tag setup** / **Use Google Tag Manager** or **Install manually** — the snippet contains something like:

```text
gtag('event', 'conversion', {
  'send_to': 'AW-123456789/AbCdEfGhIjKlMnOp',
  ...
});
```

- Put `AW-123456789` in `NEXT_PUBLIC_GOOGLE_ADS_ID`.
- Put `AbCdEfGhIjKlMnOp` (the part **after** the `/`) in the matching `NEXT_PUBLIC_*_LABEL` variable.

**Important:** Do not paste the full `send_to` string into label env vars — only the label after `/`.

---

## 4. Add values to `.env.local`

1. Copy `.env.local.example` to `.env.local` if you do not have one yet.
2. Set:

   - `NEXT_PUBLIC_GOOGLE_ADS_ID` — your `AW-…` ID.
   - `NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL` — label for founding conversions.
   - `NEXT_PUBLIC_INTRO_SESSION_LABEL` — label for intro booking conversions.
   - `NEXT_PUBLIC_MEMBERSHIP_LABEL` — label for membership conversions.
   - `NEXT_PUBLIC_LEAD_CAPTURE_LABEL` — label for email/lead conversions.

3. Restart `npm run dev` after changing env vars (Next.js reads `NEXT_PUBLIC_*` at build/start).

Never commit `.env.local`. Labels are not as sensitive as API secrets but should stay out of git.

---

## 5. Local testing (development)

- Run `npm run dev` and open any page: confirm **gtag** loads (Network tab: `googletagmanager.com/gtag/js?id=AW-…`).
- Use the **Ads dev** panel (bottom-right, development only) to fire **test conversions** and inspect masked env keys plus a **recent conversions** log (populated when gtag successfully receives an event).
- Use `lib/googleAds.test.ts` in the browser console (dynamic import) or from temporary code:

  ```ts
  import { isGtagLoaded, simulateTestConversion } from "@/lib/googleAds.test";
  ```

- Prefer a **Google Ads test campaign** or limited budget when validating so real money is not spent while iterating.

---

## 6. Testing checklist before going live

Use this list before pointing paid traffic at the site.

- [ ] gtag.js script loads on all pages
- [ ] No console errors related to ads
- [ ] Ad blocks render with correct styling
- [ ] Ads are responsive (test mobile + desktop)
- [ ] Founding athlete conversion fires on form submit
- [ ] Intro session conversion fires on booking
- [ ] Email capture conversion fires on form submit
- [ ] Conversion values are correct
- [ ] Environment variables are properly loaded
- [ ] No layout shift when ads load
- [ ] Ads don't appear on `/book` page
- [ ] Static export builds successfully (`npm run build`)

**Conversion value sanity (matches app today):**

- Founding thank-you: **200** USD (`ThankYouConversionTracker`).
- Intro thank-you: **35** (one dog) or **55** (two dogs) from `dogs` query param.
- Membership: from `value` and `tier` query params on thank-you.
- Lead capture: **0** USD (fixed in `trackLeadCapture`).

---

## 7. Troubleshooting

| Symptom | Things to check |
|--------|------------------|
| Conversions never appear in Google Ads | Allow 3–24h for reporting; verify conversion action is **primary** vs **secondary** as intended; check **Tag diagnostics** in Google Ads. |
| gtag loads but no conversion in dev log | Missing `NEXT_PUBLIC_*_LABEL` or `NEXT_PUBLIC_GOOGLE_ADS_ID`; label must not include `AW-` or `/`. |
| `send_to` errors in console | ID/label mismatch — regenerate snippet from Google Ads and compare. |
| Double counting | Thank-you page uses a ref to fire once per load; booking flow uses `sessionStorage` helpers in `lib/bookIntent.ts` for intro — do not remove dedupe without a replacement. |
| Ad block blank / “adsbygoogle.push error” | AdSense `client` id and slot markup; ad blockers; consent. |
| Layout jump when ad fills | `AdSection` / `AdBlock` reserve min-height — compare before/after in Performance panel. |
| Build fails on CI | Ensure all `NEXT_PUBLIC_*` used in client code exist in CI env if you gate builds on them (optional pattern). |

**Official references**

- [Google Ads conversion tracking](https://support.google.com/google-ads/answer/6331314)
- [gtag.js event: conversion](https://developers.google.com/tag-platform/gtagjs/reference#event_conversion)

---

## 8. Related files (for developers)

| File | Role |
|------|------|
| `components/GoogleAds.tsx` | Loads gtag + `config` for `AW-…` |
| `lib/googleAds.ts` | `trackConversion`, `trackFoundingAthlete`, `trackIntroSession`, `trackMembership`, `trackLeadCapture` |
| `lib/googleAds.test.ts` | Dev helpers: `isGtagLoaded`, `simulateTestConversion`, mock scenarios, debug logger |
| `app/thank-you/ThankYouConversionTracker.tsx` | Query-param driven conversions |
| `components/DevTools.tsx` | Dev-only UI panel |
| `components/ads/AdBlock.tsx` | AdSense units (not the same as conversion tags) |
