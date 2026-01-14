const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

// 1. IDs of items the user complained about (Redundant "Raw" items I just added)
const REDUNDANT_IDS_TO_REMOVE = [
    'chicken-breast-raw',
    'pork-loin-raw',
    'beef-sirloin-raw',
    'cabbage-raw',
    'carrot-raw',
    'onion-raw',
    'tomato-raw',
    'spinach-raw',
    'apple-raw',
    'banana-raw',
    'strawberry-raw',
    'rice-raw',
    'pasta-dried',
    'bread-slice',
    'tofu-momen',
    'egg-raw'
];

let cleaned = foods.filter(f => !REDUNDANT_IDS_TO_REMOVE.includes(f.id));

// 2. Add TRULY new/unique items (International, Specific Japanese Sweets, etc.)
// Checking against valid missing items
const UNIQUE_NEW_FOODS = [
    // Mexican
    { id: 'tacos-beef', name: 'タコス(ビーフ)', nameEn: 'Beef Tacos', calories: 226, protein: 10, fat: 12, carbs: 18, fiber: 3, salt: 0.8, emoji: '🌮', category: 'International' },
    { id: 'burrito-bean', name: 'ブリトー(豆)', nameEn: 'Bean Burrito', calories: 380, protein: 14, fat: 12, carbs: 55, fiber: 8, salt: 1.2, emoji: '🌯', category: 'International' },

    // Southeast Asian
    { id: 'pho-beef', name: 'フォー(牛肉)', nameEn: 'Beef Pho', calories: 350, protein: 20, fat: 6, carbs: 55, fiber: 2, salt: 3.5, emoji: '🍜', category: 'International' },
    { id: 'kebab-sandwich', name: 'ケバブサンド', nameEn: 'Kebab Sandwich', calories: 550, protein: 25, fat: 30, carbs: 45, fiber: 4, salt: 2.0, emoji: '🥙', category: 'International' },
    { id: 'tom-yum-kung', name: 'トムヤムクン', nameEn: 'Tom Yum Kung', calories: 150, protein: 12, fat: 8, carbs: 10, fiber: 2, salt: 4.5, emoji: '🥘', category: 'International' },

    // Indian
    { id: 'butter-chicken-curry', name: 'バターチキンカレー', nameEn: 'Butter Chicken Curry', calories: 450, protein: 25, fat: 30, carbs: 15, fiber: 3, salt: 2.5, emoji: '🍛', category: 'International' },
    { id: 'naan-plain', name: 'ナン(プレーン)', nameEn: 'Naan Bread', calories: 320, protein: 9, fat: 6, carbs: 55, fiber: 2, salt: 0.8, emoji: '🫓', category: 'International' },

    // Japanese Sweets (Wagashi - Specific)
    { id: 'dorayaki', name: 'どら焼き', nameEn: 'Dorayaki', calories: 230, protein: 5, fat: 2, carbs: 48, fiber: 2, salt: 0.2, emoji: '🥞', category: 'Sweets' },
    { id: 'taiyaki', name: 'たい焼き', nameEn: 'Taiyaki', calories: 220, protein: 6, fat: 2, carbs: 45, fiber: 1, salt: 0.4, emoji: '🐟', category: 'Sweets' },
    { id: 'castella', name: 'カステラ(1切れ)', nameEn: 'Castella Cake', calories: 160, protein: 3, fat: 4, carbs: 28, fiber: 0, salt: 0.1, emoji: '🍰', category: 'Sweets' },
    { id: 'yokan-slice', name: '羊羹(1切れ)', nameEn: 'Yokan', calories: 140, protein: 2, fat: 0, carbs: 34, fiber: 1, salt: 0, emoji: '🍵', category: 'Sweets' },

    // Drink / Alcohol
    { id: 'highball', name: 'ハイボール', nameEn: 'Highball', calories: 100, protein: 0, fat: 0, carbs: 0, fiber: 0, salt: 0, emoji: '🥃', category: 'Alcohol' },
    { id: 'shochu-rocks', name: '焼酎(ロック)', nameEn: 'Shochu (Rocks)', calories: 140, protein: 0, fat: 0, carbs: 0, fiber: 0, salt: 0, emoji: '🍶', category: 'Alcohol' },
    { id: 'wine-red-glass', name: '赤ワイン(グラス)', nameEn: 'Red Wine (Glass)', calories: 85, protein: 0.2, fat: 0, carbs: 2, fiber: 0, salt: 0, emoji: '🍷', category: 'Alcohol' }
];

const existingIds = new Set(cleaned.map(f => f.id));
const added = [];

UNIQUE_NEW_FOODS.forEach(item => {
    if (!existingIds.has(item.id)) {
        cleaned.push(item);
        added.push(item.name);
    }
});

fs.writeFileSync(dataPath, JSON.stringify(cleaned, null, 2));
console.log(`Removed redundant items and Added ${added.length} unique items:`, added.join(', '));
