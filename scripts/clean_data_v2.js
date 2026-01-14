const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

console.log(`Original Count: ${foods.length}`);

// Keywords to REMOVE (Junk/Redundant)
const REMOVE_KEYWORDS = [
    'セット',
    '弁当',
    '定食',
    '小', 'ミニ', 'ハーフ',
    '大', '特盛', '倍', 'メガ',
    '業務用',
    'トッピング',
    '追加',
    'ソース',
    'タレ',
    'ドレッシング',
    'なし', // e.g. "肉なし" unless it's a valid dish
    'のみ', // e.g. "具のみ"
    '増量',
    '変更',
    '付き',
    '入り', // Often implies a variant like "Cheese-iri"
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
    'テスト'
];

// Keywords to KEEP (Premium/Category markers to ensure we don't over-clean)
// (Not strictly used for inclusion, but good for reference)
// const KEEP_CATEGORIES = ['Sushi', 'Steak', 'Ramen', 'Burger', 'Dessert'];

let cleaned = foods.filter(food => {
    // 1. Remove if name contains removal keywords
    if (REMOVE_KEYWORDS.some(k => food.name.includes(k))) return false;

    // 2. Remove if calories are 0 or suspicious (unless water/tea)
    if (food.calories <= 0 && !['水', 'お茶', 'コーヒー'].some(n => food.name.includes(n))) return false;

    // 3. Remove if name is too long (often detailed product names)
    if (food.name.length > 20) return false;

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
