import { MetadataRoute } from 'next';
import { POPULAR_BATTLES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://food-vs-battle.pages.dev'; // Assuming Cloudflare Pages default

    // Static routes
    const routes = [
        '',
        '/ranking',
        '/privacy',
        '/terms',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Popular Battle routes (High Quality Content)
    const battleRoutes = POPULAR_BATTLES.map((battle) => ({
        url: `${baseUrl}/battle/${battle.a}/${battle.b}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9, // High priority for landing pages
    }));

    return [...routes, ...battleRoutes];
}
