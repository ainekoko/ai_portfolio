import type { Meta, StoryObj } from '@storybook/nextjs';
import FadeInElement from './FadeIn';

interface FadeInElementProps {
  children?: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

const meta: Meta<FadeInElementProps> = {
  title: 'Components/Common/FadeInElement',
  component: FadeInElement,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
      description: 'フェードインする方向',
    },
    delay: {
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
      description: 'アニメーションの遅延時間（秒）',
    },
  },
};

export default meta;
type Story = StoryObj<FadeInElementProps>;

export const Default: Story = {
  args: {
    direction: 'up',
    delay: 0,
  },
  render: (args) => (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8'>
      <FadeInElement {...args}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            フェードインテスト
          </h2>
          <p className='text-gray-300'>
            このコンテンツは下からフェードインします
          </p>
        </div>
      </FadeInElement>
    </div>
  ),
};

export const FadeFromUp: Story = {
  args: {
    direction: 'up',
    delay: 0,
  },
  render: (args) => (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8'>
      <FadeInElement {...args}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md'>
          <h2 className='text-2xl font-bold text-white mb-4'>↑ 上から</h2>
          <p className='text-gray-300'>下から上へフェードイン</p>
        </div>
      </FadeInElement>
    </div>
  ),
};

export const FadeFromDown: Story = {
  args: {
    direction: 'down',
    delay: 0,
  },
  render: (args) => (
    <div className='min-h-screen bg-gradient-to-br from-green-900 to-teal-900 p-8'>
      <FadeInElement {...args}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md'>
          <h2 className='text-2xl font-bold text-white mb-4'>↓ 下から</h2>
          <p className='text-gray-300'>上から下へフェードイン</p>
        </div>
      </FadeInElement>
    </div>
  ),
};

export const FadeFromLeft: Story = {
  args: {
    direction: 'left',
    delay: 0,
  },
  render: (args) => (
    <div className='min-h-screen bg-gradient-to-br from-orange-900 to-red-900 p-8'>
      <FadeInElement {...args}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md'>
          <h2 className='text-2xl font-bold text-white mb-4'>← 左から</h2>
          <p className='text-gray-300'>右から左へフェードイン</p>
        </div>
      </FadeInElement>
    </div>
  ),
};

export const FadeFromRight: Story = {
  args: {
    direction: 'right',
    delay: 0,
  },
  render: (args) => (
    <div className='min-h-screen bg-gradient-to-br from-pink-900 to-purple-900 p-8'>
      <FadeInElement {...args}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md'>
          <h2 className='text-2xl font-bold text-white mb-4'>→ 右から</h2>
          <p className='text-gray-300'>左から右へフェードイン</p>
        </div>
      </FadeInElement>
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    direction: 'up',
    delay: 0.5,
  },
  render: (args) => (
    <div className='min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 p-8'>
      <FadeInElement {...args}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            遅延フェードイン
          </h2>
          <p className='text-gray-300'>0.5秒遅延してからフェードインします</p>
        </div>
      </FadeInElement>
    </div>
  ),
};

export const MultipleElements: Story = {
  args: {
    direction: 'up',
  },
  render: () => (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 space-y-8'>
      <FadeInElement direction='up' delay={0}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-6'>
          <h3 className='text-xl font-bold text-white mb-2'>要素 1</h3>
          <p className='text-gray-300'>遅延なし</p>
        </div>
      </FadeInElement>

      <FadeInElement direction='up' delay={0.2}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-6'>
          <h3 className='text-xl font-bold text-white mb-2'>要素 2</h3>
          <p className='text-gray-300'>0.2秒遅延</p>
        </div>
      </FadeInElement>

      <FadeInElement direction='up' delay={0.4}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-6'>
          <h3 className='text-xl font-bold text-white mb-2'>要素 3</h3>
          <p className='text-gray-300'>0.4秒遅延</p>
        </div>
      </FadeInElement>

      <FadeInElement direction='up' delay={0.6}>
        <div className='bg-white/10 backdrop-blur-md rounded-lg p-6'>
          <h3 className='text-xl font-bold text-white mb-2'>要素 4</h3>
          <p className='text-gray-300'>0.6秒遅延</p>
        </div>
      </FadeInElement>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  args: {
    direction: 'up',
    delay: 0,
  },
  render: () => (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-white mb-4'>
            FadeInElement デモ
          </h1>
          <p className='text-gray-400'>
            スクロールして下の要素を表示させてください
          </p>
        </div>

        <div className='h-screen flex items-center justify-center'>
          <div className='text-white text-2xl'>↓ スクロールしてください ↓</div>
        </div>

        <FadeInElement direction='up' delay={0}>
          <div className='bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-lg p-8 border border-white/10'>
            <h2 className='text-2xl font-bold text-white mb-4'>セクション 1</h2>
            <p className='text-gray-300'>
              Intersection
              Observerを使用して、要素が画面内に入ったときにフェードインアニメーションを実行します。
            </p>
          </div>
        </FadeInElement>

        <div className='h-96'></div>

        <FadeInElement direction='left' delay={0}>
          <div className='bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-md rounded-lg p-8 border border-white/10'>
            <h2 className='text-2xl font-bold text-white mb-4'>セクション 2</h2>
            <p className='text-gray-300'>
              左からフェードインする例です。direction
              プロパティで方向を変更できます。
            </p>
          </div>
        </FadeInElement>

        <div className='h-96'></div>

        <FadeInElement direction='right' delay={0}>
          <div className='bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-lg p-8 border border-white/10'>
            <h2 className='text-2xl font-bold text-white mb-4'>セクション 3</h2>
            <p className='text-gray-300'>
              右からフェードインする例です。スムーズなアニメーションが特徴です。
            </p>
          </div>
        </FadeInElement>

        <div className='h-96'></div>

        <FadeInElement direction='down' delay={0.3}>
          <div className='bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-lg p-8 border border-white/10'>
            <h2 className='text-2xl font-bold text-white mb-4'>セクション 4</h2>
            <p className='text-gray-300'>
              上からフェードインし、0.3秒の遅延があります。delay
              プロパティで遅延時間を調整できます。
            </p>
          </div>
        </FadeInElement>

        <div className='h-screen'></div>
      </div>
    </div>
  ),
};
