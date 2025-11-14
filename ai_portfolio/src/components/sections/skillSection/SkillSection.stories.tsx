// SkillSection.stories.tsx
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import SkillSection from './SkillSection';

const meta: Meta<typeof SkillSection> = {
  component: SkillSection,
  title: 'components/section/SkillSection',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isVisible: () => true,
  },
};

export default meta;
type Story = StoryObj<typeof SkillSection>;

export const Default: Story = {};

export const Hidden: Story = {
  args: {
    isVisible: () => false,
  },
};
