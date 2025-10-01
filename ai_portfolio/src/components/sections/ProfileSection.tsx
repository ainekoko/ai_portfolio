import React from 'react';
import ContactButtons from '../profile/ContactButtons';
import { CONTACT_BUTTONS, PROFILE_DATA } from '@/utils/profileData';
import ProfileInfoTable from '../profile/ProfileInfoTable';
import SectionHeader from '../common/SectionHeader';
import { SectionProps } from '@/types/component';
/**
 * TopSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const ProfileSection = ({ isVisible }: SectionProps) => {
  return (
    <section
      id='profile'
      className='bg-[url(/assets/images/hokkaido.png)]  bg-no-repeat bg-[position:right] bg-[#ffffff] relative top-[300vh] w-screen pb-20 p-8 mt-8 py-6'
    >
      {/* Section Title */}
      <SectionHeader
        isVisible={isVisible('profile')}
        title='Profile'
        subtitle='自己紹介'
      />
      <div className=''>
        {/* Profile Info Table */}
        <ProfileInfoTable profileData={PROFILE_DATA} />
        {/* Contact Buttons */}
        <ContactButtons contacts={CONTACT_BUTTONS} />
        <div className='absolute right-8 top-40 opacity-80'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='../assets/images/profile-shimaenaga.png'
            alt='北海道イラスト'
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
