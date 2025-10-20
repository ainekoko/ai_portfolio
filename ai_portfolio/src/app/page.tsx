'use client';
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import ScrollImg from '@/components/templetes/scroll-img';
import * as THREE from 'three';
import WindowScrollHandler from '@/components/three/WindowScrollHandler';
import ProfileSection from '@/components/sections/ProfileSection';
import TopSection from '@/components/sections/TopSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillSection from '@/components/sections/SkillSection';
import ContactSection from '@/components/sections/ContactSection';
import MessageSection from '@/components/sections/Message';

const ThreeCanvas = () => {
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

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        gl={{
          toneMapping: THREE.NoToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <ScrollControls pages={12} damping={0.3}>
          <WindowScrollHandler setVisibleSections={setVisibleSections} />
          <ScrollImg />

          <Scroll html style={{ width: '100vw' }}>
            {/* 最初のセクション */}
            <TopSection isVisible={isVisible('hello')} />

            {/* プロフィール */}
            <ProfileSection isVisible={isVisible} />

            {/* メッセージ */}
            <MessageSection />

            {/* 職務経歴 */}
            <ExperienceSection isVisible={isVisible} />

            {/* スキル */}
            <SkillSection isVisible={isVisible} />

            {/* お問い合わせ */}
            <ContactSection isVisible={isVisible} />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
