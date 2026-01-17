const fs = require('fs');
const path = require('path');

// Massive list of chain restaurant menus
// Nutrition data is approximate based on standard values from official sites
const newChainMenus = [
    // --- Saizeriya ---
    { id: "saize-milano-doria", name: "サイゼリヤ ミラノ風ドリア", nameEn: "Saizeriya Milanese Doria", category: "Restaurant", calories: 521, protein: 12.8, fat: 28.5, carbs: 49.3, fiber: 2.5, salt: 2.6, emoji: "🥘", tags: ["Restaurant", "Carb"] },
    { id: "saize-peperoncino", name: "サイゼリヤ ペペロンチーノ", nameEn: "Saizeriya Peperoncino", category: "Restaurant", calories: 527, protein: 16.5, fat: 21.0, carbs: 64.2, fiber: 4.8, salt: 2.3, emoji: "🍝", tags: ["Restaurant", "Carb"] },
    { id: "saize-carbonara", name: "サイゼリヤ カルボナーラ", nameEn: "Saizeriya Carbonara", category: "Restaurant", calories: 735, protein: 26.5, fat: 38.2, carbs: 67.5, fiber: 2.1, salt: 2.8, emoji: "🍝", tags: ["Restaurant", "Carb", "HighCalorie"] },
    { id: "saize-margherita", name: "サイゼリヤ マルゲリータピザ", nameEn: "Saizeriya Margherita Pizza", category: "Restaurant", calories: 568, protein: 25.4, fat: 26.8, carbs: 54.2, fiber: 3.5, salt: 3.1, emoji: "🍕", tags: ["Restaurant", "Carb", "Dairy"] },
    { id: "saize-escargot", name: "サイゼリヤ エスカルゴのオーブン焼き", nameEn: "Saizeriya Escargot", category: "Restaurant", calories: 220, protein: 7.5, fat: 18.2, carbs: 5.4, fiber: 1.2, salt: 1.3, emoji: "🐌", tags: ["Restaurant", "Appetizer"] },
    { id: "saize-shrimp-salad", name: "サイゼリヤ 小エビのサラダ", nameEn: "Saizeriya Shrimp Salad", category: "Restaurant", calories: 125, protein: 8.5, fat: 8.2, carbs: 4.5, fiber: 2.1, salt: 1.1, emoji: "🥗", tags: ["Restaurant", "Vegetable"] },
    { id: "saize-focaccia", name: "サイゼリヤ プチフォッカ", nameEn: "Saizeriya Petit Focaccia", category: "Restaurant", calories: 107, protein: 2.8, fat: 2.5, carbs: 18.2, fiber: 0.8, salt: 0.4, emoji: "🍞", tags: ["Restaurant", "Carb", "Side"] },
    { id: "saize-corn-soup", name: "サイゼリヤ コーンクリームスープ", nameEn: "Saizeriya Corn Soup", category: "Restaurant", calories: 142, protein: 2.5, fat: 8.2, carbs: 14.5, fiber: 1.1, salt: 1.2, emoji: "🌽", tags: ["Restaurant", "Soup"] },
    { id: "saize-hamburg-steak", name: "サイゼリヤ ハンバーグステーキ", nameEn: "Saizeriya Hamburg Steak", category: "Restaurant", calories: 432, protein: 22.5, fat: 28.5, carbs: 16.5, fiber: 1.8, salt: 2.5, emoji: "🍖", tags: ["Restaurant", "Meat"] },
    { id: "saize-tiramisu", name: "サイゼリヤ ティラミス", nameEn: "Saizeriya Tiramisu", category: "Restaurant", calories: 255, protein: 4.2, fat: 18.5, carbs: 16.8, fiber: 0.5, salt: 0.2, emoji: "🍰", tags: ["Restaurant", "Dessert"] },

    // --- Sushiro ---
    { id: "sushiro-maguro", name: "スシロー まぐろ", nameEn: "Sushiro Tuna", category: "Restaurant", calories: 76, protein: 5.8, fat: 0.5, carbs: 11.2, fiber: 0, salt: 0.8, emoji: "🍣", tags: ["Restaurant", "Fish"] },
    { id: "sushiro-salmon", name: "スシロー サーモン", nameEn: "Sushiro Salmon", category: "Restaurant", calories: 95, protein: 4.8, fat: 4.5, carbs: 11.5, fiber: 0, salt: 0.9, emoji: "🍣", tags: ["Restaurant", "Fish"] },
    { id: "sushiro-ebi-avo", name: "スシロー えびアボカド", nameEn: "Sushiro Shrimp Avocado", category: "Restaurant", calories: 112, protein: 5.2, fat: 5.8, carbs: 12.5, fiber: 0.8, salt: 1.1, emoji: "🍣", tags: ["Restaurant", "Fish"] },
    { id: "sushiro-ikura", name: "スシロー いくら", nameEn: "Sushiro Salmon Roe", category: "Restaurant", calories: 78, protein: 4.5, fat: 2.1, carbs: 10.8, fiber: 0, salt: 1.5, emoji: "🍣", tags: ["Restaurant", "Fish"] },
    { id: "sushiro-tamago", name: "スシロー たまご", nameEn: "Sushiro Egg", category: "Restaurant", calories: 118, protein: 3.5, fat: 5.2, carbs: 14.2, fiber: 0, salt: 1.1, emoji: "🍣", tags: ["Restaurant", "Egg"] },
    { id: "sushiro-ramen", name: "スシロー 鯛だし塩ラーメン", nameEn: "Sushiro Snapper Broth Ramen", category: "Restaurant", calories: 285, protein: 12.5, fat: 8.5, carbs: 38.5, fiber: 1.5, salt: 4.8, emoji: "🍜", tags: ["Restaurant", "Noodle"] },
    { id: "sushiro-fries", name: "スシロー フライドポテト", nameEn: "Sushiro French Fries", category: "Restaurant", calories: 288, protein: 3.5, fat: 14.5, carbs: 35.8, fiber: 2.8, salt: 1.8, emoji: "🍟", tags: ["Restaurant", "Side"] },
    { id: "sushiro-chawanmushi", name: "スシロー 茶碗蒸し", nameEn: "Sushiro Chawanmushi", category: "Restaurant", calories: 82, protein: 6.8, fat: 3.5, carbs: 4.8, fiber: 0.5, salt: 1.5, emoji: "🥚", tags: ["Restaurant", "Side"] },

    // --- McDonald's ---
    { id: "mac-bigmac", name: "マクドナルド ビッグマック", nameEn: "McDonald's Big Mac", category: "FastFood", calories: 525, protein: 26.0, fat: 28.3, carbs: 41.8, fiber: 3.2, salt: 2.6, emoji: "🍔", tags: ["Restaurant", "FastFood", "Meat"] },
    { id: "mac-cheeseburger", name: "マクドナルド チーズバーガー", nameEn: "McDonald's Cheeseburger", category: "FastFood", calories: 307, protein: 15.8, fat: 13.4, carbs: 30.3, fiber: 1.8, salt: 1.9, emoji: "🍔", tags: ["Restaurant", "FastFood"] },
    { id: "mac-filet-o-fish", name: "マクドナルド フィレオフィッシュ", nameEn: "McDonald's Filet-O-Fish", category: "FastFood", calories: 323, protein: 14.5, fat: 14.2, carbs: 34.2, fiber: 1.5, salt: 1.7, emoji: "🍔", tags: ["Restaurant", "FastFood", "Fish"] },
    { id: "mac-teriyaki-mcburger", name: "マクドナルド てりやきマックバーガー", nameEn: "McDonald's Teriyaki McBurger", category: "FastFood", calories: 478, protein: 14.5, fat: 30.2, carbs: 36.4, fiber: 1.8, salt: 2.2, emoji: "🍔", tags: ["Restaurant", "FastFood"] },
    { id: "mac-fries-m", name: "マクドナルド マックフライポテト(M)", nameEn: "McDonald's Fries (M)", category: "FastFood", calories: 410, protein: 5.3, fat: 20.6, carbs: 51.0, fiber: 4.2, salt: 0.8, emoji: "🍟", tags: ["Restaurant", "FastFood", "Side"] },
    { id: "mac-nuggets-5", name: "マクドナルド チキンマックナゲット(5ピース)", nameEn: "McDonald's McNuggets (5pc)", category: "FastFood", calories: 270, protein: 15.8, fat: 17.2, carbs: 13.1, fiber: 0.9, salt: 1.3, emoji: "🍗", tags: ["Restaurant", "FastFood", "Meat"] },
    { id: "mac-shake-vanilla-m", name: "マクドナルド マックシェイク バニラ(M)", nameEn: "McDonald's McShake Vanilla (M)", category: "FastFood", calories: 348, protein: 7.2, fat: 7.8, carbs: 62.5, fiber: 0, salt: 0.5, emoji: "🥤", tags: ["Restaurant", "FastFood", "Drink"] },
    { id: "mac-apple-pie", name: "マクドナルド ホットアップルパイ", nameEn: "McDonald's Hot Apple Pie", category: "FastFood", calories: 211, protein: 1.9, fat: 10.8, carbs: 26.5, fiber: 1.2, salt: 0.3, emoji: "🥧", tags: ["Restaurant", "FastFood", "Dessert"] },

    // --- Yoshinoya ---
    { id: "yoshi-gyudon-nami", name: "吉野家 牛丼(並盛)", nameEn: "Yoshinoya Beef Bowl (Regular)", category: "Restaurant", calories: 635, protein: 20.2, fat: 21.4, carbs: 89.2, fiber: 1.8, salt: 2.5, emoji: "🍚", tags: ["Restaurant", "Carb", "Meat"] },
    { id: "yoshi-gyudon-atama", name: "吉野家 牛丼(アタマの大盛)", nameEn: "Yoshinoya Beef Bowl (Large Meat)", category: "Restaurant", calories: 724, protein: 23.5, fat: 26.8, carbs: 95.8, fiber: 2.1, salt: 3.1, emoji: "🍚", tags: ["Restaurant", "Carb", "Meat"] },
    { id: "yoshi-cheese-gyudon", name: "吉野家 チーズ牛丼(並盛)", nameEn: "Yoshinoya Cheese Beef Bowl", category: "Restaurant", calories: 785, protein: 28.5, fat: 34.2, carbs: 90.5, fiber: 2.0, salt: 3.2, emoji: "🍚", tags: ["Restaurant", "Carb", "Meat"] },
    { id: "yoshi-curry", name: "吉野家 スパイシーカレー(並盛)", nameEn: "Yoshinoya Spicy Curry", category: "Restaurant", calories: 568, protein: 10.5, fat: 18.5, carbs: 85.2, fiber: 4.5, salt: 3.8, emoji: "🍛", tags: ["Restaurant", "Carb"] },
    { id: "yoshi-salmon-set", name: "吉野家 焼魚定食", nameEn: "Yoshinoya Grilled Fish Set", category: "Restaurant", calories: 598, protein: 24.5, fat: 15.8, carbs: 88.5, fiber: 2.5, salt: 3.5, emoji: "🍱", tags: ["Restaurant", "Fish"] },

    // --- Marugame Seimen ---
    { id: "marugame-kamaage", name: "丸亀製麺 釜揚げうどん(並)", nameEn: "Marugame Kamaage Udon", category: "Restaurant", calories: 338, protein: 8.5, fat: 1.4, carbs: 68.5, fiber: 2.1, salt: 3.2, emoji: "🍜", tags: ["Restaurant", "Noodle"] },
    { id: "marugame-kake", name: "丸亀製麺 かけうどん(並)", nameEn: "Marugame Kake Udon", category: "Restaurant", calories: 299, protein: 8.2, fat: 1.1, carbs: 65.2, fiber: 1.8, salt: 4.5, emoji: "🍜", tags: ["Restaurant", "Noodle"] },
    { id: "marugame-bukake", name: "丸亀製麺 ぶっかけうどん(並)", nameEn: "Marugame Bukkake Udon", category: "Restaurant", calories: 305, protein: 8.4, fat: 1.2, carbs: 66.5, fiber: 2.0, salt: 3.8, emoji: "🍜", tags: ["Restaurant", "Noodle"] },
    { id: "marugame-kashiwa", name: "丸亀製麺 かしわ天", nameEn: "Marugame Chicken Tempura", category: "Restaurant", calories: 158, protein: 12.5, fat: 7.8, carbs: 9.5, fiber: 0.2, salt: 0.8, emoji: "🍤", tags: ["Restaurant", "Side"] },
    { id: "marugame-kakiage", name: "丸亀製麺 野菜かき揚げ", nameEn: "Marugame Veggie Kakiage", category: "Restaurant", calories: 456, protein: 5.2, fat: 28.5, carbs: 42.5, fiber: 3.5, salt: 1.2, emoji: "🍤", tags: ["Restaurant", "Side", "HighFat"] },
    { id: "marugame-inari", name: "丸亀製麺 いなり", nameEn: "Marugame Inari Sushi", category: "Restaurant", calories: 121, protein: 3.2, fat: 3.5, carbs: 18.5, fiber: 0.8, salt: 0.9, emoji: "🍣", tags: ["Restaurant", "Carb"] },

    // --- KFC ---
    { id: "kfc-original", name: "KFC オリジナルチキン(1P)", nameEn: "KFC Original Chicken", category: "FastFood", calories: 237, protein: 18.3, fat: 14.7, carbs: 7.9, fiber: 0.5, salt: 1.7, emoji: "🍗", tags: ["Restaurant", "FastFood", "Meat"] },
    { id: "kfc-boneless", name: "KFC 骨なしケンタッキー", nameEn: "KFC Boneless Chicken", category: "FastFood", calories: 204, protein: 19.5, fat: 10.8, carbs: 7.2, fiber: 0.3, salt: 1.8, emoji: "🍗", tags: ["Restaurant", "FastFood", "Meat"] },
    { id: "kfc-biscuit", name: "KFC ビスケット", nameEn: "KFC Biscuit", category: "FastFood", calories: 200, protein: 3.2, fat: 10.5, carbs: 23.5, fiber: 0.8, salt: 0.9, emoji: "🥐", tags: ["Restaurant", "FastFood", "Side"] },
    { id: "kfc-coleslaw-s", name: "KFC コールスロー(S)", nameEn: "KFC Coleslaw (S)", category: "FastFood", calories: 92, protein: 0.8, fat: 6.8, carbs: 6.5, fiber: 1.2, salt: 0.7, emoji: "🥗", tags: ["Restaurant", "FastFood", "Side"] },
    { id: "kfc-twister-pepper", name: "KFC ツイスター ペッパーマヨ", nameEn: "KFC Twister Pepper Mayo", category: "FastFood", calories: 340, protein: 12.5, fat: 18.2, carbs: 32.5, fiber: 1.5, salt: 2.1, emoji: "🌯", tags: ["Restaurant", "FastFood"] },

    // --- Mos Burger ---
    { id: "mos-burger", name: "モスバーガー", nameEn: "Mos Burger", category: "FastFood", calories: 367, protein: 13.5, fat: 14.2, carbs: 46.5, fiber: 2.8, salt: 2.1, emoji: "🍔", tags: ["Restaurant", "FastFood"] },
    { id: "mos-cheese", name: "モスチーズバーガー", nameEn: "Mos Cheeseburger", category: "FastFood", calories: 420, protein: 16.2, fat: 18.5, carbs: 47.2, fiber: 2.9, salt: 2.5, emoji: "🍔", tags: ["Restaurant", "FastFood"] },
    { id: "mos-teriyaki", name: "モス テリヤキバーガー", nameEn: "Mos Teriyaki Burger", category: "FastFood", calories: 377, protein: 12.8, fat: 15.2, carbs: 47.5, fiber: 2.5, salt: 2.3, emoji: "🍔", tags: ["Restaurant", "FastFood"] },
    { id: "mos-rice-seafood", name: "モス ライスバーガー 海鮮かきあげ", nameEn: "Mos Rice Burger Seafood", category: "FastFood", calories: 388, protein: 9.5, fat: 12.8, carbs: 58.5, fiber: 1.5, salt: 2.1, emoji: "🍔", tags: ["Restaurant", "FastFood", "Carb"] },

    // --- Mister Donut ---
    { id: "mister-pon-de-ring", name: "ミスド ポン・デ・リング", nameEn: "Mister Donut Pon de Ring", category: "Snack", calories: 217, protein: 1.2, fat: 11.9, carbs: 26.5, fiber: 0.5, salt: 0.6, emoji: "🍩", tags: ["Restaurant", "Snack", "Sweet"] },
    { id: "mister-old-fashion", name: "ミスド オールドファッション", nameEn: "Mister Donut Old Fashion", category: "Snack", calories: 293, protein: 3.5, fat: 18.5, carbs: 28.2, fiber: 0.8, salt: 0.7, emoji: "🍩", tags: ["Restaurant", "Snack", "Sweet"] },
    { id: "mister-golden-choco", name: "ミスド ゴールデンチョコレート", nameEn: "Mister Donut Golden Chocolate", category: "Snack", calories: 269, protein: 3.2, fat: 14.2, carbs: 32.5, fiber: 1.1, salt: 0.8, emoji: "🍩", tags: ["Restaurant", "Snack", "Sweet"] },
    { id: "mister-angel-french", name: "ミスド エンゼルフレンチ", nameEn: "Mister Donut Angel French", category: "Snack", calories: 192, protein: 2.1, fat: 12.5, carbs: 17.5, fiber: 0.6, salt: 0.5, emoji: "🍩", tags: ["Restaurant", "Snack", "Sweet"] },

    // --- Pizza-La / Domino's (Generic Pizza) ---
    { id: "pizza-margherita-m", name: "ピザ マルゲリータ(Mサイズ1切れ)", nameEn: "Pizza Margherita (1 slice M)", category: "FastFood", calories: 165, protein: 6.5, fat: 5.8, carbs: 21.5, fiber: 1.2, salt: 1.1, emoji: "🍕", tags: ["Restaurant", "FastFood"] },
    { id: "pizza-pepperoni-m", name: "ピザ ペパロニ(Mサイズ1切れ)", nameEn: "Pizza Pepperoni (1 slice M)", category: "FastFood", calories: 185, protein: 7.2, fat: 8.5, carbs: 20.8, fiber: 1.1, salt: 1.3, emoji: "🍕", tags: ["Restaurant", "FastFood"] },

    // --- CoCo Ichibanya ---
    { id: "coco-pork-curry", name: "CoCo壱番屋 ポークカレー(普通)", nameEn: "CoCo Ichi Pork Curry", category: "Restaurant", calories: 755, protein: 12.5, fat: 28.5, carbs: 108.5, fiber: 5.2, salt: 3.8, emoji: "🍛", tags: ["Restaurant", "Carb"] },
    { id: "coco-katsu-curry", name: "CoCo壱番屋 ロースカツカレー(普通)", nameEn: "CoCo Ichi Katsu Curry", category: "Restaurant", calories: 1184, protein: 28.5, fat: 58.2, carbs: 128.5, fiber: 6.5, salt: 4.8, emoji: "🍛", tags: ["Restaurant", "Carb", "HighCalorie"] },
    { id: "coco-cheese-curry", name: "CoCo壱番屋 チーズカレー(普通)", nameEn: "CoCo Ichi Cheese Curry", category: "Restaurant", calories: 928, protein: 21.5, fat: 42.5, carbs: 110.5, fiber: 5.5, salt: 4.5, emoji: "🍛", tags: ["Restaurant", "Carb"] }
];

const foodsPath = path.join(__dirname, '../src/data/foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

// Unique ID check
const existingIds = new Set(foods.map(f => f.id));
const foodsToAdd = newChainMenus.filter(f => !existingIds.has(f.id));

if (foodsToAdd.length > 0) {
    foods.push(...foodsToAdd);
    fs.writeFileSync(foodsPath, JSON.stringify(foods, null, 2), 'utf8');
    console.log(`✅ Successfully added ${foodsToAdd.length} new chain restaurant items.`);
} else {
    console.log('ℹ️ All items already exist. No changes made.');
}

console.log(`Total foods count: ${foods.length}`);
