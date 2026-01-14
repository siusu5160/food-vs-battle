import { getAllFoods } from '@/lib/search';
import type { FoodItem } from '@/types/FoodItem';

export type RankingType = 'high-calorie' | 'low-calorie' | 'high-protein' | 'high-salt' | 'low-carb' | 'high-fiber' | 'low-salt' | 'low-fat';

export interface RankingResult {
    type: RankingType;
    title: string;
    description: string;
    items: FoodItem[];
}

export function getRanking(type: RankingType, limit = 50): RankingResult {
    const foods = getAllFoods();
    let sorted: FoodItem[] = [];
    let title = '';
    let description = '';

    switch (type) {
        case 'high-calorie':
            sorted = [...foods].sort((a, b) => b.calories - a.calories);
            title = 'カロリーモンスター TOP50 😈';
            description = '決して一人で食べてはいけない、禁断の高カロリー食品たち。';
            break;
        case 'low-calorie':
            // Filter out drinks or 0kcal items if needed
            sorted = [...foods].filter(f => f.calories > 0).sort((a, b) => a.calories - b.calories);
            title = 'ダイエットの味方 TOP50 🥗';
            description = 'いくら食べても大丈夫！？低カロリーなヘルシー食品。';
            break;
        case 'high-protein':
            sorted = [...foods].sort((a, b) => b.protein - a.protein);
            title = '筋肉ビルダー TOP50 💪';
            description = '筋トレ民必見。タンパク質含有量が多い最強の食品はこれだ！';
            break;
        case 'high-salt':
            sorted = [...foods].sort((a, b) => b.salt - a.salt);
            title = '塩分過多注意報 🧂';
            description = '美味しいけれど要注意。塩分が高い食品ランキング。';
            break;
        case 'low-carb':
            sorted = [...foods].filter(f => f.carbs >= 0).sort((a, b) => a.carbs - b.carbs);
            title = 'ロカボ生活 TOP50 📉';
            description = '糖質制限中の方へ。糖質が少ない食品ランキング。';
            break;
        case 'high-fiber':
            sorted = [...foods].sort((a, b) => b.fiber - a.fiber);
            title = '腸活ファイバー TOP50 🌾';
            description = '食物繊維が豊富な食品で、お腹の調子を整えよう。';
            break;
        case 'low-salt':
            sorted = [...foods].filter(f => f.salt >= 0).sort((a, b) => a.salt - b.salt);
            title = '減塩の優等生 TOP50 💧';
            description = '高血圧対策に。塩分を控えた体に優しい食品。';
            break;
        case 'low-fat':
            sorted = [...foods].filter(f => f.fat >= 0).sort((a, b) => a.fat - b.fat);
            title = 'ローファット・ダイエット TOP50 🏃';
            description = '脂質制限中の方におすすめ。さっぱりヘルシーな食品。';
            break;
    }

    return {
        type,
        title,
        description,
        items: sorted.slice(0, limit),
    };
}
