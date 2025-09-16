import {
  JobIntroductionLeftItem,
  JobIntroductionRightItem,
} from '@/types/experience';

/**
 * 職務経歴に関するデータ
 */
export const JOB_INTRODUCTION_LEFT: JobIntroductionLeftItem = {
  jobName: '化粧品メーカー',
  jobPeriod: '2011~2017',
  content: (
    <>
      化粧品メーカーにてネイリスト、ルート営業、OEM営業、企画等様々な経験をさせて頂きました。
      <br />
      接客から営業、企画まで幅広く対応し、コミュニケーションスキルや提案力、企画力を培い教育係としても活躍しました。
      <br />
      一番大変だったのはネイリストとOEM営業で、ネイリスト時代には仕事のノウハウを勉強しながら夜はネイル教室に通い技術を習得しました。
      <br />
      OEM営業では商品の材質や製造工程等広い知識が必要な為、毎日が勉強の日々でした。
      <br />
      また、店舗POPや企画においてillustratorを使用したデザイン制作にも携わりました。
    </>
  ),
};

/**
 * 職務経歴右側のデータ配列
 */
export const JOB_INTRODUCTION_RIGHT: JobIntroductionRightItem[] = [
  {
    jobName: 'ネイリスト',
    jobPeriod: '2011',
    content: '店舗接客にてコミュニケーションスキルを身に着ける',
  },
  {
    jobName: 'ルート営業',
    jobPeriod: '2012~2016',
    content:
      '全国の店舗へ直接出向き、商品の棚卸発注や新商品の紹介、イベント等の企画提案',
  },
  {
    jobName: 'OEM営業',
    content:
      'クライアント企業の要望をヒアリングし、ネイル商材や化粧品関連のオリジナル商品の開発・製造をサポート',
  },
  {
    jobName: '企画',
    jobPeriod: '2015~2017',
    content: '自社製品の企画の担当 illustratorを使用しデザインの制作に携わる',
  },
];
