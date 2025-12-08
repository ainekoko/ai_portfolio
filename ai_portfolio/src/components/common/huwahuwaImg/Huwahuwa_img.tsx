import React from 'react';

interface HuwahuwaImgProps {
  hidden?: 'pc';
  image: string;
  name: string;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  bottomSp?: string; // SPサイズ用のbottom値
  width?: string;
  move?: string;
  speech?: string | React.ReactElement;
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
  bottomSp,
  width,
  move = 'float',
  speech,
  speechWidth,
  hidden,
}: HuwahuwaImgProps) => {
  const animationClass =
    move === 'sway'
      ? 'animate-sway'
      : move === 'gentle'
      ? 'animate-gentle-float'
      : 'animate-float';

  return (
    <div
      className={`absolute z-0 w-fit h-fit flex items-start gap-4 ${
        hidden === 'pc' ? 'max-lg:hidden' : 'sample'
      }`}
      style={{
        top: top,
        right: right,
        left: left,
        bottom: bottom,
        ['--bottom-sp' as string]: bottomSp || bottom,
      }}
    >
      <style jsx>{`
        @media (max-width: 1023px) {
          div {
            bottom: var(--bottom-sp) !important;
          }
        }
      `}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/images/${image}`}
        alt={name}
        className={animationClass}
        style={{ width: width }}
      />

      {/* 吹き出し */}
      {speech && (
        <div
          className='relative bg-white rounded-2xl px-4 py-5 shadow-lg border border-gray-300 max-w-[350px]'
          style={{ width: speechWidth }}
        >
          <p className='text-sm font-medium text-gray-800 whitespace-normal break-words'>
            {speech}
          </p>
          {/* 吹き出しの三角形（左側） */}
          <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-4 h-4 bg-white border-l border-b border-gray-300 transform rotate-45'></div>
        </div>
      )}
    </div>
  );
};

export default Huwahuwa_img;
