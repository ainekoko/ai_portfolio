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
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start w-full mx-auto px-4 lg:pl-16 pt-10'>
                  {/* Left Column */}
                  <div className='space-y-8'>
                    <div
                      className='space-y-6 leading-relaxed'
                      style={{ fontSize: '14px' }}
                    >
                      <div className='mb-10'>
                        <p className='mb-2'>1年目…</p>
                        <p className='mb-1'>ネイリスト</p>
                        <p>店舗接客/イベント接客/店舗サンプル作成/事務作業等</p>
                      </div>
                      <hr className='h-px bg-gradient-to-r from-transparent via-[#ccc] to-transparent border-none' />
                      <div className='pt-5'>
                        <h2 className='font-medium mb-4'>業務説明</h2>
                        <div className='space-y-4'>
                          <p className='leading-8'>
                            自社商品を卸している全国の店舗に赴き、商品紹介も兼ねてのネイル体験コーナーを行い小さいお子様から興味があるけど一歩踏み出せなかったお客様へ施術をし、コミュニケーションスキルが培われました。
                            <br />
                            店舗へ飾るサンプル品に関してもその時の流行りや大衆に好まれるデザインでなければいけないため、隙間時間はいつも雑誌を読み漁って手帳を埋めていました。
                            <br />{' '}
                            仕事終わりにはネイル教室に通い、資格を取得する為毎日が勉強の日々でしたがとても楽しかった思い出です。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right Column - Speech Bubble */}
                  <div className='bg-[url(/assets/images/hukidashi_01.png)] bg-no-repeat bg-[length:350px_200px] bg-center flex justify-center items-start'>
                    {' '}
                    <div className='relative'>
                      <div className='px-12 py-16 max-w-md'>
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
