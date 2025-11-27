import type { Meta, StoryObj } from '@storybook/nextjs';
import Button_form from './Button_form';

interface ButtonFormProps {
  text: string;
}

const meta: Meta<ButtonFormProps> = {
  title: 'Components/Common/ButtonForm',
  component: Button_form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'ボタンに表示するテキスト',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonFormProps>;

export const Default: Story = {
  args: {
    text: '送信',
  },
};
