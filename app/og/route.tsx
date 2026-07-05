import { ImageResponse } from 'next/og';

// Branded per-page OG/social card, generated on the fly — no static assets.
// GET /og?title=...&eyebrow=... → 1200x630 PNG. Cached immutably by the runtime.
// Lives at /og (not /api/*) so it is not blocked by robots.txt Disallow: /api/.
export const runtime = 'edge';

const BRAND_BLACK = '#0F1117';
const GOLD = '#C9963A';
const TEAL = '#0A5C52';
const OFFWHITE = '#F0EDE6';
const GRAY = '#9A9590';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') || "Kai's Run").slice(0, 130);
  const eyebrow = (searchParams.get('eyebrow') || 'Field Notes').slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BRAND_BLACK,
          padding: '70px 80px',
          borderBottom: `12px solid ${GOLD}`,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', width: 40, height: 40, borderRadius: 8, background: TEAL, marginRight: 18 }} />
          <span style={{ color: OFFWHITE, fontSize: 34, fontWeight: 700, letterSpacing: 3 }}>KAI&apos;S RUN</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              color: GOLD,
              fontSize: 24,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 6,
              marginBottom: 22,
            }}
          >
            {eyebrow}
          </span>
          <span style={{ color: OFFWHITE, fontSize: 62, fontWeight: 800, lineHeight: 1.08 }}>{title}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: GRAY, fontSize: 25 }}>Mobile canine conditioning · Destin, FL</span>
          <span style={{ color: TEAL, fontSize: 25, fontWeight: 700 }}>kaisrun.xyz</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
