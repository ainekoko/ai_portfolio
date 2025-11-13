import { Meta, StoryObj } from '@storybook/nextjs-vite';
import BackgroundScrollText from './BackgroundScrollText';
const meta: Meta<typeof BackgroundScrollText> = {
  component: BackgroundScrollText,
  title: 'components/experience/BackgroundScrollText',
  args: {
    text: 'Nailist',
    position: 'custom',
    customTop: '450px',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'スクロールする背景テキスト',
    },
    position: {
      control: { type: 'radio', options: ['top', 'bottom', 'custom'] },
      description: 'スクロールする背景テキストの位置',
    },
    customTop: {
      control: 'text',
      description: 'スクロールする背景テキストのカスタム上部位置',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'BackgroundScrollTextコンポーネントは、背景にスクロールするテキストを表示するためのコンポーネントです。テキストの内容や位置をカスタマイズできます。',
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
