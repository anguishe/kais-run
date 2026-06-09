import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting…',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.kaisrun.xyz/blog/high-energy-dog-breeds-exercise-guide/',
  },
};

export default function BreedsNeedMoreRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/blog/high-energy-dog-breeds-exercise-guide/" />
      <link rel="canonical" href="https://www.kaisrun.xyz/blog/high-energy-dog-breeds-exercise-guide/" />
      <p>
        Redirecting to{' '}
        <a href="/blog/high-energy-dog-breeds-exercise-guide/">
          The 7 Dog Breeds That Need More Than a Walk
        </a>
      </p>
    </>
  );
}
