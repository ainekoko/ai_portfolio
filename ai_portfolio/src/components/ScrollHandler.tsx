// components/ScrollHandler.tsx - より最適化版
'use client';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

interface ScrollHandlerProps {
  setVisibleSections: (sections: Set<string>) => void;
}

const ScrollHandler = ({ setVisibleSections }: ScrollHandlerProps) => {
  const scroll = useScroll();
  const lastOffsetRef = useRef<number>(-1);
  const lastVisibleSectionsRef = useRef<string>('');
  const frameCountRef = useRef<number>(0);

  useFrame(() => {
    // 3フレームに1回だけ実行（約20fps）
    frameCountRef.current++;
    if (frameCountRef.current % 3 !== 0) return;

    const offset = scroll.offset;

    // スクロール位置が0.5%未満の変化の場合はスキップ
    if (Math.abs(offset - lastOffsetRef.current) < 0.005) return;

    lastOffsetRef.current = offset;
    const newVisibleSections = new Set<string>();

    // 各セクションの表示開始位置
    const sectionThresholds = {
      hello: 0.21,
      profile: 0.675,
      projects: 0.95,
    };

    Object.entries(sectionThresholds).forEach(([sectionId, threshold]) => {
      if (offset >= threshold) {
        newVisibleSections.add(sectionId);
      }
    });

    // 状態が変わった場合のみ更新
    const currentSectionsString = Array.from(newVisibleSections)
      .sort()
      .join(',');
    if (currentSectionsString !== lastVisibleSectionsRef.current) {
      lastVisibleSectionsRef.current = currentSectionsString;
      setVisibleSections(newVisibleSections);
    }
  });

  return null;
};

export default ScrollHandler;
