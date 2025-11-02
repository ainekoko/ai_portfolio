import React from 'react';
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import TopSection from './TopSection';

const meta: Meta<typeof TopSection> = {
  component: TopSection,
  title: 'components/TopSection',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ヘッダーコンポーネントは、ウェブサイトのトップに表示されるナビゲーションバーです。ロゴ、ナビゲーションリンク、ハンバーガーメニューを含み、レスポンシブデザインに対応しています。',
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TopSection>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
