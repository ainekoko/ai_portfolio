import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  describe('正常系', () => {
    let topSection: HTMLElement;
    let scrollIntoViewMock: jest.Mock;

    beforeEach(() => {
      // テスト用の要素を作成
      topSection = document.createElement('section');
      topSection.id = 'topSection';
      document.body.appendChild(topSection);

      scrollIntoViewMock = jest.fn();
      topSection.scrollIntoView = scrollIntoViewMock;
    });
    afterEach(() => {
      // 各テストの後にクリーンアップ
      document.body.removeChild(topSection);
    });
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<Header />);
      // ヘッダー要素が存在するか
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });
    it('ロゴをクリックするとトップにスクロールする', async () => {
      render(<Header />);
      const logo = screen.getByRole('link', { name: 'トップページへ戻る' });

      await fireEvent.click(logo);

      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });
    /**
     * ハンバーガーメニュー、ナビゲーションの動作確認
     * - メニューの開閉
     * - エスケープキーでメニューを閉じる
     */
    describe('ハンバーガーメニュー、ナビゲーション', () => {
      it('ハンバーガーメニューボタンをクリックするとメニューが開く', async () => {
        render(<Header />);
        // <Navigation>を取得
        const nav = screen.getByTestId('morph-menu');
        // <HamburgerBtn>を取得
        const hamburgerBtn = screen.getByTestId('hamburger-button');

        expect(nav).toHaveAttribute('aria-hidden', 'true');
        // click（オープン）
        fireEvent.click(hamburgerBtn);
        expect(nav).toHaveAttribute('aria-hidden', 'false');
        // click（クローズ）
        fireEvent.click(hamburgerBtn);
        expect(nav).toHaveAttribute('aria-hidden', 'true');
      });
      it('エスケープキーを押下するとメニューが閉じる', async () => {
        render(<Header />);
        // <Navigation>を取得
        const nav = screen.getByTestId('morph-menu');
        // <HamburgerBtn>を取得
        const hamburgerBtn = screen.getByTestId('hamburger-button');

        expect(nav).toHaveAttribute('aria-hidden', 'true');
        // click（オープン）
        fireEvent.click(hamburgerBtn);
        expect(nav).toHaveAttribute('aria-hidden', 'false');
        // click（エスケープキー）
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(nav).toHaveAttribute('aria-hidden', 'true');
      });

      it('ESCキーを押してもメニューが閉じていれば何もしない', async () => {
        render(<Header />);
        const nav = screen.getByTestId('morph-menu');

        // メニューは最初から閉じている
        expect(nav).toHaveAttribute('aria-hidden', 'true');
        // ESCキーを押す
        fireEvent.keyDown(document, { key: 'Escape' });
        // 状態が変わらないことを確認
        expect(nav).toHaveAttribute('aria-hidden', 'true');
      });

      it('ESC以外のキーを押しても何もしない', async () => {
        render(<Header />);

        // メニューを開く
        const hamburgerBtn = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerBtn);
        const nav = screen.getByTestId('morph-menu');
        expect(nav).toHaveAttribute('aria-hidden', 'false');
        // Enterキーを押す（ESC以外）
        fireEvent.keyDown(document, { key: 'Enter' });
        // メニューは開いたまま
        expect(nav).toHaveAttribute('aria-hidden', 'false');
      });
    });
  });
  describe('異常系', () => {
    it('存在しないセクションの場合、警告を出力する', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(<Header />);
      // topSectionは作成しない

      const link = screen.getByRole('link', { name: 'トップページへ戻る' });
      fireEvent.click(link);

      expect(warnSpy).toHaveBeenCalledWith(
        'Section with id "topSection" not found'
      );

      warnSpy.mockRestore();
    });
  });
});
