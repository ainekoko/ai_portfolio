'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll, Image, ScrollControls, Scroll } from '@react-three/drei';
import { Group } from 'three';

const ScrollImg: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const Images = () => {
    const { height } = useThree((state) => state.viewport);
    const data = useScroll();
    const group = useRef<Group>(null!);

    useFrame(() => {
      if (!group.current) return;
      const children = group.current.children;
      if (children.length >= 4) {
        (children[0] as any).material.zoom = 1 + data.range(0, 1 / 3) / 3;
        (children[1] as any).material.zoom = 1 + data.range(0, 1 / 3) / 3;
        (children[2] as any).material.zoom =
          1 + data.range(1.15 / 3, 1 / 3) / 3;
        (children[3] as any).material.zoom =
          1 + data.range(1.15 / 3, 1 / 3) / 3;
      }
    });

    return (
      <group ref={group}>
        <Image
          url='/assets/images/top_1.jpg'
          scale={[4, height, 1]}
          position={[-1, 0, 1]}
        />
        <Image url='/assets/images/top_2.jpg' scale={3} position={[2, 0, 1]} />
        <Image
          url='/assets/images/top_3.jpg'
          scale={[1, 3.5, 1]}
          position={[-2.3, -height, 2]}
        />
        <Image
          url='/assets/images/top_4.jpg'
          scale={[1, 2.7, 1]}
          position={[-1.4, -height - 0.7, 1]}
        />
        <Image
          url='/assets/images/top_5.jpg'
          scale={[1.4, 2, 1]}
          position={[1.3, -height - 0.3, 3.2]}
        />
      </group>
    );
  };

  return mounted ? (
    <Canvas key='main-canvas' frameloop='demand'>
      <ScrollControls damping={3} pages={2}>
        <Scroll>
          <Images />
        </Scroll>
        <Scroll html>
          <h1 style={{ position: 'absolute', top: '60vh', left: '1.5em' }}>
            Be
          </h1>
          <h1 style={{ position: 'absolute', top: '140vh', left: '40vw' }}>
            Creative
          </h1>
        </Scroll>
      </ScrollControls>
    </Canvas>
  ) : null;
};

//export default ScrollImg;
export default React.memo(ScrollImg);
