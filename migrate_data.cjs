const fs = require('fs');
const path = require('path');
const inputPath = '../food-vs-battle/src/data/foods.ts';
const outputPath = './src/data/foods.json';

try {
    const content = fs.readFileSync(inputPath, 'utf8');
    const match = content.match(/export const foodData: FoodItem\[] = (\[[\s\S]*?\]);/);

    if (!match) {
        throw new Error('Data array not found in source file');
    }

    const dataString = match[1];
    const tempFile = './temp_data_loader.js';

    // Create a temporary JS file that exports the data
    fs.writeFileSync(tempFile, `module.exports = ${dataString};`);

    // Require it to parse standard JS objects
    const data = require(path.resolve(tempFile));

    const processed = data.map(item => {
        const tags = [item.category];
        if (item.calories >= 400) tags.push('HighCalorie');
        if (item.calories <= 100) tags.push('LowCalorie');
        if (item.protein >= 20) tags.push('HighProtein');
        if (item.carbs <= 5) tags.push('LowCarb');
        if (item.fat >= 20) tags.push('HighFat');

        return {
            id: item.id,
            name: item.name,
            nameEn: item.nameEn,
            category: item.category,
            calories: item.calories,
            protein: item.protein,
            fat: item.fat,
            carbs: item.carbs,
            fiber: item.fiber,
            salt: item.salt,
            emoji: item.emoji,
            tags: tags.filter(Boolean)
        };
    });

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2));
    console.log(`Successfully migrated ${processed.length} items.`);

    // Clean up
    fs.unlinkSync(tempFile);

} catch (e) {
    console.error('Migration failed:', e);
    process.exit(1);
}
