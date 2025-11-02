import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderNav from './HeaderNav';
import { SIDE_MENU } from '../../../../utils/HeaderData';
describe('HeaderNav', () => {
  const mockOnSectionClick = jest.fn();

  afterEach(() => {
    mockOnSectionClick.mockClear();
  });

  it('コンポーネントが正しくレンダリングされる', () => {
    render(
      <HeaderNav onSectionClick={mockOnSectionClick} sideMenuData={SIDE_MENU} />
    );

    const link = screen.getAllByRole('link');
    expect(link[0]).toHaveAttribute('href', '#topSection');
    expect(link[1]).toHaveAttribute('href', '#profile');
    expect(link[2]).toHaveAttribute('href', '#message');
    expect(link[3]).toHaveAttribute('href', '#experience');
    expect(link[4]).toHaveAttribute('href', '#skill');
    expect(link[5]).toHaveAttribute('href', '#contact');
  });

  it('リンクをクリックするとonSectionClickが呼ばれる', () => {
    render(
      <HeaderNav onSectionClick={mockOnSectionClick} sideMenuData={SIDE_MENU} />
    );

    const link = screen.getAllByRole('link');
    fireEvent.click(link[0]);

    // 正しい引数で呼ばれたことを確認
    expect(mockOnSectionClick).toHaveBeenCalledWith('topSection');
    expect(mockOnSectionClick).toHaveBeenCalledTimes(1);
  });
});
