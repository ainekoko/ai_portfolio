import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ContactButtonsProps } from '@/components/profile/contactButtons/ContactButtons';

/**
 * ポートフォリオページのデータ型定義
 */

/** Figmaデザインカンプの画像情報 */
export type FigmaImage = {
  src: string;
  alt: string;
  title: string;
};

/** 使用技術の項目 */
export type TechStackItem = {
  label: string;
  value: string;
};

/** 良かったポイントの項目 */
export type GoodPoint = {
  title: string;
  description: string;
};

/** 残念ポイントの項目 */
export type BadPoint = {
  title: string;
  description: string;
};

/**
 * ポートフォリオページのコンテンツデータ
 */
export const PORTFOLIO_CONTENT = {
  /** ページタイトル */
  title: 'Portfolio',
  subtitle: 'このポートフォリオについて',

  /** 作成のきっかけ */
  motivation: {
    title: 'ポートフォリオを作成したきっかけ',
    paragraphs: [
      '転職活動を始めるにあたり、これまでの経験やスキルを効果的に伝えるためにポートフォリオサイトを作成しました。',
      '特に、化粧品業界とIT業界という異なる分野での経験を持つ私にとって、それぞれの経験で培ったスキルや成長の過程を視覚的に表現することが重要だと考えました。',
    ],
  },

  /** 使用技術 */
  techStack: {
    title: '使用技術',
    items: [
      { label: 'フレームワーク', value: 'Next.js 15 (App Router)' },
      { label: '言語', value: 'TypeScript' },
      { label: 'スタイリング', value: 'Tailwind CSS' },
      { label: 'テスト', value: 'JEST, React Testing Library' },
      { label: 'UI開発・ドキュメント', value: 'Storybook' },
      { label: 'デザインツール', value: 'Figma' },
      { label: 'バージョン管理', value: 'Git, GitHub' },
      { label: 'ホスティング', value: 'Vercel' },
      { label: '開発支援', value: 'GitHub Copilot' },
    ] as TechStackItem[],
  },

  /** 良かったポイント */
  goodPoints: {
    title: '良かったポイント',
    items: [
      {
        title: '✓ レスポンシブデザイン：',
        description:
          'PC、タブレット、スマートフォンなど、あらゆるデバイスで快適に閲覧できるよう設計しました。',
      },
      {
        title: '✓ アニメーション：',
        description:
          'ページ遷移やスクロールに合わせた滑らかなアニメーションで、ユーザー体験を向上させました。',
      },
      {
        title: '✓ アクセシビリティ：',
        description:
          'セマンティックHTMLとARIA属性を活用し、すべてのユーザーが利用しやすいサイトを実現しました。',
      },
      {
        title: '✓ パフォーマンス最適化：',
        description:
          'Next.jsの機能を活用し、高速なページロードを実現しました。',
      },
    ] as GoodPoint[],
  },

  /** 残念ポイント */
  badPoints: {
    title: '残念ポイント',
    items: [
      {
        title: '△ フォルダ設計の曖昧：',
        description:
          'コンポーネントの配置やディレクトリ構造に一貫性が欠け、保守性や拡張性の面で改善の余地があります。',
      },
      {
        title: '△ アニメーションの技術不足：',
        description:
          '当初、three.jsを使用した3Dアニメーションを検討しましたが、spサイズにした際のバグや他のバグ表示に悩まされ、最終的に断念しました。',
      },
      {
        title: '△ storybookのリンク不可：',
        description:
          'Storybook 10.1.4 は Next.js 16 と完全に互換性がなく、Storybook 内のコンポーネントが正しく表示されない問題が発生しました。',
      },
      {
        title: '△ コンポーネントの再利用性：',
        description:
          '一部のコンポーネントが特定のページに依存しており、他のプロジェクトでの再利用が難しかったり、冗長なコードが発生したりしました。',
      },
      {
        title: '△ 時間配分ミス：',
        description:
          '全体のスケジュール管理が不十分で、一先ずポートフォリオページを一旦完成させた為、コンポーネント化や他の実装に十分な時間を割けませんでした。',
      },
    ] as BadPoint[],
  },

  /** Figmaデザインカンプ */
  figmaDesigns: {
    title: 'Figmaで作成したデザインカンプ',
    images: [
      {
        src: '/assets/images/HOME.png',
        alt: 'HOMEページのデザインカンプ',
        title: 'HOMEページ',
      },
      {
        src: '/assets/images/cosme.png',
        alt: '化粧品業界ページのデザインカンプ',
        title: '化粧品業界ページ',
      },
      {
        src: '/assets/images/portforio.png',
        alt: 'ポートフォリオページのデザインカンプ',
        title: 'ポートフォリオページ',
      },
    ] as FigmaImage[],
  },

  /** 今後の展望 */
  future: {
    title: '今後の展望',
    paragraphs: [
      '今後は、自身のマイページ能の追加や、API連携による動的コンテンツの導入など、さらなる機能拡充を目指しています。',
      'そして、webGLやthree.jsを活用した高度なアニメーション表現にも興味があるので引き続き勉強をしていきたいと思っています。',
    ],
  },

  /** コンタクトボタン */
  contacts: [
    {
      icon: faGithub,
      text: 'GitHub',
      fullText: 'https://github.com/ainekoko',
      color: 'purple-400' as const,
      href: 'https://github.com/ainekoko',
    },
  ] as ContactButtonsProps['contacts'],
};

/** 装飾用の画像パス */
export const DECORATION_IMAGE = '/assets/images/flowerLeaf.png';
