'use client';

import React from 'react';
import ScrollImg from '@/components/templetes/scroll-img';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { useState, useEffect } from 'react';

const Top = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className='h-[1500px] overflow-x-hidden'>
        <div className='w-full h-full bg-black' />
      </section>
    );
  }

  return (
    <section className='h-screen'>
      <Canvas frameloop='demand'>
        {/* ページ数を増やして全体のコンテンツを含める */}
        <ScrollControls damping={0.5} pages={4}>
          <Scroll>
            <ScrollImg />
          </Scroll>
          <Scroll html>
            {/* 最初のセクション */}
            <div className='absolute top-0 w-screen h-screen'>
              <h1 className='absolute top-[30vh] left-4 text-4xl font-bold'>
                Ai&rsquo;s Portfolio
              </h1>
              <h1 className='absolute top-[125vh] left-[35vw] text-3xl font-bold'>
                - Hello -
              </h1>
              <p className='absolute top-[145vh] left-[50vw] text-lg w-1'>
                閲覧頂きありがとうございます
              </p>
              <p className='absolute top-[150vh] left-[45vw] text-base w-1'>
                このサイトで少しでも私の事を知って頂けたら幸いです
              </p>
            </div>
            {/* 追加のセクション */}
            <div
              style={{
                position: 'absolute',
                top: '200vh',
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(to bottom, #000, #333)',
                padding: '2rem',
              }}
            >
              <h2
                style={{
                  color: 'white',
                  fontSize: '2rem',
                  marginBottom: '1rem',
                }}
              >
                About Me
              </h2>
              <p style={{ color: 'white', fontSize: '1.2rem' }}>
                ここに自己紹介などのコンテンツを追加
              </p>
            </div>

            {/* さらなるセクション */}
            <div
              style={{
                position: 'absolute',
                top: '300vh',
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(to bottom, #333, #666)',
                padding: '2rem',
              }}
            >
              <h2
                style={{
                  color: 'white',
                  fontSize: '2rem',
                  marginBottom: '1rem',
                }}
              >
                Projects
              </h2>
              <p style={{ color: 'white', fontSize: '1.2rem' }}>
                プロジェクトの紹介
              </p>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </section>
  );
};

export default Top;
