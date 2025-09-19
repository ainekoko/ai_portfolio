'use client';
import {
  ITJOB_INTRODUCTION_LEFT,
  ITJOB_INTRODUCTION_RIGHT,
} from '@/utils/itData';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CompanyBox from '@/components/it/CompanyBox';
import PageNation from '../it/PageNation';
import CarouselButton from '../it/CarouselButton';

const ItSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = ITJOB_INTRODUCTION_RIGHT.length;

  // 動的にスライド幅を計算する関数
  const getSlideWidth = useCallback(() => {
    if (!carouselRef.current) return 400;

    const container = carouselRef.current;
    const containerWidth = (container as HTMLElement).offsetWidth; // コンテナ幅に基づいてスライド幅を計算（gap分も考慮）
    return containerWidth;
  }, []);

  // ドットの状態を更新する関数
  const updateDots = useCallback(() => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const scrollLeft = (container as HTMLElement).scrollLeft;
    const slideWidth = getSlideWidth();
    const newSlide = Math.round(scrollLeft / slideWidth);
    setCurrentSlide(Math.max(0, Math.min(newSlide, totalSlides - 1)));
  }, [getSlideWidth, totalSlides]);

  // 指定されたスライドに移動する関数
  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (!carouselRef.current) return;

      const slideWidth = getSlideWidth();
      carouselRef.current.scrollTo({
        left: slideIndex * slideWidth,
        behavior: 'smooth',
      });
      setCurrentSlide(slideIndex);
    },
    [getSlideWidth]
  );

  // 前のスライドに移動
  const prevSlide = useCallback(() => {
    const newSlide = Math.max(0, currentSlide - 1);
    goToSlide(newSlide);
  }, [currentSlide, goToSlide]);

  // 次のスライドに移動
  const nextSlide = useCallback(() => {
    const newSlide = Math.min(totalSlides - 1, currentSlide + 1);
    goToSlide(newSlide);
  }, [currentSlide, totalSlides, goToSlide]);

  // リサイズ時の処理
  const handleResize = useCallback(() => {
    // リサイズ後に現在のスライドの位置を調整
    setTimeout(() => {
      goToSlide(currentSlide);
    }, 100);
  }, [currentSlide, goToSlide]);

  // スクロール終了時のイベントハンドラー
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout | undefined;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateDots, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    // リサイズイベントリスナーを追加
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
    };
  }, [updateDots, handleResize]);

  return (
    <section
      id='it'
      className='bg-[#bfdad1] relative top-[334vh] w-screen h-screen p-8 mt-8 py-6'
    >
      <div className='double-line-header flex items-center w-full relative my-10 mx-0'></div>
      <div className='container flex justify-left gap-4 flex-wrap justify-between m-auto'>
        {/* IT左側 */}
        <div className='w-6/12 flex flex-col'>
          <h3 className='text-3xl mb-1 pb-12'>
            {ITJOB_INTRODUCTION_LEFT.jobName}
            <span className='jp text-sm ml-2'>
              {ITJOB_INTRODUCTION_LEFT.jobPeriod}
            </span>
          </h3>
          <p className='leading-loose'>{ITJOB_INTRODUCTION_LEFT.content}</p>
          {/* ページネーション */}
          <PageNation
            currentSlide={currentSlide}
            totalSlides={totalSlides}
            goToSlide={goToSlide}
          />
        </div>

        {/* IT右側 - カルーセル風スライダー */}
        <div className='w-5/12 mt-3.5 z-10'>
          {/* カルーセルコンテナ */}
          <div className='relative max-w-full mx-auto'>
            {/* ナビボタン */}
            <CarouselButton
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              currentSlide={currentSlide}
              totalSlides={totalSlides}
            />

            {/* スライドコンテナ */}
            <div
              ref={carouselRef}
              className='overflow-x-auto scroll-smooth'
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none' /* Firefox */,
                msOverflowStyle: 'none' /* Internet Explorer 10+ */,
              }}
            >
              <div className='flex'>
                {/* プロジェクト先 */}
                <CompanyBox companyData={ITJOB_INTRODUCTION_RIGHT} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute opacity-80 bottom-5 left-10'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='../assets/images/nail_1.png' alt='ネイル' className='' />
      </div>
      <div className='absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 text-[#7b9696] text-9xl md:text-[10rem] font-bold whitespace-nowrap pointer-events-none select-none z-0'>
        SYSTEM ENGINEER
      </div>
    </section>
  );
};

export default ItSection;
