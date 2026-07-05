import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactFormSection } from '@/components/sections/ContactFormSection';

export const metadata: Metadata = {
  title: "Contact Kai's Run | Mobile Dog Conditioning Destin FL",
  description:
    "Reach Kai's Run — mobile canine conditioning across Destin and the Emerald Coast. Call, email, or send a message and Travis responds personally.",
  alternates: { canonical: 'https://kaisrun.xyz/contact/' },
  openGraph: {
    title: "Contact Kai's Run",
    description: 'Questions before booking a slatmill conditioning session? Reach Travis directly.',
    url: 'https://kaisrun.xyz/contact/',
  },
};

const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://kaisrun.xyz/contact/',
  url: 'https://kaisrun.xyz/contact/',
  name: "Contact Kai's Run",
  about: { '@id': 'https://kaisrun.xyz/#business' },
  mainEntity: {
    '@type': 'AnimalService',
    '@id': 'https://kaisrun.xyz/#business',
    name: "Kai's Run",
    telephone: '+18502185855',
    email: 'kaisrunmobile@gmail.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+18502185855',
      email: 'kaisrunmobile@gmail.com',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <main className="min-h-screen bg-brand-black pb-8 pt-28 md:pt-32">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-brand-teal">Get in touch</p>
          <h1 className="mt-4 font-display text-5xl tracking-tight text-brand-offwhite md:text-6xl">
            Contact Kai&apos;s Run
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-brand-gray">
            Mobile canine conditioning delivered to your driveway across the Emerald Coast. Not sure if
            your dog is the right fit, or just want to know more before booking? Reach out — Travis
            answers every message personally, usually within 24 hours.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-brand-teal/20 bg-brand-charcoal/40 p-6">
              <h2 className="font-display text-2xl text-brand-offwhite">Direct</h2>
              <ul className="mt-4 space-y-3 font-body text-sm text-brand-gray">
                <li>
                  <span className="text-brand-offwhite/90">Phone / text:</span>{' '}
                  <a href="tel:+18502185855" className="text-brand-teal hover:underline">850-218-5855</a>
                </li>
                <li>
                  <span className="text-brand-offwhite/90">Email:</span>{' '}
                  <a href="mailto:kaisrunmobile@gmail.com" className="text-brand-teal hover:underline">
                    kaisrunmobile@gmail.com
                  </a>
                </li>
                <li>
                  <span className="text-brand-offwhite/90">Book a session:</span>{' '}
                  <Link href="/book/" className="text-brand-teal hover:underline">kaisrun.xyz/book</Link>
                </li>
              </ul>
              <h2 className="mt-8 font-display text-2xl text-brand-offwhite">Follow</h2>
              <ul className="mt-4 space-y-3 font-body text-sm text-brand-gray">
                <li>
                  <a href="https://www.instagram.com/kaisrun" className="text-brand-teal hover:underline" rel="noopener">Instagram</a>{' '}·{' '}
                  <a href="https://www.tiktok.com/@kaisrun" className="text-brand-teal hover:underline" rel="noopener">TikTok</a>{' '}·{' '}
                  <a href="https://www.facebook.com/people/Kais-Run-Mobile-Dog-Conditioning/61589361011885/" className="text-brand-teal hover:underline" rel="noopener">Facebook</a>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-brand-teal/20 bg-brand-charcoal/40 p-6">
              <h2 className="font-display text-2xl text-brand-offwhite">Service area</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-brand-gray">
                We come to you across the Emerald Coast: Destin, Fort Walton Beach, Niceville, Miramar
                Beach, Sandestin, Shalimar, Mary Esther, Navarre, Santa Rosa Beach, Bluewater Bay, and
                Valparaiso, FL.{' '}
                <Link href="/service-area/" className="text-brand-teal hover:underline">See your city →</Link>
              </p>
              <h2 className="mt-8 font-display text-2xl text-brand-offwhite">Response time</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-brand-gray">
                Messages and voicemails are returned within 24 hours, usually faster. For the quickest
                reply, a text works well.
              </p>
            </div>
          </div>
        </div>

        <ContactFormSection />
      </main>
    </>
  );
}
