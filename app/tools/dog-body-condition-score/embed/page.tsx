import type { Metadata } from 'next';
import { EMBED_CHROME_CSS, EmbedCredit } from '@/components/tools/EmbedThisTool';
import { BodyConditionChecker } from '../BodyConditionChecker';

// Static embed route (replaces ?embed=1 on the main page, which forced the canonical
// page to render dynamically). Legacy ?embed=1 URLs redirect here (next.config.js).
export const metadata: Metadata = {
  title: "Is My Dog Overweight? The 30-Second Body Check (embed) | Kai's Run",
  alternates: { canonical: 'https://kaisrun.xyz/tools/dog-body-condition-score/' },
  robots: { index: false, follow: true },
};

export default function Embed() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <style>{EMBED_CHROME_CSS}</style>
      <h1 className="font-display text-3xl text-brand-offwhite mb-6">Is My Dog Overweight? The 30-Second Body Check</h1>
      <BodyConditionChecker />
      <EmbedCredit path="/tools/dog-body-condition-score/" />
    </div>
  );
}
