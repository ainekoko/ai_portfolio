import type { Meta, StoryObj } from '@storybook/nextjs';
import PortfolioContents from './PortfolioContents';

const meta = {
  title: 'Components/PortfolioContents',
  component: PortfolioContents,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'ポートフォリオページのコンテンツコンポーネント。作成のきっかけ、使用技術、良かったポイント、残念ポイント、Figmaデザインカンプ、今後の展望などを表示します。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PortfolioContents>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト表示
 */
export const Default: Story = {};

/**
 * モーダル操作のデモ
 * 画像をクリックするとモーダルが開きます
 */
export const WithModalInteraction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figmaデザインカンプの画像をクリックすると、拡大表示のモーダルが開きます。モーダル内の×ボタンまたは背景をクリックすると閉じます。',
      },
    },
  },
};
