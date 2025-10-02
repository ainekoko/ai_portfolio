'use client';
import { QAITEMS, SELF_INTRODUCTION } from '@/utils/messageData';
import React, { useState } from 'react';

/**
 * メッセージセクションコンポーネント
 * ホバー対応のアコーディオン形式で質問と回答を表示
 */
const MessageSection = () => {
  /**
   * ホバーされた質問のインデックスを管理する状態
   * null...場合はどの質問もホバーされていない状態
   */
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id='message'
      className='relative top-[320vh]  w-screen pb-16 p-8 mt-8 py-6'
    >
      <h2 className='text-[#834600] text-center text-3xl font-bold mb-3 z-10 relative'>
        Message
      </h2>

      {/* 自己紹介部分 */}
      <div className='w-10/12 md:w-[650px] text-base leading-relaxed z-10 relative m-auto mb-12'>
        {SELF_INTRODUCTION.content}
      </div>

      {/* QAセクション - ホバー対応アコーディオン */}
      <div className='mx-3 md:w-[800px] md:m-auto z-10 relative'>
        <h3 className='text-[#834600] text-center text-base font-semibold mb-8'>
          よく化粧品業界からIT業界へ転職した際に聞かれる質問をまとめてみました！
        </h3>

        <div className='space-y-3'>
          {QAITEMS.map((item, index) => (
            <div
              key={index}
              className='border-1 border-gray-200 rounded-lg overflow-hidden hover:border-[#e5c227] transition-all duration-500'
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* 質問ヘッダー */}
              <div className='w-full text-left p-4 bg-white hover:bg-gray-50 transition-colors duration-400 flex items-center justify-between cursor-pointer'>
                <div className='flex items-center gap-3'>
                  <span className='text-[#e5c227] font-bold text-lg'>
                    Q{index + 1}.
                  </span>
                  <span className='font-medium text-gray-800'>
                    {item.question}
                  </span>
                </div>
                <div
                  className={`transform transition-transform duration-500 ease-in-out ${
                    hoveredIndex === index ? 'rotate-180' : ''
                  }`}
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
              </div>

              {/* 回答部分 */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  hoveredIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className='p-4 pt-0 border-t border-gray-100'>
                  <div className='flex items-start gap-3 mt-2'>
                    <span className='text-gray-600 font-bold text-sm mt-1'>
                      A.
                    </span>
                    <p className='text-gray-700 leading-relaxed'>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
