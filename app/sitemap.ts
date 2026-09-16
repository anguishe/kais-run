import type { MetadataRoute } from 'next';
import { getAllPostMeta } from '@/lib/blog/posts';

/**
 * Generated so a scheduled post enters the sitemap on its publish day with no
 * deploy - the same date gate that flips /blog/<slug>/ live (lib/blog/posts.ts).
 * Replaces the hand-maintained public/sitemap.xml; non-blog values carried over as-is.
 */
export const revalidate = 3600;

const SITE = 'https://kaisrun.xyz';

type Freq = 'weekly' | 'monthly' | 'yearly';
const CITIES = [
  'destin', 'fort-walton-beach', 'niceville', 'miramar-beach', 'sandestin', 'shalimar',
  'mary-esther', 'navarre', 'santa-rosa-beach', 'bluewater-bay', 'valparaiso',
];

const STATIC: [path: string, lastmod: string, freq: Freq, priority: number][] = [
  ['/', '2026-07-08', 'weekly', 1.0],
  ['/service-area/', '2026-07-08', 'monthly', 0.9],
  ...CITIES.map((c): [string, string, Freq, number] => [`/service-area/${c}/`, '2026-07-08', 'monthly', 0.9]),
  ['/tools/', '2026-07-08', 'monthly', 0.7],
  ['/tools/too-hot-to-walk/', '2026-09-16', 'monthly', 0.7],
  ['/tools/dog-exercise-calculator/', '2026-07-08', 'monthly', 0.7],
  ['/tools/dog-body-condition-score/', '2026-07-08', 'monthly', 0.7],
  ['/tools/puppy-exercise-planner/', '2026-09-01', 'monthly', 0.7],
  ['/services/', '2026-07-08', 'monthly', 0.6],
  ['/pricing/', '2026-07-08', 'monthly', 0.6],
  ['/about/', '2026-07-08', 'monthly', 0.6],
  ['/equipment/', '2026-07-09', 'monthly', 0.7],
  ['/equipment/julius-k9-idc-powerharness/', '2026-08-09', 'monthly', 0.7],
  ['/equipment/first-aid-kit/', '2026-07-09', 'monthly', 0.7],
  ['/equipment/ronzeil-slatmill/', '2026-07-10', 'monthly', 0.7],
  ['/how-we-record/', '2026-07-08', 'monthly', 0.8],
  ['/faq/', '2026-07-08', 'monthly', 0.6],
  ['/book/', '2026-07-08', 'monthly', 0.6],
  ['/privacy/', '2026-07-08', 'yearly', 0.6],
  ['/terms/', '2026-07-08', 'yearly', 0.5],
  ['/contact/', '2026-07-08', 'yearly', 0.6],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta();
  const newest = posts.map((p) => (p.dateModified ?? p.date ?? '').slice(0, 10)).sort().at(-1);

  return [
    ...STATIC.map(([path, lastModified, changeFrequency, priority]) => ({
      url: `${SITE}${path}`, lastModified, changeFrequency, priority,
    })),
    { url: `${SITE}/blog/`, lastModified: newest, changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}/`,
      lastModified: (p.dateModified ?? p.date)?.slice(0, 10),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
