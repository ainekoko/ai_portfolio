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
      <div className='px-8 pb-10'>
        <div className='mb-15 text-sm leading-relaxed'>
          <p>私が今までに経験した仕事内容をご紹介いたします。</p>
          <p>
            もしろろしければMoreにて仕事内容の詳細を見て頂けたら嬉しいです。
          </p>
        </div>

        {/* 化粧品メーカー Section */}
        <div className=''>
          <div className=' relative'>
            <div className='flex items-center'>
              <h2 className='text-2xl font-light mr-12 whitespace-nowrap'>
                化粧品メーカー
              </h2>
              <span className='text-sm mr-8 whitespace-nowrap'>2011〜2017</span>

              {/* More Link with Arrow Animation */}
              <a
                href='/cosmetics'
                className='ml-auto text-sm underline hover:no-underline group relative inline-flex items-center gap-1'
              >
                <span>more</span>
              </a>
            </div>

            {/* 横線を下に配置し、右端に矢印 */}
            <div className='mt-4 relative h-[1px] bg-gray-300'>
              {/* 右端の矢印 */}
              <div className='absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-t border-gray-300 rotate-45'></div>
            </div>
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
          <div className=' relative'>
            <div className='flex items-center'>
              <h2 className='text-2xl font-light mr-12 whitespace-nowrap'>
                IT業界
              </h2>
              <span className='text-sm mr-8 whitespace-nowrap'>2011〜2017</span>

              {/* More Link with Arrow Animation */}
              <a
                href='#'
                className='ml-auto text-sm underline hover:no-underline group relative inline-flex items-center gap-1'
              >
                <span>more</span>
              </a>
            </div>

            {/* 横線を下に配置し、右端に矢印 */}
            <div className='mt-4 relative h-[1px] bg-gray-300'>
              {/* 右端の矢印 */}
              <div className='absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-t border-gray-300 rotate-45'></div>
            </div>
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
