import type { Metadata, Viewport } from "next";
import { Oswald, Inter, Lora } from "next/font/google";
import "./globals.css";
import { siteConfig, nextSummit } from "@/data/site-content";
import MetaPixel from "@/components/analytics/MetaPixel";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export const metadata: Metadata = {
  title: nextSummit.metaTitle,
  description: nextSummit.metaDescription,
  metadataBase: new URL(siteConfig.canonicalUrl),
  alternates: {
    canonical: siteConfig.canonicalUrl,
  },
  openGraph: {
    title: nextSummit.metaTitle,
    description: nextSummit.metaDescription,
    url: siteConfig.canonicalUrl,
    siteName: siteConfig.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: nextSummit.metaTitle,
    description: nextSummit.metaDescription,
  },
  icons: {
    icon: "/brand/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: nextSummit.eventName,
              startDate: nextSummit.dateStart,
              endDate: nextSummit.dateEnd,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                // Venue not announced yet.
                name: nextSummit.city,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Guangzhou",
                  addressRegion: "Guangdong",
                  addressCountry: "CN",
                },
              },
              organizer: {
                "@type": "Organization",
                name: siteConfig.organizer,
                url: siteConfig.siteUrl,
              },
              url: siteConfig.canonicalUrl,
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
