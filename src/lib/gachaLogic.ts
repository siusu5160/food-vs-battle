import { getAllFoods } from '@/lib/search';
import type { FoodItem } from '@/types/FoodItem';

export interface MenuSet {
    main: FoodItem; // Carb
    protein: FoodItem; // Meat
    side: FoodItem; // Side/Vegetable
    totalCalories: number;
    totalProtein: number;
    totalFat: number;
    totalCarbs: number;
    pfcBalance: {
        proteinPercent: number;
        fatPercent: number;
        carbsPercent: number;
    };
    score: number;
}

const TARGET_CALORIES = 600; // Increased slightly for realistic meals
const CALORIE_TOLERANCE = 150;

function calculatePFCBalance(protein: number, fat: number, carbs: number) {
    const proteinCal = protein * 4;
    const fatCal = fat * 9;
    const carbsCal = carbs * 4;
    const total = proteinCal + fatCal + carbsCal;

    if (total === 0) return { proteinPercent: 0, fatPercent: 0, carbsPercent: 0 };

    return {
        proteinPercent: Math.round((proteinCal / total) * 100),
        fatPercent: Math.round((fatCal / total) * 100),
        carbsPercent: Math.round((carbsCal / total) * 100),
    };
}

function scoreMenuSet(set: Omit<MenuSet, 'score'>): number {
    let score = 100;

    // Calorie deviation penalty
    const calorieDeviation = Math.abs(set.totalCalories - TARGET_CALORIES);
    score -= calorieDeviation * 0.1;

    // PFC balance scoring
    const { proteinPercent, fatPercent, carbsPercent } = set.pfcBalance;

    // Protein: ideal 15-30%
    if (proteinPercent < 15 || proteinPercent > 35) score -= 10;
    else if (proteinPercent >= 20 && proteinPercent <= 30) score += 5;

    // Fat: ideal 20-30%
    if (fatPercent < 15 || fatPercent > 40) score -= 10;
    else if (fatPercent >= 20 && fatPercent <= 30) score += 5;

    // Carbs: ideal 50-65%
    if (carbsPercent < 40 || carbsPercent > 70) score -= 10;
    else if (carbsPercent >= 50 && carbsPercent <= 60) score += 5;

    return Math.max(0, Math.min(100, Math.round(score)));
}

// Safe tag checking helper
function hasTags(food: FoodItem, tag: string): boolean {
    return Array.isArray(food.tags) && food.tags.includes(tag);
}

export function generateBalancedMenu(): MenuSet {
    const allFoods = getAllFoods();

    // Safe filtering with proper tag checks
    const carbFoods = allFoods.filter(f =>
        f.category === 'Carb' || hasTags(f, '#Carb')
    );
    const meatFoods = allFoods.filter(f =>
        f.category === 'Meat' || hasTags(f, '#Protein')
    );
    const sideFoods = allFoods.filter(f =>
        f.category === 'Vegetable' || f.category === 'Side' || hasTags(f, '#Side')
    );

    // Helper to get a random item from an array
    const getRandom = (arr: FoodItem[]) => arr[Math.floor(Math.random() * arr.length)];

    // Fallback if empty (shouldn't happen with full data, but just in case use all foods)
    const safeMains = carbFoods.length > 0 ? carbFoods : allFoods;
    const safeProteins = meatFoods.length > 0 ? meatFoods : allFoods;
    const safeSides = sideFoods.length > 0 ? sideFoods : allFoods;

    const main = getRandom(safeMains);
    const protein = getRandom(safeProteins);
    const side = getRandom(safeSides);

    const totalCalories = (main?.calories || 0) + (protein?.calories || 0) + (side?.calories || 0);

    // Calculate PFC (Simplified)
    const totalP = (main?.protein || 0) + (protein?.protein || 0) + (side?.protein || 0);
    const totalF = (main?.fat || 0) + (protein?.fat || 0) + (side?.fat || 0);
    const totalC = (main?.carbs || 0) + (protein?.carbs || 0) + (side?.carbs || 0);

    // Simple Score Logic (Target: 600-800kcal, High Protein)
    let score = 70;
    if (totalCalories >= 600 && totalCalories <= 850) score += 10;
    if (totalP > 25) score += 10;
    if (totalF < 25) score += 10;

    return {
        main: main || allFoods[0],
        protein: protein || allFoods[1],
        side: side || allFoods[2],
        totalCalories,
        totalProtein: totalP,
        totalFat: totalF,
        totalCarbs: totalC,
        score,
        pfcBalance: {
            proteinPercent: Math.min(100, (totalP * 4 / (totalCalories || 1)) * 100),
            fatPercent: Math.min(100, (totalF * 9 / (totalCalories || 1)) * 100),
            carbsPercent: Math.min(100, (totalC * 4 / (totalCalories || 1)) * 100)
        }
    };
}
