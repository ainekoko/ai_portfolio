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
  const getTransform = (d) => {
    switch (d) {
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
        transform: isVisible ? 'translate(0, 0)' : getTransform(direction),
        transition: `opacity 1.5s ease-out ${delay}s, transform 1.5s ease-out ${delay}s`,
        willChange: 'opacity, transform', // パフォーマンス向上
      }}
    >
      {children}
    </div>
  );
};

export default FadeInElement;
