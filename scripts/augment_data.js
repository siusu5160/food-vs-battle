const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

const NEW_FOODS = [
    // Sushi Items
    { id: 'sushi-maguro', name: '寿司(マグロ)', nameEn: 'Sushi (Tuna)', calories: 120, protein: 12, fat: 1, carbs: 14, fiber: 0, salt: 0.5, emoji: '🍣', category: 'Sushi' },
    { id: 'sushi-salmon', name: '寿司(サーモン)', nameEn: 'Sushi (Salmon)', calories: 130, protein: 10, fat: 4, carbs: 14, fiber: 0, salt: 0.5, emoji: '🍣', category: 'Sushi' },
    { id: 'sushi-tamago', name: '寿司(玉子)', nameEn: 'Sushi (Egg)', calories: 100, protein: 4, fat: 3, carbs: 12, fiber: 0, salt: 0.8, emoji: '🍣', category: 'Sushi' },

    // Fast Food
    { id: 'cheeseburger', name: 'チーズバーガー', nameEn: 'Cheeseburger', calories: 303, protein: 15, fat: 13, carbs: 30, fiber: 2, salt: 1.8, emoji: '🍔', category: 'Fast Food' },
    { id: 'french-fries-m', name: 'フライドポテト(M)', nameEn: 'French Fries (M)', calories: 410, protein: 5, fat: 20, carbs: 50, fiber: 4, salt: 1.0, emoji: '🍟', category: 'Fast Food' },
    { id: 'pizza-slice', name: 'ピザ(1切れ)', nameEn: 'Pizza (Slice)', calories: 285, protein: 12, fat: 10, carbs: 36, fiber: 2, salt: 0.6, emoji: '🍕', category: 'Fast Food' },
    { id: 'fried-chicken', name: 'フライドチキン', nameEn: 'Fried Chicken', calories: 250, protein: 18, fat: 15, carbs: 10, fiber: 0, salt: 1.2, emoji: '🍗', category: 'Meat' },

    // Japanese Classics
    { id: 'niku-jaga', name: '肉じゃが', nameEn: 'Nikujaga (Meat & Potato Stew)', calories: 350, protein: 10, fat: 15, carbs: 40, fiber: 4, salt: 2.5, emoji: '🍲', category: 'Japanese' },
    { id: 'karaage', name: '唐揚げ(5個)', nameEn: 'Karaage (Fried Chicken)', calories: 450, protein: 30, fat: 25, carbs: 15, fiber: 0, salt: 2.0, emoji: '🍗', category: 'Japanese' },
    { id: 'gyudon', name: '牛丼', nameEn: 'Gyudon (Beef Bowl)', calories: 750, protein: 25, fat: 30, carbs: 90, fiber: 3, salt: 4.0, emoji: '🥣', category: 'Japanese' },
    { id: 'katsudon', name: 'カツ丼', nameEn: 'Katsudon (Pork Cutlet Bowl)', calories: 900, protein: 35, fat: 40, carbs: 100, fiber: 4, salt: 4.5, emoji: '🥣', category: 'Japanese' },

    // Sweets & Drinks
    { id: 'potato-chips', name: 'ポテトチップス(1袋)', nameEn: 'Potato Chips (Bag)', calories: 335, protein: 3, fat: 22, carbs: 31, fiber: 2, salt: 0.6, emoji: '🥔', category: 'Snack' },
    { id: 'chocolate-bar', name: '板チョコレート', nameEn: 'Chocolate Bar', calories: 279, protein: 4, fat: 17, carbs: 27, fiber: 3, salt: 0.1, emoji: '🍫', category: 'Sweets' },
    { id: 'ice-cream-vanilla', name: 'バニラアイス', nameEn: 'Vanilla Ice Cream', calories: 207, protein: 4, fat: 11, carbs: 24, fiber: 0, salt: 0.2, emoji: '🍦', category: 'Sweets' },
    { id: 'beer-mug', name: '生ビール(中ジョッキ)', nameEn: 'Beer (Mug)', calories: 200, protein: 2, fat: 0, carbs: 15, fiber: 0, salt: 0, emoji: '🍺', category: 'Drink' },
    { id: 'coke-bottle', name: 'コーラ(500ml)', nameEn: 'Cola (500ml)', calories: 225, protein: 0, fat: 0, carbs: 56, fiber: 0, salt: 0, emoji: '🥤', category: 'Drink' },

    // Healthy / Ingredients
    { id: 'broccoli-boiled', name: 'ブロッコリー(茹で)', nameEn: 'Boiled Broccoli', calories: 35, protein: 3, fat: 0, carbs: 6, fiber: 4, salt: 0, emoji: '🥦', category: 'Vegetable' },
    { id: 'avocado-whole', name: 'アボカド(1個)', nameEn: 'Avocado', calories: 250, protein: 3, fat: 23, carbs: 12, fiber: 10, salt: 0, emoji: '🥑', category: 'Vegetable' },
    { id: 'boiled-egg', name: 'ゆで卵', nameEn: 'Boiled Egg', calories: 78, protein: 6, fat: 5, carbs: 0.6, fiber: 0, salt: 0.3, emoji: '🥚', category: 'Other' }
];

// Check for existing IDs to avoid duplicates
const existingIds = new Set(foods.map(f => f.id));
const added = [];

NEW_FOODS.forEach(item => {
    if (!existingIds.has(item.id)) {
        foods.push(item);
        added.push(item.name);
    }
});

fs.writeFileSync(dataPath, JSON.stringify(foods, null, 2));
console.log(`Added ${added.length} new items:`, added.join(', '));
