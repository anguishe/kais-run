'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/services/', label: 'Services' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/about/', label: 'About' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/service-area/', label: 'Service Area' },
  { href: '/blog/', label: 'Blog' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-brand-black/80 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 block">
              <img
                src="/images/logos/kr-logo-2.webp"
                alt="Kai's Run - Mobile Dog Gym"
                width={176}
                height={40}
                className="h-10 w-44 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-brand-offwhite hover:text-white transition-colors text-sm font-medium tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book/"
                className="bg-brand-teal text-white px-5 py-2 font-medium text-sm tracking-wide hover:shadow-[0_0_20px_rgba(10,92,82,0.5)] transition-all duration-300 rounded-sm"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden z-50 relative w-6 h-6 flex flex-col justify-center items-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-brand-offwhite block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-brand-offwhite block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-brand-offwhite block"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-black md:hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-4xl text-brand-offwhite hover:text-white transition-colors tracking-wider"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="/book/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-brand-teal text-white px-8 py-3 font-display text-2xl tracking-wider hover:bg-brand-teal/90 transition-colors inline-block"
                >
                  Book Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
