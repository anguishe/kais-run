'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MEMBERSHIP_TIER_KEY, setBookIntentSource } from '@/lib/bookIntent';

interface ButtonProps {
  href?: string;
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  /** When set and `href` points to `/book`, stores funnel context in sessionStorage for attribution. */
  bookIntentSource?: string;
}

const base =
  'inline-flex items-center justify-center px-8 py-4 font-medium text-sm tracking-wide transition-all duration-300 rounded-sm';

const variantStyles = {
  primary:
    'bg-brand-teal text-white hover:shadow-[0_0_20px_rgba(10,92,82,0.5)]',
  secondary:
    'border border-white/20 text-brand-offwhite hover:border-brand-teal hover:text-white',
};

function handleBookIntentClick(
  href: string,
  bookIntentSource: string | undefined,
  onClick?: () => void
): void {
  onClick?.();
  if (!bookIntentSource) return;
  const isBook = href.startsWith('/book') || href.includes('/book');
  if (!isBook) return;
  try {
    setBookIntentSource(bookIntentSource);
    const tierMatch = href.match(/[?&]tier=([^&]+)/);
    if (tierMatch?.[1]) {
      sessionStorage.setItem(MEMBERSHIP_TIER_KEY, decodeURIComponent(tierMatch[1]));
      if (process.env.NODE_ENV === 'development') {
        console.info('[Kai\'s Run funnel]', MEMBERSHIP_TIER_KEY, tierMatch[1]);
      }
    }
  } catch {
    /* sessionStorage unavailable */
  }
}

export default function Button({
  href,
  variant,
  children,
  className,
  fullWidth,
  onClick,
  bookIntentSource,
}: ButtonProps) {
  const classes = cn(base, variantStyles[variant], fullWidth && 'w-full', className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={() => handleBookIntentClick(href, bookIntentSource, onClick)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
