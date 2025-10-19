import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Image, Scroll } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

interface ImageData {
  url: string;
  scale: number | [number, number];
  position?: [number, number, number];
}

const ScrollImg: React.FC = () => {
  const { width, height } = useThree((state) => state.viewport);
  const data = useScroll();
  const group = useRef<Group>(null!);
  const imageRefs = useRef<(THREE.Mesh | null)[]>([]);

  // ページ数を定数として定義
  const TOTAL_PAGES = 7.7;
  // ProfileSectionまでの高さ（305vh = 3.05ページ）
  const BACKGROUND_HEIGHT = 3.05;

  const images: ImageData[] = useMemo(() => {
    const isMobile = width < 959 / 100;

    if (isMobile) {
      return [
        {
          url: '/assets/images/top_2.jpg',
          scale: width * 0.6,
          position: [width * 0.02, 0, 1],
        },
        {
          url: '/assets/images/top_1.jpg',
          scale: [width * 0.2, width * 0.5],
          position: [-width * 0.25, -2, 1],
        },
        {
          url: '/assets/images/top_3.jpg',
          scale: [width * 0.6, width * 0.6],
          position: [0, -10, 1],
        },
        {
          url: '/assets/images/top_4.jpg',
          scale: [width * 0.2, height * 0.5],
          position: [-width * 0.25, -height * 1.1, 1],
        },
        {
          url: '/assets/images/top_5.jpg',
          scale: [width * 0.2, height * 0.4],
          position: [width * 0.25, -height * 1.6, 1],
        },
      ];
    }

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

    children.forEach((child, index) => {
      if (index === 0) return; // 背景プレーンをスキップ

      const imageIndex = index - 1;

      if (child instanceof THREE.Mesh && child.material) {
        let zoomValue = 1;

        switch (imageIndex) {
          case 0:
          case 1:
            zoomValue = 1 + data.range(0, 0.33) / 3;
            break;
          case 2:
          case 3:
          case 4:
            zoomValue = 1 + data.range(0.1, 0.4) / 2;
            break;
        }

        if (child.material instanceof THREE.ShaderMaterial) {
          if (child.material.uniforms && child.material.uniforms.zoom) {
            child.material.uniforms.zoom.value = zoomValue;
          }
        }

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
        {/* 
          スクロールする背景プレーン（ProfileSectionまで）
          - Scroll内に配置してスクロールに追従
          - 上端がY=0から始まり、下端がProfileSection（305vh）まで
        */}
        <mesh
          position={[0, (-height * BACKGROUND_HEIGHT) / 2, -5]}
          scale={[width * 2, height * BACKGROUND_HEIGHT, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color='#ffffff' />
        </mesh>

        {images.map((img, index) => (
          <React.Fragment key={index}>
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
