'use client';

import React, { useState } from 'react';
import { generateBalancedMenu, type MenuSet } from '@/lib/gachaLogic';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuGachaProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const MenuGacha: React.FC<MenuGachaProps> = ({ isOpen, onClose }) => {
    const [menu, setMenu] = useState<MenuSet | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const handleSpin = () => {
        setIsSpinning(true);
        setMenu(null);
        setTimeout(() => {
            try {
                const newMenu = generateBalancedMenu();
                setMenu(newMenu);
            } catch (e) {
                console.error(e);
            } finally {
                setIsSpinning(false);
            }
        }, 1200);
    };

    if (isOpen !== undefined && !isOpen) return null;

    const content = (
        <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
            {onClose && (
                <div className="w-full flex justify-end mb-4">
                    <button onClick={onClose} className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 text-white transition-colors">
                        ✕ 閉じる
                    </button>
                </div>
            )}

            <AnimatePresence mode="wait">
                {!menu && !isSpinning && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-12 bg-gray-800/80 rounded-3xl p-8 border border-gray-700 shadow-2xl backdrop-blur-md"
                    >
                        <div className="text-8xl mb-6 filter drop-shadow-lg">🎰</div>
                        <h3 className="text-3xl font-black mb-4 text-white">今日の黄金バランス定食</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            600kcal前後・PFCバランスの最適な組み合わせをAIが提案します。
                        </p>
                        <button
                            onClick={handleSpin}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black py-4 px-12 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:-translate-y-1 transition-all text-xl"
                        >
                            メニューを提案してもらう
                        </button>
                    </motion.div>
                )}

                {isSpinning && (
                    <motion.div
                        key="spinning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-20"
                    >
                        <div className="text-8xl mb-6 animate-bounce">🎲</div>
                        <h3 className="text-2xl font-bold text-emerald-400 animate-pulse">メニューを構築中...</h3>
                    </motion.div>
                )}

                {menu && !isSpinning && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full bg-gray-900/90 rounded-3xl border-2 border-emerald-500/30 overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-emerald-900/30 p-6 border-b border-emerald-500/30 flex justify-between items-center flex-wrap gap-4">
                            <div>
                                <div className="text-emerald-400 text-sm font-bold tracking-widest uppercase mb-1">Generated Menu</div>
                                <h3 className="text-2xl font-black text-white">本日のラッキーセット</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-black/40 px-4 py-2 rounded-full border border-emerald-500/30">
                                    <span className="text-gray-400 text-xs mr-2">TOTAL SCORE</span>
                                    <span className="text-3xl font-black text-emerald-400">{menu.score}</span>
                                    <span className="text-sm text-gray-500">/100</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Comparison Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <MenuItemCard role="主食" food={menu.main} color="border-orange-500/50" bg="from-orange-500/10" />
                                <MenuItemCard role="主菜" food={menu.protein} color="border-red-500/50" bg="from-red-500/10" />
                                <MenuItemCard role="副菜" food={menu.side} color="border-green-500/50" bg="from-green-500/10" />
                            </div>

                            {/* Nutrition Summary */}
                            <div className="bg-black/30 rounded-2xl p-6 border border-white/5 flex flex-wrap gap-8 justify-around items-center">
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 mb-1">TOTAL CALORIES</div>
                                    <div className="text-4xl font-black text-white tracking-tighter">{menu.totalCalories}</div>
                                    <div className="text-xs text-gray-500">kcal</div>
                                </div>

                                <NutritionBar label="Protein" val={menu.totalProtein} pct={menu.pfcBalance.proteinPercent} color="bg-red-500" />
                                <NutritionBar label="Fat" val={menu.totalFat} pct={menu.pfcBalance.fatPercent} color="bg-yellow-500" />
                                <NutritionBar label="Carbs" val={menu.totalCarbs} pct={menu.pfcBalance.carbsPercent} color="bg-green-500" />
                            </div>

                            {/* Actions */}
                            <div className="mt-8 flex gap-4">
                                <button
                                    onClick={handleSpin}
                                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all border border-gray-600"
                                >
                                    🔄 もう一度回す
                                </button>
                                <button
                                    onClick={() => alert('保存機能は準備中です')}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-900/20"
                                >
                                    💾 メニューを保存
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    // If modal props are provided, wrap in overlay
    if (isOpen !== undefined) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto" onClick={onClose}>
                <div className="w-full max-w-5xl" onClick={e => e.stopPropagation()}>
                    {content}
                </div>
            </div>
        );
    }

    return content;
};

const MenuItemCard = ({ role, food, color, bg }: { role: string, food: any, color: string, bg: string }) => (
    <div className={`bg-gray-800 rounded-2xl p-5 border ${color} relative overflow-hidden group`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${bg} to-transparent opacity-50`} />
        <div className="relative z-10 flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{role}</span>
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{food.emoji}</div>
            <div className="font-bold text-white text-center leading-tight mb-1 h-12 flex items-center justify-center w-full">{food.name}</div>
        </div>
    </div>
);

const NutritionBar = ({ label, val, pct, color }: { label: string, val: number, pct: number, color: string }) => (
    <div className="w-24 text-center">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{label}</span>
            <span>{Math.round(val)}g</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                className={`h-full ${color}`}
            />
        </div>
        <div className="text-xs text-right mt-1 font-mono text-gray-600">{pct}%</div>
    </div>
);
