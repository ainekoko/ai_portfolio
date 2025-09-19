import React from 'react';

interface PageNationProps {
  currentSlide: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
}

const PageNation = ({
  currentSlide,
  totalSlides,
  goToSlide,
}: PageNationProps) => {
  return (
    <div className='flex justify-center items-center mt-6 gap-4'>
      {/* ページネーション */}
      <div className='text-sm text-gray-600 font-medium bg-white/80 px-3 py-1 rounded-full'>
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* インジケーター（ドット） */}
      <div className='flex gap-2'>
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index
                ? 'bg-gray-800'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`${index + 1}番目のプロジェクトを表示`}
          />
        ))}
      </div>
    </div>
  );
};

export default PageNation;
