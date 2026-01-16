// マクドナルドのアイテムを復元

const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

// 復元するマクドナルドのメニュー
const mcdonaldsItems = [
    {
        id: 'mac-teriyaki-burger',
        name: 'てりやきマックバーガー',
        nameEn: "McDonald's Teriyaki McBurger",
        category: 'FastFood',
        calories: 478,
        protein: 15.8,
        fat: 30.9,
        carbs: 33.4,
        fiber: 2.1,
        salt: 2.1,
        emoji: '🍔',
        tags: ['FastFood']
    },
    {
        id: 'mac-chicken-nuggets-5',
        name: 'チキンマックナゲット(5ピース)',
        nameEn: "McDonald's Chicken McNuggets (5pc)",
        category: 'FastFood',
        calories: 270,
        protein: 15.8,
        fat: 17.2,
        carbs: 13.3,
        fiber: 0.9,
        salt: 1.3,
        emoji: '🍗',
        tags: ['FastFood', 'HighProtein']
    }
];

// 既存のIDをチェック
const existingIds = new Set(foods.map(f => f.id));
const newItems = mcdonaldsItems.filter(item => !existingIds.has(item.id));

console.log(`Restoring ${newItems.length} McDonald's items...`);
newItems.forEach(item => console.log(`  + ${item.name}`));

// 追加
foods.push(...newItems);

// 保存
fs.writeFileSync(foodsPath, JSON.stringify(foods, null, 2), 'utf8');

console.log(`\n✅ Restored McDonald's items!`);
console.log(`Total foods: ${foods.length}`);
