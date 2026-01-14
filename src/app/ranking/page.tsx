import { getRanking, RankingType } from '@/lib/rankingLogic';
import type { FoodItem } from '@/types/FoodItem';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '食品ランキング | Food Battle',
    description: 'カロリー、タンパク質など、様々な角度から食品をランキング形式で紹介します。',
};

export default function RankingPage() {
    const highCalorie = getRanking('high-calorie', 10);
    const highProtein = getRanking('high-protein', 10);
    const lowCalorie = getRanking('low-calorie', 10);
    const lowCarb = getRanking('low-carb', 10);

    return (
        <main className="min-h-screen bg-gray-900 pb-20 pt-8 px-4">
            <h1 className="text-4xl font-black text-center text-white mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    FOOD RANKING
                </span>
            </h1>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <RankingCard result={highCalorie} color="border-red-500" badgeColor="bg-red-500" />
                <RankingCard result={highProtein} color="border-yellow-500" badgeColor="bg-yellow-500" />
                <RankingCard result={lowCalorie} color="border-green-500" badgeColor="bg-green-500" />
                <RankingCard result={lowCarb} color="border-blue-500" badgeColor="bg-blue-500" />
            </div>

            <div className="text-center mt-12">
                <Link href="/" className="text-gray-400 hover:text-white underline">
                    トップに戻る
                </Link>
            </div>
        </main>
    );
}

const RankingCard = ({ result, color, badgeColor }: { result: ReturnType<typeof getRanking>, color: string, badgeColor: string }) => (
    <div className={`bg-gray-800 rounded-2xl border ${color} overflow-hidden flex flex-col h-full`}>
        <div className="p-6 bg-black/20 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-sm text-gray-400">{result.description}</p>
        </div>
        <div className="flex-1 overflow-y-auto max-h-[600px] p-2">
            {result.items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors border-b border-gray-700/50 last:border-0">
                    <div className={`w-8 h-8 ${index < 3 ? badgeColor + ' text-black' : 'bg-gray-700 text-gray-400'} rounded-full flex items-center justify-center font-bold flex-shrink-0`}>
                        {index + 1}
                    </div>
                    <div className="text-2xl">{item.emoji}</div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-200 truncate">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.category}</div>
                    </div>
                    <div className="text-right">
                        <div className="font-mono font-bold text-white">
                            {result.type.includes('calorie') ? item.calories :
                                result.type === 'high-protein' ? item.protein :
                                    result.type === 'high-salt' ? item.salt :
                                        result.type === 'low-carb' ? item.carbs : item.protein}
                            <span className="text-xs text-gray-500 ml-0.5">
                                {result.type.includes('calorie') ? 'kcal' : (result.type === 'high-salt' ? 'g (塩分)' : 'g')}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
