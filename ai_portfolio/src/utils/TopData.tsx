export type backImg = {
  /** 画像のソースパス */
  src: string;
  /** 画像の代替テキスト */
  alt: string;
  /** 画像の幅 */
  width: number;
  /** 画像の高さ */
  height: number;
};

/**
 * トップセクションの背景画像データ配列
 * 各オブジェクトは画像のソースパス、代替テキスト、幅、高さを含む
 * @example
 * {
 *   src: '/assets/images/top_1.png',
 *   alt: '長女',
 *   width: 450,
 *   height: 500,
 * }
 */
export const BACK_IMG: backImg[] = [
  {
    src: '/assets/images/top_1.png',
    alt: '女の子１',
    width: 450,
    height: 500,
  },
  {
    src: '/assets/images/top_2.jpg',
    alt: '女の子２',
    width: 550,
    height: 400,
  },
  {
    src: '/assets/images/top_3.jpg',
    alt: '公園',
    width: 300,
    height: 400,
  },
  {
    src: '/assets/images/top_4.png',
    alt: '花壁',
    width: 200,
    height: 400,
  },
  {
    src: '/assets/images/top_5.jpg',
    alt: 'ネイル',
    width: 250,
    height: 200,
  },
];
