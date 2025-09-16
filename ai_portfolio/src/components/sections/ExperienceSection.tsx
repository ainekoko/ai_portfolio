import { SectionIdProps } from '@/types/component';
import SectionTitle from '../common/SectionHeader';

/**
 * ExperienceSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const ExperienceSection = (props: SectionIdProps) => {
  return (
    <section
      id='experience'
      className='bg-[#ffffff] relative top-[350vh] w-screen h-screen p-8  mt-8 py-7'
    >
      {/* Section Title */}
      <SectionTitle isVisible={props.isVisible} />

      <div className='double-line-header flex items-center w-full relative my-10 mx-0'>
        <h2 className='relative px-3 py-5 text-6xl inline-block text-right'>
          <span>Previous Experience</span>
          <span className='jp text-sm ml-2'> / 今までの仕事の紹介</span>
        </h2>
      </div>
      <div className='container flex justify-left gap-4 flex-wrap justify-between m-auto'>
        {/* 化粧品メーカー左側 */}
        <div className='w-6/12 flex flex-col'>
          <h3 className='text-3xl mb-1 pb-12'>
            化粧品メーカー
            <span className='jp text-sm ml-2'> 2011~2017</span>
          </h3>
          <p className='leading-loose'>
            入社当初はネイリストからの接客スタートでコミュニケーションスキルを身に着けました。
            <br />
            2年目以降、総合営業職となり全国の店舗へ直接出向き商品の発注や紹介、イベントブースを提案しネイル体験コーナー等を店舗の方と企画したり、大手企業の商品をヒアリングからスケジュール調整、見積もり等目まぐるしい毎日ではありましたが貴重な経験をさせて頂きました。
            <br />
            そして企画部へ異動となり、自社の商品企画に携わり企画デザインを100種類プレゼンまでに考えたりと大変な事も多々ありましたが、企画が通った時の達成感は「次も頑張るぞぉ！」と毎日にやりがいを感じられました。
          </p>
        </div>
        {/* 化粧品メーカー右側 */}
        <div className='bg-[#eaf4f4] p-5 mt-3.5 w-5/12 border-double shadow-[0_0_0_15px_#eaf4f4] border-white border-4'>
          <div className='border-b border-gray-200 pb-6'>
            <div className='flex-1 pr-6'>
              {/* 2011 */}
              <div className='text-lg font-bold text-gray-700'>2011</div>
              <div className='pl-10'>
                <span className='text-sm font-medium'> ～ネイリスト～ </span>
                <ul className='mt-3 pl-2.5 space-y-2 text-sm text-gray-600'>
                  <li className='flex items-start'>
                    <span className='w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0'></span>
                    店舗接客にてコミュニケーションスキルを身に着ける
                  </li>
                </ul>
              </div>
              {/* 2012~2016 */}
              <div className='text-lg font-bold text-gray-700'>2012~2016</div>
              <div className='pl-10'>
                <span className='text-sm font-medium'> ～ルート営業～ </span>
                <ul className='mt-3 pl-2.5 space-y-2 text-sm text-gray-600'>
                  <li className='flex items-start'>
                    <span className='w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0'></span>
                    全国の店舗へ直接出向き、商品の棚卸発注や新商品の紹介、イベント等の企画提案
                  </li>
                </ul>
              </div>
              <div className='pl-10'>
                <span className='text-sm font-medium'> ～OEM営業～ </span>
                <ul className='mt-3 pl-2.5 space-y-2 text-sm text-gray-600'>
                  <li className='flex items-start'>
                    <span className='w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0'></span>
                    クライアント企業の要望をヒアリングし、
                    ネイル商材や化粧品関連のオリジナル商品の開発・製造をサポート
                  </li>
                </ul>
              </div>
              {/* 2015~2017 */}
              <div className='text-lg font-bold text-gray-700'>2015~2017</div>
              <div className='pl-10'>
                <span className='text-sm font-medium'> ～企画～ </span>
                <ul className='mt-3 pl-2.5 space-y-2 text-sm text-gray-600'>
                  <li className='flex items-start'>
                    <span className='w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0'></span>
                    自社製品の企画の担当
                    illustratorを使用しデザインの制作に携わる
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute opacity-80 bottom-5 left-10'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='../assets/images/nail_1.png' alt='ネイル' className='' />
      </div>
      <div className='absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 text-[#eaf4f4] text-9xl md:text-[10rem] font-bold whitespace-nowrap pointer-events-none select-none'>
        Previous Experience
      </div>
    </section>
  );
};

export default ExperienceSection;
