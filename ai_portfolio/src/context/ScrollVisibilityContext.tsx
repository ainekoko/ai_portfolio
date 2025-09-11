'use client';
import React, { createContext, useContext, useState } from 'react';
import {
  ScrollVisibilityContextType,
  ScrollVisibilityProviderProps,
} from '@/types/context';

const ScrollVisibilityContext = createContext<
  ScrollVisibilityContextType | undefined
>(undefined);

export const ScrollVisibilityProvider = ({
  children,
}: ScrollVisibilityProviderProps) => {
  /* 表示されているセクションのIDを格納するSet ['Hello', 'Profile'...ets] */
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  /**
   * セクションの表示状態を判定
   * @param sectionId - セクションのID{"hello", "profile"...}
   * @returns セクションが表示されているかどうか真偽値
   */
  const isVisible = (sectionId: string) => visibleSections.has(sectionId);
  return (
    <ScrollVisibilityContext.Provider
      value={{
        visibleSections, // 現在表示中のセクション一覧
        setVisibleSections, // セクション一覧を更新する関数
        isVisible, // セクションの表示判定を行う関数
      }}
    >
      {children}
    </ScrollVisibilityContext.Provider>
  );
};

/* コンテキストを利用するためのカスタムフック */
export const useScrollVisibility = () => {
  const context = useContext(ScrollVisibilityContext);
  if (context === undefined) {
    throw new Error(
      'useScrollVisibility must be used within a ScrollVisibilityProvider'
    );
  }
  return context;
};
