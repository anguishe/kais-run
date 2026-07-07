# Kai's Run — Priority Reindex List
**Generated:** 2026-07-05 | **After:** GSC-FIX-PROMPT-DECK.md implemented + pushed live
**Action:** Submit each URL via GSC → URL Inspection → Request Indexing, in this order

---

## P1 — content directly rewritten (strongest fresh-crawl signal)
1. `/service-area/miramar-beach/` — full rewrite, was thin
2. `/service-area/sandestin/` — full rewrite, was thin
3. `/faq/` — canonical dedup fix
4. `/about/` — canonical dedup fix + blurb rewrite
5. `/` — homepage, About blurb + Benefits section + video robots fix

## P2 — CTA/boilerplate de-duplicated, unchanged structure
6. `/service-area/destin/`
7. `/service-area/fort-walton-beach/`
8. `/service-area/niceville/`
9. `/service-area/shalimar/`
10. `/service-area/mary-esther/`
11. `/service-area/navarre/`
12. `/service-area/santa-rosa-beach/`
13. `/service-area/bluewater-bay/`
14. `/service-area/valparaiso/`
15. `/service-area/` (hub page)

## P3 — internal-link fix only (getRelatedPosts), content unchanged
16. `/blog/calm-dog-during-fireworks/` — biggest link-count gain, prioritize first of the 4
17. `/blog/what-to-expect-first-slatmill-session/`
18. `/blog/can-you-over-exercise-a-dog/`
19. `/blog/is-my-dog-overweight/`

---

**Skip:** `www.kaisrun.xyz` (redirect target, not indexable), `/videos/kai-loop.webm` (now blocked via robots.txt, don't request index).

Also resubmit `sitemap.xml` via GSC Sitemaps report if lastmod changed.

---

**Heads up, unrelated to this list:** separate rollout already shipped standard pricing
(Intro/Private/Packages, commit `3d5b89f`) live on kaisrun.xyz as of 2026-07-05 — worth
checking whether that overlaps/conflicts with Prompt 3 in GSC-FIX-PROMPT-DECK.md (which
assumed pricing was still locked/TBD). That repo also has its own `PROMPT-DECK.md` from
that rollout, separate from GSC-FIX-PROMPT-DECK.md.
