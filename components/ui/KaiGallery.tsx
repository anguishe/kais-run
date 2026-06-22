'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type KaiImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type Props = {
  images: KaiImage[];
  /** Tailwind grid classes for the thumbnail layout. */
  className?: string;
};

/**
 * Responsive thumbnail grid with an accessible lightbox.
 * Plain <img> (no next/image, per project rules), explicit width/height for zero CLS,
 * keyboard nav (Esc / ← / →), focus-visible rings, body-scroll lock, reduced-motion safe.
 */
export default function KaiGallery({ images, className }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((cur) => (cur === null ? cur : (cur + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const active = open !== null ? images[open] : null;

  return (
    <>
      <ul className={className ?? 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4'}>
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View larger — ${img.alt}`}
              className="group relative block aspect-[3/4] w-full overflow-hidden rounded-lg border border-brand-teal/15 bg-brand-charcoal focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              <img
                src={img.src}
                alt={img.alt}
                width={img.width ?? 900}
                height={img.height ?? 1600}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Kai photo viewer"
          tabIndex={-1}
          onClick={close}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-brand-black/90 p-4 backdrop-blur-sm focus:outline-none"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-brand-charcoal/80 text-2xl text-brand-offwhite hover:text-brand-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-charcoal/70 text-3xl text-brand-offwhite hover:text-brand-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-charcoal/70 text-3xl text-brand-offwhite hover:text-brand-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
              >
                ›
              </button>
            </>
          )}

          <figure
            className="flex max-h-[88vh] max-w-[92vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              width={active.width ?? 900}
              height={active.height ?? 1600}
              className="max-h-[82vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 max-w-md text-center font-body text-sm text-brand-gray">
              {active.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
