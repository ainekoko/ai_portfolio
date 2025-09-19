import React, { useState } from 'react';
import SkillItemList from './SkillItemList';
import { SKILL_DATA } from '@/utils/skillData';

interface SkillAccordionProps {
  id: string;
  skillData: typeof SKILL_DATA.another;
}
const SkillAccordion = ({ id, skillData }: SkillAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container mx-auto space-y-2'>
      <div className='accordion-003 mb-2 border-b-2 border-gray-300'>
        <div
          className='flex justify-between items-center relative px-8 py-4 text-gray-800 font-semibold cursor-pointer'
          onClick={toggleAccordion}
        >
          その他
          <div
            className={`transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <svg
              className='w-5 h-5 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out border-t-[0.5px] border-gray-400 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='container flex'>
            <div id='another' className='w-full'>
              <SkillItemList id={id} title='Another' skillData={skillData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAccordion;
