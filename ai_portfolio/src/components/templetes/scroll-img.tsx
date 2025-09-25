/**
 * ScrollImg.tsx
 * スクロールに応じて画像がズームイン・ズームアウトするコンポーネント
 */
'use client';
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Image } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';
import { Scroll } from '@react-three/drei';
import { ZoomSprite } from '@/types/scroll';

interface ImageData {
  url: string;
  scale: number | [number, number]; // number[] ではなく [number, number]
  position?: [number, number, number];
}

/**
 * スクロールに応じて画像がズームイン・ズームアウトするコンポーネント
 * @returns React.FC
 */
const ScrollImg: React.FC = () => {
  const { width, height } = useThree((state) => state.viewport);
  const data = useScroll();
  const group = useRef<Group>(null!);
  const images: ImageData[] = useMemo(
    () => [
      {
        url: '/assets/images/top_1.jpg',
        scale: [2.5, 6],
        position: [-3, -1, 1],
      },
      { url: '/assets/images/top_2.jpg', scale: 5, position: [2, -1, 1] },
      {
        url: '/assets/images/top_3.jpg',
        scale: [3, 3],
        position: [-0.5, -height, 2],
      },
      { url: '/assets/images/top_4.jpg', scale: [2, 6], position: [-4, -9, 1] },
      { url: '/assets/images/top_5.jpg', scale: [2, 6], position: [3, -10, 1] },
    ],
    [height]
  );

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
    <Scroll>
      <group ref={group}>
        {/* 白い背景プレーン - 最も奥に配置 */}
        <mesh position={[0, 0, -5]} scale={[width * 2, height * 7, 1]}>
          <planeGeometry args={[1, 1]} />
          {/* <meshBasicMaterial map={texture} /> */}
        </mesh>
        {images.map((img, index) => (
          <React.Fragment key={index}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              key={index}
              url={img.url}
              scale={img.scale}
              position={img.position}
            />
          </React.Fragment>
        ))}
      </group>
    </Scroll>
  );
};

export default ScrollImg;
