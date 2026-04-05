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
    default: "Ally Bruglii — Contemporary Abstract Paintings",
    template: "%s | Ally Bruglii",
  },
  description:
    "Ally Bruglii is a contemporary abstract painter based in Copenhagen, Denmark. Explore original paintings that express emotional depth through color and form.",
  keywords: ["abstract painting", "contemporary art", "Copenhagen artist", "original paintings", "Ally Bruglii"],
  authors: [{ name: "Ally Bruglii" }],
  creator: "Ally Bruglii",
  metadataBase: new URL("https://allybruglii.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://allybruglii.com",
    siteName: "Ally Bruglii",
    title: "Ally Bruglii — Contemporary Abstract Paintings",
    description:
      "Original abstract paintings exploring color, movement, and emotion. Based in Copenhagen, Denmark.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ally Bruglii — Contemporary Abstract Paintings",
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
        "@id": "https://allybruglii.com/#artist",
        name: "Ally Bruglii",
        url: "https://allybruglii.com",
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
        "@id": "https://allybruglii.com/#gallery",
        name: "Ally Bruglii Gallery",
        url: "https://allybruglii.com",
        description:
          "Original abstract paintings exploring color, movement, and emotion.",
        artist: { "@id": "https://allybruglii.com/#artist" },
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
