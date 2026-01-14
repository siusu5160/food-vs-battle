'use client';

import React from 'react';

// Simplified LanguageSwitcher (UI only for now as requested)
export function LanguageSwitcher() {
    return (
        <div className="flex gap-2 items-center">
            <button
                onClick={() => alert('多言語対応は現在調整中です。')}
                className="px-3 py-1 rounded text-sm font-bold transition-colors bg-primary text-black"
            >
                🇯🇵 日本語
            </button>
            <button
                onClick={() => alert('English support is coming soon!')}
                className="px-3 py-1 rounded text-sm font-bold transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
                🇺🇸 English
            </button>
        </div>
    );
}
