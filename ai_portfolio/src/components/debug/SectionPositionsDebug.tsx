// src/components/debug/SectionPositionsDebug.tsx
'use client';
import { useState, useEffect } from 'react';

interface SectionPosition {
  id: string;
  vh: number;
  px: number;
}

/**
 * セクション位置をデバッグ表示するコンポーネント
 * 開発時のみ使用
 */
const SectionPositionsDebug = () => {
  const [positions, setPositions] = useState<SectionPosition[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const calculatePositions = () => {
    const sectionIds = [
      'topSection',
      'profile',
      'experience',
      'it',
      'skill',
      'contact',
    ];
    const newPositions: SectionPosition[] = [];

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;

        // ピクセル値をvh値に変換
        const vh = window.innerHeight / 100;
        const vhPosition = elementTop / vh;

        newPositions.push({
          id: sectionId,
          vh: Math.round(vhPosition * 10) / 10, // 小数点第1位まで
          px: Math.round(elementTop),
        });
      }
    });

    setPositions(newPositions);
  };

  const recalculateAll = () => {
    calculatePositions();
    // グローバル関数も呼び出し
    if ((window as any).recalculateSectionPositions) {
      (window as any).recalculateSectionPositions();
    }
  };

  useEffect(() => {
    // 初回計算
    const timer = setTimeout(calculatePositions, 500);

    // リサイズ時に再計算
    window.addEventListener('resize', calculatePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  // 開発環境でのみ表示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <></>;
};

export default SectionPositionsDebug;
