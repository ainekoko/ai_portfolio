import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';

/**
 * プロフィールデータ
 */
export const PROFILE_DATA = [
  {
    label: '出身',
    content: '群馬県/東京に約15年程住み、現在は北海道へ移住',
  },
  {
    label: '学歴',
    content: '東京国際大学へ入学、1年間アメリカのオレゴン州へ留学',
  },
  {
    label: '自己紹介',
    content: `1988年生まれ。
東京にて化粧品メーカーに就職。その後SESへ転職。
現在は子供二人に恵まれ北海道を満喫しながら過ごしています。`,
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
        <li>Shin codeさん</li>
        <li>コードマフィアさん</li>
        <div>
          細かい部分も教授して下さり、youtubeやUdemyで勉強の際本当にお世話になっています！
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
    text: 'ai.ebata.contact@gmail.com',
    color: 'rose-300',
    href: 'mailto:ai.ebata.contact@gmail.com',
  },
  {
    icon: faGithub,
    text: 'https://github.com/ainekoko/ai_portfolio',
    color: 'purple-400',
    href: 'https://github.com/ainekoko/ai_portfolio',
  },
  {
    icon: faXTwitter,
    text: 'ai.ebata.contact@gmail.com',
    color: 'indigo-500',
    href: '#',
  },
];
