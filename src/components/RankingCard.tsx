import { RankingResult } from '@/lib/rankingLogic';
import Link from 'next/link';

interface RankingCardProps {
    result: RankingResult;
    color: string;
    badgeColor: string;
    showMoreLink?: boolean;
}

export const RankingCard = ({ result, color, badgeColor, showMoreLink = false }: RankingCardProps) => (
    <div className={`bg-gray-800 rounded-2xl border ${color} overflow-hidden flex flex-col h-full`}>
        <div className="p-6 bg-black/20 border-b border-gray-700 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-white mb-2">{result.title}</h2>
                <p className="text-sm text-gray-400">{result.description}</p>
            </div>
            {showMoreLink && (
                <Link
                    href={`/ranking/${result.type}`}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full transition-colors whitespace-nowrap ml-2"
                >
                    もっと見る &rarr;
                </Link>
            )}
        </div>
        <div className="flex-1 overflow-y-auto max-h-[600px] p-2">
            {result.items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors border-b border-gray-700/50 last:border-0 relative group">
                    {/* Rank Badge */}
                    <div className={`w-8 h-8 ${index < 3 ? badgeColor + ' text-black' : 'bg-gray-700 text-gray-400'} rounded-full flex items-center justify-center font-bold flex-shrink-0`}>
                        {index + 1}
                    </div>

                    {/* Emoji */}
                    <div className="text-2xl">{item.emoji}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-200 truncate">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.category}</div>
                    </div>

                    {/* Value */}
                    <div className="text-right">
                        <div className="font-mono font-bold text-white">
                            {result.type.includes('calorie') ? item.calories :
                                result.type === 'high-protein' ? item.protein :
                                    result.type === 'high-salt' || result.type === 'low-salt' ? item.salt :
                                        result.type === 'high-fiber' ? item.fiber :
                                            result.type === 'low-fat' ? item.fat :
                                                result.type === 'low-carb' ? item.carbs : item.protein}
                            <span className="text-xs text-gray-500 ml-0.5">
                                {result.type.includes('calorie') ? 'kcal' : (result.type.includes('salt') ? 'g (塩分)' : 'g')}
                            </span>
                        </div>
                    </div>

                    {/* Link to Battle (Optional overlay or just keep it simple) */}
                    <Link href={`/battle/random?food=${item.id}`} className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity" title="この食べ物でバトル！" />
                </div>
            ))}
        </div>
    </div>
);
