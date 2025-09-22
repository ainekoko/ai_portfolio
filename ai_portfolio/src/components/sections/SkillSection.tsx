import { SectionProps } from '@/types/component';
import React from 'react';
import SectionHeader from '../common/SectionHeader';
import SkillItemList from '../skill/SkillItemList';
import { DOCUMENT_SKILL, SKILL_DATA } from '@/utils/skillData';
import DocumentSkill from '../skill/SkillDocument';
import SkillAccordion from '../skill/SkillAccordion';

/**
 * スキルセクションコンポーネント
 * @param  isVisible: セクションの表示状態を判定する関数
 */
const SkillSection = ({ isVisible }: SectionProps) => {
  return (
    <section
      id='skill'
      className='bg-[#f8fdfa] relative top-[360vh] w-screen h-screen p-8  mt-8 py-6'
    >
      {/* Section Title */}
      <SectionHeader
        isVisible={isVisible('skill')}
        title='Skill'
        subtitle='現場で経験したスキルを一覧化しました'
      />

      {/* 一つのコンテナで4つのスキルセクションを2x2のグリッドで配置 */}
      <div className='container grid grid-cols-2'>
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
    </section>
  );
};
export default SkillSection;
