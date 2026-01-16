// 有名チェーン店のメニューデータ
// 栄養データは各店舗の公式サイトから取得

const newRestaurantMenus = [
    // すき家
    {
        id: "sukiya-gyudon-nami",
        name: "牛丼(並盛)",
        nameEn: "Sukiya Beef Bowl (Regular)",
        category: "Restaurant",
        calories: 733,
        protein: 23.8,
        fat: 25.3,
        carbs: 92.4,
        fiber: 2.1,
        salt: 2.8,
        emoji: "🍚",
        tags: ["Restaurant", "Carb"]
    },
    {
        id: "sukiya-gyudon-mega",
        name: "牛丼(メガ盛)",
        nameEn: "Sukiya Beef Bowl (Mega)",
        category: "Restaurant",
        calories: 1176,
        protein: 38.2,
        fat: 40.6,
        carbs: 148.3,
        fiber: 3.4,
        salt: 4.5,
        emoji: "🍚",
        tags: ["Restaurant", "Carb", "HighCalorie"]
    },
    {
        id: "sukiya-karaage-curry",
        name: "から揚げカレー",
        nameEn: "Sukiya Fried Chicken Curry",
        category: "Restaurant",
        calories: 1051,
        protein: 32.4,
        fat: 42.1,
        carbs: 128.7,
        fiber: 3.2,
        salt: 4.1,
        emoji: "🍛",
        tags: ["Restaurant", "Carb"]
    },

    // 松屋
    {
        id: "matsuya-gyudon-nami",
        name: "牛めし(並盛)",
        nameEn: "Matsuya Beef Rice (Regular)",
        category: "Restaurant",
        calories: 709,
        protein: 22.1,
        fat: 23.8,
        carbs: 94.5,
        fiber: 2.3,
        salt: 2.6,
        emoji: "🍚",
        tags: ["Restaurant", "Carb"]
    },
    {
        id: "matsuya-kalbi-yakiniku",
        name: "カルビ焼肉定食",
        nameEn: "Matsuya Kalbi Yakiniku Set",
        category: "Restaurant",
        calories: 1038,
        protein: 28.9,
        fat: 45.2,
        carbs: 112.3,
        fiber: 3.1,
        salt: 4.8,
        emoji: "🥩",
        tags: ["Restaurant", "Meat", "HighFat"]
    },
    {
        id: "matsuya-chicken-nanban",
        name: "チキン南蛮定食",
        nameEn: "Matsuya Chicken Nanban Set",
        category: "Restaurant",
        calories: 1142,
        protein: 35.6,
        fat: 52.3,
        carbs: 118.7,
        fiber: 2.8,
        salt: 3.9,
        emoji: "🍗",
        tags: ["Restaurant", "Meat", "HighCalorie"]
    },

    // くら寿司
    {
        id: "kura-maguro",
        name: "まぐろ(くら寿司)",
        nameEn: "Kura Sushi Tuna",
        category: "Restaurant",
        calories: 68,
        protein: 5.8,
        fat: 0.3,
        carbs: 10.2,
        fiber: 0.3,
        salt: 0.5,
        emoji: "🍣",
        tags: ["Restaurant", "HighProtein", "LowFat"]
    },
    {
        id: "kura-salmon",
        name: "サーモン(くら寿司)",
        nameEn: "Kura Sushi Salmon",
        category: "Restaurant",
        calories: 82,
        protein: 5.2,
        fat: 2.1,
        carbs: 10.3,
        fiber: 0.3,
        salt: 0.5,
        emoji: "🍣",
        tags: ["Restaurant"]
    },
    {
        id: "kura-ebi-avocado",
        name: "えびアボカド(くら寿司)",
        nameEn: "Kura Sushi Shrimp Avocado",
        category: "Restaurant",
        calories: 95,
        protein: 4.8,
        fat: 3.2,
        carbs: 11.5,
        fiber: 1.2,
        salt: 0.6,
        emoji: "🍣",
        tags: ["Restaurant"]
    },

    // はま寿司
    {
        id: "hama-maguro",
        name: "まぐろ(はま寿司)",
        nameEn: "Hama Sushi Tuna",
        category: "Restaurant",
        calories: 70,
        protein: 6.1,
        fat: 0.4,
        carbs: 10.1,
        fiber: 0.3,
        salt: 0.5,
        emoji: "🍣",
        tags: ["Restaurant", "HighProtein", "LowFat"]
    },
    {
        id: "hama-salmon",
        name: "サーモン(はま寿司)",
        nameEn: "Hama Sushi Salmon",
        category: "Restaurant",
        calories: 85,
        protein: 5.5,
        fat: 2.3,
        carbs: 10.2,
        fiber: 0.3,
        salt: 0.5,
        emoji: "🍣",
        tags: ["Restaurant"]
    },
    {
        id: "hama-hamachi",
        name: "はまち(はま寿司)",
        nameEn: "Hama Sushi Yellowtail",
        category: "Restaurant",
        calories: 92,
        protein: 5.8,
        fat: 2.8,
        carbs: 10.3,
        fiber: 0.3,
        salt: 0.5,
        emoji: "🍣",
        tags: ["Restaurant"]
    },

    // スターバックス
    {
        id: "starbucks-latte-tall",
        name: "スターバックスラテ(Tall)",
        nameEn: "Starbucks Latte (Tall)",
        category: "Drink",
        calories: 219,
        protein: 11.2,
        fat: 8.6,
        carbs: 21.7,
        fiber: 0,
        salt: 0.3,
        emoji: "☕",
        tags: ["Drink", "Dairy"]
    },
    {
        id: "starbucks-caramel-frappuccino",
        name: "キャラメルフラペチーノ(Tall)",
        nameEn: "Starbucks Caramel Frappuccino (Tall)",
        category: "Drink",
        calories: 302,
        protein: 4.1,
        fat: 3.9,
        carbs: 61.1,
        fiber: 0,
        salt: 0.4,
        emoji: "🥤",
        tags: ["Drink", "Snack"]
    },
    {
        id: "starbucks-cheesecake",
        name: "ニューヨークチーズケーキ",
        nameEn: "Starbucks NY Cheesecake",
        category: "Snack",
        calories: 414,
        protein: 7.2,
        fat: 30.1,
        carbs: 28.3,
        fiber: 0.5,
        salt: 0.5,
        emoji: "🍰",
        tags: ["Snack", "HighFat"]
    },

    // ミスタードーナツ
    {
        id: "mister-pon-de-ring",
        name: "ポン・デ・リング",
        nameEn: "Mister Donut Pon de Ring",
        category: "Snack",
        calories: 217,
        protein: 2.1,
        fat: 11.9,
        carbs: 25.7,
        fiber: 0.8,
        salt: 0.5,
        emoji: "🍩",
        tags: ["Snack"]
    },
    {
        id: "mister-chocolate-fashion",
        name: "チョコファッション",
        nameEn: "Mister Donut Chocolate Fashion",
        category: "Snack",
        calories: 364,
        protein: 4.8,
        fat: 21.3,
        carbs: 38.2,
        fiber: 1.2,
        salt: 0.8,
        emoji: "🍩",
        tags: ["Snack", "HighCalorie"]
    },
    {
        id: "mister-french-cruller",
        name: "フレンチクルーラー",
        nameEn: "Mister Donut French Cruller",
        category: "Snack",
        calories: 170,
        protein: 2.3,
        fat: 9.8,
        carbs: 18.5,
        fiber: 0.5,
        salt: 0.4,
        emoji: "🍩",
        tags: ["Snack"]
    },

    // マクドナルド（追加メニュー）
    {
        id: "mac-teriyaki-burger",
        name: "てりやきマックバーガー",
        nameEn: "McDonald's Teriyaki McBurger",
        category: "FastFood",
        calories: 478,
        protein: 15.8,
        fat: 30.9,
        carbs: 33.4,
        fiber: 2.1,
        salt: 2.1,
        emoji: "🍔",
        tags: ["FastFood"]
    },
    {
        id: "mac-chicken-nuggets-5",
        name: "チキンマックナゲット(5ピース)",
        nameEn: "McDonald's Chicken McNuggets (5pc)",
        category: "FastFood",
        calories: 270,
        protein: 15.8,
        fat: 17.2,
        carbs: 13.3,
        fiber: 0.9,
        salt: 1.3,
        emoji: "🍗",
        tags: ["FastFood", "HighProtein"]
    },
    {
        id: "mac-mcflurry-oreo",
        name: "マックフルーリーオレオ",
        nameEn: "McDonald's McFlurry Oreo",
        category: "Snack",
        calories: 294,
        protein: 6.4,
        fat: 9.8,
        carbs: 44.8,
        fiber: 0.5,
        salt: 0.4,
        emoji: "🍦",
        tags: ["Snack", "Dairy"]
    },

    // 丸亀製麺
    {
        id: "marugame-kake-udon",
        name: "かけうどん(並)",
        nameEn: "Marugame Kake Udon (Regular)",
        category: "Restaurant",
        calories: 302,
        protein: 8.1,
        fat: 1.2,
        carbs: 62.8,
        fiber: 2.3,
        salt: 4.8,
        emoji: "🍜",
        tags: ["Restaurant", "Carb", "LowFat"]
    },
    {
        id: "marugame-kamaage-udon",
        name: "釜揚げうどん(並)",
        nameEn: "Marugame Kamaage Udon (Regular)",
        category: "Restaurant",
        calories: 328,
        protein: 8.9,
        fat: 1.5,
        carbs: 67.2,
        fiber: 2.5,
        salt: 3.2,
        emoji: "🍜",
        tags: ["Restaurant", "Carb", "LowFat"]
    },
    {
        id: "marugame-tempura-udon",
        name: "天ぷらうどん(並)",
        nameEn: "Marugame Tempura Udon (Regular)",
        category: "Restaurant",
        calories: 558,
        protein: 14.2,
        fat: 15.8,
        carbs: 85.3,
        fiber: 3.8,
        salt: 5.2,
        emoji: "🍜",
        tags: ["Restaurant", "Carb"]
    },
    {
        id: "marugame-karaage",
        name: "鶏天(1個)",
        nameEn: "Marugame Chicken Tempura (1pc)",
        category: "Restaurant",
        calories: 145,
        protein: 8.9,
        fat: 8.2,
        carbs: 8.5,
        fiber: 0.3,
        salt: 0.8,
        emoji: "🍗",
        tags: ["Restaurant", "Meat"]
    }
];

// JSONファイルに追加
const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

// 既存のIDと重複しないか確認
const existingIds = new Set(foods.map(f => f.id));
const newFoods = newRestaurantMenus.filter(f => !existingIds.has(f.id));

console.log(`Adding ${newFoods.length} new restaurant menu items...`);

// 新しいアイテムを追加
foods.push(...newFoods);

// ファイルに書き込み
fs.writeFileSync(foodsPath, JSON.stringify(foods, null, 2), 'utf8');

console.log('✅ Successfully added restaurant menus!');
console.log(`Total foods: ${foods.length}`);
