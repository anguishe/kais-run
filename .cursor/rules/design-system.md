---
description: Design system tokens, typography, animation rules. Reference when building any component or page.
globs: ["components/**/*", "app/**/*", "styles/**/*", "tailwind.config.*"]
alwaysApply: false
---

# KAI'S RUN — DESIGN SYSTEM

## Colors (Tailwind tokens)
| Token | Hex | Use |
|---|---|---|
| `brand-black` | `#0F1117` | Page background |
| `brand-charcoal` | `#1A1F2E` | Card/section backgrounds |
| `brand-teal` | `#0A5C52` | Primary accent, CTAs, borders |
| `brand-gold` | `#C9963A` | Highlights, stat numbers, premium callouts |
| `brand-offwhite` | `#F0EDE6` | Primary text |
| `brand-gray` | `#9A9590` | Secondary text, subtitles |

## Typography
- Display font: `font-display` → Bebas Neue (headlines, hero text, section titles)
- Body font: `font-body` → DM Sans (all other text)
- Hero headlines: `text-7xl md:text-9xl font-display tracking-tight`
- Section titles: `text-5xl md:text-7xl font-display`
- Body: `text-base md:text-lg font-body text-brand-gray`

## Aesthetic Rules — ENFORCE STRICTLY
- Background always `bg-brand-black` or `bg-brand-charcoal` — never white or light
- NO rounded cartoon elements · NO pet-service clip art · NO playful icons
- NO bounce animations · NO spring easing
- Section padding: `py-section` (7rem)
- Cards: `bg-brand-charcoal border border-brand-teal/20 rounded-xl`
- CTA primary: `bg-brand-teal text-white hover:bg-brand-teal/90`
- CTA secondary: `border border-brand-offwhite/30 text-brand-offwhite hover:border-brand-offwhite`

## Animation — framer-motion only for UI, GSAP for scroll
Import variants from `@/lib/variants`:
```ts
import { fadeUp, stagger, scaleIn } from '@/lib/variants'
```
- Easing: `[0.22, 1, 0.36, 1]` cubic bezier — always
- `whileInView` with `viewport={{ once: true, margin: '-80px' }}`
- Stagger children: `0.12s`
- Never use `spring`, `bounce`, or `elastic` easing

## Component Patterns
```tsx
// Section wrapper
<section className="py-section px-6 bg-brand-black">
  <div className="max-w-6xl mx-auto">...</div>
</section>

// Card
<div className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-8">

// Gold accent number
<span className="font-display text-brand-gold text-6xl">

// Teal label above headline
<p className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-4">
```

## Image Placeholders
All images TBD — use dark placeholder divs:
```tsx
<div className="w-full aspect-video bg-brand-charcoal border border-brand-teal/10 rounded-xl flex items-center justify-center">
  <span className="text-brand-gray text-sm"><!-- REPLACE WITH REAL PHOTO --></span>
</div>
```
