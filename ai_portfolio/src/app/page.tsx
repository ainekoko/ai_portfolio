'use client';
import ScrollImg from '@/components/templetes/scroll-img';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

export default function Home() {
  return (
    <>
      <Canvas frameloop='demand'>
        <ScrollControls damping={0.5} pages={2}>
          <Scroll>
            <ScrollImg />
          </Scroll>
          <Scroll html>
            <h1 style={{ position: 'absolute', top: '30vh', left: '1em' }}>
              Ai&rsquo;s Portfolio{' '}
            </h1>
            <h1 style={{ position: 'absolute', top: '140vh', left: '40vw' }}>
              - Hello -
            </h1>
          </Scroll>
        </ScrollControls>
      </Canvas>
      <div
        style={{
          // position: 'absolute',
          // top: 0,
          // left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        サンプル
      </div>
    </>
  );
}
