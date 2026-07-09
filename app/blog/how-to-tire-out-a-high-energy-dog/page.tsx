import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogPostWithAds from '@/components/blog/BlogPostWithAds';
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar';
import { buildArticleSchema } from '@/lib/blog/article-schema';
import { buildFaqSchema } from '@/lib/blog/faq-schema';
import { buildBlogPostMetadata } from '@/lib/blog/post-metadata';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog/posts';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';

const SLUG = 'how-to-tire-out-a-high-energy-dog';

const post = getPostBySlug(SLUG);

export const metadata: Metadata = post ? buildBlogPostMetadata(post) : { title: 'Post not found' };

export default async function HowToTireOutHighEnergyDogPage() {
  if (!post) notFound();

  const related = getRelatedPosts(SLUG, 3);
  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.description,
    date: post.date,
    dateModified: post.dateModified,
    slug: SLUG,
    author: post.author,
    image: post.image,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog/' },
    { name: post.title, path: `/blog/${SLUG}/` },
  ]);
  const faqSchema = buildFaqSchema(SLUG, post.body);

  return (
    <>
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <article className="bg-brand-black pb-24 pt-28 md:pb-32 md:pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <nav aria-label="Breadcrumb" className="mb-10 font-body text-sm text-brand-gray">
            <Link href="/" className="text-brand-teal-light hover:text-brand-offwhite">
              Home
            </Link>
            <span className="mx-2 text-brand-gray/60">/</span>
            <Link href="/blog/" className="text-brand-teal-light hover:text-brand-offwhite">
              Blog
            </Link>
            <span className="mx-2 text-brand-gray/60">/</span>
            <span className="text-brand-offwhite/80">{post.title}</span>
          </nav>

          <header className="border-b border-brand-teal/15 pb-10">
            <p className="font-body text-xs uppercase tracking-[0.28em] text-brand-teal-light">Field notes</p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-brand-offwhite md:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-brand-gray">{post.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-sm text-brand-gray">
              <span>
                <span className="text-brand-offwhite/90">Author</span> - {post.author ?? 'Travis'}
              </span>
              {post.date ? (
                <time dateTime={post.date}>
                  <span className="text-brand-offwhite/90">Published</span> - {post.date}
                </time>
              ) : null}
              <span>
                <span className="text-brand-offwhite/90">Read time</span> - {post.readTimeMinutes} min
              </span>
            </div>
          </header>

          <div className="pt-12">
            <BlogPostWithAds slug={SLUG} body={post.body} related={related} />
          </div>
        </div>
      </article>
    </>
  );
}
