import type { Metadata } from "next";
import { Bodoni_Moda, Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuickContactWidget } from "@/components/QuickContactWidget";
import { FilmGrain } from "@/components/motion/Reveal";
import { PublicChrome } from "@/components/PublicChrome";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Plus Photography",
    default: "Plus Photography — Your moments. Our perspective.",
  },
  description:
    "Photography and cinematography studio in Bole, Addis Ababa. Weddings, portraits, events, commercial stills, and music video production.",
  metadataBase: new URL("https://plusphotography.et"),
  openGraph: {
    type: "website",
    locale: "en_ET",
    siteName: "Plus Photography",
    images: [{ url: "/images/hero-wedding.jpg", width: 1400, height: 788 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Plus Photography",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bole, Addis Ababa",
      addressCountry: "ET",
    },
    telephone: "+251911000000",
    currenciesAccepted: "ETB",
  };

  return (
    <html lang="en" className={`${bodoni.variable} ${outfit.variable} ${plex.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FilmGrain />
        <PublicChrome>
          <Navbar />
        </PublicChrome>
        <main>{children}</main>
        <PublicChrome>
          <QuickContactWidget />
          <Footer />
        </PublicChrome>
      </body>
    </html>
  );
}
