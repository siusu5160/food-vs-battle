'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoodItem } from '@/types/FoodItem';
import { judgeBattle, BattleResult } from '@/lib/battleLogic';
import { checkSynergy, Synergy } from '@/lib/synergies';
import { useRouter } from 'next/navigation';

interface Props {
    foodA: FoodItem;
    foodB: FoodItem;
}

export const BattleClient: React.FC<Props> = ({ foodA, foodB }) => {
    const router = useRouter();
    const [result, setResult] = useState<BattleResult | null>(null);
    const [synergy, setSynergy] = useState<Synergy | undefined>(undefined);
    const [history, setHistory] = useState<FoodItem[]>([]);

    useEffect(() => {
        const battleRes = judgeBattle(foodA, foodB);
        setResult(battleRes);
        setSynergy(checkSynergy(foodA.id, foodB.id));

        // Save history (simplified for now)
        const saved = localStorage.getItem('battle_history');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Logic to append unique items
            setHistory(parsed.slice(0, 5));
        }
    }, [foodA, foodB]);

    const handleNextBattle = () => {
        router.push('/battle'); // Will redirect to random
    };

    if (!result) return <div className="p-8 text-center">判定中...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-8 pb-20">
            {/* VS Header */}
            <div className="flex justify-between items-center relative py-4">
                <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
                    ← 戻る
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                    BATTLE
                </div>
            </div>

            {/* Fighters */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                <FighterCard food={foodA} isWinner={result.winner === 'A'} result={result} side="A" />
                <div className="absolute left-1/2 top-48 -translate-x-1/2 -translate-y-1/2 z-10 text-xl font-bold bg-black/50 px-2 rounded-full border border-white/20">
                    VS
                </div>
                <FighterCard food={foodB} isWinner={result.winner === 'B'} result={result} side="B" />
            </div>

            {/* Synergy Alert */}
            <AnimatePresence>
                {synergy && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 p-6 rounded-2xl border border-purple-500/30 text-center shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                    >
                        <div className="text-yellow-400 font-bold mb-1 tracking-wider text-sm">SYNERGY DETECTED!</div>
                        <h3 className="text-2xl font-black text-white mb-2">{synergy.title}</h3>
                        <p className="text-gray-200 text-sm md:text-base leading-relaxed">{synergy.description}</p>
                        <div className="mt-4 pt-4 border-t border-white/10 text-left bg-black/20 p-4 rounded-xl">
                            <span className="text-xs text-purple-300 block mb-1">おすすめレシピ:</span>
                            <div className="font-bold text-white mb-1">{synergy.recipeName}</div>
                            <div className="text-xs text-gray-400">{synergy.recipeDescription}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Judgments */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-400 border-b border-gray-700 pb-2">判定詳細</h3>
                {result.judgments.map((judgment, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded font-bold">{judgment.badge}</span>
                            <h4 className="font-bold text-lg text-gray-100">{judgment.title}</h4>
                        </div>
                        <p className="text-gray-300 mb-3">{judgment.content}</p>
                        <div className="bg-black/30 p-3 rounded text-sm text-gray-400 leading-relaxed border-l-2 border-gray-600">
                            {judgment.reason}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="h-12" />
        </div>
    );
};

const FighterCard = ({ food, isWinner, result, side }: { food: FoodItem, isWinner: boolean, result: BattleResult, side: 'A' | 'B' }) => {
    const isLoser = !isWinner && result.winner !== 'Draw';

    return (
        <motion.div
            className={`relative bg-gray-800 rounded-2xl overflow-hidden border-2 ${isWinner ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'border-gray-700'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLoser ? 0.6 : 1, scale: 1 }}
        >
            <div className="aspect-square bg-gray-700 flex items-center justify-center relative overlow-hidden">
                <span className="text-8xl drop-shadow-2xl filter">{food.emoji}</span>
                {isWinner && (
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute -top-2 -right-2 bg-yellow-500 text-black font-black px-3 py-1 text-sm rotate-12 shadow-lg z-10"
                    >
                        WIN!
                    </motion.div>
                )}
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
                <div className="absolute bottom-2 right-3 text-white font-black text-2xl drop-shadow-md">
                    {food.calories}<span className="text-sm font-normal text-gray-300 ml-1">kcal</span>
                </div>
            </div>

            <div className="p-4 relative">
                <h2 className="text-xl font-bold text-white leading-tight mb-2 min-h-[3.5rem] flex items-center">{food.name}</h2>

                <div className="space-y-2 text-sm">
                    <StatRow label="Protein" value={food.protein} unit="g" highlight={true} />
                    <StatRow label="Fat" value={food.fat} unit="g" />
                    <StatRow label="Carb" value={food.carbs} unit="g" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                    {food.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const StatRow = ({ label, value, unit, highlight }: { label: string, value: number, unit: string, highlight?: boolean }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-500">{label}</span>
        <span className={`font-mono font-bold ${highlight ? 'text-white' : 'text-gray-400'}`}>
            {value}<span className="text-xs text-gray-600 ml-0.5">{unit}</span>
        </span>
    </div>
);
