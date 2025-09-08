'use client';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import ScrollImg from '@/components/templetes/scroll-img';
import * as THREE from 'three';
// コンポーネントでの使用例
import WindowScrollHandler from './WindowScrollHandler';
import ProfileSection from '../sections/ProfileSection';
import TopSection from '../sections/TopSection';

const ThreeCanvas = () => {
  return (
    <>
      <Canvas
        gl={{
          toneMapping: THREE.NoToneMapping, // ここで設定
          toneMappingExposure: 1.0,
        }}
      >
        <ScrollControls pages={10}>
          {/* スクロール位置に応じて表示するタイトルのセクションを制御 */}
          <WindowScrollHandler />
          <Scroll>
            <ScrollImg />
          </Scroll>
          <Scroll html>
            {/* 最初のセクション */}
            <TopSection />
            {/* プロフィール */}
            <ProfileSection />
            {/* メッセージ */}
            <section
              id='message'
              className=' absolute top-[500vh] w-screen h-screen p-8  mt-8 py-6'
            >
              <h2 className='text-[#e5c227] text-center text-lg font-bold mb-3 z-10 relative'>
                Message
              </h2>
              <p className='w-[800px] text-center text-base leading-relaxed z-10 relative m-auto'>
                初めまして。AIです(^^)/
                <br />
                新卒で入社した化粧品メーカーでは、様々な経験をさせて頂きネイル商材のデザイン企画や大手企業の商品をともに作れるというやりがい、
                時には被災地へ赴き子供から大人までネイルを無料で体験するコーナーを設けたり等、様々な経験をさせて頂きました。
                <br />
                IT業界に興味を持ったきっかけは、自社商品を＠コスメにて紹介して頂いた所、看板商品になるまでに大きな反響がありました。
                <br />
                それからもっと自社を大きくするにはネットが不可欠ではないか？今後もっとネット社会になっていくのでは？と思ったのがきっかけでした。
                <br />
                ですが、当時会社ではWEBに力を入れておらず、必要最低限のHPしか作成されていませんでした。
                <br />
                今後もWEBは外注に任せるとの事だったので、自分でHPに携わりたいと言う気持ちが大きくなりIT業界へ飛び込みました。
                <br />
                当初は手探りで毎日勉強しても追いつかないくらいで半泣き状態でしたが、
                家で過ごす時間も増え北海道への移住も叶い子供達も伸び伸びと過ごしている毎日にIT業界に転職して本当良かったなぁと思っています。
              </p>
            </section>
            {/* Previous Experience */}
            <section
              id='experience'
              className='absolute top-[600vh] w-screen h-screen p-8  mt-8 py-6'
            >
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
                      <div className='text-lg font-bold text-gray-700'>
                        2011
                      </div>
                      <div className='pl-10'>
                        <span className='text-sm font-medium'>
                          {' '}
                          ～ネイリスト～{' '}
                        </span>
                        <ul className='mt-3 pl-2.5 space-y-2 text-sm text-gray-600'>
                          <li className='flex items-start'>
                            <span className='w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0'></span>
                            店舗接客にてコミュニケーションスキルを身に着ける
                          </li>
                        </ul>
                      </div>
                      {/* 2012~2016 */}
                      <div className='text-lg font-bold text-gray-700'>
                        2012~2016
                      </div>
                      <div className='pl-10'>
                        <span className='text-sm font-medium'>
                          {' '}
                          ～ルート営業～{' '}
                        </span>
                        <ul className='mt-3 pl-2.5 space-y-2 text-sm text-gray-600'>
                          <li className='flex items-start'>
                            <span className='w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0'></span>
                            全国の店舗へ直接出向き、商品の棚卸発注や新商品の紹介、イベント等の企画提案
                          </li>
                        </ul>
                      </div>
                      <div className='pl-10'>
                        <span className='text-sm font-medium'>
                          {' '}
                          ～OEM営業～{' '}
                        </span>
                        <ul className='mt-3 pl-2.5 space-y-2 text-sm text-gray-600'>
                          <li className='flex items-start'>
                            <span className='w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0'></span>
                            クライアント企業の要望をヒアリングし、
                            ネイル商材や化粧品関連のオリジナル商品の開発・製造をサポート
                          </li>
                        </ul>
                      </div>
                      {/* 2015~2017 */}
                      <div className='text-lg font-bold text-gray-700'>
                        2015~2017
                      </div>
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
                <img
                  src='../assets/images/nail_1.png'
                  alt='ネイル'
                  className=''
                />
              </div>
              <div className='absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 text-[#eaf4f4] text-9xl md:text-[10rem] font-bold whitespace-nowrap pointer-events-none select-none'>
                Previous Experience
              </div>
            </section>
            {/* IT */}
            <section
              id='it'
              className='bg-[url(/assets/images/bg_flower_right.png)] absolute top-[600vh] w-screen h-screen p-8  mt-8 py-6'
            >
              <div className='double-line-header flex items-center w-full relative my-10 mx-0'></div>
              <div className='container flex justify-left gap-4 flex-wrap justify-between m-auto'>
                {/* IT左側 */}
                <div className='w-6/12 flex flex-col'>
                  <h3 className='text-3xl mb-1 pb-12'>
                    IT業界<span className='jp text-sm ml-2'> 2018</span>
                  </h3>
                  <p className='leading-loose'>
                    ただIT業界と言っても右も左も分からない状態； <br />
                    なので一先ずスクールに通い友達のネイルサイトを作成し、転職活動に挑みました！
                    <br />
                    有り難いことに拾って頂きSESとして未熟な私にも様々な現場で経験が出来、本当に感謝をしています。
                    <br />
                    契約の関係上、作成したサイトは転載する事が出来ませんがその現場での業務を記載しましたので見て頂けると幸いです。　
                  </p>
                </div>
                {/* IT右側 */}
                <div className='z-10 bg-white p-5 mt-3.5 w-5/12 border-double shadow-[0_0_0_15px_#eaf4f4] border-[#a0b4b4] border-4'>
                  {/* shoppingサイト */}
                  <div className='max-w-2xl mx-auto bg-white'>
                    <table className='w-full'>
                      <thead>
                        <tr>
                          <th className='p-4 text-lg text-center jp'>
                            ショッピングサイト
                          </th>
                        </tr>
                      </thead>
                      <tbody className='text-sm'>
                        <tr>
                          <td className='p-6'>
                            <div className='space-y-1.5 jp'>
                              <div className='flex items-start'>
                                <span className='mr-2'>◆</span>
                                <span className='mr-8'>参画期間</span>
                                <span>自社/出社/3か月</span>
                              </div>

                              <div className='flex items-start'>
                                <span className='mr-2'>◆</span>
                                <span className='mr-16'>規模</span>
                                <span>ディレクター1名、FE5名</span>
                              </div>

                              <div className='flex items-start'>
                                <span className='mr-2'>◆</span>
                                <span className='mr-6'>担当フェーズ</span>
                                <span>開発</span>
                              </div>

                              <div>
                                <div className='flex items-start mb-2'>
                                  <span className='text-black mr-2'>◆</span>
                                  <span className='font-semibold'>
                                    業務内容
                                  </span>
                                </div>
                                <div className='ml-6'>
                                  <span className='text-black mr-2'>•</span>
                                  <span>会員ページの改修作業</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>

                        {/* 開発環境セクション */}
                        <tr>
                          <td className='px-6 py-4'>
                            <div className='border-t-2 border-dashed border-gray-400 pt-4'>
                              <h3 className='font-bold text-lg mb-4 jp'>
                                開発環境
                              </h3>
                              <div className='space-y-1.5 jp'>
                                <div>
                                  <span className='font-semibold'>
                                    【言語】
                                  </span>
                                  <span className='ml-2'>HTML/CSS/PHP</span>
                                </div>
                                <div>
                                  <span className='font-semibold'>【OS】</span>
                                  <span className='ml-4'>Windows</span>
                                </div>
                                <div>
                                  <span className='font-semibold'>【FW】</span>
                                  <span className='ml-4'>Laravel</span>
                                </div>
                                <div>
                                  <span className='font-semibold'>
                                    【ツール】
                                  </span>
                                  <span className='ml-2'>Chatwork/GitHub</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>

                        {/* 説明文セクション */}
                        <tr>
                          <td className='p-6'>
                            <p className='leading-relaxed jp'>
                              初の実務だった為、まずは先輩方から基本作法を学びながらページの改修作業を行いました。
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='absolute opacity-80 bottom-5 left-10'>
                <img
                  src='../assets/images/nail_1.png'
                  alt='ネイル'
                  className=''
                />
              </div>
              <div className='absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 text-[#eaf4f4] text-9xl md:text-[10rem] font-bold whitespace-nowrap pointer-events-none select-none'>
                Previous Experience
              </div>
            </section>
            {/* スキル */}
            <section
              id='skill'
              className='bg-[#f8fdfa] absolute top-[700vh] w-screen h-screen p-8  mt-8 py-6'
            >
              <div className='double-line-header flex items-center justify-end w-full relative my-10 mx-0'>
                <h2 className='relative px-3 py-5 text-6xl inline-block text-right'>
                  <span>Skill</span>
                  <span className='jp text-sm ml-2'>
                    / 現場で経験したスキルを一覧化しました
                  </span>
                </h2>
              </div>
              <div className='container flex'>
                {/*-- プログラミング言語 -*/}
                <div id='programmingLanguage' className='w-1/2'>
                  <p>Programing Language</p>
                  <ul className='flex flex-wrap justify-start pt-10 gap-5 mb-4 text-base font-medium'>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-html.svg'
                        alt='HTML5'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>HTML5</p>
                      <p className='text-sm text-gray-500'>8 years</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-css.svg'
                        alt='CSS'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>CSS</p>
                      <p className='text-sm text-gray-500'>8 years</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-js.svg'
                        alt='JavaScript'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>JavaScript</p>
                      <p className='text-sm text-gray-500'>6 years</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-ts.svg'
                        alt='TypeScript'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>TypeScript</p>
                      <p className='text-sm text-gray-500'>4 years</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-php.svg'
                        alt='PHP'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>PHP</p>
                      <p className='text-sm text-gray-500'>1 years</p>
                    </li>
                  </ul>
                </div>
                {/*-- CMS -*/}
                <div id='cms' className='w-1/2'>
                  <p>CMS</p>
                  <ul className='flex flex-wrap justify-start gap-5 mb-4 pt-10 text-base font-medium'>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-wp.svg'
                        alt='WordPress'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>WordPress</p>
                      <p className='text-sm text-gray-500'>2 years</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='container flex'>
                {/*-- Framework -*/}
                <div id='framework' className='w-1/2'>
                  <p>Framework</p>
                  <ul className='flex flex-wrap justify-start pt-10 gap-5 mb-4 text-base font-medium'>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-nextjs.svg'
                        alt='Next.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Next.js</p>
                      <p className='text-sm text-gray-500'>1 years 6 months</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-vue.svg'
                        alt='Vue.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Vue.js</p>
                      <p className='text-sm text-gray-500'>2 years</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/laravel.svg'
                        alt='Laravel'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Laravel</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-bootstrap.svg'
                        alt='BootStrap'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>BootStrap</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/jest.svg'
                        alt='Jest'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Jest</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                  </ul>
                </div>
                {/*-- Library -*/}
                <div id='library' className='w-1/2'>
                  <p>Library</p>
                  <ul className='flex flex-wrap justify-start pt-10 gap-5 mb-4 text-base font-medium'>
                    <li className='text-center'>
                      <img
                        src='../assets/images/d3.svg'
                        alt='D3.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>D3.js</p>
                      <p className='text-sm text-gray-500'>2 years</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/three.js.svg'
                        alt='Three.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Three.js</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-react-native.svg'
                        alt='React'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>React</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      <img
                        src='../assets/images/icons8-jquery.svg'
                        alt='jQuery'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>jQuery</p>
                      <p className='text-sm text-gray-500'>2 months</p>
                    </li>
                  </ul>
                </div>
              </div>
              {/*-- Accordion -*/}
              <div className='container mx-auto space-y-2'>
                <details className='accordion-003 mb-2 border-b-2 border-gray-300'>
                  <summary className='flex justify-between items-center relative px-8 py-4 text-gray-800 font-semibold cursor-pointer'>
                    その他
                  </summary>
                  <div className='container flex border-t-[0.5px] border-gray-400'>
                    {/*-- another -*/}
                    <div id='another' className=''>
                      <ul className='flex flex-wrap justify-start pt-10 gap-5 mb-4 text-base font-medium'>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-adobe-xd.svg'
                            alt='Adobe XD'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Adobe XD</p>
                          <p className='text-sm text-gray-500'>3 years</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-adobe-illustrator.svg'
                            alt='Adobe Illustrator'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Adobe Illustrator</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-adobe-photoshop.svg'
                            alt='Adobe Photoshop'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Adobe Photoshop</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-figma.svg'
                            alt='Figma'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Figma</p>
                          <p className='text-sm text-gray-500'>6 months</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-visual-studio.png'
                            alt='Visual Studio'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Visual Studio</p>
                          <p className='text-sm text-gray-500'>6 months</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/flourish.png'
                            alt='Flourish'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Flourish</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-storybook.svg'
                            alt='Storybook'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Storybook</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-github.svg'
                            alt='GitHub'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>GitHub</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-gitlab.svg'
                            alt='GitLab'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>GitLab</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-sass.svg'
                            alt='Sass'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Sass</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-firebase.svg'
                            alt='Firebase'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Firebase</p>
                          <p className='text-sm text-gray-500'>6 months</p>
                        </li>
                        <li className='text-center'>
                          <img
                            src='../assets/images/icons8-docker.svg'
                            alt='Docker'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Docker</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>
              </div>
              {/*-- 設計書関連 -*/}
              <div className='container bg-white p-8 rounded-lg shadow-sm'>
                <h2 className='text-xl font-bold text-gray-800 mb-6'>
                  設計書関連
                </h2>

                <ul className='space-y-4 list-none pl-0'>
                  <li className='relative pl-6'>
                    <span className='absolute left-0 top-1 text-gray-600'>
                      -
                    </span>
                    <div>
                      <span className='text-gray-800 font-medium'>
                        要件概要書
                      </span>
                      <span className='text-gray-600 ml-2'>
                        （QAの資料作成等）
                      </span>
                    </div>
                  </li>

                  <li className='relative pl-6'>
                    <span className='absolute left-0 top-1 text-gray-600'>
                      -
                    </span>
                    <div>
                      <span className='text-gray-800 font-medium'>
                        基本設計書
                      </span>
                      <span className='text-gray-600 ml-2'>
                        （機能書、業務フロー図、外部設計書、WF図）
                      </span>
                    </div>
                  </li>

                  <li className='relative pl-6'>
                    <span className='absolute left-0 top-1 text-gray-600'>
                      -
                    </span>
                    <div>
                      <span className='text-gray-800 font-medium'>
                        詳細設計書
                      </span>
                      <span className='text-gray-600 ml-2'>
                        （画面遷移図、APIとの整合性確認、内部設計書、テストケースなど）
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            {/* message*/}
            <div className='relative'>
              <img
                src='../assets/images/wave_1.svg'
                alt='背景の波線1'
                className='bg-[#f8fdfa]'
              />
              <img
                src='../assets/images/wave_2.svg'
                alt='背景の波線2'
                className='bg-[#7DFFE1]'
              />
            </div>
            <section
              id='contact'
              className='absolute top-[850vh] w-screen h-screen p-8  mt-8 py-6 bg-[#C1FFEA]'
            >
              <div className='double-line-header flex items-center justify-end w-full relative py-10 mx-0'>
                <h2 className='relative px-3 py-5 text-6xl inline-block text-right'>
                  <span>Contact</span>
                  <span className='jp text-sm ml-2'>
                    / ご質問がありましたらお気軽にご連絡ください
                  </span>
                </h2>
              </div>

              <div className='bg-[#C1FFEA] container px-80'>
                <form className='flex flex-col gap-3 mx-auto py-4'>
                  <label htmlFor='name' className='text-[#348a58] text-sm'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    required
                    className='border border-[#bde7c4] rounded px-3 py-2 text-base'
                  />
                  <label htmlFor='email' className='text-[#348a58] text-sm'>
                    Mail Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='border border-[#bde7c4] rounded px-3 py-2 text-base'
                  />
                  <label htmlFor='message' className='text-[#348a58] text-sm'>
                    comment
                  </label>
                  <textarea
                    id='contactMessage'
                    name='message'
                    rows='4'
                    required
                    className='border border-[#bde7c4] rounded px-3 py-2 text-base'
                  ></textarea>
                  <button className='bg-green-700/50 hover:bg-green-700/20 text-white font-semibold py-3 px-6 rounded-xl backdrop-blur-md border border-white/30 transform transition-all duration-300 ease-out hover:scale-95 hover:translate-y-1 shadow-lg hover:shadow-md'>
                    送信
                  </button>
                </form>
              </div>
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};
export default ThreeCanvas;
