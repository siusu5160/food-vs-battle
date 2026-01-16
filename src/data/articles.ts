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
    },
    {
        slug: 'protein-bar-comparison',
        title: {
            ja: '【徹底比較】コンビニで買えるプロテインバー、最強はどれだ！？',
            en: '[Comparison] Which is the strongest Utility Bar you can buy at convenience stores!?'
        },
        emoji: '🍫',
        excerpt: {
            ja: '一本満足バー、INバー、マツキヨ...人気プロテインバーを「タンパク質量」「コスパ」「味」でガチ格付けしました。',
            en: 'Satisfied Bar, IN Bar, Matsukiyo... We rated popular protein bars by "Protein Content", "Cost Performance", and "Taste".'
        },
        date: '2025-01-17',
        tags: {
            ja: ['比較', 'プロテイン', 'おやつ'],
            en: ['Comparison', 'Protein', 'Snack']
        },
        content: {
            ja: `
            <h2>いつでもどこでもタンパク質チャージ！</h2>
            <p>手軽にタンパク質を摂取できる「プロテインバー」。種類が多すぎてどれを選べばいいか迷っていませんか？成分と味を徹底調査しました。</p>

            <h3>1. アサヒ「一本満足バー プロテイン」</h3>
            <p><strong>タンパク質：15g / 糖質：11g</strong><br>圧倒的な「お菓子感」。ザクザクした食感で満足度が高いです。ただし、脂質がやや高めなので食べ過ぎ注意！</p>
            
            <h3>2. 森永製菓「inバー プロテイン ベイクドチョコ」</h3>
            <p><strong>タンパク質：15g / 糖質：11.1g</strong><br>溶けにくいので夏場の持ち歩きに最適。甘さ控えめでビターな味わいは、コーヒーとの相性が抜群です。</p>

            <h3>3. マツモトキヨシ「matsukiyo LAB プロテインバー」</h3>
            <p><strong>タンパク質：15g / 価格：約150円</strong><br>隠れた名品。コスパ最強です。味もストロベリーやチョコなど豊富で、毎日続けても飽きません。</p>

            <h3>結論</h3>
            <p>迷ったら「一本満足バー」が間違いなし。コスパ重視なら「マツキヨ」。シーンに合わせて使い分けましょう！</p>
        `,
            en: `
            <h2>Charge protein anytime, anywhere!</h2>
            <p>"Protein bars" allow you to easily intake protein. Are you lost on which one to choose because there are too many types? We thoroughly investigated ingredients and taste.</p>

            <h3>1. Asahi "Ippon Manzoku Bar Protein"</h3>
            <p><strong>Protein: 15g / Carbs: 11g</strong><br>Overwhelming "snack feeling". The crunchy texture gives high satisfaction. However, be careful not to overeat as the fat content is slightly high!</p>
            
            <h3>2. Morinaga "in Bar Protein Baked Choco"</h3>
            <p><strong>Protein: 15g / Carbs: 11.1g</strong><br>Perfect for carrying around in summer as it doesn't melt easily. The modest sweetness and bitter taste go perfectly with coffee.</p>

            <h3>3. Matsumotokiyoshi "matsukiyo LAB Protein Bar"</h3>
            <p><strong>Protein: 15g / Price: approx. 150 yen</strong><br>A hidden masterpiece. Best cost performance. Flavors like strawberry and chocolate are abundant, so you won't get bored even if you eat it every day.</p>

            <h3>Conclusion</h3>
            <p>If you are unsure, "Ippon Manzoku Bar" is a sure bet. If you value cost performance, "Matsukiyo". Let's use them according to the scene!</p>
        `
        }
    },
    {
        slug: 'izakaya-diet-menu',
        title: {
            ja: 'ダイエット中でも安心！太らない居酒屋メニューの選び方',
            en: 'Safe even during a diet! How to choose non-fattening Izakaya menu'
        },
        emoji: '🍺',
        excerpt: {
            ja: '飲み会を断る必要はありません。「何を食べるか」を知っていれば、居酒屋はダイエットの味方になります。',
            en: 'No need to refuse drinking parties. If you know "what to eat", Izakaya becomes a diet ally.'
        },
        date: '2025-01-17',
        tags: {
            ja: ['居酒屋', 'ダイエット', 'お酒'],
            en: ['Izakaya', 'Diet', 'Alcohol']
        },
        content: {
            ja: `
            <h2>「とりあえず唐揚げ」は卒業しよう</h2>
            <p>楽しい飲み会、ついつい揚げ物や締めのご飯を食べ過ぎていませんか？注文のセンスを変えるだけで、翌日の罪悪感はゼロになります。</p>

            <h3>最初のオーダー：食物繊維とタンパク質</h3>
            <ul>
                <li><strong>枝豆</strong>：高タンパクで代謝を助けるビタミンB1が豊富。</li>
                <li><strong>冷奴</strong>：低カロリーでお腹にたまります。</li>
                <li><strong>刺身盛り合わせ</strong>：良質な脂質のみ。醤油のつけすぎに注意！</li>
            </ul>

            <h3>中盤：焼き物を中心に</h3>
            <p>焼き鳥（塩）、ホッケの開き、焼きイカなどがおすすめ。油を使わない調理法を選びましょう。</p>
            
            <h3>お酒の選び方</h3>
            <p>「ビール」は最初の一杯だけ。2杯目からは糖質の少ない「ハイボール」「焼酎（水割り・お茶割り）」「赤ワイン」に切り替えましょう。</p>

            <h3>NGメニュー</h3>
            <p>ポテトフライ、シーザーサラダ（ドレッシングが高カロリー）、ピザ、締めのラーメン。</p>
        `,
            en: `
            <h2>Let's graduate from "Fried Chicken for now"</h2>
            <p>Fun drinking party, do you end up eating too much fried food and finishing rice? Just changing your order sense will make tomorrow's guilt zero.</p>

            <h3>First Order: Dietary Fiber and Protein</h3>
            <ul>
                <li><strong>Edamame</strong>: High protein and rich in Vitamin B1 which helps metabolism.</li>
                <li><strong>Hiyayakko (Cold Tofu)</strong>: Low calorie and fills your stomach.</li>
                <li><strong>Sashimi Assortment</strong>: Only good quality fat. Be careful not to use too much soy sauce!</li>
            </ul>

            <h3>Middle Stage: Focus on Grilled Items</h3>
            <p>Yakitori (Salt), Grilled Atka Mackerel, Grilled Squid are recommended. Choose cooking methods that do not use oil.</p>
            
            <h3>How to choose Alcohol</h3>
            <p>"Beer" for the first glass only. From the second glass, switch to "Highball", "Shochu (Water/Tea split)", "Red Wine" which have less sugar.</p>

            <h3>NG Menu</h3>
            <p>French fries, Caesar salad (high calorie dressing), Pizza, Ramen to finish.</p>
        `
        }
    },
    {
        slug: 'late-night-snack-ranking',
        title: {
            ja: '夜中に食べても許される！罪悪感ゼロの夜食ベスト5',
            en: 'Permissible even in the middle of the night! Top 5 guilt-free late night snacks'
        },
        emoji: '🌙',
        excerpt: {
            ja: 'お腹が空いて眠れない...そんな時の救世主。200kcal以下で満足感のある最強の夜食を紹介します。',
            en: 'Hungry and can\'t sleep... Savior for such times. Introducing the strongest late night snacks with satisfaction under 200kcal.'
        },
        date: '2025-01-17',
        tags: {
            ja: ['夜食', 'ダイエット', 'ランキング'],
            en: ['Late Night Snack', 'Diet', 'Ranking']
        },
        content: {
            ja: `
            <h2>空腹を我慢してストレスを溜めるのは逆効果！</h2>
            <p>「夜食べると太る」は真実ですが、空腹で眠りの質が下がるのもダイエットには悪影響。ポイントは「消化の良さ」と「温かさ」です。</p>

            <h3>第1位：お茶漬け（ご飯少なめ）</h3>
            <p>水分で満腹感が得られ、体も温まります。ご飯を半分にして、豆腐やこんにゃく米を混ぜるとなお良し！</p>

            <h3>第2位：ギリシャヨーグルト</h3>
            <p>濃厚な食感でスイーツ欲を満たせます。高タンパクなので、就寝中の筋肉修復にも役立ちます。</p>

            <h3>第3位：春雨スープ</h3>
            <p>麺を食べている感覚があり、満足度が高いです。市販のカップスープならカロリー計算も楽チン。</p>

            <h3>第4位：ゆで卵</h3>
            <p>手軽さNo.1。消化に少し時間がかかりますが、良質なタンパク源です。</p>

            <h3>第5位：ホットミルク</h3>
            <p>トリプトファンという成分が安眠をサポート。ハチミツを少し垂らすとリラックス効果アップ。</p>
        `,
            en: `
            <h2>Enduring hunger and accumulating stress is counterproductive!</h2>
            <p>"Eating at night makes you fat" is true, but poor sleep quality due to hunger is also bad for diet. The points are "Digestibility" and "Warmth".</p>

            <h3>1st Place: Ochazuke (Less Rice)</h3>
            <p>You get a feeling of fullness from moisture, and your body warms up. Even better if you halve the rice and mix tofu or konjac rice!</p>

            <h3>2nd Place: Greek Yogurt</h3>
            <p>Fulfills sweet cravings with rich texture. Since it is high protein, it also helps muscle repair during sleep.</p>

            <h3>3rd Place: Glass Noodle Soup</h3>
            <p>It feels like eating noodles and has high satisfaction. Calorie calculation is easy with commercial cup soup.</p>

            <h3>4th Place: Boiled Egg</h3>
            <p>No.1 for convenience. It takes a little time to digest, but it is a good quality protein source.</p>

            <h3>5th Place: Hot Milk</h3>
            <p>Ingredient called Tryptophan supports good sleep. Adding a little honey increases relaxation effect.</p>
        `
        }
    }
];
