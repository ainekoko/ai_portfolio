import { Meta, StoryObj } from '@storybook/nextjs-vite';
import ContactButtons from './ContactButtons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const meta: Meta<typeof ContactButtons> = {
  component: ContactButtons,
  title: 'components/profile/ContactButtons',
  args: {
    contacts: [
      {
        icon: faEnvelope,
        text: 'ai.ebata.contact@gmail.com',
        fullText: 'ai.ebata.contact@gmail.com',
        color: 'rose-300' as const,
        href: 'mailto:ai.ebata.contact@gmail.com',
      },
      {
        icon: faGithub,
        text: 'https://github.com/ainekoko/ai_portfolio',
        fullText: 'https://github.com/ainekoko/ai_portfolio',
        color: 'purple-400' as const,
        href: 'https://github.com/ainekoko/ai_portfolio',
      },
      {
        icon: faXTwitter,
        text: 'ai.ebata.contact@gmail.com',
        fullText: '@your_twitter',
        color: 'indigo-500' as const,
        href: '#',
      },
    ],
  },
  argTypes: {
    contacts: {
      control: 'object',
      description: '連絡先情報の配列',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '連絡先ボタンコンポーネント。指定された連絡先情報を基に、対応するアイコンとテキストを表示します。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * メニューが閉じている状態
 */
export const Default: Story = {};
