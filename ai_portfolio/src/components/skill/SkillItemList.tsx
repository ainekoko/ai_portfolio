import { SkillItemsType } from '@/types/skill';
import React from 'react';

interface SkillItemListProps {
  id: string;
  title?: string;
  skillData: SkillItemsType;
}

/**
 * スキルアイテムリストコンポーネント
 * @param id: コンポーネントのID,
 * @param title: セクションのタイトル,
 * @param skillData: スキルデータの配列
 */
const SkillItemList = ({ id, title, skillData }: SkillItemListProps) => {
  return (
    <div id={id}>
      <p>{title}</p>
      <ul className='flex flex-wrap justify-start pt-10 gap-5 mb-4 text-base font-medium'>
        {skillData.map((item, index) => (
          <li key={index} className='text-center'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.img}
              alt={item.label}
              className='text-xl w-18 h-18 inline-block pb-2.5'
            />
            <p>{item.label}</p>
            <p className='text-sm text-gray-500'>{item.year} years</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillItemList;
