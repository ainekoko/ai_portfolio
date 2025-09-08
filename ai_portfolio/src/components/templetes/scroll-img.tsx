'use client';
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Image } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

interface ZoomMaterial extends THREE.Material {
  zoom: number;
}

interface ZoomSprite extends THREE.Object3D {
  material: ZoomMaterial;
}

const ScrollImg: React.FC = () => {
  const { width, height } = useThree((state) => state.viewport);
  const data = useScroll();
  const group = useRef<Group>(null!);

  useFrame(() => {
    if (!group.current) return;
    const children = group.current.children;
    if (children.length >= 5) {
      (children[0] as unknown as ZoomSprite).material.zoom =
        1 + data.range(0, 1 / 3) / 3;
      (children[1] as unknown as ZoomSprite).material.zoom =
        1 + data.range(0, 1 / 3) / 3;
      (children[2] as unknown as ZoomSprite).material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
      (children[3] as unknown as ZoomSprite).material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
      (children[4] as unknown as ZoomSprite).material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
    }
  });

  return (
    <>
      <group ref={group}>
        {/* 白い背景プレーン - 最も奥に配置 */}
        <mesh position={[0, 0, -5]} scale={[width * 2, height * 10, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color='#ffffff' />
        </mesh>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url='/assets/images/top_1.jpg'
          scale={[2.5, 6]} // もっと小さく
          position={[-3, -1, 1]}
        />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image url='/assets/images/top_2.jpg' scale={5} position={[2, -1, 1]} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url='/assets/images/top_3.jpg'
          scale={[3, 3]}
          position={[-0.5, -height, 2]}
        />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url='/assets/images/top_4.jpg'
          scale={[2, 6]}
          position={[-4, -9, 1]}
        />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url='/assets/images/top_5.jpg'
          scale={[2, 6]}
          position={[3, -10, 1]}
        />
      </group>
    </>
  );
};

export default ScrollImg;
