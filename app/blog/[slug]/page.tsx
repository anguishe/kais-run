import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogPostWithAds from '@/components/blog/BlogPostWithAds';
import { buildArticleSchema } from '@/lib/blog/article-schema';
import { getPostBySlug, getPostSlugs, getRelatedPosts } from '@/lib/blog/posts';

const baseUrl = 'https://kaisrun.xyz';

/** Posts with a dedicated route under app/blog/<slug>/ — omit from dynamic static params. */
const DEDICATED_POST_SLUGS = new Set(['how-to-tire-out-a-high-energy-dog']);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs()
    .filter((slug) => !DEDICATED_POST_SLUGS.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: `${post.title} | Kai's Run`,
    description: post.description,
    alternates: { canonical: `${baseUrl}/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author ?? 'Travis'],
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: "Kai's Run — Mobile Canine Conditioning",
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.description,
    date: post.date,
    slug,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="bg-brand-black pb-24 pt-28 md:pb-32 md:pt-32">
        <div className="mx-auto max-w-3xl px-6">
        <nav aria-label="Breadcrumb" className="mb-10 font-body text-sm text-brand-gray">
          <Link href="/" className="text-brand-teal hover:text-brand-offwhite">
            Home
          </Link>
          <span className="mx-2 text-brand-gray/60">/</span>
          <Link href="/blog/" className="text-brand-teal hover:text-brand-offwhite">
            Blog
          </Link>
          <span className="mx-2 text-brand-gray/60">/</span>
          <span className="text-brand-offwhite/80">{post.title}</span>
        </nav>

        <header className="border-b border-brand-teal/15 pb-10">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-brand-teal">Field notes</p>
          <h1 className="mt-4 font-display text-5xl tracking-tight text-brand-offwhite md:text-7xl">
            {post.title}
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-brand-gray">{post.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-sm text-brand-gray">
            <span>
              <span className="text-brand-offwhite/90">Author</span> — {post.author ?? 'Travis'}
            </span>
            {post.date ? (
              <time dateTime={post.date}>
                <span className="text-brand-offwhite/90">Published</span> — {post.date}
              </time>
            ) : null}
            <span>
              <span className="text-brand-offwhite/90">Read time</span> — {post.readTimeMinutes} min
            </span>
          </div>
        </header>

        <div className="pt-12">
          <BlogPostWithAds slug={slug} body={post.body} related={related} />
        </div>
        </div>
      </article>
    </>
  );
}
