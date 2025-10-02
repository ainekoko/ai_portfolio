'use client';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import * as THREE from 'three';
import ScrollImg from '@/components/templetes/scroll-img';
import WindowScrollHandler from './WindowScrollHandler';
import ScrollController from './ScrollController';
import ScrollSync from '../ui/ScrollSync';

interface ThreeCanvasProps {
  setVisibleSections: (sections: Set<string>) => void;
}

const ThreeCanvas = ({ setVisibleSections }: ThreeCanvasProps) => {
  return (
    <>
      {/* ブラウザのスクロールバー同期用コンポーネント */}
      <ScrollSync />
      <Canvas
        gl={{
          toneMapping: THREE.NoToneMapping,
          toneMappingExposure: 1.0,
        }}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      >
        {/* Three.jsのシーン */}
        <ScrollControls
          pages={11.5}
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
    </>
  );
};
export default ThreeCanvas;
