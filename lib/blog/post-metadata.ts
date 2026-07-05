import type { Metadata } from 'next';
import { DEFAULT_SITE_KEYWORDS } from '@/lib/seo/defaults';
import { OG_IMAGE_URL } from '@/lib/site-images';
import type { BlogPost } from '@/lib/blog/posts';

const BASE_URL = 'https://kaisrun.xyz';
const DEFAULT_OG_IMAGE = `${BASE_URL}${OG_IMAGE_URL}`;

/** Build the branded on-the-fly OG card URL for a given title. */
export function generatedOgUrl(title: string, eyebrow = 'Field Notes'): string {
  // trailing slash on /og/ matches trailingSlash:true — avoids a 308 hop on every social/image fetch
  return `${BASE_URL}/og/?title=${encodeURIComponent(title.trim())}&eyebrow=${encodeURIComponent(eyebrow)}`;
}

export function resolvePostOgImage(image?: string, title?: string): string {
  if (image?.trim()) {
    if (image.startsWith('http')) return image;
    return `${BASE_URL}${image.startsWith('/') ? image : `/${image}`}`;
  }
  // No explicit frontmatter image → generate a unique branded card from the title
  // instead of falling back to one shared generic OG image across every post.
  if (title?.trim()) return generatedOgUrl(title);
  return DEFAULT_OG_IMAGE;
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

const TITLE_SUFFIX = " | Kai's Run";
const MAX_TITLE = 60;

/**
 * Append the brand suffix only when the result still fits within the SERP
 * truncation point (~60 chars). Long curiosity headlines keep the brand in the
 * OG siteName + schema instead of being cut off mid-word in search results.
 */
function buildPageTitle(title: string): string {
  return title.length + TITLE_SUFFIX.length <= MAX_TITLE ? `${title}${TITLE_SUFFIX}` : title;
}

export function buildBlogPostMetadata(post: BlogPost): Metadata {
  const canonical = `${BASE_URL}/blog/${post.slug}/`;
  const ogImage = resolvePostOgImage(post.image, post.title);
  const keywords = resolvePostKeywords(post.keywords);
  // ogTitle/ogDescription override the social card when set; otherwise reuse the page values.
  const ogTitle = post.ogTitle?.trim() || post.title;
  const ogDescription = post.ogDescription?.trim() || post.description;

  return {
    title: buildPageTitle(post.title),
    description: post.description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
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
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}
