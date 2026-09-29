import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { blogMdxComponents } from '@/components/blog/blogMdxComponents';
import LaunchWaitlist from '@/components/ui/LaunchWaitlist';

export type BlogPostBodyProps = {
  slug: string;
  /** MDX body without frontmatter. */
  body: string;
  related: BlogPostMeta[];
};

/**
 * Renders blog MDX plus related posts, author box, launch list, and a free-tools link.
 *
 * Ad-free by decision, not by omission. Display ads were removed sitewide in
 * September 2026: the article's job is to earn a free-tool visit, a launch-list
 * signup, or an equipment click, and a display unit competes with all three
 * for a few cents of RPM.
 */
export default async function BlogPostBody({ slug, body, related }: BlogPostBodyProps) {
  return (
    <>
      <div className="blog-article-body">
        {await MDXRemote({
          source: body,
          components: blogMdxComponents,
          // singleTilde off: "~30 min" style approximations must not become strikethrough.
          options: { mdxOptions: { remarkPlugins: [[remarkGfm, { singleTilde: false }]] } },
        })}
      </div>

      <section className="mt-16 border-t border-brand-teal/20 pt-16" aria-labelledby="related-heading">
        <h2 id="related-heading" className="font-display text-3xl tracking-wide text-brand-offwhite md:text-4xl">
          Related posts
        </h2>
        {related.length === 0 ? (
          <p className="mt-4 font-body text-brand-gray">More articles coming soon.</p>
        ) : (
          <ul className="mt-8 space-y-4">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}/`} className="group block rounded-lg border border-brand-teal/15 bg-brand-charcoal/40 p-4 transition-colors hover:border-brand-teal/40">
                  <span className="font-display text-xl text-brand-offwhite group-hover:text-brand-gold">
                    {p.title}
                  </span>
                  <span className="mt-1 block font-body text-sm text-brand-gray">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside
        className="border-t border-brand-charcoal pt-8 mt-8"
        aria-label="About the author"
      >
        <p className="font-body text-xs uppercase tracking-[0.24em] text-brand-teal-light">Written by</p>
        <p className="font-display text-brand-offwhite text-xl mt-2">Travis - Owner &amp; Conditioning Coach, Kai&apos;s Run</p>
        <p className="text-brand-gray text-sm mt-2 leading-relaxed">
          Travis builds and tests the Kai&apos;s Run tools and conditioning programs with Kai, his own
          high-drive dog, on the self-powered slatmill he built in Destin. He started Kai&apos;s Run after
          Kai (a Rhodesian Ridgeback mix) proved that two walks a day couldn&apos;t touch a dog bred to
          work. Everything here comes from hands-on conditioning with his own dogs, not repackaged advice.{' '}
          <a href="/about/" className="text-brand-teal-light hover:underline">More about Travis and Kai →</a>{' '}·{' '}
          <a href="/contact/" className="text-brand-teal-light hover:underline">Contact</a>
        </p>
      </aside>

      <LaunchWaitlist source={`blog-${slug}`} />

      <section className="mt-16 rounded-xl border border-brand-teal/30 bg-brand-charcoal/60 px-6 py-10 text-center">
        <h2 className="font-display text-4xl tracking-tight text-brand-offwhite md:text-5xl">
          Free tools for your dog
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-brand-gray">
          Exercise targets, pavement heat checks, body condition, and puppy plans - all free to use.
        </p>
        <Link
          href="/tools/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-teal px-10 py-4 font-body font-medium text-white transition hover:bg-brand-teal/90"
        >
          See the free tools →
        </Link>
      </section>
    </>
  );
}
