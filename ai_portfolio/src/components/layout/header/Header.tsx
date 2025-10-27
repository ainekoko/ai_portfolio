'use client';
import { useState, useEffect, useCallback } from 'react';
import CustomCursor from '@/components/ui/CustomCursor';
import HamburgerButton from './HamburgerButton';
import Navigation from './Navigation';
import HeaderNav from './HeaderNav';
import Logo from './Logo';

/**
 *  ヘッダーコンポーネント
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);
  /**
   * セクションへスクロールするハンドラー
   * @param sectionId - スクロール先のセクションID
   */
  const onSectionClick = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({
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
        <nav className='pointer-events-none z-10 fixed top-0 right-0 w-full md:w-64 h-full flex flex-col'>
          {/* Hamburger Button */}
          <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />

          {/* hamburger Menu */}
          <Navigation isMenuOpen={isMenuOpen} onSectionClick={onSectionClick} />

          {/* 右側ナビゲーションメニュー（デスクトップのみ） */}
          <HeaderNav onSectionClick={onSectionClick} />
        </nav>

        {/* ロゴ */}
        <Logo onSectionClick={onSectionClick} />
      </header>
    </>
  );
};

export default Header;
