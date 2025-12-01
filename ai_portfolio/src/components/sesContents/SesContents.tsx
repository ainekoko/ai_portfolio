'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import {
  DotButton,
  useDotButton,
} from '@/components/common/emblaCarouselDotButton/EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from '@/components/common/emblaCarouselArrowButtons/EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import '@/styles/embla-carousel.css';
import SectionHeader from '../common/sectionHeader/SectionHeader';
import { ITJOB_INTRODUCTION } from '@/utils/itData';
import Link from 'next/link';
import Huwahuwa_img from '../common/huwahuwaImg/Huwahuwa_img';
import Font from '../common/font/Font';

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
      <section className='embla w-screen px-2 text-sm min-h-screen lg:h-screen'>
        <Font>
          <div className='embla__viewport ' ref={emblaRef} tabIndex={0}>
            <div className='embla__container lg:flex lg:flex-row flex-col'>
              {ITJOB_INTRODUCTION.map((content, index) => (
                <div
                  key={index}
                  className='embla__slide lg:flex-[0_0_100%] mb-8 lg:mb-0'
                >
                  <div
                    className='flex items-start justify-center w-full h-full px-4 lg:px-8 pt-6 lg:pt-8 pb-6 lg:pb-8'
                    style={
                      { '--content-color': '#4a90e2' } as React.CSSProperties
                    }
                  >
                    <div className='relative max-w-5xl w-full h-full lg:max-h-[75vh] flex flex-col'>
                      {/* キャラクター画像 - 右下に固定 */}
                      <Huwahuwa_img
                        image='shimaenaga-04.gif'
                        name='キャラクター'
                        move='gentle'
                        bottom='50px'
                        left='10px'
                        speech={content.hukidashi}
                        width='100px'
                      />

                      {/* メインカード */}
                      <div className='bg-white/80 overflow-hidden transform transition-all duration-300 hover:shadow-3xl flex flex-col h-full'>
                        {/* ヘッダーセクション */}
                        <div className='relative p-6 lg:p-8 shrink-0'>
                          {/* 装飾的な番号 */}
                          <div className='absolute top-6 right-6 lg:top-8 lg:right-8 text-[15rem] font-bold opacity-10 text-[#4a90e2]'>
                            0{index + 1}
                          </div>
                        </div>

                        {/* コンテンツセクション */}
                        <div className='px-6 py-0 lg:px-12 flex-1 overflow-y-auto'>
                          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
                            {/* 左側:業務内容 */}
                            <div className='space-y-6'>
                              {/* タイトルと期間 */}
                              <div className='relative z-10'>
                                {/* 期間 */}
                                <div className='mb-2'>
                                  <span className='text-xs lg:text-sm font-medium tracking-widest uppercase opacity-80 text-[#4a90e2]'>
                                    {content.period}
                                  </span>
                                </div>
                                {/* 業種 */}
                                <h1 className='text-lg lg:text-xl font-semibold text-gray-900 tracking-wide'>
                                  {content.outsourcedCompany}
                                </h1>
                              </div>

                              <div className='mb-6 pb-3 border-b border-gray-200'>
                                <h2 className='text-sm font-medium text-gray-500 tracking-widest'>
                                  WORK CONTENT
                                </h2>
                              </div>
                              <div className='space-y-4'>
                                <div className='flex gap-3'>
                                  <span className='text-xs font-bold text-gray-500 min-w-16'>
                                    規模
                                  </span>
                                  <p className='text-gray-800 text-xs lg:text-sm leading-relaxed flex-1'>
                                    {content.scale}
                                  </p>
                                </div>
                                <div className='flex gap-3'>
                                  <span className='text-xs font-bold text-gray-500 min-w-16'>
                                    フェーズ
                                  </span>
                                  <p className='text-gray-800 text-xs lg:text-sm leading-relaxed flex-1'>
                                    {content.phase.join(' / ')}
                                  </p>
                                </div>
                                <div className='space-y-2'>
                                  {content.bussinessContent.map((item, i) => (
                                    <div
                                      key={i}
                                      className='flex items-start gap-3'
                                    >
                                      <span className='text-xs font-bold mt-0.5 text-[#4a90e2]'>
                                        ▸
                                      </span>
                                      <p className='text-gray-800 text-xs lg:text-sm leading-relaxed flex-1'>
                                        {item}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* 右側:開発環境と詳細説明 */}
                            <div className='space-y-6'>
                              {/* 開発環境セクション */}
                              <div>
                                <div className='mb-6 pb-3 border-b border-gray-200'>
                                  <h2 className='text-sm font-medium text-gray-500 tracking-widest'>
                                    DEVELOPMENT ENVIRONMENT
                                  </h2>
                                </div>
                                <div className='space-y-2 text-sm'>
                                  {content.devenvironment.language && (
                                    <div className='flex gap-2'>
                                      <span className='font-medium text-gray-700'>
                                        言語:
                                      </span>
                                      <div className='flex flex-wrap gap-1.5'>
                                        {content.devenvironment.language.map(
                                          (lang, i) => (
                                            <span
                                              key={i}
                                              className='px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium'
                                            >
                                              {lang}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {content.devenvironment.os && (
                                    <div className='flex gap-2'>
                                      <span className='font-medium text-gray-700'>
                                        OS:
                                      </span>
                                      <span className='px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium'>
                                        {content.devenvironment.os}
                                      </span>
                                    </div>
                                  )}
                                  {content.devenvironment.framework && (
                                    <div className='flex gap-2'>
                                      <span className='font-medium text-gray-700'>
                                        FW:
                                      </span>
                                      <div className='flex flex-wrap gap-1.5'>
                                        {content.devenvironment.framework.map(
                                          (fw, i) => (
                                            <span
                                              key={i}
                                              className='px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium'
                                            >
                                              {fw}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {content.devenvironment.tool && (
                                    <div className='flex gap-2'>
                                      <span className='font-medium text-gray-700'>
                                        ツール:
                                      </span>
                                      <div className='flex flex-wrap gap-1.5'>
                                        {content.devenvironment.tool.map(
                                          (tool, i) => (
                                            <span
                                              key={i}
                                              className='px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium'
                                            >
                                              {tool}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* 詳細説明 */}
                              <div>
                                <div className='mb-6 pb-3 border-b border-gray-200'>
                                  <h2 className='text-sm font-medium text-gray-500 tracking-widest'>
                                    DETAILS
                                  </h2>
                                </div>
                                <div className='prose prose-sm lg:prose-base max-w-none'>
                                  <p className='text-gray-700 leading-relaxed text-sm lg:text-base'>
                                    {content.content}
                                  </p>
                                </div>
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
        </Font>
        {/* Embla Carousel Controls - lg以上のみ表示 */}
        <div className='embla__controls pb-6 lg:grid'>
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
