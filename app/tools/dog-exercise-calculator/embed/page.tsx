import type { Metadata } from 'next';
import { EMBED_CHROME_CSS, EmbedCredit } from '@/components/tools/EmbedThisTool';
import { Calculator } from '../Calculator';

// Static embed route (replaces ?embed=1 on the main page, which forced the canonical
// page to render dynamically). Legacy ?embed=1 URLs redirect here (next.config.js).
export const metadata: Metadata = {
  title: "How much exercise does my dog need? (embed) | Kai's Run",
  alternates: { canonical: 'https://kaisrun.xyz/tools/dog-exercise-calculator/' },
  robots: { index: false, follow: true },
};

export default function Embed() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <style>{EMBED_CHROME_CSS}</style>
      <h1 className="font-display text-3xl text-brand-offwhite mb-6">How much exercise does my dog need?</h1>
      <Calculator />
      <EmbedCredit path="/tools/dog-exercise-calculator/" />
    </div>
  );
}
