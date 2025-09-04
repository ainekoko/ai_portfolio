'use client';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import ScrollImg from '@/components/templetes/scroll-img';

// コンポーネントでの使用例
import WindowScrollHandler from './WindowScrollHandler';
import ProfileSection from './sections/ProfileSection';
import TopSection from './sections/TopSection';

const ThreeCanvas = () => {
  return (
    <>
      <Canvas frameloop='demand'>
        <ScrollControls pages={4}>
          {/* スクロール位置に応じて表示するタイトルのセクションを制御 */}
          <WindowScrollHandler />
          <Scroll>
            <ScrollImg />
          </Scroll>
          <Scroll html>
            {/* 最初のセクション */}
            <TopSection />
            {/* プロフィール */}
            <ProfileSection />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};
export default ThreeCanvas;
