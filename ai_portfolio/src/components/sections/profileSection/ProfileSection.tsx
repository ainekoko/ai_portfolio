import React from 'react';
import ContactButtons from '@/components/profile/contactButtons/ContactButtons';
import ProfileInfoTable from '@/components/profile/profileInfoTable/ProfileInfoTable';
import { CONTACT_BUTTONS, PROFILE_DATA } from '@/utils/profileData';
import SectionHeader from '@/components/common/SectionHeader';
import Huwahuwa_img from '@/components/common/huwahuwa_img';
import { SectionProps } from '@/types/component';
import FadeInElement from '@/components/common/FadeIn';

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
      className='bg-[url(/assets/images/snow-town.png)] bg-repeat-x bg-bottom bg-[length:auto_200px] relative w-screen pt-16 pb-28'
    >
      {/* グラデーションオーバーレイ（上部100pxのみ） */}
      <div className='absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-white -z-10' />
      {/* 白背景（100px以降） */}
      <div className='absolute top-[100px] left-0 right-0 bottom-0 bg-white -z-10' />
      <div className='max-w-[1200px] mx-auto px-4'>
        {/* Section Title */}
        <SectionHeader
          isVisible={isVisible('profile')}
          title='Profile'
          subtitle='自己紹介'
        />
        <div className=''>
          {/* Profile Info Table */}
          <FadeInElement delay={0.5}>
            <ProfileInfoTable profileData={PROFILE_DATA} />
          </FadeInElement>

          {/* Contact Buttons */}
          <ContactButtons contacts={CONTACT_BUTTONS} />
          <div className='absolute left-10 lg:left-3/5 bottom-16 lg:bottom-56'>
            <Huwahuwa_img
              image='profile-shimaenaga.png'
              name='シマエナガ'
              move='gentle'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfileSection;
