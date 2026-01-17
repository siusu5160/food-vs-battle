const fs = require('fs');
const path = require('path');

// Convenience Store Menus (Seven, Famima, Lawson)
const newKonbiniMenus = [
    // --- Seven Eleven ---
    { id: "seven-nanachiki", name: "セブン ななチキ", nameEn: "Seven-Eleven Nana-Chiki", category: "FastFood", calories: 197, protein: 14.5, fat: 10.8, carbs: 10.5, fiber: 0.5, salt: 1.4, emoji: "🍗", tags: ["Convenience", "Meat"] },
    { id: "seven-agedori", name: "セブン 揚げ鶏", nameEn: "Seven-Eleven Fried Chicken (Skinless)", category: "FastFood", calories: 185, protein: 13.8, fat: 10.2, carbs: 9.5, fiber: 0.3, salt: 1.3, emoji: "🍗", tags: ["Convenience", "Meat"] },
    { id: "seven-onigiri-tuna", name: "セブン ツナマヨおにぎり", nameEn: "Seven-Eleven Tuna Mayo Onigiri", category: "FastFood", calories: 235, protein: 4.5, fat: 8.5, carbs: 36.5, fiber: 0.5, salt: 1.1, emoji: "🍙", tags: ["Convenience", "Carb"] },
    { id: "seven-onigiri-salmon", name: "セブン 紅しゃけおにぎり", nameEn: "Seven-Eleven Salmon Onigiri", category: "FastFood", calories: 175, protein: 4.8, fat: 1.2, carbs: 37.5, fiber: 0.5, salt: 1.2, emoji: "🍙", tags: ["Convenience", "Carb"] },
    { id: "seven-oden-daikon", name: "セブン おでん(大根)", nameEn: "Seven-Eleven Oden (Radish)", category: "FastFood", calories: 12, protein: 0.5, fat: 0.1, carbs: 2.5, fiber: 1.2, salt: 0.6, emoji: "🍢", tags: ["Convenience", "LowCalorie"] },
    { id: "seven-oden-egg", name: "セブン おでん(たまご)", nameEn: "Seven-Eleven Oden (Egg)", category: "FastFood", calories: 82, protein: 7.5, fat: 5.5, carbs: 0.8, fiber: 0, salt: 0.6, emoji: "🍢", tags: ["Convenience", "Egg"] },
    { id: "seven-salad-chicken", name: "セブン サラダチキン(プレーン)", nameEn: "Seven-Eleven Salad Chicken", category: "FastFood", calories: 115, protein: 24.5, fat: 1.2, carbs: 0.5, fiber: 0, salt: 1.1, emoji: "🥗", tags: ["Convenience", "HighProtein", "LowFat"] },
    { id: "seven-gold-hamburg", name: "セブン 金のハンバーグ", nameEn: "Seven-Eleven Gold Hamburg", category: "FastFood", calories: 385, protein: 18.5, fat: 26.5, carbs: 15.5, fiber: 2.1, salt: 2.8, emoji: "🥘", tags: ["Convenience", "Meat"] },

    // --- FamilyMart ---
    { id: "famima-chiki", name: "ファミマ ファミチキ", nameEn: "FamilyMart Famichiki", category: "FastFood", calories: 251, protein: 12.7, fat: 15.7, carbs: 14.8, fiber: 0.8, salt: 1.3, emoji: "🍗", tags: ["Convenience", "Meat", "HighFat"] },
    { id: "famima-spicy-chiki", name: "ファミマ スパイシーチキン", nameEn: "FamilyMart Spicy Chicken", category: "FastFood", calories: 196, protein: 11.5, fat: 10.8, carbs: 13.2, fiber: 0.5, salt: 1.5, emoji: "🍗", tags: ["Convenience", "Meat"] },
    { id: "famima-spam-musubi", name: "ファミマ SPAMむすび", nameEn: "FamilyMart Spam Musubi", category: "FastFood", calories: 365, protein: 9.5, fat: 16.5, carbs: 45.5, fiber: 1.2, salt: 1.8, emoji: "🍙", tags: ["Convenience", "Carb"] },
    { id: "famima-tsukune", name: "ファミマ 鶏つくね串", nameEn: "FamilyMart Chicken Meatball Skewer", category: "FastFood", calories: 145, protein: 8.5, fat: 7.2, carbs: 10.5, fiber: 0.5, salt: 1.2, emoji: "🍢", tags: ["Convenience", "Meat"] },
    { id: "famima-oreno-pudding", name: "ファミマ 俺のプリン", nameEn: "FamilyMart Ore no Pudding", category: "Snack", calories: 485, protein: 8.5, fat: 28.5, carbs: 48.5, fiber: 0, salt: 0.4, emoji: "🍮", tags: ["Convenience", "Snack", "Sweet"] },

    // --- Lawson ---
    { id: "lawson-karaagekun-reg", name: "ローソン からあげクン(レギュラー)", nameEn: "Lawson Karaage-kun (Regular)", category: "FastFood", calories: 220, protein: 14.0, fat: 14.0, carbs: 8.0, fiber: 0.5, salt: 1.6, emoji: "🐔", tags: ["Convenience", "Meat"] },
    { id: "lawson-karaagekun-red", name: "ローソン からあげクン(レッド)", nameEn: "Lawson Karaage-kun (Red)", category: "FastFood", calories: 225, protein: 14.5, fat: 14.2, carbs: 8.2, fiber: 0.5, salt: 1.8, emoji: "🐔", tags: ["Convenience", "Meat"] },
    { id: "lawson-karaagekun-cheese", name: "ローソン からあげクン(北海道チーズ)", nameEn: "Lawson Karaage-kun (Cheese)", category: "FastFood", calories: 235, protein: 15.0, fat: 15.2, carbs: 9.0, fiber: 0.5, salt: 1.9, emoji: "🐔", tags: ["Convenience", "Meat"] },
    { id: "lawson-l-chiki-reg", name: "ローソン Lチキ(レギュラー)", nameEn: "Lawson L-Chiki (Regular)", category: "FastFood", calories: 270, protein: 13.5, fat: 18.5, carbs: 11.5, fiber: 0.8, salt: 1.6, emoji: "🍗", tags: ["Convenience", "Meat", "HighFat"] },
    { id: "lawson-premium-roll", name: "ローソン プレミアムロールケーキ", nameEn: "Lawson Premium Roll Cake", category: "Snack", calories: 204, protein: 2.8, fat: 14.2, carbs: 15.5, fiber: 0, salt: 0.2, emoji: "🍰", tags: ["Convenience", "Snack", "Sweet"] },
    { id: "lawson-baschee", name: "ローソン バスチー", nameEn: "Lawson Baschee", category: "Snack", calories: 244, protein: 4.8, fat: 16.5, carbs: 18.5, fiber: 0.2, salt: 0.3, emoji: "🍰", tags: ["Convenience", "Snack", "Sweet"] },

    // --- Others/Generic Konbini ---
    { id: "conv-bento-nori", name: "コンビニ 海苔弁当", nameEn: "Convenience Store Nori Bento", category: "FastFood", calories: 750, protein: 18.5, fat: 28.5, carbs: 105.0, fiber: 4.5, salt: 4.2, emoji: "🍱", tags: ["Convenience", "Carb"] },
    { id: "conv-bento-katsudon", name: "コンビニ カツ丼", nameEn: "Convenience Store Katsudon", category: "FastFood", calories: 850, protein: 24.5, fat: 32.5, carbs: 115.0, fiber: 3.5, salt: 4.8, emoji: "🍱", tags: ["Convenience", "Carb", "HighCalorie"] },
    { id: "conv-pasta-meat", name: "コンビニ ミートソースパスタ", nameEn: "Convenience Store Meat Pasta", category: "FastFood", calories: 650, protein: 22.5, fat: 24.5, carbs: 85.0, fiber: 5.5, salt: 3.8, emoji: "🍝", tags: ["Convenience", "Carb"] }
];

const foodsPath = path.join(__dirname, '../src/data/foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

// Unique ID check
const existingIds = new Set(foods.map(f => f.id));
const foodsToAdd = newKonbiniMenus.filter(f => !existingIds.has(f.id));

if (foodsToAdd.length > 0) {
    foods.push(...foodsToAdd);
    fs.writeFileSync(foodsPath, JSON.stringify(foods, null, 2), 'utf8');
    console.log(`✅ Successfully added ${foodsToAdd.length} new convenience store items.`);
} else {
    console.log('ℹ️ All items already exist. No changes made.');
}

console.log(`Total foods count: ${foods.length}`);
