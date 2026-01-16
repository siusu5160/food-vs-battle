import Link from 'next/link';

interface PopularBattle {
    id1: string;
    id2: string;
    name1: string;
    name2: string;
    emoji1: string;
    emoji2: string;
    category: string;
}

export default function PopularBattles() {
    const popularBattles: PopularBattle[] = [
        // 寿司・魚介
        {
            id1: 'sushiro-maguro',
            id2: 'sushiro-salmon',
            name1: 'マグロ',
            name2: 'サーモン',
            emoji1: '🍣',
            emoji2: '🍣',
            category: '寿司',
        },
        {
            id1: 'tuna-lean',
            id2: 'tuna-fatty',
            name1: 'マグロ赤身',
            name2: 'マグロトロ',
            emoji1: '🐟',
            emoji2: '🍣',
            category: '寿司',
        },
        // ファストフード・麺類
        {
            id1: 'hamburger',
            id2: 'pizza',
            name1: 'ハンバーガー',
            name2: 'ピザ',
            emoji1: '🍔',
            emoji2: '🍕',
            category: 'ジャンク',
        },
        {
            id1: 'ramen',
            id2: 'udon',
            name1: 'ラーメン',
            name2: 'うどん',
            emoji1: '🍜',
            emoji2: '🍜',
            category: '麺類',
        },
        // スイーツ
        {
            id1: 'shortcake',
            id2: 'cheesecake',
            name1: 'ショートケーキ',
            name2: 'チーズケーキ',
            emoji1: '🍰',
            emoji2: '🧀',
            category: 'スイーツ',
        },
        {
            id1: 'pudding',
            id2: 'coffee-jelly',
            name1: 'プリン',
            name2: 'コーヒーゼリー',
            emoji1: '🍮',
            emoji2: '☕',
            category: 'スイーツ',
        },
        // アルコール
        {
            id1: 'beer',
            id2: 'highball',
            name1: 'ビール',
            name2: 'ハイボール',
            emoji1: '🍺',
            emoji2: '🥃',
            category: 'お酒',
        },
        // 定番
        {
            id1: 'curry-rice',
            id2: 'hashed-beef', // verifying IDs
            name1: 'カレーライス',
            name2: 'ハヤシライス',
            emoji1: '🍛',
            emoji2: '🍛',
            category: 'ご飯もの',
        },
        {
            id1: 'white-rice',
            id2: 'bread',
            name1: 'ご飯',
            name2: 'パン',
            emoji1: '🍚',
            emoji2: '🍞',
            category: '炭水化物',
        },
        {
            id1: 'beef-rib',
            id2: 'pork-belly',
            name1: '牛バラ肉',
            name2: '豚バラ肉',
            emoji1: '🥩',
            emoji2: '🥓',
            category: '脂質',
        },
    ];

    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-white">
                    🔥 人気のバトル
                </h2>
                <Link
                    href="/ranking"
                    className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                >
                    ランキングを見る →
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularBattles.map((battle, index) => (
                    <Link
                        key={index}
                        href={`/battle/${battle.id1}/${battle.id2}`}
                        className="group bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-900/20"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">{battle.emoji1}</span>
                                <div>
                                    <div className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                                        {battle.name1}
                                    </div>
                                </div>
                            </div>
                            <div className="text-2xl font-black text-gray-600">VS</div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <div className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                                        {battle.name2}
                                    </div>
                                </div>
                                <span className="text-4xl">{battle.emoji2}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                                {battle.category}
                            </span>
                            <span className="text-sm text-gray-400 group-hover:text-emerald-400/70 transition-colors">
                                比較する →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
