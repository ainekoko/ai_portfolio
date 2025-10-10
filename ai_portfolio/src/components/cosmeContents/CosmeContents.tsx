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

const EmblaCarousel: React.FC<PropType> = (props) => {
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
      <section className='embla w-screen px-4 lg:px-8'>
        <div className='embla__viewport bg-[#ffffff]' ref={emblaRef}>
          <div className='embla__container lg:flex lg:flex-row flex-col'>
            {COSME_CONTENTS.map((content, index) => (
              <div
                className='embla__slide lg:flex-[0_0_100%] mb-8 lg:mb-0'
                key={index}
              >
                <div className='flex flex-col lg:flex-row items-start justify-center w-full mx-auto px-4 lg:px-16 pt-6 lg:pt-10 gap-6 lg:gap-8'>
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
                      <div className='pt-4 lg:pt-5'>
                        <h2 className='font-medium mb-3 lg:mb-4 text-base lg:text-[14px]'>
                          業務説明
                        </h2>
                        <div className='space-y-4'>
                          <p className='leading-7 lg:leading-8 text-gray-700 lg:text-black'>
                            {content.businessContent}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right Column - Speech Bubble */}
                  <div className=' mt-auto bg-[url(/assets/images/hukidashi_01.png)] bg-no-repeat bg-[length:300px_180px] lg:bg-[length:350px_200px] bg-center flex justify-center items-center lg:items-start py-8 lg:py-0'>
                    <div className='relative'>
                      <div className='px-8 lg:px-12 py-12 lg:py-16 max-w-xs lg:max-w-md text-center lg:text-left'>
                        <p className='text-xs lg:text-sm leading-relaxed'>
                          {content.hukidashi}
                        </p>
                      </div>
                      {/* Bird Character */}
                      <div className='absolute -bottom-6 lg:-bottom-8 -right-2 lg:-right-4'>
                        <Huwahuwa_img
                          image='profile-shimaenaga.png'
                          name='シマエナガ'
                          move='gentle'
                        />
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
        </div>{' '}
      </section>
    </>
  );
};

export default EmblaCarousel;
