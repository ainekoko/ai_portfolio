import type { Meta, StoryObj } from '@storybook/nextjs';
import { DotButton } from '../../cosmeContents/EmblaCarouselDotButton';

const meta = {
  title: 'Components/CosmeContents/DotButton',
  component: DotButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DotButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Dot clicked'),
    className: 'embla__dot',
  },
};

export const Selected: Story = {
  args: {
    onClick: () => console.log('Dot clicked'),
    className: 'embla__dot embla__dot--selected',
  },
};

export const MultipleDots: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      {[0, 1, 2, 3].map((index) => (
        <DotButton
          key={index}
          onClick={() => console.log(`Dot ${index} clicked`)}
          className={`embla__dot ${index === 1 ? 'embla__dot--selected' : ''}`}
        />
      ))}
    </div>
  ),
};

export const WithChildren: Story = {
  args: {
    onClick: () => console.log('Dot clicked'),
    className: 'embla__dot',
    children: <span>1</span>,
  },
};
