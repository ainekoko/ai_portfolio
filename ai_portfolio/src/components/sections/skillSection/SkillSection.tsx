import { SectionProps } from '@/types/component';
import React from 'react';
import SectionHeader from '@/components/common/sectionHeader/SectionHeader';
import SkillItemList from '@/components/skill/skillItemList/SkillItemList';
import DocumentSkill from '@/components/skill/skillDocument/SkillDocument';
import SkillAccordion from '@/components/skill/skillAccordion/SkillAccordion';
import { DOCUMENT_SKILL, SKILL_DATA } from '@/utils/skillData';

/**
 * スキルセクションコンポーネント
 * @param  isVisible: セクションの表示状態を判定する関数
 */
const SkillSection = ({ isVisible }: SectionProps) => {
  return (
    <section
      id='skill'
      aria-label='スキルセクション'
      className='bg-[#ffffff] relative w-screen pt-16 pb-40'
    >
      {/* Section Title */}
      <SectionHeader
        isVisible={isVisible('skill')}
        title='Skill'
        subtitle='現場で経験したスキルを一覧化しました'
      />
      <div className='max-w-[1200px] mx-auto px-10'>
        <div className='lg:grid lg:grid-cols-2 '>
          {/*-- プログラミング言語 -*/}
          <SkillItemList
            id='programmingLanguage'
            title='Programming Language'
            skillData={SKILL_DATA.programmingLanguage}
          />
          {/*-- CMS -*/}
          <SkillItemList id='cms' title='CMS' skillData={SKILL_DATA.cms} />
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
        <SkillAccordion id='another' skillData={SKILL_DATA.another} />
        {/*-- 設計書関連 -*/}
        <DocumentSkill documentData={DOCUMENT_SKILL} />
      </div>
    </section>
  );
};
export default SkillSection;
