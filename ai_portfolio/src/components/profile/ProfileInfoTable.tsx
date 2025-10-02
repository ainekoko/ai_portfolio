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
 * @param - profileData: プロフィール情報の配列
 */
const ProfileInfoTable: React.FC<ProfileInfoTableProps> = ({ profileData }) => {
  return (
    <ul className='text-base space-y-2 ml-0 lg:w-[900px]'>
      {profileData.map((item, index) => (
        <li
          key={index}
          className='text-sm flex border-b border-dotted border-[#3b3b3b] pl-5 pb-1 my-6'
        >
          <span className='w-40'>{item.label}</span>
          <div className='w-10/12'>{item.content}</div>
        </li>
      ))}
    </ul>
  );
};

export default ProfileInfoTable;
