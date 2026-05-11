import type { Metadata } from 'next';
import Script from 'next/script';
import { OG_IMAGE_URL } from '@/lib/site-images';
import BookingContent from '@/app/book/BookingContent';

export const metadata: Metadata = {
  title: 'Book | Kai\'s Run — Mobile Dog Gym Destin FL',
  description:
    'Book your mobile dog gym session online. Structured slatmill conditioning delivered to your driveway. Serving Destin, Fort Walton Beach & Niceville FL.',
  openGraph: {
    title: 'Book | Kai\'s Run — Mobile Dog Gym Destin FL',
    description:
      'Book your mobile dog gym session online. Structured slatmill conditioning delivered to your driveway. Serving Destin, Fort Walton Beach & Niceville FL.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1600,
        height: 900,
        alt: "Athletic dog in motion — Kai's Run mobile dog gym",
      },
    ],
  },
};

const SQUARE_WIDGET_SRC =
  'https://square.site/appointments/buyer/widget/x06wxfzw47ogj7/LY4W4QTX4A1PF.js';

export default function BookPage() {
  return (
    <>
      <Script src={SQUARE_WIDGET_SRC} strategy="lazyOnload" />
      <header className="bg-[#0F1117] pt-32 pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-6xl text-brand-offwhite tracking-tight">
            Book Your Session
          </h1>
          <div className="w-12 h-px bg-brand-teal mt-4 mb-4" aria-hidden />
          <p className="font-body text-brand-gray text-base md:text-lg max-w-2xl leading-relaxed">
            New dogs start with the Kai&apos;s Run Welcome — $35. Select your session type below.
          </p>
        </div>
      </header>
      <div id="square-appointments" className="min-h-[700px] w-full bg-brand-black px-6" />
      <BookingContent />
    </>
  );
}
