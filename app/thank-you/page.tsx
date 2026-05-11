import type { Metadata } from 'next';
import ThankYouContent from '@/app/thank-you/ThankYouContent';

export const metadata: Metadata = {
  title: 'Thank You | Kai\'s Run Mobile Dog Gym Destin FL',
  description: 'Your session is booked. Check your phone for confirmation. Serving Destin, Fort Walton Beach & Niceville FL.',
  robots: 'noindex, nofollow',
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
