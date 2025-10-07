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
        <div className='text-sm leading-relaxed'>
          <p>私が今までに経験した仕事内容をご紹介いたします。</p>
          <p>
            もしよろしければMoreにて仕事内容の詳細を見て頂けたら嬉しいです。
          </p>
        </div>
        {/* 化粧品メーカー Section */}
        <div className='mt-10'>
          <div className=' relative'>
            <div className='flex items-center'>
              <h2 className='text-2xl font-light mr-12 whitespace-nowrap'>
                化粧品メーカー
              </h2>
              <span className='text-sm mr-8 whitespace-nowrap'>2011〜2017</span>
            </div>
            <p className='py-5 px-10'>
              約6年間様々な経験をさせて頂き接客から営業、企画まで幅広く対応し、コミュニケーションスキルや提案力、企画力を培いました。
            </p>
            {/* More */}
            <div className='flex justify-end'>
              <a href='#' className='inline-flex items-center gap-4 group'>
                <span className='text-xl font-light text-gray-600 group-hover:text-gray-900 transition-colors duration-300'>
                  more
                </span>
                <div className='relative w-32'>
                  <div className='absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-400 w-6 origin-left group-hover:w-28 group-hover:bg-gray-900 transition-all duration-600 ease-out'></div>
                  <div className='absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-t border-gray-400 rotate-45 group-hover:border-gray-900 group-hover:scale-110 group-hover:left-28 transition-all duration-600 ease-out ml-[-1px]'></div>
                </div>
              </a>
            </div>
            <div className='flex w-full h-[180px] overflow-hidden'>
              <div className='flex-none whitespace-nowrap text-[150px] overflow-hidden text-gray-400 animate-loop'>
                Nailist&nbsp;Sales&nbsp;Original Equipment
                Manufacturing&nbsp;Plane&nbsp;
              </div>
              <div className='flex-none whitespace-nowrap text-[150px] overflow-hidden text-gray-200 animate-loop2'>
                Nailist&nbsp;Sales&nbsp;Original Equipment
                Manufacturing&nbsp;Plane&nbsp;
              </div>
            </div>
          </div>
        </div>
        {/* IT業界 Section */}
        <div className='mt-10'>
          <div className=' relative'>
            <div className='flex items-center'>
              <h2 className='text-2xl font-light mr-12 whitespace-nowrap'>
                IT業界
              </h2>
              <span className='text-sm mr-8 whitespace-nowrap'>2011〜2017</span>
            </div>
            <p className='py-5 px-10'>
              ただIT業界と言っても右も左も分からない状態；
              <br />
              なのでスクールに通い友達のサイトを作成し、転職活動に挑みました！
              <br />
              有り難いことに拾って頂きSESとして未熟な私にも様々な現場で経験が出来、本当に感謝をしています。
              <br />
              契約の関係上、作成したサイトは転載する事が出来ませんが6年間で経験した現場での業務を記載しましたので見て頂けると幸いです。　
            </p>
            {/* More */}
            <div className='flex justify-end'>
              <a href='#' className='inline-flex items-center gap-4 group'>
                <span className='text-xl font-light text-gray-600 group-hover:text-gray-900 transition-colors duration-300'>
                  more
                </span>
                <div className='relative w-32'>
                  <div className='absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-400 w-6 origin-left group-hover:w-28 group-hover:bg-gray-900 transition-all duration-600 ease-out'></div>
                  <div className='absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-t border-gray-400 rotate-45 group-hover:border-gray-900 group-hover:scale-110 group-hover:left-28 transition-all duration-600 ease-out ml-[-1px]'></div>
                </div>
              </a>
            </div>
          </div>

          <div className='flex w-full h-[180px] overflow-hidden'>
            <div className='flex-none whitespace-nowrap text-[150px] overflow-hidden text-gray-400 animate-loop'>
              Engineer&nbsp;JavaScript&nbsp;HTML&nbsp;CSS&nbsp;
            </div>
            <div className='flex-none whitespace-nowrap text-[150px] overflow-hidden text-gray-500 animate-loop2'>
              Engineer&nbsp;JavaScript&nbsp;HTML&nbsp;CSS&nbsp;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
