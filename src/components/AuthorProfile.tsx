'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AuthorProfile() {
    const { t } = useLanguage();

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-4xl shadow-lg">
                    🥗
                </div>
            </div>
            <div className="text-center sm:text-left">
                <div className="text-xs text-emerald-400 font-bold mb-1 tracking-wider uppercase">
                    {t('この記事を書いた人', 'Author')}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                    {t('FOOD VS 運営事務局', 'FOOD VS Editorial Team')}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {t(
                        '「食の選択で人生を変える」をテーマに、栄養士監修のもと信頼できる情報をお届けします。ダイエット、筋トレ、健康維持に役立つ知識を、わかりやすく解説します。',
                        'Delivering reliable information supervised by nutritionists under the theme "Change your life with food choices." We explain knowledge useful for dieting, muscle training, and health maintenance in an easy-to-understand manner.'
                    )}
                </p>
            </div>
        </div>
    );
}
