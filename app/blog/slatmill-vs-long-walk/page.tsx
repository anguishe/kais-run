import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting…',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.kaisrun.xyz/blog/dog-treadmill-vs-walk-comparison/',
  },
};

export default function SlatmillVsLongWalkRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/blog/dog-treadmill-vs-walk-comparison/" />
      <link rel="canonical" href="https://www.kaisrun.xyz/blog/dog-treadmill-vs-walk-comparison/" />
      <p>
        Redirecting to{' '}
        <a href="/blog/dog-treadmill-vs-walk-comparison/">
          Slatmill vs. Walk: The Real Difference for High-Drive Dogs
        </a>
      </p>
    </>
  );
}
