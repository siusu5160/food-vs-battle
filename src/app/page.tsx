'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllFoods } from '@/lib/search';
import { FoodSelectorModal } from '@/components/FoodSelectorModal';
import { MenuGacha } from '@/components/MenuGacha';
import { CalorieConfession } from '@/components/CalorieConfession';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import type { FoodItem } from '@/types/FoodItem';

// Hardcoded Popular Battles (Replica of legacy data)
const POPULAR_BATTLES = [
  { a: 'white-rice', b: 'brown-rice', emoji: '🍚', title: '白米 vs 玄米', desc: '永遠のダイエット論争' },
  { a: 'chicken-breast-skinless', b: 'beef-rib', emoji: '🥩', title: '鶏むね vs 牛バラ', desc: '筋肉最強はどっちだ' },
  { a: 'banana', b: 'apple', emoji: '🍎', title: 'バナナ vs リンゴ', desc: '朝食の王座決定戦' },
  { a: 'broccoli', b: 'tomato', emoji: '🥦', title: 'ブロッコリー vs トマト', desc: 'ビタミン最強決定戦' },
  // Replaced frie-chicken/beer with valid IDs (Chicken Thigh vs Highball/Beer alternative or just Rice)
  // Assuming 'chicken-thigh-skin' exists. For 'beer', if not exists, we use 'white-rice' as combo
  { a: 'chicken-thigh-skin', b: 'white-rice', emoji: '🍱', title: '唐揚げ vs 白米', desc: '定食の黄金比' },
  { a: 'ramen-noodle', b: 'udon', emoji: '🍜', title: 'ラーメン vs うどん', desc: '麺類最強決定戦' },
  { a: 'shortcake', b: 'mochi', emoji: '🍰', title: 'ケーキ vs 餅', desc: '洋菓子 vs 和菓子' }, // daifuku -> mochi
  { a: 'potato', b: 'sweet-potato', emoji: '🍟', title: 'ポテト vs さつまいも', desc: '芋対決' }, // chips/fries -> potato/sweet-potato
  { a: 'cabbage', b: 'lettuce', emoji: '🥬', title: 'キャベツ vs レタス', desc: '葉物野菜の違い' },
  { a: 'pork-loin', b: 'pork-belly', emoji: '🐷', title: '豚ロース vs 豚バラ', desc: '豚肉部位対決' }, // tofu -> pork
];

