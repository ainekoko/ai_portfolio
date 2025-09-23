'use client';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import ScrollImg from '@/components/templetes/scroll-img';
import * as THREE from 'three';
import WindowScrollHandler from './WindowScrollHandler';
import ScrollController from './ScrollController';
import ScrollSync from '../ui/ScrollSync';
import SectionPositionsDebug from '../debug/SectionPositionsDebug';
import ProfileSection from '../sections/ProfileSection';
import TopSection from '../sections/TopSection';
import MessageSection from '../sections/Message';
import ExperienceSection from '../sections/ExperienceSection';
import { useVisibleSections } from '@/hooks';
import ItSection from '../sections/ItSection';
import SkillSection from '../sections/SkillSection';
import ContactSection from '../sections/ContactSection';
import { useCallback } from 'react';
import { ScrollData } from '@/types/scroll';

const ThreeCanvas = () => {
  const { setVisibleSections, isVisible } = useVisibleSections();

  /**
   * スクロールデータ準備完了時のコールバック関数
   * @param scrollData - 準備されたスクロールデータ
   */
  const handleScrollDataReady = useCallback((scrollData: ScrollData) => {
    // 必要に応じてスクロールデータを使用
    console.log('Scroll data ready:', scrollData);
  }, []);

  return (
    <>
      {/* ブラウザのスクロールバー同期用コンポーネント */}
      <ScrollSync />

      {/* デバッグ用コンポーネント（開発環境のみ） */}
      <SectionPositionsDebug />

      <Canvas
        gl={{
          toneMapping: THREE.NoToneMapping,
          toneMappingExposure: 1.0,
        }}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      >
        <ScrollControls
          pages={10.7}
          damping={0.3}
          distance={1}
          infinite={false}
          horizontal={false}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <ScrollController />
          <WindowScrollHandler
            setVisibleSections={setVisibleSections}
            onScrollDataReady={handleScrollDataReady}
          />
          <ScrollImg />

          <Scroll html>
            {/* 最初のsection */}
            <TopSection isVisible={isVisible('hello')} />
            {/* プロフィールsection */}
            <ProfileSection isVisible={isVisible} />
            {/* メッセージsection */}
            <MessageSection />
            {/* Previous Experience */}
            <ExperienceSection isVisible={isVisible} />
            {/* IT */}
            <ItSection />
            {/* スキル */}
            <SkillSection isVisible={isVisible} />
            {/* message*/}
            <ContactSection isVisible={isVisible} />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};
export default ThreeCanvas;
