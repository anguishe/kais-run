import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { blogMdxComponents } from '@/components/blog/blogMdxComponents';
import { AdUnit } from '@/components/ui/AdUnit';
import { MidArticleAd } from '@/components/ui/MidArticleAd';

// TODO(slot-ids): Replace these with the real AdSense slot IDs once Travis
// creates the two ad units in the AdSense dashboard. The guards below are
// enabled; AdUnit/MidArticleAd stay consent-gated internally, so no ad loads
// until cookie consent is granted.
const MID_ARTICLE_AD_SLOT = 'TODO_MID_ARTICLE_SLOT_ID';
const FOOTER_AD_SLOT = 'TODO_FOOTER_AD_SLOT_ID';

export type BlogPostWithAdsProps = {
  slug: string;
  /** MDX body without frontmatter. */
  body: string;
  related: BlogPostMeta[];
};

/**
 * Renders blog MDX plus related posts and book CTA.
 */
export default async function BlogPostWithAds({ body, related }: BlogPostWithAdsProps) {
  return (
    <>
      <div className="blog-article-body">
        {await MDXRemote({ source: body, components: blogMdxComponents })}
      </div>

      <MidArticleAd slot={MID_ARTICLE_AD_SLOT} />

      <AdUnit slot={FOOTER_AD_SLOT} className="my-8" />

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

      <div className="border-t border-brand-charcoal pt-8 mt-8 flex gap-4 items-start">
        <div>
          <p className="font-display text-brand-offwhite text-lg">TRAVIS — KAI&apos;S RUN</p>
          <p className="text-brand-gray text-sm mt-1">
            Travis is the owner of Kai&apos;s Run and the human behind Kai, a Rhodesian Ridgeback mix
            who made it clear early on that two walks a day wasn&apos;t going to cut it. He built this
            service because no one else on the Emerald Coast was doing it.{' '}
            <a href="/about/" className="text-brand-teal hover:underline">Read more →</a>
          </p>
        </div>
      </div>

      <section className="mt-16 rounded-xl border border-brand-teal/30 bg-brand-charcoal/60 px-6 py-10 text-center">
        <h2 className="font-display text-4xl tracking-tight text-brand-offwhite md:text-5xl">
          Become a Founding Athlete
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-brand-gray">
          We&apos;re accepting the first 20 dogs before we open.
          Lock in 5 sessions for $200 — $40 each — before that rate disappears.
          Travis brings the slatmill to your driveway. No facility, no drop-off, no group sessions.
        </p>
        <Link
          href="/book/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-teal px-10 py-4 font-body font-medium text-white transition hover:bg-brand-teal/90"
        >
          Claim Your Spot →
        </Link>
      </section>
    </>
  );
}
