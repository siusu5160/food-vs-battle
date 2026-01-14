'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllFoods } from '@/lib/search';
import type { FoodItem } from '@/types/FoodItem';

// --- Audio Utilities (Retro SE) ---
const playSound = (type: 'correct' | 'incorrect' | 'click') => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'correct') {
            // High pitch ding: C6 -> E6
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1046.5, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1318.5, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'incorrect') {
            // Low buzz: Sawtooth
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else {
            // Click: Short blip
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        }
    } catch (e) {
        console.error('Audio play failed', e);
    }
};

export const EndlessQuiz: React.FC = () => {
    const [currentPair, setCurrentPair] = useState<[FoodItem, FoodItem] | null>(null);
    const [status, setStatus] = useState<'waiting' | 'correct' | 'incorrect'>('waiting');
    const [streak, setStreak] = useState(0);

    // Pick 2 random unique foods
    const generatePair = () => {
        const foods = getAllFoods();
        if (foods.length < 2) return;
        // Simple random pick
        const idx1 = Math.floor(Math.random() * foods.length);
        let idx2 = Math.floor(Math.random() * foods.length);
        while (idx1 === idx2) {
            idx2 = Math.floor(Math.random() * foods.length);
        }
        setCurrentPair([foods[idx1], foods[idx2]]);
        setStatus('waiting');
    };

    useEffect(() => {
        generatePair();
    }, []);

    const handleGuess = (selected: FoodItem) => {
        if (status !== 'waiting' || !currentPair) return;

        const [foodA, foodB] = currentPair;
        // Logic: Calorie High is Winner
        const correct = selected.calories >= (selected.id === foodA.id ? foodB.calories : foodA.calories);

        if (correct) {
            playSound('correct');
            setStatus('correct');
            setStreak(prev => prev + 1);
        } else {
            playSound('incorrect');
            setStatus('incorrect');
            setStreak(0);
        }

        setTimeout(() => {
            generatePair();
        }, 1500);
    };

    if (!currentPair) return <div className="p-8 text-center text-white">Loading...</div>;
    const [optionA, optionB] = currentPair;

    // Share URL
    const shareText = `【食品VSバトル】クイズで${streak}連勝中！🔥 どっちがカロリー高いか分かる？ #食品VSバトル`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent('https://food-vs-battle-next.vercel.app/')}`;

    return (
        <div className="container mx-auto px-4" style={{ paddingBottom: '4rem', maxWidth: '600px' }}>
            <header className="flex items-center justify-between p-4 mb-4">
                <Link href="/" onClick={() => playSound('click')} className="font-bold text-yellow-500 hover:text-yellow-400 transition-colors">&larr; Home</Link>
                <div className="flex items-center gap-2">
                    <div className="text-xl font-bold bg-gray-800 text-white px-4 py-2 rounded-full border border-yellow-500">
                        🔥 {streak} 連勝中
                    </div>
                    {streak > 0 && (
                        <a
                            href={shareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-bold transition-all"
                            onClick={() => playSound('click')}
                        >
                            Xで自慢
                        </a>
                    )}
                </div>
            </header>

            <div className="text-center">
                <h2 className="text-2xl font-black mb-8 text-white">カロリーが高いのはどっち！？</h2>

                <div className="flex flex-col gap-4">
                    {/* Option A */}
                    <button
                        onClick={() => handleGuess(optionA)}
                        className={`
                            card p-0 overflow-hidden transition-all transform hover:scale-[1.02] active:scale-95 rounded-2xl border-4
                            ${status !== 'waiting' && optionA.calories >= optionB.calories ? 'border-green-500' : 'border-transparent'}
                            ${status === 'incorrect' && optionA.calories < optionB.calories ? 'opacity-50 grayscale' : ''}
                        `}
                        style={{ background: '#1f2937', width: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ width: '100%', height: '150px', background: '#374151', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '6rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>{optionA.emoji}</span>
                        </div>
                        <div className="p-4 flex flex-col items-center justify-center flex-1 w-full text-white">
                            <span className="text-xl font-bold">{optionA.name}</span>
                            {status !== 'waiting' && (
                                <div className="mt-2 text-3xl font-black text-yellow-500 animate-pulse">
                                    {optionA.calories} kcal
                                </div>
                            )}
                        </div>
                    </button>

                    <div className="text-3xl font-black opacity-50 my-2 text-white">VS</div>

                    {/* Option B */}
                    <button
                        onClick={() => handleGuess(optionB)}
                        className={`
                            card p-0 overflow-hidden transition-all transform hover:scale-[1.02] active:scale-95 rounded-2xl border-4
                            ${status !== 'waiting' && optionB.calories >= optionA.calories ? 'border-green-500' : 'border-transparent'}
                            ${status === 'incorrect' && optionB.calories < optionA.calories ? 'opacity-50 grayscale' : ''}
                        `}
                        style={{ background: '#1f2937', width: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ width: '100%', height: '150px', background: '#374151', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '6rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>{optionB.emoji}</span>
                        </div>
                        <div className="p-4 flex flex-col items-center justify-center flex-1 w-full text-white">
                            <span className="text-xl font-bold">{optionB.name}</span>
                            {status !== 'waiting' && (
                                <div className="mt-2 text-3xl font-black text-yellow-500 animate-pulse">
                                    {optionB.calories} kcal
                                </div>
                            )}
                        </div>
                    </button>
                </div>

                {/* Feedback Overlay */}
                {status === 'correct' && (
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 bg-black/50">
                        <h1 className="text-6xl font-black text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.8)] animate-bounce">正解！⭕</h1>
                    </div>
                )}
                {status === 'incorrect' && (
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 bg-black/50">
                        <h1 className="text-6xl font-black text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-pulse">残念...❌</h1>
                    </div>
                )}

            </div>
        </div>
    );
};
