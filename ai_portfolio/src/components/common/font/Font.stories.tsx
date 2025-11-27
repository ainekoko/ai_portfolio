import type { Meta, StoryObj } from '@storybook/nextjs';
import Font from './Font';

interface NumProps {
  children: React.ReactNode;
  className?: string;
}

const meta: Meta<NumProps> = {
  title: 'Components/Common/Font',
  component: Font,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '追加のCSSクラス',
    },
  },
};

export default meta;
type Story = StoryObj<NumProps>;

export const Default: Story = {
  args: {
    children: '1988',
  },
};

export const Number: Story = {
  args: {
    children: '123456',
  },
  render: (args) => (
    <div className='bg-slate-900 p-8 rounded-lg'>
      <p className='text-white text-2xl'>
        生まれた年: <Font>{args.children}</Font>年
      </p>
    </div>
  ),
};

export const EnglishText: Story = {
  args: {
    children: 'Hello World',
  },
  render: (args) => (
    <div className='bg-slate-900 p-8 rounded-lg'>
      <p className='text-white text-2xl'>
        <Font>{args.children}</Font>
      </p>
    </div>
  ),
};
