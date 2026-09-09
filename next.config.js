/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    // next/image optimization available on Vercel
    // keep unoptimized: false (Vercel handles optimization)
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/blog/high-energy-dog-breeds-need-more-than-a-walk',
        destination: '/blog/high-energy-dog-breeds-exercise-guide/',
        permanent: true,
      },
      {
        source: '/blog/slatmill-vs-long-walk',
        destination: '/blog/dog-treadmill-vs-walk-comparison/',
        permanent: true,
      },
      {
        // welcome post deleted (thin/announcement filler) — send legacy links to the blog index
        source: '/blog/welcome',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/equipment/ronzeil/',
        destination: '/equipment/ronzeil-slatmill/',
        permanent: true,
      },
      {
        // Super Dad 2026. /vote/ is now a real page (app/vote/page.tsx) because the
        // email-confirmation step is where most votes were being lost and a bare
        // redirect could not explain it. /vote/go/ keeps the old skip-straight-there
        // behaviour for anywhere we want no instructions.
        // permanent:false (307) on purpose: the competition can reissue the
        // profile URL, and a 308 would be cached in browsers forever.
        source: '/vote/go',
        destination: 'https://yoursuperdad.org/travis-abadie-U8wI',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/((?!tools).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // /tools is embeddable (frame-ancestors *), so X-Frame-Options is dropped
        // here. Re-list the other locks so the route stays otherwise hardened.
        source: '/tools/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: 'frame-ancestors *' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
