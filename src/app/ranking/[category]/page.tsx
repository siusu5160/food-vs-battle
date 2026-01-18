import { getRanking, RankingType } from '@/lib/rankingLogic';
import { RankingCard } from '@/components/RankingCard';
import Link from 'next/link';
import { Metadata } from 'next';

// Define valid categories for SSG
const CATEGORIES: RankingType[] = [
    'high-calorie', 'low-calorie',
    'high-protein', 'low-carb',
    'high-fiber', 'low-salt',
    'low-fat', 'high-salt'
];

interface PageProps {
    params: Promise<{ category: string }>;
}

// 1. Generate Static Params (SSG)
export async function generateStaticParams() {
    return CATEGORIES.map((category) => ({
        category: category,
    }));
}

// 2. Generate Metadata (SEO)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    // Mock translation function for server-side generation (or use a server-side translate lib if available)
    // For now, we'll hardcode or use a simple mapping since execution is server-side
    const t = (ja: string, en: string) => ja;

    // Validate category
    if (!CATEGORIES.includes(category as RankingType)) {
        return { title: 'ランキングが見つかりません | FOOD VS BATTLE' };
    }

    const ranking = getRanking(category as RankingType, 10, t);

    return {
        title: `${ranking.title} TOP50 | FOOD VS BATTLE`,
        description: `${ranking.description} ${ranking.title}の食品ランキングTOP50です。日々の食事選びの参考にしてください。`,
        openGraph: {
            title: `${ranking.title} TOP50 | FOOD VS BATTLE`,
            description: ranking.description,
        }
    };
}

// 3. Page Component
export default async function DynamicRankingPage({ params }: PageProps) {
    const { category } = await params;

    // Validate category (Dynamic handling)
    if (!CATEGORIES.includes(category as RankingType)) {
        return <div className="text-white text-center p-20">ランキングが見つかりません</div>;
    }

    // Server-side translation helper (Simplified)
    const t = (ja: string, en: string) => ja;

    // Get Full Ranking (Limit 100 for dedicated page)
    const result = getRanking(category as RankingType, 100, t);

    // Determine colors based on category
    let color = 'border-gray-500';
    let badgeColor = 'bg-gray-500';

    switch (category) {
        case 'high-calorie': color = 'border-red-500'; badgeColor = 'bg-red-500'; break;
        case 'low-calorie': color = 'border-green-500'; badgeColor = 'bg-green-500'; break;
        case 'high-protein': color = 'border-yellow-500'; badgeColor = 'bg-yellow-500'; break;
        case 'low-carb': color = 'border-blue-500'; badgeColor = 'bg-blue-500'; break;
        case 'high-fiber': color = 'border-emerald-500'; badgeColor = 'bg-emerald-500'; break;
        case 'high-salt': color = 'border-gray-400'; badgeColor = 'bg-gray-400'; break;
        case 'low-salt': color = 'border-cyan-500'; badgeColor = 'bg-cyan-500'; break;
        case 'low-fat': color = 'border-purple-500'; badgeColor = 'bg-purple-500'; break;
    }

    return (
        <main className="min-h-screen bg-gray-900 pb-20 pt-8 px-4">
            {/* Breadcrumb (Simple) */}
            <div className="max-w-4xl mx-auto mb-6 text-sm text-gray-400">
                <Link href="/" className="hover:text-white">TOP</Link> &gt;
                <Link href="/ranking" className="hover:text-white mx-1">ランキング一覧</Link> &gt;
                <span className="text-white mx-1">{result.title}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-center text-white mb-4">
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${badgeColor.replace('bg-', 'from-').replace('500', '400')} to-white`}>
                    {result.title}
                </span>
            </h1>
            <p className="text-center text-gray-400 mb-12">{result.description}</p>

            <div className="max-w-2xl mx-auto">
                {/* Reusing RankingCard but with expanded height/limit logic if needed, 
                    currently RankingCard has internal scroll, but for a full page we might want full height.
                    Let's modify RankingCard styling via wrapper or props if needed. 
                    For now, passing it as is, but maybe we want to remove the max-h constraint for the full page?
                    Actually, let's just make a dedicated full-list view here instead of using the Card component which is designed for the grid.
                    Wait, DRY principles. The Card component has fixed height. 
                    Let's inline the list here for better SEO (no overflow-scroll hidden content issues?) 
                    Actually, Google reads overflow:hidden content fine.
                    But for UX, a full page list is better than a small scrolling box.
                */}

                <div className={`bg-gray-800/50 rounded-2xl border ${color} overflow-hidden`}>
                    <div className="divide-y divide-gray-700">
                        {result.items.map((item, index) => (
                            <Link href={`/battle/random?food=${item.id}`} key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-700/80 transition-colors group">
                                <div className={`w-10 h-10 ${index < 3 ? badgeColor + ' text-black shadow-lg shadow-' + badgeColor + '/50' : 'bg-gray-800 text-gray-500'} rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                                    {index + 1}
                                </div>
                                <div className="text-4xl">{item.emoji}</div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-100 text-lg group-hover:text-white transition-colors">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono font-bold text-xl text-white">
                                        {result.type.includes('calorie') ? item.calories :
                                            result.type === 'high-protein' ? item.protein :
                                                result.type.includes('salt') ? item.salt :
                                                    result.type === 'high-fiber' ? item.fiber :
                                                        result.type === 'low-fat' ? item.fat :
                                                            result.type === 'low-carb' ? item.carbs : item.protein}
                                        <span className="text-sm text-gray-500 ml-1">
                                            {result.type.includes('calorie') ? 'kcal' : (result.type.includes('salt') ? 'g' : 'g')}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        VSで対戦 &rarr;
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-12">
                <Link href="/ranking" className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 border border-gray-600">
                    他のランキングを見る
                </Link>
            </div>
        </main>
    );
}
