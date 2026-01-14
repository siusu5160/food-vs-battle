import { getAllFoods } from '@/lib/search';
import type { FoodItem } from '@/types/FoodItem';

export type RankingType = 'high-calorie' | 'low-calorie' | 'high-protein' | 'high-salt' | 'low-carb';

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
            // Filter out drinks or 0kcal items if needed, but for now just sort
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
    }

    return {
        type,
        title,
        description,
        items: sorted.slice(0, limit),
    };
}
