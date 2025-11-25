import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  PrevButton,
  NextButton,
} from '@/components/common/EmblaCarouselArrowButtons/EmblaCarouselArrowButtons';

const meta = {
  title: 'Components/Common/ArrowButtons',
  component: PrevButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PrevButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PreviousButton: Story = {
  render: () => <PrevButton onClick={() => console.log('Previous clicked')} />,
};

export const PreviousButtonDisabled: Story = {
  render: () => (
    <PrevButton onClick={() => console.log('Previous clicked')} disabled />
  ),
};

export const NextButtonStory: Story = {
  render: () => <NextButton onClick={() => console.log('Next clicked')} />,
};

export const NextButtonDisabled: Story = {
  render: () => (
    <NextButton onClick={() => console.log('Next clicked')} disabled />
  ),
};

export const BothButtons: Story = {
  render: () => (
    <div className='flex gap-4'>
      <PrevButton onClick={() => console.log('Previous clicked')} />
      <NextButton onClick={() => console.log('Next clicked')} />
    </div>
  ),
};
