'use client';
import { useState, useCallback, useEffect } from 'react';
import CustomCursor from '@/components/ui/CustomCursor/CustomCursor';
import HamburgerBtn from './humburger/HamburgerBtn';
import Navigation from './navigation/Navigation';
import HeaderNav from './headerNav/HeaderNav';
import Logo from './logo/Logo';
import { NAV_MENU, SIDE_MENU } from '@/utils/HeaderData';

/**
 * ヘッダーコンポーネント
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // メニュー開閉のトグル
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // メニューを閉じる
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  /**
   * セクションへスクロールするハンドラー
   * @param sectionId - スクロール先のセクションID
   */
  const handleSectionClick = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) {
        console.warn(`Section with id "${sectionId}" not found`);
        return;
      }

      // メニューを先に閉じる
      closeMenu();

      // メニューのアニメーションが完了するまで待ってからスクロール
      setTimeout(() => {
        const yOffset = 0; // ヘッダーの高さ分のオフセット（必要に応じて調整）
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth',
        });
      }, 100);
    },
    [closeMenu]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {/* カスタムカーソル（デスクトップのみ） */}
      <div className='hidden md:block'>
        <CustomCursor />
      </div>

      <header>
        <nav
          className='pointer-events-none z-10 fixed top-0 right-0 w-full md:w-64 h-full flex flex-col'
          aria-label='メインナビゲーション'
        >
          {/* ハンバーガーメニュー */}
          <HamburgerBtn isOpen={isMenuOpen} onClick={toggleMenu} />

          {/* ナビゲーション */}
          <Navigation
            isMenuOpen={isMenuOpen}
            onSectionClick={handleSectionClick}
            navMenuData={NAV_MENU}
          />

          {/* デスクトップナビゲーション */}
          <HeaderNav
            onSectionClick={handleSectionClick}
            sideMenuData={SIDE_MENU}
          />
        </nav>

        {/* ロゴ */}
        <Logo onSectionClick={handleSectionClick} />
      </header>
    </>
  );
};

export default Header;
