import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import Navigation from './Navigation';

const meta: Meta<typeof Navigation> = {
  component: Navigation,
  title: 'components/Navigation',
  args: {
    isMenuOpen: false,
    onSectionClick: action('section-clicked'),
  },
  argTypes: {
    isMenuOpen: {
      control: 'boolean',
      description: 'メニューの開閉状態',
    },
    onSectionClick: {
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
    isMenuOpen: false,
  },
};

/**
 * メニューが開いている状態
 */
export const Open: Story = {
  args: {
    isMenuOpen: true,
  },
};
