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
import Huwahuwa_img from '../common/huwahuwa_img';
import { COSME_CONTENTS } from '@/utils/CosmeContentsData';

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
    // lg以下ではイベントリスナーを追加しない
    if (window.innerWidth < 1024) return;

    const emblaNode = emblaApi?.rootNode();
    if (!emblaNode) return;

    emblaNode.addEventListener('wheel', onWheel, { passive: false });
    return () => emblaNode.removeEventListener('wheel', onWheel);
  }, [emblaApi, onWheel]);

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
      <section className='embla w-screen px-4 lg:px-8 text-sm min-h-screen lg:h-screen'>
        <div className='embla__viewport bg-[#ffffff]' ref={emblaRef}>
          <div className='embla__container lg:flex lg:flex-row flex-col'>
            {COSME_CONTENTS.map((content, index) => (
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
                      {/* Left Column */}
                      <div className='space-y-6 lg:space-y-8 flex-1 lg:max-w-[500px]'>
                        <div className='space-y-4 lg:space-y-6 leading-relaxed text-sm lg:text-[14px]'>
                          <div className='mb-6 lg:mb-10'>
                            <p className='mb-2'>{content.year}</p>
                            <p className='mb-1 font-medium lg:font-normal'>
                              {content.title}
                            </p>
                            <p className='text-gray-600 lg:text-black'>
                              {content.description}
                            </p>
                          </div>
                          <hr className='h-px bg-gradient-to-r from-transparent via-[#ccc] to-transparent border-none' />
                        </div>
                      </div>
                      {/* Right Column - Speech Bubble */}
                      {/* 右側 */}

                      <div className='space-y-6 flex items-center'>
                        <div className='leading-relaxed text-gray-700 text-sm md:text-base'>
                          <h2 className='font-medium mb-3 lg:mb-4 text-base lg:text-[14px]'>
                            業務説明
                          </h2>

                          {content.businessContent}
                        </div>
                      </div>
                    </div>
                  </div>{' '}
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
        </div>{' '}
      </section>
    </>
  );
};

export default CosmeContents;
