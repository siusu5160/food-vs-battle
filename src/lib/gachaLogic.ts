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

export function generateBalancedMenu(): MenuSet {
    const allFoods = getAllFoods();
    const carbFoods = allFoods.filter(f => f.category === 'Carb' || f.tags.includes('#Carb'));
    const meatFoods = allFoods.filter(f => f.category === 'Meat' || f.tags.includes('#Protein'));
    const sideFoods = allFoods.filter(f => f.category === 'Vegetable' || f.category === 'Side' || f.tags.includes('#Side'));

    const maxAttempts = 200;
    let bestSet: MenuSet | null = null;

    if (!bestSet || score > bestSet.score) {
        bestSet = completeSet;
    }

    if (score >= 90) break;
}

return bestSet!;
}
