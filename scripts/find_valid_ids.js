const fs = require('fs');
const foods = JSON.parse(fs.readFileSync('src/data/foods.json', 'utf8'));

// 存在する食品IDを探す
const categories = {
    meat: foods.filter(f => f.category === 'Meat').slice(0, 5),
    fish: foods.filter(f => f.category === 'Fish').slice(0, 5),
    carb: foods.filter(f => f.category === 'Carb').slice(0, 5),
    vegetable: foods.filter(f => f.category === 'Vegetable').slice(0, 5),
};

console.log('=== Available Foods for Popular Battles ===\n');

console.log('MEAT:');
categories.meat.forEach(f => console.log(`  ${f.id}: ${f.name}`));

console.log('\nFISH:');
categories.fish.forEach(f => console.log(`  ${f.id}: ${f.name}`));

console.log('\nCARB:');
categories.carb.forEach(f => console.log(`  ${f.id}: ${f.name}`));

console.log('\nVEGETABLE:');
categories.vegetable.forEach(f => console.log(`  ${f.id}: ${f.name}`));
