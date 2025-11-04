// TopSection.stories.tsx（シンプル版）
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import TopSection from './TopSection';

const meta: Meta<typeof TopSection> = {
  component: TopSection,
  title: 'components/section/TopSection',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TopSection>;

// ストーリーは1つだけ
export const Default: Story = {
  args: {
    isVisible: true,
  },
};
