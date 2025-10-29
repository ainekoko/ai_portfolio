import React from 'react';
import { SIDE_MENU } from '@/utils/HeaderData';

/**
 * ヘッダーナビゲーションのプロパティ
 * @property onSectionClick - セクションクリックハンドラー
 */
type HeaderNavProps = {
  /** セクションクリックハンドラー */
  onSectionClick: (sectionId: string) => void;
};

/**
 * デスクトップ用サイドナビゲーションコンポーネント
 */
const HeaderNav = ({ onSectionClick }: HeaderNavProps) => {
  return (
    <nav
      className='hidden lg:flex flex-col items-end pr-8 gap-1 mt-20 pointer-events-auto'
      aria-label='サイドナビゲーション'
    >
      {SIDE_MENU.map((link) => (
        <a
          key={link.href}
          href={`#${link.href}`}
          onClick={(e) => {
            e.preventDefault();
            onSectionClick(link.href);
          }}
          className='nav-text text-lg xl:text-xl text-gray-800 hover:text-gray-600 transition-all duration-300 transform hover:translate-x-2'
        >
          {link.text}
        </a>
      ))}
    </nav>
  );
};

export default HeaderNav;
