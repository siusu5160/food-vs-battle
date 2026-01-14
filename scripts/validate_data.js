const fs = require('fs');
const foods = require('../src/data/foods.json');

let errors = 0;
foods.forEach((f, i) => {
    if (!f.id) { console.error(`Item ${i} missing ID`); errors++; }
    if (!f.name) { console.error(`Item ${i} (${f.id}) missing Name`); errors++; }
    if (!f.emoji) { console.error(`Item ${i} (${f.id}) missing Emoji`); errors++; }
    if (typeof f.calories !== 'number') { console.error(`Item ${i} (${f.id}) invalid calories: ${f.calories}`); errors++; }
    if (typeof f.protein !== 'number') { console.error(`Item ${i} (${f.id}) invalid protein`); errors++; }
    if (typeof f.fat !== 'number') { console.error(`Item ${i} (${f.id}) invalid fat`); errors++; }
    if (typeof f.carbs !== 'number') { console.error(`Item ${i} (${f.id}) invalid carbs`); errors++; }
});

if (errors === 0) {
    console.log(`Scan complete. All ${foods.length} items are valid.`);
} else {
    console.log(`Found ${errors} issues.`);
}
