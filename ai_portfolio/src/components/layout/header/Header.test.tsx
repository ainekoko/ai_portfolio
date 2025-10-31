import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<Header />);
    // ヘッダー要素が存在するか
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('ハンバーガーメニューボタンをクリックするとメニューが開く', async () => {
    render(<Header />);
    // <Navigation>を取得
    const nav = screen.getByTestId('morph-menu');
    // <HamburgerBtn>を取得
    const hamburgerBtn = screen.getByTestId('hamburger-button');

    expect(nav).toHaveAttribute('aria-hidden', 'true');
    // click（オープン）
    fireEvent.click(hamburgerBtn);
    // click（クローズ）
    expect(nav).toHaveAttribute('aria-hidden', 'false');
    fireEvent.click(hamburgerBtn);
    expect(nav).toHaveAttribute('aria-hidden', 'true');
  });
  it('ロゴをクリックするとトップにスクロールする', () => {
    render(<Header />);
    const logo = screen.getByRole('link', { name: 'トップページへ戻る' });
    fireEvent.click(logo);
    expect(logo).toHaveAttribute('href', '#topSection');
    // const HeaderNav = screen.getByTestId('side-nav');
  });
});
