import { Meta, StoryObj } from '@storybook/nextjs-vite';
import QAItem from './QAItem';
const meta: Meta<typeof QAItem> = {
  component: QAItem,
  title: 'components/qaItem/QAItem',
  args: {
    item: {
      id: 'career-change',
      question: '化粧品業界から何故エンジニアへの転職をしたのか？',
      answer:
        '自分が担当になった商品が＠コスメによって大ヒットし、売上が急増した事でネットでの宣伝の重要性を痛感しました。それから独学でHTML/CSS/JavaScriptを学び、プログラミングの楽しさに目覚め、もっと深く学びたいと思い、転職を決意しました。',
    },
    index: 0,
  },
  argTypes: {
    item: {
      control: 'object',
      description: 'QA項目のデータ',
    },
    index: {
      control: 'number',
      description: 'QA項目のインデックス',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'QAItemコンポーネントは、質問と回答のペアを表示するためのコンポーネントです。ホバー時に回答が表示されるアコーディオン形式で実装されています。',
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
