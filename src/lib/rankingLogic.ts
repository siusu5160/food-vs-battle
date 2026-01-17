import { getAllFoods } from '@/lib/search';
import type { FoodItem } from '@/types/FoodItem';

export type RankingType = 'high-calorie' | 'low-calorie' | 'high-protein' | 'high-salt' | 'low-carb' | 'high-fiber' | 'low-salt' | 'low-fat';

export interface RankingResult {
    type: RankingType;
    title: string;
    description: string;
    items: FoodItem[];
}

export function getRanking(type: RankingType, limit: number = 20, t: (ja: string, en: string) => string): RankingResult {
    const allFoods = getAllFoods();
    let sortedFoods = [...allFoods];
    let title = '';
    let description = '';

    switch (type) {
        case 'high-calorie':
            sortedFoods.sort((a, b) => b.calories - a.calories);
            title = t('カロリーモンスター (高カロリー)', 'Calorie Monsters (High Calorie)');
            description = t('エネルギーの塊。食べ過ぎ注意！', 'Pure energy. Watch out for overeating!');
            break;
        case 'low-calorie':
            sortedFoods.sort((a, b) => a.calories - b.calories);
            title = t('ダイエットの味方 (低カロリー)', 'Diet Allies (Low Calorie)');
            description = t('たくさん食べても罪悪感なし。', 'Eat a lot without guilt.');
            break;
        case 'high-protein':
            sortedFoods.sort((a, b) => b.protein - a.protein);
            title = t('筋肉の源 (高タンパク)', 'Muscle Source (High Protein)');
            description = t('ボディメイクに最適な食品たち。', 'Perfect foods for body making.');
            break;
        case 'high-salt': // Hidden category for fun?
            sortedFoods.sort((a, b) => b.salt - a.salt);
            title = t('塩分過多 (高塩分)', 'Salt Overload (High Salt)');
            description = t('しょっぱいのが好きでも程々に。', 'Moderation even if you like it salty.');
            break;
        case 'low-carb':
            sortedFoods.sort((a, b) => a.carbs - b.carbs);
            title = t('糖質制限の強い味方 (低糖質)', 'Low Carb Warriors');
            description = t('ケトジェニックダイエットにも最適。', 'Great for ketogenic diets.');
            break;
        case 'high-fiber':
            sortedFoods.sort((a, b) => b.fiber - a.fiber);
            title = t('腸活マイスター (高食物繊維)', 'Gut Health Masters (High Fiber)');
            description = t('お腹の調子を整える強い味方。', 'Strong allies for gut health.');
            break;
        case 'low-salt':
            sortedFoods.sort((a, b) => a.salt - b.salt);
            title = t('塩分控えめ (低塩分)', 'Low Salt');
            description = t('むくみ防止や高血圧対策に。', 'Prevent swelling and high blood pressure.');
            break;
        case 'low-fat':
            sortedFoods.sort((a, b) => a.fat - b.fat);
            title = t('脂質オフ (低脂質)', 'Low Fat');
            description = t('ローファットダイエットの食事に。', 'For low fat diet meals.');
            break;
    }

    return {
        type,
        title,
        description,
        items: sorted.slice(0, limit),
    };
}
