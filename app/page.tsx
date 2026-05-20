import type { Metadata } from 'next';
import Link from 'next/link';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { Hero } from '@/components/sections/Hero';
import { SpotsCounter } from '@/components/sections/SpotsCounter';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { MobileAdvantage } from '@/components/sections/MobileAdvantage';
import { FoundingOffer } from '@/components/sections/FoundingOffer';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { ContactFormSection } from '@/components/sections/ContactFormSection';

export const metadata: Metadata = {
  title: "Kai's Run | Mobile Dog Gym Destin FL — Slatmill Sessions at Your Door",
  description:
    "Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL.",
  openGraph: {
    title: "Kai's Run | Mobile Dog Gym Destin FL — Slatmill Sessions at Your Door",
    description:
      "Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL.",
    type: 'website',
    locale: 'en_US',
    url: 'https://kaisrun.xyz',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Kai's Run — Mobile Dog Gym serving Destin, Fort Walton Beach & Niceville FL",
      },
    ],
  },
  alternates: {
    canonical: 'https://kaisrun.xyz',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <SpotsCounter />

      <ProblemSection />

      <SolutionSection />
      <MobileAdvantage />
      <FoundingOffer />
      <WaitlistForm />
      <ServicesOverview />

      <LeadMagnetSection />
      <section className="bg-brand-black px-6 pb-16 text-center">
        <p className="mx-auto max-w-2xl font-body text-base text-brand-gray">
          Want more on conditioning and session philosophy?{' '}
          <Link href="/blog/" className="text-brand-teal underline-offset-2 hover:underline">
            Read the blog
          </Link>
        </p>
      </section>
      <AboutSection />
      <FinalCTA />
      <ContactFormSection />
    </>
  );
}
