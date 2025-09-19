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
import SkillSection from '../sections/SkillSection';

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
            <ItSection />
            {/* スキル */}
            <SkillSection isVisible={isVisible} />
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
