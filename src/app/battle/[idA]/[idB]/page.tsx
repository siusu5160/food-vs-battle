import { getAllFoods, getFoodById } from '@/lib/search';
import { BattleClient } from '@/components/BattleClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { POPULAR_BATTLES } from '@/lib/constants';

export const runtime = 'edge';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ idA: string, idB: string }> }): Promise<Metadata> {
    const { idA, idB } = await Promise.resolve(params);
    const foodA = getFoodById(decodeURIComponent(idA));
    const foodB = getFoodById(decodeURIComponent(idB));

    if (!foodA || !foodB) return { title: 'Food Battle' };

    // SEO Strategy:
    // Only index "Popular Battles" to prevent "Low Value Content" penalty from millions of auto-generated pages.
    const isPopular = POPULAR_BATTLES.some(p =>
        (p.a === idA && p.b === idB) || (p.a === idB && p.b === idA)
    );

    const title = `${foodA.name} vs ${foodB.name} | カロリー対決`;
    const description = `${foodA.name}(${foodA.calories}kcal)と${foodB.name}(${foodB.calories}kcal)、どっちが太る？栄養素を徹底比較！タンパク質、脂質、炭水化物の詳細データで勝敗を判定。`;
    const url = `https://food-vs-battle.pages.dev/battle/${idA}/${idB}`;

    return {
        title,
        description,
        robots: {
            index: isPopular,
            follow: isPopular,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'FOOD VS BATTLE',
            locale: 'ja_JP',
            type: 'website',
            images: [
                {
                    url: '/og-image.png', // TODO: Generate dynamic OG image
                    width: 1200,
                    height: 630,
                    alt: `${foodA.name} vs ${foodB.name}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/og-image.png'],
        },
    };
}

// ISR Strategy: Generate popular battles statically, others on demand
// Update V5.8: Removed generateStaticParams to avoid build issues and rely fully on Edge Runtime for dynamic generation.
// This ensures ALL combinations work without 404s.

export default async function BattlePage({ params }: { params: Promise<{ idA: string, idB: string }> }) {
    try {
        const resolvedParams = await params;
        const { idA, idB } = resolvedParams;

        // Decode and clean IDs
        const cleanIdA = decodeURIComponent(idA).trim();
        const cleanIdB = decodeURIComponent(idB).trim();

        console.log('Battle Page - IDs:', { cleanIdA, cleanIdB });

        const foodA = getFoodById(cleanIdA);
        const foodB = getFoodById(cleanIdB);

        console.log('Battle Page - Foods found:', {
            foodA: foodA ? foodA.name : 'NOT FOUND',
            foodB: foodB ? foodB.name : 'NOT FOUND'
        });

        if (!foodA || !foodB) {
            console.error('Food not found:', { cleanIdA, cleanIdB, foodA: !!foodA, foodB: !!foodB });
            notFound();
        }

        // Generate Structured Data (JSON-LD)
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
                {
                    '@type': 'Question',
                    'name': `${foodA.name}と${foodB.name}、カロリーが高いのはどっち？`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': `${foodA.calories > foodB.calories ? foodA.name : foodB.name}の方がカロリーが高いです。${foodA.name}は${foodA.calories}kcal、${foodB.name}は${foodB.calories}kcalです。`
                    }
                },
                {
                    '@type': 'Question',
                    'name': `${foodA.name}と${foodB.name}のタンパク質量の違いは？`,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': `${foodA.name}は${foodA.protein}g、${foodB.name}は${foodB.protein}gのタンパク質を含んでいます。`
                    }
                }
            ]
        };

        const breadcrumbJsonLd = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': 'https://food-vs-battle.pages.dev'
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'Battle',
                    'item': `https://food-vs-battle.pages.dev/battle/${cleanIdA}/${cleanIdB}`
                }
            ]
        };

        return (
            <main className="min-h-screen bg-gray-900 pb-20">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
                <BattleClient foodA={foodA} foodB={foodB} />
            </main>
        );
    } catch (error) {
        console.error('Battle Page Error:', error);
        notFound();
    }
}

// Revalidate every week (data is mostly static)
export const revalidate = 604800;
export const dynamicParams = true; // Allow battles not in generateStaticParams


