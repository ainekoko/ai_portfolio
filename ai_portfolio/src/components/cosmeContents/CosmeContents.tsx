'use client';
import React, { useCallback, useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import './sample.css';
import SectionHeader from '../common/SectionHeader';
import { COSME_CONTENTS } from '@/utils/CosmeContentsData';
import Link from 'next/link';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

/**
 * 化粧品業界向けの横スクロールコンテンツ
 * @param props
 */
const CosmeContents: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onWheel = useCallback(
    (event: WheelEvent) => {
      // lg以下ではホイールイベントを無効化
      if (window.innerWidth < 1024) return;
      if (!emblaApi) return;
      event.preventDefault();

      if (event.deltaY > 0) {
        emblaApi.scrollNext();
      } else if (event.deltaY < 0) {
        emblaApi.scrollPrev();
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    // lg以下ではホイールイベントリスナーを追加しない
    if (window.innerWidth < 1024) return;

    const emblaNode = emblaApi?.rootNode();
    if (!emblaNode) return;

    emblaNode.addEventListener('wheel', onWheel, { passive: false });
    return () => emblaNode.removeEventListener('wheel', onWheel);
  }, [emblaApi, onWheel]);

  // キーボード操作のハンドラー
  useEffect(() => {
    if (!emblaApi) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // lg以下では無効化
      if (window.innerWidth < 1024) return;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          emblaApi.scrollNext();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          emblaApi.scrollPrev();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emblaApi]);

  return (
    <>
      {/* Section Title */}
      <SectionHeader
        isVisible
        title='Cosmetics Company'
        subtitle='化粧品企業'
        size='normal'
      />

      {/* カルーセル: lg以上で有効、lg以下で無効 */}
      <section className='embla w-screen px-2 text-sm min-h-screen lg:h-screen'>
        <div className='embla__viewport ' ref={emblaRef}>
          <div className='embla__container lg:flex lg:flex-row flex-col'>
            {COSME_CONTENTS.map((content, index) => (
              <div
                key={index}
                className='embla__slide lg:flex-[0_0_100%] mb-8 lg:mb-0'
              >
                {/* モダンなカードデザイン */}
                <div className='flex items-start justify-center w-full h-full px-4 lg:px-8'>
                  <div className='relative max-w-5xl w-full'>
                    {/* メインカード */}
                    <div className='bg-white  overflow-hidden transform transition-all duration-300 hover:shadow-3xl'>
                      {/* ヘッダーセクション - グラデーション背景 */}
                      <div className='relative px-8 py-5 '>
                        {/* 装飾的な番号 */}
                        <div
                          className='absolute top-6 right-6 lg:top-8 lg:right-8 text-7xl lg:text-9xl font-bold opacity-10'
                          style={{ color: content.color }}
                        >
                          0{index + 1}
                        </div>

                        {/* タイトルと年度 */}
                        <div className='relative z-10'>
                          {/* 年度 - 控えめに */}
                          <div className='mb-4'>
                            <span
                              className='text-xs lg:text-sm font-medium tracking-widest uppercase opacity-80'
                              style={{ color: content.color }}
                            >
                              {content.year}
                            </span>
                          </div>
                          {/* タイトル - 落ち着いたサイズ */}
                          <h1 className='text-2xl lg:text-3xl font-semibold text-gray-900 tracking-wide'>
                            {content.title}
                          </h1>
                        </div>
                      </div>

                      {/* コンテンツセクション */}
                      <div className='px-6 py-8 lg:px-12 lg:py-12'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
                          {/* 左側:業務内容 */}
                          <div className='space-y-6'>
                            <div>
                              <div className='mb-6 pb-3 border-b border-gray-200'>
                                <h2 className='text-sm font-medium text-gray-500 tracking-widest'>
                                  WORK CONTENT
                                </h2>
                              </div>
                              <div className='space-y-2'>
                                {content.description.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className='flex items-start gap-3'
                                  >
                                    <span
                                      className='text-xs font-bold mt-0.5'
                                      style={{ color: content.color }}
                                    >
                                      ▸
                                    </span>
                                    <p className='text-gray-800 text-sm lg:text-base leading-relaxed flex-1'>
                                      {item}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 思い出セクション */}
                            <div className='mt-8'>
                              <div
                                className='relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-lg border-2'
                                style={{ borderColor: `${content.color}60` }}
                              >
                                {/* 吹き出しの三角 */}
                                <div
                                  className='absolute -top-3 left-8 w-6 h-6 rotate-45 border-l-2 border-t-2'
                                  style={{
                                    borderColor: `${content.color}60`,
                                    background:
                                      'linear-gradient(135deg, white 0%, rgb(249, 250, 251) 100%)',
                                  }}
                                ></div>
                                <div className='relative'>
                                  <div className='flex items-center gap-2 mb-3'>
                                    <span className='text-2xl'>💭</span>
                                    <h3
                                      className='text-base font-bold tracking-wide'
                                      style={{ color: content.color }}
                                    >
                                      思い出
                                    </h3>
                                  </div>
                                  <p className='text-gray-700 text-sm lg:text-base leading-relaxed italic'>
                                    {content.hukidashi}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 右側:詳細説明 */}
                          <div>
                            <div className='mb-6 pb-3 border-b border-gray-200'>
                              <h2 className='text-sm font-medium text-gray-500 tracking-widest'>
                                DETAILS
                              </h2>
                            </div>
                            <div className='prose prose-sm lg:prose-base max-w-none'>
                              <p className='text-gray-700 leading-relaxed text-sm lg:text-base'>
                                {content.businessContent}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Embla Carousel Controls - lg以上のみ表示 */}
        <div className='embla__controls pb-6 lg:grid hidden '>
          <div className='embla__buttons'>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>

          <div className='embla__dots'>
            {scrollSnaps.length > 0
              ? scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={'embla__dot'.concat(
                      index === selectedIndex ? ' embla__dot--selected' : ''
                    )}
                  />
                ))
              : slides.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={'embla__dot'.concat(
                      index === selectedIndex ? ' embla__dot--selected' : ''
                    )}
                  />
                ))}
          </div>
        </div>
        <style>{`
        .arrow {
          position: relative;
          display: inline-block;
          pointer-events: none;
        }
        .arrow::after {
          content: '';
          position: absolute;
          right: -35px;
          width: 150px;
          height: 10px;
          border-bottom: solid 2px currentColor;
          border-left: solid 2px currentColor;
          transform: skew(-45deg);
          transform-origin: right center;
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .button-4:hover .arrow::after {
          width: 180px;
          border-color: #f59e0b;
        }
        
        .arrow-reverse::after {
          transform: skew(45deg);
        }
      `}</style>
        {/* スタイル4: 上部にテキスト */}
        <Link
          href='/'
          className='z-50 absolute button-4 bottom-5 right-5 group pl-25 p-3 pointer-events-auto block'
        >
          <p className='text-center text-sm font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300 pointer-events-none'>
            Back Page
          </p>
          <div className='flex justify-center pointer-events-none'>
            <div className='arrow text-gray-400'></div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default CosmeContents;
