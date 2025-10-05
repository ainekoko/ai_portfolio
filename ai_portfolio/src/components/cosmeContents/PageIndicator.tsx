import React from 'react';

/**
 * ページインジケーターコンポーネント
 * @param sections: セクションの配列
 * @param scrollProgress: 現在のスクロール進捗（0〜100の範囲）
 * @param containerRef: 横スクロールコンテナのref
 */
interface PageIndicatorProps {
  sections: {
    title: string;
    color: string;
    year: string;
    description: string;
  }[];
  scrollProgress: number;
  containerRef: React.RefObject<HTMLDivElement>;
  currentIndex: number;
}

/**
 * ページインジケーターコンポーネント
 */
const PageIndicator = ({
  sections,
  scrollProgress,
  containerRef,
  currentIndex,
}: PageIndicatorProps) => {
  return (
    <div className='fixed top-1/2 right-8 transform -translate-y-1/2 flex flex-col gap-3 z-10'>
      {sections.map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentIndex === index
              ? 'bg-white scale-125'
              : 'bg-white/40 hover:bg-white/60'
          }`}
          onClick={() => {
            containerRef.current?.scrollTo({
              left: index * window.innerWidth,
              behavior: 'smooth',
            });
          }}
          aria-label={`${index + 1}番目のセクションへ移動`}
        />
      ))}
    </div>
  );
};

export default PageIndicator;
