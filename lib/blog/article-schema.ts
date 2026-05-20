import { OG_IMAGE_URL } from '@/lib/site-images';

const BASE_URL = 'https://kaisrun.xyz';

export type ArticleSchemaInput = {
  title: string;
  description: string;
  date: string;
  slug: string;
  dateModified?: string;
};

export function buildArticleSchema({
  title,
  description,
  date,
  slug,
  dateModified,
}: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: 'Travis',
      url: `${BASE_URL}/about/`,
    },
    publisher: {
      '@type': 'Organization',
      name: "Kai's Run",
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logos/kr-logo-1.jpg`,
      },
    },
    datePublished: date,
    dateModified: dateModified ?? date,
    url: `${BASE_URL}/blog/${slug}/`,
    image: OG_IMAGE_URL,
  };
}