export default function Home() {
  const router = useRouter();
  const [selectedA, setSelectedA] = useState<FoodItem | null>(null);
  const [selectedB, setSelectedB] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectingSide, setSelectingSide] = useState<'A' | 'B'>('A');
  const [isMenuGachaOpen, setIsMenuGachaOpen] = useState(false);
  const [foods, setFoods] = useState<FoodItem[]>([]);

  const [isConfessionOpen, setIsConfessionOpen] = useState(false);

  useEffect(() => {
    const allFoods = getAllFoods();
    setFoods(allFoods);
    // Initialize defaults if available
    if (allFoods.length > 0) setSelectedA(allFoods[0]);
    if (allFoods.length > 1) setSelectedB(allFoods[1]);
  }, []);

  // Derived objects for display
  const selectedFoodA = selectedA;
  const selectedFoodB = selectedB;

  // Pick 4 random battles on mount (Client-side only avoids hydration mismatch)
  const [randomBattles, setRandomBattles] = useState<typeof POPULAR_BATTLES>([]);
  useEffect(() => {
    setRandomBattles([...POPULAR_BATTLES].sort(() => 0.5 - Math.random()).slice(0, 4));
  }, []);

  const handleStartBattle = () => {
    if (selectedA && selectedB) {
      if (selectedA.id === selectedB.id) {
        alert("同じ食品同士は戦えません！");
        return;
      }
      router.push(`/battle/${selectedA.id}/${selectedB.id}`);
    }
  };

  const handleSelectFood = (food: FoodItem) => {
    if (selectingSide === 'A') {
      setSelectedA(food);
      // Auto open side B selector for better UX
      if (!selectedB) {
        setTimeout(() => {
          setSelectingSide('B');
          setIsModalOpen(true);
        }, 300);
      }
    } else {
      setSelectedB(food);
    }
    setIsModalOpen(false);
  };

  const getRandomBattle = () => {
    if (foods.length < 2) return { foodA: 'white-rice', foodB: 'brown-rice' };
    const foodA = foods[Math.floor(Math.random() * foods.length)].id;
    let foodB = foods[Math.floor(Math.random() * foods.length)].id;
    while (foodA === foodB) {
      foodB = foods[Math.floor(Math.random() * foods.length)].id;
    }
    return { foodA, foodB };
  };

  return (
    <div className="container mx-auto text-center pt-8 md:pt-16 pb-20 px-4">
      {/* Top Controls - Moved to Right */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Logo / Title Area */}
      <header className="py-12 md:py-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl mb-8 border border-white/5">
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-black/50 px-3 py-1 rounded-full text-xs text-gray-400 border border-white/10">
            🥩 収録: 2,500件以上
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
            <span className="text-gray-100">FOOD</span> <span className="text-primary text-5xl md:text-7xl">VS</span> <span className="text-gray-100">BATTLE</span>
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-400">
            <span className="block mb-2">カロリー・栄養素 徹底比較エンタメ</span>
          </p>

          {/* Random Battle Button in Header */}
          <button
            onClick={() => {
              const { foodA, foodB } = getRandomBattle();
              router.push(`/battle/${foodA}/${foodB}`);
            }}
            className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1 transition-all inline-flex items-center gap-2"
          >
            <span className="text-xl">🎲</span> ランダム対決
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Main Battle Card */}
        <div className="card battle-selection-card bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-4 sm:p-8 shadow-2xl">
          <div className="flex flex-row items-center justify-center mb-0 sm:mb-2 gap-2 sm:gap-4">

            {/* Fighter A Selector */}
            <div className="flex-1 relative min-w-0">
              <label className="block text-primary font-bold text-xs sm:text-sm text-center mb-2">
                <span>🔴</span> <span className="hidden sm:inline">ファイターA</span>
              </label>
              <button
                onClick={() => {
                  setSelectingSide('A');
                  setIsModalOpen(true);
                }}
                className="w-full bg-gray-800/80 border-2 border-primary/30 hover:border-primary rounded-xl p-2 sm:p-3 flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-lg group text-left overflow-hidden relative"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center relative flex-shrink-0 group-hover:border-white transition-colors">
                  <span className="text-3xl sm:text-4xl">
                    {selectedFoodA?.emoji || '❓'}
                  </span>
                </div>
                <div className="flex-1 min-w-0 z-10">
                  <div className="text-[10px] sm:text-xs text-primary font-bold mb-0.5">CHALLENGER</div>
                  <div className="text-sm sm:text-lg font-bold text-white truncate group-hover:text-primary transition-colors">
                    {selectedFoodA ? selectedFoodA.name : '選択してください'}
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-800 to-transparent"></div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-white group-hover:rotate-180 transition-all duration-300">
                  🔄
                </div>
              </button>
            </div>

            {/* VS Badge */}
            <div className="z-10 shrink-0 transform -rotate-12 mx-0 sm:mx-2">
              <span className="text-3xl sm:text-5xl font-black text-yellow-500 italic drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                VS
              </span>
            </div>

            {/* Fighter B Selector */}
            <div className="flex-1 relative min-w-0">
              <label className="block text-secondary font-bold text-xs sm:text-sm text-center mb-2">
                <span>🔵</span> <span className="hidden sm:inline">ファイターB</span>
              </label>
              <button
                onClick={() => {
                  setSelectingSide('B');
                  setIsModalOpen(true);
                }}
                className="w-full bg-gray-800/80 border-2 border-secondary/30 hover:border-secondary rounded-xl p-2 sm:p-3 flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-lg group text-left overflow-hidden relative"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center relative flex-shrink-0 group-hover:border-white transition-colors">
                  <span className="text-3xl sm:text-4xl">
                    {selectedFoodB?.emoji || '❓'}
                  </span>
                </div>
                <div className="flex-1 min-w-0 z-10">
                  <div className="text-[10px] sm:text-xs text-secondary font-bold mb-0.5">CHALLENGER</div>
                  <div className="text-sm sm:text-lg font-bold text-white truncate group-hover:text-secondary transition-colors">
                    {selectedFoodB ? selectedFoodB.name : '選択してください'}
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-800 to-transparent"></div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-white group-hover:rotate-180 transition-all duration-300">
                  🔄
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto mt-8">
          <button
            onClick={handleStartBattle}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-black font-black text-2xl py-4 rounded-xl shadow-lg hover:shadow-red-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
          >
            <span>BATTLE START!</span> <span className="group-hover:rotate-12 transition-transform">⚔️</span>
          </button>

          {/* Ranking Banner - Prominent! */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push(`/ranking`)}
              className="col-span-2 bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg border border-yellow-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🏆</span>
              <div className="text-left">
                <span className="block text-xs text-yellow-200">全食材を徹底比較</span>
                <span className="text-lg leading-none">ランキングを見る</span>
              </div>
              <span className="ml-auto text-yellow-200">&rarr;</span>
            </button>
          </div>

          <div className="w-full h-px bg-gray-800 my-2"></div>

          {/* Sub Features */}
          <button
            onClick={() => router.push(`/quiz`)}
            className="w-full bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200 font-bold py-3 rounded-full hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all flex flex-col items-center justify-center gap-1"
          >
            <span className="text-sm opacity-80">カロリーが高いのはどっち？</span>
            <span className="flex items-center gap-2 text-white">
              <span className="text-xl">🎮</span> エンドレス・クイズ
            </span>
          </button>

          {/* New Feature Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <button
              onClick={() => router.push(`/personality-quiz`)}
              className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 hover:from-pink-800/50 hover:to-purple-800/50 border border-pink-500/30 text-white font-bold py-3 px-4 rounded-xl transition-all hover:-translate-y-1 flex flex-col items-center gap-1"
            >
              <span className="text-2xl">🔮</span>
              <span className="text-sm">性格診断</span>
            </button>
            <button
              onClick={() => setIsMenuGachaOpen(true)}
              className="bg-gradient-to-r from-green-900/50 to-teal-900/50 hover:from-green-800/50 hover:to-teal-800/50 border border-green-500/30 text-white font-bold py-3 px-4 rounded-xl transition-all hover:-translate-y-1 flex flex-col items-center gap-1"
            >
              <span className="text-2xl">🎰</span>
              <span className="text-sm">メニューガチャ</span>
            </button>
            <button
              onClick={() => setIsConfessionOpen(true)}
              className="bg-gradient-to-r from-red-900/50 to-orange-900/50 hover:from-red-800/50 hover:to-orange-800/50 border border-red-500/30 text-white font-bold py-3 px-4 rounded-xl transition-all hover:-translate-y-1 flex flex-col items-center gap-1"
            >
              <span className="text-2xl">😇</span>
              <span className="text-sm">カロリー懺悔</span>
            </button>
          </div>
        </div>

        <FoodSelectorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelectFood}
          currentSelectedId={selectingSide === 'A' ? selectedA?.id : selectedB?.id}
          opponentFood={selectingSide === 'A' ? selectedB : selectedA}
          selectingSide={selectingSide}
        />

        {/* Feature Introduction Section */}
        <section className="mt-20 border-t border-gray-800 pt-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-100">
            <span className="text-primary">FOOD VS BATTLE</span> の機能紹介
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚔️ カロリー・栄養素バトル</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                好きな食材やメニューを2つ選ぶだけで、カロリー・脂質・タンパク質などを徹底比較！勝敗はあなたの価値観次第。
              </p>
            </div>
            <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">🏆 全食材ランキング</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                収録されている2,500件以上のデータから、「最強の筋肉飯」「最低カロリーな外食」などをランキング形式でチェック。
              </p>
            </div>
            <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">🎮 エンドレス・クイズ</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                「どっちがハイカロリー？」瞬時の判断力が試されるクイズモード。楽しみながらカロリー感覚を養えます。
              </p>
            </div>
            <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">😇 カロリー懺悔室</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                つい食べすぎてしまった...そんな時はここで懺悔。食べた分のカロリーを消費するために必要な運動時間を計算します。
              </p>
            </div>
          </div>
        </section>

        {/* Popular Battles Grid */}
        <section className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🔥</span>
            <h3 className="text-xl font-bold border-l-4 border-orange-500 pl-3">人気の対決カード</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {randomBattles.map((battle, i) => (
              <button
                key={i}
                onClick={() => router.push(`/battle/${battle.a}/${battle.b}`)}
                className="bg-gray-800/50 hover:bg-gray-700 p-4 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all hover:-translate-y-1 flex items-center gap-3 text-left w-full group"
              >
                <span className="text-3xl bg-black/30 p-2 rounded-lg group-hover:scale-110 transition-transform">{battle.emoji}</span>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-200 truncate group-hover:text-orange-400 transition-colors">{battle.title}</h4>
                  <p className="text-xs text-gray-500 truncate">{battle.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Data Count */}
        <section className="mt-16 mb-8 text-center text-sm text-gray-500 border-t border-gray-800 pt-8">
          <p className="mb-4">現在 {foods.length} 種類の食材・外食メニューを比較可能です。</p>
          <div className="flex justify-center gap-4">
            <a href="/privacy" className="hover:text-white underline">プライバシーポリシー</a>
          </div>
          <p className="mt-4 text-xs opacity-50">&copy; 2024 FOOD VS BATTLE</p>
        </section>

      </main>

      {/* Modals */}
      <MenuGacha
        isOpen={isMenuGachaOpen}
        onClose={() => setIsMenuGachaOpen(false)}
      />
      <CalorieConfession
        isOpen={isConfessionOpen}
        onClose={() => setIsConfessionOpen(false)}
      />
    </div>
  );
}
