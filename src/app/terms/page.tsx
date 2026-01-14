import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '利用規約・免責事項 | Food Battle',
    description: '当サイトの利用規約と免責事項について。',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
                <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4 text-[#d4af37]">利用規約・免責事項</h1>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-white">免責事項</h2>
                    <p className="mb-4 text-gray-300 leading-relaxed">
                        当サイト「Food Battle」のコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、
                        誤情報が入り込んだり、情報が古くなっていることもございます。
                    </p>
                    <p className="mb-4 text-gray-300 leading-relaxed">
                        当サイトの栄養素データは一般的な値を参考にしており、実際の製品や調理法により異なる場合があります。
                        健康管理や食事制限を行っている方は、必ず医師や専門家の指示に従ってください。
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-white">著作権について</h2>
                    <p className="text-gray-300 leading-relaxed">
                        当サイトに掲載されている文章・画像・動画等の著作権は、運営者または各権利所有者に帰属します。
                        法的に認められている引用の範囲を超えて、無断で転載することを禁止します。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-white">リンクについて</h2>
                    <p className="text-gray-300 leading-relaxed">
                        当サイトは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。
                        ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
                    </p>
                </section>
            </div>
        </div>
    );
}
