'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export const FoodPersonalityDiagnosis: React.FC<Props> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (step + 1 < QUESTIONS.length) {
            setStep(step + 1);
        } else {
            // Simple logic: determine most frequent or last choice as dominant
            // For simplicity, using the first choice as primary trait, modified by others
            const finalType = newAnswers[0];
            // Better logic could be voted count, but this is simple "Diagnosis"
            const type = Object.keys(RESULTS).includes(finalType) ? finalType : 'balanced';
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
                        <span>🔮</span> 食材性格診断
                    </h3>
                    <button onClick={onClose} className="hover:bg-black/10 rounded-full p-1 transition-colors">✕</button>
                </div>

                <div className="p-8">
                    {!result ? (
                        <div className="text-center">
                            <div className="mb-8">
                                <span className="text-[#d4af37] text-sm tracking-widest">QUESTION {step + 1}/{QUESTIONS.length}</span>
                                <h4 className="text-2xl text-white font-bold mt-2">{QUESTIONS[step].text}</h4>
                            </div>
                            <div className="space-y-3">
                                {QUESTIONS[step].options.map((opt, i) => (
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
                            <div className="text-6xl mb-4">{RESULTS[result].emoji}</div>
                            <div className="text-[#d4af37] font-bold mb-2">あなたを食材に例えると...</div>
                            <h3 className="text-3xl font-black text-white mb-6">{RESULTS[result].title}</h3>
                            <p className="text-gray-400 leading-relaxed mb-8 bg-gray-900 p-4 rounded-xl">
                                {RESULTS[result].desc}
                            </p>
                            <button
                                onClick={reset}
                                className="bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold py-3 px-8 rounded-full transition-all"
                            >
                                もう一度診断する
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
