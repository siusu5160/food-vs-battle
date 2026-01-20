const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/foods.json');

try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    let foods = JSON.parse(rawData);

    // 1. Move Aojiru to Ingredients
    const aojiruIndex = foods.findIndex(f => f.id === 'aojiru');
    if (aojiruIndex !== -1) {
        foods[aojiruIndex].category = 'Ingredient';
        // Ensure tags include Ingredient
        if (!foods[aojiruIndex].tags.includes('Ingredient')) {
            foods[aojiruIndex].tags.push('Ingredient');
        }
        // Remove Drink tag if we want it to move completely? 
        // User said "Ingredient Others". So Ingredient is fine.
        // Let's keep Tag as Drink/Vegetable/Health but Category as Ingredient.
    }

    // 2. Add Popular Drinks
    const newDrinks = [
        {
            "id": "cola",
            "name": "コーラ (500ml)",
            "nameEn": "Cola (500ml)",
            "category": "Drink",
            "calories": 225,
            "protein": 0,
            "fat": 0,
            "carbs": 56.5,
            "fiber": 0,
            "salt": 0,
            "emoji": "🥤",
            "tags": ["Drink", "Sugar", "Carb"]
        },
        {
            "id": "energy-drink",
            "name": "エナジードリンク (355ml)",
            "nameEn": "Energy Drink (355ml)",
            "category": "Drink",
            "calories": 170,
            "protein": 0,
            "fat": 0,
            "carbs": 42.0,
            "fiber": 0,
            "salt": 0.2,
            "emoji": "⚡",
            "tags": ["Drink", "Sugar", "Caffeine"]
        },
        {
            "id": "coffee-black",
            "name": "ブラックコーヒー (350ml)",
            "nameEn": "Black Coffee",
            "category": "Drink",
            "calories": 12,
            "protein": 0.5,
            "fat": 0,
            "carbs": 2.5,
            "fiber": 0,
            "salt": 0,
            "emoji": "☕",
            "tags": ["Drink", "LowCalorie", "Caffeine"]
        },
        {
            "id": "cafe-latte",
            "name": "カフェラテ (Mサイズ)",
            "nameEn": "Cafe Latte (M)",
            "category": "Drink",
            "calories": 100,
            "protein": 5.2,
            "fat": 5.5,
            "carbs": 7.8,
            "fiber": 0,
            "salt": 0.2,
            "emoji": "🥛",
            "tags": ["Drink", "Dairy"]
        },
        {
            "id": "orange-juice",
            "name": "オレンジジュース (100%)",
            "nameEn": "Orange Juice (100%)",
            "category": "Drink",
            "calories": 84,
            "protein": 1.4,
            "fat": 0.2,
            "carbs": 21.0,
            "fiber": 0.4,
            "salt": 0,
            "emoji": "🍊",
            "tags": ["Drink", "Fruit", "Sugar"]
        },
        {
            "id": "green-tea-bottle",
            "name": "緑茶 (ペットボトル)",
            "nameEn": "Green Tea (Bottle)",
            "category": "Drink",
            "calories": 0,
            "protein": 0,
            "fat": 0,
            "carbs": 0,
            "fiber": 0,
            "salt": 0.03,
            "emoji": "🍵",
            "tags": ["Drink", "ZeroCalorie", "Health"]
        },
        {
            "id": "tapioca-milk-tea",
            "name": "タピオカミルクティー",
            "nameEn": "Tapioca Milk Tea",
            "category": "Drink",
            "calories": 400,
            "protein": 2.0,
            "fat": 10.0,
            "carbs": 75.0,
            "fiber": 1.0,
            "salt": 0.1,
            "emoji": "🧋",
            "tags": ["Drink", "Sugar", "Carb", "Dessert"]
        },
        {
            "id": "beer-can",
            "name": "ビール (350ml缶)",
            "nameEn": "Beer (350ml)",
            "category": "Alcohol",
            "calories": 140,
            "protein": 1.0,
            "fat": 0,
            "carbs": 10.5,
            "fiber": 0,
            "salt": 0,
            "emoji": "🍺",
            "tags": ["Drink", "Alcohol", "Carb"]
        }
    ];

    let addedCount = 0;
    newDrinks.forEach(drink => {
        const idx = foods.findIndex(f => f.id === drink.id);
        if (idx !== -1) {
            foods[idx] = drink; // Update
        } else {
            foods.push(drink); // Add
            addedCount++;
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(foods, null, 2), 'utf8');
    console.log(`Updated Aojiru and added/updated ${addedCount} drinks.`);

} catch (error) {
    console.error("Error updating file:", error.message);
}
