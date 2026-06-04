import type { Metadata } from 'next';
import BookPageClient from './BookPageClient';

export const metadata: Metadata = {
  title: "Book a Session | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Book a mobile dog conditioning session in Destin, Fort Walton Beach or Niceville FL. Intro sessions start at $35. Schedule online — we come to your driveway.",
};

export default function BookPage() {
  return (
    <>
      <BookPageClient />
      <div className="sr-only">
        <h1>Book a Mobile Dog Conditioning Session</h1>
        <p>Kai&apos;s Run brings a self-powered slatmill to your driveway in Destin, Fort Walton Beach, and Niceville FL. Intro sessions start at $35. Call or text 850-218-5855 to book directly.</p>
      </div>
    </>
  );
}
