import type { Meta, StoryObj } from '@storybook/nextjs';
import PageIndicator from './PageIndicator';
import { useRef } from 'react';

const meta = {
  title: 'Components/CosmeContents/PageIndicator',
  component: PageIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSections = [
  {
    title: 'ネイリスト',
    color: '#ff6b9d',
    year: '2011~2014',
    description: '店舗接客',
  },
  {
    title: 'ルート営業',
    color: '#c44569',
    year: '2012~2014',
    description: '店舗へ直接出向き',
  },
  {
    title: 'マーケティング',
    color: '#4a90e2',
    year: '2014~2016',
    description: 'データ分析',
  },
  {
    title: 'プロダクトマネージャー',
    color: '#50c878',
    year: '2016~2019',
    description: '製品企画',
  },
];

export const Default: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div className='relative w-96 h-96 bg-gray-100'>
        <PageIndicator
          sections={mockSections}
          containerRef={containerRef}
          currentIndex={0}
        />
      </div>
    );
  },
};

export const SecondItemActive: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div className='relative w-96 h-96 bg-gray-100'>
        <PageIndicator
          sections={mockSections}
          containerRef={containerRef}
          currentIndex={1}
        />
      </div>
    );
  },
};

export const LastItemActive: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div className='relative w-96 h-96 bg-gray-100'>
        <PageIndicator
          sections={mockSections}
          containerRef={containerRef}
          currentIndex={3}
        />
      </div>
    );
  },
};

export const TwoSections: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div className='relative w-96 h-96 bg-gray-100'>
        <PageIndicator
          sections={mockSections.slice(0, 2)}
          containerRef={containerRef}
          currentIndex={0}
        />
      </div>
    );
  },
};
