import { BLOG_LISTING_DESCRIPTION, BLOG_LISTING_URL } from '@/lib/blog/blog-listing-metadata';
import type { BlogPostMeta } from '@/lib/blog/posts';

const BASE_URL = 'https://kaisrun.xyz';

export function buildBlogIndexSchema(posts: BlogPostMeta[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${BLOG_LISTING_URL}#blog`,
        name: "Kai's Run Field Notes",
        url: BLOG_LISTING_URL,
        description: BLOG_LISTING_DESCRIPTION,
        publisher: {
          '@type': 'Organization',
          name: "Kai's Run",
          url: BASE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/images/logos/kr-logo-1.webp`,
          },
        },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${BASE_URL}/blog/${post.slug}/`,
          datePublished: post.date,
          dateModified: post.dateModified ?? post.date,
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${BLOG_LISTING_URL}#itemlist`,
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${BASE_URL}/blog/${post.slug}/`,
          name: post.title,
        })),
      },
    ],
  };
}
