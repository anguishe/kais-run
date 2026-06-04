import { resolvePostOgImage } from '@/lib/blog/post-metadata';

const BASE_URL = 'https://kaisrun.xyz';
const PUBLISHER_LOGO = `${BASE_URL}/images/logos/kr-logo-1.webp`;

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
    headline: title,
    description,
    datePublished: date,
    dateModified: dateModified ?? date,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://kaisrun.xyz/about/',
      '@id': 'https://kaisrun.xyz/about/#travis',
    },
    publisher: {
      '@type': 'Organization',
      name: "Kai's Run",
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: PUBLISHER_LOGO,
        width: 512,
        height: 286,
      },
    },
    image: ogImage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
}
