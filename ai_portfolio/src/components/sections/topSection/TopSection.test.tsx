import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopSection from './TopSection';

describe('TopSection', () => {
  describe('正常系', () => {
    beforeEach(() => {});
    afterEach(() => {});
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<TopSection isVisible={true} />);

      // section要素が存在するか
      const section = screen.getByRole('region', { name: 'トップセクション' });
      expect(section).toBeInTheDocument();
    });

    it('isVisible=true の場合、opacity-100 クラスが適用される', () => {
      render(<TopSection isVisible={true} />);

      const helloHeading = screen.getByRole('heading', {
        name: /hello/i,
        level: 2,
      });

      // opacity-100 があることを確認
      expect(helloHeading).toHaveClass('opacity-100');
      expect(helloHeading).not.toHaveClass('opacity-20');
    });

    it('isVisible=false の場合、opacity-20 と -translate-y-20 クラスが適用される', () => {
      render(<TopSection isVisible={false} />);

      const helloHeading = screen.getByRole('heading', {
        name: /hello/i,
        level: 2,
      });

      // opacity-20 があることを確認
      expect(helloHeading).toHaveClass('opacity-20');
      expect(helloHeading).not.toHaveClass('opacity-100');
    });

    it('isVisibleの値によって表示スタイルが切り替わる', () => {
      const { rerender } = render(<TopSection isVisible={true} />);
      const helloHeading = screen.getByRole('heading', {
        name: /hello/i,
        level: 2,
      });

      // 最初はtrue
      expect(helloHeading).toHaveClass('opacity-100');

      // falseに変更
      rerender(<TopSection isVisible={false} />);
      expect(helloHeading).toHaveClass('opacity-20');

      // 再度trueに変更
      rerender(<TopSection isVisible={true} />);
      expect(helloHeading).toHaveClass('opacity-100');
    });
  });
  describe('異常系', () => {});
});
