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
  const { height } = useThree((state) => state.viewport);
  const data = useScroll();
  const group = useRef<Group>(null!);

  useFrame(() => {
    if (!group.current) return;
    const children = group.current.children;
    if (children.length >= 4) {
      (children[0] as unknown as ZoomSprite).material.zoom =
        1 + data.range(0, 1 / 3) / 3;
      (children[1] as unknown as ZoomSprite).material.zoom =
        1 + data.range(0, 1 / 3) / 3;
      (children[2] as unknown as ZoomSprite).material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
      (children[3] as unknown as ZoomSprite).material.zoom =
        1 + data.range(1.15 / 3, 1 / 3) / 3;
    }
  });

  return (
    <>
      <group ref={group}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url='/assets/images/top_1.jpg'
          scale={[0.9, 3]} // もっと小さく
          position={[-1.5, 1, 1]}
        />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url='/assets/images/top_2.jpg'
          scale={3}
          position={[1.2, 0.6, 1]}
        />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url='/assets/images/top_3.jpg'
          scale={[0.8, 2]}
          position={[0.5, height, 1]}
          // position={[0, -height, 2]}
        />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url='/assets/images/top_4.jpg'
          scale={[1, 2.5]}
          position={[-2, -3.5, 1]}
        />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          url='/assets/images/top_5.jpg'
          scale={[1, 2.5]}
          position={[1.8, -3.5, 1]}
        />
      </group>
    </>
  );
};

export default ScrollImg;
