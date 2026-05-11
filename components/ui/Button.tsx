'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  href?: string;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

const variants = {
  primary:
    'bg-brand-teal text-white hover:bg-brand-teal/90',
  secondary:
    'border border-brand-offwhite/30 text-brand-offwhite hover:border-brand-offwhite',
};

export default function Button({ href, variant, children, className }: ButtonProps) {
  const base = 'inline-block px-8 py-4 font-medium text-sm tracking-wide transition-colors';

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}
