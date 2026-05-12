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
import AdSection from '@/components/ads/AdSection';

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

      {/* Google Ads — below hero + social proof: value prop seen, high awareness (horizontal leaderboard). */}
      <AdSection
        slot="homepage-top"
        format="horizontal"
        placement="homepage-after-hero-spots"
      />

      <ProblemSection />

      {/* Google Ads — between problem and solution: pain acknowledged, higher intent (medium rectangle). */}
      <AdSection
        slot="homepage-mid-1"
        format="rectangle"
        placement="homepage-between-problem-solution"
      />

      <SolutionSection />
      <MobileAdvantage />
      <FoundingOffer />
      <WaitlistForm />
      <ServicesOverview />

      {/* Google Ads — after services grid, before story/lead paths: offerings seen, decision-oriented (horizontal leaderboard). */}
      <AdSection
        slot="homepage-mid-2"
        format="horizontal"
        placement="homepage-after-services-before-about"
      />

      <LeadMagnetSection />
      <AboutSection />
      <FinalCTA />
      <ContactFormSection />
    </>
  );
}
