import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmbedTheme from '@/components/tools/EmbedTheme';
import { EMBED_CHROME_CSS, EmbedCredit } from '@/components/tools/EmbedThisTool';
import { BeachChecker } from '../BeachChecker';

// Static embed route (not ?embed=1 on the main page, so the main page stays static).
// Presets are read client-side: ?spot= ?area= ?resident=0|1 ?theme=light.
export const metadata: Metadata = {
  title: 'Emerald Coast Dog Beach Checker (embed)',
  description: 'Embeddable dog beach rules checker for Destin, 30A, Navarre, Pensacola Beach and Panama City Beach.',
  alternates: { canonical: 'https://kaisrun.xyz/tools/dog-beach-checker/' },
  robots: { index: false, follow: true },
};

export default function DogBeachCheckerEmbed() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <style>{EMBED_CHROME_CSS}</style>
      <Suspense fallback={null}>
        <EmbedTheme />
      </Suspense>
      <h1 className="font-display text-3xl text-brand-offwhite mb-4">Can my dog go to the beach here?</h1>
      <Suspense fallback={<p className="font-body text-brand-gray">Loading the checker.</p>}>
        <BeachChecker embed />
      </Suspense>
      <EmbedCredit path="/tools/dog-beach-checker/" />
    </div>
  );
}
