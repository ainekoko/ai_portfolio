import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from '@storybook/test';
import HeaderNav from './HeaderNav';
import { SIDE_MENU } from '@/utils/HeaderData';

const meta: Meta<typeof HeaderNav> = {
  component: HeaderNav,
  title: 'components/Header/HeaderNav',
  args: {
    onSectionClick: fn(),
    sideMenuData: SIDE_MENU,
  },
  argTypes: {
    onSectionClick: {
      description: 'セクションクリック時のハンドラー',
    },
    sideMenuData: {
      description: 'サイドメニューのデータ配列',
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
