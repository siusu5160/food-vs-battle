const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/foods.json');

try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    let foods = JSON.parse(rawData);

    // Check if ID already exists
    const existingIndex = foods.findIndex(f => f.id === 'aojiru');

    const newFood = {
        "id": "aojiru",
        "name": "青汁",
        "nameEn": "Green Juice (Aojiru)",
        "category": "Drink",
        "calories": 30,
        "protein": 1.0,
        "fat": 0.2,
        "carbs": 6.0,
        "fiber": 3.0,
        "salt": 0.05,
        "emoji": "🍵",
        "tags": [
            "Drink",
            "Vegetable",
            "Health"
        ]
    };

    if (existingIndex !== -1) {
        console.log('Update existing Aojiru');
        foods[existingIndex] = newFood;
    } else {
        console.log('Adding new Aojiru');
        foods.push(newFood);
    }

    // Sort by name if needed, but append is fine for now or maybe sort by ID/Category?
    // Let's just append.

    fs.writeFileSync(filePath, JSON.stringify(foods, null, 2), 'utf8');
    console.log('Successfully saved foods.json');

} catch (error) {
    console.error("Error updating file:", error.message);
}
