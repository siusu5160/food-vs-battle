const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

console.log(`Original count: ${foods.length}`);

const keywordsToRemove = [
    'セット',
    '定食', // Users usually want to battle single items vs single items, sets complicate things? User said "Set", "Small", "Large".
    '（小）',
    '(小)',
    '（大）',
    '(大)',
    '（ミニ）',
    '(ミニ)',
    'サイズ',
    '特盛',
    '倍', // Double patty etc
    '低糖質版',
    '業務用',
    '特選',
    '増量中',
    'ロカボ生活', // User specifically mentioned this being broken (0g)
];

// Heuristic: Keep items that do NOT match the keywords
const cleaned = foods.filter(food => {
    const name = food.name;
    // Check if name contains any of the keywords
    return !keywordsToRemove.some(kw => name.includes(kw));
});

console.log(`Cleaned count: ${cleaned.length}`);

// Write back
fs.writeFileSync(dataPath, JSON.stringify(cleaned, null, 2));
console.log('Successfully cleaned foods.json');
