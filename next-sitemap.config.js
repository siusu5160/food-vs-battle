/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://food-vs-battle.pages.dev',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    // 人気のバトルのみサイトマップに含める
    exclude: ['/battle/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
    },
    // 追加のパスを手動で指定
    additionalPaths: async (config) => {
        const result = [];

        // 人気のバトルのパスを追加
        const popularBattles = [
            { a: 'chicken-tender', b: 'chicken-thigh-skin' },
            { a: 'white-rice', b: 'bread' },
            { a: 'beef-rib', b: 'pork-belly' },
            { a: 'cabbage', b: 'lettuce' },
        ];

        for (const battle of popularBattles) {
            result.push({
                loc: `/battle/${battle.a}/${battle.b}`,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: new Date().toISOString(),
            });
        }

        return result;
    },
};
