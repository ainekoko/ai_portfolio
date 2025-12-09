# AI Portfolio

個人ポートフォリオサイト - 化粧品業界と IT 業界での経験を活かした Web アプリケーション

## 概要

このプロジェクトは、Next.js 16 と TypeScript を使用して構築された個人ポートフォリオサイトです。レスポンシブデザイン、スムーズなアニメーション、優れたアクセシビリティを備えています。

### デモサイト

[https://ai-portfolio-delta-two.vercel.app/](https://ai-portfolio-delta-two.vercel.app/)

## 主な機能

- ✨ **レスポンシブデザイン**: PC、タブレット、スマートフォンに最適化
- 🎨 **スムーズなアニメーション**: スクロールとページ遷移のアニメーション
- ♿ **アクセシビリティ**: セマンティック HTML と ARIA 属性を活用
- ⚡ **高速パフォーマンス**: Next.js の App Router による最適化
- 📱 **モバイルファースト**: タッチフレンドリーな UI/UX
- 🎯 **3 つの主要ページ**:
  - HOME: プロフィールとスキル紹介
  - 化粧品業界経験ページ
  - IT 業界経験ページ
  - ポートフォリオ詳細ページ

## 技術スタック

### フロントエンド

- **フレームワーク**: Next.js 16.0.7 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UI コンポーネント**: React 19.1.0
- **アニメーション**: React Three Fiber, Three.js
- **フォームバリデーション**: React Hook Form, Yup, Zod
- **アイコン**: Font Awesome

### 開発ツール

- **テスト**: Jest, React Testing Library, Vitest
- **UI 開発**: Storybook 10.1.4 _(現在 Next.js 16 と互換性なし)_
- **リンター**: ESLint
- **デザイン**: Figma
- **バージョン管理**: Git, GitHub
- **CI/CD**: Vercel
- **開発支援**: GitHub Copilot

## セットアップ

### 必要環境

- Node.js 20.x 以上
- Yarn または npm

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/ainekoko/ai_portfolio.git
cd ai_portfolio

# 依存関係のインストール
yarn install
```

### 開発サーバーの起動

```bash
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
yarn build
```

### 本番環境での起動

```bash
yarn start
```

### テスト実行

```bash
yarn test
```

## ディレクトリ構成

```bash
ai_portfolio/
├── public/                     # 静的ファイル
│   ├── assets/
│   │   └── images/            # 画像ファイル
│   ├── mockups/               # Figmaカンプ
│   └── static-html/           # 静的HTML
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx          # HOMEページ
│   │   ├── cosmetics/        # 化粧品業界ページ
│   │   ├── ses/              # IT業界ページ
│   │   └── portfolio/        # ポートフォリオ詳細
│   ├── components/            # Reactコンポーネント
│   │   ├── common/           # 共通コンポーネント
│   │   ├── layout/           # レイアウトコンポーネント
│   │   ├── sections/         # セクションコンポーネント
│   │   └── ui/               # UIコンポーネント
│   ├── hooks/                # カスタムフック
│   ├── services/             # API通信
│   ├── styles/               # グローバルスタイル
│   ├── types/                # TypeScript型定義
│   ├── utils/                # ユーティリティ関数・データ
│   └── validations/          # バリデーションスキーマ
├── coverage/                  # テストカバレッジレポート
├── .storybook/               # Storybook設定
└── stories/                  # Storybookストーリー
```

## 既知の問題

### Storybook 互換性

Storybook 10.1.4 は現在 Next.js 16 と互換性がなく、以下のエラーが発生します：

```
SyntaxError: The requested module 'next/dist/build/swc/index.js' does not provide an export named 'isWasm'
```

この問題が解決されるまで、Storybook の公開デプロイは保留中です。

## 今後の展望

- マイページ機能の追加
- API 連携による動的コンテンツ
- WebGL/Three.js を活用した高度なアニメーション
- Storybook 互換性の解決と Chromatic デプロイ

## ライセンス

このプロジェクトは個人ポートフォリオ用です。

## 作者

**ainekoko**

- GitHub: [@ainekoko](https://github.com/ainekoko)
- Portfolio: [https://ai-portfolio-delta-two.vercel.app/](https://ai-portfolio-delta-two.vercel.app/)
