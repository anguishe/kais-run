import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPostMeta } from '@/lib/blog/posts';

export const metadata: Metadata = {
  title: "Blog | Kai's Run — Mobile Dog Gym",
  description:
    'Field notes on canine conditioning, slatmill sessions, and life on the Emerald Coast.',
  alternates: { canonical: 'https://kaisrun.xyz/blog/' },
  openGraph: {
    title: "Blog | Kai's Run — Mobile Dog Gym",
    description:
      'Field notes on canine conditioning, slatmill sessions, and life on the Emerald Coast.',
    type: 'website',
    url: 'https://kaisrun.xyz/blog/',
    images: [
      {
        url: 'https://kaisrun.xyz/images/og-image.png',
        width: 1200,
        height: 630,
        alt: "Kai's Run — Mobile Dog Gym Destin FL",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blog | Kai's Run — Mobile Dog Gym",
    description:
      'Field notes on canine conditioning, slatmill sessions, and life on the Emerald Coast.',
    images: ['https://kaisrun.xyz/images/og-image.png'],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPostMeta().sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="bg-brand-black pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-body text-xs uppercase tracking-[0.28em] text-brand-teal">Blog</p>
        <h1 className="mt-4 font-display text-6xl tracking-tight text-brand-offwhite md:text-8xl">
          Field notes
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg text-brand-gray">
          Conditioning ideas, session philosophy, and updates from Kai&apos;s Run.
        </p>

        <ul className="mt-16 space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}/`}
                className="group block rounded-xl border border-brand-teal/20 bg-brand-charcoal/40 p-6 transition hover:border-brand-teal/45"
              >
                <h2 className="font-display text-3xl text-brand-offwhite group-hover:text-brand-gold md:text-4xl">
                  {p.title}
                </h2>
                <p className="mt-3 font-body text-brand-gray">{p.description}</p>
                <p className="mt-4 font-body text-xs uppercase tracking-wider text-brand-gray/80">
                  {p.date} · {p.readTimeMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
