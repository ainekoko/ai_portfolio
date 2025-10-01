import { SectionTitleProps } from '@/types/component';
import React from 'react';

/**
 * セクションタイトルコンポーネント
 * @param props - isVisible: boolean
 * @returns
 */
const SectionHeader = ({ isVisible, title, subtitle }: SectionTitleProps) => {
  return (
    <div className='flex items-center w-full relative my-6 md:my-10 mx-0'>
      {/* 左側の短い二重線 */}
      <div className='md:block hidden w-8 md:w-16 relative mr-3 md:mr-6 overflow-hidden'>
        <div
          className={`bg-gray-400 transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-full opacity-0'
          }`}
          style={{ height: '0.5px' }}
        ></div>
        <div
          className={`bg-gray-400 mt-1 transition-all duration-1000 ease-out delay-100 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-full opacity-0'
          }`}
          style={{ height: '0.5px' }}
        ></div>
      </div>
      <h2
        className={`relative px-2  md:px-3 py-3 md:py-5 text-7xl md:text-9xl inline-block text-right text-gray-800 ${
          isVisible ? '' : 'opacity-0'
        }`}
      >
        {title &&
          title.split('').map((letter, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-700 ease-out hover:text-amber-950 hover:rotate-12 hover:scale-125 ${
                isVisible
                  ? 'translate-y-0 opacity-100 rotate-0'
                  : 'translate-y-8 opacity-0 rotate-45'
              }`}
              style={{
                transitionDelay: `${200 + index * 100}ms`,
                fontWeight: '300',
                letterSpacing: '0.05em',
                textShadow: isVisible ? '2px 2px 4px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {letter}
            </span>
          ))}

        <span
          className={`text-xs md:text-sm ml-2 md:ml-4 italic text-gray-500 px-1 md:px-2 py-1 rounded transition-all duration-1000 ease-out delay-1000 ${
            isVisible
              ? 'translate-x-0 opacity-100 '
              : 'translate-x-4 opacity-0 bg-transparent'
          }`}
        >
          {subtitle && <span className='hidden lg:inline'>/ {subtitle}</span>}
        </span>
      </h2>
      {/* 右側の長い二重線 */}
      <div className='flex-1 ml-4 md:ml-8 relative overflow-hidden'>
        <div
          className={`bg-gray-400 transition-all duration-1000 ease-out delay-300 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          }`}
          style={{ height: '0.5px' }}
        ></div>
        <div
          className={`bg-gray-400 mt-1 transition-all duration-1000 ease-out delay-400 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          }`}
          style={{ height: '0.5px' }}
        ></div>
      </div>
    </div>
  );
};

export default SectionHeader;
