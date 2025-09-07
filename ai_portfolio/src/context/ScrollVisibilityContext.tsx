'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScrollVisibilityContextType {
  visibleSections: Set<string>;
  setVisibleSections: (sections: Set<string>) => void;
  isVisible: (sectionId: string) => boolean;
}

const ScrollVisibilityContext = createContext<
  ScrollVisibilityContextType | undefined
>(undefined);

interface ScrollVisibilityProviderProps {
  children: ReactNode;
}

export const ScrollVisibilityProvider = ({
  children,
}: ScrollVisibilityProviderProps) => {
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
        visibleSections,
        setVisibleSections,
        isVisible,
      }}
    >
      {children}
    </ScrollVisibilityContext.Provider>
  );
};

// カスタムフック
export const useScrollVisibility = () => {
  const context = useContext(ScrollVisibilityContext);
  if (context === undefined) {
    throw new Error(
      'useScrollVisibility must be used within a ScrollVisibilityProvider'
    );
  }
  return context;
};
