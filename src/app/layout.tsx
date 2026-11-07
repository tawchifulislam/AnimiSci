import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Hind_Siliguri, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import "./globals.css";

const body = Hind_Siliguri({
  variable: "--font-bn",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const latin = Space_Grotesk({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "AnimiSci",
  title: {
    default: "AnimiSci | চোখে দেখে শেখো, মুখস্থ নয়",
    template: "%s | AnimiSci",
  },
  description:
    "AnimiSci: এইচএসসি পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও উচ্চতর গণিত। প্রতিটি সূত্র ধাপে ধাপে অ্যানিমেশনে, একদম সহজ বাংলায়।",
  openGraph: {
    siteName: "AnimiSci",
    title: "AnimiSci | চোখে দেখে শেখো, মুখস্থ নয়",
    description: "সূত্র চোখে দেখে বোঝার অ্যানিমেটেড পাঠ",
    locale: "bn_BD",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1122" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" className={`${body.variable} ${latin.variable}`}>
      <body style={{ display: "flex", minHeight: "100dvh", flexDirection: "column" }}>
        <a href="#main" className="sr-only">
          মূল অংশে যাও
        </a>
        <Navbar />
        <main id="main" style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
