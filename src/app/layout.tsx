import type { Metadata, Viewport } from "next";
import { Oswald, Inter, Lora } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site-content";
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
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  metadataBase: new URL(siteConfig.canonicalUrl),
  alternates: {
    canonical: siteConfig.canonicalUrl,
  },
  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    url: siteConfig.canonicalUrl,
    siteName: siteConfig.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
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
              name: siteConfig.eventName,
              startDate: siteConfig.dateStart,
              endDate: siteConfig.dateEnd,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: siteConfig.venue,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "No. 603, Sanyuanli Avenue",
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
