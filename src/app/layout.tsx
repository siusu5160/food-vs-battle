import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
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

export const viewport: Viewport = {
  themeColor: "#d4af37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "FOOD VS BATTLE | 食べ物同士の究極の対決",
  description: "FOOD VS BATTLEは、様々な食べ物同士を戦わせて最強を決めるエンターテインメント投票サイトです。あなたの推しフードを応援しよう！",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "FOOD VS BATTLE | 食べ物同士の究極の対決",
    description: "様々な食べ物同士を戦わせて最強を決めるエンターテインメント投票サイト",
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FOOD VS BATTLE",
    description: "食べ物同士の究極の対決",
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
        <meta name="google-site-verification" content="LfthHJ8M16ADRokn5lDH4a6vKyZkhkJmCDzM5uVffGU" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5409964582648687"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-950 text-gray-100`}
      >
        <LanguageProvider>
          {/* Global Language Switcher - Fixed Top Right (Max Z-Index) */}
          <div className="fixed top-4 right-4 z-[9999]">
            <LanguageSwitcher />
          </div>

          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
