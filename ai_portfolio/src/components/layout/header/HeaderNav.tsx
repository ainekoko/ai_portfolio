import React from 'react';
import { SIDE_MENU } from '@/utils/HeaderData';

type HeaderNavProps = {
  /** セクションクリックハンドラー */
  handleSectionClick: (sectionId: string) => void;
};

/**
 * ヘッダーナビゲーションコンポーネント
 */
const HeaderNav = ({ handleSectionClick }: HeaderNavProps) => {
  return (
    <div className='hidden lg:flex flex-col items-end pr-8 gap-1 mt-20 pointer-events-auto'>
      {SIDE_MENU.map((link, index) => (
        <a
          key={index}
          href={`#${link.href}`}
          onClick={(e) => {
            e.preventDefault();
            handleSectionClick(link.href);
          }}
          className='nav-text text-lg xl:text-xl text-gray-800 hover:text-gray-600 transition-all duration-300 transform hover:translate-x-2'
        >
          {link.text}
        </a>
      ))}
    </div>
  );
};

export default HeaderNav;
