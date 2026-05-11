'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  href?: string;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center px-8 py-4 font-medium text-sm tracking-wide transition-all duration-300 rounded-sm';

const variantStyles = {
  primary:
    'bg-brand-teal text-white hover:shadow-[0_0_20px_rgba(10,92,82,0.5)]',
  secondary:
    'border border-white/20 text-brand-offwhite hover:border-brand-teal hover:text-white',
};

export default function Button({ href, variant, children, className, fullWidth }: ButtonProps) {
  const classes = cn(base, variantStyles[variant], fullWidth && 'w-full', className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes}>
      {children}
    </button>
  );
}
