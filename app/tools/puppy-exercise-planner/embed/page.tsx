import type { Metadata } from 'next';
import { EMBED_CHROME_CSS, EmbedCredit } from '@/components/tools/EmbedThisTool';
import { PuppyPlanner } from '../PuppyPlanner';

// Static embed route (replaces ?embed=1 on the main page, which forced the canonical
// page to render dynamically). Legacy ?embed=1 URLs redirect here (next.config.js).
export const metadata: Metadata = {
  title: "How much exercise can my puppy handle? (embed) | Kai's Run",
  alternates: { canonical: 'https://kaisrun.xyz/tools/puppy-exercise-planner/' },
  robots: { index: false, follow: true },
};

export default function Embed() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <style>{EMBED_CHROME_CSS}</style>
      <h1 className="font-display text-3xl text-brand-offwhite mb-6">How much exercise can my puppy handle?</h1>
      <PuppyPlanner />
      <EmbedCredit path="/tools/puppy-exercise-planner/" />
    </div>
  );
}
