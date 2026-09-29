'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/** Embed pages: ?theme=light swaps brand tokens (see .embed-light in globals.css). */
export default function EmbedTheme() {
  const params = useSearchParams();
  const light = params.get('theme') === 'light';
  useEffect(() => {
    document.body.classList.toggle('embed-light', light);
    return () => document.body.classList.remove('embed-light');
  }, [light]);
  return null;
}
