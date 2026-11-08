import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Anek_Bangla, Baloo_Da_2, Bricolage_Grotesque, Unbounded } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { MotionProvider } from "@/components/site/MotionProvider";
import { Navbar } from "@/components/site/Navbar";
import "./globals.css";

const body = Anek_Bangla({
  variable: "--font-bn",
  subsets: ["bengali", "latin"],
  display: "swap",
});

const display = Baloo_Da_2({
  variable: "--font-display",
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const latin = Bricolage_Grotesque({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

const logo = Unbounded({
  variable: "--font-logo",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "AnimiSci",
  title: {
    default: "AnimiSci | দেখো। নাড়াও। বোঝো।",
    template: "%s | AnimiSci",
  },
  description: "এইচএসসি পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও উচ্চতর গণিতের সূত্র জীবন্ত ছবিতে। স্লাইডার নাড়াও, নিজেই বুঝে যাও।",
  openGraph: {
    siteName: "AnimiSci",
    title: "AnimiSci | দেখো। নাড়াও। বোঝো।",
    description: "সূত্র মুখস্থ নয়, নেড়ে দেখে বোঝার জীবন্ত পাঠ",
    locale: "bn_BD",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2e7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1520" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" className={`${body.variable} ${display.variable} ${latin.variable} ${logo.variable}`}>
      <body style={{ display: "flex", minHeight: "100dvh", flexDirection: "column" }}>
        <MotionProvider>
          <a href="#main" className="sr-only">
            মূল অংশে যাও
          </a>
          <Navbar />
          <main id="main" style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
