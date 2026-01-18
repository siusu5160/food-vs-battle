'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShareButtons from './ShareButtons';

const QUESTIONS = [
    {
        id: 1,
        text: "休日の過ごし方は？",
        options: [
            { text: "家でゴロゴロ", value: "high_carb" },
            { text: "アクティブに外出", value: "high_protein" },
            { text: "カフェ巡り", value: "sweet" }
        ]
    },
    {
        id: 2,
        text: "ストレスを感じた時は？",
        options: [
            { text: "とにかく食べる", value: "high_fat" },
            { text: "寝る", value: "balanced" },
            { text: "誰かと話す", value: "vegetable" }
        ]
    },
    {
        id: 3,
        text: "好きな味付けは？",
        options: [
            { text: "こってり濃厚", value: "high_salt" },
            { text: "さっぱり薄味", value: "low_cal" },
            { text: "ピリ辛", value: "spicy" }
        ]
    },
    {
        id: 4,
        text: "理想のデートは？",
        options: [
            { text: "遊園地ではしゃぐ", value: "high_carb" },
            { text: "高級ディナー", value: "high_fat" },
            { text: "映画館でまったり", value: "sweet" }
        ]
    },
    {
        id: 5,
        text: "朝ごはん派？",
        options: [
            { text: "しっかり食べる", value: "balanced" },
            { text: "スムージーのみ", value: "vegetable" },
            { text: "プロテイン", value: "high_protein" }
        ]
    }
];

