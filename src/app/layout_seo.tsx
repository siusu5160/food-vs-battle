import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FOOD VS BATTLE | 食べ物同士の究極の対決',
    description: 'FOOD VS BATTLEは、様々な食べ物同士を戦わせて最強を決めるエンターテインメント投票サイトです。あなたの推しフードを応援しよう！',
    keywords: ['食べ物', 'バトル', '栄養素', 'カロリー', 'タンパク質', 'ダイエット', '筋トレ', '比較', 'ランキング'],
    openGraph: {
        title: 'FOOD VS BATTLE | 食べ物同士の究極の対決',
        description: '様々な食べ物同士を戦わせて最強を決めるエンターテインメント投票サイト',
        images: ['/opengraph-image'],
        type: 'website',
        siteName: 'FOOD VS BATTLE',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FOOD VS BATTLE',
        description: '食べ物同士の究極の対決',
    },
    alternates: {
        canonical: 'https://food-vs-battle.pages.dev',
    },
};

// 構造化データ（JSON-LD）
const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FOOD VS BATTLE",
    "description": "食べ物同士の栄養素を比較できるエンターテインメントサイト",
    "url": "https://food-vs-battle.pages.dev",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://food-vs-battle.pages.dev/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <head>
                {/* 構造化データ */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
