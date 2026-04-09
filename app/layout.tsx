import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Syne } from "next/font/google";
import BootLoader from "@/components/BootLoader";
import "./globals.css";

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

const themeInitScript = `
(() => {
  try {
    const storageKey = "portfolio-theme";
    const storedTheme = window.localStorage.getItem(storageKey);
    const theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : "dark";

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
  }
})();
`;

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
      data-theme="dark"
      suppressHydrationWarning
      className={`${syne.variable} ${manrope.variable} ${ibmPlexMono.variable}`}
    >
      <body className="boot-loader-active">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          <style>{`
            body.boot-loader-active { overflow: auto !important; }
            .boot-loader { display: none !important; }
          `}</style>
        </noscript>
        <BootLoader />
        {children}
      </body>
    </html>
  );
}
