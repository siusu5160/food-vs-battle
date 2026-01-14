import { MenuGacha } from '@/components/MenuGacha';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '黄金バランス定食ガチャ | Food Battle',
    description: 'AIが栄養バランスを計算して、あなたに最適な定食を提案します。',
};

export default function GachaPage() {
    return (
        <main className="min-h-screen bg-gray-900 pb-20 pt-8">
            <MenuGacha />
        </main>
    );
}
