'use client';

import React from 'react';
import { FoodItem } from '@/types/FoodItem';
import { getRecommendedProducts, getAmazonSearchUrl, getRakutenSearchUrl } from '@/lib/affiliateConfig';
import { AffiliateLink } from './AffiliateLink';

interface ProductRecommendationsProps {
    food: FoodItem;
    title?: string;
}

export function ProductRecommendations({ food, title = 'この食品をもっと楽しむために' }: ProductRecommendationsProps) {
    const products = getRecommendedProducts(food.tags || []);

    if (products.length === 0) return null;

    return (
        <div className="mt-8 p-6 bg-[#111] border border-[#333] rounded-lg">
            <h3 className="text-lg font-bold text-[#d4af37] mb-4 flex items-center gap-2">
                <span>💡</span>
                <span>{title}</span>
            </h3>

            <p className="text-gray-400 text-sm mb-4">
                {food.name}に関連する商品をチェック
            </p>

            <div className="space-y-3">
                {products.map((product, index) => (
                    <div key={index} className="flex flex-wrap gap-2">
                        <AffiliateLink
                            provider="amazon"
                            url={getAmazonSearchUrl(product)}
                            productName={product}
                        />
                        {getRakutenSearchUrl(product) && (
                            <AffiliateLink
                                provider="rakuten"
                                url={getRakutenSearchUrl(product)}
                                productName={product}
                            />
                        )}
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-500 mt-4">
                ※ アフィリエイトリンクを含みます。購入により当サイトが収益を得る場合があります。
            </p>
        </div>
    );
}
