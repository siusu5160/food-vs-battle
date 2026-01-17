const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
let foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

console.log(`Initial count: ${foods.length}`);

// New Items Data
const newItems = [
    // --- McDonald's (Added Standard Hamburger) ---
    { id: "mac-hamburger", name: "マクドナルド ハンバーガー", nameEn: "McDonald's Hamburger", category: "FastFood", calories: 256, protein: 12.8, fat: 9.4, carbs: 30.3, fiber: 1.5, salt: 1.4, emoji: "🍔", tags: ["FastFood", "Meat", "LowCalorie"] },

    // --- Mos Burger ---
    { id: "mos-mosburger", name: "モスバーガー", nameEn: "Mos Burger", category: "FastFood", calories: 367, protein: 14.8, fat: 15.5, carbs: 41.8, fiber: 2.5, salt: 2.5, emoji: "🍔", tags: ["FastFood", "Meat", "Vegetable"] },
    { id: "mos-cheese", name: "モスチーズバーガー", nameEn: "Mos Cheeseburger", category: "FastFood", calories: 420, protein: 17.5, fat: 20.5, carbs: 42.5, fiber: 2.5, salt: 3.1, emoji: "🍔", tags: ["FastFood", "Meat", "Vegetable"] },
    { id: "mos-teriyaki-chicken", name: "モス テリヤキチキンバーガー", nameEn: "Mos Teriyaki Chicken Burger", category: "FastFood", calories: 307, protein: 18.5, fat: 10.5, carbs: 33.5, fiber: 1.5, salt: 2.1, emoji: "🍔", tags: ["FastFood", "Meat", "Chicken"] },
    { id: "mos-spicy-mos", name: "モス スパイシーモスバーガー", nameEn: "Mos Spicy Mos Burger", category: "FastFood", calories: 370, protein: 15.0, fat: 15.6, carbs: 42.0, fiber: 2.6, salt: 2.5, emoji: "🍔", tags: ["FastFood", "Meat", "Spicy"] },

    // --- Lotteria ---
    { id: "lotteria-zetsuhin-cheese", name: "ロッテリア 絶品チーズバーガー", nameEn: "Lotteria Zetsuhin Cheeseburger", category: "FastFood", calories: 457, protein: 17.2, fat: 31.5, carbs: 25.8, fiber: 1.0, salt: 1.8, emoji: "🍔", tags: ["FastFood", "Meat", "HighFat"] },
    { id: "lotteria-ebi", name: "ロッテリア エビバーガー", nameEn: "Lotteria Shrimp Burger", category: "FastFood", calories: 486, protein: 12.5, fat: 28.5, carbs: 45.2, fiber: 1.5, salt: 2.1, emoji: "🍔", tags: ["FastFood", "Fish"] },
    { id: "lotteria-rib-sando", name: "ロッテリア リブサンドポーク", nameEn: "Lotteria Rib Sand Pork", category: "FastFood", calories: 495, protein: 15.5, fat: 27.5, carbs: 45.8, fiber: 1.8, salt: 2.5, emoji: "🍔", tags: ["FastFood", "Meat", "Pork"] },
    { id: "lotteria-teriyaki", name: "ロッテリア てりやきバーガー", nameEn: "Lotteria Teriyaki Burger", category: "FastFood", calories: 368, protein: 11.5, fat: 18.5, carbs: 38.5, fiber: 1.5, salt: 2.2, emoji: "🍔", tags: ["FastFood", "Meat"] },
    { id: "lotteria-zetsuhin-bacon", name: "ロッテリア 絶品ベーコンチーズバーガー", nameEn: "Lotteria Zetsuhin Bacon Cheese", category: "FastFood", calories: 512, protein: 19.5, fat: 36.5, carbs: 26.5, fiber: 1.0, salt: 2.4, emoji: "🍔", tags: ["FastFood", "Meat", "HighFat", "HighCalorie"] },

    // --- Burger King ---
    { id: "burgerking-whopper", name: "バーガーキング ワッパー", nameEn: "Burger King Whopper", category: "FastFood", calories: 676, protein: 29.5, fat: 42.5, carbs: 55.5, fiber: 4.5, salt: 4.5, emoji: "🍔", tags: ["FastFood", "Meat", "HighCalorie", "HighFat"] },
    { id: "burgerking-whopper-jr", name: "バーガーキング ワッパーJr.", nameEn: "Burger King Whopper Jr.", category: "FastFood", calories: 409, protein: 18.5, fat: 25.5, carbs: 36.5, fiber: 2.5, salt: 2.8, emoji: "🍔", tags: ["FastFood", "Meat"] },
    { id: "burgerking-double-whopper-cheese", name: "バーガーキング ダブルワッパーチーズ", nameEn: "Burger King Double Whopper Cheese", category: "FastFood", calories: 994, protein: 55.5, fat: 68.5, carbs: 48.5, fiber: 4.5, salt: 6.8, emoji: "🍔", tags: ["FastFood", "Meat", "HighCalorie", "HighFat"] },
    { id: "burgerking-avocado-whopper", name: "バーガーキング アボカドワッパー", nameEn: "Burger King Avocado Whopper", category: "FastFood", calories: 752, protein: 30.5, fat: 49.5, carbs: 58.5, fiber: 6.5, salt: 4.5, emoji: "🍔", tags: ["FastFood", "Meat", "HighCalorie"] },
    { id: "burgerking-quattro-cheese", name: "バーガーキング クアトロチーズワッパー", nameEn: "Burger King Quattro Cheese Whopper", category: "FastFood", calories: 845, protein: 42.5, fat: 55.5, carbs: 45.5, fiber: 3.5, salt: 5.5, emoji: "🍔", tags: ["FastFood", "Meat", "HighCalorie", "HighFat"] }
];

// Combine unique items
const existingIds = new Set(foods.map(f => f.id));
const itemsToAdd = newItems.filter(f => !existingIds.has(f.id));

if (itemsToAdd.length > 0) {
    foods.push(...itemsToAdd);
    console.log(`✅ Added ${itemsToAdd.length} new burger items.`);
} else {
    console.log(`ℹ️ No new items to add (all duplicates).`);
}

// Ensure sorting
foods.sort((a, b) => {
    return a.name.localeCompare(b.name, 'ja');
});

// Write back
fs.writeFileSync(foodsPath, JSON.stringify(foods, null, 2), 'utf8');
console.log(`Final count: ${foods.length}`);
