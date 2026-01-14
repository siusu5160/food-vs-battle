const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

console.log(`Original Count: ${foods.length}`);

// Keywords to REMOVE (Specific junk/unwanted types)
const REMOVE_KEYWORDS = [
    // User specifically requested to remove these from *items*
    '低糖質',
    '特選',

    // Valid junk/meaningless
    'トッピング',
    '追加',
    'ソース',
    'タレ',
    'ドレッシング',
    'なし', // e.g. "肉なし"
    'のみ', // e.g. "具のみ"
    '増量',
    '変更',
    '付き',
    '入り',
    '風', // "Style"
    '味', // "Flavor"
    '残り',
    '残',
    '余り',
    '賞味期限',
    '見切り',
    'お試し',
    'サンプル',
    'test',
    'テスト',
    '業務用'
];

// Note: Removed 'set', 'bento' from ban list to increase variety as per request.

let cleaned = foods.filter(food => {
    // 1. Remove if name contains removal keywords
    if (REMOVE_KEYWORDS.some(k => food.name.includes(k))) return false;

    // 2. Remove if calories are 0 or suspicious (unless water/tea/coffee)
    if (food.calories <= 0 && !['水', 'お茶', 'コーヒー', '珈琲', 'ティー'].some(n => food.name.includes(n))) return false;

    // 3. Remove if name is too long (Relaxed limit to 30)
    if (food.name.length > 30) return false;

    return true;
});

// Remove duplicates by name
const uniqueNames = new Set();
cleaned = cleaned.filter(food => {
    if (uniqueNames.has(food.name)) return false;
    uniqueNames.add(food.name);
    return true;
});

console.log(`Cleaned Count: ${cleaned.length}`);

// Write back
fs.writeFileSync(dataPath, JSON.stringify(cleaned, null, 2));
console.log('Written to foods.json');
