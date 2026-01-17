import { FoodItem } from '@/types/FoodItem';

export type Winner = 'A' | 'B' | 'Draw';

export interface Judgment {
    badge: string;
    title: string;
    content: string;
    reason: string;
}

export interface BattleResult {
    winner: Winner;
    judgments: Judgment[];
}

// Helper for random text
const getRandomTemplate = (templates: string[], data: any) => {
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.replace(/{(\w+)}/g, (_, key) => data[key] || '');
};

export function judgeBattle(foodA: FoodItem, foodB: FoodItem): BattleResult {
    const judgments: Judgment[] = [];
    let scoreA = 0;
    let scoreB = 0;

    // 1. Calorie check (Diet)
    const calDiff = foodA.calories - foodB.calories;
    const calorieThreshold = 10;

    if (Math.abs(calDiff) > calorieThreshold) {
        const winner = calDiff < 0 ? foodA : foodB;
        const diff = Math.abs(calDiff);

        // Text Templates: Focus on "Satisfaction" and "Smart Choices"
        const titleTemplates = [
            `賢い選択: 『{name}』`,
            `満足感を味方に: 『{name}』`,
            `ダイエットの抜け道: 『{name}』`,
        ];
        const contentTemplates = [
            `「食べた！」という満足感はそのままに、カロリーだけを上手に減らせます。(-{diff}kcal)`,
            `『{name}』なら、お腹いっぱい食べても罪悪感を感じる必要はありません。(-{diff}kcal)`,
            `我慢するダイエットは続きません。ボリュームはあるのに低カロリーなこちらが正解です。(-{diff}kcal)`,
        ];

        judgments.push({
            badge: "🔥 ダイエット",
            title: getRandomTemplate(titleTemplates, { name: winner.name }),
            content: getRandomTemplate(contentTemplates, { name: winner.name, diff }),
            reason: "【ポイント】ダイエットの敵は「空腹」です。カロリー密度が低い食品を選べば、物理的な満腹感を得ながら摂取エネルギーを抑えることができ、無理なく痩せられます。"
        });
        if (calDiff < 0) scoreA += 2; else scoreB += 2;
    } else {
        const contentTemplates = [
            "どちらを選んでも、その一口が体型に与える影響はほぼ同じです。",
            "カロリーという点では、どちらも「正解」です。好きな方を楽しんでください。",
            "数字上の差はありません。あなたの心がときめく方を選ぶのが一番のヘルシーです。",
        ];
        judgments.push({
            badge: "🤝 ダイエット",
            title: "カロリー: 運命の分かれ道なし",
            content: getRandomTemplate(contentTemplates, {}),
            reason: "【ポイント】10kcal程度の差は、日常生活のちょっとした動きで消えてしまう誤差です。気にしすぎることの方がストレス（＝ダイエットの敵）になります。"
        });
    }

    // 2. Protein check (Muscle/Metabolism)
    const proteinDiff = foodA.protein - foodB.protein;
    const proteinThreshold = 2;

    if (Math.abs(proteinDiff) > proteinThreshold) {
        const winner = proteinDiff > 0 ? foodA : foodB;
        const diff = Math.abs(proteinDiff).toFixed(1);

        const titleTemplates = [
            `燃える体へ: 『{name}』`,
            `美ボディの源: 『{name}』`,
            `食べる美容液: 『{name}』`,
        ];
        const contentTemplates = [
            `タンパク質は、あなたの体を内側から引き締める最重要パーツです。(+{diff}g)`,
            `『{name}』を食べることは、基礎代謝という「何もしなくても痩せるエンジン」を大きくすることに繋がります。(+{diff}g)`,
            `肌、髪、爪、そしてメリハリのあるスタイル。美しさの材料補給なら間違いなくこちらです。(+{diff}g)`,
        ];

        judgments.push({
            badge: "💪 体作り",
            title: getRandomTemplate(titleTemplates, { name: winner.name }),
            content: getRandomTemplate(contentTemplates, { name: winner.name, diff }),
            reason: "【ポイント】タンパク質は筋肉の材料になるだけでなく、消化・吸収するだけで多くの熱（カロリー）を消費します。「食べて痩せる」を実現するための鍵となる栄養素です。"
        });
        if (proteinDiff > 0) scoreA += 2; else scoreB += 2;
    }

    // 3. Fiber check (Gut/Health)
    const fiberDiff = foodA.fiber - foodB.fiber;
    if (Math.abs(fiberDiff) > 0.5) {
        const winner = fiberDiff > 0 ? foodA : foodB;
        const diff = Math.abs(fiberDiff).toFixed(1);

        const titleTemplates = [
            `体内クリーニング: 『{name}』`,
            `メンタルも整う: 『{name}』`,
            `痩せ体質スイッチ: 『{name}』`,
        ];
        const contentTemplates = [
            `食物繊維は、体内の余分なものを吸着して外に出してくれる「天然の掃除機」です。(+{diff}g)`,
            `『{name}』は、血糖値のジェットコースターを防ぎ、食後の眠気やイライラからあなたを守ります。(+{diff}g)`,
            `腸は「第2の脳」。ここを整えることは、ダイエットだけでなく、日々の幸福感にも直結します。(+{diff}g)`,
        ];

        judgments.push({
            badge: "🌿 体内浄化",
            title: getRandomTemplate(titleTemplates, { name: winner.name }),
            content: getRandomTemplate(contentTemplates, { name: winner.name, diff }),
            reason: "【ポイント】食物繊維が不足すると、どれだけ良いものを食べても栄養が正しく吸収されず、老廃物が溜まります。内側からキレイになるための土台作りにおいて、これほど重要なものはありません。"
        });
        if (fiberDiff > 0) scoreA++; else scoreB++;
    }

    // 4. Carb check (Energy/LowCarb)
    const carbDiff = foodA.carbs - foodB.carbs;
    if (Math.abs(carbDiff) > 10) {
        const lowCarbWindow = carbDiff < 0 ? foodA : foodB;
        const highCarbWindow = carbDiff < 0 ? foodB : foodA;
        const diff = Math.abs(carbDiff).toFixed(1);

        const contentTemplates = [
            `体を絞る『{lowName}』、心を動かす『{highName}』。今のあなたに必要なのはどっち？(-{diff}g差)`,
            `『{lowName}』は静かな休息。『{highName}』は情熱の炎。目的に合わせて使い分けるのが大人の嗜みです。`,
            `OFFモードなら『{lowName}』、ONモードなら『{highName}』。タイミングさえ間違わなければ、どちらも正義です。`,
        ];

        judgments.push({
            badge: "🔋 エネルギー選択",
            title: `静と動のエネルギー`,
            content: getRandomTemplate(contentTemplates, { lowName: lowCarbWindow.name, highName: highCarbWindow.name, diff }),
            reason: "【ポイント】炭水化物は車のガソリンと同じ。走る前（活動前）には必要ですが、駐車中（休息時）に入れすぎれば溢れてしまいます。あなたの「今の活動量」に合わせて選ぶのが正解です。"
        });
    }

    let winner: Winner = 'Draw';
    if (scoreA > scoreB) winner = 'A';
    else if (scoreB > scoreA) winner = 'B';
    else {
        // Tie-breaker
        if (Math.abs(calDiff) > calorieThreshold) {
            winner = calDiff < 0 ? 'A' : 'B';
            judgments.push({
                badge: "⚖️ 最終決断",
                title: "迷った時の道しるべ",
                content: "総合的な健康度は互角でしたが、もし「今の自分を変えたい」と願うなら、より身軽になれるこちらをお勧めします。",
                reason: "【ポイント】大きな差がない時こそ、基本に立ち返りましょう。「カロリー」という最もシンプルな指標が、あなたの背中を押してくれます。"
            });
        }
    }

    if (judgments.length === 0) {
        judgments.push({
            badge: "⚖️ 完璧な均衡",
            title: "どちらも素晴らしい",
            content: "まるで双子のように似ています。栄養成分ではなく、今の気分や「食べたい！」という直感に従って選んでください。",
            reason: "【ポイント】ここまで栄養バランスが近いと、どちらを選んでも体への影響は変わりません。ストレスなく、美味しく食べられる方を選ぶのが一番の栄養です。"
        });
    }

    return { winner, judgments };
}
