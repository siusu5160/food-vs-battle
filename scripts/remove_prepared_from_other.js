// 食材の「その他」に残っている調理済みメニューを削除

const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

console.log(`Total foods before cleanup: ${foods.length}`);

// 削除対象の調理済みメニュー（IDまたは名前で判定）
const toRemove = [
    '鶏の唐揚げ', '唐揚げ',
    '焼き鳥', 'yakitori',
    '焼き餃子', '餃子', 'gyoza',
    'フライドポテト', 'french-fries', 'fried-potato',
    'ポテトサラダ', 'potato-salad',
    'だし巻き卵', 'dashimaki',
    '白子ポン酢', 'shirako',
    'エイヒレ', 'eihire',
    'くさや', 'kusaya',
    'ビール', 'beer',
    '日本酒', 'sake',
    'レモンサワー', 'lemon-sour',
    'ハイボール', 'highball',
    'マヨネーズ', 'mayonnaise',
    'ケチャップ', 'ketchup',
    '醤油', 'soy-sauce',
    'ビッグマック', 'big-mac'
];

let removedCount = 0;

const cleanedFoods = foods.filter(food => {
    const shouldRemove = toRemove.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword)
    );

    if (shouldRemove) {
        console.log(`Removing: ${food.name} (${food.id})`);
        removedCount++;
        return false;
    }

    return true;
});

// ファイルに書き込み
fs.writeFileSync(foodsPath, JSON.stringify(cleanedFoods, null, 2), 'utf8');

console.log(`\n✅ Cleanup complete!`);
console.log(`Removed: ${removedCount} items`);
console.log(`Total foods after cleanup: ${cleanedFoods.length}`);
