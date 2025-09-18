'use client';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import ScrollImg from '@/components/templetes/scroll-img';
import * as THREE from 'three';
import WindowScrollHandler from './WindowScrollHandler';
import ProfileSection from '../sections/ProfileSection';
import TopSection from '../sections/TopSection';
import MessageSection from '../sections/Message';
import ExperienceSection from '../sections/ExperienceSection';
import { useVisibleSections } from '@/hooks';
import ItSection from '../sections/ItSection';

const ThreeCanvas = () => {
  const { setVisibleSections, isVisible } = useVisibleSections();

  return (
    <>
      <Canvas
        gl={{
          toneMapping: THREE.NoToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <ScrollControls pages={10.7} damping={0.5}>
          <WindowScrollHandler setVisibleSections={setVisibleSections} />
          <ScrollImg />

          <Scroll html>
            {/* 最初のsection */}
            <TopSection isVisible={isVisible('hello')} />
            {/* プロフィールsection */}
            <ProfileSection isVisible={isVisible} />
            {/* メッセージsection */}
            <MessageSection />
            {/* Previous Experience */}
            <ExperienceSection isVisible={isVisible} />
            {/* IT */}
            <ItSection isVisible={isVisible} />
            {/* スキル */}
            <section
              id='skill'
              className='bg-[#f8fdfa] relative top-[360vh] w-screen h-screen p-8  mt-8 py-6'
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-html.svg'
                        alt='HTML5'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>HTML5</p>
                      <p className='text-sm text-gray-500'>8 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-css.svg'
                        alt='CSS'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>CSS</p>
                      <p className='text-sm text-gray-500'>8 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-js.svg'
                        alt='JavaScript'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>JavaScript</p>
                      <p className='text-sm text-gray-500'>6 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-ts.svg'
                        alt='TypeScript'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>TypeScript</p>
                      <p className='text-sm text-gray-500'>4 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-nextjs.svg'
                        alt='Next.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Next.js</p>
                      <p className='text-sm text-gray-500'>1 years 6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-vue.svg'
                        alt='Vue.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Vue.js</p>
                      <p className='text-sm text-gray-500'>2 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/laravel.svg'
                        alt='Laravel'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Laravel</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-bootstrap.svg'
                        alt='BootStrap'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>BootStrap</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/d3.svg'
                        alt='D3.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>D3.js</p>
                      <p className='text-sm text-gray-500'>2 years</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/three.js.svg'
                        alt='Three.js'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>Three.js</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='../assets/images/icons8-react-native.svg'
                        alt='React'
                        className='text-xl w-18 h-18 inline-block pb-2.5'
                      />
                      <p>React</p>
                      <p className='text-sm text-gray-500'>6 months</p>
                    </li>
                    <li className='text-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-adobe-xd.svg'
                            alt='Adobe XD'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Adobe XD</p>
                          <p className='text-sm text-gray-500'>3 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-adobe-illustrator.svg'
                            alt='Adobe Illustrator'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Adobe Illustrator</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-adobe-photoshop.svg'
                            alt='Adobe Photoshop'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Adobe Photoshop</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-figma.svg'
                            alt='Figma'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Figma</p>
                          <p className='text-sm text-gray-500'>6 months</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-visual-studio.png'
                            alt='Visual Studio'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Visual Studio</p>
                          <p className='text-sm text-gray-500'>6 months</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/flourish.png'
                            alt='Flourish'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Flourish</p>
                          <p className='text-sm text-gray-500'>1 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-storybook.svg'
                            alt='Storybook'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Storybook</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-github.svg'
                            alt='GitHub'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>GitHub</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-gitlab.svg'
                            alt='GitLab'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>GitLab</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-sass.svg'
                            alt='Sass'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Sass</p>
                          <p className='text-sm text-gray-500'>2 years</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src='../assets/images/icons8-firebase.svg'
                            alt='Firebase'
                            className='text-xl w-18 h-18 inline-block pb-2.5'
                          />
                          <p>Firebase</p>
                          <p className='text-sm text-gray-500'>6 months</p>
                        </li>
                        <li className='text-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
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
            {/* <div className='relative'>
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
            </div> */}
            <section
              id='contact'
              className='relative top-[380vh] w-screen h-screen p-8  mt-8 py-6 bg-[#C1FFEA]'
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
                    rows={4}
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
