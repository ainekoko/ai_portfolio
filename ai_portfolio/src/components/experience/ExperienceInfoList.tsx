import { JOB_INTRODUCTION_RIGHT } from '@/utils/ExperienceData';
import React from 'react';

/**
 * 職務経歴リストコンポーネント
 */
const ExperienceInfoList = () => {
  return (
    <div className='flex-1 pr-6'>
      {/* 2011 */}
      <div className='text-sm  text-gray-700'>
        {JOB_INTRODUCTION_RIGHT.map((item, index) => (
          <div key={index}>
            <div className='text-lg font-bold text-gray-700'>
              {item.jobPeriod}
            </div>
            <div className='pl-10'>
              <span className='text-sm font-medium'> ～{item.jobName}～ </span>
              <ul className='mt-3 pl-2.5 space-y-2 text-sm text-gray-600'>
                <li key={index} className='flex items-start'>
                  <span className='w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0'></span>
                  {item.content}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceInfoList;
