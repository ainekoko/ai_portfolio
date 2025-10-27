import React from 'react';

interface NumProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 数字・テキスト表示用コンポーネント
 * Italianaフォントだと数字が読みづらいため、Geistフォントを適用
 *
 * @param children - Number or text to display / 表示する数字またはテキスト
 * @param className - Additional CSS classes / 追加のCSSクラス
 * @example
 * // For numbers / 数字の場合
 * <Num>1988</Num>年生まれ
 * @example
 * // For English text / 英語テキストの場合
 * <Num>Hello World</Num>
 */
const Font: React.FC<NumProps> = ({ children, className = '' }) => {
  return (
    <span className={`font-[family-name:var(--font-geist-sans)] ${className}`}>
      {children}
    </span>
  );
};

export default Font;
