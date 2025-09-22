'use client';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import ScrollImg from '@/components/templetes/scroll-img';
import * as THREE from 'three';
import WindowScrollHandler from './WindowScrollHandler';
import ProfileSection from '../sections/ProfileSection';
import TopSection from '../sections/TopSection';
import MessageSection from '../sections/Message';
import ExperienceSection from '../sections/ExperienceSection';
import { useVisibleSections } from '@/hooks';
import ItSection from '../sections/ItSection';
import SkillSection from '../sections/SkillSection';
import ContactSection from '../sections/ContactSection';

const ThreeCanvas = () => {
  const { setVisibleSections, isVisible } = useVisibleSections();

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
