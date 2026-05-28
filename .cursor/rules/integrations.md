---
description: Integration specs for Square Appointments, Formspree, and analytics. Reference when building /book page, lead capture forms, or adding tracking.
globs: ["app/book/**", "components/sections/LeadMagnetForm*", "components/ui/LeadMagnetForm*", "app/thank-you/**"]
alwaysApply: false
---

# KAI'S RUN — THIRD-PARTY INTEGRATIONS

## Square Appointments (Booking System)
Platform: squareup.com/appointments (free tier)
Embed method: iframe embed code from Square dashboard

### Placeholder Implementation
```tsx
{/* SQUARE APPOINTMENTS EMBED
    Setup steps:
    1. Go to squareup.com/appointments
    2. Create services: Kai's Run Welcome ($35/$55), Performance Session ($65/$85),
       Founding Athlete ($0 — paid via form), Membership ($0 — billed recurring)
    3. Appointments → Settings → Online Booking → Embed
    4. Copy iframe code and replace this div */}
<div className="w-full min-h-[600px] bg-brand-charcoal border border-brand-teal/30 rounded-xl flex items-center justify-center">
  <p className="text-brand-gray text-sm text-center px-8">
    Booking system loading...<br />
    <span className="text-brand-teal">Or call/text: 850-218-5855</span>
  </p>
</div>
```

### URL Param Handling on /book
```tsx
// Read on client side — static export compatible
const params = new URLSearchParams(window.location.search)
const offer = params.get('offer')   // 'founding' → show founding callout
const type = params.get('type')     // 'intro' → pre-select intro session
```

## Formspree (Email Capture)
Platform: formspree.io (free tier — 50 submissions/month)
Form ID placeholder: `YOUR_FORM_ID`

### Implementation Pattern
```tsx
// components/ui/LeadMagnetForm.tsx or components/sections/LeadMagnetForm.tsx
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
// REPLACE YOUR_FORM_ID: formspree.io → New Form → copy ID from URL

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(formData)
  })
  if (res.ok) setStatus('success')
  else setStatus('error')
}
```

### Form Fields
- First Name (text, required)
- Dog's Name (text, required)
- Dog's Breed (text, required)
- Email Address (email, required)
- Hidden: `_subject` = "New Lead - Kai's Run Energy Guide"

### Success/Error Messages
- Success: "Check your email — your guide is on the way. We'll also send info on the Founding Athlete Program."
- Error: "Something went wrong. Call or text us at 850-218-5855."

## Lead Magnet Offer
- Name: "The High-Drive Dog Energy Guide"
- Format: Free PDF (create separately — not part of website build)
- Placement: Homepage (between ServicesOverview and AboutSection) + FAQ page bottom
- Section headline: "FREE GUIDE: Tire Out Your High-Drive Dog."
- Section sub: "Get the Emerald Coast Dog Energy Guide — structured exercise for working breeds. Free. No spam."

## Analytics
GA4 is not used on this site. Microsoft Clarity (`NEXT_PUBLIC_CLARITY_ID`) loads via `components/analytics/MicrosoftClarity.tsx` with `next/script` and `strategy="afterInteractive"` — compatible with static export. Never block render with analytics scripts.

## Mailchimp (Post-Launch)
Connect via Formspree webhook — Formspree can forward submissions to Mailchimp automatically.
No code changes needed — configure in Formspree dashboard.
