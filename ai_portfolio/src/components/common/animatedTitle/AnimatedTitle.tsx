'use client';
import { useEffect, useRef } from 'react';

// anime.jsの型定義
interface AnimeInstance {
  timeline: (config: { loop: boolean }) => AnimeInstance;
  add: (config: unknown) => AnimeInstance;
  (config: unknown): void;
}

interface WindowWithAnime extends Window {
  anime?: AnimeInstance;
}

export default function AnimatedTitle() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // anime.jsが既にロードされているか確認
    if (typeof window !== 'undefined' && (window as WindowWithAnime).anime) {
      initAnimation();
      return;
    }

    // anime.jsをロード
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js';
    script.async = true;
    script.onload = () => {
      initAnimation();
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initAnimation = () => {
    const textWrapper = titleRef.current?.querySelector('.letters');
    if (textWrapper && textWrapper.textContent) {
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter' style='display: inline-block; line-height: 1em; transform-origin: 0 0;'>$&</span>"
      );

      const anime = (window as WindowWithAnime).anime;
      if (!anime) return;

      anime
        .timeline({ loop: true })
        .add({
          targets: '.loading-title .letter',
          opacity: [0, 1],
          rotateY: [-90, 0],
          duration: 1300,
          delay: (_el: Element, i: number) => 45 * i,
        })
        .add({
          targets: '.loading-title',
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000,
        });

      // Loading...のアニメーション
      anime({
        targets: '.loading-subtitle',
        opacity: [0.5, 1],
        scale: [0.95, 1],
        duration: 1500,
        easing: 'easeInOutQuad',
        loop: true,
        direction: 'alternate',
      });
    }
  };

  return (
    <div ref={titleRef} className='mt-8 text-center'>
      <h1 className='loading-title text-2xl font-bold tracking-[2px] mb-4 text-gray-800'>
        <span className='text-wrapper inline-block relative pt-[0.2em] pr-[0.05em] pb-[0.1em] overflow-hidden'>
          <span className='letters'>Ai&apos;s portfolio</span>
        </span>
      </h1>

      {/* Loading text */}
      <p className='loading-subtitle text-gray-500 text-xs font-light tracking-wider'>
        Loading...
      </p>
    </div>
  );
}
