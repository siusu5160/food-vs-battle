'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex gap-2 items-center bg-black/30 p-1 rounded-lg backdrop-blur-sm border border-white/10">
            <button
                onClick={() => setLanguage('ja')}
                className={`px-3 py-1 rounded text-sm font-bold transition-all ${language === 'ja'
                        ? 'bg-primary text-black shadow-lg scale-105'
                        : 'text-gray-400 hover:text-white'
                    }`}
            >
                🇯🇵 JP
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-bold transition-all ${language === 'en'
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : 'text-gray-400 hover:text-white'
                    }`}
            >
                🇺🇸 EN
            </button>
        </div>
    );
}
