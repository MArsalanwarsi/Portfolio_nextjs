import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, Manrope, Syne } from "next/font/google";
import BootLoader from "@/components/BootLoader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Arsalan Warsi | Full-Stack Developer",
  description:
    "Portfolio of Muhammad Arsalan Warsi, a MERN and Next.js developer crafting polished interfaces, scalable web applications, and thoughtful product experiences.",
  keywords: [
    "Muhammad Arsalan Warsi",
    "Arsalan Warsi",
    "Full-Stack Developer",
    "MERN Developer",
    "Next.js Portfolio",
    "React Developer",
    "UI Portfolio",
  ],
  authors: [{ name: "Muhammad Arsalan Warsi" }],
  openGraph: {
    title: "Muhammad Arsalan Warsi | Full-Stack Developer",
    description:
      "Thoughtful product interfaces backed by scalable MERN and Next.js systems.",
    type: "website",
    locale: "en_US",
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
      suppressHydrationWarning
      className={cn(
        geist.variable,
        syne.variable,
        manrope.variable,
        ibmPlexMono.variable,
        "font-sans"
      )}
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
