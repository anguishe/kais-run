import type { Metadata } from 'next';
import { DEFAULT_SITE_KEYWORDS } from '@/lib/seo/defaults';
import { OG_IMAGE_URL } from '@/lib/site-images';
import type { BlogPost } from '@/lib/blog/posts';

const BASE_URL = 'https://www.kaisrun.xyz';
const DEFAULT_OG_IMAGE = `${BASE_URL}${OG_IMAGE_URL}`;

export function resolvePostOgImage(image?: string): string {
  if (!image?.trim()) return DEFAULT_OG_IMAGE;
  if (image.startsWith('http')) return image;
  return `${BASE_URL}${image.startsWith('/') ? image : `/${image}`}`;
}

export function resolvePostKeywords(keywords?: string): string[] {
  if (keywords?.trim()) {
    return keywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
  }
  return DEFAULT_SITE_KEYWORDS;
}

export function buildBlogPostMetadata(post: BlogPost): Metadata {
  const canonical = `${BASE_URL}/blog/${post.slug}/`;
  const ogImage = resolvePostOgImage(post.image);
  const keywords = resolvePostKeywords(post.keywords);

  return {
    title: `${post.title} | Kai's Run`,
    description: post.description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: canonical,
      locale: 'en_US',
      publishedTime: post.date,
      authors: [post.author ?? 'Travis'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}
