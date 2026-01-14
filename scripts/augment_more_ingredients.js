const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

// List of potential ingredients to check and add
const CANDIDATES = [
    // Meat
    { id: 'ground-meat-mix', name: '合い挽き肉(生)', nameEn: 'Ground Meat (Beef/Pork)', calories: 220, protein: 18, fat: 15, carbs: 0, fiber: 0, salt: 0.1, emoji: '🥩', category: 'Ingredient' },
    { id: 'pork-belly-raw', name: '豚バラ肉(生)', nameEn: 'Pork Belly', calories: 386, protein: 14, fat: 34, carbs: 0.1, fiber: 0, salt: 0.1, emoji: '🥓', category: 'Ingredient' },
    { id: 'bacon-slice', name: 'ベーコン', nameEn: 'Bacon', calories: 405, protein: 12, fat: 39, carbs: 0.3, fiber: 0, salt: 2.0, emoji: '🥓', category: 'Ingredient' },
    { id: 'sausage-wiener', name: 'ウインナー(1本)', nameEn: 'Wiener Sausage', calories: 60, protein: 2, fat: 5, carbs: 1, fiber: 0, salt: 0.4, emoji: '🌭', category: 'Ingredient' },
    { id: 'ham-slice', name: 'ロースハム(1枚)', nameEn: 'Ham Slice', calories: 40, protein: 3, fat: 2, carbs: 1, fiber: 0, salt: 0.5, emoji: '🍖', category: 'Ingredient' },

    // Fish / Seafood
    { id: 'salmon-filet', name: '鮭の切り身(生)', nameEn: 'Salmon Filet', calories: 130, protein: 22, fat: 4, carbs: 0, fiber: 0, salt: 0.1, emoji: '🐟', category: 'Ingredient' },
    { id: 'mackerel-raw', name: 'サバ(生)', nameEn: 'Mackerel', calories: 200, protein: 20, fat: 12, carbs: 0, fiber: 0, salt: 0.2, emoji: '🐟', category: 'Ingredient' },
    { id: 'tuna-canned-oil', name: 'ツナ缶(オイル)', nameEn: 'Canned Tuna (Oil)', calories: 200, protein: 15, fat: 15, carbs: 0, fiber: 0, salt: 0.8, emoji: '🥫', category: 'Ingredient' },
    { id: 'shrimp-raw', name: 'むきエビ(生)', nameEn: 'Shrimp', calories: 85, protein: 20, fat: 0.5, carbs: 0, fiber: 0, salt: 0.4, emoji: '🦐', category: 'Ingredient' },

    // Vegetables
    { id: 'cucumber-raw', name: 'きゅうり(1本)', nameEn: 'Cucumber', calories: 14, protein: 1, fat: 0, carbs: 3, fiber: 1, salt: 0, emoji: '🥒', category: 'Ingredient' },
    { id: 'eggplant-raw', name: 'なす(1個)', nameEn: 'Eggplant', calories: 18, protein: 1, fat: 0, carbs: 4, fiber: 2, salt: 0, emoji: '🍆', category: 'Ingredient' },
    { id: 'moyashi-pack', name: 'もやし(1袋)', nameEn: 'Bean Sprouts', calories: 30, protein: 4, fat: 0, carbs: 5, fiber: 3, salt: 0, emoji: '🌱', category: 'Ingredient' },
    { id: 'daikon-raw', name: '大根(100g)', nameEn: 'Daikon Radish', calories: 18, protein: 0.5, fat: 0, carbs: 4, fiber: 1.5, salt: 0, emoji: '🥢', category: 'Ingredient' },
    { id: 'lettuce-leaf', name: 'レタス(葉)', nameEn: 'Lettuce', calories: 12, protein: 0.6, fat: 0, carbs: 2, fiber: 1, salt: 0, emoji: '🥬', category: 'Ingredient' },

    // Others
    { id: 'milk-glass', name: '牛乳(200ml)', nameEn: 'Milk', calories: 134, protein: 6.6, fat: 7.6, carbs: 9.6, fiber: 0, salt: 0.2, emoji: '🥛', category: 'Ingredient' },
    { id: 'yogurt-plain', name: 'ヨーグルト(プレーン)', nameEn: 'Yogurt', calories: 60, protein: 3.5, fat: 3, carbs: 5, fiber: 0, salt: 0.1, emoji: '🥣', category: 'Ingredient' },
    { id: 'butter-pat', name: 'バター(10g)', nameEn: 'Butter', calories: 75, protein: 0, fat: 8, carbs: 0, fiber: 0, salt: 0.2, emoji: '🧈', category: 'Ingredient' }
];

const existingIds = new Set(foods.map(f => f.id));
const existingNames = new Set(foods.map(f => f.name));
const added = [];

CANDIDATES.forEach(item => {
    // Check ID and rough Name match to avoid "already exists" complaints
    if (!existingIds.has(item.id) && !existingNames.has(item.name)) {
        foods.push(item);
        added.push(item.name);
    }
});

fs.writeFileSync(dataPath, JSON.stringify(foods, null, 2));
console.log(`Added ${added.length} NEW ingredients:`, added.join(', '));
