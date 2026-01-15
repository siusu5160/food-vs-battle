import Link from 'next/link';
import AccessCounter from './AccessCounter';

export default function Footer() {
    return (
        <footer className="bg-black/50 backdrop-blur-md border-t border-[#333] py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col items-center">

                <div className="mb-4">
                    <AccessCounter />
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm text-gray-400">
                    <Link href="/about" className="hover:text-[#d4af37] transition-colors">About</Link>
                    <Link href="/faq" className="hover:text-[#d4af37] transition-colors">FAQ</Link>
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
