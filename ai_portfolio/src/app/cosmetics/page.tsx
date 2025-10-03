'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ScrollControls,
  Scroll,
  useScroll,
  Text,
  Box,
} from '@react-three/drei';
import * as THREE from 'three';

// 横スクロールコンテンツ
function HorizontalContent({ isMobile }) {
  const scroll = useScroll();
  const groupRef = useRef();

  // サンプルデータ
  const sections = [
    { title: 'ネイリスト', color: '#ff6b9d', position: 0 },
    { title: 'ルート営業', color: '#c44569', position: 1 },
    { title: 'OEM営業', color: '#6a5acd', position: 2 },
    { title: 'エンジニア', color: '#4682b4', position: 3 },
    { title: '現在', color: '#20b2aa', position: 4 },
  ];

  useFrame(() => {
    if (!groupRef.current) return;

    // スクロールオフセット（0-1）を取得
    const offset = scroll.offset;

    // モバイルは縦、PCは横
    if (isMobile) {
      groupRef.current.position.y = offset * 20;
    } else {
      groupRef.current.position.x = -offset * 20;
    }
  });

  return (
    <group ref={groupRef}>
      {sections.map((section, index) => (
        <group
          key={index}
          position={isMobile ? [0, -index * 5, 0] : [index * 5, 0, 0]}
        >
          {/* 背景ボックス */}
          <Box args={[4, 3, 0.5]} position={[0, 0, -1]}>
            <meshStandardMaterial color={section.color} />
          </Box>

          {/* タイトルテキスト */}
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.5}
            color='white'
            anchorX='center'
            anchorY='middle'
          >
            {section.title}
          </Text>

          {/* 番号 */}
          <Text
            position={[0, -0.8, 0]}
            fontSize={1.5}
            color='white'
            anchorX='center'
            anchorY='middle'
            fillOpacity={0.3}
          >
            {String(index + 1).padStart(2, '0')}
          </Text>
        </group>
      ))}
    </group>
  );
}

// HTMLオーバーレイ
function HTMLOverlay({ isMobile }) {
  const sections = [
    {
      title: 'ネイリスト',
      period: '2011',
      description: '店舗接客にてコミュニケーションスキルを身に着ける',
    },
    {
      title: 'ルート営業',
      period: '2012~2016',
      description: '全国の店舗へ直接出向き、商品の棚卸発注や新商品の紹介',
    },
    {
      title: 'OEM営業',
      period: '2015~2017',
      description: 'オリジナル商品の開発・製造をサポート',
    },
    {
      title: 'フロントエンドエンジニア',
      period: '2018~2020',
      description: 'HTML/CSS/PHP/Laravelを使用した開発',
    },
    {
      title: 'システムエンジニア',
      period: '2020~2024',
      description: 'Vue.js/TypeScript/Jestを使用した大規模開発',
    },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            ...(isMobile
              ? {
                  top: `${index * 100}vh`,
                  left: 0,
                }
              : {
                  left: `${index * 100}vw`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }),
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div className='text-center text-white px-8 max-w-2xl'>
            <div className='text-sm opacity-60 mb-2'>{section.period}</div>
            <h2 className='text-4xl md:text-6xl font-bold mb-4'>
              {section.title}
            </h2>
            <p className='text-lg md:text-xl opacity-80'>
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

// メインコンポーネント
export default function HorizontalScrollSample() {
  const [isMobile, setIsMobile] = useState(false);

  // レスポンシブ判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className='w-screen h-screen bg-gradient-to-br from-purple-900 to-blue-900'>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* スクロール設定 - モバイルは縦、PCは横 */}
        <ScrollControls
          pages={5}
          horizontal={!isMobile} // モバイルではfalse（縦）、PCではtrue（横）
          damping={0.2}
        >
          {/* 3Dコンテンツ */}
          <HorizontalContent isMobile={isMobile} />

          {/* HTMLオーバーレイ */}
          <Scroll html>
            <HTMLOverlay isMobile={isMobile} />
          </Scroll>
        </ScrollControls>
      </Canvas>

      {/* 操作ガイド */}
      <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-60 z-10'>
        {isMobile
          ? '縦スクロールで移動'
          : 'マウスホイールまたは横スクロールで移動'}
      </div>

      {/* プログレスバー - モバイルは縦、PCは横 */}
      <div
        className={`fixed bg-white/20 z-10 ${
          isMobile ? 'top-0 right-0 w-1 h-full' : 'top-0 left-0 w-full h-1'
        }`}
      >
        <div
          className='bg-white transition-all duration-300'
          id='progress-bar'
          style={isMobile ? { height: '0%' } : { width: '0%' }}
        />
      </div>
    </div>
  );
}
