import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import BootLoader from "@/components/BootLoader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { seo, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import "./globals.css";

const siteUrl = new URL(siteConfig.website);
const analyticsId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.match(/^G-[A-Z0-9]+$/)?.[0];
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.website,
  image: new URL(siteConfig.portrait.src, siteUrl).toString(),
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { ...person, "@id": new URL("/#person", siteUrl).toString() },
    {
      "@type": "WebSite",
      "@id": new URL("/#website", siteUrl).toString(),
      name: seo.title,
      url: siteConfig.website,
      description: seo.description,
      inLanguage: "en",
      publisher: { "@id": new URL("/#person", siteUrl).toString() },
    },
    {
      "@type": "ProfilePage",
      url: siteConfig.website,
      name: seo.title,
      mainEntity: { "@id": new URL("/#person", siteUrl).toString() },
      isPartOf: { "@id": new URL("/#website", siteUrl).toString() },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#211711",
  colorScheme: "dark light",
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
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
  alternates: { canonical: "/" },
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
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "192x192" }],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(geistSans.variable, geistMono.variable, "font-sans")}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="boot-loader-active min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <noscript>
            <style>{`
              body.boot-loader-active { overflow: auto !important; }
              .boot-loader { display: none !important; }
              .page-shell [style] { opacity: 1 !important; transform: none !important; }
            `}</style>
          </noscript>
          <BootLoader />
          {children}
        </ThemeProvider>
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
