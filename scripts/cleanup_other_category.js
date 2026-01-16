// 食材の「その他」から調理済みメニューとコンビニメニューを削除・再分類

const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

console.log(`Total foods before cleanup: ${foods.length}`);

// コンビニメニューのID
const convenienceStoreItems = [
    'temaki-onigiri', 'onigiri', 'karaage-kun', 'famichiki', 'nanachiki',
    'salad-chicken', 'lawson', 'familymart', '7-eleven', 'seven'
];

// 調理済みメニュー（居酒屋メニュー、惣菜など）
const preparedFoodItems = [
    'karaage', '唐揚げ', 'yakitori', '焼き鳥', 'gyoza', '餃子',
    'french-fries', 'fried-potato', 'potato-salad', 'dashimaki',
    'shirako', 'eihire', 'kusaya'
];

// アルコール飲料
const alcoholicBeverages = [
    'beer', 'sake', 'lemon-sour', 'highball', 'wine', 'shochu'
];

// 乳製品（dairyカテゴリーに移動すべき）
const dairyProducts = [
    'milk', 'cheese', 'yogurt', 'butter', 'cream'
];

// 野菜（vegetableカテゴリーに移動すべき）
const vegetables = [
    'onion', '玉ねぎ', 'spinach', 'ほうれん草'
];

let reclassifiedCount = 0;
let removedCount = 0;

foods.forEach(food => {
    // コンビニメニューの検出と再分類
    const isConvenience = convenienceStoreItems.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword)
    );

    if (isConvenience) {
        console.log(`Reclassifying to Convenience: ${food.name} (${food.id})`);
        food.category = 'Convenience';
        if (food.tags) {
            food.tags = food.tags.filter(tag => tag !== 'Other');
            if (!food.tags.includes('Convenience')) {
                food.tags.push('Convenience');
            }
        }
        reclassifiedCount++;
        return;
    }

    // 調理済みメニューの検出と再分類
    const isPrepared = preparedFoodItems.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword)
    );

    if (isPrepared && food.category === 'Other') {
        console.log(`Reclassifying to Prepared: ${food.name} (${food.id})`);
        food.category = 'Prepared';
        if (food.tags) {
            food.tags = food.tags.filter(tag => tag !== 'Other');
            if (!food.tags.includes('Prepared')) {
                food.tags.push('Prepared');
            }
        }
        reclassifiedCount++;
        return;
    }

    // アルコール飲料の検出と再分類
    const isAlcohol = alcoholicBeverages.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword)
    );

    if (isAlcohol) {
        console.log(`Reclassifying to Drink: ${food.name} (${food.id})`);
        food.category = 'Drink';
        if (food.tags) {
            food.tags = food.tags.filter(tag => tag !== 'Other');
            if (!food.tags.includes('Drink')) {
                food.tags.push('Drink');
            }
        }
        reclassifiedCount++;
        return;
    }

    // 乳製品の検出と再分類
    const isDairy = dairyProducts.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword)
    );

    if (isDairy && food.category !== 'Dairy') {
        console.log(`Reclassifying to Dairy: ${food.name} (${food.id})`);
        food.category = 'Dairy';
        if (food.tags) {
            food.tags = food.tags.filter(tag => tag !== 'Other');
            if (!food.tags.includes('Dairy')) {
                food.tags.push('Dairy');
            }
        }
        reclassifiedCount++;
        return;
    }

    // 野菜の検出と再分類
    const isVegetable = vegetables.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword)
    );

    if (isVegetable && food.category !== 'Vegetable') {
        console.log(`Reclassifying to Vegetable: ${food.name} (${food.id})`);
        food.category = 'Vegetable';
        if (food.tags) {
            food.tags = food.tags.filter(tag => tag !== 'Other');
            if (!food.tags.includes('Vegetable')) {
                food.tags.push('Vegetable');
            }
        }
        reclassifiedCount++;
        return;
    }
});

// ファイルに書き込み
fs.writeFileSync(foodsPath, JSON.stringify(foods, null, 2), 'utf8');

console.log(`\n✅ Cleanup complete!`);
console.log(`Reclassified: ${reclassifiedCount} items`);
console.log(`Total foods: ${foods.length}`);
