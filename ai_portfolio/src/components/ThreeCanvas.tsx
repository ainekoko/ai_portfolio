// components/ThreeCanvas.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import ScrollImg from '@/components/templetes/scroll-img';
import ScrollHandler from './ScrollHandler';

// コンポーネントでの使用例
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const ThreeCanvas = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3 } // 30%表示されたらアニメーション開始
    );

    // 監視対象のセクションを取得
    const sections = ['profile', 'projects', 'hello']; // 必要に応じてセクション名を追加
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (sectionId: string) => visibleSections.has(sectionId);

  return (
    <Canvas frameloop='demand'>
      {/* ページ数を増やして全体のコンテンツを含める */}
      <ScrollControls damping={0.5} pages={4}>
        <ScrollHandler setVisibleSections={setVisibleSections} />
        <Scroll>
          <ScrollImg />
        </Scroll>
        <Scroll html>
          {/* 最初のセクション */}
          <div className='absolute top-0 w-screen h-screen'>
            <h1 className='absolute top-[30vh] left-4 text-4xl font-bold'>
              Ai&rsquo;s Portfolio
            </h1>
            <div id='hello' className='absolute top-[125vh] left-[30vw]'>
              <h1
                className={`text-3xl font-bold transition-all duration-1000 ease-out ${
                  isVisible('hello')
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                - Hello -
              </h1>
            </div>
            <p className='absolute top-[145vh] left-[50vw] text-lg w-1 drop-shadow-[0_0_3px_white]'>
              閲覧頂きありがとうございます
            </p>
            <p className='absolute top-[150vh] left-[45vw] text-base w-1 drop-shadow-[0_0_3px_white]'>
              このサイトで少しでも私の事を知って頂けたら幸いです
            </p>
          </div>

          {/* プロフィール */}
          <section
            id='profile'
            className='absolute top-[270vh] w-screen h-screen p-8  mt-8 py-6'
          >
            <div className='flex items-center w-full relative my-10 mx-0'>
              {/* 左側の短い二重線 */}
              <div className='w-16 relative mr-6 overflow-hidden'>
                <div
                  className={`bg-gray-400 transition-all duration-1000 ease-out ${
                    isVisible('profile')
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-full opacity-0'
                  }`}
                  style={{ height: '0.5px' }}
                ></div>
                <div
                  className={`bg-gray-400 mt-1 transition-all duration-1000 ease-out delay-100 ${
                    isVisible('profile')
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-full opacity-0'
                  }`}
                  style={{ height: '0.5px' }}
                ></div>
              </div>
              <h2
                className={`relative px-3 py-5 text-6xl inline-block text-right transition-all duration-1000 ease-out delay-200 ${
                  isVisible('profile')
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <span>Profile</span>
                <span className='jp text-sm ml-2'> / 自己紹介</span>
              </h2>
              {/* 右側の長い二重線 */}
              <div className='flex-1 ml-8 relative overflow-hidden'>
                <div
                  className={`bg-gray-400 transition-all duration-1000 ease-out delay-300 ${
                    isVisible('profile')
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-full opacity-0'
                  }`}
                  style={{ height: '0.5px' }}
                ></div>
                <div
                  className={`bg-gray-400 mt-1 transition-all duration-1000 ease-out delay-400 ${
                    isVisible('profile')
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-full opacity-0'
                  }`}
                  style={{ height: '0.5px' }}
                ></div>
              </div>
            </div>
            <div className='container'>
              <ul className='mx-auto text-base space-y-2 ml-0 w-8/12'>
                <li className='flex border-b border-dotted border-[#bde7c4] pl-5 pb-4'>
                  <span className='w-40'>出身</span>
                  <div className='w-10/12'>群馬県/現在は北海道</div>
                </li>
                <li className='flex border-b border-dotted border-[#bde7c4] pl-5 pb-4'>
                  <span className='w-40'>学歴</span>
                  <div className='w-10/12'>
                    東京国際大学へ入学、1年間オレゴンへ留学
                  </div>
                </li>
                <li className='flex border-b border-dotted border-[#bde7c4] pl-5 pb-4'>
                  <span className='w-40'>自己紹介</span>
                  <div className='w-10/12'>
                    1988年生まれ。
                    東京にて化粧品メーカーに就職。その後、好きな場所でのびのびと仕事がしたいと考える様になりSESへ転職。
                    現在は主人の地元でもある北海道へ移住。
                    子供二人に恵まれ北海道を満喫しながら過ごしています。
                  </div>
                </li>
                <li className='flex border-b border-dotted border-[#bde7c4] pl-5 pb-4'>
                  <span className='w-40'>趣味</span>
                  <ul className='w-10/12'>
                    <li>ゲーム</li>
                    <li>もの作り</li>
                    <li>ファッション</li>
                    <li>ネイル</li>
                  </ul>
                </li>
                <li className='flex border-b border-dotted border-[#bde7c4] pl-5 pb-4'>
                  <span className='w-40'>尊敬する人</span>
                  <ul className='w-10/12'>
                    <li>Shin codeさん</li>
                    <li>コードマフィアさん</li>
                    <div>
                      細かい部分も教授して下さり、youtubeやUdemyで勉強の際本当にお世話になっています！
                    </div>
                  </ul>
                </li>
              </ul>
              <div className='flex flex-wrap justify-center gap-5 my-20 text-base font-medium'>
                <button className='relative h-12 overflow-hidden rounded border border-rose-300 solid bg-white px-5 py-2.5 rose-300 transition-all duration-300 hover:bg-white hover:ring-2 hover:ring-rose-300 hover:ring-offset-2'>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className='mr-2 text-rose-300 text-xl'
                  />
                  <span className='relative'>ai.ebata.contact@gmail.com</span>
                </button>

                <button className='relative h-12 overflow-hidden rounded border border-purple-400 solid bg-white px-5 py-2.5 rose-300 transition-all duration-300 hover:bg-white hover:ring-2 hover:ring-purple-400 hover:ring-offset-2'>
                  <FontAwesomeIcon
                    icon={faGithub}
                    className='mr-2 text-purple-400 text-xl'
                  />
                  <span className='relative'>
                    https://github.com/ainekoko/ai_portfolio
                  </span>
                </button>

                <button className='relative h-12 overflow-hidden rounded border border-indigo-500 solid bg-white px-5 py-2.5 rose-300 transition-all duration-300 hover:bg-white hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2'>
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className='mr-2 text-indigo-500 text-xl'
                  />
                  <span className='relative'>ai.ebata.contact@gmail.com</span>
                </button>
              </div>
              <div className='absolute right-8 top-40 opacity-80'>
                <img
                  src='../assets/images/hokkaido.png'
                  alt='北海道イラスト'
                  className=''
                />
              </div>
            </div>
          </section>

          {/* プロジェクトセクション */}
          <section
            id='projects'
            style={{
              position: 'absolute',
              top: '800vh',
              width: '100vw',
              height: '100vh',
              background: 'linear-gradient(to bottom, #333, #666)',
              padding: '2rem',
            }}
          >
            <h2
              className={`text-white text-4xl mb-4 transition-all duration-1000 ease-out ${
                isVisible('projects')
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              Projects
            </h2>
            <p
              className={`text-white text-xl transition-all duration-1000 ease-out delay-300 ${
                isVisible('projects')
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              プロジェクトの紹介
            </p>
          </section>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};
export default ThreeCanvas;
