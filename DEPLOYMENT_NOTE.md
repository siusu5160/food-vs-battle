# Cloudflare Pages への移行手順 (FOODVS)

このプロジェクトを Vercel から Cloudflare Pages に移行するための手順書です。

## 1. 準備 (適用済み)
- 必要なパッケージ `@cloudflare/next-on-pages` をインストールしました。
- `package.json` にビルド用スクリプトを追加しました。

## 2. GitHub リポジトリの作成 (完了)
以下のリポジトリにコードをプッシュしました。
`https://github.com/siusu5160/food-vs-battle.git`

## 3. Cloudflare Pages での設定
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログインします。
2. 「Workers & Pages」 > 「アプリケーションの作成」 > 「Pages」 > 「Gitに接続」を選択します。
3. 作成した GitHub リポジトリ (`food-vs-battle`) を選択します。
4. **ビルド設定**を以下のように入力します：
    - **フレームワーク プリセット**: `Next.js`
    - **ビルド コマンド**: `npx @cloudflare/next-on-pages`
    - **ビルド出力ディレクトリ**: `.vercel/output/static`
    - **互換性フラグ (Compatibility Flags)**: 
        1. 「Settings」タブ > 左メニューの「Runtime」をクリックします。
        2. 「Compatibility flags」の行にある鉛筆アイコン（編集）をクリックします。
        3. `nodejs_compat` と入力して保存してください。

## 4. デプロイ
- 「保存してデプロイ」をクリックすると、自動的にビルドが始まります。
- 数分でデプロイが完了し、公開URLが発行されます。

## 補足: カスタムドメイン
- デプロイ完了後、「カスタムドメイン」タブから独自ドメインを設定できます。
