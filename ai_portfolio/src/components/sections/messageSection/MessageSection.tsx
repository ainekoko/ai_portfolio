'use client';
import FadeInElement from '@/components/common/fadeIn/FadeIn';
import Huwahuwa_img from '@/components/common/huwahuwaImg/Huwahuwa_img';
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
      className='relative w-screen pt-40 pb-40'
      aria-label='メッセージ'
    >
      <h2
        id='message-title'
        className='text-[#834600] text-center text-3xl font-bold mb-3 relative'
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
      <div className='mx-3 md:max-w-[800px] md:m-auto z-0 relative '>
        <h3 className='text-[#834600] text-center text-base font-semibold mb-8'>
          化粧品業界からIT業界へ転職した際に聞かれる質問をまとめてみました！
        </h3>

        <div className='space-y-3 mb-14' role='list'>
          {QAITEMS.map((item, index) => (
            <QAItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
      <Huwahuwa_img
        image='shimaenaga-01.png'
        name='キャラクター'
        move='gentle'
        top='250px'
        right='80%'
        hidden='pc'
      />
    </section>
  );
};

export default MessageSection;
