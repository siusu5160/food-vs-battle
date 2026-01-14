const fs = require('fs');
const path = require('path');
const foods = require('../src/data/foods.json');

const ids = foods.map(f => `${f.id} : ${f.name} / ${f.nameEn}`).join('\n');
fs.writeFileSync(path.join(__dirname, 'all_ids.txt'), ids);
console.log(`Dumped ${foods.length} IDs to all_ids.txt`);
