import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleAds from "@/components/GoogleAds";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import DevTools from "@/components/DevTools";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://kaisrun.com"),
  title: "Kai's Run | Mobile Dog Gym — Destin, Fort Walton Beach & Niceville FL",
  description:
    "Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville, FL. Book your intro session today.",
  keywords:
    "mobile dog gym Destin FL, dog treadmill service Destin, dog exercise Fort Walton Beach, slatmill dog Okaloosa County, canine conditioning Niceville Florida",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Kai's Run | Mobile Dog Gym",
    description: "Performance conditioning for dogs. Delivered to your driveway.",
    url: "https://kaisrun.com",
    siteName: "Kai's Run",
    images: [
      {
        url: "https://kaisrun.com/images/og-image.png",
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
    title: "Kai's Run | Mobile Dog Gym",
    description: "Performance conditioning for dogs. Delivered to your driveway.",
    images: ["https://kaisrun.com/images/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Kai's Run",
  description:
    "Mobile canine conditioning service offering structured slatmill sessions for high-drive dogs.",
  telephone: "850-218-5855",
  areaServed: [
    {
      "@type": "City",
      name: "Destin",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Destin",
        addressRegion: "FL",
      },
    },
    {
      "@type": "City",
      name: "Fort Walton Beach",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Fort Walton Beach",
        addressRegion: "FL",
      },
    },
    {
      "@type": "City",
      name: "Niceville",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Niceville",
        addressRegion: "FL",
      },
    },
  ],
  serviceType: ["Dog Exercise", "Canine Conditioning", "Mobile Dog Gym", "Slatmill Training"],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAds conversionId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID} />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <GoogleAnalytics />
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
