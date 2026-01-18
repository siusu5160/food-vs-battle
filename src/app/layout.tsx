import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Viewport moved to valid nextjs export in metadata or separate export if needed, 
// using separate export is cleaner for static analysis but metadata.viewport is deprecated in newer versions? 
// Actually Next.js 14+ recommends `export const viewport: Viewport` separately. 
// Let's keep the `viewport` export but update it.

export const viewport: Viewport = {
  themeColor: "#d4af37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "FOOD VS BATTLE - 食品栄養素比較データベース",
    template: "%s | FOOD VS BATTLE"
  },
  description: "外食や食材の栄養素を比較できる専門データベースサイト。カロリー、タンパク質、脂質などを徹底比較して、あなたの健康的な食生活をサポートします。ダイエットや筋トレ中の方に最適。",
  keywords: ["カロリー比較", "栄養素", "PFCバランス", "外食", "ダイエット", "高タンパク"],
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "FOOD VS BATTLE - 食品栄養素比較データベース",
    description: "外食や食材の栄養素を比較できる専門データベースサイト。どっちが太る？どっちが筋肉にいい？をデータで決着。",
    url: "https://food-vs-battle.pages.dev",
    siteName: "FOOD VS BATTLE",
    locale: "ja_JP",
    type: "website",
    images: [{
      url: '/opengraph-image', // Dynamic OG image route
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FOOD VS BATTLE",
    description: "食品栄養素比較データベース。カロリー対決で勝敗を決めよう！",
    images: ['/opengraph-image'], // Fallback to OG image
  },
  verification: {
    google: "LfthHJ8M16ADRokn5lDH4a6vKyZkhkJmCDzM5uVffGU",
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5409964582648687"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0] font-serif selection:bg-[#d4af37] selection:text-black overflow-x-hidden`}
      >
        {/* Global Background Texture */}
        <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>

        <LanguageProvider>
          {/* Global Language Switcher - Fixed Top Right (Max Z-Index) */}
          <div className="fixed top-4 right-4 z-[9999]">
            <LanguageSwitcher />
          </div>

          <Header />

          <main className="flex-grow pt-20 relative z-10 w-full overflow-hidden">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
