import { getAllFoods } from '@/lib/search';
import type { FoodItem } from '@/types/FoodItem';

export interface QuizQuestion {
    id: number;
    question: string;
    optionA: string;
    optionB: string;
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: '休日の過ごし方は？',
        optionA: 'インドア派（家でゆっくり）',
        optionB: 'アウトドア派（外で活動）',
    },
    {
        id: 2,
        question: '好きな季節は？',
        optionA: '春・秋（穏やかな気候）',
        optionB: '夏・冬（極端な気候）',
    },
    {
        id: 3,
        question: '食事のスタイルは？',
        optionA: '少量でも満足',
        optionB: 'たくさん食べたい',
    },
    {
        id: 4,
        question: '運動に対する考え方は？',
        optionA: '健康のために少しだけ',
        optionB: '限界まで追い込みたい',
    },
    {
        id: 5,
        question: '新しいことへの挑戦は？',
        optionA: '慎重に計画してから',
        optionB: 'とりあえずやってみる',
    },
];

export type Answer = 'A' | 'B';

export interface PersonalityResult {
    food: FoodItem;
    type: string;
    description: string;
}

export function diagnosePersonality(answers: Answer[]): PersonalityResult {
    const allFoods = getAllFoods();

    // Count 'A's
    const aCount = answers.filter(a => a === 'A').length;
    const lastAnswer = answers[answers.length - 1];

    // Dynamic selection helpers
    const getHighProtein = () => allFoods.filter(f => f.protein >= 20).sort((a, b) => b.protein - a.protein)[0];
    const getHighCarb = () => allFoods.filter(f => f.carbs >= 40).sort((a, b) => b.carbs - a.carbs)[0];
    const getHighFat = () => allFoods.filter(f => f.fat >= 20).sort((a, b) => b.fat - a.fat)[0];
    const getLowCalorie = () => allFoods.filter(f => f.calories > 0 && f.calories <= 50).sort((a, b) => a.calories - b.calories)[0];
    const getBalanced = () => allFoods.find(f => f.name.includes('卵') || f.name.includes('Egg')) || allFoods[0];
    const getActive = () => allFoods.find(f => f.name.includes('唐揚') || f.tags.includes('#Fried')) || allFoods[10];
    const getPassion = () => allFoods.find(f => f.name.includes('チョコ') || f.tags.includes('#Sweet')) || allFoods[20];
    const getUnique = () => allFoods.find(f => f.name.includes('アボカド') || f.tags.includes('#Vegetable')) || allFoods[30];

    // Determine type key
    let typeKey = 'AAB';
    if (aCount >= 4) typeKey = lastAnswer === 'A' ? 'AAA' : 'AAB';
    else if (aCount === 3) typeKey = lastAnswer === 'A' ? 'ABA' : 'BAA';
    else if (aCount === 2) typeKey = lastAnswer === 'A' ? 'BAB' : 'ABB';
    else typeKey = lastAnswer === 'A' ? 'BBA' : 'BBB';

    const patternMap: Record<string, () => PersonalityResult> = {
        'AAA': () => ({
            food: getLowCalorie(),
            type: 'ヘルシータイプ',
            description: '非常に堅実で、自己管理の鬼。あなたの人生に無駄はありません。',
        }),
        'AAB': () => ({
            food: getBalanced(),
            type: 'オールラウンダー',
            description: 'バランス感覚が抜群。どんな環境でも最適な答えを導き出せます。',
        }),
        'BAA': () => ({
            food: getHighCarb(),
            type: '愛されキャラタイプ',
            description: 'エネルギーに満ち溢れ、周りを明るくする太陽のような存在です。',
        }),
        'ABA': () => ({
            food: getHighProtein(),
            type: 'ストイックタイプ',
            description: '目標達成のためなら苦労も厭わない。プロフェッショナルな精神の持ち主。',
        }),
        'ABB': () => ({
            food: getHighFat(),
            type: 'リッチタイプ',
            description: '人生の楽しみ方を知っている美食家。余裕のある大人の魅力があります。',
        }),
        'BAB': () => ({
            food: getUnique(),
            type: 'ユニークタイプ',
            description: '独自の視点を持つクリエイター。常識にとらわれない発想が武器です。',
        }),
        'BBA': () => ({
            food: getActive(),
            type: 'アクティブタイプ',
            description: '考えるより先に行動するチャレンジャー。失敗を恐れない強さがあります。',
        }),
        'BBB': () => ({
            food: getPassion(),
            type: 'パッショネイトタイプ',
            description: '情熱の塊。好きなことにはとことんのめり込む、熱いハートの持ち主。',
        }),
    };

    const resolver = patternMap[typeKey] || patternMap['AAB'];
    return resolver();
}
