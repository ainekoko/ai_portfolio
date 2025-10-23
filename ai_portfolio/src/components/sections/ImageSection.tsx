'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Intersection Observer を使用したカスタムフック
const useFadeInOnScroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 一度表示されたら監視を解除
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.05, // 5%見えたら発火（より早く開始）
        rootMargin: '50px', // 画面に入る50px前から検知
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// フェードインコンポーネント
const FadeInElement = ({ children, direction = 'up', delay = 0 }) => {
  const [ref, isVisible] = useFadeInOnScroll();

  // アニメーション方向の設定
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(50px)'; // 移動距離を少し短く
      case 'down':
        return 'translateY(-50px)';
      case 'left':
        return 'translateX(50px)';
      case 'right':
        return 'translateX(-50px)';
      default:
        return 'translateY(50px)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getTransform(),
        transition: `opacity 1.5s ease-out ${delay}s, transform 1.5s ease-out ${delay}s`,
        willChange: 'opacity, transform', // パフォーマンス向上
      }}
    >
      {children}
    </div>
  );
};

// デモページ
const ImageSection = () => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <div className='max-w-6xl mx-auto px-5 py-20'>
        {/* パターン2+3: 絶対配置で時間差フェードイン */}
        <div className='relative h-[1200px] mb-20'>
          <FadeInElement direction='up' delay={0}>
            <div className='absolute right-40 top-0'>
              <Image
                src='/assets/images/top_1.jpg'
                alt='Image1'
                className='rounded-lg shadow-xl'
                width={300}
                height={350}
              />
            </div>
          </FadeInElement>

          <FadeInElement direction='up' delay={0.2}>
            <div className='absolute left-10 top-20'>
              <Image
                src='/assets/images/top_2.jpg'
                alt='Image2'
                className='rounded-lg shadow-xl'
                width={400}
                height={400}
              />
            </div>
          </FadeInElement>
        </div>

        {/* テキストボックス */}
        {/* <FadeInElement direction='up' delay={0}>
          <div className='text-center py-20'>
            <p className='text-7xl font-bold text-gray-800'>ふわっと</p>
          </div>
        </FadeInElement>
 */}
        {/* パターン4: グリッドレイアウト */}
        <FadeInElement direction='up'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-8 mb-100'>
            <div className='relative'>
              <Image
                src='/assets/images/top_1.jpg'
                alt='Image1'
                className='rounded-lg shadow-xl w-full h-auto'
                width={300}
                height={400}
              />
            </div>
            <div className='relative'>
              <Image
                src='/assets/images/top_2.jpg'
                alt='Image2'
                className='rounded-lg shadow-xl w-full h-auto'
                width={300}
                height={400}
              />
            </div>
            <div className='relative'>
              <Image
                src='/assets/images/top_3.jpg'
                alt='Image3'
                className='rounded-lg shadow-xl w-full h-auto'
                width={300}
                height={400}
              />
            </div>
          </div>
        </FadeInElement>

        {/* 右から */}
        {/* <FadeInElement direction='right'>
          <div className='bg-white p-8 rounded-lg shadow-lg mb-12'>
            <h2 className='text-3xl font-bold mb-4 text-gray-800'>
              右からフェードイン
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              スクロールすると右からふわっと表示されます。
            </p>
          </div>
        </FadeInElement> */}

        {/* 左から */}
        {/* <FadeInElement direction='left'>
          <div className='bg-white p-8 rounded-lg shadow-lg mb-12'>
            <h2 className='text-3xl font-bold mb-4 text-gray-800'>
              左からフェードイン
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              スクロールすると左からふわっと表示されます。
            </p>
          </div>
        </FadeInElement> */}

        {/* カード群 - 個別にフェードイン */}
        {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          {[1, 2, 3].map((num) => (
            <FadeInElement key={num} direction='up' delay={num * 0.2}>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <div className='w-full h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4'></div>
                <h3 className='text-xl font-bold mb-2 text-gray-800'>
                  Card {num}
                </h3>
                <p className='text-gray-600'>
                  順番にふわっと表示されるカードです。
                </p>
              </div>
            </FadeInElement>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ImageSection;
