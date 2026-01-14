export interface FoodItem {
    id: string;
    name: string;
    nameEn: string;
    category: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    salt: number;
    emoji: string;
    image?: string; // Legacy support
    tags: string[];
}
