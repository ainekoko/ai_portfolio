'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import ScrollImg from '@/components/templetes/scroll-img';
import * as THREE from 'three';
// コンポーネントでの使用例
import WindowScrollHandler from '@/components/three/WindowScrollHandler';
import ProfileSection from '@/components/sections/ProfileSection';
import TopSection from '@/components/sections/TopSection';

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
        <ScrollControls pages={10.7} damping={0.3}>
          <WindowScrollHandler setVisibleSections={setVisibleSections} />
          <ScrollImg />

          <Scroll html>
            {/* 最初のセクション */}
            <TopSection isVisible={isVisible('hello')} />
            {/* プロフィール */}
            <ProfileSection isVisible={isVisible} />
            {/* メッセージ */}
            <section
              id='message'
              className=' relative top-[320vh] w-screen h-screen  mt-8 py-50'
            >
              <h2 className='text-[#e5c227] text-center text-lg font-bold mb-3 z-10 relative'>
                Message
              </h2>
              <p className='w-[800px] text-center text-base leading-relaxed z-10 relative m-auto'>
                初めまして。AIです(^^)/
                <br />
                新卒で入社した化粧品メーカーでは、様々な経験をさせて頂きネイル商材のデザイン企画や大手企業の商品をともに作れるというやりがい、
                時には被災地へ赴き子供から大人までネイルを無料で体験するコーナーを設けたり等、様々な経験をさせて頂きました。
                <br />
                IT業界に興味を持ったきっかけは、自社商品を＠コスメにて紹介して頂いた所、看板商品になるまでに大きな反響がありました。
                <br />
                それからもっと自社を大きくするにはネットが不可欠ではないか？今後もっとネット社会になっていくのでは？と思ったのがきっかけでした。
                <br />
                ですが、当時会社ではWEBに力を入れておらず、必要最低限のHPしか作成されていませんでした。
                <br />
                今後もWEBは外注に任せるとの事だったので、自分でHPに携わりたいと言う気持ちが大きくなりIT業界へ飛び込みました。
                <br />
                当初は手探りで毎日勉強しても追いつかないくらいで半泣き状態でしたが、
                家で過ごす時間も増え北海道への移住も叶い子供達も伸び伸びと過ごしている毎日にIT業界に転職して本当良かったなぁと思っています。
              </p>
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};
export default ThreeCanvas;
