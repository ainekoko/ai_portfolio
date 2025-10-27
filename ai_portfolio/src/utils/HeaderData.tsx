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
    delay: 'delay-[300ms]',
  },
  {
    en: 'Profile',
    ja: 'プロフィール',
    sectionId: 'profile',
    delay: 'delay-[400ms]',
  },
  {
    en: 'Message',
    ja: 'メッセージ',
    sectionId: 'message',
    delay: 'delay-[500ms]',
  },
  {
    en: 'Experience',
    ja: '職務経歴',
    sectionId: 'experience',
    delay: 'delay-[600ms]',
  },
  {
    en: 'Skills',
    ja: 'スキル',
    sectionId: 'skill',
    delay: 'delay-[700ms]',
  },
  {
    en: 'Contact',
    ja: 'お問い合わせ',
    sectionId: 'contact',
    delay: 'delay-[800ms]',
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
