import React, { useEffect, useRef } from 'react';
import styles from './Header.module.css';
import { NAV_MENU } from '@/utils/HeaderData';

type NavigationProps = {
  /** メニューが開いているかどうか */
  isMenuOpen: boolean;
  /** セクションクリックハンドラー */
  handleSectionClick: (sectionId: string) => void;
};

/**
 * ナビゲーションコンポーネント
 * @param isMenuOpen - メニューが開いているかどうか
 * @param handleSectionClick - セクションクリックハンドラー
 */
const Navigation = ({ isMenuOpen, handleSectionClick }: NavigationProps) => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // メニューが閉じている場合は何もしない
    if (!isMenuOpen) return;

    const nav = navRef.current;
    if (!nav) return;

    // フォーカス可能な要素を取得
    const focusableElements = nav.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    // Tabキーの挙動を制御（ナビを開いている最中は他のボタンのフォーカスを制御する）
    const handleTabKey = (e: KeyboardEvent) => {
      console.log('e', e);
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus(); // 最初→最後にループ
        }
      }
      // Tab（順方向）
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus(); // 最後→最初にループ
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus(); // 最初の要素にフォーカス
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isMenuOpen]);

  return (
    <nav
      id='morph-menu'
      ref={navRef}
      inert={!isMenuOpen || undefined}
      className={`fixed top-0 left-0 w-full h-screen bg-gray-900/[0.98] transition-all duration-700 ease-out z-[900] pointer-events-auto ${
        isMenuOpen ? styles.navClipActive : styles.navClipInitial
      }`}
      aria-hidden={!isMenuOpen}
    >
      <div className='flex items-center justify-center w-full h-full'>
        <ul className='m-0 p-0 list-none text-center'>
          {NAV_MENU.map((item, index) => (
            <li
              key={index}
              className={`opacity-0 translate-y-7 transition-all duration-[400ms] ease-out ${
                item.delay
              } ${isMenuOpen ? styles.navItemEnter : ''}`}
            >
              <a
                href={`#${item.sectionId}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick(item.sectionId);
                }}
                className='relative inline-block py-3 md:py-5 px-3 md:px-5 text-2xl md:text-3xl text-white no-underline overflow-hidden hover:text-pink-400 transition-colors duration-500'
              >
                <span className='block pointer-events-none'>
                  {item.en}
                  <br />
                  <span className='text-xs md:text-sm opacity-70'>
                    {item.ja}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
