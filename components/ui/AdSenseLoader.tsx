import Script from 'next/script';

const ADSENSE_CLIENT = 'ca-pub-5399156622542127';

/**
 * Loads the Google AdSense library — mounted only in app/blog/layout.tsx, so it
 * ships on /blog/* routes (where ads live) and never on /tools/*, /book/,
 * /contact/, /thank-you/, or the rest of the site. It still loads
 * unconditionally within blog routes, so the verification script stays present
 * in the HTML the AdSense review bot sees. (A consent gate here made the script
 * invisible to the crawler and was a root cause of repeated "can't verify your
 * site" rejections.)
 *
 * This only loads the library. It sets no advertising cookies and serves no ads
 * on its own — an ad only requests when an <ins class="adsbygoogle"> unit is
 * pushed, and every AdUnit/MidArticleAd stays consent-gated (renders nothing
 * until `cookie-consent === 'accepted'`). So a non-consented visitor loads the
 * library but sees zero ads and gets zero ad cookies.
 */
export function AdSenseLoader() {
  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
