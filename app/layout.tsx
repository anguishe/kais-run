import type { Metadata } from "next";
import "./globals.css";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import GoogleAds from "@/components/GoogleAds";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import DevTools from "@/components/DevTools";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { GA4Script } from "@/components/ui/GA4Script";
import { offerCatalogItems } from "@/lib/schema/offers";
import { SOCIAL_PROFILES } from "@/lib/site-social";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaisrun.xyz/"),
  manifest: "/manifest.json",
  title: "Kai's Run | Mobile Dog Gym Destin FL",
  description:
    "Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL. Structured canine conditioning at your driveway.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Kai's Run | Mobile Dog Gym",
    description: "Structured canine conditioning delivered to your driveway.",
    url: "https://kaisrun.xyz/",
    siteName: "Kai's Run",
    images: [
      {
        url: "https://kaisrun.xyz/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kai's Run - Mobile Dog Gym serving Destin, Fort Walton Beach & Niceville FL",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kai's Run | Mobile Dog Gym - Destin FL",
    description: "Structured canine conditioning delivered to your driveway.",
    images: ["https://kaisrun.xyz/images/og-image.png"],
  },
  verification: {
    google: "suiO-1Ptv6S8pmMU60QJiNoNnlwQfzXBV2F0UurKxrg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F1117",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AnimalService",
  "@id": "https://kaisrun.xyz/#business",
  name: "Kai's Run",
  alternateName: "Kai's Run Mobile Dog Conditioning",
  description:
    "Mobile canine conditioning service delivering self-powered slatmill sessions to driveways in Destin, Fort Walton Beach, and Niceville FL.",
  disambiguatingDescription:
    "Kai's Run is a local mobile dog conditioning and slatmill fitness service in Destin, Florida. It is a canine exercise business - not a footwear, shoe, or apparel brand.",
  slogan: "Your dog deserves to run.",
  foundingDate: "2026",
  knowsAbout: [
    "Canine conditioning",
    "Dog slatmill training",
    "High-drive dog exercise",
    "Canine fitness",
    "Dog treadmill alternatives",
  ],
  url: "https://kaisrun.xyz",
  telephone: "+18502185855",
  email: "kaisrunmobile@gmail.com",
  image: "https://kaisrun.xyz/images/og-image.png",
  logo: "https://kaisrun.xyz/images/logos/kr-logo-square-512.png",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Credit Card, Cash",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.3935,
    longitude: -86.4958,
  },
  areaServed: [
    { "@type": "City", name: "Destin", addressRegion: "FL" },
    { "@type": "City", name: "Fort Walton Beach", addressRegion: "FL" },
    { "@type": "City", name: "Niceville", addressRegion: "FL" },
    { "@type": "City", name: "Miramar Beach", addressRegion: "FL" },
    { "@type": "City", name: "Shalimar", addressRegion: "FL" },
    { "@type": "City", name: "Sandestin", addressRegion: "FL" },
    { "@type": "City", name: "Valparaiso", addressRegion: "FL" },
    { "@type": "City", name: "Bluewater Bay", addressRegion: "FL" },
    { "@type": "City", name: "Santa Rosa Beach", addressRegion: "FL" },
    { "@type": "City", name: "Navarre", addressRegion: "FL" },
    { "@type": "City", name: "Mary Esther", addressRegion: "FL" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kai's Run Session Options",
    itemListElement: offerCatalogItems,
  },
  founder: {
    "@type": "Person",
    "@id": "https://kaisrun.xyz/about/#travis",
    name: "Travis",
    url: "https://kaisrun.xyz/about/",
  },
  sameAs: SOCIAL_PROFILES.map((p) => p.url),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://kaisrun.xyz/#website",
  url: "https://kaisrun.xyz",
  name: "Kai's Run",
  publisher: { "@id": "https://kaisrun.xyz/#business" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
        />
        {/* Load font stylesheet asynchronously — avoids render-blocking @import */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap';document.head.appendChild(l)}()`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Consent Mode v2 default — deny all until the visitor accepts. Runs at
            parse time, before any gtag('config') from GA4Script or GoogleAds. */}
        <script
          id="google-consent-default"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`,
          }}
        />
        <GoogleAds conversionId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID} />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <GA4Script />
        <CookieConsent />
        <MicrosoftClarity />
        <Navbar />
        <main className="flex-1">
          <LenisProvider>{children}</LenisProvider>
        </main>
        <Footer />
        {process.env.NODE_ENV === "development" ? <DevTools /> : null}
        <ExitIntentPopup />
      </body>
    </html>
  );
}
