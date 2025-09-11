import { ReactNode } from 'react';

/* スクロールに応じたセクションの表示状態を管理するコンテキストの型定義 */
export interface ScrollVisibilityContextType {
  /* 現在表示されているセクションのIDを格納するSet */
  visibleSections: Set<string>;
  setVisibleSections: (sections: Set<string>) => void;
  /* セクションの表示判定関数 */
  isVisible: (sectionId: string) => boolean;
}

/* プロバイダーのプロパティの型定義 */
export interface ScrollVisibilityProviderProps {
  children: ReactNode;
}
