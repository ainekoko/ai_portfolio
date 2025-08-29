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
      <section className='h-[1300px] overflow-x-hidden'>
        <div className='w-full h-full bg-black' /> {/* ローディング画面 */}
      </section>
    );
  }
  return (
    <section className='h-[1300px]'>
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
            <p
              className=''
              style={{ position: 'absolute', top: '140vh', left: '45vw' }}
            >
              閲覧頂きありがとうございます
            </p>
            <p
              className=''
              style={{ position: 'absolute', top: '145vh', left: '40vw' }}
            >
              このサイトで少しでも私の事を知って頂けたら幸いです
            </p>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </section>
  );
};

export default Top;
