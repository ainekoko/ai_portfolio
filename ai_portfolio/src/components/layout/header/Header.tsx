'use client';
import { useState, useCallback, useEffect } from 'react';
import CustomCursor from '@/components/ui/CustomCursor';
import HamburgerBtn from './humburger/HamburgerBtn';
import Navigation from './navigation/Navigation';
import HeaderNav from './headerNav/HeaderNav';
import Logo from './logo/Logo';

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
      console.log('１入った！:', sectionId);
      const element = document.getElementById(sectionId);
      console.log('element', element);

      if (!element) return;
      console.log('２入った！:', sectionId);

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      closeMenu();
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
          />

          {/* デスクトップナビゲーション */}
          <HeaderNav onSectionClick={handleSectionClick} />
        </nav>

        {/* ロゴ */}
        <Logo onSectionClick={handleSectionClick} />
      </header>
    </>
  );
};

export default Header;
