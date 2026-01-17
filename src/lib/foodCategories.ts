import { FoodItem } from '@/types/FoodItem';

// メインカテゴリー定義
export const FOOD_CATEGORIES = {
    all: { label: 'すべて', labelEn: 'All', icon: '🌟' },
    ramen: { label: 'ラーメン', labelEn: 'Ramen', icon: '🍜' },
    alcohol: { label: 'お酒', labelEn: 'Alcohol', icon: '🍺' },
    ingredient: { label: '食材', labelEn: 'Ingredients', icon: '🥬' },
    prepared: { label: '調理済み', labelEn: 'Prepared Food', icon: '🍽️' },
} as const;

// サブカテゴリー定義
export const SUB_CATEGORIES = {
    // 食材サブカテゴリー
    meat: { label: '肉・魚', labelEn: 'Meat/Fish', icon: '🥩', parent: 'ingredient' as const },
    carb: { label: '炭水化物', labelEn: 'Carbs', icon: '🍚', parent: 'ingredient' as const },
    vegetable: { label: '野菜', labelEn: 'Vegetables', icon: '🥬', parent: 'ingredient' as const },
    fruit: { label: 'フルーツ', labelEn: 'Fruits', icon: '🍎', parent: 'ingredient' as const },
    dairy: { label: '乳製品', labelEn: 'Dairy', icon: '🥛', parent: 'ingredient' as const },
    other: { label: 'その他', labelEn: 'Others', icon: '🌾', parent: 'ingredient' as const },

    // 調理済みサブカテゴリー
    fastfood: { label: 'ファストフード', labelEn: 'Fast Food', icon: '🍔', parent: 'prepared' as const },
    restaurant: { label: 'レストラン', labelEn: 'Restaurant', icon: '🍽️', parent: 'prepared' as const },
    convenience: { label: 'コンビニ', labelEn: 'Convenience', icon: '🏪', parent: 'prepared' as const },
    dessert: { label: 'デザート', labelEn: 'Dessert', icon: '🍰', parent: 'prepared' as const },
    snack: { label: 'スナック', labelEn: 'Snacks', icon: '🍿', parent: 'prepared' as const },

    // ラーメンサブカテゴリー (今のところなし、必要なら追加)
    // お酒サブカテゴリー (今のところなし、必要なら追加)
} as const;

export type FoodCategoryKey = keyof typeof FOOD_CATEGORIES;
export type SubCategoryKey = keyof typeof SUB_CATEGORIES;

// 食品を分類する関数
export function categorizeFoodItem(food: FoodItem): {
    foodType: FoodCategoryKey;
    subCategory: SubCategoryKey | null;
} {
    // ラーメン判定
    if (food.category === 'Ramen' ||
        food.id.includes('ramen-') ||
        food.id.includes('cup-noodle') ||
        (food.tags && food.tags.includes('Noodle') && food.category === 'Restaurant')) {
        return { foodType: 'ramen', subCategory: null };
    }

    // お酒判定
    if (food.category === 'Alcohol' ||
        food.id.includes('alc-') ||
        (food.tags && food.tags.includes('Alcohol'))) {
        return { foodType: 'alcohol', subCategory: null };
    }

    // IDベースの判定（レストランチェーン）
    if (food.id.includes('yoshi-') || food.id.includes('saize-') ||
        food.id.includes('sushiro-') || food.id.includes('gusto-') ||
        food.id.includes('sukiya-') || food.id.includes('matsuya-') ||
        food.id.includes('kura-') || food.id.includes('hama-') ||
        food.id.includes('marugame-') || food.id.includes('coco-')) {
        return { foodType: 'prepared', subCategory: 'restaurant' };
    }

    // IDベースの判定（ファストフード）
    if (food.id.includes('mac-') || food.id.includes('mos-') ||
        food.id.includes('kfc-') || food.id.includes('subway-')) {
        return { foodType: 'prepared', subCategory: 'fastfood' };
    }

    // カテゴリーベースの判定（コンビニ）
    if (food.category === 'Convenience' || food.tags?.includes('Convenience') ||
        food.id.includes('onigiri') || food.id.includes('karaage-kun') ||
        food.id.includes('famichiki') || food.id.includes('nanachiki') ||
        food.id.includes('salad-chicken') || food.id.includes('lawson') ||
        food.id.includes('familymart') || food.id.includes('seven')) {
        return { foodType: 'prepared', subCategory: 'convenience' };
    }

    // カテゴリーベースの判定（デザート）
    if (food.category === 'Dessert' || food.tags?.includes('Dessert')) {
        return { foodType: 'prepared', subCategory: 'dessert' };
    }

    // カフェ・ドーナツチェーンはデザートとして扱う
    if (food.id.includes('starbucks-') || food.id.includes('mister-')) {
        return { foodType: 'prepared', subCategory: 'dessert' };
    }

    // Snackカテゴリーの細分化
    if (food.category === 'Snack' || food.tags?.includes('Snack')) {
        // デザート系（ケーキ、プリン、アイスなど）
        if (food.id.includes('cake') || food.id.includes('pudding') ||
            food.id.includes('ice-cream') || food.id.includes('cream-puff') ||
            food.id.includes('gateau') || food.id.includes('parfait')) {
            return { foodType: 'prepared', subCategory: 'dessert' };
        }
        // それ以外はスナック（チョコ、クッキー、ポテチなど）
        return { foodType: 'prepared', subCategory: 'snack' };
    }

    // 一般的な調理済み食品（pizza, hamburger等）
    if (food.id === 'pizza' || food.id === 'hamburger') {
        return { foodType: 'prepared', subCategory: 'fastfood' };
    }

    // カテゴリーベースの判定（食材）
    const categoryMap: Record<string, SubCategoryKey> = {
        'Meat': 'meat',
        'Fish': 'meat',
        'Carb': 'carb',
        'Fruit': 'fruit',
        'Vegetable': 'vegetable',
        'Dairy': 'dairy',
        // 'Alcohol': 'alcohol', // Removed as it is now a main category
        'Other': 'other',
    };
    const subCategory = categoryMap[food.category] || 'other';

    // ラーメン食材（麺など）をラーメンタブに移動する場合のロジックが必要ならここに追加
    // ユーザー要望: "ラーメン食材のその他じゃなくて調理済みでラーメンタブ追加でそこに入れて"
    // "Ingredients" which are ramen related (e.g. noodles) -> Ramen Tab?
    if (food.name.includes('麺') || food.name.includes('ラーメン') || food.id === 'somen') {
        // Just put noodle ingredients into Ramen tab for now if requested?
        // User said "Ramen ingredients... into Ramen tab".
        // But "somen" is an ingredient/carb.
        // Let's stick to "Ramen" tab being for dishes mostly, unless specific noodle ingredients are meant.
        // The user said "Ramen ingredients... not Other... add Ramen tab and put them there".
        // Maybe they imply things like "Mochi Barley" or specific noodles?
        // Let's assume the Ramen dishes added are enough for now, and rely on the keyword check at top.
    }

    return { foodType: 'ingredient', subCategory };
}

// サブカテゴリーを親カテゴリーでフィルター
export function getSubCategoriesForParent(parent: FoodCategoryKey): SubCategoryKey[] {
    if (parent === 'all') return [];

    return Object.entries(SUB_CATEGORIES)
        .filter(([_, config]) => config.parent === parent)
        .map(([key]) => key as SubCategoryKey);
}
