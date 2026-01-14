import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // Basic disallows
        },
        sitemap: 'https://food-vs-battle.pages.dev/sitemap.xml', // Update domain if known, placeholder for now
    };
}
