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
