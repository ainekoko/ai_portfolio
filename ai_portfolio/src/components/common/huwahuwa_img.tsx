import React from 'react';

interface HuwahuwaImgProps {
  image: string;
  name: string;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  move?: string;
  speech?: string;
  speechWidth?: string;
}

/**
 * 画像がフワフワ動くコンポーネント
 * @param image: 画像ファイル名
 * @param name: 画像のaltテキスト
 * @param top:
 * @param right:
 * @param left:
 * @param bottom:
 * @param move: 動作タイプ（風:'sway', 左右上下'gentle'、通常'float'）
 * @param speech: 吹き出しのテキスト
 * @param speechWidth: 吹き出しの横幅
 * @returns
 */
const Huwahuwa_img = ({
  image,
  name,
  top,
  right,
  left,
  bottom,
  move = 'float',
  speech,
  speechWidth,
}: HuwahuwaImgProps) => {
  const animationClass =
    move === 'sway'
      ? 'animate-sway'
      : move === 'gentle'
      ? 'animate-gentle-float'
      : 'animate-float';

  return (
    <div
      className='absolute z-40 w-fit h-fit'
      style={{
        top: top,
        right: right,
        left: left,
        bottom: bottom,
      }}
    >
      {/* 吹き出し */}
      {speech && (
        <div
          className='absolute -top-25 -right-15 bg-white rounded-2xl px-4 py-2 shadow-lg border border-gray-300'
          style={{ width: speechWidth }}
        >
          <p className='text-sm font-medium text-gray-800'>{speech}</p>
          {/* 吹き出しの三角形 */}
          <div className='absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-gray-300 transform rotate-45'></div>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/images/${image}`}
        alt={name}
        className={animationClass}
      />
    </div>
  );
};

export default Huwahuwa_img;
