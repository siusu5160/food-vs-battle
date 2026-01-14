import Link from 'next/link';

export default function ContactForAdSense() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl text-gray-200">
            <div className="text-center mb-12">
                <Link href="/" className="text-gray-400 hover:text-white mb-6 inline-block text-sm">&larr; トップに戻る</Link>
                <h1 className="text-3xl font-bold mb-4">お問い合わせ</h1>
                <p className="text-gray-400">
                    当サイトに関するお問い合わせは、以下のメールアドレスまでお願いいたします。
                </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center shadow-lg">
                <h2 className="text-lg font-bold text-white mb-2">メールアドレス</h2>
                <a href="mailto:siusu5160@gmail.com" className="text-xl md:text-2xl text-blue-400 hover:text-blue-300 font-mono break-all font-bold">
                    siusu5160@gmail.com
                </a>
                <p className="mt-6 text-sm text-gray-500">
                    ※順次対応させていただきますが、内容によってはお時間をいただく場合やお答えできない場合がございます。あらかじめご了承ください。
                </p>
            </div>
        </div>
    );
}
