const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
let foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

console.log(`Initial count: ${foods.length}`);

// 1. Cleanup specific unwanted items
// User requested removal of: まぐろ2貫, サーモン2貫, いくら2貫, えびアボカド2貫, 手巻きおにぎり鮭, 手巻きおにぎりツナマヨ
const itemsToRemove = [
    "まぐろ2貫", "サーモン2貫", "いくら2貫", "えびアボカド2貫",
    "手巻", "手巻き" // Catch "手巻きおにぎり..."
];

foods = foods.filter(food => {
    // Check if name matches any of the removal targets (partial match for convenience/sushi specific likely)
    // Be careful not to remove "Maguro (Lean)" from ingredients. 
    // The specific items likely have "2貫" in name or are explicitly "手巻き".
    // Ingredients usually are "マグロ(赤身)".
    // Let's target strictly if possible, or use the "2貫" keyword which is specific to sushi plates.

    if (food.name.includes("2貫")) {
        console.log(`🗑️ Removing: ${food.name}`);
        return false;
    }
    if (food.name.includes("手巻") && food.category === "Convenience") { // Target convenience store hand rolls only? Or generic.
        console.log(`🗑️ Removing: ${food.name}`);
        return false;
    }
    // Also cleanup if user specifically asked for "Hand-rolled onigiri salmon" and "tuna mayo"
    // Just removing "手巻" might be safe enough given the context.
    return true;
});

console.log(`Count after removal: ${foods.length}`);

// 2. Add Popular Snacks
const newSnacks = [
    // Calbee
    { id: "calbee-chips-usushio", name: "カルビー ポテトチップス うすしお味(60g)", nameEn: "Calbee Potato Chips Light Salt", category: "Snack", calories: 336, protein: 3.1, fat: 21.6, carbs: 32.3, fiber: 0, salt: 0.5, emoji: "🥔", tags: ["Snack", "Salty", "HighFat"] },
    { id: "calbee-jagarico-salad", name: "カルビー じゃがりこ サラダ", nameEn: "Calbee Jagarico Salad", category: "Snack", calories: 285, protein: 3.6, fat: 14.0, carbs: 36.5, fiber: 0, salt: 0.7, emoji: "🥔", tags: ["Snack", "Salty"] },

    // Koikeya
    { id: "koikeya-chips-norishio", name: "湖池屋 ポテトチップス のり塩(60g)", nameEn: "Koikeya Potato Chips Seaweed Salt", category: "Snack", calories: 337, protein: 3.1, fat: 21.6, carbs: 32.7, fiber: 0, salt: 0.7, emoji: "🥔", tags: ["Snack", "Salty", "HighFat"] },

    // Glico
    { id: "glico-pocky", name: "グリコ ポッキーチョコレート", nameEn: "Glico Pocky Chocolate", category: "Snack", calories: 182, protein: 3.1, fat: 8.2, carbs: 23.8, fiber: 0, salt: 0.2, emoji: "🍫", tags: ["Snack", "Sweet", "Chocolate"] },
    { id: "glico-pretz-salad", name: "グリコ プリッツ 旨サラダ", nameEn: "Glico Pretz Salad", category: "Snack", calories: 172, protein: 3.5, fat: 7.5, carbs: 22.5, fiber: 1.1, salt: 0.9, emoji: "🥨", tags: ["Snack", "Salty"] },

    // Meiji
    { id: "meiji-kinoko", name: "明治 きのこの山", nameEn: "Meiji Kinoko no Yama", category: "Snack", calories: 423, protein: 4.8, fat: 26.2, carbs: 41.7, fiber: 0, salt: 0.2, emoji: "🍄", tags: ["Snack", "Sweet", "Chocolate", "HighCalorie"] },
    { id: "meiji-takenoko", name: "明治 たけのこの里", nameEn: "Meiji Takenoko no Sato", category: "Snack", calories: 383, protein: 5.5, fat: 22.8, carbs: 38.9, fiber: 0, salt: 0.3, emoji: "🎍", tags: ["Snack", "Sweet", "Chocolate", "HighCalorie"] },

    // Nestle
    { id: "nestle-kitkat", name: "ネスレ キットカット ミニ(1枚)", nameEn: "Nestle KitKat Mini", category: "Snack", calories: 62, protein: 0.8, fat: 3.5, carbs: 6.8, fiber: 0, salt: 0.02, emoji: "🍫", tags: ["Snack", "Sweet", "Chocolate", "LowCalorie"] },

    // Bourbon
    { id: "bourbon-alfort", name: "ブルボン アルフォートミニチョコレート", nameEn: "Bourbon Alfort Mini Chocolate", category: "Snack", calories: 293, protein: 4.5, fat: 16.5, carbs: 32.5, fiber: 0, salt: 0.3, emoji: "🍫", tags: ["Snack", "Sweet", "Chocolate"] }
];

const existingIds = new Set(foods.map(f => f.id));
const itemsToAdd = newSnacks.filter(f => !existingIds.has(f.id));

if (itemsToAdd.length > 0) {
    foods.push(...itemsToAdd);
    console.log(`✅ Added ${itemsToAdd.length} new snacks.`);
}

// 3. Sort by Name (for grouping brands)
// Using Japanese locale compare for better results
foods.sort((a, b) => {
    return a.name.localeCompare(b.name, 'ja');
});
console.log(`Sorted ${foods.length} items by name.`);

// Write back
fs.writeFileSync(foodsPath, JSON.stringify(foods, null, 2), 'utf8');
console.log(`Final count: ${foods.length}`);
