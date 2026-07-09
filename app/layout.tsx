import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BootLoader from "@/components/BootLoader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { seo, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import "./globals.css";

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
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: seo.openGraph.title,
    description: seo.openGraph.description,
    type: seo.openGraph.type,
    locale: seo.openGraph.locale,
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
            `}</style>
          </noscript>
          <BootLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
