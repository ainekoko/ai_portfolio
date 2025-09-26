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

interface ImageData {
  url: string;
  scale: number | [number, number];
  position?: [number, number, number];
}

/**
 * スクロールに応じて画像がズームイン・ズームアウトするコンポーネント
 */
const ScrollImg: React.FC = () => {
  const { width, height } = useThree((state) => state.viewport);
  const data = useScroll();
  const group = useRef<Group>(null!);
  const imageRefs = useRef<(THREE.Mesh | null)[]>([]);

  const images: ImageData[] = useMemo(
    () => [
      {
        url: '/assets/images/top_1.jpg',
        scale: [2.5, 6],
        position: [-3, -1, 1],
      },
      {
        url: '/assets/images/top_2.jpg',
        scale: 5,
        position: [2, -1, 1],
      },
      {
        url: '/assets/images/top_3.jpg',
        scale: [3, 3],
        position: [-0.5, -height, 2],
      },
      {
        url: '/assets/images/top_4.jpg',
        scale: [2, 6],
        position: [-4, -9, 1],
      },
      {
        url: '/assets/images/top_5.jpg',
        scale: [2, 6],
        position: [3, -10, 1],
      },
    ],
    [height]
  );

  useFrame(() => {
    if (!group.current || !data) return;

    // スクロールオフセットをログ出力（デバッグ用）
    // console.log('Scroll offset:', data.offset);

    const children = group.current.children;

    // 各画像に対してズーム効果を適用
    children.forEach((child, index) => {
      // 背景プレーンをスキップ
      if (index === 0) return;

      const imageIndex = index - 1; // 背景プレーンの分を調整

      if (child instanceof THREE.Mesh && child.material) {
        let zoomValue = 1;

        switch (imageIndex) {
          case 0:
          case 1:
            // 最初の2つの画像: スクロール開始部分でズーム (0.0 - 0.33)
            zoomValue = 1 + data.range(0, 0.33) / 3;
            break;
          case 2:
          case 3:
          case 4:
            // 後の3つの画像: スクロール中間部分でズーム (0.10 - 0.50)
            zoomValue = 1 + data.range(0.1, 0.4) / 2;
            break;
        }

        // マテリアルがShaderMaterialの場合のズーム適用
        if (child.material instanceof THREE.ShaderMaterial) {
          if (child.material.uniforms && child.material.uniforms.zoom) {
            child.material.uniforms.zoom.value = zoomValue;
          }
        }

        // スケール変更による代替ズーム効果
        const baseScale = Array.isArray(images[imageIndex]?.scale)
          ? images[imageIndex].scale
          : [images[imageIndex]?.scale || 1, images[imageIndex]?.scale || 1];

        if (Array.isArray(baseScale)) {
          child.scale.set(
            baseScale[0] * zoomValue,
            baseScale[1] * zoomValue,
            1
          );
        } else {
          child.scale.set(baseScale * zoomValue, baseScale * zoomValue, 1);
        }
      }
    });
  });

  return (
    <Scroll>
      <group ref={group}>
        {/* 白い背景プレーン - 最も奥に配置 */}
        <mesh position={[0, 0, -5]} scale={[width * 2, height * 7, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color='white' />
        </mesh>

        {images.map((img, index) => (
          <React.Fragment key={index}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              key={index}
              url={img.url}
              scale={img.scale}
              position={img.position}
              ref={(ref) => {
                imageRefs.current[index] = ref;
              }}
            />
          </React.Fragment>
        ))}
      </group>
    </Scroll>
  );
};

export default ScrollImg;
