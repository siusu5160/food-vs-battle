const fs = require('fs');
const outputPath = './src/data/foods_external.json';

const data = [
    // --- McDonald's ---
    { id: 'mcd-bigmac', name: 'ビッグマック', nameEn: 'Big Mac', category: 'FastFood', calories: 525, protein: 26.0, fat: 28.3, carbs: 41.8, fiber: 2.8, salt: 2.8, emoji: '🍔', tags: ['#McDonalds', '#Beef'] },
    { id: 'mcd-teriyaki', name: 'てりやきマックバーガー', nameEn: 'Teriyaki McBurger', category: 'FastFood', calories: 478, protein: 14.5, fat: 30.2, carbs: 36.4, fiber: 1.5, salt: 2.2, emoji: '🍔', tags: ['#McDonalds', '#Pork'] },
    { id: 'mcd-fries-m', name: 'マックフライポテト(M)', nameEn: 'French Fries (M)', category: 'FastFood', calories: 410, protein: 5.3, fat: 20.6, carbs: 51.0, fiber: 4.8, salt: 0.8, emoji: '🍟', tags: ['#McDonalds', '#Side'] },
    { id: 'mcd-nuggets-5', name: 'チキンマックナゲット(5ピース)', nameEn: 'Chicken McNuggets (5pcs)', category: 'FastFood', calories: 270, protein: 15.8, fat: 17.2, carbs: 13.1, fiber: 0.9, salt: 1.3, emoji: '🍗', tags: ['#McDonalds', '#Chicken'] },

    // --- Starbucks ---
    { id: 'sbx-latte-tall', name: 'スターバックスラテ(Tall)', nameEn: 'Caffe Latte (Tall)', category: 'Cafe', calories: 223, protein: 12.5, fat: 11.7, carbs: 17.1, fiber: 0, salt: 0.4, emoji: '☕', tags: ['#Starbucks', '#Drink'] },
    { id: 'sbx-matcha-frapp-tall', name: '抹茶クリームフラペチーノ(Tall)', nameEn: 'Matcha Cream Frappuccino (Tall)', category: 'Cafe', calories: 322, protein: 4.5, fat: 12.5, carbs: 48.3, fiber: 0.5, salt: 0.3, emoji: '🥤', tags: ['#Starbucks', '#Sweet'] },
    { id: 'sbx-scone-choc', name: 'チョコレートチャンクスコーン', nameEn: 'Chocolate Chunk Scone', category: 'Cafe', calories: 358, protein: 6.2, fat: 17.5, carbs: 43.8, fiber: 1.5, salt: 0.7, emoji: '🍪', tags: ['#Starbucks', '#Sweet'] },

    // --- Yoshinoya ---
    { id: 'yoshi-gyudon-nami', name: '牛丼(並盛)', nameEn: 'Gyudon (Regular)', category: 'FastFood', calories: 635, protein: 20.1, fat: 28.5, carbs: 70.2, fiber: 1.5, salt: 2.5, emoji: '🍚', tags: ['#Yoshinoya', '#Beef'] },
    { id: 'yoshi-curry-nami', name: '黒カレー(並盛)', nameEn: 'Black Curry (Regular)', category: 'FastFood', calories: 531, protein: 11.2, fat: 18.5, carbs: 76.5, fiber: 3.5, salt: 3.1, emoji: '🍛', tags: ['#Yoshinoya', '#Curry'] },

    // --- Sushiro ---
    { id: 'sushiro-maguro', name: 'まぐろ(2貫)', nameEn: 'Tuna (2pcs)', category: 'Sushi', calories: 78, protein: 5.5, fat: 0.5, carbs: 12.5, fiber: 0, salt: 0.1, emoji: '🍣', tags: ['#Sushiro', '#Fish'] },
    { id: 'sushiro-salmon', name: 'サーモン(2貫)', nameEn: 'Salmon (2pcs)', category: 'Sushi', calories: 95, protein: 6.2, fat: 3.5, carbs: 12.5, fiber: 0, salt: 0.1, emoji: '🍣', tags: ['#Sushiro', '#Fish'] },
    { id: 'sushiro-ikura', name: 'いくら(2貫)', nameEn: 'Salmon Roe (2pcs)', category: 'Sushi', calories: 85, protein: 4.5, fat: 1.5, carbs: 13.0, fiber: 0, salt: 0.8, emoji: '🍣', tags: ['#Sushiro', '#Fish'] },
    { id: 'sushiro-ebi-avocado', name: 'えびアボカド(2貫)', nameEn: 'Shrimp Avocado (2pcs)', category: 'Sushi', calories: 112, protein: 5.8, fat: 5.2, carbs: 13.5, fiber: 0.5, salt: 0.3, emoji: '🥑', tags: ['#Sushiro', '#Shrimp'] },

    // --- Saizeriya ---
    { id: 'saize-milano', name: 'ミラノ風ドリア', nameEn: 'Milano Doria', category: 'Restaurant', calories: 521, protein: 14.5, fat: 30.5, carbs: 45.2, fiber: 2.0, salt: 3.5, emoji: '🥘', tags: ['#Saizeriya', '#Doria'] },
    { id: 'saize-shrimp-salad', name: '小エビのサラダ', nameEn: 'Shrimp Salad', category: 'Restaurant', calories: 125, protein: 6.5, fat: 8.5, carbs: 4.5, fiber: 2.5, salt: 0.8, emoji: '🥗', tags: ['#Saizeriya', '#Salad'] },
    { id: 'saize-carbonara', name: 'カルボナーラ', nameEn: 'Carbonara', category: 'Restaurant', calories: 745, protein: 25.5, fat: 42.1, carbs: 65.2, fiber: 2.0, salt: 2.8, emoji: '🍝', tags: ['#Saizeriya', '#Pasta'] },

    // --- Convenience Store (Onigiri) ---
    { id: 'conv-onigiri-salmon', name: '手巻おにぎり(鮭)', nameEn: 'Rice Ball (Salmon)', category: 'Conbini', calories: 174, protein: 4.5, fat: 1.5, carbs: 36.5, fiber: 0.5, salt: 1.1, emoji: '🍙', tags: ['#Conbini', '#Rice'] },
    { id: 'conv-onigiri-tuna', name: '手巻おにぎり(ツナマヨ)', nameEn: 'Rice Ball (Tuna Mayo)', category: 'Conbini', calories: 235, protein: 4.8, fat: 8.5, carbs: 35.5, fiber: 0.5, salt: 1.2, emoji: '🍙', tags: ['#Conbini', '#Rice'] },
    { id: 'conv-onigiri-konbu', name: '手巻おにぎり(昆布)', nameEn: 'Rice Ball (Kelp)', category: 'Conbini', calories: 182, protein: 3.5, fat: 0.5, carbs: 40.5, fiber: 1.5, salt: 1.3, emoji: '🍙', tags: ['#Conbini', '#Rice'] },

    // --- Convenience Store (Hot Snack) ---
    { id: 'conv-karaagekun-red', name: 'からあげクン(レッド)', nameEn: 'Karaage-kun (Red)', category: 'Conbini', calories: 228, protein: 14.8, fat: 15.5, carbs: 8.5, fiber: 0.5, salt: 1.8, emoji: '🍗', tags: ['#Lawson', '#Chicken'] },
    { id: 'conv-famichiki', name: 'ファミチキ', nameEn: 'Fami-Chiki', category: 'Conbini', calories: 251, protein: 12.7, fat: 15.7, carbs: 14.8, fiber: 0.5, salt: 1.3, emoji: '🍗', tags: ['#FamilyMart', '#Chicken'] },
    { id: 'conv-nanachiki', name: 'ななチキ', nameEn: 'Nana-Chiki', category: 'Conbini', calories: 173, protein: 14.3, fat: 9.8, carbs: 7.2, fiber: 0.3, salt: 1.2, emoji: '🍗', tags: ['#SevenEleven', '#Chicken'] },

    // --- Convenience Store (Healthy) ---
    { id: 'conv-salad-chicken-plain', name: 'サラダチキン(プレーン)', nameEn: 'Salad Chicken (Plain)', category: 'Conbini', calories: 115, protein: 24.5, fat: 1.2, carbs: 0.5, fiber: 0, salt: 1.2, emoji: '🐔', tags: ['#Conbini', '#HighProtein'] },
    { id: 'conv-salad-chicken-herb', name: 'サラダチキン(ハーブ)', nameEn: 'Salad Chicken (Herb)', category: 'Conbini', calories: 118, protein: 23.8, fat: 1.5, carbs: 0.8, fiber: 0.2, salt: 1.4, emoji: '🐔', tags: ['#Conbini', '#HighProtein'] },

    // --- Supplements ---
    { id: 'supple-savas-milk', name: 'ザバス ミルクプロテイン', nameEn: 'SAVAS Milk Protein', category: 'Supplement', calories: 102, protein: 15.0, fat: 0, carbs: 10.5, fiber: 0, salt: 0.2, emoji: '🥤', tags: ['#SAVAS', '#HighProtein'] },
    { id: 'supple-ippon-manzoku', name: '一本満足バー(シリアルチョコ)', nameEn: '1pon Manzoku Bar', category: 'Supplement', calories: 195, protein: 2.8, fat: 10.5, carbs: 22.5, fiber: 1.5, salt: 0.3, emoji: '🍫', tags: ['#Snack', '#Energy'] },
    { id: 'supple-oikos-strawberry', name: 'オイコス(ストロベリー)', nameEn: 'Oikos (Strawberry)', category: 'Supplement', calories: 92, protein: 10.0, fat: 0, carbs: 12.5, fiber: 0, salt: 0.1, emoji: '🥣', tags: ['#Oikos', '#HighProtein'] }
];

// Add generic tags
const processed = data.map(item => {
    // Only add generic tags if they don't have them
    return item;
});

fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2));
console.log(`Generated ${processed.length} external items.`);
