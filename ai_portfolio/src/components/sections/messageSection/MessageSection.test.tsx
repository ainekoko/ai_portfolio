import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageSection from './MessageSection';

describe('MessageSection', () => {
  describe('正常系', () => {
    beforeEach(() => {});
    afterEach(() => {});
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<MessageSection />);

      // section要素が存在するか
      const section = screen.getByRole('region', { name: 'メッセージ' });
      expect(section).toBeInTheDocument();
    });
  });
  describe('異常系', () => {});
});
