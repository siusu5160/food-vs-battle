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
    },
    {
        slug: 'coffee-vs-tea',
        title: {
            ja: 'コーヒー派？紅茶派？どちらが健康に良いか対決！',
            en: 'Coffee vs Tea? Battle for Health Benefits!'
        },
        emoji: '☕',
        excerpt: {
            ja: '毎日のカフェイン摂取、どっちが正解？集中力アップのコーヒー、リラックスの紅茶。それぞれのメリットを比較しました。',
            en: 'Daily caffeine intake, which is the right answer? Coffee for concentration, Tea for relaxation. We compared their benefits.'
        },
        date: '2025-01-20',
        tags: {
            ja: ['比較', '健康', '飲み物'],
            en: ['Comparison', 'Health', 'Drink']
        },
        content: {
            ja: `
            <h2>朝の一杯、どちらを選びますか？</h2>
            <p>世界中で愛される2大飲料。どちらにも素晴らしい健康効果がありますが、目的によって飲み分けるのが賢い選択です。</p>

            <h3>コーヒーのメリット：集中力と代謝アップ</h3>
            <p>コーヒーに含まれるクロロゲン酸は脂肪燃焼を助けると言われています。また、強力な覚醒作用があるため、朝の目覚めや仕事前のブーストに最適です。</p>

            <h3>紅茶のメリット：リラックスと美肌</h3>
            <p>紅茶のテアニンにはリラックス効果があります。また、紅茶カテキンには抗酸化作用があり、老化防止や風邪予防にも役立ちます。</p>

            <h3>カフェイン量の比較</h3>
            <p>一般的に、同じ量ならコーヒーの方がカフェインが多いです。「今日は気合を入れたい」ならコーヒー、「午後のひととき」なら紅茶がおすすめです。</p>
            `,
            en: `
            <h2>Which do you choose for your morning cup?</h2>
            <p>Two major beverages loved all over the world. Both have wonderful health benefits, but choosing wisely according to your purpose is smart.</p>

            <h3>Benefits of Coffee: Concentration and Metabolism Boost</h3>
            <p>Chlorogenic acid contained in coffee is said to help burn fat. Also, because it has a strong awakening effect, it is ideal for waking up in the morning or boosting before work.</p>

            <h3>Benefits of Tea: Relaxation and Beautiful Skin</h3>
            <p>Theanine in tea has a relaxing effect. Also, tea catechins have antioxidant effects and are useful for anti-aging and preventing colds.</p>

            <h3>Comparison of Caffeine Content</h3>
            <p>Generally, coffee has more caffeine for the same amount. If you want to "get fired up today", coffee is recommended, and if it's "afternoon tea time", tea is recommended.</p>
            `
        }
    },
    {
        slug: 'white-rice-vs-brown-rice',
        title: {
            ja: '白米 vs 玄米！ダイエット中に食べるならどっち？',
            en: 'White Rice vs Brown Rice! Which should you eat while dieting?'
        },
        emoji: '🍚',
        excerpt: {
            ja: '「白米は太る」は本当？玄米の栄養価は？GI値の違いから、あなたに合ったお米の選び方を解説します。',
            en: 'Is "White rice makes you fat" true? What is the nutritional value of brown rice? We explain how to choose the right rice for you from the difference in GI values.'
        },
        date: '2025-01-19',
        tags: {
            ja: ['ダイエット', '糖質制限', '主食'],
            en: ['Diet', 'Low Carb', 'Staple Food']
        },
        content: {
            ja: `
            <h2>やっぱり白米が好き！でも太る？</h2>
            <p>日本人のソウルフード、白米。しかしダイエットの敵とされることも多いです。玄米に変えるだけで本当に痩せるのでしょうか？</p>

            <h3>GI値の違いが鍵</h3>
            <p>白米はGI値が高く、血糖値が急上昇しやすい（＝脂肪になりやすい）です。一方、玄米は食物繊維の殻があるため消化吸収がゆっくりで、GI値が低いです。</p>

            <h3>栄養価の差は歴然</h3>
            <p>玄米には、白米の数倍のビタミンB群やミネラル、食物繊維が含まれています。代謝を助けるビタミンB1が豊富なのも、ダイエット向きと言われる理由です。</p>

            <h3>白米派へのアドバイス</h3>
            <p>無理に玄米にする必要はありません。「冷やご飯」にして食べることで、デンプンが「レジスタントスターチ」に変わり、カロリー吸収が抑えられます。おにぎりは最強のダイエット食かも？</p>
            `,
            en: `
            <h2>I love white rice after all! But does it make me fat?</h2>
            <p>Japanese soul food, white rice. However, it is often seen as an enemy of dieting. Will you really lose weight just by changing to brown rice?</p>

            <h3>The difference in GI value is the key</h3>
            <p>White rice has a high GI value, and blood sugar levels rise sharply (= easy to become fat). On the other hand, brown rice has a dietary fiber shell, so digestion and absorption are slow, and the GI value is low.</p>

            <h3>The difference in nutritional value is obvious</h3>
            <p>Brown rice contains several times more Vitamin B group, minerals, and dietary fiber than white rice. Being rich in Vitamin B1, which helps metabolism, is also why it is said to be suitable for dieting.</p>

            <h3>Advice for White Rice Lovers</h3>
            <p>You don't have to force yourself to eat brown rice. By eating it as "cold rice", starch changes to "resistant starch", and calorie absorption is suppressed. Onigiri might be the strongest diet food?</p>
            `
        }
    },
    {
        slug: 'banana-benefits',
        title: {
            ja: '1日1本のバナナが体を変える！驚くべき健康効果',
            en: 'One banana a day changes your body! Amazing health benefits'
        },
        emoji: '🍌',
        excerpt: {
            ja: '安くて手軽なスーパーフード、バナナ。筋トレ前のエネルギー補給や、むくみ解消に効果的な理由とは？',
            en: 'Cheap and easy superfood, banana. Why is it effective for energy supply before muscle training and eliminating swelling?'
        },
        date: '2025-01-19',
        tags: {
            ja: ['フルーツ', '健康', '筋トレ'],
            en: ['Fruit', 'Health', 'Muscle Training']
        },
        content: {
            ja: `
            <h2>アスリートがバナナを食べる理由</h2>
            <p>スポーツ選手が試合の合間にバナナを食べているのを見たことがありませんか？あれには科学的な理由があります。</p>

            <h3>即効性と持続性のあるエネルギー</h3>
            <p>バナナには吸収速度の違う数種類の糖質が含まれています。食べてすぐパワーになり、かつ長持ちする。まさに天然のエナジードリンクです。</p>

            <h3>カリウムでむくみ撃退</h3>
            <p>現代人は塩分を摂りすぎがち。バナナに豊富なカリウムは、余分な塩分を排出してくれるため、足のむくみや高血圧予防にも効果的です。</p>

            <h3>幸福ホルモン「セロトニン」</h3>
            <p>バナナにはセロトニンの材料となるトリプトファンが含まれています。朝にバナナを食べて、ハッピーな1日をスタートさせましょう。</p>
            `,
            en: `
            <h2>Why athletes eat bananas</h2>
            <p>Have you ever seen athletes eating bananas during matches? There is a scientific reason for that.</p>

            <h3>Immediate and lasting energy</h3>
            <p>Bananas contain several types of carbohydrates with different absorption rates. It becomes power immediately after eating and lasts long. It is truly a natural energy drink.</p>

            <h3>Fight swelling with Potassium</h3>
            <p>Modern people tend to intake too much salt. Potassium, which is abundant in bananas, discharges excess salt, so it is also effective for leg swelling and preventing high blood pressure.</p>

            <h3>Happiness hormone "Serotonin"</h3>
            <p>Bananas contain tryptophan, which is the material for serotonin. Eat a banana in the morning to start a happy day.</p>
            `
        }
    },
    {
        slug: 'nuts-diet',
        title: {
            ja: '「脂質が高いから太る」は嘘？ナッツがダイエットに最強な理由',
            en: 'Is "High fat makes you fat" a lie? Why nuts are strongest for diet'
        },
        emoji: '🥜',
        excerpt: {
            ja: 'アーモンド、くるみ、カシューナッツ...。高カロリーなのに痩せる「魔法の間食」の選び方と食べ方。',
            en: 'Almonds, walnuts, cashews... How to choose and eat "magical snacks" that help you lose weight despite being high calorie.'
        },
        date: '2025-01-18',
        tags: {
            ja: ['ダイエット', 'おやつ', '美容'],
            en: ['Diet', 'Snack', 'Beauty']
        },
        content: {
            ja: `
            <h2>良質な脂質は味方です</h2>
            <p>「ナッツはカロリーが高いから...」と敬遠していませんか？実は、ナッツの脂質は体に蓄積されにくい「不飽和脂肪酸」が中心です。</p>

            <h3>アーモンド：若返りのビタミン</h3>
            <p>ビタミンEが豊富で、強力な抗酸化作用があります。肌のターンオーバーを整えたり、血行を良くする効果が期待できます。</p>

            <h3>くるみ：脳の栄養素</h3>
            <p>青魚と同じオメガ3脂肪酸（α-リノレン酸）を多く含みます。血液をサラサラにし、集中力を高める効果があります。</p>

            <h3>食べ方のルール</h3>
            <ul>
                <li><strong>1日25gまで</strong>：手のひらに軽く一杯分が目安です。</li>
                <li><strong>素焼き・無塩を選ぶ</strong>：おつまみ用の揚げたナッツはNG！</li>
                <li><strong>食前に食べる</strong>：血糖値の急上昇を抑えてくれます。</li>
            </ul>
            `,
            en: `
            <h2>Good quality fat is your ally</h2>
            <p>Are you avoiding nuts saying "Because nuts are high calorie..."? Actually, nut fats are centered on "unsaturated fatty acids" that are hard to accumulate in the body.</p>

            <h3>Almond: Vitamin of Rejuvenation</h3>
            <p>Rich in Vitamin E and has strong antioxidant effects. Benefits like adjusting skin turnover and improving blood circulation can be expected.</p>

            <h3>Walnut: Brain Nutrients</h3>
            <p>Contains a lot of Omega-3 fatty acids (alpha-linolenic acid), same as blue fish. It has the effect of making blood smooth and improving concentration.</p>

            <h3>Rules for Eating</h3>
            <ul>
                <li><strong>Up to 25g per day</strong>: About a handful is the guide.</li>
                <li><strong>Choose Roasted/Unsalted</strong>: Fried nuts for snacks are NG!</li>
                <li><strong>Eat before meals</strong>: It suppresses the sudden rise in blood sugar.</li>
            </ul>
            `
        }
    },
    {
        slug: 'hydration-importance',
        title: {
            ja: '「水2リットル」の真実。水を飲むだけで痩せるって本当？',
            en: 'The truth about "2 liters of water". Is it true you lose weight just by drinking water?'
        },
        emoji: '💧',
        excerpt: {
            ja: 'モデルが水をたくさん飲むのには理由がある。代謝アップ、デトックス、食欲抑制...水のパワーを解説。',
            en: 'There is a reason why models drink a lot of water. Metabolism boost, detox, appetite suppression... Explaining the power of water.'
        },
        date: '2025-01-18',
        tags: {
            ja: ['ダイエット', '健康', 'デトックス'],
            en: ['Diet', 'Health', 'Detox']
        },
        content: {
            ja: `
            <h2>身体の60%は水分です</h2>
            <p>水分不足は代謝の低下を招き、太りやすい体質を作ります。逆に、適切に水を飲めば「痩せ体質」に近づけます。</p>

            <h3>代謝が上がる</h3>
            <p>水を飲むと体温が少し下がり、体は体温を戻そうとしてエネルギーを使います。また、血流が良くなることで細胞の働きが活発になります。</p>

            <h3>偽の空腹に騙されないで</h3>
            <p>「お腹すいた...」それ、実は喉が乾いているだけかも？脳は空腹と渇きを混同しやすいです。間食する前にコップ一杯の水を飲みましょう。</p>

            <h3>正しい飲み方</h3>
            <p>一気に飲むのはNG。コップ1杯（200ml）を、起床時・食事前・入浴前後など、こまめに分けて飲みましょう。冷水より常温水がおすすめです。</p>
            `,
            en: `
            <h2>60% of the body is water</h2>
            <p>Dehydration leads to a decrease in metabolism and creates a constitution that gains weight easily. Conversely, drinking water properly brings you closer to a "lean constitution".</p>

            <h3>Metabolism increases</h3>
            <p>When you drink water, body temperature drops slightly, and the body uses energy to return the body temperature. Also, blood flow improves and cell activity becomes active.</p>

            <h3>Don't be fooled by fake hunger</h3>
            <p>"I'm hungry..." Is that actually just thirst? The brain easily confuses hunger and thirst. Drink a glass of water before snacking.</p>

            <h3>Correct way to drink</h3>
            <p>Drinking all at once is NG. Drink a cup (200ml) frequently, such as when waking up, before meals, before and after bathing. Room temperature water is recommended over cold water.</p>
            `
        }
    },
    {
        slug: 'avocado-benefits',
        title: {
            ja: '「森のバター」アボカドは食べる美容液！カロリーは無視してOK？',
            en: '"Forest Butter" Avocado is an edible beauty serum! Is it OK to ignore calories?'
        },
        emoji: '🥑',
        excerpt: {
            ja: '世界一栄養価の高い果実、アボカド。高カロリーなのにダイエットや美容に推奨される驚きの理由。',
            en: 'The world\'s most nutritious fruit, avocado. Surprisingly recommended for diet and beauty despite high calories.'
        },
        date: '2025-01-18',
        tags: {
            ja: ['美容', 'スーパーフード', '脂質'],
            en: ['Beauty', 'Superfood', 'Fat']
        },
        content: {
            ja: `
            <h2>脂肪を燃やす脂肪！？</h2>
            <p>アボカド1個で約250kcalとご飯大盛り並み。しかし、アボカドの脂質は「オレイン酸」。悪玉コレステロールを減らし、脂肪をつきにくくする働きがあります。</p>

            <h3>究極のアンチエイジング</h3>
            <p>「若返りのビタミン」と呼ばれるビタミンEが豊富。さらに、グルタチオンという強力な抗酸化物質も含まれており、肝臓のデトックスを助けます。</p>

            <h3>食物繊維の塊</h3>
            <p>実はごぼう並みに食物繊維が豊富。腸内環境を整え、便秘解消に即効性があります。腹持ちも抜群です。</p>

            <h3>注意点</h3>
            <p>体に良いとはいえ、カロリーは本物です。1日半分個を目安に、サラダやトーストに乗せて楽しみましょう。</p>
            `,
            en: `
            <h2>Fat that burns fat!?</h2>
            <p>One avocado is about 250kcal, same as a large bowl of rice. However, avocado fat is "Oleic acid". It works to reduce bad cholesterol and make it difficult to gain fat.</p>

            <h3>Ultimate Anti-Aging</h3>
            <p>Rich in Vitamin E called "Rejuvenation Vitamin". Furthermore, it contains a powerful antioxidant called Glutathione, which helps liver detox.</p>

            <h3>Lump of Dietary Fiber</h3>
            <p>Actually, it is rich in dietary fiber comparable to burdock. It prepares the intestinal environment and has an immediate effect on relieving constipation. Satiety is also outstanding.</p>

            <h3>Caution</h3>
            <p>Even though it is good for the body, the calories are real. Aim for half a piece a day, and enjoy it on salad or toast.</p>
            `
        }
    },
    {
        slug: 'oatmeal-breakfast',
        title: {
            ja: '朝食をオートミールに変えるだけで痩せる？話題の腸活メニュー',
            en: 'Lose weight just by changing breakfast to Oatmeal? Trendy gut activity menu'
        },
        emoji: '🥣',
        excerpt: {
            ja: 'モデルやアスリートがこぞって食べるオートミール。美味しくないイメージを覆す、簡単アレンジとダイエット効果。',
            en: 'Models and athletes all eat oatmeal. Easy arrangements and diet effects that overturn the image of not being tasty.'
        },
        date: '2025-01-18',
        tags: {
            ja: ['朝食', '腸活', 'ダイエット'],
            en: ['Breakfast', 'Gut Health', 'Diet']
        },
        content: {
            ja: `
            <h2>食物繊維は白米の20倍！</h2>
            <p>オートミール（オーツ麦）は、全粒穀物の王様です。水溶性と不溶性の食物繊維がバランスよく含まれており、腸内を掃除してくれます。</p>

            <h3>GL値が低い＝太りにくい</h3>
            <p>血糖値の上昇度合いを示すGL値が非常に低く、インスリンの過剰分泌（脂肪蓄積）を防ぎます。朝に食べると、昼食後の血糖値上昇まで抑える「セカンドミール効果」があります。</p>

            <h3>美味しい食べ方：オーバーナイトオーツ</h3>
            <p>「鳥の餌みたいで苦手...」そんな人は、前の晩にヨーグルトや豆乳に浸して冷蔵庫へ。翌朝にはトロトロのスイーツのようになります。ハチミツやフルーツを添えれば完璧な朝食に！</p>
            `,
            en: `
            <h2>Dietary fiber is 20 times that of white rice!</h2>
            <p>Oatmeal (oats) is the king of whole grains. Water-soluble and insoluble dietary fibers are well balanced and clean the intestines.</p>

            <h3>Low GL value = Hard to gain weight</h3>
            <p>The GL value, which indicates the degree of rise in blood sugar level, is very low, preventing excessive secretion of insulin (fat accumulation). Eating it in the morning has a "Second Meal Effect" that suppresses blood sugar rise even after lunch.</p>

            <h3>Delicious way to eat: Overnight Oats</h3>
            <p>"It looks like bird feed and I don't like it..." If you are like that, soak it in yogurt or soy milk the night before and put it in the fridge. The next morning it becomes like a creamy sweet. Perfect breakfast if you add honey and fruits!</p>
            `
        }
    },
    {
        slug: 'cheat-day-guide',
        title: {
            ja: '【チートデイ】ダイエット中に「ドカ食い」しても許される魔法の日？',
            en: '[Cheat Day] A magical day when "binge eating" is allowed during a diet?'
        },
        emoji: '🍰',
        excerpt: {
            ja: '停滞期を打破するためのチートデイ。失敗しないやり方と、絶対に守るべき3つのルールを解説。',
            en: 'Cheat day to break through the plateau. Explaining how not to fail and 3 rules you must follow.'
        },
        date: '2025-01-18',
        tags: {
            ja: ['ダイエット', 'メンタル', '知識'],
            en: ['Diet', 'Mental', 'Knowledge']
        },
        content: {
            ja: `
            <h2>食べて代謝スイッチをオンにする</h2>
            <p>ダイエットを続けると、体は「飢餓状態だ！」と勘違いして省エネモードになり、体重が落ちなくなります（停滞期）。そこで大量のカロリーを入れて「安心しろ、エネルギーはあるぞ！」と脳を騙すのがチートデイです。</p>

            <h3>正しいやり方</h3>
            <p>中途半端はNG。基礎代謝の2〜3倍（男性なら約4000kcal、女性なら約2500kcal）を目安に、炭水化物を中心にガッツリ食べましょう。</p>

            <h3>3つの鉄の掟</h3>
            <ol>
                <li><strong>中途半端にしない</strong>：罪悪感を持って少しだけ食べるのが一番太ります。</li>
                <li><strong>1日限定にする</strong>：翌日からはきっぱり元の食事に戻すこと。ダラダラ続けるとただのリバウンドです。</li>
                <li><strong>停滞期に入ってからやる</strong>：順調に体重が落ちている時にやる必要はありません。</li>
            </ol>
            `,
            en: `
            <h2>Turn on the metabolism switch by eating</h2>
            <p>If you continue dieting, your body misunderstands "I'm in a starvation state!" and goes into energy saving mode, and you stop losing weight (plateau). Cheat day is to fool the brain saying "Don't worry, there is energy!" by putting in a lot of calories.</p>

            <h3>Correct way</h3>
            <p>Half-heartedness is NG. Aim for 2-3 times your basal metabolism (about 4000kcal for men, about 2500kcal for women), and eat carbohydrates heavily.</p>

            <h3>3 Iron Rules</h3>
            <ol>
                <li><strong>Don't do it halfway</strong>: Eating just a little with guilt makes you gain weight the most.</li>
                <li><strong>Limit to 1 day</strong>: Return to original diet strictly from the next day. dragging on is just rebound.</li>
                <li><strong>Do it after entering the plateau</strong>: No need to do it when you are losing weight smoothly.</li>
            </ol>
            `
        }
    }
];

