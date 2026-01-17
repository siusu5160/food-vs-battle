const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
let foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

console.log(`Initial count: ${foods.length}`);

// 1. Remove generic items from FastFood/Restaurant/Snack categories
// Keep items if they have a known brand prefix or are in other categories
const brandPrefixes = [
    "マクドナルド", "モス", "KFC", "ケンタッキー", "サイゼリヤ", "スシロー", "くら寿司", "はま寿司",
    "吉野家", "すき家", "松屋", "CoCo壱番屋", "丸亀製麺", "ミスド", "ミスタードーナツ",
    "スターバックス", "スタバ", "ドトール", "タリーズ", "コメダ",
    "セブン", "ファミマ", "ローソン", "ミニストップ",
    "ガスト", "バーミヤン", "デニーズ", "ロイヤルホスト"
];

const categoriesToClean = ["FastFood", "Restaurant", "Snack", "Convenience"];

foods = foods.filter(food => {
    // If it's not in the target categories, keep it
    if (!categoriesToClean.includes(food.category)) return true;

    // Check if name starts with a brand prefix or contains it (roughly)
    const hasBrand = brandPrefixes.some(brand => food.name.includes(brand));

    if (!hasBrand) {
        console.log(`🗑️ Removing generic item: ${food.name} (${food.category})`);
        return false;
    }
    return true;
});

console.log(`Count after removal: ${foods.length}`);

