import { SectionProps } from '@/types/component';
import SectionHeader from '@/components/common/SectionHeader';
import ExperienceCard from '@/components/experience/ExperienceCard';
import BackgroundScrollText from '@/components/experience/BackgroundScrollText';
import { EXPERIENCE_CARDS } from '@/utils/ExperienceData';

/**
 * ExperienceSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const ExperienceSection = ({ isVisible }: SectionProps) => {
  return (
    <section
      id='experience'
      aria-label='職務経歴'
      className='bg-[#ffffff] relative w-screen pt-16 pb-28'
    >
      {/* Section Title */}
      <SectionHeader
        isVisible={isVisible('experience')}
        title='Experience'
        subtitle='これまでの職務経歴'
      />
      <div className='max-w-[1200px] mx-auto px-10'>
        <div className='lg:text-left text-center text-sm leading-relaxed'>
          <p>私が今までに経験した仕事内容をご紹介いたします。</p>
          <p>
            もしよろしければMoreにて仕事内容の詳細を見て頂けたら嬉しいです。
          </p>
        </div>

        {/* 化粧品メーカー,IT業界 Section */}
        {EXPERIENCE_CARDS.map((card, index) => (
          <ExperienceCard key={index} {...card} />
        ))}
      </div>
      {/* 背景スクロール文字 */}
      <BackgroundScrollText
        text='Nailist'
        position='custom'
        customTop='450px'
      />
      <BackgroundScrollText
        text='Engineer'
        position='custom'
        customTop='650px'
      />
    </section>
  );
};

export default ExperienceSection;
