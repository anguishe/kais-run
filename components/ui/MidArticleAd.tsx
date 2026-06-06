'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AdUnit } from '@/components/ui/AdUnit';

type MidArticleAdProps = {
  slot: string;
};

/**
 * Inserts a consent-gated ad after the first major content section (~1/3 down).
 * Targets the second h2 when present; otherwise places after the first third of body children.
 */
export function MidArticleAd({ slot }: MidArticleAdProps) {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const body = document.querySelector('.blog-article-body');
    if (!body || body.querySelector('[data-mid-article-ad]')) return;

    const container = document.createElement('div');
    container.setAttribute('data-mid-article-ad', '');

    const h2s = body.querySelectorAll('h2');
    if (h2s.length >= 2) {
      body.insertBefore(container, h2s[1]);
    } else {
      const children = Array.from(body.children);
      const index = Math.max(1, Math.floor(children.length / 3));
      const refNode = children[index];
      if (refNode?.nextSibling) {
        body.insertBefore(container, refNode.nextSibling);
      } else if (refNode) {
        refNode.after(container);
      } else {
        body.appendChild(container);
      }
    }

    setMountNode(container);
    return () => {
      container.remove();
    };
  }, []);

  if (!mountNode) return null;
  return createPortal(<AdUnit slot={slot} className="my-8" />, mountNode);
}
