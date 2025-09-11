// components/WindowScrollHandler.tsx - DOM要素ベース版
'use client';
import { useScrollVisibility } from '@/context/ScrollVisibilityContext';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const WindowScrollHandler = () => {
  const { setVisibleSections } = useScrollVisibility();
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

    // DOM要素を基準にした表示判定
    const sectionIds = ['hello', 'profile', 'experience', 'skill', 'contact'];

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      // 要素の位置情報を取得
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // 要素が画面内に表示されているかチェック
      // 要素の上端が画面下部より上にあり、要素の下端が画面上部より下にある場合
      const isVisible = elementTop < windowHeight && elementBottom > 0;

      // より詳細な表示判定（要素の50%以上が表示されている場合）
      const visibleHeight =
        Math.min(elementBottom, windowHeight) - Math.max(elementTop, 0);
      const elementHeight = rect.height;
      const visibilityRatio = Math.max(0, visibleHeight) / elementHeight;

      // 要素の30%以上が表示されている場合に表示とみなす
      if (isVisible && visibilityRatio > 0.3) {
        newVisibleSections.add(sectionId);
      }
    });

    // セクション状態の文字列化と比較
    const currentSectionsString = Array.from(newVisibleSections)
      .sort()
      .join(',');
    // 前回と今回が異なる場合のみ状態を更新
    if (currentSectionsString !== lastVisibleSectionsRef.current) {
      lastVisibleSectionsRef.current = currentSectionsString;
      setVisibleSections(newVisibleSections);
    }
  });

  return null;
};

export default WindowScrollHandler;
