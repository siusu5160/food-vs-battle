import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '食品ランキング | FOOD VS BATTLE',
    description: 'カロリー、タンパク質、ダイエット向けなど、様々なカテゴリ別の食品ランキング。あなたの目的に合った食品を見つけよう！',
    keywords: ['食品ランキング', 'カロリーランキング', 'タンパク質', 'ダイエット食品', '筋トレ食事', '低カロリー'],
    openGraph: {
        title: '食品ランキング | FOOD VS BATTLE',
        description: 'カロリー、タンパク質、ダイエット向けなど、様々なカテゴリ別の食品ランキング',
        images: ['/opengraph-image'],
    },
    alternates: {
        canonical: 'https://food-vs-battle.pages.dev/ranking',
    },
};

// 構造化データ
const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "食品ランキング",
    "description": "カロリー、タンパク質、ダイエット向けなどのカテゴリ別食品ランキング",
    "url": "https://food-vs-battle.pages.dev/ranking"
};

export default function RankingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {children}
        </>
    );
}
