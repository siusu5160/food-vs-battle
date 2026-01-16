'use client';

import React from 'react';

interface AffiliateLinkProps {
    provider: 'amazon' | 'rakuten';
    url: string;
    productName: string;
    className?: string;
}

export function AffiliateLink({ provider, url, productName, className = '' }: AffiliateLinkProps) {
    if (!url) return null;

    const providerInfo = {
        amazon: {
            name: 'Amazon',
            icon: '🛒',
            color: 'bg-[#FF9900] hover:bg-[#FF9900]/90',
        },
        rakuten: {
            name: '楽天市場',
            icon: '🛍️',
            color: 'bg-[#BF0000] hover:bg-[#BF0000]/90',
        },
    };

    const info = providerInfo[provider];

    return (
        <a
            href={url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${info.color} ${className}`}
        >
            <span>{info.icon}</span>
            <span>{info.name}で探す</span>
            <span className="text-xs opacity-75">「{productName}」</span>
        </a>
    );
}
