// Translation helper file for common UI strings
export const translations = {
    // Home page
    home: {
        title: { ja: 'FOOD VS BATTLE', en: 'FOOD VS BATTLE' },
        subtitle: { ja: '食べ物同士の究極の対決', en: 'Ultimate Food Showdown' },
        selectFighter: { ja: '対戦相手を選択', en: 'Select Fighters' },
        fighterA: { ja: 'ファイター A', en: 'Fighter A' },
        fighterB: { ja: 'ファイター B', en: 'Fighter B' },
        battleStart: { ja: 'BATTLE START!', en: 'BATTLE START!' },
        randomMatch: { ja: 'ランダムマッチ', en: 'Random Match' },
        ranking: { ja: 'ランキング', en: 'Ranking' },
        popularBattles: { ja: '人気のバトル', en: 'Popular Battles' },
    },

    // Battle results
    battle: {
        winner: { ja: '勝者', en: 'Winner' },
        draw: { ja: '引き分け', en: 'Draw' },
        nutritionComparison: { ja: '栄養素比較', en: 'Nutrition Comparison' },
        calories: { ja: 'カロリー', en: 'Calories' },
        protein: { ja: 'タンパク質', en: 'Protein' },
        fat: { ja: '脂質', en: 'Fat' },
        carbs: { ja: '炭水化物', en: 'Carbs' },
        fiber: { ja: '食物繊維', en: 'Fiber' },
        salt: { ja: '塩分', en: 'Salt' },
        synergy: { ja: 'シナジー効果', en: 'Synergy Effect' },
        judgmentDetails: { ja: '判定詳細', en: 'Judgment Details' },
        anotherRandomMatch: { ja: 'もう一度ランダムマッチ', en: 'Another Random Match' },
    },

    // Features
    features: {
        gacha: { ja: 'メニューガチャ', en: 'Menu Gacha' },
        gachaDesc: { ja: 'ランダムで献立を提案', en: 'Random menu suggestion' },
        confession: { ja: 'カロリー懺悔室', en: 'Calorie Confession' },
        confessionDesc: { ja: '食べ過ぎてしまったあなたへ', en: 'For those who ate too much' },
        diagnosis: { ja: '診断', en: 'Diagnosis' },
        diagnosisDesc: { ja: 'あなたを食材に例えると？', en: 'What food are you?' },
    },

    // Common
    common: {
        close: { ja: '閉じる', en: 'Close' },
        search: { ja: '検索', en: 'Search' },
        select: { ja: '選択', en: 'Select' },
        back: { ja: '戻る', en: 'Back' },
        next: { ja: '次へ', en: 'Next' },
        share: { ja: 'シェア', en: 'Share' },
        copy: { ja: 'コピー', en: 'Copy' },
        copied: { ja: 'コピー完了！', en: 'Copied!' },
    },
};

// Helper function to get translation
export function getTranslation(key: string, lang: 'ja' | 'en' = 'ja'): string {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
        value = value?.[k];
    }

    if (value && typeof value === 'object' && lang in value) {
        return value[lang];
    }

    return key;
}
