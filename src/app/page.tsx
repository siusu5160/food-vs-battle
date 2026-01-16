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
import PopularBattles from '@/components/PopularBattles';
import type { FoodItem } from '@/types/FoodItem';

import { POPULAR_BATTLES } from '@/lib/constants';

// Rebuild timestamp: 2026-01-14-1600
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
    const allFoods = getAllFoods();
    setFoods(allFoods);
    // Store in sessionStorage for random match button
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('allFoods', JSON.stringify(allFoods));
    }
  }, []);

  const handleBattleStart = () => {
    if (selectedA && selectedB) {
      router.push(`/battle/${selectedA.id}/${selectedB.id}`);
    }
  };

  const getRandomBattle = () => {
    try {
      if (!mounted || !foods || foods.length < 2) {
        console.error('Random Battle - Invalid state:', { mounted, foodsLength: foods?.length });
        return;
      }

      const maxRetries = 10;
      let a = foods[Math.floor(Math.random() * foods.length)];
      let b = foods[Math.floor(Math.random() * foods.length)];
      let retries = 0;

      // IDが存在し、かつ異なるアイテムになるまでリトライ（無限ループ防止付き）
      while ((!a?.id || !b?.id || a.id === b.id) && retries < maxRetries) {
        a = foods[Math.floor(Math.random() * foods.length)];
        b = foods[Math.floor(Math.random() * foods.length)];
        retries++;
      }

      // 最終チェックして遷移
      if (a?.id && b?.id && a.id !== b.id) {
        console.log('Random Battle - Navigating to:', { idA: a.id, idB: b.id });
        router.push(`/battle/${encodeURIComponent(a.id)}/${encodeURIComponent(b.id)}`);
      } else {
        console.error('Random Battle - Failed to find valid pair after retries');
      }
    } catch (error) {
      console.error('Random Battle Error:', error);
    }
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
            <span className="block text-[#d4af37] text-2xl md:text-3xl mb-4 tracking-[0.2em] font-light">
              {t('究極の美食対決', 'The Ultimate Food Battle')}
            </span>
            Choose Your<br />Champion
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
            {t('カロリー、栄養素、塩分...。', 'Calories, Nutrients, Salt...')}<br />
            {t('あなたの健康を左右する「食」の選択。', 'Food choices that define your health.')}<br />
            {t('データを武器に、最強の一皿を決めろ。', 'Use data as your weapon to decide the champion.')}
          </p>

          {/* サイトの特徴 */}
          <div className="max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#111]/50 border border-[#333] p-4 rounded-lg">
              <div className="text-2xl mb-2">⚔️</div>
              <h3 className="text-sm font-bold text-[#d4af37] mb-1">{t('栄養素バトル', 'Nutrient Battle')}</h3>
              <p className="text-xs text-gray-500">{t('2つの食品を比較して栄養素の違いを視覚化', 'Visualize nutrient differences between two foods')}</p>
            </div>
            <div className="bg-[#111]/50 border border-[#333] p-4 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="text-sm font-bold text-[#d4af37] mb-1">{t('ランキング', 'Ranking')}</h3>
              <p className="text-xs text-gray-500">{t('カロリー・タンパク質・ダイエット向けで格付け', 'Rankings by calories, protein, and diet suitability')}</p>
            </div>
            <div className="bg-[#111]/50 border border-[#333] p-4 rounded-lg">
              <div className="text-2xl mb-2">🎲</div>
              <h3 className="text-sm font-bold text-[#d4af37] mb-1">{t('AIメニュー提案', 'AI Menu Suggestion')}</h3>
              <p className="text-xs text-gray-500">{t('最適なバランスの食事メニューを自動生成', 'Automatically generate balanced meal plans')}</p>
            </div>
          </div>

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
                    <div className="text-6xl mb-4 group-hover/card:scale-110 transition-transform">{selectedA.emoji}</div>
                    <div className="font-bold text-xl text-white">{t(selectedA.name, selectedA.nameEn)}</div>
                    <div className="text-xs text-gray-500 mt-2 font-mono">CHALLENGER A</div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl text-[#333] mb-4 group-hover/card:text-[#d4af37] transition-colors">+</div>
                    <div className="text-gray-500 text-sm tracking-widest">{t('選手Aを選択', 'Select Food A')}</div>
                  </>
                )}
              </button>

              {/* VS Badge */}
              <div className="flex flex-col items-center">
                <div className="text-5xl font-black text-[#d4af37] italic tracking-tighter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">VS</div>
                <button
                  onClick={getRandomBattle}
                  className="mt-4 text-xs text-gray-500 hover:text-[#d4af37] transition-colors border-b border-gray-700 hover:border-[#d4af37] pb-0.5"
                >
                  {t('ランダムに対戦', 'Random Match')} 🎲
                </button>
              </div>

              {/* Right Fighter */}
              <button
                onClick={() => { setActiveSide('B'); setIsModalOpen(true); }}
                className={`w-full md:w-64 h-64 border border-[#333] hover:border-[#d4af37] transition-all duration-500 bg-[#0a0a0a] flex flex-col items-center justify-center group/card relative overflow-hidden ${selectedB ? 'border-[#d4af37]/50' : ''}`}
              >
                {selectedB ? (
                  <>
                    <div className="text-6xl mb-4 group-hover/card:scale-110 transition-transform">{selectedB.emoji}</div>
                    <div className="font-bold text-xl text-white">{t(selectedB.name, selectedB.nameEn)}</div>
                    <div className="text-xs text-gray-500 mt-2 font-mono">CHALLENGER B</div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl text-[#333] mb-4 group-hover/card:text-[#d4af37] transition-colors">+</div>
                    <div className="text-gray-500 text-sm tracking-widest">{t('選手Bを選択', 'Select Food B')}</div>
                  </>
                )}
              </button>
            </div>

            {/* Battle Button */}
            <div className="mt-12 text-center">
              <button
                onClick={handleBattleStart}
                disabled={!selectedA || !selectedB}
                className={`
                  px-16 py-4 text-xl font-bold tracking-widest transition-all duration-500 relative overflow-hidden group/btn
                  ${selectedA && selectedB
                    ? 'bg-[#d4af37] text-black hover:bg-[#fff] hover:scale-105 cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                    : 'bg-[#1a1a1a] text-[#444] cursor-not-allowed border border-[#333]'
                  }
                `}
              >
                <span className="relative z-10">{t('BATTLE START!', 'BATTLE START!')}</span>
                {selectedA && selectedB && (
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Popular Battles Section */}
        <PopularBattles />

        {/* Features Links */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 max-w-6xl mx-auto">
          {/* Ranking */}
          <div className="group bg-[#111] border border-[#333] p-8 hover:border-[#d4af37] transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">{t('ランキング', 'Ranking')}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {t('低カロリー、高タンパク、塩分控えめ...。', 'Low calorie, high protein, low salt...')} <br />
              {t('全食品の頂点を確認しよう。', 'See the best foods in every category.')}
            </p>
            <div className="flex flex-wrap gap-2">
              {['low-calorie', 'high-protein', 'low-carb'].map(type => (
                <a href={`/ranking?type=${type}`} key={type} className="text-xs border border-[#333] px-2 py-1 text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors">
                  {type === 'low-calorie' && t('#低カロリー', '#LowCalorie')}
                  {type === 'high-protein' && t('#高タンパク', '#HighProtein')}
                  {type === 'low-carb' && t('#低糖質', '#LowCarb')}
                </a>
              ))}
            </div>
          </div>

          {/* Gacha */}
          <div
            onClick={() => setIsGachaOpen(true)}
            className="group bg-[#111] border border-[#333] p-8 hover:border-[#d4af37] transition-colors relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:rotate-12 transition-transform">🎲</div>
            <h3 className="text-xl font-bold text-white mb-2">{t('AI栄養ガチャ', 'AI Nutrition Gacha')}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {t('今日の食事が決まらない？', 'Can\'t decide what to eat?')} <br />
              {t('AIがあなたの気分に合わせて提案。', 'AI suggests the perfect meal for your mood.')}
            </p>
            <span className="text-[#d4af37] text-sm font-bold group-hover:underline">{t('ガチャを回す →', 'Spin Gacha →')}</span>
          </div>

          {/* Diagnosis */}
          <div
            onClick={() => setIsDiagnosisOpen(true)}
            className="group bg-[#111] border border-[#333] p-8 hover:border-[#d4af37] transition-colors relative overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform">🧠</div>
            <h3 className="text-xl font-bold text-white mb-2">{t('食の性格診断', 'Food Personality')}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {t('あなたの食事の好みから性格を分析。', 'Analyze your personality from food choices.')} <br />
              {t('隠された本性が明らかに？', 'Reveal your hidden true self?')}
            </p>
            <span className="text-[#d4af37] text-sm font-bold group-hover:underline">{t('診断する →', 'Start Diagnosis →')}</span>
          </div>
        </section>

        {/* Calorie Confession (Footer-ish) */}
        <section className="text-center py-12 border-t border-[#333]">
          <p className="text-gray-500 text-sm mb-4">{t('昨日食べ過ぎてしまったあなたへ...', 'Did you overeat yesterday?')}</p>
          <button
            onClick={() => setIsConfessionOpen(true)}
            className="text-[#d4af37] border-b border-[#d4af37] hover:text-white hover:border-white transition-colors pb-0.5 text-sm"
          >
            {t('カロリー懺悔室へ行く', 'Enter Calorie Confessional')}
          </button>
        </section>

      </main>

      {/* Modals */}
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
