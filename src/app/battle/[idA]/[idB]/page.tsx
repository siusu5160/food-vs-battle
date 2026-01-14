import { getAllFoods, getFoodById } from '@/lib/search';
import { BattleClient } from '@/components/BattleClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { POPULAR_BATTLES } from '@/lib/constants';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ idA: string, idB: string }> }): Promise<Metadata> {
    const { idA, idB } = await Promise.resolve(params); // Handle both sync/async params for compatibility
    const foodA = getFoodById(decodeURIComponent(idA));
    const foodB = getFoodById(decodeURIComponent(idB));

    if (!foodA || !foodB) return { title: 'Food Battle' };

    // SEO Strategy:
    // Only index "Popular Battles" to prevent "Low Value Content" penalty from millions of auto-generated pages.
    // Dynamic/Random combinations will be accessible but not indexed by search engines.
    const isPopular = POPULAR_BATTLES.some(p =>
        (p.a === idA && p.b === idB) || (p.a === idB && p.b === idA)
    );

    return {
        title: `${foodA.name} vs ${foodB.name} | カロリー対決`,
        description: `${foodA.name}と${foodB.name}、どっちが太る？栄養素を徹底比較！`,
        robots: {
            index: isPopular,
            follow: isPopular, // Don't waste crawl budget on random links
        }
    };
}

// ISR Strategy: Generate popular battles statically, others on demand
export async function generateStaticParams() {
    const foods = getAllFoods();
    // Generate limited combinations to keep build time sane
    // Example: Top 20 foods vs Top 20 foods
    const topFoods = foods.slice(0, 20);
    const params = [];

    for (let i = 0; i < topFoods.length; i++) {
        for (let j = i + 1; j < topFoods.length; j++) {
            params.push({
                idA: topFoods[i].id,
                idB: topFoods[j].id,
            });
        }
    }
    return params;
}

export default async function BattlePage({ params }: { params: Promise<{ idA: string, idB: string }> }) {
    const { idA, idB } = await params;
    const foodA = getFoodById(decodeURIComponent(idA));
    const foodB = getFoodById(decodeURIComponent(idB));

    if (!foodA || !foodB) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-900 pb-20">
            <BattleClient foodA={foodA} foodB={foodB} />
        </main>
    );
}

// Revalidate every week (data is mostly static)
export const revalidate = 604800;
export const dynamicParams = true; // Allow battles not in generateStaticParams
export const runtime = 'edge'; // Use Edge Runtime for partial/dynamic generation on Cloudflare

