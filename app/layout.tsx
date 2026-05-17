import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleAds from "@/components/GoogleAds";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import DevTools from "@/components/DevTools";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaisrun.xyz"),
  manifest: "/manifest.json",
  title: "Kai's Run | Mobile Dog Gym — Destin, Fort Walton Beach & Niceville FL",
  description:
    "Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville, FL. Book your intro session today.",
  keywords:
    "mobile dog gym Destin FL, dog treadmill service Destin, dog exercise Fort Walton Beach, slatmill dog Okaloosa County, canine conditioning Niceville Florida",
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
    url: "https://kaisrun.xyz",
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
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PetCare"],
  name: "Kai's Run",
  description:
    "Mobile canine conditioning and slatmill service. Structured athletic sessions delivered to your driveway in Destin, Fort Walton Beach & Niceville FL.",
  url: "https://kaisrun.xyz",
  telephone: "+1-850-218-5855",
  email: "kaisrunmobile@gmail.com",
  areaServed: [
    "Destin FL",
    "Fort Walton Beach FL",
    "Niceville FL",
    "Miramar Beach FL",
    "Shalimar FL",
    "Sandestin FL",
  ],
  priceRange: "$$",
  image: "https://kaisrun.xyz/images/og-image.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Destin",
    addressRegion: "FL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.3935,
    longitude: -86.4958,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.instagram.com/kaisrun",
    "https://www.tiktok.com/@kaisrun",
    "https://www.facebook.com/people/Kais-Run-Mobile-Dog-Conditioning/61589361011885/",
  ],
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
