import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './Logo';

describe('Logo', () => {
  const mockOnSectionClick = jest.fn();

  afterEach(() => {
    mockOnSectionClick.mockClear();
  });

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<Logo onSectionClick={mockOnSectionClick} />);

    const link = screen.getByRole('link', { name: 'トップページへ戻る' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('リンクをクリックするとonSectionClickが呼ばれる', () => {
    render(<Logo onSectionClick={mockOnSectionClick} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    // 正しい引数で呼ばれたことを確認
    expect(mockOnSectionClick).toHaveBeenCalledWith('topSection');
    expect(mockOnSectionClick).toHaveBeenCalledTimes(1);
  });

  it('複数回クリックすると複数回呼ばれる', () => {
    render(<Logo onSectionClick={mockOnSectionClick} />);

    const link = screen.getByRole('link');

    fireEvent.click(link);
    fireEvent.click(link);
    fireEvent.click(link);

    expect(mockOnSectionClick).toHaveBeenCalledTimes(3);
  });
});
