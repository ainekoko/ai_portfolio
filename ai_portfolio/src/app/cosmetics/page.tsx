'use client';
import React, { useRef, useState, useEffect } from 'react';

// 横スクロールコンテンツ
function HorizontalScrollContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // サンプルデータ
  const sections = [
    {
      title: 'ネイリスト',
      color: '#ff6b9d',
      year: '2011',
      description: '店舗接客にてコミュニケーションスキルを身に着ける',
    },
    {
      title: 'ルート営業',
      color: '#c44569',
      year: '2012~2016',
      description: '全国の店舗へ直接出向き、商品の棚卸発注や新商品の紹介',
    },
    {
      title: 'OEM営業',
      color: '#6a5acd',
      year: '2015~2017',
      description: 'オリジナル商品の開発・製造をサポート',
    },
    {
      title: 'フロントエンドエンジニア',
      color: '#4682b4',
      year: '2018~2020',
      description: 'HTML/CSS/PHP/Laravelを使用した開発',
    },
    {
      title: 'システムエンジニア',
      color: '#20b2aa',
      year: '2020~2024',
      description: 'Vue.js/TypeScript/Jestを使用した大規模開発',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    // マウスホイールで横スクロール
    const handleWheel = (e: WheelEvent) => {
      // 横スクロール可能な範囲内でのみ処理
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll > 0) {
        e.preventDefault();
        e.stopPropagation();

        // スムーズなスクロール
        container.scrollBy({
          left: e.deltaY,
          behavior: 'auto',
        });
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='w-screen h-screen bg-gradient-to-br from-purple-900 to-blue-900 relative overflow-hidden'>
      {/* 横スクロールコンテナ */}
      <div
        ref={containerRef}
        className='w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.3) transparent',
        }}
      >
        <div
          className='flex h-full'
          style={{ width: `${sections.length * 100}vw` }}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className='w-screen h-full flex-shrink-0 snap-center flex items-center justify-center relative'
            >
              {/* 背景カード */}
              <div
                className='relative w-[600px] h-[400px] rounded-3xl shadow-2xl p-12 flex flex-col justify-center items-center'
                style={{ backgroundColor: section.color }}
              >
                {/* 番号 */}
                <div className='absolute top-8 right-8 text-white text-8xl font-bold opacity-20'>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* タイトル */}
                <h2 className='text-white text-5xl font-bold mb-4 z-10'>
                  {section.title}
                </h2>

                {/* 年度 */}
                <div className='text-white text-xl mb-6 opacity-80'>
                  {section.year}
                </div>

                {/* 説明文 */}
                <p className='text-white text-lg text-center max-w-md opacity-90'>
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* プログレスバー */}
      <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-white/20 rounded-full overflow-hidden z-10'>
        <div
          className='h-full bg-white transition-all duration-300'
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* スクロールガイド */}
      <div className='fixed bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-60 z-10 flex items-center gap-2'>
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 16l-4-4m0 0l4-4m-4 4h18'
          />
        </svg>
        横スクロールで移動
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17 8l4 4m0 0l-4 4m4-4H3'
          />
        </svg>
      </div>

      {/* ページインジケーター */}
      <div className='fixed top-1/2 right-8 transform -translate-y-1/2 flex flex-col gap-3 z-10'>
        {sections.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              Math.round(scrollProgress / (100 / sections.length)) === index
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

      {/* Webkit系ブラウザのスクロールバーカスタマイズ */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

// メインコンポーネント
export default function HorizontalScrollSample() {
  return <HorizontalScrollContent />;
}
