import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import HamburgerBtn from './HamburgerBtn';

const meta: Meta<typeof HamburgerBtn> = {
  component: HamburgerBtn,
  title: 'components/Header/HamburgerBtn',
  args: {
    isOpen: false,
    onClick: action('section-clicked'),
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'メニューの開閉状態',
    },
    onClick: {
      description: 'セクションクリック時のハンドラー',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ナビゲーションコンポーネントは、モバイル・タブレット用のフルスクリーンメニューです。各セクションへのナビゲーションを提供します。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * メニューが閉じている状態
 */
export const Closed: Story = {
  args: {
    isOpen: false,
  },
};

/**
 * メニューが開いている状態
 */
export const Open: Story = {
  args: {
    isOpen: true,
  },
};
