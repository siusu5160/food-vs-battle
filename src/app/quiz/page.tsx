import { EndlessQuiz } from '@/components/EndlessQuiz';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'カロリーハイクイズ | Food Battle',
    description: 'どっちがカロリー高い？瞬時の判断で連勝を目指せ！',
    openGraph: {
        title: 'カロリーハイクイズ | Food Battle',
        description: 'どっちがカロリー高い？瞬時の判断で連勝を目指せ！',
    },
};

export default function QuizPage() {
    return (
        <main className="min-h-screen bg-gray-900 pb-20 pt-8">
            <EndlessQuiz />
        </main>
    );
}
