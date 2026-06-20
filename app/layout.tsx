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
import { AdSenseLoader } from "@/components/ui/AdSenseLoader";

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
        alt: "Kai's Run — Mobile Dog Gym serving Destin, Fort Walton Beach & Niceville FL",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kai's Run | Mobile Dog Gym — Destin FL",
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
  description:
    "Mobile canine conditioning service delivering self-powered slatmill sessions to driveways in Destin, Fort Walton Beach, and Niceville FL.",
  url: "https://kaisrun.xyz",
  telephone: "+18502185855",
  email: "kaisrunmobile@gmail.com",
  image: "https://kaisrun.xyz/images/og-image.png",
  logo: "https://kaisrun.xyz/images/logos/kr-logo-1.webp",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Credit Card, Cash",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Destin",
    addressRegion: "FL",
    postalCode: "32541",
    addressCountry: "US",
  },
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
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Intro Session",
          url: "https://kaisrun.xyz/services/",
        },
        price: "35.00",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Intro Session — Two Dogs",
          url: "https://kaisrun.xyz/services/",
        },
        price: "55.00",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Founding Athlete Program",
          url: "https://kaisrun.xyz/pricing/",
        },
        price: "200.00",
        priceCurrency: "USD",
      },
    ],
  },
  founder: {
    "@type": "Person",
    "@id": "https://kaisrun.xyz/about/#travis",
    name: "Travis",
    url: "https://kaisrun.xyz/about/",
  },
  sameAs: [
    "https://www.facebook.com/people/Kais-Run-Mobile-Dog-Conditioning/61589361011885/",
    "https://www.instagram.com/kaisrun",
    "https://www.tiktok.com/@kaisrun",
  ],
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
        <GoogleAds conversionId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID} />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <GA4Script />
        <AdSenseLoader />
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
