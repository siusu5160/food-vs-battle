// 食材「その他」の完全クリーンアップと適切な分類

const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

console.log(`Total foods before cleanup: ${foods.length}`);

let reclassifiedCount = 0;
let removedCount = 0;

// カテゴリーマッピング
const categoryMappings = {
    // 野菜
    vegetables: [
        'ブロッコリー', 'broccoli', 'キャベツ', 'cabbage', 'レタス', 'lettuce',
        'きゅうり', 'cucumber', 'トマト', 'tomato', 'にんじん', 'carrot',
        'なす', 'eggplant', 'もやし', 'bean-sprouts', '大根', 'daikon'
    ],
    // 肉
    meat: [
        '合い挽き肉', 'ground-meat', '豚バラ肉', 'pork-belly', 'ベーコン', 'bacon',
        'ウインナー', 'wiener', 'ロースハム', 'ham'
    ],
    // 魚
    fish: [
        '鮭の切り身', 'salmon', 'サバ', 'mackerel', 'ツナ缶', 'tuna',
        'むきエビ', 'shrimp', 'タコ', 'octopus', 'イカ', 'squid',
        'ホタテ', 'scallop', 'カキ', 'oyster', 'うなぎ', 'eel',
        'イカの塩辛', 'salted-squid', 'あん肝', 'ankimo'
    ],
    // アルコール
    alcohol: [
        'ウイスキー', 'whiskey', '赤ワイン', 'wine', '白ワイン', '焼酎', 'shochu'
    ],
    // 調理済み（削除対象）
    prepared: [
        'てりやきマックバーガー', 'teriyaki', 'マックフライポテト', 'mcfries',
        'チキンマックナゲット', 'mcnuggets', 'スターバックスラテ', 'starbucks',
        '抹茶クリームフラペチーノ', 'frappuccino', 'チョコレートチャンクスコーン', 'scone',
        'からあげクン', 'karaage-kun', 'ゴーヤチャンプルー', 'goya',
        'ほうとう', 'hoto', 'きりたんぽ', 'kiritanpo', 'タコス', 'tacos',
        'ブリトー', 'burrito', 'フォー', 'pho', 'ケバブ', 'kebab',
        'トムヤムクン', 'tom-yum', 'ナン', 'naan'
    ],
    // デザート（削除対象）
    dessert: [
        'ずんだ餅', 'zunda', 'たい焼き', 'taiyaki', 'カステラ', 'castella',
        '羊羹', 'yokan'
    ],
    // スナック（削除対象）
    snack: [
        '一本満足バー', 'ippon', 'オイコス', 'oikos'
    ]
};

foods.forEach(food => {
    // 野菜の再分類
    if (categoryMappings.vegetables.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword))) {
        if (food.category !== 'Vegetable') {
            console.log(`Reclassifying to Vegetable: ${food.name}`);
            food.category = 'Vegetable';
            reclassifiedCount++;
        }
        return;
    }

    // 肉の再分類
    if (categoryMappings.meat.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword))) {
        if (food.category !== 'Meat') {
            console.log(`Reclassifying to Meat: ${food.name}`);
            food.category = 'Meat';
            reclassifiedCount++;
        }
        return;
    }

    // 魚の再分類
    if (categoryMappings.fish.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword))) {
        if (food.category !== 'Fish') {
            console.log(`Reclassifying to Fish: ${food.name}`);
            food.category = 'Fish';
            reclassifiedCount++;
        }
        return;
    }

    // アルコールの再分類
    if (categoryMappings.alcohol.some(keyword =>
        food.id.includes(keyword) || food.name.includes(keyword))) {
        if (food.category !== 'Alcohol') {
            console.log(`Reclassifying to Alcohol: ${food.name}`);
            food.category = 'Alcohol';
            if (food.tags) {
                food.tags = food.tags.filter(tag => tag !== 'Other');
                if (!food.tags.includes('Alcohol')) {
                    food.tags.push('Alcohol');
                }
            }
            reclassifiedCount++;
        }
        return;
    }
});

// 調理済みメニュー、デザート、スナックを削除
const cleanedFoods = foods.filter(food => {
    const shouldRemove = [
        ...categoryMappings.prepared,
        ...categoryMappings.dessert,
        ...categoryMappings.snack
    ].some(keyword => food.id.includes(keyword) || food.name.includes(keyword));

    if (shouldRemove) {
        console.log(`Removing: ${food.name}`);
        removedCount++;
        return false;
    }

    return true;
});

// ファイルに書き込み
fs.writeFileSync(foodsPath, JSON.stringify(cleanedFoods, null, 2), 'utf8');

console.log(`\n✅ Complete cleanup finished!`);
console.log(`Reclassified: ${reclassifiedCount} items`);
console.log(`Removed: ${removedCount} items`);
console.log(`Total foods after cleanup: ${cleanedFoods.length}`);
