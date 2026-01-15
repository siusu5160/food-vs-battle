import { MetadataRoute } from 'next';
import { getAllFoods } from '@/lib/search';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://food-vs-battle.pages.dev';
    const currentDate = new Date();

    // 基本ページ
    const routes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/ranking`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/gacha`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/personality-quiz`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/quiz`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ];

    // 全食品のバトルページを生成
    try {
        const allFoods = getAllFoods();
        const battlePages: MetadataRoute.Sitemap = [];

        // 人気の組み合わせを優先的に追加
        const popularCombinations = [
            ['sushiro-maguro', 'sushiro-salmon'],
            ['rice-white', 'bread-white'],
            ['chicken-breast', 'pork-loin'],
            // 他の人気組み合わせを追加
        ];

        popularCombinations.forEach(([id1, id2]) => {
            battlePages.push({
                url: `${baseUrl}/battle/${id1}/${id2}`,
                lastModified: currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            });
        });

        // 全組み合わせは優先度を下げて追加（最大1000件まで）
        let count = 0;
        const maxBattles = 1000;

        for (let i = 0; i < allFoods.length && count < maxBattles; i++) {
            for (let j = i + 1; j < allFoods.length && count < maxBattles; j++) {
                const food1 = allFoods[i];
                const food2 = allFoods[j];

                // 人気組み合わせは既に追加済みなのでスキップ
                const isPopular = popularCombinations.some(
                    ([id1, id2]) =>
                        (food1.id === id1 && food2.id === id2) ||
                        (food1.id === id2 && food2.id === id1)
                );

                if (!isPopular) {
                    battlePages.push({
                        url: `${baseUrl}/battle/${food1.id}/${food2.id}`,
                        lastModified: currentDate,
                        changeFrequency: 'monthly' as const,
                        priority: 0.5,
                    });
                    count++;
                }
            }
        }

        return [...routes, ...battlePages];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return routes;
    }
}
