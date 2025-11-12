import { Meta, StoryObj } from '@storybook/nextjs-vite';
import MessageSection from './MessageSection';

const meta: Meta<typeof MessageSection> = {
  component: MessageSection,
  title: 'components/section/MessageSection',
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof MessageSection>;

export const Default: Story = {};
