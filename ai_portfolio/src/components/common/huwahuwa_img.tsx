import React from 'react';

interface HuwahuwaImgProps {
  image: string;
  name: string;
  move?: string;
}

/**
 * 画像がフワフワ動くコンポーネント
 * @param image: 画像ファイル名
 * @param name: 画像のaltテキスト
 * @param move: 動作タイプ（風:'sway', 左右上下'gentle'、通常'float'）
 * @returns
 */
const Huwahuwa_img = ({ image, name, move = 'float' }: HuwahuwaImgProps) => {
  const animationClass =
    move === 'sway'
      ? 'animate-sway'
      : move === 'gentle'
      ? 'animate-gentle-float'
      : 'animate-float';

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`../assets/images/${image}`}
        alt={name}
        className={`${animationClass}`}
      />
    </>
  );
};

export default Huwahuwa_img;
