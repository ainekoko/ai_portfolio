import React from 'react';

/**
 * ロゴコンポーネントのプロパティ
 * @property onSectionClick - セクションクリックハンドラー
 */
type LogoProps = {
  /** セクションクリックハンドラー */
  onSectionClick: (sectionId: string) => void;
};

/**
 * ロゴコンポーネント
 */
const Logo = ({ onSectionClick }: LogoProps) => {
  return (
    <div className='fixed top-0 left-0 z-100 pointer-events-auto'>
      <div className='header-top flex items-center px-3 md:px-6 pt-2 md:pt-4 pb-2 relative'>
        <a
          href='#topSection'
          onClick={(e) => {
            e.preventDefault();
            onSectionClick('topSection');
          }}
          className='text-[#3b3b3b] text-lg md:text-2xl font-bold tracking-wider'
          aria-label='トップページへ戻る'
        >
          Ai&rsquo;s Portfolio
        </a>
      </div>
    </div>
  );
};

export default Logo;
