import { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProfileSection from './ProfileSection';

const meta: Meta<typeof ProfileSection> = {
  component: ProfileSection,
  title: 'components/section/ProfileSection',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isVisible: () => true, // 関数として渡す
  },
};

export default meta;
type Story = StoryObj<typeof ProfileSection>;

export const Default: Story = {};
