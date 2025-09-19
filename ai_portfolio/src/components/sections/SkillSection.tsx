import { SectionProps } from '@/types/component';
import React from 'react';
import SectionHeader from '../common/SectionHeader';
import SkillItemList from '../skill/SkillItemList';
import { DOCUMENT_SKILL, SKILL_DATA } from '@/utils/skillData';
import DocumentSkill from '../skill/SkillDocument';
import SkillAccordion from '../skill/SkillAccordion';

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
      <SkillAccordion id='library' skillData={SKILL_DATA.another} />
      {/*-- 設計書関連 -*/}
      <DocumentSkill documentData={DOCUMENT_SKILL} />
    </section>
  );
};

export default SkillSection;
