---
description: Stack constraints — read before every prompt. Static export ceiling, forbidden APIs, tokens, paths.
globs: ["**/*"]
alwaysApply: true
---

# STACK CONSTRAINTS (read before every prompt)

Next.js 16 App Router · Static export (`output: 'export'`) · GitHub Pages

**Forbidden:** API routes · server actions · `next/image` · `redirects()` in `next.config.js`

**Required:** Plain `<img>` tags only · `trailingSlash: true` · TypeScript strict

## Tailwind tokens

| Token | Hex |
|---|---|
| `brand-black` | `#0F1117` |
| `brand-charcoal` | `#1A1F2E` |
| `brand-teal` | `#0A5C52` |
| `brand-gold` | `#C9963A` |
| `brand-offwhite` | `#F0EDE6` |
| `brand-gray` | `#9A9590` |

## Fonts

- `font-display` — Bebas Neue
- `font-body` — DM Sans

## Redirects

Static 301 redirects: use HTML meta-refresh pages — **NOT** `next.config.js` `redirects()`

## File paths

- MDX blog posts: `content/blog/[slug].mdx`
- City pages: `app/service-area/[city]/page.tsx`
