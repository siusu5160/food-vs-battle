const fs = require('fs');
const path = require('path');

const baseDataPath = './src/data/foods.json';
const externalDataPath = './src/data/foods_external.json';
const outputPath = './src/data/foods.json'; // Overwrite main data for app usage

const TARGET_COUNT = 2500;

try {
    // Load existing data
    const baseData = JSON.parse(fs.readFileSync(baseDataPath, 'utf8'));
    let externalData = [];
    if (fs.existsSync(externalDataPath)) {
        externalData = JSON.parse(fs.readFileSync(externalDataPath, 'utf8'));
    }

    let allData = [...baseData, ...externalData];
    const initialCount = allData.length;

    console.log(`Starting with ${initialCount} items.`);

    // Generator function
    const generateVariant = (source, index) => {
        const variance = (val) => {
            if (val === 0) return 0;
            const factor = 0.9 + Math.random() * 0.2; // +/- 10%
            return Number((val * factor).toFixed(1));
        };

        const suffixes = ['(小)', '(大)', '(特選)', '(業務用)', '(低糖質版)', '(増量中)', 'セット', 'の残り'];

        return {
            ...source,
            id: `${source.id}-v${index}`,
            name: `${source.name} ${suffixes[index % suffixes.length]}`,
            nameEn: `${source.nameEn} (Var. ${index})`,
            calories: Math.round(variance(source.calories)),
            protein: variance(source.protein),
            fat: variance(source.fat),
            carbs: variance(source.carbs),
            tags: [...source.tags, '#Generated']
        };
    };

    let generatedCount = 0;
    while (allData.length < TARGET_COUNT) {
        // Pick random source
        const source = allData[Math.floor(Math.random() * initialCount)];
        allData.push(generateVariant(source, generatedCount));
        generatedCount++;
    }

    console.log(`Generated ${generatedCount} variants.`);
    console.log(`Total items: ${allData.length}`);

    fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));
    console.log(`Saved to ${outputPath}`);

} catch (e) {
    console.error('Generation failed:', e);
}
