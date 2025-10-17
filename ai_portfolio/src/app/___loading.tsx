'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

/**
 * 画像とリソースの読み込みを管理するローディング画面
 */
export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 読み込む画像のリスト
    const imagesToLoad = [
      '/assets/images/top_1.jpg',
      '/assets/images/top_2.jpg',
      '/assets/images/top_3.jpg',
      '/assets/images/top_4.jpg',
      '/assets/images/top_5.jpg',
      '/assets/images/bg_flower_left.png',
      '/assets/images/bg_flower_right.png',
      '/assets/images/profile-shimaenaga.png',
      '/assets/images/hokkaido.png',
    ];

    let loadedCount = 0;
    const totalImages = imagesToLoad.length;

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    // すべての画像を読み込む
    Promise.all(imagesToLoad.map(loadImage))
      .then(() => {
        // 読み込み完了後、少し待ってからフェードアウト
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(onLoadComplete, 500); // フェードアウト完了後にコールバック
        }, 300);
      })
      .catch((error) => {
        console.error('画像の読み込みに失敗しました:', error);
        // エラーが発生してもローディングを終了
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(onLoadComplete, 500);
        }, 1000);
      });
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ロゴや画像 */}
      <div className='mb-8 animate-pulse'>
        <h1 className='text-4xl md:text-6xl font-bold text-gray-800'>
          Ai's Portfolio
        </h1>
      </div>

      {/* プログレスバー */}
      <div className='w-64 h-2 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className='h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out'
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* パーセンテージ表示 */}
      <p className='mt-4 text-gray-600 text-sm'>Loading... {progress}%</p>
    </div>
  );
}
