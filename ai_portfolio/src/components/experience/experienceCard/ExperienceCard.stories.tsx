import { Meta, StoryObj } from '@storybook/nextjs-vite';
import ExperienceCard from './ExperienceCard';
const meta: Meta<typeof ExperienceCard> = {
  component: ExperienceCard,
  title: 'components/experience/ExperienceCard',
  args: {
    title: '化粧品メーカー',
    period: '2011〜2017',
    description:
      '約6年間様々な経験をさせて頂き接客から営業、企画まで幅広く対応し、コミュニケーションスキルや提案力、企画力を培いました。',
    link: '/cosmetics',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '職業のタイトル',
    },
    period: {
      control: 'text',
      description: '職業の期間',
    },
    description: {
      control: 'text',
      description: '職業の説明文',
    },
    link: {
      control: 'text',
      description: '詳細ページへのリンクURL',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ExperienceCardコンポーネントは、職務経歴の各カードを表示するためのコンポーネントです。タイトル、期間、説明文、および詳細ページへのリンクを受け取り、視覚的に魅力的なカード形式で情報を提供します。',
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
