import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface PopularBattle {
    id1: string;
    id2: string;
    name1: string;
    name2: string;
    name1En: string;
    name2En: string;
    emoji1: string;
    emoji2: string;
    category: string;
    categoryEn: string;
}

export default function PopularBattles() {
    const { t } = useLanguage();

    const popularBattles: PopularBattle[] = [
        // 寿司・魚介
        {
            id1: 'sushiro-maguro',
            id2: 'sushiro-salmon',
            name1: 'マグロ',
            name2: 'サーモン',
            name1En: 'Tuna',
            name2En: 'Salmon',
            emoji1: '🍣',
            emoji2: '🍣',
            category: '寿司',
            categoryEn: 'Sushi',
        },
        {
            id1: 'tuna-lean',
            id2: 'tuna-fatty',
            name1: 'マグロ赤身',
            name2: 'マグロトロ',
            name1En: 'Lean Tuna',
            name2En: 'Fatty Tuna',
            emoji1: '🐟',
            emoji2: '🍣',
            category: '寿司',
            categoryEn: 'Sushi',
        },
        // ファストフード・麺類
        {
            id1: 'hamburger',
            id2: 'pizza',
            name1: 'ハンバーガー',
            name2: 'ピザ',
            name1En: 'Hamburger',
            name2En: 'Pizza',
            emoji1: '🍔',
            emoji2: '🍕',
            category: 'ジャンク',
            categoryEn: 'Junk Food',
        },
        {
            id1: 'ramen',
            id2: 'udon',
            name1: 'ラーメン',
            name2: 'うどん',
            name1En: 'Ramen',
            name2En: 'Udon',
            emoji1: '🍜',
            emoji2: '🍜',
            category: '麺類',
            categoryEn: 'Noodles',
        },
        // スイーツ
        {
            id1: 'shortcake',
            id2: 'cheesecake',
            name1: 'ショートケーキ',
            name2: 'チーズケーキ',
            name1En: 'Shortcake',
            name2En: 'Cheesecake',
            emoji1: '🍰',
            emoji2: '🧀',
            category: 'スイーツ',
            categoryEn: 'Sweets',
        },
        {
            id1: 'pudding',
            id2: 'coffee-jelly',
            name1: 'プリン',
            name2: 'コーヒーゼリー',
            name1En: 'Pudding',
            name2En: 'Coffee Jelly',
            emoji1: '🍮',
            emoji2: '☕',
            category: 'スイーツ',
            categoryEn: 'Sweets',
        },
        // アルコール
        {
            id1: 'beer',
            id2: 'highball',
            name1: 'ビール',
            name2: 'ハイボール',
            name1En: 'Beer',
            name2En: 'Highball',
            emoji1: '🍺',
            emoji2: '🥃',
            category: 'お酒',
            categoryEn: 'Alcohol',
        },
        // 定番
        {
            id1: 'curry-rice',
            id2: 'hashed-beef',
            name1: 'カレーライス',
            name2: 'ハヤシライス',
            name1En: 'Curry Rice',
            name2En: 'Hashed Beef',
            emoji1: '🍛',
            emoji2: '🍛',
            category: 'ご飯もの',
            categoryEn: 'Rice Dish',
        },
        {
            id1: 'white-rice',
            id2: 'bread',
            name1: 'ご飯',
            name2: 'パン',
            name1En: 'Rice',
            name2En: 'Bread',
            emoji1: '🍚',
            emoji2: '🍞',
            category: '炭水化物',
            categoryEn: 'Carbs',
        },
        {
            id1: 'beef-rib',
            id2: 'pork-belly',
            name1: '牛バラ肉',
            name2: '豚バラ肉',
            name1En: 'Beef Rib',
            name2En: 'Pork Belly',
            emoji1: '🥩',
            emoji2: '🥓',
            category: '脂質',
            categoryEn: 'Fat Source',
        },
    ];

    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black text-white">
                    🔥 {t('人気バトル', 'Popular Battles')}
                </h2>
                <Link
                    href="/ranking"
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-bold transition-colors"
                >
                    {t('ランキングを見る', 'View Ranking')} →
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {popularBattles.map((battle, index) => (
                    <Link
                        key={index}
                        href={`/battle/${battle.id1}/${battle.id2}`}
                        className="group bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 rounded-xl p-3 border border-gray-700 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-900/20 relative overflow-hidden"
                    >
                        <div className="absolute top-1.5 right-1.5 text-[10px] text-gray-500 font-mono border border-gray-700 px-1.5 py-0.5 rounded-full">
                            {t(battle.category, battle.categoryEn)}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl">{battle.emoji1}</span>
                                <div>
                                    <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                                        {t(battle.name1, battle.name1En)}
                                    </div>
                                </div>
                            </div>
                            <div className="text-lg font-black text-gray-600 italic px-1">VS</div>
                            <div className="flex items-center gap-2 justify-end">
                                <div className="text-right">
                                    <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                                        {t(battle.name2, battle.name2En)}
                                    </div>
                                </div>
                                <span className="text-3xl">{battle.emoji2}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
