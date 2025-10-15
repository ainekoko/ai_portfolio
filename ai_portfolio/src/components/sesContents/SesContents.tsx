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
import { ITJOB_INTRODUCTION } from '@/utils/itData';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

/**
 * 化粧品業界向けの横スクロールコンテンツ
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
        title='Cosmetics Company'
        subtitle='化粧品企業'
        size='normal'
      />

      {/* カルーセル: lg以上で有効、lg以下で無効 */}
      <section className='embla w-screen px-4 lg:px-8 text-sm'>
        <div className='embla__viewport bg-[#ffffff]' ref={emblaRef}>
          <div className='embla__container lg:flex lg:flex-row flex-col'>
            {ITJOB_INTRODUCTION.map((content, index) => (
              <div
                key={index}
                className='embla__slide lg:flex-[0_0_100%] mb-8 lg:mb-0'
              >
                <div className='border border-gray-300 p-2 md:p-8 mb-9 mt-8 relative'>
                  {/* <!-- 番号 --> */}
                  <div className='absolute top-8 right-8 text-9xl font-light text-gray-300 leading-none'>
                    0{index + 1}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* <!-- 左側 --> */}
                    <div className='space-y-6'>
                      <div className='flex mb-2'>
                        <div className='w-24 font-light text-gray-600'>
                          業種
                        </div>
                        <div className='flex-1'>
                          {content.outsourcedCompany}
                        </div>
                      </div>

                      <div className='flex mb-2'>
                        <div className='w-24 font-light text-gray-600'>
                          規模
                        </div>
                        <div className='flex-1'>{content.scale}</div>
                      </div>

                      <div className='flex mb-2'>
                        <div className='w-24 font-light text-gray-600'>
                          参画期間
                        </div>
                        <div className='flex-1'>{content.period}</div>
                      </div>

                      <div className='flex mb-2'>
                        <div className='w-24 font-light text-gray-600'>
                          業務内容
                        </div>
                        <div>
                          <div className='mb-3'>{content.phase.join('/')}</div>
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
                            HTML/CSS/PHP
                          </div>
                          <div>
                            <span className='font-medium'>【OS】</span> Windows
                          </div>
                          <div>
                            <span className='font-medium'>【FW】</span> Laravel
                          </div>
                          <div>
                            <span className='font-medium'>【ツール】</span>{' '}
                            Chatwork/GitHub
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- 右側 --> */}
                    <div className='space-y-6 m-auto w-4/5'>
                      <div className='leading-relaxed text-gray-700'>
                        {content.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>{' '}
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

export default SesContents;
