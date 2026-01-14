import React, { useState, useMemo } from 'react';
import type { FoodItem } from '@/types/FoodItem';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (food: FoodItem) => void;
    foods: FoodItem[];
}

export const FoodSelectorModal: React.FC<Props> = ({ isOpen, onClose, onSelect, foods }) => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFoods = useMemo(() => {
        return foods.filter(food =>
            food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (food.nameEn && food.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [foods, searchTerm]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] w-full max-w-md max-h-[80vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-[#333]">
                <div className="p-4 border-b border-[#333] flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#d4af37] font-serif">SELECT FOOD</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
                </div>

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

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {filteredFoods.map(food => (
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
                    ))}
                </div>
            </div>
        </div>
    );
};
