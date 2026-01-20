const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/foods.json');

try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    let foods = JSON.parse(rawData);

    // 1. Rename Cola and check category
    const cola = foods.find(f => f.id === 'cola');
    if (cola) {
        cola.name = "コーラ";
        cola.nameEn = "Cola";
        // User requested Cola 500ml -> Cola
        console.log("Renamed Cola");
    }

    // 2. Adjust Aojiru
    // User requested "Drink" tab, move Aojiru to "Drink"? 
    // Previous request was "Ingredient/Others", but now "Add new Drink tab and put them there".
    // So Aojiru -> Drink
    const aojiru = foods.find(f => f.id === 'aojiru');
    if (aojiru) {
        aojiru.category = "Drink";
        console.log("Moved Aojiru to Drink");
    }

    // 3. Ensure Beer is Alcohol
    const beer = foods.find(f => f.id === 'beer-can');
    if (beer) {
        beer.category = "Alcohol";
        console.log("Ensured Beer is Alcohol");
    }

    // 4. Ensure other drinks are Drink
    // They were added as Drink in previous step, so should be fine.

    fs.writeFileSync(filePath, JSON.stringify(foods, null, 2), 'utf8');
    console.log("Refined drinks data.");

} catch (error) {
    console.error("Error updating file:", error.message);
}
