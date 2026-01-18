import { FoodItem } from '@/types/FoodItem';

// メインカテゴリー定義
export const FOOD_CATEGORIES = {
    all: { label: 'すべて', labelEn: 'All', icon: '🌟' },
    drink: { label: '飲み物', labelEn: 'Drinks', icon: '🥤' },
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
    ramen: { label: 'ラーメン', labelEn: 'Ramen', icon: '🍜', parent: 'prepared' as const },
    fastfood: { label: 'ファストフード', labelEn: 'Fast Food', icon: '🍔', parent: 'prepared' as const },
    restaurant: { label: 'レストラン', labelEn: 'Restaurant', icon: '🍽️', parent: 'prepared' as const },
    convenience: { label: 'コンビニ', labelEn: 'Convenience', icon: '🏪', parent: 'prepared' as const },
    dessert: { label: 'デザート', labelEn: 'Dessert', icon: '🍰', parent: 'prepared' as const },
    snack: { label: 'スナック', labelEn: 'Snacks', icon: '🍿', parent: 'prepared' as const },
    other_prepared: { label: 'その他', labelEn: 'Others', icon: '🎸', parent: 'prepared' as const },
} as const;

export type FoodCategoryKey = keyof typeof FOOD_CATEGORIES;
export type SubCategoryKey = keyof typeof SUB_CATEGORIES;

// 食品を分類する関数
export function categorizeFoodItem(food: FoodItem): {
    foodType: FoodCategoryKey;
    subCategory: SubCategoryKey | null;
} {
    // 飲み物判定
    if (food.category === 'Drink' || (food.tags?.includes('Drink') && food.category !== 'Alcohol')) {
        return { foodType: 'drink', subCategory: null };
    }

    // カテゴリーベースの判定（コンビニ）
    if (food.category === 'Convenience' || food.tags?.includes('Convenience') ||
        food.id.includes('onigiri') || food.id.includes('karaage-kun') ||
        food.id.includes('famichiki') || food.id.includes('nanachiki') ||
        food.id.includes('salad-chicken') || food.id.includes('lawson') ||
        food.id.includes('familymart') || food.id.includes('seven') ||
        // 日本語名での判定（データの揺らぎ対策）
        food.name.includes('ファミマ') || food.name.includes('ファミリーマート') ||
        food.name.includes('ローソン') || food.name.includes('セブン')) {
        return { foodType: 'prepared', subCategory: 'convenience' };
    }

    // ラーメン判定
    if ((food.category === 'Ramen' ||
        food.id.includes('ramen-') ||
        food.id.includes('cup-noodle') ||
        (food.tags && food.tags.includes('Noodle') && food.category === 'Restaurant')) &&
        !food.tags?.includes('Convenience')) {
        return { foodType: 'prepared', subCategory: 'ramen' };
    }

    // お酒判定
    if (food.category === 'Alcohol' ||
        food.id.includes('alc-') ||
        (food.tags && food.tags.includes('Alcohol'))) {
        return { foodType: 'alcohol', subCategory: null };
    }

    // IDベースの判定（レストランチェーン）
    if ((food.id.includes('yoshi-') || food.id.includes('saize-') ||
        food.id.includes('sushiro-') || food.id.includes('gusto-') ||
        food.id.includes('sukiya-') || food.id.includes('matsuya-') ||
        food.id.includes('kura-') || food.id.includes('hama-') ||
        food.id.includes('marugame-') || food.id.includes('coco-')) &&
        !food.tags?.includes('Convenience')) {
        return { foodType: 'prepared', subCategory: 'restaurant' };
    }

    // IDベースの判定（ファストフード）
    if ((food.id.includes('mac-') || food.id.includes('mos-') ||
        food.id.includes('kfc-') || food.id.includes('subway-') ||
        food.id.includes('lotteria-') || food.id.includes('burgerking-')) &&
        !food.tags?.includes('Convenience')) {
        return { foodType: 'prepared', subCategory: 'fastfood' };
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

    return { foodType: 'ingredient', subCategory };
}

// サブカテゴリーを親カテゴリーでフィルター
export function getSubCategoriesForParent(parent: FoodCategoryKey): SubCategoryKey[] {
    if (parent === 'all') return [];

    return Object.entries(SUB_CATEGORIES)
        .filter(([_, config]) => config.parent === parent)
        .map(([key]) => key as SubCategoryKey);
}
