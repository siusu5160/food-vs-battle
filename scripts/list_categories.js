const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/foods.json');

try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const foods = JSON.parse(rawData);
    const categories = new Set();

    foods.forEach(food => {
        if (food.category) {
            categories.add(food.category);
        }
    });

    console.log(JSON.stringify(Array.from(categories).sort(), null, 2));
} catch (error) {
    console.error("Error reading file:", error.message);
}
