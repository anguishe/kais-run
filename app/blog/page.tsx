import Link from 'next/link';
import { buildBlogIndexSchema } from '@/lib/blog/blog-index-schema';
import { buildBlogListingMetadata } from '@/lib/blog/blog-listing-metadata';
import { getSortedPostMeta } from '@/lib/blog/posts';

export const metadata = buildBlogListingMetadata();

export default function BlogIndexPage() {
  const posts = getSortedPostMeta();
  const blogIndexSchema = buildBlogIndexSchema(posts);

  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5399156622542127"
        crossOrigin="anonymous"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
      />
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

          <section className="mt-16 rounded-xl border border-brand-teal/30 bg-brand-charcoal/60 px-6 py-10 text-center">
            <p className="font-body text-sm uppercase tracking-[0.25em] text-brand-teal">Ready when you are</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-brand-offwhite md:text-5xl">
              Book a session
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-brand-gray">
              Bring structured conditioning to your driveway — Destin, Fort Walton Beach & Niceville.
            </p>
            <Link
              href="/book/"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-teal px-10 py-4 font-body font-medium text-white transition hover:bg-brand-teal/90"
            >
              Book now
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
