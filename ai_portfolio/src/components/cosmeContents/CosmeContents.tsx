'use client';
import React, { useRef, useState, useEffect } from 'react';
import ProgressBer from './ProgressBer';
import PageIndicator from './PageIndicator';

// 横スクロールコンテンツ
function CosmeContents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      const containerWidth = container.clientWidth;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      // 現在のインデックスを計算（四捨五入で最も近いセクションを判定）
      const index = Math.round(scrollLeft / containerWidth);
      setCurrentIndex(Math.min(index, sections.length - 1));
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

      {/* ページインジケーター */}
      <PageIndicator
        sections={sections}
        scrollProgress={scrollProgress}
        containerRef={containerRef}
      />

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

export default CosmeContents;
