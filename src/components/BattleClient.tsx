'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FoodItem } from '@/types/FoodItem';
import { judgeBattle, BattleResult } from '@/lib/battleLogic';
import { checkSynergy, Synergy } from '@/lib/synergies';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProductRecommendations } from './ProductRecommendations';
import { getAllFoods } from '@/lib/search';
import ShareButtons from './ShareButtons';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface Props {
    foodA: FoodItem;
    foodB: FoodItem;
}

export const BattleClient: React.FC<Props> = ({ foodA, foodB }) => {
    const router = useRouter();
    const { t } = useLanguage();
    const [result, setResult] = useState<BattleResult | null>(null);
    const [synergy, setSynergy] = useState<Synergy | undefined>(undefined);

    useEffect(() => {
        try {
            const battleRes = judgeBattle(foodA, foodB);
            setResult(battleRes);
            setSynergy(checkSynergy(foodA.id, foodB.id));
        } catch (error) {
            console.error('Battle judgment error:', error);
        }
    }, [foodA.id, foodB.id]);

    if (!result) return <div className="p-8 text-center text-white">{t('判定中...', 'Judging...')}</div>;

    // Normalization for Radar Chart
    const maxP = Math.max(foodA.protein, foodB.protein, 1);
    const maxF = Math.max(foodA.fat, foodB.fat, 1);
    const maxC = Math.max(foodA.carbs, foodB.carbs, 1);
    const maxFib = Math.max(foodA.fiber, foodB.fiber, 1);

    // Helper for score display
    const calculateOverallScore = (target: FoodItem, opponent: FoodItem) => {
        let baseScore = 50;
        // Simple heuristic: better if higher protein, lower fat/calories relative to opponent
        if (target.protein > opponent.protein) baseScore += 15;
        if (target.fat < opponent.fat) baseScore += 10;
        if (target.calories < opponent.calories) baseScore += 10;
        if (target.fiber > opponent.fiber) baseScore += 5;
        // Cap at 99
        return Math.min(99, Math.max(10, baseScore + Math.floor(Math.random() * 10)));
    };
    const maxS = Math.max(foodA.salt, foodB.salt, 1);

    const chartData = {
        labels: [
            t('タンパク質', 'Protein'),
            t('脂質', 'Fat'),
            t('炭水化物', 'Carbs'),
            t('食物繊維', 'Fiber'),
            t('塩分', 'Salt')
        ],
        datasets: [
            {
                label: foodA.name,
                data: [
                    (foodA.protein / maxP) * 100,
                    (foodA.fat / maxF) * 100,
                    (foodA.carbs / maxC) * 100,
                    (foodA.fiber / maxFib) * 100,
                    (foodA.salt / maxS) * 100,
                ],
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 2,
            },
            {
                label: foodB.name,
                data: [
                    (foodB.protein / maxP) * 100,
                    (foodB.fat / maxF) * 100,
                    (foodB.carbs / maxC) * 100,
                    (foodB.fiber / maxFib) * 100,
                    (foodB.salt / maxS) * 100,
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        scales: {
            r: {
                angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 12 } },
                ticks: { display: false, backdropColor: 'transparent' },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                labels: { color: 'white' },
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-8 pb-20">
            {/* VS Header */}
            <div className="flex justify-between items-center relative py-4">
                <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
                    {t('← 戻る', '← Back')}
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                    BATTLE
                </div>
            </div>

            {/* Fighters */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                <FighterCard food={foodA} isWinner={result.winner === 'A'} result={result} side="A" t={t} />
                <div className="absolute left-1/2 top-48 -translate-x-1/2 -translate-y-1/2 z-10 text-xl font-bold bg-black/50 px-2 rounded-full border border-white/20">
                    VS
                </div>
                <FighterCard food={foodB} isWinner={result.winner === 'B'} result={result} side="B" t={t} />
            </div>

            {/* Random Match Button (Moved here) */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => {
                        try {
                            // Use imported getAllFoods function
                            const allFoods = getAllFoods();

                            if (!allFoods || allFoods.length < 2) {
                                console.error('Not enough foods available');
                                router.push('/');
                                return;
                            }

                            let newA = allFoods[Math.floor(Math.random() * allFoods.length)];
                            let newB = allFoods[Math.floor(Math.random() * allFoods.length)];
                            let retries = 0;

                            // Ensure different foods
                            while ((!newA?.id || !newB?.id || newA.id === newB.id) && retries < 10) {
                                newA = allFoods[Math.floor(Math.random() * allFoods.length)];
                                newB = allFoods[Math.floor(Math.random() * allFoods.length)];
                                retries++;
                            }

                            // Final validation
                            if (newA?.id && newB?.id && newA.id !== newB.id) {
                                console.log('Random match:', { a: newA.id, b: newB.id });
                                // Use replace instead of push to avoid history buildup
                                router.replace(`/battle/${encodeURIComponent(newA.id)}/${encodeURIComponent(newB.id)}`);
                            } else {
                                console.error('Failed to generate valid random match');
                                router.push('/');
                            }
                        } catch (error) {
                            console.error('Random Match Error:', error);
                            router.push('/');
                        }
                    }}
                    className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all transform hover:scale-105 text-sm md:text-base"
                >
                    <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {t('もう一度ランダムマッチ', 'Random Match Again')}
                    </span>
                </button>
            </div>

            {/* Comparison Graph */}
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-center text-gray-400 text-sm font-bold mb-4">{t('成分バランス比較 (相対比)', 'Nutrient Balance (Relative)')}</h3>
                <div className="h-[300px] w-full">
                    <Radar data={chartData} options={chartOptions} />
                </div>
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
                <h3 className="text-xl font-bold text-gray-400 border-b border-gray-700 pb-2">{t('判定詳細', 'Judgment Details')}</h3>
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

            {/* Product Recommendations - Show for winner */}
            {result.winner !== 'Draw' && (
                <ProductRecommendations
                    food={result.winner === 'A' ? foodA : foodB}
                    title={`${result.winner === 'A' ? foodA.name : foodB.name}をもっと楽しむために`}
                />
            )}

            {/* Share Buttons */}
            <ShareButtons
                title={`${foodA.name} VS ${foodB.name} | FOOD VS BATTLE`}
                battleText={`${foodA.emoji}${foodA.name} VS ${foodB.emoji}${foodB.name} の対決結果！\n勝者は...【${result.winner === 'A' ? foodA.name : result.winner === 'B' ? foodB.name : '引き分け'}】${result.winner === 'A' ? foodA.emoji : result.winner === 'B' ? foodB.emoji : '🤝'}🏆\n\n#FOODVS #カロリー対決 #栄養比較`}
            />



            <div className="h-12" />
        </div>
    );
};

const FighterCard = ({ food, isWinner, result, side, t }: { food: FoodItem, isWinner: boolean, result: BattleResult, side: 'A' | 'B', t: (ja: string, en: string) => string }) => {
    const isLoser = !isWinner && result.winner !== 'Draw';
    const borderColor = isWinner ? 'border-[#d4af37]' : 'border-[#333]';
    const shadowClass = isWinner ? 'shadow-[0_0_30px_rgba(212,175,55,0.2)]' : '';

    return (
        <motion.div
            className={`relative bg-gray-800 rounded-2xl border-2 ${borderColor} ${shadowClass} flex flex-col h-full`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLoser ? 0.6 : 1, scale: 1 }}
        >
            {/* Header with Emoji */}
            <div className="aspect-square bg-gray-700/50 flex items-center justify-center relative rounded-t-xl overflow-hidden shrink-0">
                <span className="text-6xl sm:text-7xl drop-shadow-2xl filter">{food.emoji}</span>

                {/* WIN/LOSE Badge - Always show for non-draw results */}
                {result.winner !== 'Draw' && (
                    <div className="absolute top-2 right-2 z-20">
                        {isWinner ? (
                            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black px-4 py-2 rounded-lg shadow-xl animate-pulse">
                                🏆 WIN
                            </div>
                        ) : (
                            <div className="bg-gray-700/90 text-gray-300 font-bold px-4 py-2 rounded-lg shadow-lg">
                                LOSE
                            </div>
                        )}
                    </div>
                )}

                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
                <div className="absolute bottom-2 right-3 text-white font-black text-2xl drop-shadow-md">
                    {food.calories}<span className="text-sm font-normal text-gray-300 ml-1">kcal</span>
                </div>
                <div className="absolute bottom-2 left-2 text-[10px] text-gray-400 bg-black/50 px-1 rounded backdrop-blur-sm">
                    /100g
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-tight mb-3 min-h-[3rem] flex items-center">
                    {t(food.name, food.nameEn)}
                </h2>

                <div className="space-y-2 text-sm flex-1">
                    <StatRow label={t('タンパク質', 'Protein')} value={food.protein} unit="g" highlight={true} />
                    <StatRow label={t('脂質', 'Fat')} value={food.fat} unit="g" />
                    <StatRow label={t('炭水化物', 'Carbs')} value={food.carbs} unit="g" />
                    <StatRow label={t('食物繊維', 'Fiber')} value={food.fiber} unit="g" />
                    <StatRow label={t('塩分', 'Salt')} value={food.salt} unit="g" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                    {food.tags?.slice(0, 3).map(tag => (
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
    <div className="flex justify-between items-center border-b border-gray-700/50 last:border-0 pb-1">
        <span className="text-gray-500 text-xs sm:text-sm">{label}</span>
        <span className={`font-mono font-bold text-sm sm:text-base ${highlight ? 'text-white' : 'text-gray-400'}`}>
            {value}<span className="text-[10px] text-gray-600 ml-0.5">{unit}</span>
        </span>
    </div>
);
