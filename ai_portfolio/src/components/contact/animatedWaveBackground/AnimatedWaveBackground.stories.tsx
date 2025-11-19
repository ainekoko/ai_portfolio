import { Meta, StoryObj } from '@storybook/nextjs-vite';
import AnimatedWaveBackground from './AnimatedWaveBackground';
const meta: Meta<typeof AnimatedWaveBackground> = {
  component: AnimatedWaveBackground,
  title: 'components/contact/AnimatedWaveBackground',
  args: {},
  argTypes: {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'AnimatedWaveBackground' +
          'コンポーネントは、アニメーション化された波の背景を表示します。',
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
