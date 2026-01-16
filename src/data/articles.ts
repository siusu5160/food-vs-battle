export interface Article {
    slug: string;
    title: { ja: string; en: string };
    emoji: string;
    excerpt: { ja: string; en: string };
    content: { ja: string; en: string };
    date: string;
    tags: { ja: string[]; en: string[] };
}

export const ARTICLES: Article[] = [
    {
        slug: 'diet-ranking-convenience-store',
        title: {
            ja: '【2025年版】ダイエット中に選ぶべきコンビニ飯ランキングTOP5！',
            en: '[2025] Top 5 Convenience Store Foods for Diet'
        },
        emoji: '🏪',
        excerpt: {
            ja: '「ダイエット中だけどコンビニで済ませたい...」そんなあなた必見！高タンパク・低脂質な神商品を厳選しました。',
            en: 'Must-see for dieters who want to eat at convenience stores! Carefully selected high-protein, low-fat divine products.'
        },
        date: '2025-01-16',
        tags: {
            ja: ['ダイエット', 'コンビニ', '高タンパク'],
            en: ['Diet', 'Convenience Store', 'High Protein']
        },
        content: {
            ja: `
            <h2>ダイエットの味方！コンビニ飯の進化が止まらない</h2>
            <p>最近のコンビニは、ダイエッターにとって天国のような場所になっています。「サラダチキン」だけじゃない！美味しくて痩せる神商品を紹介します。</p>

            <h3>第1位：セブンイレブン「タンパク質が摂れる鶏むね肉のサラダ」</h3>
            <p>もはや定番ですが、これ一つでタンパク質が20g以上摂れるのは驚異的。ドレッシングをノンオイルにすれば最強です。</p>
            
            <h3>第2位：ローソン「ブランパン」シリーズ</h3>
            <p>糖質制限の強い味方。食物繊維も豊富で、パンを食べたい欲求を罪悪感なく満たしてくれます。</p>

            <h3>第3位：ファミリーマート「お母さん食堂」焼き魚シリーズ</h3>
            <p>焼き魚は準備が面倒ですが、コンビニならレンジでチンするだけ。良質な脂質（オメガ3）が摂取できます。</p>

            <h3>選び方のポイント</h3>
            <ul>
                <li><strong>裏面の成分表示を見るクセをつける</strong>：特に「タンパク質(P)」と「脂質(F)」のバランスをチェック！</li>
                <li><strong>汁物をプラスする</strong>：味噌汁やスープを追加することで満腹感がアップします。</li>
            </ul>
        `,
            en: `
            <h2>Diet's Ally! The Evolution of Convenience Store Food</h2>
            <p>Recent convenience stores have become like heaven for dieters. Not just "Salad Chicken"! Introducing delicious and slimming divine products.</p>

            <h3>1st Place: 7-Eleven "Chicken Breast Salad with Protein"</h3>
            <p>It's a classic now, but getting over 20g of protein in one meal is amazing. It's strongest if you use non-oil dressing.</p>
            
            <h3>2nd Place: Lawson "Bran Bread" Series</h3>
            <p>A strong ally for low-carb diets. Rich in dietary fiber, it satisfies your desire to eat bread without guilt.</p>

            <h3>3rd Place: FamilyMart "Mother's Kitchen" Grilled Fish Series</h3>
            <p>Grilled fish is troublesome to prepare, but at a convenience store, just microwave it. You can get good quality fat (Omega 3).</p>

            <h3>Points for Choosing</h3>
            <ul>
                <li><strong>Habit of checking the nutrition label on the back</strong>: Especially check the balance of "Protein (P)" and "Fat (F)"!</li>
                <li><strong>Add soup</strong>: Adding miso soup or soup increases satiety.</li>
            </ul>
        `
        }
    },
    {
        slug: 'ramen-vs-udon-calories',
        title: {
            ja: 'ラーメンvsうどん、どっちが太る？徹底比較！',
            en: 'Ramen vs Udon, Which is more fattening? Thorough Comparison!'
        },
        emoji: '🍜',
        excerpt: {
            ja: '国民的麺類対決！カロリー、糖質、GI値...あらゆる角度から「太りやすさ」を検証しました。',
            en: 'National noodle showdown! We verified "fattening potential" from all angles: calories, carbs, GI value...'
        },
        date: '2025-01-15',
        tags: {
            ja: ['比較', 'ダイエット', '麺類'],
            en: ['Comparison', 'Diet', 'Noodles']
        },
        content: {
            ja: `
            <h2>結論：意外にも〇〇の方が太りにくい！？</h2>
            <p>「ラーメンは太る」「うどんはヘルシー」そんなイメージありませんか？実は、食べ方次第でその常識は覆ります。</p>

            <h3>基本スペックの比較</h3>
            <p>1食あたりのカロリーを見ると、一般的には<strong>うどんの方が低い</strong>傾向にあります。ラーメンはスープの脂質が高いためです。</p>

            <h3>GI値（血糖値の上昇しやすさ）の罠</h3>
            <p>しかし、うどんは小麦粉の塊。GI値は比較的高めです。一方、豚骨ラーメンなどは脂質が血糖値の上昇を緩やかにする効果も...（※だからと言って食べていいわけではありません！）</p>

            <h3>太らない食べ方のコツ</h3>
            <ul>
                <li><strong>うどん</strong>：天ぷらを乗せすぎない。卵やワカメをトッピングしてタンパク質と食物繊維をプラス。</li>
                <li><strong>ラーメン</strong>：スープは飲み干さない（塩分・脂質カット）。野菜マシマシにする。</li>
            </ul>
        `,
            en: `
            <h2>Conclusion: Surprisingly, XX is less fattening!?</h2>
            <p>"Ramen is fattening", "Udon is healthy". Do you have that image? Actually, depending on how you eat, that common sense is overturned.</p>

            <h3>Comparison of Basic Specs</h3>
            <p>Looking at calories per serving, generally <strong>Udon is lower</strong>. This is because Ramen soup is high in fat.</p>

            <h3>The Trap of GI Value (Ease of Blood Sugar Rise)</h3>
            <p>However, Udon is a lump of wheat flour. The GI value is relatively high. On the other hand, Tonkotsu Ramen etc. have the effect of fat slowing down the rise in blood sugar... (*That doesn't mean you can eat it freely!)</p>

            <h3>Tips for Not Getting Fat</h3>
            <ul>
                <li><strong>Udon</strong>: Don't put too much tempura. Top with egg or seaweed to add protein and dietary fiber.</li>
                <li><strong>Ramen</strong>: Don't drink up the soup (cut salt and fat). Add lots of vegetables.</li>
            </ul>
        `
        }
    },
    {
        slug: 'muscle-building-foods',
        title: {
            ja: '筋肉をつけたいならこれを食え！最強食材リスト',
            en: 'If you want to build muscle, eat this! Strongest Food List'
        },
        emoji: '💪',
        excerpt: {
            ja: '効率よく筋肉をつけるための「アナボリック食材」を紹介。トレーニング効果を最大化させましょう。',
            en: 'Introducing "anabolic foods" for efficiently building muscle. Maximize your training effects.'
        },
        date: '2025-01-14',
        tags: {
            ja: ['筋トレ', 'バルクアップ', '食事'],
            en: ['Muscle Training', 'Bulk Up', 'Meal']
        },
        content: {
            ja: `
            <h2>トレーニングだけでは筋肉はつかない</h2>
            <p>「筋肉はキッチンで作られる」という言葉をご存知ですか？ハードなトレーニングも、適切な栄養摂取がなければ無駄になってしまいます。</p>

            <h3>1. 卵（全卵）</h3>
            <p>「アミノ酸スコア100」の完全栄養食。黄身に含まれるコレステロールも、テストステロン（筋肉を作るホルモン）の原料になるため重要です。</p>

            <h3>2. 牛赤身肉</h3>
            <p>クレアチン、亜鉛、ビタミンB群が豊富。筋肉の爆発的なエネルギー源になります。</p>

            <h3>3. ブロッコリー</h3>
            <p>野菜界のプロテイン。インドール-3-カルビノールという成分が、女性ホルモン（エストロゲン）の作用を抑え、筋肉を作りやすい環境を整えます。</p>

            <h3>タイミングも重要</h3>
            <p>トレーニング後30分以内の「ゴールデンタイム」には、吸収の速いホエイプロテインと、インスリンを分泌させるための糖質（おにぎりや和菓子）を摂りましょう。</p>
        `,
            en: `
            <h2>Muscles aren't built by training alone</h2>
            <p>Do you know the saying "Abs are made in the kitchen"? Even hard training is wasted without proper nutrition intake.</p>

            <h3>1. Egg (Whole Egg)</h3>
            <p>Check "Amino Acid Score 100" complete nutritious food. Cholesterol in yolk is also important as raw material for testosterone (hormone that makes muscle).</p>

            <h3>2. Lean Beef</h3>
            <p>Rich in creatine, zinc, and vitamin B group. It becomes an explosive energy source for muscles.</p>

            <h3>3. Broccoli</h3>
            <p>Protein of the vegetable world. An ingredient called Indole-3-carbinol suppresses the action of female hormones (estrogen) and prepares an environment where it is easy to build muscle.</p>

            <h3>Timing is also important</h3>
            <p>In the "Golden Time" within 30 minutes after training, let's take fast-absorbing whey protein and carbohydrates (rice balls or Japanese sweets) to secrete insulin.</p>
        `
        }
    }
];