const RESULTS: Record<string, { title: string, emoji: string, desc: string }> = {
    high_carb: { title: "ラーメン級のエネルギー", emoji: "🍜", desc: "瞬発力は抜群ですが、持久力に欠けるかも？安定したエネルギー補給を心がけて。" },
    high_protein: { title: "ステーキ級のタフネス", emoji: "🥩", desc: "ストイックで筋肉質。周りを引っ張るリーダータイプ！" },
    sweet: { title: "ショートケーキ級の癒やし", emoji: "🍰", desc: "みんなのアイドル的存在。でも甘やかしすぎには注意！" },
    high_fat: { title: "ピザ級のパーティー野郎", emoji: "🍕", desc: "楽しいこと大好き！でも後で胃もたれ（後悔）しないように。" },
    balanced: { title: "定食級の安定感", emoji: "🍱", desc: "バランス感覚が優れています。誰とでもうまくやれる常識人。" },
    vegetable: { title: "サラダ級の意識高さ", emoji: "🥗", desc: "常に自己研鑽を怠らない意識高い系。周りにも良い影響を与えます。" },
    high_salt: { title: "塩辛級の頑固親父", emoji: "🦑", desc: "味（個性）が濃い！一度ハマると抜け出せない魅力があります。" },
    low_cal: { title: "こんにゃく級の柔軟性", emoji: "🍢", desc: "どんな環境にも馴染める柔軟性。ストレス耐性も高めです。" },
    spicy: { title: "麻婆豆腐級の刺激", emoji: "🌶️", desc: "刺激的な人生を求めるチャレンジャー。熱しやすく冷めやすい一面も。" }
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

import { useLanguage } from '@/contexts/LanguageContext';

export const FoodPersonalityDiagnosis: React.FC<Props> = ({ isOpen, onClose }) => {
    const { language, t } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);

    const questions = language === 'en' ? [
        {
            id: 1,
            text: "How do you spend your day off?",
            options: [
                { text: "Chilling at home", value: "high_carb" },
                { text: "Going out actively", value: "high_protein" },
                { text: "Cafe hopping", value: "sweet" }
            ]
        },
        {
            id: 2,
            text: "When you feel stressed?",
            options: [
                { text: "Eat everything", value: "high_fat" },
                { text: "Sleep", value: "balanced" },
                { text: "Talk to someone", value: "vegetable" }
            ]
        },
        {
            id: 3,
            text: "Favorite seasoning?",
            options: [
                { text: "Rich and heavy", value: "high_salt" },
                { text: "Light and refreshing", value: "low_cal" },
                { text: "Spicy", value: "spicy" }
            ]
        },
        {
            id: 4,
            text: "Ideal date?",
            options: [
                { text: "Theme park fun", value: "high_carb" },
                { text: "Luxury dinner", value: "high_fat" },
                { text: "Relaxing at movies", value: "sweet" }
            ]
        },
        {
            id: 5,
            text: "Breakfast style?",
            options: [
                { text: "Big breakfast", value: "balanced" },
                { text: "Smoothie only", value: "vegetable" },
                { text: "Protein shake", value: "high_protein" }
            ]
        }
    ] : QUESTIONS;

    const results = language === 'en' ? {
        high_carb: { title: "Ramen Energy", emoji: "🍜", desc: "Explosive power but maybe low endurance? Keep stable energy." },
        high_protein: { title: "Steak Toughness", emoji: "🥩", desc: "Stoic and muscular. A leader type!" },
        sweet: { title: "Shortcake Healing", emoji: "🍰", desc: "Everyone's idol. But don't spoil yourself too much!" },
        high_fat: { title: "Pizza Party", emoji: "🍕", desc: "Loves fun! But watch out for regret (heartburn) later." },
        balanced: { title: "Set Meal Stability", emoji: "🍱", desc: "Great balance. A common-sense person who gets along with everyone." },
        vegetable: { title: "Salad Consciousness", emoji: "🥗", desc: "High awareness and self-improvement. Good influence on others." },
        high_salt: { title: "Salted Squid Stubbornness", emoji: "🦑", desc: "Strong character! Once hooked, irresistible charm." },
        low_cal: { title: "Konjac Flexibility", emoji: "🍢", desc: "Flexible in any environment. High stress tolerance." },
        spicy: { title: "Mapo Tofu Stimulation", emoji: "🌶️", desc: "Challenger seeking stimulation. Hot-headed but cools down fast." }
    } : RESULTS;

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (step + 1 < questions.length) {
            setStep(step + 1);
        } else {
            const finalType = newAnswers[0];
            const type = Object.keys(results).includes(finalType) ? finalType : 'balanced';
            setResult(type);
        }
    };

    const reset = () => {
        setStep(0);
        setAnswers([]);
        setResult(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-[#111] w-full max-w-lg rounded-2xl border border-[#d4af37] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)]" onClick={e => e.stopPropagation()}>
                <div className="bg-[#d4af37] p-4 flex justify-between items-center text-black">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <span>🔮</span> {t('食材性格診断', 'Food Personality Diagnosis')}
                    </h3>
                    <button onClick={onClose} className="hover:bg-black/10 rounded-full p-1 transition-colors">✕</button>
                </div>

                <div className="p-8">
                    {!result ? (
                        <div className="text-center">
                            <div className="mb-8">
                                <span className="text-[#d4af37] text-sm tracking-widest">QUESTION {step + 1}/{questions.length}</span>
                                <h4 className="text-2xl text-white font-bold mt-2">{questions[step].text}</h4>
                            </div>
                            <div className="space-y-3">
                                {questions[step].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="w-full p-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all border border-gray-700 hover:border-[#d4af37]"
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center animate-fadeIn">
                            <div className="text-6xl mb-4">{results[result].emoji}</div>
                            <div className="text-[#d4af37] font-bold mb-2">{t('あなたを食材に例えると...', 'If you were a food...')}</div>
                            <h3 className="text-3xl font-black text-white mb-6">{results[result].title}</h3>
                            <p className="text-gray-400 leading-relaxed mb-8 bg-gray-900 p-4 rounded-xl">
                                {results[result].desc}
                            </p>
                            <button
                                onClick={reset}
                                className="bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold py-3 px-8 rounded-full transition-all mb-6"
                            >
                                {t('もう一度診断する', 'Diagnose Again')}
                            </button>

                            <div className="border-t border-gray-800 pt-6">
                                <p className="text-gray-500 text-sm mb-2">{t('結果をシェアする', 'Share Result')}</p>
                                <ShareButtons
                                    title={`食の性格診断 | FOOD VS BATTLE`}
                                    url={typeof window !== 'undefined' ? window.location.href : ''}
                                    battleText={`【食の性格診断】\n私は... ${results[result].emoji} ${results[result].title} でした！\n\n${results[result].desc}\n\n#FoodVS診断 #食の性格診断`}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
