const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/foods.json');

try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    let foods = JSON.parse(rawData);

    // Specific cleanups requested:
    // 1. Energy Drink / Black Coffee ml
    // 2. Potato Chips 60g
    // 3. Ingredients 100g, 1枚, 1本, 2本
    // 4. Sushi 2貫
    // 5. Milk 200ml

    // Regex strategy:
    // Remove content inside parentheses if it matches units or counters.
    // Also remove " (100%)", " (Mサイズ)", etc if leftovers.

    // Patterns to remove (case insensitive):
    // \d+ml, \d+g, \d+枚, \d+本, \d+貫, \d+個, \d+切, \d+%, Mサイズ, ペットボトル

    // Note: Some might be "Rice (100g)" -> "Rice".
    // Some might be "Cola (500ml)" -> "Cola".

    const patternsToRemove = [
        /\s*\(\d+ml\)/gi,
        /\s*\(\d+g\)/gi,
        /\s*\(\d+枚\)/gi,
        /\s*\(\d+本\)/gi,
        /\s*\(\d+貫\)/gi,
        /\s*\(\d+個\)/gi,
        /\s*\(\d+切\)/gi,
        /\s*\(\d+%\)/gi,
        /\s*\(Mサイズ\)/gi,
        /\s*\(ペットボトル\)/gi,
        /\s*\(普通\)/gi, // CoCoIchi
        /\s*\(1P\)/gi, // KFC
        /\s*\(S\)/gi, // KFC
        /\s*\(350ml缶\)/gi // Beer
    ];

    foods.forEach(food => {
        let newName = food.name;

        patternsToRemove.forEach(pattern => {
            newName = newName.replace(pattern, '');
        });

        newName = newName.trim();

        // Specific overrides if regex misses or over-cleans
        if (food.id === 'milk') newName = "牛乳";

        if (newName !== food.name) {
            console.log(`Renaming: ${food.name} -> ${newName}`);
            food.name = newName;
        }

        // English cleanup
        // Remove (355ml), (100g), (1 slice), (1 stick), (2 pieces)...
        if (food.nameEn) {
            let newNameEn = food.nameEn;
            // Simplified regex for EN
            newNameEn = newNameEn.replace(/\s*\(\d+(ml|g|%)\)/gi, '');
            newNameEn = newNameEn.replace(/\s*\(M\)/gi, '');
            newNameEn = newNameEn.replace(/\s*\(S\)/gi, '');
            newNameEn = newNameEn.replace(/\s*\(bottle\)/gi, '');
            newNameEn = newNameEn.replace(/\s*\(.*(slice|stick|piece).*\)/gi, '');

            newNameEn = newNameEn.trim();
            if (newNameEn !== food.nameEn) {
                food.nameEn = newNameEn;
            }
        }
    });

    // Re-Sort to be safe
    foods.sort((a, b) => a.name.localeCompare(b.name, 'ja'));

    fs.writeFileSync(filePath, JSON.stringify(foods, null, 2), 'utf8');
    console.log("Aggressively cleaned names.");

} catch (error) {
    console.error("Error updating file:", error.message);
}
