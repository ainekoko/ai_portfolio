import React from 'react';
import ContactButtons from '@/components/profile/contactButtons/ContactButtons';
import ProfileInfoTable from '@/components/profile/profileInfoTable/ProfileInfoTable';
import { CONTACT_BUTTONS, PROFILE_DATA } from '@/utils/profileData';
import SectionHeader from '@/components/common/sectionHeader/SectionHeader';
import Huwahuwa_img from '@/components/common/huwahuwaImg/Huwahuwa_img';
import { SectionProps } from '@/types/component';
import FadeInElement from '@/components/common/fadeIn/FadeIn';

/**
 * ProfileSection.tsx
 * プロフィールセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const ProfileSection = ({ isVisible }: SectionProps) => {
  return (
    <section
      id='profile'
      aria-label='プロフィール'
      className='bg-white relative w-full pt-16 pb-28 bg-[url(/assets/images/snow-town.png)] bg-repeat-x bg-bottom bg-size-[auto_200px]'
    >
      {/* 白背景（100px以降） */}
      <div className='absolute top-[100px] left-0 right-0 bottom-0  -z-10' />
      <div className='max-w-[1200px] mx-auto px-4 bg-white'>
        {/* Section Title */}
        <SectionHeader
          isVisible={isVisible('profile')}
          title='Profile'
          subtitle='自己紹介'
        />
        <div className='mb-20'>
          {/* Profile Info Table */}
          <FadeInElement delay={0.5}>
            <ProfileInfoTable profileData={PROFILE_DATA} />
          </FadeInElement>

          {/* Contact Buttons */}
          <ContactButtons contacts={CONTACT_BUTTONS} />
        </div>
      </div>
    </section>
  );
};
export default ProfileSection;
