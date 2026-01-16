import React, { useState, useMemo } from 'react';
import type { FoodItem } from '@/types/FoodItem';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    FOOD_CATEGORIES,
    SUB_CATEGORIES,
    categorizeFoodItem,
    getSubCategoriesForParent,
    FoodCategoryKey,
    SubCategoryKey
} from '@/lib/foodCategories';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (food: FoodItem) => void;
    foods: FoodItem[];
    opponentFood?: FoodItem | null;
}

export const FoodSelectorModal: React.FC<Props> = ({ isOpen, onClose, onSelect, foods, opponentFood }) => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<FoodCategoryKey>('all');
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryKey | null>(null);

    const filteredFoods = useMemo(() => {
        let result = foods;

        // カテゴリーフィルター
        if (selectedCategory !== 'all') {
            result = result.filter(food => {
                const { foodType } = categorizeFoodItem(food);
                return foodType === selectedCategory;
            });
        }

        // サブカテゴリーフィルター
        if (selectedSubCategory) {
            result = result.filter(food => {
                const { subCategory } = categorizeFoodItem(food);
                return subCategory === selectedSubCategory;
            });
        }

        // 検索フィルター
        if (searchTerm) {
            result = result.filter(food =>
                food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (food.nameEn && food.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        return result;
    }, [foods, selectedCategory, selectedSubCategory, searchTerm]);

    const availableSubCategories = useMemo(() => {
        return getSubCategoriesForParent(selectedCategory);
    }, [selectedCategory]);

    const handleCategoryChange = (category: FoodCategoryKey) => {
        setSelectedCategory(category);
        setSelectedSubCategory(null); // サブカテゴリーをリセット
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-[#1a1a1a] w-full max-w-4xl h-[90vh] rounded-3xl border border-[#333] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>

                {/* Header & Opponent Info */}
                <div className="p-6 border-b border-[#333] bg-[#0a0a0a]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white font-serif tracking-wider">SELECT FIGHTER</h2>
                        <button onClick={onClose} className="p-2 hover:bg-[#333] rounded-full transition-colors">✕</button>
                    </div>

                    {opponentFood && (
                        <div className="flex items-center gap-4 bg-red-900/20 border border-red-500/30 p-4 rounded-xl animate-pulse">
                            <div className="text-4xl">{opponentFood.emoji}</div>
                            <div>
                                <div className="text-xs text-red-400 font-bold uppercase tracking-widest">CURRENT ENEMY</div>
                                <div className="text-xl font-bold text-white">{t(opponentFood.name, opponentFood.nameEn)}</div>
                            </div>
                            <div className="ml-auto text-red-500 font-black text-3xl italic">VS</div>
                        </div>
                    )}
                </div>

                {/* Search */}
                <div className="p-4 border-b border-[#333]">
                    <input
                        type="text"
                        placeholder={t('検索...', 'Search...')}
                        className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-2 text-white focus:outline-none focus:border-[#d4af37] rounded-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>

                {/* Main Category Tabs */}
                <div className="px-4 pt-4 border-b border-[#333]">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {Object.entries(FOOD_CATEGORIES).map(([key, config]) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key as FoodCategoryKey)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === key
                                        ? 'bg-[#d4af37] text-black font-bold'
                                        : 'bg-[#222] text-gray-400 hover:bg-[#333] hover:text-white'
                                    }`}
                            >
                                <span>{config.icon}</span>
                                <span className="text-sm">{config.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sub Category Tabs */}
                {availableSubCategories.length > 0 && (
                    <div className="px-4 py-2 border-b border-[#333] bg-[#0a0a0a]">
                        <div className="flex gap-2 overflow-x-auto">
                            <button
                                onClick={() => setSelectedSubCategory(null)}
                                className={`flex items-center gap-1 px-3 py-1 rounded text-xs whitespace-nowrap transition-colors ${selectedSubCategory === null
                                        ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]'
                                        : 'bg-[#1a1a1a] text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                すべて
                            </button>
                            {availableSubCategories.map(key => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedSubCategory(key)}
                                    className={`flex items-center gap-1 px-3 py-1 rounded text-xs whitespace-nowrap transition-colors ${selectedSubCategory === key
                                            ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]'
                                            : 'bg-[#1a1a1a] text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    <span>{SUB_CATEGORIES[key].icon}</span>
                                    <span>{SUB_CATEGORIES[key].label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Food List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {filteredFoods.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            該当する食品が見つかりません
                        </div>
                    ) : (
                        filteredFoods.map(food => (
                            <button
                                key={food.id}
                                onClick={() => onSelect(food)}
                                className="w-full flex items-center gap-4 p-3 hover:bg-[#222] transition-colors text-left group border-b border-[#222]"
                            >
                                <span className="text-3xl group-hover:scale-110 transition-transform">{food.emoji}</span>
                                <div>
                                    <div className="font-bold text-gray-200 group-hover:text-[#d4af37] transition-colors font-sans">
                                        {t(food.name, food.nameEn)}
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono">{food.calories}kcal</div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
