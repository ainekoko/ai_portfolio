import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='bg-[#C1FFEA] relative'>
      <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
        © 2025 Ai&rsquo;s Portfolio
      </p>
      <Image
        src='/assets/images/fotter.png'
        alt='クローバー'
        width={100} // 実際のサイズを指定
        height={100} // 実際のサイズを指定
        className=''
      />
    </footer>
  );
};

export default Footer;
