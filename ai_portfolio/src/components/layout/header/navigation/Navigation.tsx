import React, { useEffect, useRef } from 'react';
import styles from '../Header.module.css';
import { NAV_MENU } from '@/utils/HeaderData';

/**
 * ナビゲーションコンポーネントのプロパティ
 * @property isMenuOpen - メニューが開いているかどうか
 * @property onSectionClick - セクションクリックハンドラー
 */
type NavigationProps = {
  /** メニューが開いているかどうか */
  isMenuOpen: boolean;
  /** セクションクリックハンドラー */
  onSectionClick: (sectionId: string) => void;
  /** ナビゲーションメニューのデータ配列 */
  navMenuData: typeof NAV_MENU;
};

/**
 * ナビゲーションコンポーネント
 * @param isMenuOpen - メニューが開いているかどうか
 * @param onSectionClick - セクションクリックハンドラー
 * @param navMenuData - ナビゲーションメニューのデータ配列
 */
const Navigation = ({
  isMenuOpen,
  onSectionClick,
  navMenuData,
}: NavigationProps) => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const nav = navRef.current;
    console.log('Nav');
    if (!nav) return;

    // フォーカス可能な要素を取得
    const focusableElements = nav.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Tabキーの挙動を制御（フォーカストラップ）
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab（逆方向）
        console.log('Shift+Tab');
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else {
          return;
        }
      } else {
        // Tab（順方向）
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // イベントリスナーを追加
    document.addEventListener('keydown', handleTabKey);

    // 最初の要素にフォーカス
    firstElement.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isMenuOpen]);

  return (
    <nav
      id='morph-menu'
      ref={navRef}
      inert={!isMenuOpen || undefined}
      className={`fixed top-0 left-0 w-full h-screen bg-gray-900/[0.98] transition-all duration-700 ease-out z-[99999] pointer-events-auto ${
        isMenuOpen ? styles.navClipActive : styles.navClipInitial
      }`}
      aria-hidden={!isMenuOpen}
      role='dialog'
      aria-modal='true'
      aria-label='メインメニュー'
      data-testid='morph-menu'
    >
      <div className='flex items-center justify-center w-full h-full'>
        <ul className='m-0 p-0 list-none text-center' role='menu'>
          {navMenuData.map((item) => {
            // urlが'#'で始まる場合はセクションスクロール、それ以外はページ遷移
            const isHashLink = item.url?.startsWith('#');
            const href = item.url || `#${item.sectionId}`;

            return (
              <li
                key={item.sectionId}
                className={`opacity-0 translate-y-7 transition-all duration-[400ms] ease-out ${
                  item.delay
                } ${isMenuOpen ? styles.navItemEnter : ''}`}
                role='none'
              >
                <a
                  href={href}
                  onClick={(e) => {
                    if (!isHashLink) {
                      // ページ遷移の場合は通常のリンク遷移を許可
                      return;
                    }
                    e.preventDefault();
                    onSectionClick(item.sectionId);
                  }}
                  className='relative inline-block py-3 md:py-5 px-3 md:px-5 text-2xl md:text-3xl text-white no-underline overflow-hidden hover:text-pink-400 transition-colors duration-500'
                  role='menuitem'
                  tabIndex={isMenuOpen ? 0 : -1}
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
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
