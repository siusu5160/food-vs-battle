/**
 * Exercise types with their MET values
 * METs (Metabolic Equivalent of Task) - energy cost of physical activities
 */
export const EXERCISE_TYPES = {
    jogging: { name: 'ジョギング', nameEn: 'Jogging', mets: 7.0, icon: '🏃' },
    walking: { name: 'ウォーキング', nameEn: 'Walking', mets: 3.5, icon: '🚶' },
    swimming: { name: '水泳', nameEn: 'Swimming', mets: 8.0, icon: '🏊' },
    cycling: { name: 'サイクリング', nameEn: 'Cycling', mets: 6.0, icon: '🚴' },
    yoga: { name: 'ヨガ', nameEn: 'Yoga', mets: 2.5, icon: '🧘' },
} as const;

export type ExerciseType = keyof typeof EXERCISE_TYPES;

/**
 * Calculate exercise duration needed to burn calories
 * Formula: Calories = METs × Weight(kg) × Time(h) × 1.05
 * 
 * @param calories - Calories to burn
 * @param exerciseType - Type of exercise
 * @param weight - Body weight in kg (default: 60)
 * @returns Duration in minutes
 */
export function calculateExerciseDuration(
    calories: number,
    exerciseType: ExerciseType,
    weight: number = 60
): number {
    const mets = EXERCISE_TYPES[exerciseType].mets;
    const hours = calories / (mets * weight * 1.05);
    return Math.round(hours * 60); // Convert to minutes
}

/**
 * Format minutes to hours and minutes string
 */
export function formatDuration(minutes: number): { hours: number; mins: number } {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return { hours, mins };
}

/**
 * Calculate all exercise options for given calories
 */
export function calculateAllExercises(calories: number, weight: number = 60) {
    return Object.entries(EXERCISE_TYPES).map(([key, exercise]) => ({
        type: key as ExerciseType,
        name: exercise.name,
        nameEn: exercise.nameEn,
        icon: exercise.icon,
        minutes: calculateExerciseDuration(calories, key as ExerciseType, weight),
    }));
}
