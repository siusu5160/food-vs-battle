'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllFoods } from '@/lib/search';
import { FoodSelectorModal } from '@/components/FoodSelectorModal';
import { MenuGacha } from '@/components/MenuGacha';
import { CalorieConfession } from '@/components/CalorieConfession';
import { FoodPersonalityDiagnosis } from '@/components/FoodPersonalityDiagnosis';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import type { FoodItem } from '@/types/FoodItem';

// Hardcoded Popular Battles (Fixed with valid IDs)
const POPULAR_BATTLES = [
  { a: 'beef-rib', b: 'beef-filet', emoji: '🥩', title: '牛バラ vs 牛ヒレ', desc: '脂質と赤身の戦い' },
  { a: 'chicken-tender', b: 'chicken-thigh-skin', emoji: '🍗', title: 'ささみ vs 鶏もも', desc: 'ヘルシー vs ジューシー' },
  { a: 'sushi-maguro', b: 'sushi-salmon', emoji: '🍣', title: 'マグロ vs サーモン', desc: '寿司ネタ人気対決' },
  { a: 'cheeseburger', b: 'pizza-slice', emoji: '🍔', title: 'バーガー vs ピザ', desc: 'アメリカンジャンク対決' },
  { a: 'gyudon', b: 'katsudon', emoji: '🥣', title: '牛丼 vs カツ丼', desc: '丼もの頂上決戦' },
  { a: 'ice-cream-vanilla', b: 'chocolate-bar', emoji: '🍦', title: 'アイス vs チョコ', desc: '甘味対決' },
];

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedA, setSelectedA] = useState<FoodItem | null>(null);
  const [selectedB, setSelectedB] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfessionOpen, setIsConfessionOpen] = useState(false);
  const [isGachaOpen, setIsGachaOpen] = useState(false);
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
  const [activeSide, setActiveSide] = useState<'A' | 'B'>('A');
  const [mounted, setMounted] = useState(false);
  const [foods, setFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    setMounted(true);
    setFoods(getAllFoods());
  }, []);

  const handleBattleStart = () => {
    if (selectedA && selectedB) {
      router.push(`/battle/${selectedA.id}/${selectedB.id}`);
    }
  };

  const getRandomBattle = () => {
    if (foods.length < 2) return;
    const a = foods[Math.floor(Math.random() * foods.length)];
    let b = foods[Math.floor(Math.random() * foods.length)];
    while (a.id === b.id) {
      b = foods[Math.floor(Math.random() * foods.length)];
    }
    router.push(`/battle/${encodeURIComponent(a.id)}/${encodeURIComponent(b.id)}`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-serif selection:bg-[#d4af37] selection:text-black">
      {/* Background Texture */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#333]">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b4941f] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <span className="text-xl">⚔️</span>
            </div>
            <h1 className="text-2xl font-bold tracking-widest text-[#d4af37] font-serif">
              FOOD VS BATTLE
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm tracking-widest text-gray-400">
              <a href="#popular" className="hover:text-[#d4af37] transition-colors">POPULAR</a>
              <a href="/ranking" className="hover:text-[#d4af37] transition-colors">RANKING</a>
            </nav>
            {/* Language Switcher Removed as per 'Basic Japanese' request */}
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-20 container mx-auto px-4">

        {/* Hero Section */}
        <section className="text-center mb-24 relative">
          {/* Decorative lines */}
          <div className="absolute top-1/2 left-0 w-1/4 h-[1px] bg-gradient-to-r from-transparent to-[#333]"></div>
          <div className="absolute top-1/2 right-0 w-1/4 h-[1px] bg-gradient-to-l from-transparent to-[#333]"></div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-tight">
            <span className="block text-[#d4af37] text-2xl md:text-3xl mb-4 tracking-[0.2em] font-light">究極の美食対決</span>
            Choose Your<br />Champion
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-sans">
            カロリー、栄養素、塩分...。<br />
            あなたの健康を左右する「食」の選択。<br />
            データを武器に、最強の一皿を決めろ。
          </p>

          {/* Battle Arena (Selector) */}
          <div className="max-w-4xl mx-auto bg-[#111] border border-[#333] p-8 md:p-12 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            {/* Gold Frame Effect */}
            <div className="absolute inset-0 border border-[#d4af37] opacity-20 pointer-events-none m-2"></div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10">
              {/* Left Fighter */}
              <button
                onClick={() => { setActiveSide('A'); setIsModalOpen(true); }}
                className={`w-full md:w-64 h-64 border border-[#333] hover:border-[#d4af37] transition-all duration-500 bg-[#0a0a0a] flex flex-col items-center justify-center group/card relative overflow-hidden ${selectedA ? 'border-[#d4af37]/50' : ''}`}
              >
                {selectedA ? (
                  <>
                    <span className="text-8xl mb-4 group-hover/card:scale-110 transition-transform duration-500">{selectedA.emoji}</span>
                    <span className="text-lg font-bold text-gray-200 font-sans">{t(selectedA.name, selectedA.nameEn)}</span>
                  </>
                ) : (
                  <span className="text-gray-600 text-sm tracking-widest group-hover/card:text-[#d4af37] transition-colors">SELECT FIGHTER 1</span>
                )}
              </button>

              <div className="text-4xl text-[#d4af37] font-serif italic">VS</div>

              {/* Right Fighter */}
              <button
                onClick={() => { setActiveSide('B'); setIsModalOpen(true); }}
                className={`w-full md:w-64 h-64 border border-[#333] hover:border-[#d4af37] transition-all duration-500 bg-[#0a0a0a] flex flex-col items-center justify-center group/card relative overflow-hidden ${selectedB ? 'border-[#d4af37]/50' : ''}`}
              >
                {selectedB ? (
                  <>
                    <span className="text-8xl mb-4 group-hover/card:scale-110 transition-transform duration-500">{selectedB.emoji}</span>
                    <span className="text-lg font-bold text-gray-200 font-sans">{t(selectedB.name, selectedB.nameEn)}</span>
                  </>
                ) : (
                  <span className="text-gray-600 text-sm tracking-widest group-hover/card:text-[#d4af37] transition-colors">SELECT FIGHTER 2</span>
                )}
              </button>
            </div>

            {/* Primary Actions */}
            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                disabled={!selectedA || !selectedB}
                onClick={handleBattleStart}
                className="px-12 py-4 bg-[#d4af37] text-black font-bold tracking-widest hover:bg-[#ffe066] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)] w-full md:w-auto"
              >
                BATTLE START
              </button>
              <span className="text-[#333] hidden md:inline">- OR -</span>
              <button
                onClick={getRandomBattle}
                className="px-8 py-4 border border-[#333] text-gray-400 hover:text-white hover:border-white transition-colors w-full md:w-auto text-sm tracking-widest"
              >
                RANDOM MATCH
              </button>
            </div>
          </div>
        </section>

        {/* Feature Section (Ranking + Confession) */}
        <section className="mb-24 px-4 bg-[#0e0e0e] py-12 border-y border-[#222]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Ranking */}
            <div className="p-8 border-l border-[#d4af37]/30 hover:bg-[#111] transition-colors cursor-pointer group" onClick={() => router.push('/ranking')}>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-xl text-[#d4af37] mb-4 font-serif">FOOD RANKING</h3>
              <p className="text-gray-400 text-sm mb-6 font-sans">カロリー、タンパク質、脂質...。<br />あらゆる数値で食材を格付け。</p>
              <span className="text-white border-b border-[#d4af37] padding-b-1 text-sm">VIEW RANKING →</span>
            </div>

            {/* Menu Gacha */}
            <div className="p-8 border-l border-[#d4af37]/30 hover:bg-[#111] transition-colors cursor-pointer group" onClick={() => setIsGachaOpen(true)}>
              <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform">🎲</div>
              <h3 className="text-xl text-[#d4af37] mb-4 font-serif">MENU GACHA</h3>
              <p className="text-gray-400 text-sm mb-6 font-sans">今日の食事に迷ったら。<br />運命の一皿を提案します。</p>
              <span className="text-white border-b border-[#d4af37] padding-b-1 text-sm">GACHA START →</span>
            </div>

            {/* Confession */}
            <div className="p-8 border-l border-[#d4af37]/30 hover:bg-[#111] transition-colors cursor-pointer group" onClick={() => setIsConfessionOpen(true)}>
              <div className="text-4xl mb-4 group-hover:translate-y-1 transition-transform">😇</div>
              <h3 className="text-xl text-[#d4af37] mb-4 font-serif">カロリー懺悔室</h3>
              <p className="text-gray-400 text-sm mb-6 font-sans">食べ過ぎてしまったあなたへ。<br />その罪、ここで清算しませんか？</p>
              <span className="text-white border-b border-[#d4af37] padding-b-1 text-sm">懺悔する →</span>
            </div>

            {/* Personality Diagnosis (New) */}
            <div className="p-8 border-l border-[#d4af37]/30 hover:bg-[#111] transition-colors cursor-pointer group" onClick={() => setIsDiagnosisOpen(true)}>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔮</div>
              <h3 className="text-xl text-[#d4af37] mb-4 font-serif">診断</h3>
              <p className="text-gray-400 text-sm mb-6 font-sans">あなたを食材に例えると？<br />性格からぴったりの食材を診断。</p>
              <span className="text-white border-b border-[#d4af37] padding-b-1 text-sm">診断する →</span>
            </div>
          </div>
        </section>

        {/* Popular Battles */}
        <section id="popular" className="mb-24">
          <h3 className="text-center text-2xl font-serif text-white mb-12 tracking-widest">
            <span className="border-b-2 border-[#d4af37] pb-2">SPECTATOR FAVORITES</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_BATTLES.map((battle, i) => (
              <a
                key={i}
                href={`/battle/${battle.a}/${battle.b}`}
                className="block bg-[#111] p-6 border border-[#222] hover:border-[#d4af37]/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{battle.emoji}</div>
                  <div className="text-[#333] group-hover:text-[#d4af37] transition-colors">↗</div>
                </div>
                <h4 className="text-lg font-bold text-gray-200 group-hover:text-white mb-2 font-serif">{battle.title}</h4>
                <p className="text-xs text-gray-500 font-sans">{battle.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <CalorieConfession isOpen={isConfessionOpen} onClose={() => setIsConfessionOpen(false)} />
        <MenuGacha isOpen={isGachaOpen} onClose={() => setIsGachaOpen(false)} />
        <FoodPersonalityDiagnosis isOpen={isDiagnosisOpen} onClose={() => setIsDiagnosisOpen(false)} />

      </main>

      <FoodSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(food) => {
          if (activeSide === 'A') setSelectedA(food);
          else setSelectedB(food);
          setIsModalOpen(false);
        }}
        foods={foods}
        opponentFood={activeSide === 'A' ? selectedB : selectedA}
      />
    </div>
  );
}
