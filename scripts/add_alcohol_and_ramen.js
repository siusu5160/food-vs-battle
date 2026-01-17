const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
let foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

console.log(`Initial count: ${foods.length}`);

// New Items Data
const newItems = [
    // --- Ramen ---
    // Jiro: Approx 1600kcal for standard "Sho" (treated as Regular here). High Fat/Carb/Salt.
    { id: "ramen-jiro-regular", name: "ラーメン二郎 (並盛)", nameEn: "Ramen Jiro (Regular)", category: "Restaurant", calories: 1600, protein: 55.0, fat: 95.0, carbs: 140.0, fiber: 6.0, salt: 12.5, emoji: "🍜", tags: ["Restaurant", "Noodle", "HighCalorie", "HighFat", "HighCarb"] },

    // Tenkaippin Kotteri: Approx 949kcal for standard.
    { id: "ramen-tenkaippin-kotteri", name: "天下一品 こってりラーメン(並)", nameEn: "Tenkaippin Kotteri Ramen", category: "Restaurant", calories: 949, protein: 32.5, fat: 58.2, carbs: 64.5, fiber: 3.2, salt: 6.8, emoji: "🍜", tags: ["Restaurant", "Noodle", "HighFat"] },

    // Ichiran: Approx 530kcal (soup + noodles).
    { id: "ramen-ichiran", name: "一蘭 天然とんこつラーメン", nameEn: "Ichiran Tonkotsu Ramen", category: "Restaurant", calories: 535, protein: 21.5, fat: 24.5, carbs: 55.5, fiber: 2.1, salt: 5.8, emoji: "🍜", tags: ["Restaurant", "Noodle"] },

    // Mouko Tanmen Nakamoto: Approx 740kcal.
    { id: "ramen-nakamoto", name: "蒙古タンメン中本 蒙古タンメン", nameEn: "Mouko Tanmen Nakamoto", category: "Restaurant", calories: 738, protein: 24.8, fat: 32.5, carbs: 78.5, fiber: 5.5, salt: 6.2, emoji: "🌶️", tags: ["Restaurant", "Noodle", "Spicy"] },

    // --- Alcohol (350ml Cans) ---
    // Asahi Super Dry: ~42kcal/100ml -> 147kcal
    { id: "alc-asahi-superdry", name: "アサヒ スーパードライ(350ml)", nameEn: "Asahi Super Dry (350ml)", category: "Drink", calories: 147, protein: 1.1, fat: 0, carbs: 10.5, fiber: 0, salt: 0, emoji: "🍺", tags: ["Drink", "Alcohol", "Beer"] },

    // Suntory Strong Zero Double Lemon: ~54kcal/100ml -> 189kcal. Low Sugar but high alcohol energy.
    { id: "alc-strong-zero-lemon", name: "ストロングゼロ ダブルレモン(350ml)", nameEn: "Strong Zero Double Lemon (350ml)", category: "Drink", calories: 189, protein: 0, fat: 0, carbs: 1.8, fiber: 0, salt: 0.2, emoji: "🍋", tags: ["Drink", "Alcohol", "LowCarb"] },

    // Suntory Kaku Highball: ~48kcal/100ml -> 168kcal.
    { id: "alc-kaku-highball", name: "サントリー 角ハイボール(350ml)", nameEn: "Suntory Kaku Highball (350ml)", category: "Drink", calories: 168, protein: 0, fat: 0, carbs: 2.1, fiber: 0, salt: 0, emoji: "🥃", tags: ["Drink", "Alcohol", "LowCarb"] },

    // Lemon-dou: ~70kcal/100ml -> 245kcal (Devil Lemon/Standard) is heavier. Using Standard (Teiban).
    { id: "alc-lemon-dou", name: "こだわり酒場のレモンサワー(350ml)", nameEn: "Kodawari Sakaba Lemon Sour (350ml)", category: "Drink", calories: 147, protein: 0, fat: 0, carbs: 2.5, fiber: 0, salt: 0.1, emoji: "🍋", tags: ["Drink", "Alcohol"] },

    // Horoyoi White Sour: ~58kcal/100ml -> 203kcal. High Sugar.
    { id: "alc-horoyoi-white", name: "ほろよい 白いサワー(350ml)", nameEn: "Horoyoi White Sour (350ml)", category: "Drink", calories: 203, protein: 0, fat: 0, carbs: 32.2, fiber: 0, salt: 0.1, emoji: "🍹", tags: ["Drink", "Alcohol", "Sweet", "HighSugar"] }
];

// Combine unique items
const existingIds = new Set(foods.map(f => f.id));
const itemsToAdd = newItems.filter(f => !existingIds.has(f.id));

if (itemsToAdd.length > 0) {
    foods.push(...itemsToAdd);
    console.log(`✅ Added ${itemsToAdd.length} new alcohol and ramen items.`);
} else {
    console.log(`ℹ️ No new items to add (all duplicates).`);
}

// Write back
fs.writeFileSync(foodsPath, JSON.stringify(foods, null, 2), 'utf8');
console.log(`Final count: ${foods.length}`);
