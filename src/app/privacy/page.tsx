import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl text-gray-200">
            <div className="mb-8 text-center">
                <Link href="/" className="text-gray-400 hover:text-white mb-4 inline-block">&larr; トップに戻る</Link>
                <h1 className="text-3xl font-bold mb-4">プライバシーポリシー</h1>
            </div>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3 border-b border-gray-600 pb-2">1. 個人情報の収集について</h2>
                <p className="mb-4 text-sm leading-relaxed">
                    当サイト（FOOD VS BATTLE）では、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
                    このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
                </p>
                <p className="mb-4 text-sm leading-relaxed">
                    この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                    Googleアナリティクスの規約に関しての詳細は<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Googleアナリティクスサービス利用規約</a>のページや<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Googleポリシーと規約</a>ページをご覧ください。
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3 border-b border-gray-600 pb-2">2. 広告の配信について</h2>
                <p className="mb-4 text-sm leading-relaxed">
                    Amazonのアソシエイトとして、FOOD VS BATTLEは適格販売により収入を得ています。
                </p>
                <p className="mb-4 text-sm leading-relaxed">
                    また、楽天アフィリエイト、A8.netなどのアフィリエイトプログラムを利用し、適格販売により収入を得ています。
                    第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookieを設定したりこれを認識したりする場合があります。
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3 border-b border-gray-600 pb-2">3. 免責事項</h2>
                <p className="mb-4 text-sm leading-relaxed">
                    当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、必ずしもそれらの正確性や安全性等を保証するものではありません。
                    誤情報が入り込んだり、情報が古くなっていることもございます。
                </p>
                <p className="mb-4 text-sm leading-relaxed">
                    当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                    また、本免責事項、および当サイトに掲載しているすべての記事は、予告（告知）なしに変更・削除されることがあります。
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3 border-b border-gray-600 pb-2">4. 運営者情報</h2>
                <div className="bg-gray-800 p-4 rounded-lg text-sm">
                    <p className="mb-1"><span className="font-bold">運営者：</span> FOOD VS 運営事務局</p>
                    <p className="mb-1"><span className="font-bold">連絡先：</span> <a href="mailto:siusu5160@gmail.com" className="text-blue-400 hover:underline">siusu5160@gmail.com</a></p>
                    <p className="mt-2 text-xs text-gray-400">または<Link href="/contact" className="text-blue-400 hover:underline">お問い合わせページ</Link>よりご連絡ください。</p>
                </div>
            </section>

            <div className="text-center mt-12">
                <Link href="/" className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-colors">トップページへ戻る</Link>
            </div>
        </div>
    );
}
