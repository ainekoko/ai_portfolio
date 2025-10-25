import { SectionIdProps } from '@/types/component';
import FadeInElement from '../common/FadeIn';
import Image from 'next/image';
/**
 * TopSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const TopSection = (props: SectionIdProps) => {
  return (
    <section id='topSection' className='w-screen'>
      <div className='relative h-[1300] w-auto lg:w-[1025px] m-auto'>
        <FadeInElement direction='up' delay={0}>
          <div className='absolute left-0 sm:top-20 top-0   '>
            <Image
              src='/assets/images/top_1.png'
              alt='Image1'
              className=' shadow-xl max-sm:w-[640px]'
              width={450}
              height={500}
            />
          </div>
        </FadeInElement>

        <FadeInElement direction='up' delay={0.5}>
          <div className='absolute right-0 sm:top-[600px] max-sm:left-0 max-sm:top-[calc(135vw*500/450)]'>
            <Image
              src='/assets/images/top_2.jpg'
              alt='Image2'
              className='shadow-xl  max-sm:w-[640px]'
              width={550}
              height={400}
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

      <div id='hello' className='h-[1000] w-auto lg:w-[1025px] m-auto relative'>
        <FadeInElement direction='up'>
          <div className='absolute rleft-0 top-0'>
            <Image
              src='/assets/images/top_3.jpg'
              alt='Image1'
              className='shadow-xl'
              width={300}
              height={400}
            />
          </div>
          <div className='absolute right-[420px] top-40'>
            <Image
              src='/assets/images/top_4.png'
              alt='Image2'
              className='shadow-xl'
              width={200}
              height={400}
            />
          </div>
          <div className='absolute right-0 top-0'>
            <Image
              src='/assets/images/top_5.jpg'
              alt='Image3'
              className='shadow-xl'
              width={250}
              height={400}
            />
          </div>
        </FadeInElement>

        <h2
          className={`
            text-center 
            text-7xl md:text-[8rem]
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
              left-[50%] transform-none
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
              tetext-base 
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
