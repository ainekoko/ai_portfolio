import React from 'react';
import styles from '../Header.module.css';

/**
 * ハンバーガーボタンのプロパティ
 * @property isOpen - メニューが開いているかどうか
 * @property onClick - クリックハンドラー
 */
type HamburgerBtnProps = {
  /** メニューが開いているかどうか */
  isOpen: boolean;
  /** クリックハンドラー */
  onClick: () => void;
};

/**
 * ハンバーガーボタンコンポーネント
 * @param isOpen - メニューが開いているかどうか
 * @param onClick - クリックハンドラー
 */
const HamburgerBtn = ({ isOpen, onClick }: HamburgerBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`fixed top-3 md:top-5 right-3 md:right-5 z-[100000] w-10 h-10 md:w-12 md:h-12 p-0 border-none bg-transparent cursor-pointer pointer-events-auto ${
        isOpen ? styles.hamburgerActive : ''
      }`}
      aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
      aria-controls='morph-menu'
      aria-expanded={isOpen}
      type='button'
      data-testid='hamburger-button'
    >
      <svg className='w-full h-full' viewBox='0 0 100 100' aria-hidden='true'>
        <path
          className={styles.hamburgerLine}
          d='M 20,29 H 80 C 80,29 94.5,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
        />
        <path className={styles.hamburgerLine} d='M 20,50 H 80' />
        <path
          className={styles.hamburgerLine}
          d='M 20,71 H 80 C 80,71 94.5,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
        />
      </svg>
    </button>
  );
};

export default HamburgerBtn;
