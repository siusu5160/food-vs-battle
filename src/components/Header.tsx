import Link from 'next/link';
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-[100] bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#333]">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b4941f] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
                        <span className="text-xl">⚔️</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-widest text-[#d4af37] font-serif group-hover:text-white transition-colors">
                        FOOD VS BATTLE
                    </h1>
                </Link>
                <div className="flex items-center gap-6">
                    {/* Future navigation items can go here */}
                </div>
            </div>
        </header>
    );
};
