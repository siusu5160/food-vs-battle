import { getAllFoods, getFoodById } from '@/lib/search';
import { BattleClient } from '@/components/BattleClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { idA: string, idB: string } }): Promise<Metadata> {
    const { idA, idB } = await Promise.resolve(params); // Handle both sync/async params for compatibility
    const foodA = getFoodById(idA);
    const foodB = getFoodById(idB);

    if (!foodA || !foodB) return { title: 'Food Battle' };

    return {
        title: `${foodA.name} vs ${foodB.name} | カロリー対決`,
        description: `${foodA.name}と${foodB.name}、どっちが太る？栄養素を徹底比較！`,
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

export default async function BattlePage({ params }: { params: { idA: string, idB: string } }) {
    const { idA, idB } = await Promise.resolve(params); // Ensure async access
    const foodA = getFoodById(idA);
    const foodB = getFoodById(idB);

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
