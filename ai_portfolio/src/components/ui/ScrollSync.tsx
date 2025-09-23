// src/components/ui/ScrollSync.tsx
'use client';
import { useEffect } from 'react';

/**
 * ブラウザのスクロールバーとThree.jsのスクロールを同期するコンポーネント
 */
const ScrollSync = () => {
  useEffect(() => {
    // ページの高さを10.7倍に設定してスクロールバーを表示
    const originalHeight = document.body.style.height;
    const vh = window.innerHeight;
    const totalHeight = vh * 10.7; // Three.jsのpages設定と同じ

    // bodyの高さを設定
    document.body.style.height = `${totalHeight}px`;
    document.body.style.overflow = 'auto';

    // ブラウザのスクロールイベントをThree.jsに同期（必要に応じて）
    const handleBrowserScroll = () => {
      // ここではブラウザのスクロールからThree.jsへの同期は行わない
      // Three.js側からブラウザへの一方向同期のみ
    };

    window.addEventListener('scroll', handleBrowserScroll, { passive: true });

    return () => {
      // クリーンアップ
      document.body.style.height = originalHeight;
      window.removeEventListener('scroll', handleBrowserScroll);
    };
  }, []);

  return null;
};

export default ScrollSync;
