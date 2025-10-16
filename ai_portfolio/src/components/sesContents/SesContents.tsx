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
import { ITJOB_INTRODUCTION } from '@/utils/itData';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

/**
 * SES業界向けの横スクロールコンテンツ
 * @param props
 */
const SesContents: React.FC<PropType> = (props) => {
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
        <button className='absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:bg-white/30 hover:scale-110 cursor-pointer'>
          <div className='text-3xl transition-all duration-300'>←</div>
          <div className='text-sm font-semibold'>Back Page</div>
        </button>
      </section>
    </>
  );
};

export default SesContents;
