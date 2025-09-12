import React from 'react';
import { SectionIdProps } from '@/types/component';
import SectionTitle from '../common/SectionHeader';
import ContactButtons from '../profile/ContactButtons';
import { CONTACT_BUTTONS, PROFILE_DATA } from '@/utils/profileData';
import ProfileInfoTable from '../profile/ProfileInfoTable';
/**
 * TopSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const ProfileSection = (props: SectionIdProps) => {
  return (
    <section
      id='profile'
      className='bg-[#ffffff] relative top-[300vh] w-screen pb-20 p-8 mt-8 py-6'
    >
      {/* Section Title */}
      <SectionTitle isVisible={props.isVisible} />
      <div className='container'>
        {/* Profile Info Table */}
        <ProfileInfoTable profileData={PROFILE_DATA} />
        {/* Contact Buttons */}
        <ContactButtons contacts={CONTACT_BUTTONS} />

        <div className='absolute right-8 top-40 opacity-80'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src='../assets/images/hokkaido.png' alt='北海道イラスト' />
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
