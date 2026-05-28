import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { CityServiceAreaClient } from '@/components/sections/CityServiceAreaClient';
import {
  SERVICE_CITY_PAGES,
  getServiceCityBySlug,
  getServiceCityPath,
} from '@/lib/service-area/cities';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_CITY_PAGES.map((city) => ({ slug: city.slug }));
}

function notFoundMetadata(): Metadata {
  return { title: 'City not found' };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getServiceCityBySlug(slug);
  if (!city) return notFoundMetadata();

  const canonical = `https://kaisrun.xyz${getServiceCityPath(city.slug)}`;

  return {
    title: city.title,
    description: city.description,
    alternates: { canonical },
    openGraph: {
      title: city.title,
      description: city.description,
      type: 'website',
      locale: 'en_US',
      url: canonical,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `Kai's Run — Mobile Dog Gym in ${city.name}, FL`,
        },
      ],
    },
  };
}

export default async function ServiceCityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getServiceCityBySlug(slug);
  if (!city) notFound();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Service Area', path: '/service-area/' },
    { name: city.name, path: getServiceCityPath(city.slug) },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CityServiceAreaClient city={city} />
    </>
  );
}
