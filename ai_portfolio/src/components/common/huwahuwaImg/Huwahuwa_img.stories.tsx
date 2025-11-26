import type { Meta, StoryObj } from '@storybook/nextjs';
import Huwahuwa_img from './Huwahuwa_img';

interface HuwahuwaImgProps {
  image: string;
  name: string;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  move?: string;
  speech?: string | React.ReactElement;
  speechWidth?: string;
}

const meta: Meta<HuwahuwaImgProps> = {
  title: 'Components/Common/HuwahuwaImg',
  component: Huwahuwa_img,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'text',
      description: '画像ファイル名',
    },
    name: {
      control: 'text',
      description: '画像のaltテキスト',
    },
    top: {
      control: 'text',
      description: '上からの位置',
    },
    right: {
      control: 'text',
      description: '右からの位置',
    },
    left: {
      control: 'text',
      description: '左からの位置',
    },
    bottom: {
      control: 'text',
      description: '下からの位置',
    },
    move: {
      control: 'select',
      options: ['float', 'sway', 'gentle'],
      description: '動作タイプ（float: 通常、sway: 風、gentle: 左右上下）',
    },
    speech: {
      control: 'text',
      description: '吹き出しのテキスト',
    },
    speechWidth: {
      control: 'text',
      description: '吹き出しの横幅',
    },
  },
};

export default meta;
type Story = StoryObj<HuwahuwaImgProps>;

export const Default: Story = {
  args: {
    image: 'flourish.png',
    name: 'サンプル画像',
    top: '50%',
    left: '50%',
    move: 'float',
  },
  render: (args) => (
    <div className='relative min-h-screen bg-gradient-to-br from-blue-100 to-purple-100'>
      <Huwahuwa_img {...args} />
    </div>
  ),
};

export const WithSpeechBubble: Story = {
  args: {
    image: 'flourish.png',
    name: 'メッセージ付き画像',
    top: '30%',
    left: '40%',
    move: 'float',
    speech: 'こんにちは！フワフワしています',
    speechWidth: '200px',
  },
  render: (args) => (
    <div className='relative min-h-screen bg-gradient-to-br from-blue-100 to-purple-100'>
      <Huwahuwa_img {...args} />
    </div>
  ),
};

export const SwayAnimation: Story = {
  args: {
    image: 'flourish.png',
    name: '風に揺れる画像',
    top: '40%',
    left: '30%',
    move: 'sway',
  },
  render: (args) => (
    <div className='relative min-h-screen bg-gradient-to-br from-green-100 to-teal-100'>
      <Huwahuwa_img {...args} />
      <div className='absolute top-4 left-4 bg-white/80 p-4 rounded-lg'>
        <p className='text-sm text-gray-700'>風に揺れるアニメーション (sway)</p>
      </div>
    </div>
  ),
};

export const GentleAnimation: Story = {
  args: {
    image: 'flourish.png',
    name: '優しく動く画像',
    top: '35%',
    right: '25%',
    move: 'gentle',
  },
  render: (args) => (
    <div className='relative min-h-screen bg-gradient-to-br from-pink-100 to-orange-100'>
      <Huwahuwa_img {...args} />
      <div className='absolute top-4 left-4 bg-white/80 p-4 rounded-lg'>
        <p className='text-sm text-gray-700'>
          左右上下に優しく動くアニメーション (gentle)
        </p>
      </div>
    </div>
  ),
};

export const WideSpeechBubble: Story = {
  args: {
    image: 'flourish.png',
    name: '長い吹き出し',
    top: '40%',
    left: '50%',
    move: 'gentle',
    speech:
      'これは長いメッセージです。吹き出しの幅を広げて表示することができます。',
    speechWidth: '300px',
  },
  render: (args) => (
    <div className='relative min-h-screen bg-gradient-to-br from-purple-100 to-pink-100'>
      <Huwahuwa_img {...args} />
    </div>
  ),
};

export const MultipleImages: Story = {
  render: () => (
    <div className='relative min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100'>
      <Huwahuwa_img
        image='flourish.png'
        name='画像1'
        top='20%'
        left='20%'
        move='float'
        speech='フワフワ1'
        speechWidth='120px'
      />
      <Huwahuwa_img
        image='flourish.png'
        name='画像2'
        top='40%'
        right='20%'
        move='sway'
        speech='フワフワ2'
        speechWidth='120px'
      />
      <Huwahuwa_img
        image='flourish.png'
        name='画像3'
        bottom='20%'
        left='50%'
        move='gentle'
        speech='フワフワ3'
        speechWidth='120px'
      />
    </div>
  ),
};

export const InteractiveDemo: Story = {
  args: {
    image: 'flourish.png',
    name: 'インタラクティブデモ',
    top: '50%',
    left: '50%',
    move: 'float',
    speech: 'コントロールパネルで設定を変更できます',
    speechWidth: '250px',
  },
  render: (args) => (
    <div className='relative min-h-screen bg-gradient-to-br from-slate-100 to-gray-200'>
      <div className='absolute top-8 left-8 bg-white p-6 rounded-lg shadow-lg max-w-md z-50'>
        <h2 className='text-xl font-bold mb-4 text-gray-800'>
          Huwahuwa Image デモ
        </h2>
        <div className='space-y-3 text-sm text-gray-600'>
          <p>
            <strong>move=&quot;float&quot;:</strong>{' '}
            通常のフワフワアニメーション
          </p>
          <p>
            <strong>move=&quot;sway&quot;:</strong>{' '}
            風に揺れるようなアニメーション
          </p>
          <p>
            <strong>move=&quot;gentle&quot;:</strong>{' '}
            左右上下に優しく動くアニメーション
          </p>
          <p className='pt-2 border-t border-gray-300'>
            位置はtop/right/bottom/leftで指定できます
          </p>
        </div>
      </div>
      <Huwahuwa_img {...args} />
    </div>
  ),
};
