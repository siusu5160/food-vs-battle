const fs = require('fs');
const path = require('path');

// Load Data
const foods = require('../src/data/foods.json');
const existingIds = new Set(foods.map(f => f.id));

// Define the Popular Battles manually here to check (since imports from TS might be hard in JS script without compilation)
const POPULAR_BATTLES = [
    { a: 'beef-rib', b: 'beef-filet' },
    { a: 'chicken-tender', b: 'chicken-thigh-skin' },
    { a: 'sushi-maguro', b: 'sushi-salmon' },
    { a: 'cheeseburger', b: 'pizza-slice' },
    { a: 'gyudon', b: 'katsudon' },
    { a: 'ice-cream-vanilla', b: 'chocolate-bar' },
];

console.log("Checking IDs...");
let errors = 0;

POPULAR_BATTLES.forEach((battle, i) => {
    const missing = [];
    if (!existingIds.has(battle.a)) missing.push(battle.a);
    if (!existingIds.has(battle.b)) missing.push(battle.b);

    if (missing.length > 0) {
        console.error(`[Battle ${i + 1}]: 404 Error! Missing IDs: ${missing.join(', ')}`);
        errors++;

        // Suggest closest match
        missing.forEach(miss => {
            const match = foods.find(f => f.id.includes(miss) || f.nameEn.toLowerCase().includes(miss.replace(/-/g, ' ')));
            if (match) {
                console.log(`  -> Did you mean: '${match.id}' (${match.nameEn})?`);
            }
        });
    } else {
        console.log(`[Battle ${i + 1}]: OK (${battle.a} vs ${battle.b})`);
    }
});

if (errors === 0) {
    console.log("All Popular Battles are VALID.");
} else {
    console.log(`Found ${errors} invalid battles.`);
}
