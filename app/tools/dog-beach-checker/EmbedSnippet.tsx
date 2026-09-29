'use client';

import { useState } from 'react';
import { AREAS, SPOTS } from '@/lib/beach/rules';

const SITE = 'https://kaisrun.xyz';

/**
 * The credit link sits on the HOST page, outside the iframe - that is the one that
 * counts as a link to kaisrun.xyz. The in-frame "Powered by" does not.
 */
export default function EmbedSnippet() {
  const [spot, setSpot] = useState('walton-public');
  const [light, setLight] = useState(false);
  const [copied, setCopied] = useState(false);

  const params = new URLSearchParams();
  if (spot) params.set('spot', spot);
  if (light) params.set('theme', 'light');
  const qs = params.toString();
  const snippet =
    `<iframe src="${SITE}/tools/dog-beach-checker/embed/${qs ? `?${qs}` : ''}" width="100%" height="640"\n` +
    `  style="border:0" loading="lazy" title="Emerald Coast Dog Beach Checker"></iframe>\n` +
    `<p>Dog beach rules for Destin, 30A, Navarre and Pensacola from the\n` +
    `  <a href="${SITE}/tools/dog-beach-checker/">Emerald Coast Dog Beach Checker</a> by Kai's Run.</p>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fall back to select-all on the box */
    }
  };

  return (
    <section className="mt-16">
      <h2 className="font-display text-3xl text-brand-offwhite">Embed this checker on your site</h2>
      <p className="mt-3 font-body text-brand-gray leading-relaxed">
        Vacation rental hosts, vets, groomers and local blogs are welcome to put the checker on their own
        site for free. Pick the beach your guests or clients use most and it opens on that spot. The rules
        stay current as we re-verify them.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-4 font-body text-sm text-brand-gray">
        <label className="flex items-center gap-2">
          <span>Open on</span>
          <select
            value={spot}
            onChange={(e) => setSpot(e.target.value)}
            className="rounded-none border border-white/10 bg-brand-black px-3 py-2 text-brand-offwhite"
          >
            <option value="">Destin (default)</option>
            {AREAS.map((area) => (
              <optgroup key={area} label={area}>
                {SPOTS.filter((s) => s.area === area).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.short}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={light} onChange={(e) => setLight(e.target.checked)} />
          Light background
        </label>
      </div>
      <pre className="mt-4 select-all whitespace-pre-wrap break-all rounded-lg bg-brand-charcoal p-4 font-mono text-xs text-brand-offwhite">
        {snippet}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="mt-3 bg-brand-teal px-4 py-2 font-body text-sm font-medium text-white hover:bg-brand-teal/90"
      >
        {copied ? 'Copied' : 'Copy embed code'}
      </button>
      <p className="mt-6 font-body text-brand-gray">
        Rental host?{' '}
        <a
          href={`/tools/dog-beach-checker/card/${spot ? `?spot=${spot}` : ''}`}
          className="text-brand-teal-light underline"
        >
          Print a guest card for the house binder
        </a>{' '}
        with the rule for this beach, the nearest legal alternatives, and a QR code to the live rule.
      </p>
    </section>
  );
}
