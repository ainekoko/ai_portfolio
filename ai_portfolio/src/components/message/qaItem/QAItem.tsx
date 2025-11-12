// components/message/QAItem.tsx
import { QAItemData } from '@/utils/messageData';
import React, { useState } from 'react';

type QAItemProps = {
  item: QAItemData;
  index: number;
};

const QAItem: React.FC<QAItemProps> = ({ item, index }) => {
  const headingId = `qa-heading-${index}`;
  const contentId = `qa-content-${index}`;

  /**
   * この項目がホバーされているかの状態
   */
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className='border-1 border-gray-200 rounded-lg overflow-hidden hover:border-[#e5c227] transition-all duration-500'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 質問ヘッダー */}
      <button
        type='button'
        id={headingId}
        aria-expanded={isHovered}
        aria-controls={contentId}
        className='w-full text-left p-4 bg-white hover:bg-gray-50 transition-colors duration-400 flex items-center justify-between cursor-pointer'
      >
        <div className='flex items-center gap-3'>
          <span className='text-[#e5c227] font-bold text-lg' aria-hidden='true'>
            Q{index + 1}.
          </span>
          <span className='font-medium text-gray-800'>{item.question}</span>
        </div>
        <div
          className={`transform transition-transform duration-500 ease-in-out ${
            isHovered ? 'rotate-180' : ''
          }`}
          aria-hidden='true'
        >
          <svg
            className='w-5 h-5 text-[#e5c227]'
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
      </button>

      {/* 回答部分 */}
      <div
        id={contentId}
        role='region'
        aria-labelledby={headingId}
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='p-4 pt-0 border-t border-gray-100'>
          <div className='flex items-start gap-3 mt-2'>
            <span
              className='text-gray-600 font-bold text-sm mt-1'
              aria-hidden='true'
            >
              A.
            </span>
            <p className='text-gray-700 leading-relaxed'>{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAItem;
