'use client';

import dynamic from 'next/dynamic';

const FoodSearch = dynamic(() => import('@/components/FoodSearch').then(mod => mod.FoodSearch), {
    ssr: false,
    loading: () => <div className="w-full h-16 bg-gray-800 rounded-full animate-pulse border border-gray-700" />
});

export const SearchWrapper = () => {
    return <FoodSearch />;
};
