'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { getAllFoods } from '@/lib/search';

export function DailyChallenge() {
    // 日付ベースでシード値を生成（毎日同じ対決になる）
    const dailyBattle = useMemo(() => {
        const today = new Date();
        const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        // 日付文字列からシード値を生成
        let seed = 0;
        for (let i = 0; i < dateString.length; i++) {
            seed = ((seed << 5) - seed) + dateString.charCodeAt(i);
            seed = seed & seed;
        }

        // シード値を使って決定的にランダムな食品を選択
        const foods = getAllFoods();
        const random1 = Math.abs(seed) % foods.length;
        const random2 = Math.abs(seed * 7 + 13) % foods.length;

        // 異なる食品を確保
        const foodA = foods[random1];
        const foodB = foods[random2 !== random1 ? random2 : (random2 + 1) % foods.length];

        return { foodA, foodB };
    }, []);

    if (!dailyBattle.foodA || !dailyBattle.foodB) {
        return null;
    }

    return (
        <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-orange-900/40 border-2 border-purple-500/30 p-8 shadow-2xl">
                {/* 背景アニメーション */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

                <div className="relative z-10">
                    {/* ヘッダー */}
                    <div className="text-center mb-6">
                        <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-4 py-2 rounded-full text-sm mb-3 animate-pulse">
                            🔥 TODAY'S CHALLENGE
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                            今日の対決
                        </h2>
                        <p className="text-gray-300 text-sm">
                            毎日変わる対決！あなたの予想は？
                        </p>
                    </div>

                    {/* バトルカード */}
                    <Link
                        href={`/battle/${dailyBattle.foodA.id}/${dailyBattle.foodB.id}`}
                        className="block group"
                    >
                        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
                            <div className="flex items-center justify-between gap-4">
                                {/* Fighter A */}
                                <div className="flex-1 text-center">
                                    <div className="text-6xl md:text-7xl mb-3 transform group-hover:scale-110 transition-transform">
                                        {dailyBattle.foodA.emoji}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                        {dailyBattle.foodA.name}
                                    </h3>
                                    <div className="text-3xl font-black text-yellow-400">
                                        {dailyBattle.foodA.calories}
                                        <span className="text-sm text-gray-400 ml-1">kcal</span>
                                    </div>
                                </div>

                                {/* VS */}
                                <div className="flex-shrink-0">
                                    <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 animate-pulse">
                                        VS
                                    </div>
                                </div>

                                {/* Fighter B */}
                                <div className="flex-1 text-center">
                                    <div className="text-6xl md:text-7xl mb-3 transform group-hover:scale-110 transition-transform">
                                        {dailyBattle.foodB.emoji}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                        {dailyBattle.foodB.name}
                                    </h3>
                                    <div className="text-3xl font-black text-yellow-400">
                                        {dailyBattle.foodB.calories}
                                        <span className="text-sm text-gray-400 ml-1">kcal</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-6 text-center">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-6 py-3 rounded-xl group-hover:from-purple-500 group-hover:to-pink-500 transition-all shadow-lg">
                                    <span>{t('対決結果を見る', 'See Battle Result')}</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* シェア促進 */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-400">
                            {t('💡 友達と予想を共有して盛り上がろう！', '💡 Share your prediction with friends!')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
