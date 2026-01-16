import { FoodItem } from '@/types/FoodItem';

// メインカテゴリー定義
export const FOOD_CATEGORIES = {
    all: { label: 'すべて', icon: '🌟' },
    ingredient: { label: '食材', icon: '🥬' },
    prepared: { label: '調理済み', icon: '🍽️' },
} as const;

// サブカテゴリー定義
export const SUB_CATEGORIES = {
    // 食材サブカテゴリー
    meat: { label: '肉・魚', icon: '🥩', parent: 'ingredient' as const },
    carb: { label: '炭水化物', icon: '🍚', parent: 'ingredient' as const },
    vegetable: { label: '野菜', icon: '🥬', parent: 'ingredient' as const },
    fruit: { label: 'フルーツ', icon: '🍎', parent: 'ingredient' as const },
    dairy: { label: '乳製品', icon: '🥛', parent: 'ingredient' as const },
    other: { label: 'その他', icon: '🌾', parent: 'ingredient' as const },

    // 調理済みサブカテゴリー
    fastfood: { label: 'ファストフード', icon: '🍔', parent: 'prepared' as const },
    restaurant: { label: 'レストラン', icon: '🍽️', parent: 'prepared' as const },
    dessert: { label: 'デザート', icon: '🍰', parent: 'prepared' as const },
    snack: { label: 'スナック', icon: '🍿', parent: 'prepared' as const },
} as const;

export type FoodCategoryKey = keyof typeof FOOD_CATEGORIES;
export type SubCategoryKey = keyof typeof SUB_CATEGORIES;

// 食品を分類する関数
export function categorizeFoodItem(food: FoodItem): {
    foodType: FoodCategoryKey;
    subCategory: SubCategoryKey;
} {
    // IDベースの判定（調理済みメニュー）
    if (food.id.includes('mac-') || food.id.includes('mos-') ||
        food.id.includes('kfc-') || food.id.includes('subway-')) {
        return { foodType: 'prepared', subCategory: 'fastfood' };
    }

    if (food.id.includes('yoshi-') || food.id.includes('saize-') ||
        food.id.includes('sushiro-') || food.id.includes('gusto-')) {
        return { foodType: 'prepared', subCategory: 'restaurant' };
    }

    // カテゴリーベースの判定
    if (food.category === 'Dessert' || food.tags?.includes('Dessert')) {
        return { foodType: 'prepared', subCategory: 'dessert' };
    }

    // Snackカテゴリーもデザートとして扱う
    if (food.category === 'Snack' || food.tags?.includes('Snack')) {
        return { foodType: 'prepared', subCategory: 'dessert' };
    }

    // 一般的な調理済み食品（pizza, hamburger等）
    if (food.id === 'pizza' || food.id === 'hamburger') {
        return { foodType: 'prepared', subCategory: 'fastfood' };
    }

    // 食材分類
    const categoryMap: Record<string, SubCategoryKey> = {
        'Meat': 'meat',
        'Carb': 'carb',
        'Fruit': 'fruit',
        'Vegetable': 'vegetable',
        'Dairy': 'dairy',
    };

    const subCategory = categoryMap[food.category] || 'other';
    return { foodType: 'ingredient', subCategory };
}

// サブカテゴリーを親カテゴリーでフィルター
export function getSubCategoriesForParent(parent: FoodCategoryKey): SubCategoryKey[] {
    if (parent === 'all') return [];

    return Object.entries(SUB_CATEGORIES)
        .filter(([_, config]) => config.parent === parent)
        .map(([key]) => key as SubCategoryKey);
}
