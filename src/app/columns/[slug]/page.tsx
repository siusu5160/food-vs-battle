'use client';

export const runtime = 'edge';

import { ARTICLES } from '@/data/articles';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import React, { use } from 'react';

import AuthorProfile from '@/components/AuthorProfile';
import ShareButtons from '@/components/ShareButtons';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { language, t } = useLanguage();
    const article = ARTICLES.find(a => a.slug === slug);
    const lang = language === 'ja' ? 'ja' : 'en';

    if (!article) {
        notFound();
    }

    const title = article.title[lang];
    const shareUrl = `https://food-vs-battle.pages.dev/columns/${article.slug}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': title,
        'datePublished': article.date,
        'description': article.excerpt[lang],
        'author': {
            '@type': 'Organization',
            'name': 'FOOD VS 運営事務局'
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="max-w-2xl mx-auto">
                <Link href="/columns" className="inline-block mb-8 text-gray-400 hover:text-white transition-colors">
                    ← {t('コラム一覧に戻る', 'Back to Columns')}
                </Link>

                <header className="mb-8 text-center">
                    <div className="text-6xl mb-6">{article.emoji}</div>
                    <h1 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight">
                        {title}
                    </h1>
                    <div className="flex justify-center gap-3 text-sm mb-6">
                        <span className="text-gray-400">{article.date}</span>
                        {article.tags[lang].map(tag => (
                            <span key={tag} className="text-[#d4af37]">#{tag}</span>
                        ))}
                    </div>
                </header>



                <div
                    className="prose prose-invert prose-lg max-w-none prose-headings:text-[#d4af37] prose-a:text-[#d4af37] prose-strong:text-white prose-li:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: article.content[lang] }}
                />

                <div className="mt-12 mb-8 flex justify-center">
                    <ShareButtons title={title} url={shareUrl} />
                </div>

                <AuthorProfile />

                <div className="mt-16 pt-10 border-t border-gray-800 text-center">
                    <h3 className="text-xl font-bold text-white mb-6">{t('この記事を読んだ人におすすめ', 'Recommended for You')}</h3>
                    <Link
                        href="/"
                        className="inline-block bg-[#d4af37] text-black font-bold py-3 px-8 rounded-full hover:bg-[#b5952f] transition-all transform hover:scale-105"
                    >
                        🔥 {t('食べ物バトルを始める', 'Start Food Battle')}
                    </Link>
                </div>
            </article>
        </div>
    );
}
