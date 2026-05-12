import type { Metadata } from 'next';
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
  title: "Home | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL.",
  openGraph: {
    title: "Home | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      "Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL.",
    type: 'website',
    locale: 'en_US',
    url: 'https://kaisrun.com',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1600,
        height: 900,
        alt: "Athletic dog in motion — Kai's Run mobile dog gym",
      },
    ],
  },
  alternates: {
    canonical: 'https://kaisrun.com',
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
      <AboutSection />
      <FinalCTA />
      <ContactFormSection />
    </>
  );
}
