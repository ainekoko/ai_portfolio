import type { Meta, StoryObj } from '@storybook/nextjs';
import SesContents from './SesContents';
import { EmblaOptionsType } from 'embla-carousel';

const meta = {
  title: 'Components/SesContents',
  component: SesContents,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SesContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: {
      axis: 'y',
      loop: false,
    } as EmblaOptionsType,
  },
};

export const WithLoop: Story = {
  args: {
    options: {
      axis: 'y',
      loop: true,
    } as EmblaOptionsType,
  },
};

export const HorizontalAxis: Story = {
  args: {
    options: {
      axis: 'x',
      loop: false,
    } as EmblaOptionsType,
  },
};

export const NoOptions: Story = {
  args: {},
};
