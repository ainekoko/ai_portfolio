'use client';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import CustomCursor from '@/components/ui/CustomCursor';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // セクションへのスクロール処理
  const handleSectionClick = (sectionId: string) => {
    console.log('クリックされたセクションID:', sectionId);
    // ThreeCanvasで設定されたグローバル関数を呼び出し
    if (typeof window !== 'undefined' && (window as any).scrollToSection) {
      (window as any).scrollToSection(sectionId);
    } else {
      // フォールバック: 通常のスクロール
      console.warn('scrollToSection function not available, using fallback');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeMenu();
  };

  // Escapeキーでメニューを閉じる
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
      {/* カスタムカーソル */}
      <CustomCursor />

      {/* デフォルトカーソルを非表示 */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      <header>
        <nav className='pointer-events-none z-10 fixed top-0 right-0 w-64 h-full flex flex-col'>
          <div className='header'>
            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className={`fixed top-5 right-5 z-[1000] w-12 h-12 p-0 border-none bg-transparent cursor-pointer pointer-events-auto ${
                isMenuOpen ? styles.hamburgerActive : ''
              }`}
              aria-label='メニュー'
              aria-controls='morph-menu'
              aria-expanded={isMenuOpen}
            >
              <svg
                className='w-full h-full'
                width='48'
                height='48'
                viewBox='0 0 100 100'
              >
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

            {/* Navigation Menu */}
            <nav
              id='morph-menu'
              className={`fixed top-0 left-0 w-full h-screen bg-gray-900/[0.98] transition-all duration-700 ease-out z-[900] pointer-events-auto ${
                isMenuOpen ? styles.navClipActive : styles.navClipInitial
              }`}
              aria-hidden={!isMenuOpen}
            >
              <div className='flex items-center justify-center w-full h-full'>
                <ul className='m-0 p-0 list-none text-center'>
                  {[
                    {
                      en: 'Home',
                      ja: 'ホーム',
                      sectionId: 'topSection',
                      delay: 'delay-[300ms]',
                    },
                    {
                      en: 'Profile',
                      ja: 'プロフィール',
                      sectionId: 'profile',
                      delay: 'delay-[400ms]',
                    },
                    {
                      en: 'Experience',
                      ja: '職務経歴',
                      sectionId: 'experience',
                      delay: 'delay-[500ms]',
                    },
                    {
                      en: 'Skills',
                      ja: 'スキル',
                      sectionId: 'skill',
                      delay: 'delay-[600ms]',
                    },
                    {
                      en: 'Contact',
                      ja: 'お問い合わせ',
                      sectionId: 'contact',
                      delay: 'delay-[700ms]',
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className={` opacity-0 translate-y-7 transition-all duration-[400ms] ease-out ${
                        item.delay
                      } ${isMenuOpen ? styles.navItemEnter : ''}`}
                    >
                      <a
                        href={`#${item.sectionId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSectionClick(item.sectionId);
                        }}
                        className='relative inline-block py-5 px-5 text-3xl text-white no-underline overflow-hidden hover:text-pink-400 transition-colors duration-500'
                      >
                        <span className='block pointer-events-none'>
                          {item.en}
                          <br />
                          <span className='text-sm opacity-70'>{item.ja}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          {/* ナビゲーションメニュー */}
          <div className='flex flex-col items-end pr-8 gap-1 mt-20 pointer-events-auto'>
            {[
              { href: 'topSection', text: 'Top' },
              { href: 'profile', text: 'Profile' },
              { href: 'experience', text: 'Previous Experience' },
              { href: 'skill', text: 'Skills' },
              { href: 'contact', text: 'Contact' },
            ].map((link, index) => (
              <a
                key={index}
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick(link.href);
                }}
                className='nav-text text-xl text-gray-800 hover:text-gray-600 transition-all duration-300 transform hover:translate-x-2'
              >
                {link.text}
              </a>
            ))}
          </div>
        </nav>

        {/* header Top */}
        <div className='fixed top-0 left-0 z-20 pointer-events-auto'>
          <div className='header-top flex items-center px-6 pt-4 pb-2 relative'>
            <a
              href='#topSection'
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('topSection');
              }}
              className='text-[#3b3b3b] text-2xl font-bold tracking-wider'
            >
              Ai&rsquo;s Portfolio
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
