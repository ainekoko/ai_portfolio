import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HamburgerBtn from './HamburgerBtn';

describe('HamburgerBtn', () => {
  describe('正常系', () => {
    const mockOnClick = jest.fn();
    beforeEach(() => {});
    afterEach(() => {});
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<HamburgerBtn isOpen onClick={mockOnClick} />);
      waitFor(() => expect(screen.getByRole('button')));
      const button = screen.getByRole('button');
      //ボタンの押下
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);

      //さらに3回押下
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(4);
    });
    it('閉じている状態で正しく表示される', () => {
      render(<HamburgerBtn isOpen={false} onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'メニューを開く');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).not.toHaveClass('hamburgerActive');
    });
    it('開いている状態で正しく表示される', () => {
      render(<HamburgerBtn isOpen={true} onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'メニューを閉じる');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(button).toHaveClass('hamburgerActive');
    });
  });
  describe('異常系', () => {});
});
