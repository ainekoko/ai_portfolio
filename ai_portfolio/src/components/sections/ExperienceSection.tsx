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
      <div className='container  text-sm flex justify-left gap-4 flex-wrap justify-between m-auto'>
        {/* 化粧品メーカー左側 */}
        <div className='w-6/12 flex flex-col'>
          <h3 className='text-3xl mb-1 pb-12'>
            {JOB_INTRODUCTION_LEFT.jobName}
            <span className='jp text-sm ml-2'>
              {JOB_INTRODUCTION_LEFT.jobPeriod}
            </span>
          </h3>
          <p className='leading-loose '>{JOB_INTRODUCTION_LEFT.content}</p>
        </div>
        {/* 化粧品メーカー右側 */}
        <div className='bg-[#eaf4f4] z-10 p-5 mt-3.5 w-5/12 border-double shadow-[0_0_0_15px_#eaf4f4] border-white border-4'>
          <div className='border-b border-gray-200 pb-6'>
            {/* Experience Info List */}
            <ExperienceInfoList />
          </div>
        </div>
      </div>
      <div className='absolute opacity-80 bottom-5 left-10'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='../assets/images/nail_1.png' alt='ネイル' className='' />
      </div>
      <div className='absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 text-[#7b9696] text-9xl md:text-[10rem] font-bold whitespace-nowrap pointer-events-none select-none z-0'>
        NAIL
      </div>
    </section>
  );
};

export default ExperienceSection;
