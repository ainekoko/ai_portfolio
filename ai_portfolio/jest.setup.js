// jest.setup.js

// ==========================================
// コンソールエラーを抑制（既存のコード）
// ==========================================
const originalError = console.error;
console.error = (...args) => {
  const message = args[0];
  if (
    typeof message === 'string' &&
    (message.includes('non-boolean attribute') ||
      message.includes('jsx') ||
      message.includes('global'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// ==========================================
// 👇 ここから追加
// ==========================================

// @testing-library/jest-dom のインポート
import '@testing-library/jest-dom';

// Next.js Image のモック
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const {
      priority,
      fill,
      loading,
      quality,
      placeholder,
      blurDataURL,
      ...rest
    } = props;
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...rest} />;
  },
}));

// IntersectionObserver のモック（FadeInElement用）
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

// ResizeObserver のモック
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// window.matchMedia のモック（レスポンシブテスト用）
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
