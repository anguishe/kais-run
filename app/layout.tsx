import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kai's Run | Mobile Dog Gym — Destin, Fort Walton Beach & Niceville FL",
  description:
    "Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL.",
  keywords:
    "mobile dog gym Destin FL, dog treadmill service Destin, dog exercise Fort Walton Beach, slatmill dog Okaloosa County, canine conditioning Niceville Florida",
  openGraph: {
    title: "Kai's Run | Mobile Dog Gym — Destin, Fort Walton Beach & Niceville FL",
    description:
      "Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kai's Run | Mobile Dog Gym — Destin, Fort Walton Beach & Niceville FL",
    description:
      "Structured canine conditioning delivered to your driveway. Mobile slatmill sessions for high-drive dogs in Destin, Fort Walton Beach & Niceville FL.",
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
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
