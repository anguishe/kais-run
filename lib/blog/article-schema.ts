import { resolvePostOgImage } from '@/lib/blog/post-metadata';

const BASE_URL = 'https://www.kaisrun.xyz';

export type ArticleSchemaInput = {
  title: string;
  description: string;
  date: string;
  slug: string;
  author?: string;
  image?: string;
  dateModified?: string;
};

export function buildArticleSchema({
  title,
  description,
  date,
  slug,
  author = 'Travis',
  image,
  dateModified,
}: ArticleSchemaInput) {
  const pageUrl = `${BASE_URL}/blog/${slug}/`;
  const ogImage = resolvePostOgImage(image);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': pageUrl,
    headline: title,
    description,
    datePublished: date,
    dateModified: dateModified ?? date,
    url: pageUrl,
    author: {
      '@type': 'Person',
      '@id': 'https://www.kaisrun.xyz/about/#travis',
      name: author,
      url: 'https://www.kaisrun.xyz/about/',
    },
    publisher: {
      '@id': 'https://www.kaisrun.xyz/#business',
    },
    image: ogImage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
}
