import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Terms of Service | Kai's Run",
  description:
    "Terms of Service for Kai's Run - mobile canine conditioning in Destin and the Emerald Coast, FL. Site use, bookings, disclaimers, and liability.",
  alternates: { canonical: 'https://kaisrun.xyz/terms/' },
  openGraph: {
    title: "Terms of Service | Kai's Run",
    description:
      "Terms of Service for Kai's Run - mobile canine conditioning in Destin and the Emerald Coast, FL. Site use, bookings, disclaimers, and liability.",
    url: 'https://kaisrun.xyz/terms/',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-black py-16 px-6 pt-28 md:pt-32">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-4xl tracking-tight text-brand-offwhite mb-2">Terms of Service</h1>
        <p className="font-body text-sm text-brand-gray mb-8">Last updated: July 5, 2026</p>

        <div className="space-y-6 font-body text-[15px] leading-relaxed text-brand-gray [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:tracking-tight [&_h2]:text-brand-offwhite [&_a]:text-brand-teal-light [&_a]:hover:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of the website{' '}
            <a href="https://kaisrun.xyz/">kaisrun.xyz</a> (the &quot;Site&quot;) and the mobile canine
            conditioning services offered by Kai&apos;s Run (&quot;Kai&apos;s Run,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;). By using the Site or booking a session, you agree to these
            Terms. If you do not agree, please do not use the Site.
          </p>

          <h2>The service</h2>
          <p>
            Kai&apos;s Run provides private, one-on-one mobile canine conditioning using a self-powered
            slatmill, delivered to a client&apos;s driveway across Destin and the Emerald Coast, Florida.
            Sessions are paced to the individual dog. We are a conditioning service, not a veterinary,
            training, or medical provider.
          </p>

          <h2>Not veterinary or medical advice</h2>
          <p>
            Content on this Site - including blog articles and free tools such as the exercise calculator,
            pavement heat checker, and body condition estimator - is provided for general educational
            purposes only. It is not veterinary advice and is not a substitute for consultation with a
            licensed veterinarian. Tool outputs are estimates based on the information you enter and general
            guidelines; always consult your veterinarian before starting or changing your dog&apos;s
            exercise routine, especially for dogs with cardiac, respiratory, orthopedic, or other health
            conditions. You are responsible for decisions you make about your dog&apos;s care.
          </p>

          <h2>Bookings, eligibility, and payment</h2>
          <ul>
            <li>Dogs must meet our minimum requirements, including minimum age and current rabies vaccination. A signed waiver is required before the first session.</li>
            <li>We may request veterinary clearance for dogs with a cardiac, respiratory, or orthopedic history, and may decline or stop a session if we judge it unsafe for the dog.</li>
            <li>Pricing shown on the Site is current at the time of publication and may change. Limited-time offers apply only while available.</li>
            <li>Owner presence is required for all sessions.</li>
          </ul>
          <p>
            Full details are on our <Link href="/pricing/">pricing</Link>,{' '}
            <Link href="/services/">services</Link>, and <Link href="/faq/">FAQ</Link> pages.
          </p>

          <h2>Assumption of risk</h2>
          <p>
            Physical conditioning carries inherent risk. By booking, you acknowledge that exercise involves
            risks to your dog and agree that Kai&apos;s Run conducts sessions using reasonable care, paces
            each dog individually, and monitors the dog throughout. Specific liability terms are set out in
            the waiver you sign before your first session.
          </p>

          <h2>Use of the Site</h2>
          <p>
            You agree not to misuse the Site, attempt to disrupt it, scrape it at scale, or use it for any
            unlawful purpose. The tools are provided &quot;as is&quot; for personal, non-commercial use.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The Site&apos;s content, branding, text, and tools are owned by Kai&apos;s Run and protected by
            applicable law. You may share links to our content, but you may not reproduce or republish it
            without permission.
          </p>

          <h2>Third-party links and advertising</h2>
          <p>
            Our blog articles and free tool pages display advertising served by Google AdSense, and the Site
            may link to third-party websites. We do not control third-party content or advertising and are
            not responsible for it. See our <Link href="/privacy/">Privacy Policy</Link> for how advertising
            cookies work and how to opt out.
          </p>

          <h2>Disclaimer of warranties</h2>
          <p>
            The Site and its content and tools are provided &quot;as is&quot; and &quot;as available&quot;
            without warranties of any kind, express or implied, including accuracy, fitness for a particular
            purpose, or uninterrupted availability.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Kai&apos;s Run is not liable for indirect, incidental, or
            consequential damages arising from your use of the Site or reliance on its content or tools.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of Florida, without regard to its conflict-of-law
            rules.
          </p>

          <h2>Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. The updated version will be posted on this page with a
            revised &quot;Last updated&quot; date.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms? Reach us at{' '}
            <a href="mailto:kaisrunmobile@gmail.com">kaisrunmobile@gmail.com</a> or{' '}
            <a href="tel:+18502185855">850-218-5855</a>, or use our{' '}
            <Link href="/contact/">contact page</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
