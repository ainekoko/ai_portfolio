import { SectionIdProps } from '@/types/component';
import FadeInElement from '../../common/FadeIn';
import Image from 'next/image';
/**
 * TopSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const TopSection = (props: SectionIdProps) => {
  const backImg = [
    {
      src: '/assets/images/top_1.png',
      alt: '長女',
      width: 450,
      height: 500,
    },
    {
      src: '/assets/images/top_2.jpg',
      alt: '次女',
      width: 550,
      height: 400,
    },
    {
      src: '/assets/images/top_3.jpg',
      alt: '公園',
      width: 300,
      height: 400,
    },
    {
      src: '/assets/images/top_4.png',
      alt: '花壁',
      width: 200,
      height: 400,
    },
    {
      src: '/assets/images/top_5.jpg',
      alt: 'ネイル',
      width: 250,
      height: 200,
    },
  ];

  return (
    <section id='topSection' className='w-screen'>
      <div className='relative h-[1300px]  max-sm:h-[calc(130vw*500/450+135vw*400/550)] w-auto lg:w-[1025px] m-auto'>
        <FadeInElement direction='up' delay={0}>
          <div className='absolute left-0 sm:top-20 top-0   '>
            <Image
              src={backImg[0].src}
              alt={backImg[0].alt}
              className=' shadow-xl max-sm:w-[640px]'
              width={backImg[0].width}
              height={backImg[0].height}
            />
          </div>
        </FadeInElement>

        <FadeInElement direction='up' delay={0.5}>
          <div className='absolute right-0 sm:top-[600px] max-sm:left-0 max-sm:top-[calc(135vw*500/450)]'>
            <Image
              src={backImg[1].src}
              alt={backImg[1].alt}
              className='shadow-xl  max-sm:w-[640px]'
              width={backImg[1].width}
              height={backImg[1].height}
            />
          </div>
        </FadeInElement>
        {/* メインタイトル */}
        <h1
          className='
        mr-2.5
        text-8xl md:text-[8rem]
        drop-shadow-[1px_0px_35px_#383838] 
        text-white m-0 p-0 absolute 
        top-[30vh] right-0 
        font-bold
      '
        >
          Ai&rsquo;s Portfolio
        </h1>
      </div>

      <div
        id='hello'
        className='h-[1100px] w-auto lg:w-[1025px] m-auto relative'
      >
        <FadeInElement direction='up'>
          <div className='absolute top-0 max-sm:hidden'>
            <Image
              src={backImg[2].src}
              alt={backImg[2].alt}
              className='shadow-xl'
              width={backImg[2].width}
              height={backImg[2].height}
            />
          </div>
          <div className='absolute left-1/2 -translate-x-1/2  top-44'>
            <Image
              src={backImg[3].src}
              alt={backImg[3].alt}
              className='shadow-xl'
              width={backImg[3].width}
              height={backImg[3].height}
            />
          </div>
          <div className='absolute right-0 top-0 max-sm:hidden'>
            <Image
              src={backImg[4].src}
              alt={backImg[4].alt}
              className='shadow-xl'
              width={backImg[4].width}
              height={backImg[4].height}
            />
          </div>
        </FadeInElement>

        <h2
          className={`
            text-center 
            text-8xl md:text-[8rem]
            drop-shadow-[1px_0px_35px_#383838] 
            w-full 
            text-white m-0 p-0 font-bold 
            transition-all duration-1000 ease-out 
            ${props.isVisible ? 'opacity-100' : 'opacity-20 -translate-y-20'}
          `}
        >
          - Hello -
        </h2>
        <p
          className='
              absolute top-[30vh] 
              transform -translate-x-1/2
              left-[50%]
              text-left
              text-sm  md:text-graduate
              w-1 
              drop-shadow-[0_0_3px_white]
            '
        >
          閲覧頂きありがとうございます
        </p>
        <p
          className='
              absolute top-[30vh] 
              transform -translate-x-1/2
              left-[45%] transform-none
              text-left
              text-base 
              w-1 
              drop-shadow-[0_0_3px_white]
          '
        >
          このサイトで少しでも私の事を知って頂けたら幸いです
        </p>
      </div>

      {/* サブテキスト - レスポンシブ対応 */}
    </section>
  );
};

export default TopSection;
