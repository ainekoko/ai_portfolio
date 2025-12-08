import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Num from '@/components/common/font/Font';
import Font from '@/components/common/font/Font';

/**
 * プロフィールデータ
 */
export const PROFILE_DATA = [
  {
    label: '出身',
    content: (
      <>
        群馬県/東京に約<Num>15</Num>年程住み、現在は北海道へ移住
      </>
    ),
  },
  {
    label: '学歴',
    content: (
      <>
        東京国際大学へ入学、<Num>1</Num>年間アメリカのオレゴン州へ留学
      </>
    ),
  },
  {
    label: '自己紹介',
    content: (
      <>
        <Num>1988</Num>年生まれ。 東京にて化粧品メーカーに就職。その後
        <Font>SES</Font>へ転職。 <Num>2</Num>年前に北海道へ移住し、現在は子供
        <Num>2</Num>
        人に恵まれ、育児と仕事を両立しながらフロントエンドエンジニアとして活動中。
      </>
    ),
  },
  {
    label: '趣味',
    content: (
      <ul>
        <li>ゲーム</li>
        <li>もの作り</li>
        <li>ファッション</li>
        <li>ネイル</li>
      </ul>
    ),
  },
  {
    label: '資格',
    content: (
      <ul>
        <li>
          <Num>簿記2級</Num>
        </li>
        <li>
          <Font>Niellist技能検定2級</Font>
        </li>
        <li>
          <Font>Excel</Font>
        </li>
        <li>普通自動車免許</li>
      </ul>
    ),
  },
];

/**
 * 連絡先ボタンデータ
 */
export const CONTACT_BUTTONS = [
  {
    icon: faEnvelope,
    text: 'Email',
    fullText: 'ai.ebata.contact@gmail.com',
    color: 'rose-300' as const,
    href: 'mailto:ai.ebata.contact@gmail.com',
  },
  {
    icon: faGithub,
    text: 'GitHub',
    fullText: 'https://github.com/ainekoko',
    color: 'purple-400' as const,
    href: 'https://github.com/ainekoko',
  },
  {
    icon: faXTwitter,
    text: 'X (Twitter)',
    fullText: '@ainekoko',
    color: 'indigo-500' as const,
    href: 'https://twitter.com/ainekoko',
  },
];
