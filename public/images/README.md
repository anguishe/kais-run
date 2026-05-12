# Kai's Run Image Assets

## Directory Structure

- `hero/` - Homepage hero and page backgrounds
- `logos/` - Brand logos and favicon
- `about/` - About page portraits
- `banners/` - Full-width banner images
- `profile/` - Social media and OG images

## Usage in Components

All images should use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/images/[folder]/[filename]"
  alt="Descriptive alt text"
  fill // or width/height
  className="object-cover"
  unoptimized
  priority // only for above-fold images
/>
```

Canonical path strings also live in `lib/site-images.ts` (e.g. `HERO_MAIN`, `OG_IMAGE_URL`) for reuse in metadata and future refactors.

## Image Reference

### Hero Images

- `hero-main.png` - Primary homepage hero (dog on treadmill in van)
- `hero-2.png` - Athletic portrait (muscle definition)
- `hero-3.png` - Dynamic motion capture

### Logos

- `kr-logo-2.jpg` - Primary horizontal logo (navbar)
- `kr-logo-1.jpg` - Alternate logo (footer)
- `favicon.png` - Browser favicon

### About

- `travis-kai-2.png` - Cinematic portrait (recommended)
- `travis-kai-1.png` - Clean illustrated version

### Profile/Social

- `kr-vertical.png` - OpenGraph/Twitter card image

## Notes

- All images are unoptimized for GitHub Pages compatibility (`next.config.js` sets `images.unoptimized`, or set `unoptimized` on `<Image>`).
- Favicon exists in three locations: `/favicon.ico`, `app/favicon.ico`, `images/logos/favicon.png`
- Use `priority` prop only for above-the-fold images
