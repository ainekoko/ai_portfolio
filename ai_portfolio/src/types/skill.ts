/**
 * スキルセット
 * @interface SkillItemList
 * @property {Array} programmingLanguage
 * @property {Array} cms
 * @property {Array} framework
 * @property {Array} Library
 * @property {Array} another - その他のスキル.
 * @example
 */
export interface SkillItemListType {
  programmingLanguage: SkillItemType[];
  cms: SkillItemType[];
  framework: SkillItemType[];
  Library: SkillItemType[];
  another: SkillItemType[];
}

export interface SkillItemType {
  label: string;
  img: string;
  year: number;
}

/**
 * スキルアイテムの配列型（コンポーネントで使用）
 */
export type SkillItemsType = SkillItemType[];
