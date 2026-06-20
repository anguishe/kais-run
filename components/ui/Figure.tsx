import type { CSSProperties } from 'react';

type FigureProps = {
  /** Asset path. Defaults to the brand placeholder until a real image is dropped in. */
  src?: string;
  alt: string;
  caption?: string;
  /** Aspect ratio as "W/H" — drives explicit width/height so there is zero CLS. */
  ratio?: string;
};

// Real assets live at public/images/blog/<slug>/<name>.webp — swap `src` to point there.
const PLACEHOLDER = '/images/blog/_placeholder.webp';
const BASE_WIDTH = 1600;

export default function Figure({ src = PLACEHOLDER, alt, caption, ratio = '16/9' }: FigureProps) {
  const [rawW, rawH] = ratio.split('/').map((n) => Number(n.trim()));
  const w = rawW || 16;
  const h = rawH || 9;
  // Explicit pixel width/height reserve layout space ahead of the lazy load.
  const width = BASE_WIDTH;
  const height = Math.round((BASE_WIDTH * h) / w);

  return (
    <figure className="my-10">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full rounded-lg border border-brand-teal/30 bg-brand-charcoal"
        style={{ aspectRatio: `${w} / ${h}` } as CSSProperties}
      />
      {caption ? (
        <figcaption className="mt-3 text-center font-body text-sm text-brand-gray">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
