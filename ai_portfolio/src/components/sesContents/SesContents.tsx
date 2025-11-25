'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import '@/styles/embla-carousel.css';
import SectionHeader from '../common/SectionHeader';
import { ITJOB_INTRODUCTION } from '@/utils/itData';
import Link from 'next/link';

// ブレークポイント定数
const LG_BREAKPOINT = 1024;

type PropType = {
  options?: EmblaOptionsType;
};

/**
 * SES業界
 * @param props
 */
const SesContents: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  // 画面サイズの監視
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= LG_BREAKPOINT);
    };

    // 初期値設定
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onWheel = useCallback(
    (event: WheelEvent) => {
      // lg以下ではホイールイベントを無効化
      if (!isLargeScreen) return;
      if (!emblaApi) return;
      event.preventDefault();

      if (event.deltaY > 0) {
        emblaApi.scrollNext();
      } else if (event.deltaY < 0) {
        emblaApi.scrollPrev();
      }
    },
    [emblaApi, isLargeScreen]
  );
  useEffect(() => {
    // lg以下ではホイールイベントリスナーを追加しない
    if (!isLargeScreen) return;

    const emblaNode = emblaApi?.rootNode();
    if (!emblaNode) return;

    emblaNode.addEventListener('wheel', onWheel, { passive: false });
    return () => emblaNode.removeEventListener('wheel', onWheel);
  }, [emblaApi, onWheel, isLargeScreen]);

  // キーボード操作のハンドラー（カルーセル領域にフォーカスがある時のみ有効）
  useEffect(() => {
    if (!emblaApi || !isLargeScreen) return;

    const emblaNode = emblaApi.rootNode();
    if (!emblaNode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // カルーセル要素またはその子要素にフォーカスがある場合のみ反応
      if (!emblaNode.contains(document.activeElement)) return;

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
  }, [emblaApi, isLargeScreen]);

  return (
    <>
      {/* Section Title */}
      <SectionHeader
        isVisible
        title='System Engineer'
        subtitle='IT業界'
        size='normal'
      />

      {/* カルーセル: lg以上で有効、lg以下で無効 */}
      <section className='embla w-screen px-4 lg:px-8 text-sm min-h-screen lg:h-screen'>
        <div className='embla__viewport bg-[#ffffff]' ref={emblaRef}>
          <div className='embla__container lg:flex lg:flex-row flex-col'>
            {ITJOB_INTRODUCTION.map((content, index) => (
              <div
                key={index}
                className='embla__slide lg:flex-[0_0_100%] mb-8 lg:mb-0'
              >
                {/* 上部配置用のラッパー */}
                <div className='flex items-start justify-center w-full h-full px-6 lg:px-8 pt-3 lg:pt-8'>
                  <div className='border border-gray-300 p-4 md:p-8 relative max-w-6xl w-full'>
                    {/* 番号 */}
                    <div className='-z-[99] absolute top-4 md:top-8 right-4 md:right-8 text-6xl md:text-[200px] font-light text-gray-300 leading-none'>
                      0{index + 1}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                      {/* 左側 */}
                      <div className='space-y-4 md:space-y-6'>
                        <div className='flex mb-2'>
                          <div className='w-20 md:w-24 font-light text-gray-600'>
                            業種
                          </div>
                          <div className='flex-1'>
                            {content.outsourcedCompany}
                          </div>
                        </div>

                        <div className='flex mb-2'>
                          <div className='w-20 md:w-24 font-light text-gray-600'>
                            規模
                          </div>
                          <div className='flex-1'>{content.scale}</div>
                        </div>

                        <div className='flex mb-2'>
                          <div className='w-20 md:w-24 font-light text-gray-600'>
                            参画期間
                          </div>
                          <div className='flex-1'>{content.period}</div>
                        </div>

                        <div className='flex mb-2'>
                          <div className='w-20 md:w-24 font-light text-gray-600'>
                            業務内容
                          </div>
                          <div>
                            <div className='mb-3'>
                              {content.phase.join('/')}
                            </div>
                            <div className='flex-1'>
                              {content.bussinessContent.map((item, i) => (
                                <div key={i}>・{item}</div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <hr className='h-px bg-gradient-to-r from-transparent via-[#ccc] to-transparent border-none' />

                        <div>
                          <div className='font-light mb-4'>開発環境</div>
                          <div className='space-y-2 text-sm'>
                            <div>
                              <span className='font-medium'>【言語】</span>
                              {content.devenvironment.language?.join(' / ')}
                            </div>
                            <div>
                              <span className='font-medium'>【OS】</span>{' '}
                              {content.devenvironment.os}
                            </div>
                            <div>
                              <span className='font-medium'>【FW】</span>{' '}
                              {content.devenvironment.framework?.join(' / ')}
                            </div>
                            <div>
                              <span className='font-medium'>【ツール】</span>{' '}
                              {content.devenvironment.tool?.join(' / ')}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 右側 */}
                      <div className='space-y-6 flex items-center'>
                        <div className='leading-relaxed text-gray-700 text-sm md:text-base'>
                          {content.content}
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
        <div className='embla__controls pb-6 lg:grid hidden'>
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
            {scrollSnaps.map((_, index) => (
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

export default SesContents;
