'use client';

import { useState } from 'react';

export default function CopyButton({ text, label = 'Copy embed code' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard blocked - the box above is still select-all */
        }
      }}
      className="mt-3 bg-brand-teal px-4 py-2 font-body text-sm font-medium text-white hover:bg-brand-teal/90"
    >
      {copied ? 'Copied' : label}
    </button>
  );
}
