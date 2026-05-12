import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { blogMdxComponents } from '@/components/blog/blogMdxComponents';
import BlogAdInset from '@/components/blog/BlogAdInset';
import {
  getBlogAdInsertionPlan,
  splitArticleBody,
} from '@/lib/blog/splitArticleForAds';

export type BlogPostWithAdsProps = {
  slug: string;
  /** MDX body without frontmatter. */
  body: string;
  related: BlogPostMeta[];
};

/**
 * Renders MDX in segment chunks and injects AdSense units after paragraph 2, at the mid-article
 * break (desktop only — mobile keeps top + bottom only), and after the article body.
 */
export default async function BlogPostWithAds({ slug, body, related }: BlogPostWithAdsProps) {
  const { segments, proseParagraphCount } = splitArticleBody(body);
  const { topTriggerProseIndex, midTriggerProseIndex } = getBlogAdInsertionPlan(proseParagraphCount);

  const nodes: React.ReactNode[] = [];
  let proseIdx = -1;
  let i = 0;

  for (const seg of segments) {
    nodes.push(
      <div key={`seg-${i}`} className="blog-mdx-segment">
        {await MDXRemote({ source: seg.source, components: blogMdxComponents })}
      </div>
    );

    if (seg.isProseParagraph) {
      proseIdx += 1;

      if (proseIdx === topTriggerProseIndex) {
        nodes.push(
          <BlogAdInset
            key={`ad-blog-top-${slug}`}
            slot="blog-top"
            format="rectangle"
            placement={`blog-${slug}-after-paragraph-2`}
          />
        );
      }

      if (midTriggerProseIndex !== null && proseIdx === midTriggerProseIndex) {
        nodes.push(
          <div key={`ad-blog-mid-wrap-${slug}`} className="hidden md:block">
            <BlogAdInset
              slot="blog-mid"
              format="horizontal"
              placement={`blog-${slug}-mid-article`}
            />
          </div>
        );
      }
    }
    i += 1;
  }

  nodes.push(
    <BlogAdInset
      key={`ad-blog-bottom-${slug}`}
      slot="blog-bottom"
      format="rectangle"
      placement={`blog-${slug}-before-related`}
    />
  );

  return (
    <>
      <div className="blog-article-body">{nodes}</div>

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
    </>
  );
}
