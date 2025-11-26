import type { Meta, StoryObj } from '@storybook/nextjs';
import SectionHeader from './SectionHeader';

interface SectionTitleProps {
  isVisible: boolean;
  title: string;
  subtitle?: string;
  size?: 'large' | 'normal' | 'small';
}

const meta: Meta<SectionTitleProps> = {
  title: 'Components/Common/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: 'セクションの表示状態',
    },
    title: {
      control: 'text',
      description: 'セクションのタイトル',
    },
    subtitle: {
      control: 'text',
      description: 'サブタイトル（任意）',
    },
    size: {
      control: 'select',
      options: ['large', 'normal', 'small'],
      description: 'タイトルのサイズ',
    },
  },
};

export default meta;
type Story = StoryObj<SectionTitleProps>;

export const Default: Story = {
  args: {
    isVisible: true,
    title: 'PROFILE',
    subtitle: 'プロフィール',
    size: 'large',
  },
};

export const LargeSize: Story = {
  args: {
    isVisible: true,
    title: 'ABOUT',
    subtitle: '私について',
    size: 'large',
  },
  render: (args) => (
    <div className='bg-gray-50 p-8'>
      <SectionHeader {...args} />
    </div>
  ),
};

export const NormalSize: Story = {
  args: {
    isVisible: true,
    title: 'SKILLS',
    subtitle: 'スキル',
    size: 'normal',
  },
  render: (args) => (
    <div className='bg-gray-50 p-8'>
      <SectionHeader {...args} />
    </div>
  ),
};

export const SmallSize: Story = {
  args: {
    isVisible: true,
    title: 'CONTACT',
    subtitle: 'お問い合わせ',
    size: 'small',
  },
  render: (args) => (
    <div className='bg-gray-50 p-8'>
      <SectionHeader {...args} />
    </div>
  ),
};
