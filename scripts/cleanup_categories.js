// 食材カテゴリーから調理済みメニューを削除し、スタバ・ミスドをデザートに再分類

const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

console.log(`Total foods before cleanup: ${foods.length}`);

// 削除対象: 食材カテゴリーに入っている調理済みメニュー
const toRemove = [
    'pizza',           // ピザ
    'hamburger',       // ハンバーガー
    'ramen',           // ラーメン系
    'curry',           // カレー系
    'pasta',           // パスタ系
    'spaghetti',       // スパゲッティ
    'udon',            // うどん（丸亀以外）
    'soba',            // そば
];

// スタバ・ミスドのメニューをデザートに再分類
const cafeItemsToReclassify = [
    'starbucks-',
    'mister-'
];

let removedCount = 0;
let reclassifiedCount = 0;

const cleanedFoods = foods.filter(food => {
    // 調理済みメニューで、レストランチェーンのIDでないものを削除
    const isGenericPrepared = toRemove.some(keyword => food.id.includes(keyword));
    const isChainMenu = food.id.includes('mac-') || food.id.includes('yoshi-') ||
        food.id.includes('saize-') || food.id.includes('sushiro-') ||
        food.id.includes('sukiya-') || food.id.includes('matsuya-') ||
        food.id.includes('kura-') || food.id.includes('hama-') ||
        food.id.includes('marugame-') || food.id.includes('mos-') ||
        food.id.includes('kfc-') || food.id.includes('subway-');

    if (isGenericPrepared && !isChainMenu) {
        console.log(`Removing: ${food.name} (${food.id})`);
        removedCount++;
        return false;
    }

    return true;
});

// スタバ・ミスドのアイテムをデザートに再分類
cleanedFoods.forEach(food => {
    const isCafeItem = cafeItemsToReclassify.some(prefix => food.id.startsWith(prefix));
    if (isCafeItem && food.category !== 'Dessert') {
        console.log(`Reclassifying to Dessert: ${food.name} (${food.id})`);
        food.category = 'Dessert';
        // Snackタグを削除してDessertタグを追加
        if (food.tags) {
            food.tags = food.tags.filter(tag => tag !== 'Snack');
            if (!food.tags.includes('Dessert')) {
                food.tags.push('Dessert');
            }
        }
        reclassifiedCount++;
    }
});

// ファイルに書き込み
fs.writeFileSync(foodsPath, JSON.stringify(cleanedFoods, null, 2), 'utf8');

console.log(`\n✅ Cleanup complete!`);
console.log(`Removed: ${removedCount} items`);
console.log(`Reclassified: ${reclassifiedCount} items`);
console.log(`Total foods after cleanup: ${cleanedFoods.length}`);
