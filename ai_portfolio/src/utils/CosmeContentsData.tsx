/* 化粧品データ定義 */
interface CosmeContent {
  title: string;
  color: string;
  year: string;
  description: string;
}
export const COSME_CONTENTS: CosmeContent[] = [
  {
    title: 'ネイリスト',
    color: '#ff6b9d',
    year: '2011',
    description: '店舗接客にてコミュニケーションスキルを身に着ける',
  },
  {
    title: 'ルート営業',
    color: '#c44569',
    year: '2012~2016',
    description: '全国の店舗へ直接出向き、商品の棚卸発注や新商品の紹介',
  },
  {
    title: 'OEM営業',
    color: '#6a5acd',
    year: '2015~2017',
    description: 'オリジナル商品の開発・製造をサポート',
  },
  {
    title: 'フロントエンドエンジニア',
    color: '#4682b4',
    year: '2018~2020',
    description: 'HTML/CSS/PHP/Laravelを使用した開発',
  },
  {
    title: 'システムエンジニア',
    color: '#20b2aa',
    year: '2020~2024',
    description: 'Vue.js/TypeScript/Jestを使用した大規模開発',
  },
];
