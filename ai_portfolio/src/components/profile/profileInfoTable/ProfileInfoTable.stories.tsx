import { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProfileInfoTable from './ProfileInfoTable';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const meta: Meta<typeof ProfileInfoTable> = {
  component: ProfileInfoTable,
  title: 'components/profile/ProfileInfoTable',
  args: {
    profileData: [
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
        content: (
          <>
            年生まれ。1988年生まれ。
            東京にて化粧品メーカーに就職。その後SESへ転職。 現在は子供 2
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
            <li>Shin codeさん</li>
            <li>コードマフィアさん</li>
            <div>
              細かい部分も教授して下さり、youtubeやUdemyで勉強の際本当にお世話になっています!
            </div>
          </ul>
        ),
      },
    ],
  },
  argTypes: {
    profileData: {
      control: 'object',
      description: 'プロフィール情報の配列',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'プロフィール情報を表示するコンポーネント。指定されたプロフィール情報を基に、対応するラベルとコンテンツを表示します。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * HP上で表示しているデフォルトのプロフィール情報
 */
export const Default: Story = {};

/**
 * プロフィール情報が一つだけの状態
 */
export const OneProfile: Story = {
  args: {
    profileData: [
      {
        label: '出身',
        content: '群馬県/東京に約15年程住み、現在は北海道へ移住',
      },
    ],
  },
};
/**
 * タグが含まれるプロフィール情報
 */
export const AddTags: Story = {
  args: {
    profileData: [
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
    ],
  },
};
