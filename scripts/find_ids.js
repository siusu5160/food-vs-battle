const fs = require('fs');
const path = require('path');

const foods = require('../src/data/foods.json');

const keywords = ['sushi', 'burger', 'pizza', 'ice', 'chocolate', 'gyu', 'katsu', 'udon', 'soba', 'curry'];

keywords.forEach(kw => {
    console.log(`--- Searching for "${kw}" ---`);
    const matches = foods.filter(f =>
        f.id.toLowerCase().includes(kw) ||
        (f.nameEn && f.nameEn.toLowerCase().includes(kw))
    );
    matches.forEach(m => console.log(`${m.id} (${m.name})`));
});
