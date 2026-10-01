import type { Metadata, Viewport } from "next";
import { Fira_Code, Open_Sans } from "next/font/google";
import Script from "next/script";
import { seo, siteConfig, stackHighlights } from "@/data/portfolio";
import "./globals.css";

const siteUrl = new URL(siteConfig.website);
const analyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.match(/^G-[A-Z0-9]+$/)?.[0];
const personId = new URL("/#person", siteUrl).toString();
const websiteId = new URL("/#website", siteUrl).toString();
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: siteConfig.website,
      image: new URL(siteConfig.portrait.src, siteUrl).toString(),
      jobTitle: siteConfig.role,
      description: siteConfig.description,
      email: siteConfig.email,
      homeLocation: { "@type": "Place", name: siteConfig.location },
      knowsAbout: stackHighlights,
      sameAs: [siteConfig.github, siteConfig.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.website,
      name: seo.title,
      description: seo.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": new URL("/#profile", siteUrl).toString(),
      url: siteConfig.website,
      name: seo.title,
      description: seo.description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
  ],
};

const openSans = Open_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  appleWebApp: { capable: true, title: siteConfig.shortName, statusBarStyle: "black-translucent" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: seo.openGraph.title,
    description: seo.openGraph.description,
    type: seo.openGraph.type,
    locale: seo.openGraph.locale,
    url: "/",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.openGraph.title,
    description: seo.openGraph.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${openSans.variable} ${firaCode.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        {analyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${analyticsId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
