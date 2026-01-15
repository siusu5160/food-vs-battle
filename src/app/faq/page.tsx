import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'よくある質問 | FOOD VS BATTLE',
    description: 'FOOD VS BATTLEに関するよくある質問と回答',
};

export default function FAQPage() {
    const faqs = [
        {
            q: 'FOOD VS BATTLEとは何ですか？',
            a: '様々な食べ物同士の栄養素を比較して、どちらが優れているかを判定するエンターテインメントサイトです。カロリー、タンパク質、脂質、炭水化物などの栄養素を視覚的に比較できます。'
        },
        {
            q: '利用料金はかかりますか？',
            a: 'いいえ、完全無料でご利用いただけます。会員登録も不要です。'
        },
        {
            q: 'データの出典は？',
            a: '食品データは文部科学省の「日本食品標準成分表」および各メーカーの公式栄養成分表示を基にしています。'
        },
        {
            q: 'バトル結果はどのように判定されますか？',
            a: 'カロリー、タンパク質、脂質、炭水化物の各項目で比較し、総合的なバランスを評価しています。目的（ダイエット、筋トレなど）によって最適な食品は異なります。'
        },
        {
            q: 'ガチャ機能とは？',
            a: 'AIが栄養バランスの取れた食事メニューを自動生成する機能です。主食・主菜・副菜の組み合わせで、約600kcal前後のバランスの良い食事を提案します。'
        },
        {
            q: '食品のリクエストはできますか？',
            a: '現在、食品データは定期的に更新しています。リクエストがある場合は、お問い合わせページからご連絡ください。'
        },
        {
            q: 'スマートフォンでも使えますか？',
            a: 'はい、スマートフォン、タブレット、PCなど、あらゆるデバイスで快適にご利用いただけます。'
        },
        {
            q: 'データは正確ですか？',
            a: '公的機関やメーカーの公式データを基にしていますが、調理方法や個体差により実際の栄養価は異なる場合があります。参考値としてご利用ください。'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        よくある質問
                    </h1>
                    <p className="text-gray-400 text-lg">
                        FOOD VS BATTLEについてのよくある質問と回答
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden group hover:border-emerald-500/30 transition-all"
                        >
                            <summary className="px-6 py-4 cursor-pointer font-bold text-lg flex items-center justify-between group-hover:text-emerald-400 transition-colors">
                                <span className="flex items-center gap-3">
                                    <span className="text-emerald-400">Q{index + 1}.</span>
                                    {faq.q}
                                </span>
                                <span className="text-gray-600 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-800">
                                <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                            </div>
                        </details>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-400 mb-4">
                        その他のご質問がある場合は、お気軽にお問い合わせください。
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-emerald-900/20"
                    >
                        お問い合わせ
                    </a>
                </div>
            </div>
        </div>
    );
}
