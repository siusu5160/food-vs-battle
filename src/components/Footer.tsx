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
                        <Link href="/" className="hover:text-white transition-colors">トップページ</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
                    </nav>
                </div>

                <div className="mt-8 text-center text-xs border-t border-gray-800 pt-8">
                    &copy; {new Date().getFullYear()} FOOD VS BATTLE. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
