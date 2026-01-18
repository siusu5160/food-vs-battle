import { RankingResult } from "@/lib/rankingLogic";

interface StructuredDataProps {
    type: 'Breadcrumb' | 'Ranking';
    data: any;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
    let structuredData = {};

    if (type === 'Breadcrumb') {
        // data type: { name: string, item: string }[] (List of crumbs)
        const crumbs = data as { name: string, item: string }[];
        structuredData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": crumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `https://food-vs-battle.pages.dev${crumb.item}`
            }))
        };
    } else if (type === 'Ranking') {
        // data type: RankingResult
        const ranking = data as RankingResult;
        structuredData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": ranking.title,
            "description": ranking.description,
            "itemListElement": ranking.items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Product", // Or FoodEvent if more appropriate, but Product is safer for lists
                    "name": item.name,
                    "description": item.category, // Or mapped description
                    // "image": item.image // If available
                }
            }))
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};
