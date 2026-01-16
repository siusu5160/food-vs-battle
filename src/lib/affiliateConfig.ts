// アフィリエイト設定の一元管理
export const AFFILIATE_CONFIG = {
    amazon: {
        affiliateId: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID || 'foodvs-22',
        baseUrl: 'https://www.amazon.co.jp/s',
    },
    rakuten: {
        affiliateId: process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID || '',
        baseUrl: 'https://search.rakuten.co.jp/search/mall',
    },
};

// カテゴリー別の推薦商品キーワード
export const CATEGORY_PRODUCTS: Record<string, string[]> = {
    HighProtein: ['プロテイン', 'ささみ', '鶏胸肉', 'サラダチキン'],
    LowCarb: ['糖質制限', 'ロカボ', 'こんにゃく麺', '低糖質パン'],
    LowCalorie: ['ダイエット食品', 'カロリーオフ', 'ゼロカロリー'],
    HighFat: ['MCTオイル', 'ナッツ', 'アボカドオイル'],
    Carb: ['米', 'パスタ', 'パン', '炊飯器'],
    Fruit: ['フルーツ', 'スムージー', 'ミキサー'],
    Meat: ['肉', '調理器具', 'フライパン'],
};

// 食品タグに基づいて推薦商品を取得
export function getRecommendedProducts(tags: string[]): string[] {
    const products: string[] = [];

    for (const tag of tags) {
        if (CATEGORY_PRODUCTS[tag]) {
            products.push(...CATEGORY_PRODUCTS[tag]);
        }
    }

    // 重複を削除して最大3つまで
    return [...new Set(products)].slice(0, 3);
}

// Amazon検索URLを生成
export function getAmazonSearchUrl(keyword: string): string {
    const { affiliateId, baseUrl } = AFFILIATE_CONFIG.amazon;
    const params = new URLSearchParams({
        k: keyword,
        tag: affiliateId,
    });
    return `${baseUrl}?${params.toString()}`;
}

// 楽天検索URLを生成
export function getRakutenSearchUrl(keyword: string): string {
    const { affiliateId, baseUrl } = AFFILIATE_CONFIG.rakuten;
    if (!affiliateId) return ''; // IDが設定されていない場合は空文字

    const params = new URLSearchParams({
        keyword: keyword,
        affiliate_id: affiliateId,
    });
    return `${baseUrl}?${params.toString()}`;
}
