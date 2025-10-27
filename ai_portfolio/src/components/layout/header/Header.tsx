'use client';
import { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.css';
import CustomCursor from '@/components/ui/CustomCursor';
import { NAV_MENU, SIDE_MENU } from '@/utils/HeaderData';
import HamburgerButton from './HamburgerButton';
import Navigation from './Navigation';
import HeaderNav from './HeaderNav';
import Logo from './Logo';

/**
 *  ヘッダーコンポーネント
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /**
   * セクションへスクロールするハンドラー
   * @param sectionId - スクロール先のセクションID
   */
  const handleSectionClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    closeMenu();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      {/* カスタムカーソル（デスクトップのみ） */}
      <div className='hidden md:block'>
        <CustomCursor />
      </div>

      <header>
        <nav className='pointer-events-none z-10 fixed top-0 right-0 w-full md:w-64 h-full flex flex-col'>
          <div className='header'>
            {/* Hamburger Button */}
            <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />

            {/* Navigation Menu */}
            <Navigation
              isMenuOpen={isMenuOpen}
              handleSectionClick={handleSectionClick}
            />
          </div>

          {/* ナビゲーションメニュー（デスクトップのみ） */}
          <HeaderNav handleSectionClick={handleSectionClick} />
        </nav>

        {/* ロゴ */}
        <Logo handleSectionClick={handleSectionClick} />
      </header>
    </>
  );
};

export default Header;
