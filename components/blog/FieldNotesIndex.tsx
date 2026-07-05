'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import type { BlogPostMeta } from '@/lib/blog/posts';

/** Per-post branded card generated on the fly by /og (no static thumbnails to maintain). */
function cardImage(title: string): string {
  return `/og/?title=${encodeURIComponent(title)}&eyebrow=${encodeURIComponent('Field Notes')}`;
}

type Category = 'Behavior' | 'Conditioning' | 'Health' | 'Seasonal';

/**
 * Curated slug -> category map. Unmapped slugs surface under "All" only.
 * Keep in sync with the post library when new notes ship.
 */
const CATEGORY_MAP: Record<string, Category> = {
  'dog-adolescence-phase': 'Behavior',
  'dog-anxiety-destructive-behavior-exercise': 'Behavior',
  'meet-kai-the-dog-behind-kais-run': 'Behavior',
  'dog-treadmill-vs-walk-comparison': 'Conditioning',
  'high-energy-dog-breeds-exercise-guide': 'Conditioning',
  'how-much-exercise-does-my-dog-need': 'Conditioning',
  'how-to-tire-out-a-high-energy-dog': 'Conditioning',
  'what-is-a-dog-slatmill': 'Conditioning',
  'what-to-expect-first-slatmill-session': 'Conditioning',
  'why-structured-runs-matter': 'Conditioning',
  'is-my-dog-overweight': 'Health',
  'can-you-over-exercise-a-dog': 'Health',
  'senior-dog-exercise': 'Health',
  'too-hot-to-walk-your-dog': 'Seasonal',
  'calm-dog-during-fireworks': 'Seasonal',
  'dog-thunderstorm-anxiety': 'Seasonal',
  'dog-reactive-on-leash': 'Behavior',
  'dog-park-not-tiring-dog-out': 'Conditioning',
};

const FILTERS: Array<'All' | Category> = ['All', 'Behavior', 'Conditioning', 'Health', 'Seasonal'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Deterministic YYYY-MM-DD -> "Jun 18, 2026" — no Date/timezone, so no hydration drift. */
function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
}

function categoryOf(slug: string): Category | null {
  return CATEGORY_MAP[slug] ?? null;
}

export default function FieldNotesIndex({ posts }: { posts: BlogPostMeta[] }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<'All' | Category>('All');

  const featured = posts[0];
  const rest = useMemo(() => posts.slice(1), [posts]);

  const filtered = useMemo(() => {
    if (active === 'All') return rest;
    return posts.filter((p) => categoryOf(p.slug) === active);
  }, [posts, rest, active]);

  if (!featured) return null;

  // whileInView reveals — instant (no transform) when the user prefers reduced motion.
  const solo = reduceMotion
    ? {}
    : { variants: fadeUp, initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, margin: '-80px' } };
  const grid = reduceMotion
    ? {}
    : { variants: stagger, initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, margin: '-80px' } };
  const item = reduceMotion ? {} : { variants: fadeUp };

  return (
    <div className="mt-14 md:mt-16">
      {/* Featured entry — hidden when a category filter is active so the hero never shows off-category. */}
      {active === 'All' && <motion.article {...solo} className="group">
        <Link
          href={`/blog/${featured.slug}/`}
          className="block overflow-hidden rounded-2xl border border-brand-teal/20 border-t-2 border-t-brand-gold bg-brand-charcoal/40 transition duration-300 hover:-translate-y-1 hover:border-brand-teal/45"
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-[21/9] overflow-hidden bg-brand-charcoal md:aspect-auto md:h-full">
              <img
                src={cardImage(featured.title)}
                alt=""
                width={1260}
                height={540}
                decoding="async"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                style={{ aspectRatio: '21 / 9' }}
              />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10">
              <p className="font-body text-xs uppercase tracking-[0.28em] text-brand-gold">Featured</p>
              <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight text-brand-offwhite md:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl font-body text-brand-gray line-clamp-3">{featured.description}</p>
              <p className="mt-6 font-body text-xs uppercase tracking-[0.2em] text-brand-gray/80">
                {formatDate(featured.date)} · {featured.readTimeMinutes} min read
              </p>
            </div>
          </div>
        </Link>
      </motion.article>}

      {/* Category chips — teal active state; filters the grid client-side. */}
      <motion.div {...solo} className="mt-12 flex flex-wrap gap-2.5" role="group" aria-label="Filter field notes by category">
        {FILTERS.map((label) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(label)}
              className={
                isActive
                  ? 'rounded-full border border-brand-teal bg-brand-teal px-4 py-1.5 font-body text-sm font-medium text-brand-offwhite transition'
                  : 'rounded-full border border-brand-teal/30 px-4 py-1.5 font-body text-sm text-brand-gray transition hover:border-brand-teal/60 hover:text-brand-offwhite'
              }
            >
              {label}
            </button>
          );
        })}
      </motion.div>

      {/* Post grid — 1 / 2 / 3 columns, staggered reveal. */}
      {filtered.length === 0 ? (
        <p className="mt-10 font-body text-brand-gray">More notes in this category are on the way.</p>
      ) : (
        <motion.div
          key={active}
          {...grid}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((post) => {
            const cat = categoryOf(post.slug);
            return (
              <motion.article {...item} key={post.slug} className="group">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-brand-teal/15 bg-brand-charcoal/30 transition duration-300 hover:-translate-y-1 hover:border-brand-teal/45 hover:bg-brand-charcoal/50"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-brand-charcoal">
                    <img
                      src={cardImage(post.title)}
                      alt=""
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      style={{ aspectRatio: '4 / 3' }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-body text-[0.7rem] uppercase tracking-[0.22em] text-brand-teal">
                      {cat ?? 'Field notes'}
                    </p>
                    <h3 className="mt-2 font-display text-2xl leading-[1.05] tracking-tight text-brand-offwhite">
                      {post.title}
                    </h3>
                    <p className="mt-2 font-body text-sm text-brand-gray line-clamp-2">{post.description}</p>
                    <p className="mt-4 pt-1 font-body text-[0.7rem] uppercase tracking-[0.18em] text-brand-gray/75">
                      {formatDate(post.date)} · {post.readTimeMinutes} min read
                    </p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