// 2. Add new popular branded items
const newItems = [
    // --- Starbucks (Popular) ---
    { id: "starbucks-star-latte-t", name: "スタバ スターバックスラテ(Tall)", nameEn: "Starbucks Latte (Tall)", category: "Restaurant", calories: 223, protein: 11.9, fat: 12.3, carbs: 16.5, fiber: 0, salt: 0.3, emoji: "☕", tags: ["Restaurant", "Drink"] },
    { id: "starbucks-matcha-frappucino-t", name: "スタバ 抹茶クリームフラペチーノ(Tall)", nameEn: "Starbucks Matcha Frappuccino (Tall)", category: "Restaurant", calories: 322, protein: 4.5, fat: 12.8, carbs: 48.5, fiber: 0.5, salt: 0.4, emoji: "🥤", tags: ["Restaurant", "Drink", "Sweet", "HighSugar"] },
    { id: "starbucks-dark-mocha-chip-frappucino-t", name: "スタバ ダークモカチップフラペチーノ(Tall)", nameEn: "Starbucks Dark Mocha Chip Frappuccino (Tall)", category: "Restaurant", calories: 348, protein: 4.8, fat: 14.5, carbs: 50.2, fiber: 1.2, salt: 0.3, emoji: "🥤", tags: ["Restaurant", "Drink", "Sweet", "HighSugar"] },
    { id: "starbucks-chocolate-scone", name: "スタバ チョコレートチャンクスコーン", nameEn: "Starbucks Chocolate Chunk Scone", category: "Snack", calories: 358, protein: 6.5, fat: 16.8, carbs: 45.2, fiber: 1.5, salt: 0.8, emoji: "🍪", tags: ["Restaurant", "Snack", "Sweet", "HighCarb"] },

    // --- McDonald's (More Popular Items) ---
    { id: "mac-bacon-lettuce", name: "マクドナルド ベーコンレタスバーガー", nameEn: "McDonald's Bacon Lettuce Burger", category: "FastFood", calories: 374, protein: 17.5, fat: 21.5, carbs: 27.8, fiber: 1.8, salt: 2.1, emoji: "🍔", tags: ["Restaurant", "FastFood", "Meat"] },
    { id: "mac-ebi-filet", name: "マクドナルド えびフィレオ", nameEn: "McDonald's Shrimp Filet-O", category: "FastFood", calories: 395, protein: 12.8, fat: 17.5, carbs: 46.5, fiber: 2.5, salt: 2.4, emoji: "🍔", tags: ["Restaurant", "FastFood", "Fish"] },
    { id: "mac-mcflurry-oreo", name: "マクドナルド マックフルーリー オレオ", nameEn: "McDonald's McFlurry Oreo", category: "FastFood", calories: 235, protein: 5.2, fat: 8.5, carbs: 34.5, fiber: 0.5, salt: 0.4, emoji: "🍦", tags: ["Restaurant", "FastFood", "Sweet"] },

    // --- Saizeriya (More Popular Items) ---
    { id: "saize-arosticini", name: "サイゼリヤ アロスティチーニ(ラムの串焼き)", nameEn: "Saizeriya Arrosticini", category: "Restaurant", calories: 224, protein: 18.5, fat: 16.5, carbs: 0.5, fiber: 0, salt: 1.2, emoji: "🍢", tags: ["Restaurant", "Meat", "LowCarb"] },
    { id: "saize-spicy-chicken", name: "サイゼリヤ 辛味チキン", nameEn: "Saizeriya Spicy Chicken", category: "Restaurant", calories: 295, protein: 19.5, fat: 21.5, carbs: 4.5, fiber: 0.5, salt: 1.8, emoji: "🍗", tags: ["Restaurant", "Meat", "LowCarb"] },

    // --- Gyudon Chains (Sukiya, Matsuya) ---
    { id: "sukiya-gyudon-nami", name: "すき家 牛丼(並盛)", nameEn: "Sukiya Beef Bowl (Regular)", category: "Restaurant", calories: 733, protein: 22.5, fat: 25.4, carbs: 104.2, fiber: 2.5, salt: 3.5, emoji: "🍚", tags: ["Restaurant", "Carb", "Meat"] },
    { id: "sukiya-cheese-gyudon", name: "すき家 とろ〜り3種のチーズ牛丼(並)", nameEn: "Sukiya 3-Cheese Beef Bowl", category: "Restaurant", calories: 911, protein: 35.8, fat: 42.5, carbs: 106.5, fiber: 2.5, salt: 4.5, emoji: "🍚", tags: ["Restaurant", "Carb", "Meat", "HighCalorie"] },
    { id: "matsuya-gyumeshi-nami", name: "松屋 牛めし(並盛)", nameEn: "Matsuya Gyumeshi (Regular)", category: "Restaurant", calories: 692, protein: 19.5, fat: 24.5, carbs: 95.8, fiber: 2.1, salt: 3.2, emoji: "🍚", tags: ["Restaurant", "Carb", "Meat"] },

    // --- Kura Sushi ---
    { id: "kura-maguro", name: "くら寿司 極み熟成まぐろ", nameEn: "Kura Sushi Aged Tuna", category: "Restaurant", calories: 88, protein: 6.5, fat: 0.8, carbs: 13.5, fiber: 0, salt: 0.6, emoji: "🍣", tags: ["Restaurant", "Fish"] },
    { id: "kura-salmon", name: "くら寿司 サーモン", nameEn: "Kura Sushi Salmon", category: "Restaurant", calories: 98, protein: 5.2, fat: 4.8, carbs: 13.8, fiber: 0, salt: 0.7, emoji: "🍣", tags: ["Restaurant", "Fish"] },

    // --- Konbini (Popular Selections) ---
    // Seven Eleven
    { id: "seven-pudding", name: "セブン きみだけのプリン", nameEn: "Seven-Eleven Pudding", category: "Snack", calories: 139, protein: 4.5, fat: 7.2, carbs: 14.5, fiber: 0, salt: 0.1, emoji: "🍮", tags: ["Convenience", "Snack", "Sweet"] },
    { id: "seven-cafe-latte", name: "セブン カフェラテ(R)", nameEn: "Seven-Eleven Cafe Latte", category: "FastFood", calories: 92, protein: 4.5, fat: 4.8, carbs: 7.2, fiber: 0, salt: 0.2, emoji: "☕", tags: ["Convenience", "Drink"] },
    // Lawson
    { id: "lawson-mochimochi-roll", name: "ローソン もち食感ロール", nameEn: "Lawson Mochi Roll", category: "Snack", calories: 585, protein: 7.5, fat: 34.5, carbs: 61.5, fiber: 0.5, salt: 0.8, emoji: "🍰", tags: ["Convenience", "Snack", "Sweet", "HighCalorie"] },
    { id: "lawson-egg-sandwich", name: "ローソン たまごサンド", nameEn: "Lawson Egg Sandwich", category: "FastFood", calories: 345, protein: 12.5, fat: 21.5, carbs: 24.5, fiber: 1.5, salt: 1.8, emoji: "🥪", tags: ["Convenience", "Carb", "Egg"] },
    // FamilyMart
    { id: "famima-frappe-cafe", name: "ファミマ カフェフラッペ", nameEn: "FamilyMart Cafe Frappe", category: "Snack", calories: 198, protein: 3.5, fat: 6.8, carbs: 32.5, fiber: 0.5, salt: 0.3, emoji: "🥤", tags: ["Convenience", "Drink", "Sweet"] },
    { id: "famima-chou", name: "ファミマ クリームたっぷり！濃厚カスタードシュー", nameEn: "FamilyMart Custard Chou", category: "Snack", calories: 245, protein: 5.2, fat: 16.5, carbs: 18.5, fiber: 0.5, salt: 0.3, emoji: "🥧", tags: ["Convenience", "Snack", "Sweet"] }
];

// Combine unique items
const existingIds = new Set(foods.map(f => f.id));
const itemsToAdd = newItems.filter(f => !existingIds.has(f.id));

if (itemsToAdd.length > 0) {
    foods.push(...itemsToAdd);
    console.log(`✅ Added ${itemsToAdd.length} new branded items.`);
} else {
    console.log(`ℹ️ No new items to add (all duplicates).`);
}

// Write back
fs.writeFileSync(foodsPath, JSON.stringify(foods, null, 2), 'utf8');
console.log(`Final count: ${foods.length}`);
