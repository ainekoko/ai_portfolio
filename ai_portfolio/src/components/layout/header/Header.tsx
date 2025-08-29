import React from 'react';

const Header = () => {
  return (
    <header>
      <nav className='z-10 fixed top-0 right-0 w-64 h-full flex flex-col'>
        <div className='p-6 flex justify-end'>
          <div className='flex flex-col gap-1'>
            <div className='w-8 h-0.5 bg-black'></div>
            <div className='w-8 h-0.5 bg-black'></div>
            <div className='w-8 h-0.5 bg-black'></div>
          </div>
        </div>

        {/* ナビゲーションメニュー */}
        <div className='flex flex-col items-end pr-8 gap-1'>
          <a
            href='#profile'
            className='nav-text text-xl text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:translate-x-2'
          >
            Profile
          </a>

          <a
            href='#experience'
            className='mt-0 nav-text text-xl text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:translate-x-2'
          >
            Previous Experience
          </a>

          <a
            href='#contact'
            className='mt-0 nav-text text-xl text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:translate-x-2'
          >
            Contact
          </a>
          <a
            href='#portfolio'
            className='nav-text text-xl text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:translate-x-2'
          >
            Portfolio
          </a>

          <a
            href='#mypage'
            className='text-xl text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:translate-x-2'
          >
            My Page
          </a>
        </div>
      </nav>
      {/* header Top */}
      <div className='sticky top-0 z-20'>
        <div className='header-top flex items-center px-6 pt-4 pb-2 relative'>
          <p className='text-[#3b3b3b] text-2xl font-bold tracking-wider'>
            Ai&rsquo;s Portfolio
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
