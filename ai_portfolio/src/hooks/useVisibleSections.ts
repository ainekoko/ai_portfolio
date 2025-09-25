'use client';
import { useState } from 'react';

/** セクションの表示状態を管理するカスタムフック */
export const useVisibleSections = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  /**
   * セクションの表示状態を判定
   * @param sectionId - セクションのID{"hello", "profile"...}
   * @returns セクションが表示されているかどうか真偽値
   */
  const isVisible = (sectionId: string) => visibleSections.has(sectionId);
  console.log('カスタムフック', visibleSections);
  return {
    visibleSections,
    setVisibleSections,
    isVisible,
  };
};
