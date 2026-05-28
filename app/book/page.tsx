import type { Metadata } from 'next';
import BookPageClient from './BookPageClient';

export const metadata: Metadata = {
  title: "Book a Session | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Pick intro, performance, founding, or snowbird flows inside Square Appointments, set one- or two-dog (same household) intro pricing, and lock a routed visit to your Emerald Coast driveway.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function BookPage() {
  return <BookPageClient />
}
