import Link from 'next/link';
import { buildBlogIndexSchema } from '@/lib/blog/blog-index-schema';
import { buildBlogListingMetadata } from '@/lib/blog/blog-listing-metadata';
import { getSortedPostMeta } from '@/lib/blog/posts';
import FieldNotesIndex from '@/components/blog/FieldNotesIndex';

export const metadata = buildBlogListingMetadata();

export default function BlogIndexPage() {
  const posts = getSortedPostMeta();
  const blogIndexSchema = buildBlogIndexSchema(posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
      />
      <div className="bg-brand-black pb-24 pt-28 md:pb-32 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <header className="max-w-3xl">
            <p className="font-body text-xs uppercase tracking-[0.28em] text-brand-teal-light">
              Conditioning journal
            </p>
            <h1 className="mt-4 font-display text-6xl tracking-tight text-brand-offwhite md:text-8xl">
              Field notes
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg text-brand-gray">
              Training theory, behavior, health, and seasonal guidance for high-drive dogs - written between sessions.
            </p>
          </header>

          <FieldNotesIndex posts={posts} />

          <section className="mt-20 rounded-xl border border-brand-teal/30 bg-brand-charcoal/60 px-6 py-10 text-center md:mt-24">
            <p className="font-body text-sm uppercase tracking-[0.25em] text-brand-teal-light">Ready when you are</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-brand-offwhite md:text-5xl">
              Book a session
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-brand-gray">
              Bring structured conditioning to your driveway - Destin, Fort Walton Beach & Niceville.
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
