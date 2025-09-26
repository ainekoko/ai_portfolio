/**
 * ScrollImg.tsx
 * スクロールに応じて画像がズームイン・ズームアウトするコンポーネント
 * 画像の横幅を画面の20%に調整
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

  const images: ImageData[] = useMemo(() => {
    // 959px以下をSPとして判定
    const isMobile = width < 959 / 100;

    if (isMobile) {
      console.log('SP mode');
      // SP用の設定
      return [
        {
          url: '/assets/images/top_2.jpg', //草原
          scale: width * 0.6, // SP用正方形サイズ
          // position: [0, height * 0.2, 1], // 中央配置、少し下に
          position: [width * 0.02, 0, 1],
        },
        {
          url: '/assets/images/top_1.jpg', //ネイル
          scale: [width * 0.2, width * 0.5],
          position: [-width * 0.25, -2, 1],
        },

        {
          url: '/assets/images/top_3.jpg', //クロワッサン
          scale: [width * 0.6, width * 0.6],
          position: [0, -10, 1],
        },
        {
          url: '/assets/images/top_4.jpg', //子供
          scale: [width * 0.2, height * 0.5],
          position: [-width * 0.25, -height * 1.1, 1],
        },
        {
          url: '/assets/images/top_5.jpg', //草原
          scale: [width * 0.2, height * 0.4],
          position: [width * 0.25, -height * 1.6, 1],
        },
      ];
    }

    // PC・タブレット用の設定（既存）
    return [
      {
        url: '/assets/images/top_1.jpg',
        scale: [width * 0.2, 6],
        position: [width * 0.1, 0, 1],
      },
      {
        url: '/assets/images/top_2.jpg',
        scale: width * 0.25,
        position: [-width * 0.2, -1, 1],
      },
      {
        url: '/assets/images/top_3.jpg',
        scale: [width * 0.2, width * 0.2],
        position: [-0.5, -height, 2],
      },
      {
        url: '/assets/images/top_4.jpg',
        scale: [width * 0.2, 6],
        position: [-width * 0.2, -9, 1],
      },
      {
        url: '/assets/images/top_5.jpg',
        scale: [width * 0.2, 5],
        position: [width * 0.2, -10, 1],
      },
    ];
  }, [width, height]);
  useFrame(() => {
    if (!group.current || !data) return;

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
