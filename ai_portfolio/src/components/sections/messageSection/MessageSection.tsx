'use client';
import FadeInElement from '@/components/common/fadeIn/FadeIn';
import QAItem from '@/components/message/qaItem/QAItem';
import { QAITEMS, SELF_INTRODUCTION } from '@/utils/messageData';
import React from 'react';

/**
 * メッセージセクションコンポーネント
 * ホバー対応のアコーディオン形式で質問と回答を表示
 */
const MessageSection = () => {
  return (
    <section
      id='message'
      className='relative w-screen pt-35 pb-28'
      aria-label='メッセージ'
    >
      <h2
        id='message-title'
        className='text-[#834600] text-center text-3xl font-bold mb-3 z-10 relative'
      >
        Message
      </h2>

      {/* 自己紹介部分 */}
      <FadeInElement delay={0.3}>
        <div className='w-10/12 md:w-[650px] text-base leading-relaxed z-10 relative m-auto mb-12'>
          {SELF_INTRODUCTION.content}
        </div>
      </FadeInElement>

      {/* QAセクション - ホバー対応アコーディオン */}
      <div className='mx-3 md:max-w-[800px] md:m-auto z-10 relative'>
        <h3 className='text-[#834600] text-center text-base font-semibold mb-8'>
          よく化粧品業界からIT業界へ転職した際に聞かれる質問をまとめてみました！
        </h3>

        <div className='space-y-3' role='list'>
          {QAITEMS.map((item, index) => (
            <QAItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
