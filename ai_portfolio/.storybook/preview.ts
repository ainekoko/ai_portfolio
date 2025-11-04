import '@/app/globals.css';
import type { Preview } from '@storybook/nextjs-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    layout: 'centered', // デフォルトレイアウト
    // viewport設定は削除（Storybook 9のデフォルトを使用）
  },
};

export default preview;
