import { Meta, StoryObj } from '@storybook/nextjs-vite';
import ContactSection from './ContactSection';

const meta: Meta<typeof ContactSection> = {
  component: ContactSection,
  title: 'components/section/ContactSection',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isVisible: () => true, // 関数として渡す
  },
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {};
