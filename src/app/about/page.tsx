import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FOOD VS BATTLEについて',
    description: 'FOOD VS BATTLEは食べ物同士の栄養素を比較できるエンターテインメントサイトです',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        FOOD VS BATTLEについて
                    </h1>
                    <p className="text-gray-400 text-lg">
                        食べ物の栄養素を楽しく比較
                    </p>
                </div>

                <div className="space-y-8">
                    {/* サービス概要 */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-4 text-emerald-400">🍕 サービス概要</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            FOOD VS BATTLEは、様々な食べ物同士の栄養素を視覚的に比較できるエンターテインメントサイトです。
                            「マグロ vs サーモン」「ご飯 vs パン」など、気になる食べ物同士を対決させて、
                            カロリー、タンパク質、脂質、炭水化物などの栄養素を簡単に比較できます。
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            ダイエット中の方、筋トレをしている方、健康的な食生活を目指す方など、
                            様々な目的に合わせて食品選びの参考にしていただけます。
                        </p>
                    </section>

                    {/* 主な機能 */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-emerald-400">⚡ 主な機能</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-800/50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-2 text-white">🥊 バトル機能</h3>
                                <p className="text-gray-400 text-sm">
                                    2つの食品を選んで栄養素を比較。レーダーチャートで視覚的に確認できます。
                                </p>
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-2 text-white">📊 ランキング</h3>
                                <p className="text-gray-400 text-sm">
                                    カロリー、タンパク質、ダイエット向けなど、カテゴリ別のランキングを確認。
                                </p>
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-2 text-white">🎰 メニューガチャ</h3>
                                <p className="text-gray-400 text-sm">
                                    AIが栄養バランスの取れた食事メニューを自動生成します。
                                </p>
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-2 text-white">❓ 性格診断</h3>
                                <p className="text-gray-400 text-sm">
                                    あなたの食の好みから性格を診断。楽しいクイズ形式です。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* データソース */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-4 text-emerald-400">📚 データソース</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            本サイトで使用している食品データは、以下のソースを基にしています：
                        </p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>文部科学省「日本食品標準成分表2020年版（八訂）」</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>各食品メーカーの公式栄養成分表示</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-1">•</span>
                                <span>外食チェーンの公式栄養情報</span>
                            </li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-4">
                            ※ 調理方法や個体差により、実際の栄養価は異なる場合があります。参考値としてご利用ください。
                        </p>
                    </section>

                    {/* お問い合わせ */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4 text-emerald-400">📧 お問い合わせ</h2>
                        <p className="text-gray-300 mb-6">
                            ご質問、ご要望、バグ報告などがございましたら、お気軽にお問い合わせください。
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-emerald-900/20"
                        >
                            お問い合わせフォーム
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
