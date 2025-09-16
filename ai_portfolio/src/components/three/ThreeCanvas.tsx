'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import ScrollImg from '@/components/templetes/scroll-img';
import * as THREE from 'three';
// コンポーネントでの使用例
import WindowScrollHandler from './WindowScrollHandler';
import ProfileSection from '../sections/ProfileSection';
import TopSection from '../sections/TopSection';
import MessageSection from '../sections/Message';
import ExperienceSection from '../sections/ExperienceSection';

const ThreeCanvas = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = 3;

  /* 表示されているセクションのIDを格納するSet ['Hello', 'Profile'...ets] */
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  /**
   * セクションの表示状態を判定
   * @param sectionId - セクションのID{"hello", "profile"...}
   * @returns セクションが表示されているかどうか真偽値
   */
  const isVisible = (sectionId: string) => visibleSections.has(sectionId);

  // 動的にスライド幅を計算する関数
  const getSlideWidth = useCallback(() => {
    if (!carouselRef.current) return 400;

    const container = carouselRef.current;
    const containerWidth = (container as HTMLElement).offsetWidth; // コンテナ幅に基づいてスライド幅を計算（gap分も考慮）
    return containerWidth;
  }, []);

  // ドットの状態を更新する関数
  const updateDots = useCallback(() => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const scrollLeft = (container as HTMLElement).scrollLeft;
    const slideWidth = getSlideWidth();
    const newSlide = Math.round(scrollLeft / slideWidth);
    setCurrentSlide(Math.max(0, Math.min(newSlide, totalSlides - 1)));
  }, [getSlideWidth, totalSlides]);

  // 指定されたスライドに移動する関数
  const goToSlide = useCallback(
    (slideIndex: number) => {
      if (!carouselRef.current) return;

      const slideWidth = getSlideWidth();
      carouselRef.current.scrollTo({
        left: slideIndex * slideWidth,
        behavior: 'smooth',
      });
      setCurrentSlide(slideIndex);
    },
    [getSlideWidth]
  );

  // 前のスライドに移動
  const prevSlide = useCallback(() => {
    const newSlide = Math.max(0, currentSlide - 1);
    goToSlide(newSlide);
  }, [currentSlide, goToSlide]);

  // 次のスライドに移動
  const nextSlide = useCallback(() => {
    const newSlide = Math.min(totalSlides - 1, currentSlide + 1);
    goToSlide(newSlide);
  }, [currentSlide, totalSlides, goToSlide]);

  // リサイズ時の処理
  const handleResize = useCallback(() => {
    // リサイズ後に現在のスライドの位置を調整
    setTimeout(() => {
      goToSlide(currentSlide);
    }, 100);
  }, [currentSlide, goToSlide]);

  // スクロール終了時のイベントハンドラー
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout | undefined;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateDots, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    // リサイズイベントリスナーを追加
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
    };
  }, [updateDots, handleResize]);
  return (
    <>
      <Canvas
        gl={{
          toneMapping: THREE.NoToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <ScrollControls pages={10.7} damping={0.5}>
          <WindowScrollHandler setVisibleSections={setVisibleSections} />
          <ScrollImg />

          <Scroll html>
            {/* 最初のsection */}
            <TopSection isVisible={isVisible('hello')} />
            {/* プロフィールsection */}
            <ProfileSection isVisible={isVisible('profile')} />
            {/* メッセージsection */}
            <MessageSection />
            {/* Previous Experience */}
            <ExperienceSection isVisible={isVisible('experience')} />
            {/* IT */}
            <section
              id='it'
              className='bg-[#bfdad1] relative top-[355vh] w-screen h-screen p-8 mt-8 py-6'
            >
              <div className='double-line-header flex items-center w-full relative my-10 mx-0'></div>
              <div className='container flex justify-left gap-4 flex-wrap justify-between m-auto'>
                {/* IT左側 */}
                <div className='w-6/12 flex flex-col'>
                  <h3 className='text-3xl mb-1 pb-12'>
                    IT業界<span className='jp text-sm ml-2'> 2018</span>
                  </h3>
                  <p className='leading-loose'>
                    ただIT業界と言っても右も左も分からない状態； <br />
                    なので一先ずスクールに通い友達のネイルサイトを作成し、転職活動に挑みました！
                    <br />
                    有り難いことに拾って頂きSESとして未熟な私にも様々な現場で経験が出来、本当に感謝をしています。
                    <br />
                    契約の関係上、作成したサイトは転載する事が出来ませんがその現場での業務を記載しましたので見て頂けると幸いです。　
                  </p>
                </div>

                {/* IT右側 - カルーセル風スライダー */}
                <div className='w-5/12 mt-3.5'>
                  {/* カルーセルコンテナ */}
                  <div className='relative max-w-full mx-auto'>
                    {/* 左矢印ボタン */}
                    <button
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className={`absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group ${
                        currentSlide === 0
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-white/90 hover:bg-white'
                      }`}
                      aria-label='前のプロジェクトを見る'
                    >
                      <div className='flex items-center gap-[-2px]'>
                        <div
                          className={`w-3 h-3 border-l-2 border-b-2 transform rotate-45 transition-colors ${
                            currentSlide === 0
                              ? 'border-gray-500'
                              : 'border-gray-600 group-hover:border-gray-800'
                          }`}
                        ></div>
                        <div
                          className={`w-3 h-3 border-l-2 border-b-2 transform rotate-45 -ml-1 transition-colors ${
                            currentSlide === 0
                              ? 'border-gray-500'
                              : 'border-gray-600 group-hover:border-gray-800'
                          }`}
                        ></div>
                      </div>
                    </button>

                    {/* 右矢印ボタン */}
                    <button
                      onClick={nextSlide}
                      disabled={currentSlide === totalSlides - 1}
                      className={`absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group ${
                        currentSlide === totalSlides - 1
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-white/90 hover:bg-white'
                      }`}
                      aria-label='次のプロジェクトを見る'
                    >
                      <div className='flex items-center gap-[-2px]'>
                        <div
                          className={`w-3 h-3 border-r-2 border-b-2 transform -rotate-45 transition-colors ${
                            currentSlide === totalSlides - 1
                              ? 'border-gray-500'
                              : 'border-gray-600 group-hover:border-gray-800'
                          }`}
                        ></div>
                        <div
                          className={`w-3 h-3 border-r-2 border-b-2 transform -rotate-45 -ml-1 transition-colors ${
                            currentSlide === totalSlides - 1
                              ? 'border-gray-500'
                              : 'border-gray-600 group-hover:border-gray-800'
                          }`}
                        ></div>
                      </div>
                    </button>

                    {/* スライドコンテナ */}
                    <div
                      ref={carouselRef}
                      className='overflow-x-auto scroll-smooth'
                      style={{
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none' /* Firefox */,
                        msOverflowStyle: 'none' /* Internet Explorer 10+ */,
                      }}
                    >
                      <div className='flex'>
                        {/* プロジェクト1: ショッピングサイト */}
                        <div
                          className='w-full flex-shrink-0 px-2'
                          style={{ scrollSnapAlign: 'start' }}
                        >
                          <div className='bg-white p-5 border-double shadow-[0_0_0_15px_#eaf4f4] border-[#a0b4b4] border-4'>
                            <div className='max-w-2xl mx-auto bg-white'>
                              <table className='w-full'>
                                <thead>
                                  <tr>
                                    <th className='p-4 text-lg text-center jp'>
                                      ショッピングサイト
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='text-sm'>
                                  <tr>
                                    <td className='p-6'>
                                      <div className='space-y-1.5 jp'>
                                        <div className='flex items-start'>
                                          <span className='mr-2'>◆</span>
                                          <span className='mr-8'>参画期間</span>
                                          <span>自社/出社/3か月</span>
                                        </div>
                                        <div className='flex items-start'>
                                          <span className='mr-2'>◆</span>
                                          <span className='mr-16'>規模</span>
                                          <span>ディレクター1名、FE5名</span>
                                        </div>
                                        <div className='flex items-start'>
                                          <span className='mr-2'>◆</span>
                                          <span className='mr-6'>
                                            担当フェーズ
                                          </span>
                                          <span>開発</span>
                                        </div>
                                        <div>
                                          <div className='flex items-start mb-2'>
                                            <span className='text-black mr-2'>
                                              ◆
                                            </span>
                                            <span className='font-semibold'>
                                              業務内容
                                            </span>
                                          </div>
                                          <div className='ml-6'>
                                            <span className='text-black mr-2'>
                                              •
                                            </span>
                                            <span>会員ページの改修作業</span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className='px-6 py-4'>
                                      <div className='border-t-2 border-dashed border-gray-400 pt-4'>
                                        <h3 className='font-bold text-lg mb-4 jp'>
                                          開発環境
                                        </h3>
                                        <div className='space-y-1.5 jp'>
                                          <div>
                                            <span className='font-semibold'>
                                              【言語】
                                            </span>
                                            <span className='ml-2'>
                                              HTML/CSS/PHP
                                            </span>
                                          </div>
                                          <div>
                                            <span className='font-semibold'>
                                              【OS】
                                            </span>
                                            <span className='ml-4'>
                                              Windows
                                            </span>
                                          </div>
                                          <div>
                                            <span className='font-semibold'>
                                              【FW】
                                            </span>
                                            <span className='ml-4'>
                                              Laravel
                                            </span>
                                          </div>
                                          <div>
                                            <span className='font-semibold'>
                                              【ツール】
                                            </span>
                                            <span className='ml-2'>
                                              Chatwork/GitHub
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className='p-6'>
                                      <p className='leading-relaxed jp'>
                                        初の実務だった為、まずは先輩方から基本作法を学びながらページの改修作業を行いました。
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* プロジェクト2: 企業サイト */}
                        <div
                          className='w-full flex-shrink-0 px-2'
                          style={{ scrollSnapAlign: 'start' }}
                        >
                          <div className='bg-white p-5 border-double shadow-[0_0_0_15px_#eaf4f4] border-[#a0b4b4] border-4'>
                            <div className='max-w-2xl mx-auto bg-white'>
                              <table className='w-full'>
                                <thead>
                                  <tr>
                                    <th className='p-4 text-lg text-center jp'>
                                      企業サイト
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='text-sm'>
                                  <tr>
                                    <td className='p-6'>
                                      <div className='space-y-1.5 jp'>
                                        <div className='flex items-start'>
                                          <span className='mr-2'>◆</span>
                                          <span className='mr-8'>参画期間</span>
                                          <span>客先常駐/6か月</span>
                                        </div>
                                        <div className='flex items-start'>
                                          <span className='mr-2'>◆</span>
                                          <span className='mr-16'>規模</span>
                                          <span>PM1名、FE3名、BE2名</span>
                                        </div>
                                        <div className='flex items-start'>
                                          <span className='mr-2'>◆</span>
                                          <span className='mr-6'>
                                            担当フェーズ
                                          </span>
                                          <span>設計・開発・テスト</span>
                                        </div>
                                        <div>
                                          <div className='flex items-start mb-2'>
                                            <span className='text-black mr-2'>
                                              ◆
                                            </span>
                                            <span className='font-semibold'>
                                              業務内容
                                            </span>
                                          </div>
                                          <div className='ml-6'>
                                            <span className='text-black mr-2'>
                                              •
                                            </span>
                                            <span>
                                              コーポレートサイトの新規構築
                                            </span>
                                          </div>
                                          <div className='ml-6'>
                                            <span className='text-black mr-2'>
                                              •
                                            </span>
                                            <span>レスポンシブ対応</span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className='px-6 py-4'>
                                      <div className='border-t-2 border-dashed border-gray-400 pt-4'>
                                        <h3 className='font-bold text-lg mb-4 jp'>
                                          開発環境
                                        </h3>
                                        <div className='space-y-1.5 jp'>
                                          <div>
                                            <span className='font-semibold'>
                                              【言語】
                                            </span>
                                            <span className='ml-2'>
                                              HTML/CSS/JavaScript
                                            </span>
                                          </div>
                                          <div>
                                            <span className='font-semibold'>
                                              【OS】
                                            </span>
                                            <span className='ml-4'>Mac</span>
                                          </div>
                                          <div>
                                            <span className='font-semibold'>
                                              【FW】
                                            </span>
                                            <span className='ml-4'>Vue.js</span>
                                          </div>
                                          <div>
                                            <span className='font-semibold'>
                                              【ツール】
                                            </span>
                                            <span className='ml-2'>
                                              Slack/GitLab
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className='p-6'>
                                      <p className='leading-relaxed jp'>
                                        フロントエンド開発を中心に、デザインからコーディングまで幅広く担当しました。
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* プロジェクト3: データ可視化サイト */}
                        <div
                          className='w-full flex-shrink-0 px-2'
                          style={{ scrollSnapAlign: 'start' }}
                        >
                          <div className='bg-white p-5 border-double shadow-[0_0_0_15px_#eaf4f4] border-[#a0b4b4] border-4'>
                            <div className='max-w-2xl mx-auto bg-white'>
                              <table className='w-full'>
                                <thead>
                                  <tr>
                                    <th className='p-4 text-lg text-center jp'>
                                      データ可視化サイト
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='text-sm'>
                                  <tr>
                                    <td className='p-6'>
                                      <div className='space-y-1.5 jp'>
                                        <div className='flex items-start'>
                                          <span className='mr-2'>◆</span>
                                          <span className='mr-8'>参画期間</span>
                                          <span>リモート/1年</span>
                                        </div>
                                        <div className='flex items-start'>
                                          <span className='mr-2'>◆</span>
                                          <span className='mr-16'>規模</span>
                                          <span>
                                            PL1名、FE4名、デザイナー2名
                                          </span>
                                        </div>
                                        <div className='flex items-start'>
                                          <span className='mr-2'>◆</span>
                                          <span className='mr-6'>
                                            担当フェーズ
                                          </span>
                                          <span>要件定義・設計・開発</span>
                                        </div>
                                        <div>
                                          <div className='flex items-start mb-2'>
                                            <span className='text-black mr-2'>
                                              ◆
                                            </span>
                                            <span className='font-semibold'>
                                              業務内容
                                            </span>
                                          </div>
                                          <div className='ml-6'>
                                            <span className='text-black mr-2'>
                                              •
                                            </span>
                                            <span>D3.jsを使ったグラフ作成</span>
                                          </div>
                                          <div className='ml-6'>
                                            <span className='text-black mr-2'>
                                              •
                                            </span>
                                            <span>
                                              インタラクティブな可視化
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className='px-6 py-4'>
                                      <div className='border-t-2 border-dashed border-gray-400 pt-4'>
                                        <h3 className='font-bold text-lg mb-4 jp'>
                                          開発環境
                                        </h3>
                                        <div className='space-y-1.5 jp'>
                                          <div>
                                            <span className='font-semibold'>
                                              【言語】
                                            </span>
                                            <span className='ml-2'>
                                              TypeScript/HTML/CSS
                                            </span>
                                          </div>
                                          <div>
                                            <span className='font-semibold'>
                                              【OS】
                                            </span>
                                            <span className='ml-4'>Mac</span>
                                          </div>
                                          <div>
                                            <span className='font-semibold'>
                                              【FW】
                                            </span>
                                            <span className='ml-4'>
                                              Next.js
                                            </span>
                                          </div>
                                          <div>
                                            <span className='font-semibold'>
                                              【ツール】
                                            </span>
                                            <span className='ml-2'>
                                              GitHub/Figma
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className='p-6'>
                                      <p className='leading-relaxed jp'>
                                        データビジュアライゼーションライブラリを活用し、ユーザーにとって分かりやすいグラフィカルな表現を実現しました。
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* スライド番号表示 */}
                    <div className='flex justify-center items-center mt-6 gap-4'>
                      {/* ページネーション */}
                      <div className='text-sm text-gray-600 font-medium bg-white/80 px-3 py-1 rounded-full'>
                        {currentSlide + 1} / {totalSlides}
                      </div>

                      {/* インジケーター（ドット） */}
                      <div className='flex gap-2'>
                        {[...Array(totalSlides)].map((_, index) => (
                          <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              currentSlide === index
                                ? 'bg-gray-800'
                                : 'bg-gray-400 hover:bg-gray-600'
                            }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`${index + 1}番目のプロジェクトを表示`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='absolute opacity-80 bottom-5 left-10'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='../assets/images/nail_1.png'
                  alt='ネイル'
                  className=''
                />
              </div>
              <div className='absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 text-[#eaf4f4] text-9xl md:text-[10rem] font-bold whitespace-nowrap pointer-events-none select-none'>
                Previous Experience
              </div>
            </section>
            {/* スキル */}
            <section
              id='skill'
              className='bg-[#f8fdfa] relative top-[360vh] w-screen h-screen p-8  mt-8 py-6'
            >
              <div className='double-line-header flex items-center justify-end w-full relative my-10 mx-0'>
                <h2 className='relative px-3 py-5 text-6xl inline-block text-right'>
                  <span>Skill</span>
                  <span className='jp text-sm ml-2'>
                    / 現場で経験したスキルを一覧化しました
                  </span>
                </h2>
              </div>
              <div className='container flex'>
                {/*-- プログラミング言語 -*/}
                <div id='programmingLanguage' className='w-1/2'>
                  <p>Programing Language</p>
                  <ul className='flex flex-wrap justify-start pt-10 gap-5 mb-4 text-base font-medium'>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-html.svg'
                        alt='HTML5'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>HTML5</p>
                      <p className='text-sm text-gray-500'>8 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-css.svg'
                        alt='CSS'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>CSS</p>
                      <p className='text-sm text-gray-500'>8 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-js.svg'
                        alt='JavaScript'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>JavaScript</p>
                      <p className='text-sm text-gray-500'>6 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-ts.svg'
                        alt='TypeScript'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>TypeScript</p>
                      <p className='text-sm text-gray-500'>4 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-php.svg'
                        alt='PHP'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>PHP</p>
                      <p className='text-sm text-gray-500'>1 years</p>
                    </li>
                  </ul>
                </div>
                {/*-- CMS -*/}
                <div id='cms' className='w-1/2'>
                  <p>CMS</p>
                  <ul className='flex flex-wrap justify-start gap-5 mb-4 pt-10 text-base font-medium'>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-wp.svg'
                        alt='WordPress'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>WordPress</p>
                      <p className='text-sm text-gray-500'>2 years</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='container flex'>
                {/*-- Framework -*/}
                <div id='framework' className='w-1/2'>
                  <p>Framework</p>
                  <ul className='flex flex-wrap justify-start pt-10 gap-5 mb-4 text-base font-medium'>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-nextjs.svg'
                        alt='Next.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Next.js</p>
                      <p className='text-sm text-gray-500'>1 years 6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-vue.svg'
                        alt='Vue.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Vue.js</p>
                      <p className='text-sm text-gray-500'>2 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/laravel.svg'
                        alt='Laravel'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Laravel</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-bootstrap.svg'
                        alt='BootStrap'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>BootStrap</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/jest.svg'
                        alt='Jest'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Jest</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                  </ul>
                </div>
                {/*-- Library -*/}
                <div id='library' className='w-1/2'>
                  <p>Library</p>
                  <ul className='flex flex-wrap justify-start pt-10 gap-5 mb-4 text-base font-medium'>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/d3.svg'
                        alt='D3.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>D3.js</p>
                      <p className='text-sm text-gray-500'>2 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/three.js.svg'
                        alt='Three.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Three.js</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-react-native.svg'
                        alt='React'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>React</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-jquery.svg'
                        alt='jQuery'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>jQuery</p>
                      <p className='text-sm text-gray-500'>2 months</p>
                    </li>
                  </ul>
                </div>
              </div>
              {/*-- Accordion -*/}
              <div className='container mx-auto space-y-2'>
                <details className='accordion-003 mb-2 border-b-2 border-gray-300'>
                  <summary className='flex justify-between items-center relative px-8 py-4 text-gray-800 font-semibold cursor-pointer'>
                    その他
                  </summary>
                  <div className='container flex border-t-[0.5px] border-gray-400'>
                    {/*-- another -*/}
                    <div id='another' className=''>
                      <ul className='flex flex-wrap justify-start pt-10 gap-5 mb-4 text-base font-medium'>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-adobe-xd.svg'
                            alt='Adobe XD'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Adobe XD</p>
                          <p className='text-sm text-gray-500'>3 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-adobe-illustrator.svg'
                            alt='Adobe Illustrator'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Adobe Illustrator</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-adobe-photoshop.svg'
                            alt='Adobe Photoshop'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Adobe Photoshop</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-figma.svg'
                            alt='Figma'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Figma</p>
                          <p className='text-sm text-gray-500'>6 months</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-visual-studio.png'
                            alt='Visual Studio'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Visual Studio</p>
                          <p className='text-sm text-gray-500'>6 months</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/flourish.png'
                            alt='Flourish'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Flourish</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-storybook.svg'
                            alt='Storybook'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Storybook</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-github.svg'
                            alt='GitHub'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>GitHub</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-gitlab.svg'
                            alt='GitLab'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>GitLab</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-sass.svg'
                            alt='Sass'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Sass</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-firebase.svg'
                            alt='Firebase'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Firebase</p>
                          <p className='text-sm text-gray-500'>6 months</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-docker.svg'
                            alt='Docker'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Docker</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>
              </div>
              {/*-- 設計書関連 -*/}
              <div className='container bg-white p-8 rounded-lg shadow-sm'>
                <h2 className='text-xl font-bold text-gray-800 mb-6'>
                  設計書関連
                </h2>

                <ul className='space-y-4 list-none pl-0'>
                  <li className='relative pl-6'>
                    <span className='absolute left-0 top-1 text-gray-600'>
                      -
                    </span>
                    <div>
                      <span className='text-gray-800 font-medium'>
                        要件概要書
                      </span>
                      <span className='text-gray-600 ml-2'>
                        （QAの資料作成等）
                      </span>
                    </div>
                  </li>

                  <li className='relative pl-6'>
                    <span className='absolute left-0 top-1 text-gray-600'>
                      -
                    </span>
                    <div>
                      <span className='text-gray-800 font-medium'>
                        基本設計書
                      </span>
                      <span className='text-gray-600 ml-2'>
                        （機能書、業務フロー図、外部設計書、WF図）
                      </span>
                    </div>
                  </li>

                  <li className='relative pl-6'>
                    <span className='absolute left-0 top-1 text-gray-600'>
                      -
                    </span>
                    <div>
                      <span className='text-gray-800 font-medium'>
                        詳細設計書
                      </span>
                      <span className='text-gray-600 ml-2'>
                        （画面遷移図、APIとの整合性確認、内部設計書、テストケースなど）
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            {/* message*/}
            {/* <div className='relative'>
              <img
                src='../assets/images/wave_1.svg'
                alt='背景の波線1'
                className='bg-[#f8fdfa]'
              />
              <img
                src='../assets/images/wave_2.svg'
                alt='背景の波線2'
                className='bg-[#7DFFE1]'
              />
            </div> */}
            <section
              id='contact'
              className='relative top-[380vh] w-screen h-screen p-8  mt-8 py-6 bg-[#C1FFEA]'
            >
              <div className='double-line-header flex items-center justify-end w-full relative py-10 mx-0'>
                <h2 className='relative px-3 py-5 text-6xl inline-block text-right'>
                  <span>Contact</span>
                  <span className='jp text-sm ml-2'>
                    / ご質問がありましたらお気軽にご連絡ください
                  </span>
                </h2>
              </div>

              <div className='bg-[#C1FFEA] container px-80'>
                <form className='flex flex-col gap-3 mx-auto py-4'>
                  <label htmlFor='name' className='text-[#348a58] text-sm'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    required
                    className='border border-[#bde7c4] rounded px-3 py-2 text-base'
                  />
                  <label htmlFor='email' className='text-[#348a58] text-sm'>
                    Mail Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='border border-[#bde7c4] rounded px-3 py-2 text-base'
                  />
                  <label htmlFor='message' className='text-[#348a58] text-sm'>
                    comment
                  </label>
                  <textarea
                    id='contactMessage'
                    name='message'
                    rows={4}
                    required
                    className='border border-[#bde7c4] rounded px-3 py-2 text-base'
                  ></textarea>
                  <button className='bg-green-700/50 hover:bg-green-700/20 text-white font-semibold py-3 px-6 rounded-xl backdrop-blur-md border border-white/30 transform transition-all duration-300 ease-out hover:scale-95 hover:translate-y-1 shadow-lg hover:shadow-md'>
                    送信
                  </button>
                </form>
              </div>
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};
export default ThreeCanvas;
