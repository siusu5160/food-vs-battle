import Link from 'next/link';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-white mb-2">FOOD VS BATTLE</h3>
                        <p className="text-xs">食べ物同士の真剣勝負！あなたの投票で最強が決まる。</p>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-6 text-sm">
                        <footer className="bg-black/50 backdrop-blur-md border-t border-[#333] py-8 mt-auto">
                            <div className="container mx-auto px-4 flex flex-col items-center">

                                <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm text-gray-400">
                                    <Link href="/privacy" className="hover:text-[#d4af37] transition-colors">プライバシーポリシー</Link>
                                    <Link href="/terms" className="hover:text-[#d4af37] transition-colors">利用規約</Link>
                                    <Link href="/contact" className="hover:text-[#d4af37] transition-colors">お問い合わせ</Link>
                                </div>

                                <p className="text-gray-600 text-xs">
                                    &copy; {new Date().getFullYear()} FOOD VS BATTLE. All rights reserved.
                                </p>
                            </div>
                        </footer>
                        );
}
