import { SectionProps } from '@/types/component';
import React from 'react';
import SectionHeader from '../common/SectionHeader';
import SkillItemList from '../skill/SkillItemList';
import { DOCUMENT_SKILL, SKILL_DATA } from '@/utils/skillData';
import DocumentSkill from '../skill/SkillDocument';

const SkillSection = ({ isVisible }: SectionProps) => {
  return (
    <section
      id='skill'
      className='bg-[#f8fdfa] relative top-[360vh] w-screen h-screen p-8  mt-8 py-6'
    >
      {/* Section Title */}
      <SectionHeader
        isVisible={isVisible('skill')}
        title='skill'
        subtitle='現場で経験したスキルを一覧化しました'
      />

      <div className='container flex'>
        {/*-- プログラミング言語 -*/}
        <SkillItemList
          id='programmingLanguage'
          title='Programming Language'
          skillData={SKILL_DATA.programmingLanguage}
        />
        {/*-- CMS -*/}
        <SkillItemList id='cms' title='CMS' skillData={SKILL_DATA.cms} />
      </div>
      <div className='container flex'>
        {/*-- Framework -*/}
        <SkillItemList
          id='framework'
          title='Framework'
          skillData={SKILL_DATA.framework}
        />
        {/*-- Library -*/}
        <SkillItemList
          id='library'
          title='Library'
          skillData={SKILL_DATA.Library}
        />
      </div>
      {/*-- Accordion -*/}
      <div className='container mx-auto space-y-2'>
        <details className='accordion-003 mb-2 border-b-2 border-gray-300'>
          <summary className='flex justify-between items-center relative px-8 py-4 text-gray-800 font-semibold cursor-pointer'>
            その他
          </summary>
          <div className='container flex border-t-[0.5px] border-gray-400'>
            {/*-- another -*/}
            <SkillItemList
              id='another'
              title='Another'
              skillData={SKILL_DATA.another}
            />
          </div>
        </details>
      </div>
      {/*-- 設計書関連 -*/}
      <DocumentSkill documentData={DOCUMENT_SKILL} />
    </section>
  );
};

export default SkillSection;
