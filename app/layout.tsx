import type { Metadata } from "next";
import "./globals.css";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import GoogleAds from "@/components/GoogleAds";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import DevTools from "@/components/DevTools";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaisrun.xyz/"),
  manifest: "/manifest.json",
  title: "Kai's Run | Mobile Dog Gym — Destin, Fort Walton Beach & Niceville FL",
  description:
    "Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL. Structured canine conditioning delivered to your driveway. Book today.",
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
  "@type": ["LocalBusiness", "AnimalService"],
  name: "Kai's Run",
  description:
    "Kai's Run is a mobile canine conditioning service that brings a professional self-powered slatmill to your driveway in Destin, Fort Walton Beach, and Niceville FL. One dog at a time. Climate controlled. No drop-off required.",
  url: "https://kaisrun.xyz",
  telephone: "+18502185855",
  email: "kaisrunmobile@gmail.com",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Credit Card, Cash",
  areaServed: [
    { "@type": "City", name: "Destin", addressRegion: "FL" },
    { "@type": "City", name: "Fort Walton Beach", addressRegion: "FL" },
    { "@type": "City", name: "Niceville", addressRegion: "FL" },
    { "@type": "City", name: "Miramar Beach", addressRegion: "FL" },
    { "@type": "City", name: "Shalimar", addressRegion: "FL" },
    { "@type": "City", name: "Sandestin", addressRegion: "FL" },
  ],
  serviceType: "Mobile Dog Slatmill Conditioning",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kai's Run Session Options",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Intro Session",
          description:
            "First session including fitness assessment and Run Profile card. One dog at your driveway.",
        },
        price: "35.00",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Performance Session",
          description:
            "Standard conditioning session. Self-paced slatmill work delivered to your driveway.",
        },
        price: "65.00",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Founding Athlete Program",
          description:
            "Five sessions at a one-time founding rate. Limited to 20 dogs. Priority booking included.",
        },
        price: "200.00",
        priceCurrency: "USD",
      },
    ],
  },
  founder: {
    "@type": "Person",
    name: "Travis",
    description:
      "Born and raised in Destin FL. Built Kai's Run after discovering slatmill conditioning for his Rhodesian Ridgeback mix Kai.",
  },
  sameAs: [
    "https://www.facebook.com/people/Kais-Run-Mobile-Dog-Conditioning/61589361011885/",
    "https://www.instagram.com/kaisrun",
    "https://www.tiktok.com/@kaisrun",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    description: "By appointment. Contact to schedule.",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <GoogleAds conversionId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID} />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <MicrosoftClarity />
        <Navbar />
        <main className="flex-1">
          <LenisProvider>{children}</LenisProvider>
        </main>
        <Footer />
        {process.env.NODE_ENV === "development" ? <DevTools /> : null}
      </body>
    </html>
  );
}
