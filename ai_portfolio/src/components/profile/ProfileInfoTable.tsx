import React from 'react';

interface ProfileInfo {
  label: string;
  content: string | React.ReactNode;
}

interface ProfileInfoTableProps {
  profileData: ProfileInfo[];
}

/**
 * プロフィール情報テーブルコンポーネント
 * @param param0 - profileData: プロフィール情報の配列
 */
const ProfileInfoTable: React.FC<ProfileInfoTableProps> = ({ profileData }) => {
  return (
    <ul className='mx-auto text-base space-y-2 ml-0 w-8/12'>
      {profileData.map((item, index) => (
        <li
          key={index}
          className='text-sm flex border-b border-dotted border-[#bde7c4] pl-5 pb-1'
        >
          <span className='w-40'>{item.label}</span>
          <div className='w-10/12'>{item.content}</div>
        </li>
      ))}
    </ul>
  );
};

export default ProfileInfoTable;
