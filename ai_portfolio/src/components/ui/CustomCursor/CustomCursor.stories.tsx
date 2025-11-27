import type { Meta, StoryObj } from '@storybook/nextjs';
import CustomCursor from './CustomCursor';
import React from 'react';

interface CustomCursorProps {
  className?: string;
  hoverSelectors?: string;
  mainCursorSize?: number;
  followerCursorSize?: number;
  smoothness?: number;
}

const meta = {
  title: 'Components/UI/CustomCursor',
  component: CustomCursor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    mainCursorSize: {
      control: { type: 'range', min: 8, max: 24, step: 2 },
      description: 'メインカーソルのサイズ（px）',
    },
    followerCursorSize: {
      control: { type: 'range', min: 20, max: 60, step: 4 },
      description: 'フォロワーカーソルのサイズ（px）',
    },
    smoothness: {
      control: { type: 'range', min: 0.05, max: 0.5, step: 0.05 },
      description: 'カーソル追従の滑らかさ（0-1）',
    },
    hoverSelectors: {
      control: 'text',
      description: 'ホバー時にエフェクトを適用するCSSセレクター',
    },
  },
} satisfies Meta<typeof CustomCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: CustomCursorProps) => (
  <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8'>
    <CustomCursor {...args} />
    <div className='max-w-4xl mx-auto space-y-8 text-white'>
      <h1 className='text-4xl font-bold mb-4'>Custom Cursor Demo</h1>
      <p className='text-gray-300 mb-8'>
        マウスを動かしてカスタムカーソルの動きを確認してください。
      </p>

      <div className='space-y-4'>
        <section className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4'>
            ホバーエフェクトのテスト
          </h2>
          <div className='space-x-4'>
            <button className='px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors'>
              ボタン1
            </button>
            <button className='px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors'>
              ボタン2
            </button>
            <a
              href='#'
              className='inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors'
            >
              リンク
            </a>
          </div>
        </section>

        <section className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4'>テキストエリア</h2>
          <p className='text-gray-300 mb-4'>
            通常のテキストエリアではカーソルは標準の表示です。
          </p>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='テキスト入力'
              className='w-full px-4 py-2 bg-white/20 rounded-lg text-white placeholder-gray-400'
            />
            <textarea
              placeholder='テキストエリア'
              rows={4}
              className='w-full px-4 py-2 bg-white/20 rounded-lg text-white placeholder-gray-400'
            />
          </div>
        </section>

        <section className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4'>クリック可能な要素</h2>
          <div className='grid grid-cols-3 gap-4'>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                role='button'
                className='clickable p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform'
              >
                カード {num}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  render: Template,
  args: {
    mainCursorSize: 12,
    followerCursorSize: 32,
    smoothness: 0.15,
  },
};
