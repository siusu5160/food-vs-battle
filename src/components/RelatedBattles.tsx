import Link from 'next/link';

interface RelatedBattle {
    id1: string;
    id2: string;
    name1: string;
    name2: string;
    emoji1: string;
    emoji2: string;
}

interface RelatedBattlesProps {
    currentBattle: {
        id1: string;
        id2: string;
    };
}

export default function RelatedBattles({ currentBattle }: RelatedBattlesProps) {
    // 関連バトルのロジック（カテゴリや栄養素が似ているものを推奨）
    const relatedBattles: RelatedBattle[] = [
        {
            id1: 'sushiro-maguro',
            id2: 'sushiro-katsuo',
            name1: 'まぐろ',
            name2: 'かつお',
            emoji1: '🐟',
            emoji2: '🐟',
        },
        {
            id1: 'sushiro-salmon',
            id2: 'sushiro-buri',
            name1: 'サーモン',
            name2: 'ぶり',
            emoji1: '🐟',
            emoji2: '🐟',
        },
        {
            id1: 'chicken-breast',
            id2: 'pork-loin',
            name1: '鶏むね肉',
            name2: '豚ロース',
            emoji1: '🍗',
            emoji2: '🥩',
        },
        {
            id1: 'rice-white',
            id2: 'bread-white',
            name1: 'ご飯',
            name2: 'パン',
            emoji1: '🍚',
            emoji2: '🍞',
        },
    ];

    // 現在のバトルを除外
    const filtered = relatedBattles.filter(
        (battle) =>
            !(
                (battle.id1 === currentBattle.id1 && battle.id2 === currentBattle.id2) ||
                (battle.id1 === currentBattle.id2 && battle.id2 === currentBattle.id1)
            )
    );

    // 最大4件まで表示
    const displayBattles = filtered.slice(0, 4);

    if (displayBattles.length === 0) return null;

    return (
        <section className="mt-12 bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-emerald-400">
                🔗 関連するバトル
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayBattles.map((battle, index) => (
                    <Link
                        key={index}
                        href={`/battle/${battle.id1}/${battle.id2}`}
                        className="group bg-gray-800/50 hover:bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-emerald-500/50 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{battle.emoji1}</span>
                                <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                                    {battle.name1}
                                </span>
                            </div>
                            <span className="text-gray-500 text-xl">VS</span>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                                    {battle.name2}
                                </span>
                                <span className="text-3xl">{battle.emoji2}</span>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-400 group-hover:text-emerald-400/70 transition-colors">
                            栄養素を比較 →
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
