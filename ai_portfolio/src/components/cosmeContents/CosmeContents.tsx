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
      <section className='embla w-screen px-4 lg:px-8 text-sm min-h-screen lg:h-screen'>
        <div className='embla__viewport bg-[#ffffff]' ref={emblaRef}>
          <div className='embla__container lg:flex lg:flex-row flex-col'>
            {COSME_CONTENTS.map((content, index) => (
              <div
                key={index}
                className='embla__slide lg:flex-[0_0_100%] mb-8 lg:mb-0'
              >
                {/* モダンなカードデザイン */}
                <div className='flex items-center justify-center w-full h-full px-4 lg:px-8 py-6 lg:py-8'>
                  <div className='relative max-w-5xl w-full'>
                    {/* メインカード */}
                    <div className='bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl'>
                      {/* ヘッダーセクション - グラデーション背景 */}
                      <div
                        className='relative px-8 py-12 lg:px-12 lg:py-16'
                        style={{
                          background: `linear-gradient(135deg, ${content.color}15 0%, ${content.color}30 100%)`,
                        }}
                      >
                        {/* 装飾的な番号 */}
                        <div
                          className='absolute top-6 right-6 lg:top-8 lg:right-8 text-7xl lg:text-9xl font-bold opacity-10'
                          style={{ color: content.color }}
                        >
                          0{index + 1}
                        </div>

                        {/* タイトルと年度 */}
                        <div className='relative z-10'>
                          <div className='inline-block mb-3'>
                            <span
                              className='text-xs lg:text-sm font-semibold px-4 py-1.5 rounded-full text-white'
                              style={{ backgroundColor: content.color }}
                            >
                              {content.year}
                            </span>
                          </div>
                          <h1 className='text-3xl lg:text-5xl font-bold text-gray-900 mb-4'>
                            {content.title}
                          </h1>
                          {/* 装飾線 */}
                          <div
                            className='h-1 w-20 rounded-full'
                            style={{ backgroundColor: content.color }}
                          ></div>
                        </div>
                      </div>

                      {/* コンテンツセクション */}
                      <div className='px-6 py-8 lg:px-12 lg:py-12'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
                          {/* 左側:業務内容 */}
                          <div className='space-y-6'>
                            <div>
                              <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                                <span
                                  className='w-2 h-8 rounded-full'
                                  style={{ backgroundColor: content.color }}
                                ></span>
                                業務内容
                              </h2>
                              <div className='space-y-3 pl-5'>
                                {content.description.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className='flex items-start gap-3 group'
                                  >
                                    <div
                                      className='w-2 h-2 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform'
                                      style={{ backgroundColor: content.color }}
                                    ></div>
                                    <p className='text-gray-700 text-sm lg:text-base leading-relaxed'>
                                      {item}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 思い出セクション */}
                            <div
                              className='mt-8 p-6 rounded-2xl border-2'
                              style={{
                                borderColor: `${content.color}40`,
                                backgroundColor: `${content.color}08`,
                              }}
                            >
                              <h3 className='text-lg font-bold text-gray-900 mb-3 flex items-center gap-2'>
                                <span className='text-xl'>💭</span>
                                思い出
                              </h3>
                              <p className='text-gray-600 text-sm lg:text-base leading-relaxed italic'>
                                {content.hukidashi}
                              </p>
                            </div>
                          </div>

                          {/* 右側:詳細説明 */}
                          <div>
                            <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                              <span
                                className='w-2 h-8 rounded-full'
                                style={{ backgroundColor: content.color }}
                              ></span>
                              詳細
                            </h2>
                            <div className='prose prose-sm lg:prose-base max-w-none'>
                              <p className='text-gray-700 leading-relaxed text-sm lg:text-base'>
                                {content.businessContent}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* フッター装飾 */}
                      <div
                        className='h-2'
                        style={{
                          background: `linear-gradient(90deg, ${content.color} 0%, ${content.color}80 100%)`,
                        }}
                      ></div>
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
      </section>
    </>
  );
};

export default CosmeContents;
