const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/foods.json');

try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    let foods = JSON.parse(rawData);

    // 1. Remove units from names
    // Examples: "Cola (500ml)", "Beer (350ml)", "Rice (100g)"
    // Regex to remove (...) at the end if it contains ml, g, L?
    // User said "remove unit notation, basically 100g/100ml talk".
    // So distinct items like "Cola (500ml)" -> "Cola".
    // But be careful not to create duplicates if we have "Cola (1.5L)".
    // Assuming we just simply remove the suffix for display cleanliness.

    foods.forEach(food => {
        // Remove patterns like (500ml), (350ml), (100g), (150g), (M), (L), (S)
        // Adjust regex to be safe.
        // It seems the user specifically mentioned "500ml" etc.

        let newName = food.name.replace(/\s*\((\d+(ml|g|kcal)|[SML]|普通|大盛|小盛)\)/gi, '');
        // Also remove specific "100g" if it's not in parens? Usually it is "Rice (100g)".

        // Clean up text
        newName = newName.trim();

        if (newName !== food.name) {
            console.log(`Renaming: ${food.name} -> ${newName}`);
            food.name = newName;
        }

        // English name too
        if (food.nameEn) {
            let newNameEn = food.nameEn.replace(/\s*\((\d+(ml|g|kcal)|[SML]|Regular|Large|Small)\)/gi, '');
            newNameEn = newNameEn.trim();
            if (newNameEn !== food.nameEn) {
                food.nameEn = newNameEn;
            }
        }
    });

    // 2. Sort by Japanese name
    foods.sort((a, b) => a.name.localeCompare(b.name, 'ja'));

    // 3. Update Categories in JSON? 
    // Ideally we should update "Alcohol" category to "Drink" in JSON to match new schema,
    // OR just rely on `categorizeFoodItem` handling mapping.
    // Let's rely on mapping in `foodCategories.ts` which handles `category === 'Alcohol'` correctly.
    // But for consistency let's update category to Drink for Alcohol items IF we want strict schema.
    // User asked to "Integrate Drink and Alcohol".
    // Let's update category "Alcohol" -> "Drink" and ensure tag "Alcohol" exists.

    foods.forEach(food => {
        if (food.category === 'Alcohol') {
            food.category = 'Drink';
            if (!food.tags.includes('Alcohol')) {
                food.tags.push('Alcohol');
            }
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(foods, null, 2), 'utf8');
    console.log("Cleaned names, sorted list, and unified Drink category.");

} catch (error) {
    console.error("Error updating file:", error.message);
}
