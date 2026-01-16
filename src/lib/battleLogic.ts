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

export function judgeBattle(foodA: FoodItem, foodB: FoodItem): BattleResult {
    const judgments: Judgment[] = [];
    let scoreA = 0;
    let scoreB = 0;

    // 1. Calorie check (Diet)
    const calDiff = foodA.calories - foodB.calories;
    const calorieThreshold = 10; // Stricter threshold (was 30)

    if (Math.abs(calDiff) > calorieThreshold) {
        const winner = calDiff < 0 ? foodA : foodB;
        const diff = Math.abs(calDiff);

        judgments.push({
            badge: "🔥 ダイエット",
            title: `カロリー密度対決: 『${winner.name}』の勝利`,
            content: `重量あたりのカロリーが低く、同じ量を食べても太りにくいのはこちらです。(-${diff}kcal)`,
            reason: "【判定の根拠】摂取カロリー < 消費カロリーが減量の基本原則です。カロリー密度の低い食品を選ぶことで、満腹感を維持しながら総摂取エネルギーを抑制できるため、ダイエットにおいて有利と判定されました。"
        });
        if (calDiff < 0) scoreA += 2; else scoreB += 2; // Increased weight
    } else {
        judgments.push({
            badge: "🤝 ダイエット",
            title: "カロリー: 互角",
            content: "どちらを選んでも摂取エネルギーに大差はありません。",
            reason: "【判定の根拠】カロリー差が僅差(10kcal/100g未満)のため、誤差範囲内です。"
        });
    }

    // 2. Protein check (Muscle)
    const proteinDiff = foodA.protein - foodB.protein;
    const proteinThreshold = 2; // Stricter threshold (was 5)

    if (Math.abs(proteinDiff) > proteinThreshold) {
        const winner = proteinDiff > 0 ? foodA : foodB;
        const diff = Math.abs(proteinDiff).toFixed(1);

        judgments.push({
            badge: "💪 筋肥大",
            title: `タンパク質含有量: 『${winner.name}』の勝利`,
            content: `筋肉の材料となるタンパク質が豊富に含まれています。(+${diff}g)。`,
            reason: "【判定の根拠】筋タンパク質合成（MPS）を活性化させるには、血中アミノ酸濃度を十分に高める必要があります。より多くのタンパク質を含む食品は、このアナボリック反応を強く引き起こすため、筋肥大に有利と判定されました。"
        });
        if (proteinDiff > 0) scoreA += 2; else scoreB += 2;
    }

    // 3. Fiber check (Gut Health)
    const fiberDiff = foodA.fiber - foodB.fiber;
    if (Math.abs(fiberDiff) > 0.5) { // Stricter threshold (was 1)
        const winner = fiberDiff > 0 ? foodA : foodB;
        const diff = Math.abs(fiberDiff).toFixed(1);

        judgments.push({
            badge: "🌾 腸内環境",
            title: `食物繊維: 『${winner.name}』が優秀`,
            content: `豊富な食物繊維が、血糖値の急上昇を抑え、腹持ちを良くしてくれます。(+${diff}g)`,
            reason: "【判定の根拠】食物繊維は腸内細菌の餌となり短鎖脂肪酸を産生させるほか、物理的に胃内滞留時間を延ばす効果があります。これによりインスリン過剰分泌を防ぎ、脂肪蓄積リスクを低減できるため高評価となりました。"
        });
        if (fiberDiff > 0) scoreA++; else scoreB++;
    }

    // 4. Carb check (Energy/LowCarb)
    const carbDiff = foodA.carbs - foodB.carbs;
    if (Math.abs(carbDiff) > 10) {
        const lowCarbWindow = carbDiff < 0 ? foodA : foodB;
        const highCarbWindow = carbDiff < 0 ? foodB : foodA;
        const diff = Math.abs(carbDiff).toFixed(1);

        judgments.push({
            badge: "🔋 エネルギー",
            title: `糖質制限 vs エネルギー補給`,
            content: `糖質制限中なら『${lowCarbWindow.name}』(-${diff}g)。逆に運動前のエネルギー充填なら『${highCarbWindow.name}』が適正です。`,
            reason: "【判定の根拠】炭水化物（グリコーゲン）は活動の主要エネルギー源ですが、過剰分は中性脂肪に変換されます。目的に応じて「制限」か「充填」か、評価軸が反転するため、両方の側面から判定を行いました。"
        });
    }

    let winner: Winner = 'Draw';
    if (scoreA > scoreB) winner = 'A';
    if (scoreB > scoreA) winner = 'B';

    if (judgments.length === 0) {
        judgments.push({
            badge: "⚖️ ドロー",
            title: "判定不能",
            content: "どちらも栄養バランスが非常に似通っています。",
            reason: "【判定の根拠】主要栄養素（PFC+食物繊維）において有意な差が検出されませんでした。"
        });
    }

    return { winner, judgments };
}
