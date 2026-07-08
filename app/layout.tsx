import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BootLoader from "@/components/BootLoader";
import { ThemeProvider } from "@/components/ThemeProvider";
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
