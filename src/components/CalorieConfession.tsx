'use client';

import React, { useState, useEffect } from 'react';
import { getAllFoods, searchFoods } from '@/lib/search';
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
    const [searchTerm, setSearchTerm] = useState('');
    const [displayLimit, setDisplayLimit] = useState(100);

    useEffect(() => {
        // Initial load: High calorie items first, preferably prepared foods
        const allFoods = getAllFoods();
        // Sort by calories desc for the "Confession" vibe
        const sorted = [...allFoods].sort((a, b) => b.calories - a.calories);
        setFoods(sorted);
    }, []);

    const displayedFoods = searchTerm
        ? searchFoods(searchTerm)
        : foods;

    const currentFoods = displayedFoods.slice(0, displayLimit);

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
            <div className="bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border-2 border-red-500/30 shadow-2xl" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-red-900 to-orange-900 p-4 border-b border-red-500/30 z-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl md:text-2xl font-black flex items-center gap-2">
                            <span className="text-2xl">😇</span>
                            <span>{t('カロリー懺悔室', 'Calorie Confession Room')}</span>
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-xl transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-gray-300 text-xs mt-1">{t('今日食べたものを正直に選んでください...', 'Please honestly select what you ate today...')}</p>
                </div>

                <div className="p-4">
                    {!showResult ? (
                        <>
                            {/* Food Selection */}
                            <div className="mb-4">
                                <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-gray-400">
                                    <span>🍽️</span> {t('食べたものを選択', 'Select food you ate')}
                                </h3>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder={t('メニューを検索 (例: ラーメン, マック...)', 'Search menu (e.g. Ramen, Mac...)')}
                                        className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-2 text-sm text-white focus:border-red-500 focus:outline-none transition-colors"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setDisplayLimit(100); // Reset limit on search
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-80 overflow-y-auto p-1" onScroll={(e) => {
                                    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
                                    if (bottom && currentFoods.length < displayedFoods.length) {
                                        setDisplayLimit(prev => prev + 50);
                                    }
                                }}>
                                    {currentFoods.map(food => (
                                        <button
                                            key={food.id}
                                            onClick={() => handleFoodToggle(food.id)}
                                            className={`p-2 rounded-lg border-2 transition-all text-left relative overflow-hidden group ${selectedFoods.includes(food.id)
                                                ? 'border-red-500 bg-red-500/20'
                                                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                                                }`}
                                        >
                                            <div className="text-[10px] font-bold text-gray-400 mb-0.5 flex justify-between">
                                                <span>{food.calories} kcal</span>
                                                <span className="opacity-50 text-[9px]">{food.category}</span>
                                            </div>
                                            <div className="text-xs font-bold truncate leading-tight">
                                                {t(food.name, food.nameEn)}
                                            </div>
                                            {/* Selection Marker */}
                                            {selectedFoods.includes(food.id) && (
                                                <div className="absolute top-0.5 right-0.5 text-red-500 text-xs">
                                                    ✔
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                    {currentFoods.length === 0 && (
                                        <div className="col-span-full text-center text-gray-500 py-6 text-sm">
                                            {t('見つかりませんでした...', 'Not found...')}
                                        </div>
                                    )}
                                    {currentFoods.length < displayedFoods.length && (
                                        <div className="col-span-full text-center py-1">
                                            <button
                                                onClick={() => setDisplayLimit(prev => prev + 50)}
                                                className="text-gray-400 hover:text-white text-xs"
                                            >
                                                {t('もっと見る', 'Load more')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Selected Summary */}
                            {selectedFoods.length > 0 && (
                                <div className="bg-gray-800/50 p-3 rounded-lg mb-4 flex justify-between items-center">
                                    <div className="text-xs text-gray-400">{t('選択中:', 'Selected:')} {selectedFoods.length}{t('品', 'items')}</div>
                                    <div className="text-lg font-black text-red-400">
                                        {t('合計:', 'Total:')} {totalCalories} kcal
                                    </div>
                                </div>
                            )}

                            {/* Confess Button */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleConfess}
                                    disabled={selectedFoods.length === 0}
                                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-3 rounded-lg transition-all disabled:cursor-not-allowed text-sm"
                                >
                                    {t('懺悔する', 'Confess')}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all text-sm"
                                >
                                    {t('キャンセル', 'Cancel')}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Result */}
                            <div className="text-center mb-6">
                                <div className="text-4xl mb-2">⚖️</div>
                                <h3 className="text-2xl font-black mb-2">{t('あなたの罪', 'Your Sin')}</h3>
                                <div className="text-4xl font-black text-red-500 mb-1">
                                    {totalCalories}
                                </div>
                                <div className="text-lg text-gray-400">kcal</div>
                            </div>

                            {/* Exercise Requirements */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-3 text-center text-gray-400">{t('償うには...', 'To atone...')}</h3>
                                <div className="space-y-2">
                                    {exercises.map(exercise => {
                                        const { hours, mins } = formatDuration(exercise.minutes);
                                        return (
                                            <div
                                                key={exercise.type}
                                                className="bg-gray-800/50 p-3 rounded-lg flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{exercise.icon}</span>
                                                    <span className="font-bold text-sm">{exercise.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-black text-orange-400">
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
                            <div className="flex gap-2">
                                <button
                                    onClick={handleReset}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all text-sm"
                                >
                                    {t('もう一度懺悔する', 'Confess again')}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-6 bg-primary hover:bg-primary/80 text-black font-bold py-3 rounded-lg transition-all text-sm"
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
