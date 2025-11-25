import React from 'react';

const Footer = () => {
  return (
    <footer className='relative'>
      <svg
        className='absolute top-0 w-full h-12 -mt-5'
        preserveAspectRatio='none'
        viewBox='0 0 1440 54'
      >
        <path
          fill='currentColor'
          className='text-teal-100'
          d='M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z'
        />
      </svg>
      <div className='bg-gradient-to-b from-teal-100 to-cyan-100 px-4 pt-12 pb-6'>
        <p className='text-center text-teal-500 text-xs'>
          © 2025 Ai&apos;s Portfolio
        </p>
      </div>
    </footer>
  );
};

export default Footer;
