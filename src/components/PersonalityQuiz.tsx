'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions, diagnosePersonality, type Answer, type PersonalityResult } from '@/lib/quizLogic';
import Link from 'next/link';

export const PersonalityQuiz: React.FC = () => {
    const [started, setStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [result, setResult] = useState<PersonalityResult | null>(null);

    const handleAnswer = (answer: Answer) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);

        if (currentStep < quizQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Finish
            const diagnosis = diagnosePersonality(newAnswers);
            setResult(diagnosis);
        }
    };

    const resetQuiz = () => {
        setStarted(false);
        setCurrentStep(0);
        setAnswers([]);
        setResult(null);
    };

    // Intro Screen
    if (!started) {
        return (
            <div className="w-full max-w-2xl mx-auto p-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/80 rounded-3xl p-10 border border-gray-700 shadow-2xl backdrop-blur-md"
                >
                    <div className="text-8xl mb-6">🔮</div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
                        食材性格診断
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        もしあなたが食べ物だったら...？<br />
                        簡単な質問に答えて、あなたの「食材タイプ」を診断しましょう！
                    </p>
                    <button
                        onClick={() => setStarted(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-4 px-12 rounded-full shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all text-xl"
                    >
                        診断スタート
                    </button>
                    <div className="mt-8 text-gray-500 text-sm">
                        所要時間: 約1分 | 全5問
                    </div>
                </motion.div>
            </div>
        );
    }

    // Result Screen
    if (result) {
        return (
            <div className="w-full max-w-3xl mx-auto p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-900 rounded-3xl overflow-hidden border-2 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.3)]"
                >
                    <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-8 text-center border-b border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                        <h2 className="text-purple-300 font-bold tracking-[0.2em] mb-2 uppercase relative z-10">Diagnosis Result</h2>
                        <div className="text-4xl md:text-5xl font-black text-white relative z-10">あなたは...</div>
                    </div>

                    <div className="p-8 md:p-12 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                            className="bg-gray-800 w-48 h-48 mx-auto rounded-full flex items-center justify-center border-4 border-purple-500/30 shadow-2xl mb-8"
                        >
                            <span className="text-9xl filter drop-shadow-xl">{result.food.emoji}</span>
                        </motion.div>

                        <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
                            『{result.food.name}』タイプ
                        </h3>
                        <div className="inline-block bg-purple-500/20 text-purple-300 px-4 py-1 rounded-full text-sm font-bold mb-8 border border-purple-500/30">
                            {result.type}
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-purple-500 text-left max-w-xl mx-auto mb-10">
                            <p className="text-lg text-gray-200 leading-relaxed">
                                {result.description}
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/10 flex gap-4 text-sm text-gray-500">
                                <div>
                                    <span className="block text-xs uppercase text-gray-600">Calories</span>
                                    <span className="text-white font-mono">{result.food.calories}</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase text-gray-600">Protein</span>
                                    <span className="text-white font-mono">{result.food.protein}g</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={resetQuiz}
                                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-colors"
                            >
                                🔄 もう一度診断する
                            </button>
                            <Link href={`/battle/${result.food.id}/random`} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1">
                                ⚔️ この食材でバトルする
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Question Screen
    const question = quizQuestions[currentStep];

    return (
        <div className="w-full max-w-2xl mx-auto p-4 min-h-[60vh] flex flex-col justify-center">
            <div className="mb-8 relative pt-2">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep) / quizQuestions.length) * 100}%` }}
                        className="h-full bg-purple-500"
                    />
                </div>
                <div className="text-right text-gray-500 text-sm mt-2">
                    Question {currentStep + 1} / {quizQuestions.length}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-center leading-relaxed">
                        {question.question}
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={() => handleAnswer('A')}
                            className="p-6 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-purple-500 rounded-2xl transition-all text-left group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center font-bold text-gray-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">A</div>
                                <span className="text-lg md:text-xl font-bold text-gray-300 group-hover:text-white">{question.optionA}</span>
                            </div>
                        </button>
                        <button
                            onClick={() => handleAnswer('B')}
                            className="p-6 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-pink-500 rounded-2xl transition-all text-left group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center font-bold text-gray-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">B</div>
                                <span className="text-lg md:text-xl font-bold text-gray-300 group-hover:text-white">{question.optionB}</span>
                            </div>
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
