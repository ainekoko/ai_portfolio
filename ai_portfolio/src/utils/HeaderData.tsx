/**
 * ナビゲーションメニューアイテム
 * @example
 * {
 *   en: 'Home',
 *   ja: 'ホーム',
 *   sectionId: 'topSection',
 *   delay: 'delay-[300ms]'
 * }
 */
type NavMenuItem = {
  /** 英語表記 */
  en: string;
  /** 日本語表記 */
  ja: string;
  /** URL */
  url?: string;
  /** セクションID */
  sectionId: string;
  /** アニメーション遅延クラス */
  delay: string;
};

/**
 * サイドメニューアイテム
 * @example
 * {
 *   href: 'topSection',
 *   text: 'Top'
 * }
 */
type SideMenuItem = {
  /** セクションID（href） */
  href: string;
  /** 表示テキスト */
  text: string;
};

/**
 * ナビゲーションメニューのデータ配列
 * 各オブジェクトはメニュー項目を表し、英語名、日本語名、セクションID、アニメーション遅延を含む
 * @example
 * {
 *   en: 'Home',
 *   ja: 'ホーム',
 *   sectionId: 'topSection',
 *   delay: 'delay-[300ms]'
 * }
 */
export const NAV_MENU: NavMenuItem[] = [
  {
    en: 'Home',
    ja: 'ホーム',
    sectionId: 'topSection',
    url: '#',
    delay: 'delay-[300ms]',
  },
  {
    en: 'Cosmetics',
    ja: 'ネイル経歴',
    sectionId: 'cosmetics',
    url: '/cosmetics',
    delay: 'delay-[400ms]',
  },
  {
    en: 'SystemsEngineer',
    ja: 'IT経歴',
    sectionId: 'systemsEngineer',
    url: '/ses',
    delay: 'delay-[500ms]',
  },
  {
    en: 'Portfolio',
    ja: 'ポートフォリオ',
    sectionId: 'portfolio',
    url: '/portfolio',
    delay: 'delay-[600ms]',
  },
  {
    en: 'Mypage',
    ja: 'マイページ',
    sectionId: 'mypage',
    url: '/mypage',
    delay: 'delay-[700ms]',
  },
];

/**
 * サイドメニューのデータ配列
 * @example
 * {
 *   href: 'topSection',
 *   text: 'Top'
 * }
 */
export const SIDE_MENU: SideMenuItem[] = [
  { href: 'topSection', text: 'Top' },
  { href: 'profile', text: 'Profile' },
  { href: 'message', text: 'Message' },
  { href: 'experience', text: 'Previous Experience' },
  { href: 'skill', text: 'Skills' },
  { href: 'contact', text: 'Contact' },
];
