const fs = require('fs');
const foods = JSON.parse(fs.readFileSync('src/data/foods.json', 'utf8'));

// 人気のバトルで使用されているIDを詳細確認
const battleIds = [
    'chicken-tender', 'chicken-thigh-skin',
    'white-rice', 'bread',
    'beef-rib', 'pork-belly',
    'cabbage', 'lettuce'
];

console.log('=== Checking Popular Battle IDs ===\n');

battleIds.forEach(id => {
    const found = foods.find(f => f.id === id);
    if (found) {
        console.log(`✓ ${id}`);
        console.log(`  Name: ${found.name}`);
        console.log(`  Category: ${found.category}`);
    } else {
        console.log(`✗ ${id} - NOT FOUND`);
        // 類似のIDを探す
        const similar = foods.filter(f =>
            f.id.includes(id.split('-')[0]) ||
            f.id.includes(id.split('-')[1] || '')
        ).slice(0, 3);
        if (similar.length > 0) {
            console.log('  Similar IDs:');
            similar.forEach(s => console.log(`    - ${s.id}: ${s.name}`));
        }
    }
    console.log('');
});

// 代替候補を提案
console.log('\n=== Suggested Valid IDs ===\n');

const categories = {
    chicken: foods.filter(f => f.name.includes('鶏') || f.name.includes('チキン')).slice(0, 3),
    rice: foods.filter(f => f.name.includes('ご飯') || f.name.includes('米')).slice(0, 3),
    beef: foods.filter(f => f.name.includes('牛')).slice(0, 3),
    pork: foods.filter(f => f.name.includes('豚')).slice(0, 3),
    vegetable: foods.filter(f => f.category === 'Vegetable').slice(0, 5),
};

Object.entries(categories).forEach(([cat, items]) => {
    console.log(`${cat.toUpperCase()}:`);
    items.forEach(f => console.log(`  ${f.id}: ${f.name}`));
    console.log('');
});
