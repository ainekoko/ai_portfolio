import React from 'react';
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
  return (
    <nav
      id='morph-menu'
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
