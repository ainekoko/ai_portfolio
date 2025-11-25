import React from 'react';

interface HuwahuwaImgProps {
  image: string;
  name: string;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  move?: string;
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
 * @returns
 */
const Huwahuwa_img = ({
  image,
  name,
  top = '0',
  right = '0',
  left = '0',
  bottom = '0',
  move = 'float',
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
