const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

const INGREDIENTS = [
    // Meats (Raw/Simple)
    { id: 'chicken-breast-raw', name: '鶏むね肉(皮なし・生)', nameEn: 'Chicken Breast (Raw)', calories: 108, protein: 22.3, fat: 1.5, carbs: 0, fiber: 0, salt: 0.1, emoji: '🐔', category: 'Ingredient' },
    { id: 'pork-loin-raw', name: '豚ロース(生)', nameEn: 'Pork Loin (Raw)', calories: 263, protein: 19.3, fat: 19.2, carbs: 0.1, fiber: 0, salt: 0.1, emoji: '🐖', category: 'Ingredient' },
    { id: 'beef-sirloin-raw', name: '牛サーロイン(生)', nameEn: 'Beef Sirloin (Raw)', calories: 298, protein: 18, fat: 24, carbs: 0.4, fiber: 0, salt: 0.1, emoji: '🐄', category: 'Ingredient' },

    // Vegetables
    { id: 'cabbage-raw', name: 'キャベツ(生)', nameEn: 'Cabbage', calories: 23, protein: 1.3, fat: 0.2, carbs: 5.2, fiber: 1.8, salt: 0, emoji: '🥬', category: 'Ingredient' },
    { id: 'carrot-raw', name: '人参(生)', nameEn: 'Carrot', calories: 39, protein: 0.7, fat: 0.2, carbs: 9, fiber: 2.8, salt: 0, emoji: '🥕', category: 'Ingredient' },
    { id: 'onion-raw', name: '玉ねぎ(生)', nameEn: 'Onion', calories: 37, protein: 1.0, fat: 0.1, carbs: 8.8, fiber: 1.6, salt: 0, emoji: '🧅', category: 'Ingredient' },
    { id: 'tomato-raw', name: 'トマト(生)', nameEn: 'Tomato', calories: 19, protein: 0.7, fat: 0.1, carbs: 4.7, fiber: 1.0, salt: 0, emoji: '🍅', category: 'Ingredient' },
    { id: 'spinach-raw', name: 'ほうれん草(生)', nameEn: 'Spinach', calories: 20, protein: 2.2, fat: 0.4, carbs: 3.1, fiber: 2.8, salt: 0, emoji: '🌿', category: 'Ingredient' },

    // Fruits
    { id: 'apple-raw', name: 'リンゴ(皮つき)', nameEn: 'Apple', calories: 54, protein: 0.2, fat: 0.1, carbs: 14.6, fiber: 1.5, salt: 0, emoji: '🍎', category: 'Ingredient' },
    { id: 'banana-raw', name: 'バナナ', nameEn: 'Banana', calories: 86, protein: 1.1, fat: 0.2, carbs: 22.5, fiber: 1.1, salt: 0, emoji: '🍌', category: 'Ingredient' },
    { id: 'strawberry-raw', name: 'いちご', nameEn: 'Strawberry', calories: 34, protein: 0.9, fat: 0.1, carbs: 8.5, fiber: 1.4, salt: 0, emoji: '🍓', category: 'Ingredient' },

    // Staples (Raw/Basic)
    { id: 'rice-raw', name: '精白米(生)', nameEn: 'White Rice (Raw)', calories: 356, protein: 6.1, fat: 0.9, carbs: 77.1, fiber: 0.5, salt: 0, emoji: '🌾', category: 'Ingredient' },
    { id: 'pasta-dried', name: 'パスタ(乾麺)', nameEn: 'Pasta (Dried)', calories: 378, protein: 13, fat: 2.2, carbs: 72, fiber: 2.7, salt: 0, emoji: '🍝', category: 'Ingredient' },
    { id: 'bread-slice', name: '食パン(6枚切り1枚)', nameEn: 'Bread Slice', calories: 158, protein: 5.6, fat: 2.3, carbs: 28, fiber: 1.5, salt: 0.7, emoji: '🍞', category: 'Ingredient' },

    // Others
    { id: 'tofu-momen', name: '木綿豆腐(100g)', nameEn: 'Tofu (Firm)', calories: 72, protein: 6.6, fat: 4.2, carbs: 1.6, fiber: 0.4, salt: 0, emoji: '⬜', category: 'Ingredient' },
    { id: 'egg-raw', name: '生卵(1個)', nameEn: 'Raw Egg', calories: 76, protein: 6.2, fat: 5.2, carbs: 0.2, fiber: 0, salt: 0.2, emoji: '🥚', category: 'Ingredient' }
];

// Check for existing IDs to avoid duplicates
const existingIds = new Set(foods.map(f => f.id));
const added = [];

INGREDIENTS.forEach(item => {
    if (!existingIds.has(item.id)) {
        foods.push(item);
        added.push(item.name);
    }
});

fs.writeFileSync(dataPath, JSON.stringify(foods, null, 2));
console.log(`Added ${added.length} ingredients:`, added.join(', '));
