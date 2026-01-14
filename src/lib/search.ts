import Fuse from 'fuse.js';
import foodsRaw from '@/data/foods.json';
import { FoodItem } from '@/types/FoodItem';

const foods = foodsRaw as FoodItem[];

const options = {
    keys: [
        { name: 'name', weight: 0.5 },
        { name: 'nameEn', weight: 0.3 },
        { name: 'tags', weight: 0.2 },
        { name: 'category', weight: 0.1 }
    ],
    threshold: 0.4, // Slightly looser matching
    includeScore: true,
    distance: 100,
    ignoreLocation: true, // Match anywhere in the string (important for Japanese)
    useExtendedSearch: true, // Enable special characters for advanced search
};

let fuse: Fuse<FoodItem> | null = null;

const getFuse = () => {
    if (!fuse) {
        fuse = new Fuse(foods, options);
    }
    return fuse;
};

export const searchFoods = (query: string, limit = 10): FoodItem[] => {
    if (!query) return foods.slice(0, limit);
    return getFuse().search(query).map(result => result.item).slice(0, limit);
};

export const getAllFoods = (): FoodItem[] => {
    return foods;
};

export const getFoodById = (id: string): FoodItem | undefined => {
    return foods.find(f => f.id === id);
};
