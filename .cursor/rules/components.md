---
description: Component structure, naming conventions, and architecture patterns. Reference when creating or editing any component.
globs: ["components/**/*"]
alwaysApply: false
---

# KAI'S RUN — COMPONENT ARCHITECTURE

## Directory Structure
```
components/
  layout/
    Navbar.tsx       ← fixed nav, scroll behavior, mobile menu
    Footer.tsx       ← 3-col layout, links, social placeholders
  sections/
    Hero.tsx                ← full-viewport cinematic hero
    SpotsCounter.tsx        ← founding offer counter + progress bar (ALSO in ui/)
    ProblemSection.tsx      ← stat cards, energy gap messaging
    SolutionSection.tsx     ← slatmill intro, 3 outcome pillars
    MobileAdvantage.tsx     ← 3 feature cards, objection killers
    FoundingOffer.tsx       ← product-launch style founding section
    ServicesOverview.tsx    ← 4 service cards → /pricing
    LeadMagnetForm.tsx      ← Formspree email capture
    AboutSection.tsx        ← Travis + Kai origin story
    FinalCTA.tsx            ← full-width closing CTA
  ui/
    Button.tsx              ← primary/secondary variants
    SpotsCounter.tsx        ← reusable counter widget
    ServiceCard.tsx         ← used in services overview
    PricingCard.tsx         ← used in pricing page
    TestimonialCard.tsx     ← future use
    FAQAccordion.tsx        ← used in /faq page
```

## Button Component API
```tsx
// components/ui/Button.tsx
interface ButtonProps {
  href?: string        // renders as <Link> if provided
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
}
// primary: bg-brand-teal text-white
// secondary: border border-brand-offwhite/30 text-brand-offwhite
```

## SpotsCounter — Critical Details
```tsx
// TOP OF FILE — UPDATE MANUALLY AS SPOTS SELL
const SPOTS_REMAINING = 20  // ← change this number when spots sell
const TOTAL_SPOTS = 20

// Progress bar fills as spots sell: sold/total * 100%
const pct = ((TOTAL_SPOTS - SPOTS_REMAINING) / TOTAL_SPOTS) * 100
```

## Animation Pattern — Every Section
```tsx
'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/variants'

<motion.div
  variants={stagger}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>
  <motion.h2 variants={fadeUp}>...</motion.h2>
  <motion.p variants={fadeUp}>...</motion.p>
</motion.div>
```

## GSAP Pattern — Scroll Storytelling
```tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function SomeSection() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.reveal', start: 'top 85%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return <section ref={ref}>...</section>
}
```

## Lenis Provider (root layout)
```tsx
// components/providers/LenisProvider.tsx
'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}
```

## Naming Rules
- Section components: PascalCase, descriptive — `FoundingOffer.tsx` not `Section3.tsx`
- All section files export a named export matching filename: `export function FoundingOffer()`
- No default exports in sections — named exports only for tree-shaking
- UI atoms use default exports: `export default function Button()`
