/**
 * @param isVisible - 指定id表示されているかどうか
 * @type boolean
 */
export interface SectionIdProps {
  isVisible: boolean;
}
/**
 * @param isVisible - セクションが表示されているかどうかを判定する関数
 */
export interface SectionProps {
  isVisible: (sectionId: string) => boolean;
}

/**
 * セクションタイトルコンポーネントのプロパティ
 */
export interface SectionTitleProps {
  isVisible: boolean;
  title: string;
  subtitle?: string;
}
