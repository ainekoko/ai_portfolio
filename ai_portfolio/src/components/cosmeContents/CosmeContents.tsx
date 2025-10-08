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

      <section className='embla w-screen flex flex-col px-8'>
        <div className='embla__viewport bg-[#ffffff] ' ref={emblaRef}>
          <div className='embla__container'>
            {slides.map((index) => (
              <div className='embla__slide' key={index}>
                {/* Main Content - さらにコンパクト化 */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start w-full mx-auto px-4 md:px-8 py-5'>
                  {/* Left Column */}
                  <div className='space-y-8'>
                    <div className='space-y-6 text-sm leading-relaxed'>
                      <div>
                        <p className='mb-2'>1年目…</p>
                        <p className='mb-1'>ネイリスト</p>
                        <p>店舗接客/イベント接客/店舗サンプル作成/事務作業等</p>
                      </div>

                      <div className='border-t border-dashed border-gray-300 pt-6'>
                        <h2 className='font-medium mb-4'>業務説明</h2>
                        <div className='space-y-4'>
                          <p className='leading-8'>
                            自社商品を卸している全国の店舗に赴き、商品紹介も兼ねてのネイル体験コーナーを行い小さいお子様から興味があるけど一歩踏み出せなかったお客様へ施術をし、コミュニケーションスキルが培われました。
                            店舗へ飾るサンプル品に関してもその時の流行りや大衆に好まれるデザインでなければいけないため、隙間時間はいつも雑誌を読み漁って手帳を埋めていました。
                            仕事終わりにはネイル教室に通い、資格を取得する為毎日が勉強の日々でしたがとても楽しかった思い出です。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right Column - Speech Bubble */}
                  <div className='flex justify-center items-start pt-20'>
                    <div className='relative'>
                      <div className='border-2 border-gray-800 rounded-full px-12 py-16 max-w-md'>
                        <p className='text-sm leading-relaxed'>
                          北は北海道、西は大阪等商品を卸している
                          <br />
                          店舗へネイルイベントの為
                          <br />
                          月に2〜3回程巡征をした際、その地域の観
                          <br />
                          光をする事が密かに楽しみでした(笑)
                        </p>
                      </div>
                      {/* Bird Character */}
                      <div className='absolute -bottom-8 -right-4'>
                        <svg
                          width='60'
                          height='60'
                          viewBox='0 0 60 60'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <ellipse
                            cx='30'
                            cy='35'
                            rx='18'
                            ry='20'
                            fill='white'
                            stroke='black'
                            strokeWidth='1.5'
                          />
                          <circle
                            cx='30'
                            cy='20'
                            r='12'
                            fill='white'
                            stroke='black'
                            strokeWidth='1.5'
                          />
                          <circle cx='26' cy='19' r='2' fill='black' />
                          <circle cx='34' cy='19' r='2' fill='black' />
                          <path d='M30 22 L28 25 L32 25 Z' fill='orange' />
                          <path
                            d='M15 35 Q12 38 15 40'
                            stroke='black'
                            strokeWidth='1.5'
                            fill='none'
                          />
                          <path
                            d='M45 35 Q48 38 45 40'
                            stroke='black'
                            strokeWidth='1.5'
                            fill='none'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embla Carousel Controls */}
      <div className='embla__controls pb-6'>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
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
    </>
  );
};

export default EmblaCarousel;
