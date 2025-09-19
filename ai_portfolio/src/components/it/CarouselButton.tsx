import React from 'react';

interface CarouselButtonProps {
  prevSlide: () => void;
  nextSlide: () => void;
  currentSlide: number;
  totalSlides: number;
}

/**
 *
 * @returns カルーセルの左右の矢印ボタン
 */
const CarouselButton = ({
  prevSlide,
  nextSlide,
  currentSlide,
  totalSlides,
}: CarouselButtonProps) => {
  return (
    <>
      {/* 左矢印ボタン */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group ${
          currentSlide === 0
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-white/90 hover:bg-white'
        }`}
        aria-label='前のプロジェクトを見る'
      >
        <div className='flex items-center gap-[-2px]'>
          <div
            className={`w-3 h-3 border-l-2 border-b-2 transform rotate-45 transition-colors ${
              currentSlide === 0
                ? 'border-gray-500'
                : 'border-gray-600 group-hover:border-gray-800'
            }`}
          ></div>
          <div
            className={`w-3 h-3 border-l-2 border-b-2 transform rotate-45 -ml-1 transition-colors ${
              currentSlide === 0
                ? 'border-gray-500'
                : 'border-gray-600 group-hover:border-gray-800'
            }`}
          ></div>
        </div>
      </button>
      {/* 右矢印ボタン */}
      <button
        onClick={nextSlide}
        disabled={currentSlide === totalSlides - 1}
        className={`absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group ${
          currentSlide === totalSlides - 1
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-white/90 hover:bg-white'
        }`}
        aria-label='次のプロジェクトを見る'
      >
        <div className='flex items-center gap-[-2px]'>
          <div
            className={`w-3 h-3 border-r-2 border-b-2 transform -rotate-45 transition-colors ${
              currentSlide === totalSlides - 1
                ? 'border-gray-500'
                : 'border-gray-600 group-hover:border-gray-800'
            }`}
          ></div>
          <div
            className={`w-3 h-3 border-r-2 border-b-2 transform -rotate-45 -ml-1 transition-colors ${
              currentSlide === totalSlides - 1
                ? 'border-gray-500'
                : 'border-gray-600 group-hover:border-gray-800'
            }`}
          ></div>
        </div>
      </button>
    </>
  );
};

export default CarouselButton;
