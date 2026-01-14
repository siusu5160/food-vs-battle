const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

const MASSIVE_ADDITIONS = [
    // Fruits (Standard)
    { id: 'mikan', name: 'みかん(1個)', nameEn: 'Mandarin Orange', calories: 45, protein: 0.7, fat: 0.1, carbs: 11, fiber: 1, salt: 0, emoji: '🍊', category: 'Fruit' },
    { id: 'grape-bunch', name: 'ぶどう(1房)', nameEn: 'Grapes', calories: 120, protein: 1, fat: 0.2, carbs: 30, fiber: 1, salt: 0, emoji: '🍇', category: 'Fruit' },
    { id: 'melon-slice', name: 'メロン(1切れ)', nameEn: 'Melon', calories: 50, protein: 1, fat: 0.1, carbs: 12, fiber: 1, salt: 0, emoji: '🍈', category: 'Fruit' },
    { id: 'peach-whole', name: '桃(1個)', nameEn: 'Peach', calories: 80, protein: 1.5, fat: 0.2, carbs: 20, fiber: 2, salt: 0, emoji: '🍑', category: 'Fruit' },
    { id: 'lemon-whole', name: 'レモン(1個)', nameEn: 'Lemon', calories: 30, protein: 1, fat: 0.5, carbs: 10, fiber: 3, salt: 0, emoji: '🍋', category: 'Fruit' },
    { id: 'kiwi-whole', name: 'キウイ(1個)', nameEn: 'Kiwi', calories: 50, protein: 1, fat: 0.5, carbs: 12, fiber: 2.5, salt: 0, emoji: '🥝', category: 'Fruit' },
    { id: 'pineapple-slice', name: 'パイナップル(カット)', nameEn: 'Pineapple', calories: 50, protein: 0.5, fat: 0, carbs: 13, fiber: 1.5, salt: 0, emoji: '🍍', category: 'Fruit' },

    // Vegetables (Root/Staple)
    { id: 'potato-raw', name: 'じゃがいも(1個)', nameEn: 'Potato', calories: 110, protein: 3, fat: 0, carbs: 25, fiber: 3, salt: 0, emoji: '🥔', category: 'Vegetable' },
    { id: 'sweet-potato-raw', name: 'さつまいも(1本)', nameEn: 'Sweet Potato', calories: 260, protein: 2, fat: 0.5, carbs: 60, fiber: 4, salt: 0, emoji: '🍠', category: 'Vegetable' },
    { id: 'pumpkin-slice', name: 'かぼちゃ(100g)', nameEn: 'Pumpkin', calories: 90, protein: 2, fat: 0.5, carbs: 20, fiber: 4, salt: 0, emoji: '🎃', category: 'Vegetable' },
    { id: 'renkon-raw', name: 'レンコン(1節)', nameEn: 'Lotus Root', calories: 70, protein: 2, fat: 0, carbs: 15, fiber: 2, salt: 0, emoji: '🥢', category: 'Vegetable' },
    { id: 'gobo-raw', name: 'ごぼう(1本)', nameEn: 'Burdock Root', calories: 65, protein: 1.5, fat: 0, carbs: 15, fiber: 6, salt: 0, emoji: '🥢', category: 'Vegetable' },

    // Vegetables (Green/Other)
    { id: 'green-pepper', name: 'ピーマン(1個)', nameEn: 'Green Pepper', calories: 5, protein: 0.3, fat: 0, carbs: 1, fiber: 0.5, salt: 0, emoji: '🫑', category: 'Vegetable' },
    { id: 'corn-ear', name: 'とうもろこし(1本)', nameEn: 'Corn', calories: 150, protein: 5, fat: 2, carbs: 30, fiber: 4, salt: 0, emoji: '🌽', category: 'Vegetable' },
    { id: 'shiitake', name: 'しいたけ(2個)', nameEn: 'Shiitake Mushroom', calories: 10, protein: 1, fat: 0, carbs: 2, fiber: 1.5, salt: 0, emoji: '🍄', category: 'Vegetable' },
    { id: 'asparagus', name: 'アスパラガス(1束)', nameEn: 'Asparagus', calories: 25, protein: 3, fat: 0, carbs: 4, fiber: 2, salt: 0, emoji: '🥬', category: 'Vegetable' },
    { id: 'garlic-clove', name: 'にんにく(1片)', nameEn: 'Garlic', calories: 10, protein: 0.5, fat: 0, carbs: 2, fiber: 0, salt: 0, emoji: '🧄', category: 'Vegetable' },

    // Seafood (Shell/Other)
    { id: 'octopus-raw', name: 'タコ(刺身)', nameEn: 'Octopus', calories: 76, protein: 16, fat: 0.7, carbs: 0.1, fiber: 0, salt: 0.3, emoji: '🐙', category: 'Seafood' },
    { id: 'squid-raw', name: 'イカ(刺身)', nameEn: 'Squid', calories: 88, protein: 18, fat: 1, carbs: 0.2, fiber: 0, salt: 0.3, emoji: '🦑', category: 'Seafood' },
    { id: 'scallop-raw', name: 'ホタテ(1個)', nameEn: 'Scallop', calories: 40, protein: 7, fat: 0.3, carbs: 1.5, fiber: 0, salt: 0.1, emoji: '🐚', category: 'Seafood' },
    { id: 'oyster-raw', name: 'カキ(1個)', nameEn: 'Oyster', calories: 12, protein: 1.3, fat: 0.4, carbs: 1, fiber: 0, salt: 0.1, emoji: '🦪', category: 'Seafood' },
    { id: 'eel-unagi', name: 'うなぎ蒲焼', nameEn: 'Eel (Unagi)', calories: 290, protein: 23, fat: 21, carbs: 3, fiber: 0, salt: 1.3, emoji: '🍱', category: 'Seafood' },

    // Meat (Variety)
    { id: 'ground-chicken', name: '鶏ひき肉', nameEn: 'Ground Chicken', calories: 180, protein: 19, fat: 11, carbs: 0, fiber: 0, salt: 0.1, emoji: '🐔', category: 'Meat' },
    { id: 'beef-tongue', name: '牛タン', nameEn: 'Beef Tongue', calories: 270, protein: 15, fat: 22, carbs: 0.2, fiber: 0, salt: 0.1, emoji: '👅', category: 'Meat' },
    { id: 'liver-pork', name: '豚レバー', nameEn: 'Pork Liver', calories: 130, protein: 20, fat: 4, carbs: 2, fiber: 0, salt: 0.1, emoji: '🥩', category: 'Meat' },

    // Processed / Dairy
    { id: 'cheese-camembert', name: 'カマンベールチーズ(1切)', nameEn: 'Camembert Cheese', calories: 60, protein: 4, fat: 5, carbs: 0, fiber: 0, salt: 0.2, emoji: '🧀', category: 'Dairy' },
    { id: 'croissant', name: 'クロワッサン', nameEn: 'Croissant', calories: 200, protein: 4, fat: 12, carbs: 20, fiber: 1, salt: 0.4, emoji: '🥐', category: 'Bread' },
    { id: 'bagel-plain', name: 'ベーグル', nameEn: 'Bagel', calories: 250, protein: 10, fat: 1, carbs: 50, fiber: 2, salt: 0.7, emoji: '🥯', category: 'Bread' },
    { id: 'konjac', name: 'こんにゃく', nameEn: 'Konjac', calories: 5, protein: 0.1, fat: 0, carbs: 2, fiber: 2, salt: 0, emoji: '🍢', category: 'Ingredient' },
    { id: 'seaweed-nori', name: '海苔(1枚)', nameEn: 'Nori Seaweed', calories: 6, protein: 1, fat: 0, carbs: 1, fiber: 1, salt: 0, emoji: '⬛', category: 'Ingredient' }
];

const existingIds = new Set(foods.map(f => f.id));
const existingNames = new Set(foods.map(f => f.name));
const added = [];

MASSIVE_ADDITIONS.forEach(item => {
    // Check ID and rough Name match to avoid "already exists" complaints
    if (!existingIds.has(item.id) && !existingNames.has(item.name)) {
        foods.push(item);
        added.push(item.name);
    }
});

fs.writeFileSync(dataPath, JSON.stringify(foods, null, 2));
console.log(`Added ${added.length} MASSIVE items:`, added.join(', '));
