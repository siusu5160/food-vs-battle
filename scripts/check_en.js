const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/foods.json');
const foods = require(dataPath);

console.log(`Total Food Count: ${foods.length}`);

let missingEn = 0;
const missingExamples = [];

foods.forEach(f => {
    if (!f.nameEn || f.nameEn === "" || f.nameEn === f.name) {
        missingEn++;
        if (missingExamples.length < 10) {
            missingExamples.push(f.name);
        }
    }
});

console.log(`Missing English Names: ${missingEn} / ${foods.length}`);
console.log(`Examples: ${missingExamples.join(', ')}`);
