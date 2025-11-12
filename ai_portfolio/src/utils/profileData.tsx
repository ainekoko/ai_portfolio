import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Num from '@/components/common/Font';
import Font from '@/components/common/Font';

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
        <Font>SES</Font>へ転職。 現在は子供<Num>2</Num>
        人に恵まれ北海道を満喫しながら過ごしています。
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
    label: '尊敬する人',
    content: (
      <ul>
        <li>
          <Font>Shin code</Font>さん
        </li>
        <li>コードマフィアさん</li>
        <div>
          細かい部分も教授して下さり、<Font>youtube</Font>や<Font>Udemy</Font>
          で勉強の際本当にお世話になっています!
        </div>
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
    fullText: 'https://github.com/ainekoko/ai_portfolio',
    color: 'purple-400' as const,
    href: 'https://github.com/ainekoko/ai_portfolio',
  },
  {
    icon: faXTwitter,
    text: 'X (Twitter)',
    fullText: '@your_twitter',
    color: 'indigo-500' as const,
    href: 'https://twitter.com/your_twitter',
  },
];
