import Script from 'next/script';

const ADSENSE_CLIENT = 'ca-pub-5399156622542127';

/**
 * Loads the Google AdSense library on every page load — unconditionally, so the
 * verification script is present in the HTML Googlebot / the AdSense review bot
 * sees. (A consent gate here made the script invisible to the crawler and was a
 * root cause of repeated "can't verify your site" rejections.)
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
