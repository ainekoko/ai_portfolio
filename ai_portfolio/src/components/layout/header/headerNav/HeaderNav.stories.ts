import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import HeaderNav from './HeaderNav';

const meta: Meta<typeof HeaderNav> = {
  component: HeaderNav,
  title: 'components/Header/HeaderNav',
  args: {
    onSectionClick: action('section-clicked'),
  },
  argTypes: {
    onSectionClick: {
      description: 'セクションクリック時のハンドラー',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ヘッダーナビゲーションコンポーネントは、デスクトップ用のサイドナビゲーションを提供します。各セクションへのナビゲーションリンクを表示します。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのナビゲーション表示
 */
export const Default: Story = {};
