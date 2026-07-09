import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: "Page Not Found | Kai's Run",
  robots: { index: false, follow: true },
};

const links = [
  { href: '/', label: 'Home' },
  { href: '/services/', label: 'Services' },
  { href: '/blog/', label: 'Field Notes' },
  { href: '/tools/', label: 'Free Tools' },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-6 pt-28 text-center md:pt-32">
      <p className="font-body text-xs uppercase tracking-[0.28em] text-brand-teal-light">Error 404</p>
      <h1 className="mt-4 font-display text-5xl uppercase tracking-tight text-brand-offwhite md:text-7xl">
        This trail dead-ends.
      </h1>
      <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-brand-gray">
        The page you are looking for does not exist or has moved. The dog, however, is still running.
      </p>
      <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-body text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-brand-teal-light hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-10">
        <Button href="/book/" variant="primary" className="bg-brand-gold text-brand-black hover:shadow-[0_0_20px_rgba(201,150,58,0.5)]">
          Book Now
        </Button>
      </div>
    </main>
  );
}
