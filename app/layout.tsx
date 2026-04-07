import type { Metadata } from "next";
import { GFS_Didot } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const gfsDidot = GFS_Didot({
  variable: "--font-gfs-didot",
  subsets: ["greek", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Citlali Bonilla Andersen — Contemporary Abstract Paintings",
    template: "%s | Citlali Bonilla Andersen",
  },
  description:
    "Citlali Bonilla Andersen is a contemporary abstract painter based in Copenhagen, Denmark. Explore original paintings that express emotional depth through color and form.",
  keywords: ["abstract painting", "contemporary art", "Copenhagen artist", "original paintings", "Citlali Bonilla Andersen"],
  authors: [{ name: "Citlali Bonilla Andersen" }],
  creator: "Citlali Bonilla Andersen",
  metadataBase: new URL("https://citlalibonillaandersen.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://citlalibonillaandersen.com",
    siteName: "Citlali Bonilla Andersen",
    title: "Citlali Bonilla Andersen — Contemporary Abstract Paintings",
    description:
      "Original abstract paintings exploring color, movement, and emotion. Based in Copenhagen, Denmark.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Citlali Bonilla Andersen — Contemporary Abstract Paintings",
    description: "Original abstract paintings exploring color, movement, and emotion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://citlalibonillaandersen.com/#artist",
        name: "Citlali Bonilla Andersen",
        url: "https://citlalibonillaandersen.com",
        description:
          "Contemporary abstract painter based in Copenhagen, Denmark.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Copenhagen",
          addressCountry: "DK",
        },
      },
      {
        "@type": "ArtGallery",
        "@id": "https://citlalibonillaandersen.com/#gallery",
        name: "Citlali Bonilla Andersen Gallery",
        url: "https://citlalibonillaandersen.com",
        description:
          "Original abstract paintings exploring color, movement, and emotion.",
        artist: { "@id": "https://citlalibonillaandersen.com/#artist" },
      },
    ],
  }

  return (
    <html lang="en" className={gfsDidot.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-black antialiased font-sans">{children}<Analytics /></body>
    </html>
  );
}
