const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/foods.json');

try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    let foods = JSON.parse(rawData);

    // 1. Remove specific text patterns
    const patternsToRemove = [
        /\s*\(1パック\)/gi,
        /\s*\(1房\)/gi,
        /\s*\(1切れ\)/gi,
        /\s*\(全果\)/gi,
        /\s*\(カット\)/gi,
        /\s*\(1束\)/gi,
        /\s*\(1片\)/gi,
        /\s*\(1袋\)/gi,
        /\s*\(1節\)/gi,
        // Any leftovers from previous rounds just in case
        /\s*\(\d+(ml|g|枚|本|貫|個|切)\)/gi
    ];

    foods.forEach(food => {
        let newName = food.name;
        patternsToRemove.forEach(pattern => {
            newName = newName.replace(pattern, '');
        });
        newName = newName.trim();
        if (newName !== food.name) {
            console.log(`Renaming: ${food.name} -> ${newName}`);
            food.name = newName;
        }

        // Clean English similarly if needed
        if (food.nameEn) {
            let newNameEn = food.nameEn.replace(/\s*\(1 pack\)/gi, '')
                .replace(/\s*\(1 bunch\)/gi, '')
                .replace(/\s*\(1 slice\)/gi, '')
                .replace(/\s*\(whole\)/gi, '')
                .replace(/\s*\(cut\)/gi, '')
                .replace(/\s*\(1 bundle\)/gi, '')
                .replace(/\s*\(1 clove\)/gi, '')
                .replace(/\s*\(1 piece\)/gi, '')
                .replace(/\s*\(1 bag\)/gi, '')
                .replace(/\s*\(1 section\)/gi, '')
                .trim();
            if (newNameEn !== food.nameEn) {
                food.nameEn = newNameEn;
            }
        }
    });

    // 2. Resolve Duplicates (Milk, Mikan, Kiwi)
    // We want to keep the "main" one and remove the "duplicate" one.
    // Usually shorter ID is better, or the one with better data.

    const duplicatesToRemove = [];

    // Helper to find duplicates by Name (since we cleaned names now, identical names = duplicate)
    const seenNames = new Map();
    const uniqueFoods = [];

    foods.forEach(food => {
        // Normalize name for check
        const key = food.name;

        if (seenNames.has(key)) {
            // Duplicate found!
            const existing = seenNames.get(key);
            console.log(`Duplicate found: ${key} (IDs: ${existing.id}, ${food.id})`);

            // Logic: Prefer the one with categorization or simpler ID?
            // "milk" vs "milk-200ml" -> keep "milk".
            // "mandarin-orange" vs "mikan" -> keep "mandarin-orange"? or whichever comes first.
            // Let's decide to keep the FIRST one found in the sorted list (which is usually the "better" one if sorted by ID, but we sorted by Name before).
            // Actually, "milk" (ID) is better than "milk-200ml" (ID).
            // If ID contains hyphen/numbers vs simple word, pref simple word.

            if (existing.id.length > food.id.length) {
                // Swap! Keep current food, discard existing seen one
                // But we already added 'existing' to uniqueFoods.. this is tricky.
                // Easier: Just filter out specific known duplicate IDs.
            }
            // For now, let's just logging duplicates and manually adding logic for Milk, Mikan, Kiwi as requested.
        } else {
            seenNames.set(key, food);
        }
    });

    // Explicit removal based on user request "Milk, Mikan, Kiwi have 2"
    // Use the IDs found from grep or assumption.
    // Let's filter out IDs that look like duplicates if we find name collision.

    foods = foods.filter(food => {
        // Specific IDs to remove if they exist and collide
        // "milk-200ml" should go if "milk" exists.
        if (food.id === 'milk-200ml') return false;

        // Mikan: likely 'mikan' and 'mandarin-orange'. Keep 'mikan'? 
        // User request didn't specify which to keep, just "2 exist".
        // Let's look for Name collision after rename.
        return true;
    });

    // Generic Dedupe by Name
    const finalFoods = [];
    const nameMap = new Map();

    foods.forEach(food => {
        if (!nameMap.has(food.name)) {
            nameMap.set(food.name, food);
            finalFoods.push(food);
        } else {
            // Check which one to keep?
            const existing = nameMap.get(food.name);
            console.log(`Removing duplicate index for: ${food.name} (Keep: ${existing.id}, Drop: ${food.id})`);
            // By default preventing add implies dropping the second occurrence.
        }
    });

    // Sort again
    finalFoods.sort((a, b) => a.name.localeCompare(b.name, 'ja'));

    fs.writeFileSync(filePath, JSON.stringify(finalFoods, null, 2), 'utf8');
    console.log(`Cleaned names and removed ${foods.length - finalFoods.length} duplicates.`);

} catch (error) {
    console.error("Error updating file:", error.message);
}
