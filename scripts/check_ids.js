const fs = require('fs');
const foods = JSON.parse(fs.readFileSync('src/data/foods.json', 'utf8'));

// マクドナルドのアイテムを確認
const mac = foods.filter(f => f.id.includes('mac-'));
console.log(`McDonald's items: ${mac.length}`);
mac.forEach(f => console.log(`  ${f.id}: ${f.name} (${f.category})`));

// 人気のバトルで使用されているIDを確認
const battleIds = [
    'chicken-tender', 'chicken-thigh-skin',
    'white-rice', 'bread',
    'beef-rib', 'pork-belly',
    'cabbage', 'lettuce'
];

console.log('\nPopular Battle IDs:');
battleIds.forEach(id => {
    const found = foods.find(f => f.id === id);
    console.log(`  ${id}: ${found ? `✓ ${found.name}` : '✗ NOT FOUND'}`);
});
