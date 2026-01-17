const fs = require('fs');
const path = require('path');

const foodsPath = path.join(__dirname, '../src/data/foods.json');
const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf8'));

// IDs to remove (Old/Duplicate versions)
const idsToRemove = new Set([
    "mac-teriyaki-burger",       // Duplicate of "mac-teriyaki-mcburger"
    "mac-chicken-nuggets-5",     // Duplicate of "mac-nuggets-5"
    "marugame-kake-udon",        // Duplicate of "marugame-kake"
    "marugame-kamaage-udon"      // Duplicate of "marugame-kamaage"
]);

const initialCount = foods.length;
const newFoods = foods.filter(f => !idsToRemove.has(f.id));

if (newFoods.length < initialCount) {
    fs.writeFileSync(foodsPath, JSON.stringify(newFoods, null, 2), 'utf8');
    console.log(`✅ Removed ${initialCount - newFoods.length} duplicate items.`);
    console.log(`Removed IDs: ${Array.from(idsToRemove).join(', ')}`);
} else {
    console.log('ℹ️ No duplicates found from the target list.');
}

console.log(`Total foods count: ${newFoods.length}`);
