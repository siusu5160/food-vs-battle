const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

const MINOR_FOODS = [
    // Regional Specialties
    { id: 'goya-chanpuru', name: 'ゴーヤチャンプルー', nameEn: 'Goya Chanpuru', calories: 250, protein: 12, fat: 18, carbs: 8, fiber: 4, salt: 1.2, emoji: '🥒', category: 'Regional' },
    { id: 'soko-soba', name: 'ソーキそば', nameEn: 'Soki Soba', calories: 600, protein: 25, fat: 20, carbs: 75, fiber: 2, salt: 5.5, emoji: '🍜', category: 'Regional' },
    { id: 'hoto', name: 'ほうとう', nameEn: 'Hoto (Pumpkin Noodle Soup)', calories: 450, protein: 10, fat: 5, carbs: 85, fiber: 8, salt: 3.5, emoji: '🍲', category: 'Regional' },
    { id: 'kiritanpo', name: 'きりたんぽ鍋', nameEn: 'Kiritanpo Nabe', calories: 350, protein: 15, fat: 8, carbs: 50, fiber: 5, salt: 3.0, emoji: '🍲', category: 'Regional' },
    { id: 'zunda-mochi', name: 'ずんだ餅', nameEn: 'Zunda Mochi', calories: 220, protein: 5, fat: 1, carbs: 48, fiber: 3, salt: 0.1, emoji: '🍡', category: 'Sweets' },
    { id: 'basashi', name: '馬刺し', nameEn: 'Basashi (Horse Sashimi)', calories: 110, protein: 20, fat: 2.5, carbs: 0, fiber: 0, salt: 0.1, emoji: '🐴', category: 'Meat' },

    // Izakaya / Otsumami (Niche)
    { id: 'shiokara', name: 'イカの塩辛', nameEn: 'Ika no Shiokara (Squid)', calories: 90, protein: 10, fat: 1, carbs: 5, fiber: 0, salt: 6.0, emoji: '🦑', category: 'Side' },
    { id: 'ankimo', name: 'あん肝', nameEn: 'Ankimo (Monkfish Liver)', calories: 450, protein: 10, fat: 40, carbs: 5, fiber: 0, salt: 0.8, emoji: '🐟', category: 'Side' },
    { id: 'shirako', name: '白子ポン酢', nameEn: 'Shirako (Milt)', calories: 62, protein: 13, fat: 0.8, carbs: 0.2, fiber: 0, salt: 1.5, emoji: '🥢', category: 'Side' },
    { id: 'eihire', name: 'エイヒレ', nameEn: 'Eihire (Stingray Fin)', calories: 300, protein: 30, fat: 1, carbs: 40, fiber: 0, salt: 4.0, emoji: '🍶', category: 'Side' },
    { id: 'kusaya', name: 'くさや', nameEn: 'Kusaya', calories: 180, protein: 35, fat: 4, carbs: 1, fiber: 0, salt: 3.0, emoji: '🐟', category: 'Side' },
    { id: 'umeboshi', name: '梅干し(1個)', nameEn: 'Umeboshi', calories: 5, protein: 0.1, fat: 0, carbs: 1, fiber: 0.5, salt: 2.0, emoji: '🔴', category: 'Side' },

    // Game Meat
    { id: 'venison-steak', name: '鹿肉ステーキ', nameEn: 'Venison Steak', calories: 150, protein: 30, fat: 3, carbs: 0, fiber: 0, salt: 0.5, emoji: '🦌', category: 'Meat' },
    { id: 'boar-stew', name: '猪肉(ぼたん鍋)', nameEn: 'Boar Meat', calories: 250, protein: 18, fat: 20, carbs: 0, fiber: 0, salt: 0.1, emoji: '🐗', category: 'Meat' },

    // Dagashi / Junk
    { id: 'umaibo', name: 'うまい棒(1本)', nameEn: 'Umaibo', calories: 34, protein: 0.5, fat: 2, carbs: 4, fiber: 0, salt: 0.1, emoji: '💈', category: 'Snack' },
    { id: 'big-katsu', name: 'ビッグカツ', nameEn: 'Big Katsu', calories: 120, protein: 3, fat: 8, carbs: 10, fiber: 0, salt: 0.5, emoji: '🍘', category: 'Snack' },
    { id: 'baby-star', name: 'ベビースターラーメン', nameEn: 'Baby Star Ramen', calories: 150, protein: 3, fat: 7, carbs: 18, fiber: 1, salt: 0.8, emoji: '🍜', category: 'Snack' },

    // Others
    { id: 'natto-pack', name: '納豆(1パック)', nameEn: 'Natto', calories: 100, protein: 8, fat: 5, carbs: 6, fiber: 3, salt: 0.0, emoji: '🥢', category: 'Soy' },
    { id: 'chikuwa', name: 'ちくわ(1本)', nameEn: 'Chikuwa', calories: 50, protein: 6, fat: 0.5, carbs: 6, fiber: 0, salt: 0.8, emoji: '🍢', category: 'Side' },
    { id: 'mozuku', name: 'もずく酢', nameEn: 'Mozuku Vinegar', calories: 15, protein: 0.5, fat: 0, carbs: 3, fiber: 2, salt: 1.0, emoji: '🌿', category: 'Side' }
];

// Check for existing IDs to avoid duplicates
const existingIds = new Set(foods.map(f => f.id));
const added = [];

MINOR_FOODS.forEach(item => {
    if (!existingIds.has(item.id)) {
        foods.push(item);
        added.push(item.name);
    }
});

fs.writeFileSync(dataPath, JSON.stringify(foods, null, 2));
console.log(`Added ${added.length} minor items:`, added.join(', '));
