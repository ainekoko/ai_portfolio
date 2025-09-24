'use client';
import GentleScrollProvider from '@/components/ui/GentleScrollProvider';
import ProfileSection from '@/components/sections/ProfileSection';
import TopSection from '@/components/sections/TopSection';
import MessageSection from '@/components/sections/Message';
import ExperienceSection from '@/components/sections/ExperienceSection';
import { useVisibleSections } from '@/hooks';
import ItSection from '@/components/sections/ItSection';
import SkillSection from '@/components/sections/SkillSection';
import ContactSection from '@/components/sections/ContactSection';
import ScrollSync from '../ui/ScrollSync';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import ScrollController from './ScrollController';
import WindowScrollHandler from './WindowScrollHandler';
import ScrollImg from '../templetes/scroll-img';
import * as THREE from 'three';

const GentleScrollCanvas = () => {
  const { setVisibleSections, isVisible } = useVisibleSections();

  return (
    <>
      <GentleScrollProvider
        damping={0.15} // バウンド無しの適度な値
        wheelSensitivity={0.4} // ホイール感度
        touchSensitivity={0.6} // タッチ感度
      >
        {/* セクション内容 */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* TopSection */}
          {/* <ScrollSync /> */}
          <Canvas
            gl={{
              toneMapping: THREE.NoToneMapping,
              toneMappingExposure: 1.0,
            }}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
          >
            {/* Three.jsのシーン */}
            <ScrollControls
              pages={3.5}
              damping={0.3}
              distance={1}
              infinite={false}
              horizontal={false}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* スクロール同期コントローラー */}
              <ScrollController />
              {/* スクロール位置に応じて表示セクションを判定 */}
              <WindowScrollHandler setVisibleSections={setVisibleSections} />

              {/*-------------- ここから画面表示 --------------*/}
              {/* スクロール画像 */}
              <ScrollImg />
            </ScrollControls>
          </Canvas>

          {/* 最初のsection */}
          <div data-section>
            <TopSection isVisible={isVisible('hello')} />
          </div>

          {/* プロフィールsection */}
          <div data-section>
            <ProfileSection isVisible={isVisible} />
          </div>

          {/* メッセージsection */}
          <div data-section>
            <MessageSection />
          </div>

          {/* Previous Experience */}
          <div data-section>
            <ExperienceSection isVisible={isVisible} />
          </div>

          {/* IT */}
          <div data-section>
            <ItSection />
          </div>

          {/* スキル */}
          <div data-section>
            <SkillSection isVisible={isVisible} />
          </div>

          {/* Contact */}
          <div data-section>
            <ContactSection isVisible={isVisible} />
          </div>
        </div>
      </GentleScrollProvider>
    </>
  );
};

export default GentleScrollCanvas;
