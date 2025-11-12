import { SectionProps } from '@/types/component';
import SectionHeader from '@/components/common/SectionHeader';
import ExperienceCard from '@/components/experience/ExperienceCard';
import BackgroundScrollText from '@/components/experience/BackgroundScrollText';

/**
 * ExperienceSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const ExperienceSection = ({ isVisible }: SectionProps) => {
  return (
    <section
      id='experience'
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
        {/* 化粧品メーカー Section */}
        <ExperienceCard
          title='化粧品メーカー'
          period='2011〜2017'
          description='約6年間様々な経験をさせて頂き接客から営業、企画まで幅広く対応し、コミュニケーションスキルや提案力、企画力を培いました。'
          link='/cosmetics'
        />
        {/* IT業界 Section */}
        <ExperienceCard
          title='IT業界'
          period='2017〜2024'
          description='ただIT業界と言っても右も左も分からない状態；なのでスクールに通い友達のサイトを作成し、転職活動に挑みました！有り難いことに拾って頂きSESとして未熟な私にも様々な現場で経験が出来、本当に感謝をしています。契約の関係上、作成したサイトは転載する事が出来ませんが6年間で経験した現場での業務を記載しましたので見て頂けると幸いです。'
          link='/ses'
        />
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
      {/* <BackgroundScrollText text='Nailist' />
      <BackgroundScrollText text='Engineer' /> */}
    </section>
  );
};

export default ExperienceSection;
