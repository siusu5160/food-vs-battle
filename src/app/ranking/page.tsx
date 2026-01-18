'use client';

import { getRanking } from '@/lib/rankingLogic';
import { RankingCard } from '@/components/RankingCard';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

import { StructuredData } from '@/components/StructuredData';

export default function RankingPage() {
    const { t } = useLanguage();

    // Show Top 5 on the summary page, link to full list
    const limit = 5;

    const rankings = [
        { result: getRanking('high-calorie', limit, t), color: 'border-red-500', badgeColor: 'bg-red-500' },
        { result: getRanking('high-protein', limit, t), color: 'border-yellow-500', badgeColor: 'bg-yellow-500' },
        { result: getRanking('low-calorie', limit, t), color: 'border-green-500', badgeColor: 'bg-green-500' },
        { result: getRanking('low-carb', limit, t), color: 'border-blue-500', badgeColor: 'bg-blue-500' },
        { result: getRanking('high-fiber', limit, t), color: 'border-emerald-500', badgeColor: 'bg-emerald-500' },
        { result: getRanking('low-salt', limit, t), color: 'border-cyan-500', badgeColor: 'bg-cyan-500' },
        { result: getRanking('low-fat', limit, t), color: 'border-purple-500', badgeColor: 'bg-purple-500' },
    ];

    const breadcrumbs = [
        { name: 'TOP', item: '/' },
        { name: 'ランキング一覧', item: '/ranking' }
    ];

    return (
        <main className="min-h-screen bg-gray-900 pb-20 pt-8 px-4">
            <StructuredData type="Breadcrumb" data={breadcrumbs} />

            <h1 className="text-4xl font-black text-center text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    {t('FOOD RANKING', 'FOOD RANKING')}
                </span>
            </h1>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                {t('様々なテーマの食品ランキング。健康管理やネタ探しに！', 'Various food rankings for health management and fun!')}
            </p>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rankings.map((r) => (
                    <RankingCard
                        key={r.result.type}
                        result={r.result}
                        color={r.color}
                        badgeColor={r.badgeColor}
                        showMoreLink={true}
                    />
                ))}
            </div>

            <div className="text-center mt-12">
                <Link href="/" className="text-gray-400 hover:text-white underline">
                    {t('トップに戻る', 'Back to Top')}
                </Link>
            </div>
        </main>
    );
}
