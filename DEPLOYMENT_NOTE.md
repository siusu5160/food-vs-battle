# Cloudflare Pages への移行手順 (FOODVS)

このプロジェクトを Vercel から Cloudflare Pages に移行するための手順書です。

## 1. 準備 (適用済み)
- 必要なパッケージ `@cloudflare/next-on-pages` をインストールしました。
- `package.json` にビルド用スクリプトを追加しました。

## 2. GitHub リポジトリの作成
現在のフォルダにはまだリモートリポジトリが設定されていません。
1. [GitHub](https://github.com/new) にログインし、新しいリポジトリ（例: `food-vs-battle`）を作成してください。
2. 作成後、表示されるコマンドを使って現在のコードをプッシュします。

```bash
# ターミナルで実行（URLは作成した自分のものに置き換えてください）
git remote add origin https://github.com/YOUR_USERNAME/food-vs-battle.git
git branch -M main
git push -u origin main
```

## 3. Cloudflare Pages での設定
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログインします。
2. 「Workers & Pages」 > 「アプリケーションの作成」 > 「Pages」 > 「Gitに接続」を選択します。
3. 作成した GitHub リポジトリ (`food-vs-battle`) を選択します。
4. **ビルド設定**を以下のように入力します：
    - **フレームワーク プリセット**: `Next.js`
    - **ビルド コマンド**: `npx @cloudflare/next-on-pages`
    - **ビルド出力ディレクトリ**: `.vercel/output/static`
    - **互換性フラグ (Compatibility Flags)**: 設定画面の「互換性フラグ」に `nodejs_compat` を追加してください（最近は自動設定されることもありますが、念のため推奨）。

## 4. デプロイ
- 「保存してデプロイ」をクリックすると、自動的にビルドが始まります。
- 数分でデプロイが完了し、公開URLが発行されます。

## 補足: カスタムドメイン
- デプロイ完了後、「カスタムドメイン」タブから独自ドメインを設定できます。
