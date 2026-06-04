import Image from 'next/image';
import Link from 'next/link';
import { WaitlistForm } from '@/components/sections/WaitlistForm';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services/', label: 'Services' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/about/', label: 'About' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/service-area/', label: 'Service Area' },
  { href: '/blog/', label: 'Blog' },
  { href: '/book/', label: 'Book Now' },
];

const serviceCityLinks = [
  { href: '/service-area/destin/', label: 'Destin' },
  { href: '/service-area/fort-walton-beach/', label: 'Fort Walton Beach' },
  { href: '/service-area/niceville/', label: 'Niceville' },
  { href: '/service-area/miramar-beach/', label: 'Miramar Beach' },
  { href: '/service-area/sandestin/', label: 'Sandestin' },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/kaisrun',
    ariaLabel: 'Follow us on Instagram',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@kaisrun',
    ariaLabel: 'Follow us on TikTok',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/people/Kais-Run-Mobile-Dog-Conditioning/61589361011885/',
    ariaLabel: 'Follow us on Facebook',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Google Business',
    href: 'https://www.google.com/maps/search/?api=1&query=Kai%27s%20Run%20Destin%20FL',
    ariaLabel: "Find Kai's Run on Google Maps",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4">
            <Link href="/" className="relative h-12 w-40 block">
              <Image
                src="/images/logos/kr-logo-1.webp"
                alt="Kai's Run Logo"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </Link>
            <p className="text-brand-gray font-medium leading-relaxed">
              Structured canine conditioning.<br />
              Delivered to your driveway.
            </p>
            <p className="text-brand-gray text-sm leading-relaxed">
              Destin · Miramar Beach · Sandestin · Fort Walton Beach · Niceville, FL
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-brand-offwhite mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-gray hover:text-brand-offwhite transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-display text-lg tracking-wider text-brand-offwhite mb-3 mt-8">
              Service Cities
            </h3>
            <ul className="space-y-2">
              {serviceCityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-gray hover:text-brand-offwhite transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-display text-lg tracking-wider text-brand-offwhite mb-4">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href="tel:850-218-5855"
                className="text-brand-gray hover:text-brand-offwhite transition-colors text-sm block"
              >
                Phone: 850-218-5855
              </a>
              <div className="flex gap-4 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-brand-gray hover:text-brand-offwhite transition-colors"
                    aria-label={social.ariaLabel}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 flex justify-center md:justify-start">
          <WaitlistForm />
        </div>

        <div className="mt-4 pt-4 border-t border-brand-teal/20 text-center">
          <a
            href="/privacy/"
            className="text-sm text-brand-gray hover:text-brand-offwhite transition-colors"
          >
            Privacy Policy
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-black/50">
          <p className="text-brand-gray text-sm text-center">
            © {new Date().getFullYear()} Kai&apos;s Run. All rights reserved. | Licensed &amp; Insured
          </p>
        </div>
      </div>
    </footer>
  );
}
