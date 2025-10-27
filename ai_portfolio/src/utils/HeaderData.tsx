interface NavMenuItem {
  en: string;
  ja: string;
  sectionId: string;
  delay: string;
}

interface SideMenuItem {
  href: string;
  text: string;
}

/**
 * ナビゲーションメニューのデータ配列
 * 各オブジェクトはメニュー項目を表し、英語名、日本語名、セクションID、アニメーション遅延を含む
 * 例: { en: 'Home', ja: 'ホーム', sectionId: 'topSection', delay: 'delay-[300ms]' }
 * @returns {NavMenuItem[]} ナビゲーションメニューのデータ配列
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

export const SIDE_MENU: SideMenuItem[] = [
  { href: 'topSection', text: 'Top' },
  { href: 'profile', text: 'Profile' },
  { href: 'experience', text: 'Previous Experience' },
  { href: 'skill', text: 'Skills' },
  { href: 'contact', text: 'Contact' },
];
