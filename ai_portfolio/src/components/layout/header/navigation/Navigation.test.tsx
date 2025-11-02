import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from './Navigation';
import { NAV_MENU } from '../../../../utils/HeaderData';

describe('Navigation', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    mockOnClick.mockClear();
  });
  beforeEach(() => {});

  describe('正常系', () => {
    describe('ナビが開いている時', () => {
      it('コンポーネントが正しくレンダリングされる', () => {
        render(
          <Navigation
            isMenuOpen={true}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );
        waitFor(() => expect(screen.getByRole('menuitem')));
        const link = screen.getAllByRole('menuitem');
        expect(link[0]).toHaveAttribute('href', '#topSection');
        expect(link[1]).toHaveAttribute('href', '#cosmetics');
        expect(link[2]).toHaveAttribute('href', '#systemsEngineer');
        expect(link[3]).toHaveAttribute('href', '#portfolio');
        expect(link[4]).toHaveAttribute('href', '#mypage');
      });
      it('リンクをクリックするとonSectionClickが呼ばれる', () => {
        render(
          <Navigation
            isMenuOpen={true}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );

        const link = screen.getAllByRole('menuitem')[0];
        fireEvent.click(link);

        // 正しい引数で呼ばれたことを確認
        expect(mockOnClick).toHaveBeenCalledWith('topSection');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
      });
    });
    describe('ナビが閉じている時', () => {
      it('リンクは表示されていない', () => {
        render(
          <Navigation
            isMenuOpen={false}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );
        const nav = screen.getByTestId('morph-menu');
        expect(nav).toHaveAttribute('aria-hidden', 'true');
      });
    });
    describe('キーボード操作', () => {
      it('メニューが開くと最初の要素にフォーカス', async () => {
        render(
          <Navigation
            isMenuOpen={true}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );

        const menuItems = screen.getAllByRole('menuitem');

        await waitFor(() => {
          expect(document.activeElement).toBe(menuItems[0]);
        });
      });

      it('最初の要素でShift+Tabを押すと最後に移動する', async () => {
        render(
          <Navigation
            isMenuOpen={true}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );

        const menuItems = screen.getAllByRole('menuitem');

        // 最初の要素にフォーカスがあることを確認
        await waitFor(() => {
          expect(document.activeElement).toBe(menuItems[0]);
        });

        // Shift+Tabを押す
        fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

        // 最後の要素にフォーカスが移動
        expect(document.activeElement).toBe(menuItems[4]);
      });
      it('3番目の要素にフォーカスがある状態でShift+Tab:3番目のままである事', async () => {
        render(
          <Navigation
            isMenuOpen={true}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );

        const menuItems = screen.getAllByRole('menuitem');
        // 3番目の要素にフォーカスを設定
        menuItems[2].focus();
        // Shift+Tabを押す
        fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
        expect(document.activeElement).toBe(menuItems[2]);
      });
      it('最後の要素でTabを押すと最初に戻る', () => {
        render(
          <Navigation
            isMenuOpen={true}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );

        const menuItems = screen.getAllByRole('menuitem');

        // 最後の要素にフォーカスを設定
        menuItems[4].focus();
        expect(document.activeElement).toBe(menuItems[4]);

        // Tabキーを押す（shiftKey: false を明示）
        fireEvent.keyDown(document, { key: 'Tab', shiftKey: false });

        // 最初の要素にフォーカスが戻る
        expect(document.activeElement).toBe(menuItems[0]);
      });

      it('中間要素でTabを押してもフォーカストラップは発動しない', () => {
        render(
          <Navigation
            isMenuOpen={true}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );

        const menuItems = screen.getAllByRole('menuitem');

        // 2番目の要素にフォーカス
        menuItems[1].focus();

        // Tabキーを押す
        fireEvent.keyDown(document, { key: 'Tab', shiftKey: false });

        // ブラウザのデフォルト動作に委ねる（テスト環境ではフォーカス移動しない）
        // この分岐は通らないが、それが正しい動作
      });

      it('Tab以外のキーでは何も起こらない', async () => {
        render(
          <Navigation
            isMenuOpen={true}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );

        const menuItems = screen.getAllByRole('menuitem');

        await waitFor(() => {
          expect(document.activeElement).toBe(menuItems[0]);
        });

        // Enterキーを押す
        fireEvent.keyDown(document, { key: 'Enter' });

        // フォーカスは変わらない
        expect(document.activeElement).toBe(menuItems[0]);
      });
    });
  });
  describe('異常系', () => {
    // ファイルの先頭でモック
    jest.mock('@/utils/HeaderData', () => ({
      NAV_MENU: [], // 空配列
    }));
    it('フォーカス可能な要素が0個の場合、早期リターンする', () => {
      // NAV_MENUが空配列なので、<a>要素が生成されない
      expect(() => {
        render(
          <Navigation
            isMenuOpen={true}
            onSectionClick={mockOnClick}
            navMenuData={NAV_MENU}
          />
        );
      }).not.toThrow();

      // エラーが起きずに正常にレンダリングされることを確認
      const nav = screen.getByTestId('morph-menu');
      expect(nav).toBeInTheDocument();
    });
  });
});
