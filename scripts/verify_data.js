const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

console.log(`Total Food Count: ${foods.length}`);

// Validating these IDs from page.tsx
const POPULAR_BATTLES = [
    { a: 'white-rice', b: 'brown-rice' },
    { a: 'chicken-breast-skinless', b: 'beef-rib' },
    { a: 'banana', b: 'apple' },
    { a: 'broccoli', b: 'tomato' },
    { a: 'ramen-noodle', b: 'udon' },
    { a: 'shortcake', b: 'mochi' },
    { a: 'potato', b: 'sweet-potato' },
    { a: 'cabbage', b: 'lettuce' },
    { a: 'pork-loin', b: 'pork-belly' },
];

const foodIds = new Set(foods.map(f => f.id));

let missingCount = 0;
POPULAR_BATTLES.forEach(battle => {
    if (!foodIds.has(battle.a)) {
        console.log(`Missing A: ${battle.a}`);
        missingCount++;
    }
    if (!foodIds.has(battle.b)) {
        console.log(`Missing B: ${battle.b}`);
        missingCount++;
    }
});

if (missingCount === 0) {
    console.log("All popular battle items exist!");
} else {
    console.log(`Found ${missingCount} missing items.`);
}
