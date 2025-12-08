// src/types/profile.ts
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

//ContactButton-----------------------------------------------------------

/**
 * カラータイプの定義
 * 'rose-300', 'purple-400', 'pink-400', 'indigo-500'のいずれか
 */
export type ColorType = 'rose-300' | 'purple-400' | 'pink-400' | 'indigo-500';

/**
 * 連絡先情報の定義
 * @param icon - FontAwesomeのアイコン定義
 * @param text - ボタンに表示する短いテキスト
 * @param fullText - フルテキスト（例：メールアドレスやURL）
 * @param color - ボタンのカラータイプ
 * @param href - 連絡先のリンクURL
 */
export type Contact = {
  icon: IconDefinition;
  text: string;
  fullText: string;
  color: ColorType;
  href: string;
};
