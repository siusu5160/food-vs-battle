'use client';

import React, { useState, useEffect } from 'react';
import { searchFoods } from '@/lib/search';
import { FoodItem } from '@/types/FoodItem';

export const FoodSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<FoodItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (query.length > 0) {
            const hits = searchFoods(query, 50); // Increased limit
            setResults(hits);
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query]);

    // Handle selection (mock navigation for now)
    const handleSelect = (food: FoodItem) => {
        // Navigate to battle with a random opponent for now, or just show details?
        // Let's redirect to a random battle with this food
        window.location.href = `/battle/${food.id}/random`;
    };

    const handleCategoryClick = (tag: string) => {
        setQuery(tag);
        // Focus input? No need, just show results
    };

    const categories = [
        { label: 'マクドナルド', emoji: '🍔', tag: 'マクドナルド' },
        { label: 'スターバックス', emoji: '☕', tag: 'スターバックス' },
        { label: 'コンビニチキン', emoji: '🍗', tag: 'チキン' },
        { label: '高タンパク', emoji: '💪', tag: '#HighProtein' },
        { label: '低脂質', emoji: '✨', tag: '#LowFat' },
        { label: 'すき家', emoji: '🐮', tag: 'すき家' },
    ];

    return (
        <div className="relative w-full max-w-4xl mx-auto z-50 flex flex-col gap-6">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="食材、料理、チェーン店名で検索..."
                    className="w-full bg-gray-900 border-2 border-primary/50 focus:border-primary text-white text-lg rounded-full py-4 px-6 pl-14 shadow-xl transition-all outline-none"
                    onFocus={() => query && setIsOpen(true)}
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                {/* Data Count Badge */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono bg-gray-800 px-2 py-1 rounded">
                    2,500+ Items
                </div>
            </div>

            {/* Quick Categories */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full">
                {categories.map((cat) => (
                    <button
                        key={cat.label}
                        onClick={() => handleCategoryClick(cat.tag)}
                        className="flex flex-col items-center justify-center p-2 bg-gray-800/50 border border-gray-700 hover:border-primary/50 hover:bg-gray-700 rounded-xl transition-all group"
                    >
                        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{cat.emoji}</span>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-300">{cat.label}</span>
                    </button>
                ))}
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-[80px] left-0 right-0 z-50 mt-2 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto">
                    {results.map((food) => (
                        <button
                            key={food.id}
                            onClick={() => handleSelect(food)}
                            className="w-full text-left p-4 hover:bg-gray-800 transition-colors flex items-center gap-4 border-b border-gray-800 last:border-0"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">{food.emoji}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-gray-100 truncate">
                                    {food.name}
                                </div>
                                <div className="text-xs text-gray-500 flex gap-2">
                                    <span>{food.calories}kcal</span>
                                    <span>P:{food.protein}g</span>
                                    <span className="text-primary">{food.category}</span>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {food.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] bg-gray-800 px-2 py-1 rounded-full text-gray-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </button>
                    ))}
                    <div className="p-2 text-center text-xs text-gray-600 bg-black/20">
                        {results.length >= 50 ? '上位50件を表示中...' : `${results.length}件見つかりました`}
                    </div>
                </div>
            )}
        </div>
    );
};
