'use client';

import React, { useState, useEffect } from 'react';
import { getAllFoods } from '@/lib/search';
import { calculateAllExercises, formatDuration } from '@/lib/exerciseCalculator';
import type { FoodItem } from '@/types/FoodItem';

import { useLanguage } from '@/contexts/LanguageContext';

interface CalorieConfessionProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CalorieConfession: React.FC<CalorieConfessionProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [foods, setFoods] = useState<FoodItem[]>([]);

    useEffect(() => {
        setFoods(getAllFoods());
    }, []);

    if (!isOpen) return null;

    const totalCalories = selectedFoods.reduce((sum, foodId) => {
        const food = foods.find(f => f.id === foodId);
        return sum + (food?.calories || 0);
    }, 0);

    const exercises = calculateAllExercises(totalCalories);

    const handleFoodToggle = (foodId: string) => {
        setSelectedFoods(prev =>
            prev.includes(foodId)
                ? prev.filter(id => id !== foodId)
                : [...prev, foodId]
        );
    };

    const handleConfess = () => {
        if (selectedFoods.length > 0) {
            setShowResult(true);
        }
    };

    const handleReset = () => {
        setSelectedFoods([]);
        setShowResult(false);
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
            <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-red-500/30 shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-red-900 to-orange-900 p-6 border-b border-red-500/30">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3">
                            <span className="text-4xl">😇</span>
                            <span>{t('カロリー懺悔室', 'Calorie Confession Room')}</span>
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-2xl transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-gray-300 mt-2">{t('今日食べたものを正直に選んでください...', 'Please honestly select what you ate today...')}</p>
                </div>

                <div className="p-6">
                    {!showResult ? (
                        <>
                            {/* Food Selection */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span>🍽️</span> {t('食べたものを選択', 'Select food you ate')}
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2">
                                    {foods.slice(0, 100).map(food => (
                                        <button
                                            key={food.id}
                                            onClick={() => handleFoodToggle(food.id)}
                                            className={`p-3 rounded-lg border-2 transition-all text-left ${selectedFoods.includes(food.id)
                                                ? 'border-red-500 bg-red-500/20'
                                                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                                                }`}
                                        >
                                            <div className="text-xs font-bold text-gray-400 mb-1">
                                                {food.calories} kcal
                                            </div>
                                            <div className="text-sm font-bold truncate">
                                                {food.name}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Selected Summary */}
                            {selectedFoods.length > 0 && (
                                <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                                    <div className="text-sm text-gray-400 mb-2">{t('選択中:', 'Selected:')} {selectedFoods.length}{t('品', 'items')}</div>
                                    <div className="text-2xl font-black text-red-400">
                                        {t('合計:', 'Total:')} {totalCalories} kcal
                                    </div>
                                </div>
                            )}

                            {/* Confess Button */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleConfess}
                                    disabled={selectedFoods.length === 0}
                                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-4 rounded-xl transition-all disabled:cursor-not-allowed"
                                >
                                    {t('懺悔する', 'Confess')}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl transition-all"
                                >
                                    {t('キャンセル', 'Cancel')}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Result */}
                            <div className="text-center mb-8">
                                <div className="text-6xl mb-4">⚖️</div>
                                <h3 className="text-3xl font-black mb-4">{t('あなたの罪', 'Your Sin')}</h3>
                                <div className="text-6xl font-black text-red-500 mb-2">
                                    {totalCalories}
                                </div>
                                <div className="text-2xl text-gray-400">kcal</div>
                            </div>

                            {/* Exercise Requirements */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-4 text-center">{t('償うには...', 'To atone...')}</h3>
                                <div className="space-y-3">
                                    {exercises.map(exercise => {
                                        const { hours, mins } = formatDuration(exercise.minutes);
                                        return (
                                            <div
                                                key={exercise.type}
                                                className="bg-gray-800/50 p-4 rounded-lg flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-3xl">{exercise.icon}</span>
                                                    <span className="font-bold">{exercise.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-black text-orange-400">
                                                        {hours > 0 && `${hours}${t('時間', 'h')} `}
                                                        {mins > 0 && `${mins}${t('分', 'm')}`}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleReset}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all"
                                >
                                    {t('もう一度懺悔する', 'Confess again')}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-6 bg-primary hover:bg-primary/80 text-black font-bold py-3 rounded-xl transition-all"
                                >
                                    {t('閉じる', 'Close')}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
