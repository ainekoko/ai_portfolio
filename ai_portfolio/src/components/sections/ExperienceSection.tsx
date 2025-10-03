import { SectionProps } from '@/types/component';
import SectionHeader from '../common/SectionHeader';
import ExperienceInfoList from '../experience/ExperienceInfoList';
import { JOB_INTRODUCTION_LEFT } from '@/utils/ExperienceData';

/**
 * ExperienceSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const ExperienceSection = ({ isVisible }: SectionProps) => {
  return (
    <section
      id='experience'
      className='bg-[#ffffff] relative top-[340vh] w-screen pb-20 p-8 mt-8 py-6'
    >
      {/* Section Title */}
      <SectionHeader
        isVisible={isVisible('experience')}
        title='Experience'
        subtitle='これまでの職務経歴'
      />
      <div className='max-w-7xl mx-auto px-8 py-16'>
        <div className='flex items-center justify-between mb-20'>
          <h1 className='text-6xl font-light tracking-wide'>
            Previous Experience
          </h1>
          <p className='text-sm sans'>今までの仕事の紹介</p>
        </div>

        <div className='mb-24 sans text-sm leading-relaxed'>
          <p>私が今までに経験した仕事内容をご紹介いたします。</p>
          <p>
            もしろろしければMoreにて仕事内容の詳細を見て頂けたら嬉しいです。
          </p>
        </div>

        {/* 化粧品メーカー Section */}
        <div className='mb-32'>
          <div className='flex items-center mb-8 relative'>
            <h2 className='text-2xl font-light mr-12 whitespace-nowrap'>
              化粧品メーカー
            </h2>
            <span className='text-sm mr-8 whitespace-nowrap'>2011〜2017</span>
            <div className='flex-1 line-divider'></div>
            <a href='#' className='ml-8 text-sm underline hover:no-underline'>
              more_
            </a>
          </div>

          <div className='flex w-full h-[180px] overflow-hidden'>
            <div className='flex-none whitespace-nowrap text-[150px] overflow-hidden text-green-500 animate-loop'>
              Nailist&nbsp;Sales&nbsp;Original Equipment
              Manufacturing&nbsp;Plane&nbsp;
            </div>
            <div className='flex-none whitespace-nowrap text-[150px] overflow-hidden text-red-500 animate-loop2'>
              Nailist&nbsp;Sales&nbsp;Original Equipment
              Manufacturing&nbsp;Plane&nbsp;
            </div>
          </div>
        </div>

        {/* IT業界 Section */}
        <div>
          <div className='flex items-center mb-8 relative'>
            <h2 className='text-2xl font-light mr-12 whitespace-nowrap'>
              IT業界
            </h2>
            <span className='text-sm mr-8 whitespace-nowrap'>2011〜2017</span>
            <div className='flex-1 line-divider'></div>
            <a href='#' className='ml-8 text-sm underline hover:no-underline'>
              more_
            </a>
          </div>

          <div className='flex w-full h-[180px] overflow-hidden'>
            <div className='flex-none whitespace-nowrap text-[150px] overflow-hidden text-green-500 animate-loop'>
              Engineer&nbsp;JavaScript&nbsp;HTML&nbsp;CSS&nbsp;
            </div>
            <div className='flex-none whitespace-nowrap text-[150px] overflow-hidden text-red-500 animate-loop2'>
              Engineer&nbsp;JavaScript&nbsp;HTML&nbsp;CSS&nbsp;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
