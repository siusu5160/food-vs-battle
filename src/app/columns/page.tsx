'use client';

export const runtime = 'edge';

import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ColumnsPage() {
    const { t, language } = useLanguage();
    const lang = language === 'ja' ? 'ja' : 'en';

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-block mb-8 text-gray-400 hover:text-white transition-colors">
                    ← {t('トップに戻る', 'Back to Top')}
                </Link>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        📰 {t('フードコラム', 'Food Columns')}
                    </h1>
                    <p className="text-gray-400">
                        {t('食に関する豆知識やダイエット、筋トレ情報をお届け！', 'Tips on food, diet, and muscle training!')}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {ARTICLES.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/columns/${article.slug}`}
                            className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-[#d4af37] transition-all hover:-translate-y-1 shadow-lg hover:shadow-[#d4af37]/20 group"
                        >
                            <div className="text-4xl mb-4">{article.emoji}</div>
                            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors leading-snug">
                                {article.title[lang]}
                            </h2>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                {article.excerpt[lang]}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-xs text-gray-500">{article.date}</span>
                                <div className="flex gap-2">
                                    {article.tags[lang].map(tag => (
                                        <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
