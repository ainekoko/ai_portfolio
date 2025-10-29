import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  component: Logo,
  title: 'components/Header/Logo',
  args: {
    onSectionClick: action('section-clicked'),
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ロゴコンポーネントは、ウェブサイトのヘッダーに表示されるブランドロゴです。クリックすると指定されたセクションにスクロールします。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
