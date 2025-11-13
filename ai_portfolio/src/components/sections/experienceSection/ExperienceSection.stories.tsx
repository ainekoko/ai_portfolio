import { Meta, StoryObj } from '@storybook/nextjs-vite';
import ExperienceSection from './ExperienceSection';

const meta: Meta<typeof ExperienceSection> = {
  component: ExperienceSection,
  title: 'components/section/ExperienceSection',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isVisible: () => true, // 関数として渡す
  },
};

export default meta;
type Story = StoryObj<typeof ExperienceSection>;

export const Default: Story = {};
