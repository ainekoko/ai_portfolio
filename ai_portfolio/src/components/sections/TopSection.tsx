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
      <div className='relative h-[1300] md:w-[1025px] m-auto'>
        <FadeInElement direction='up' delay={0}>
          <div className='absolute right-40 top-0'>
            <Image
              src='/assets/images/top_1.jpg'
              alt='Image1'
              className='rounded-lg shadow-xl'
              width={300}
              height={350}
            />
          </div>
        </FadeInElement>

        <FadeInElement direction='up' delay={0.2}>
          <div className='absolute left-10 top-20'>
            <Image
              src='/assets/images/top_2.jpg'
              alt='Image2'
              className='rounded-lg shadow-xl'
              width={400}
              height={400}
            />
          </div>
        </FadeInElement>
        {/* メインタイトル */}
        <h1
          className='
        text-8xl md:text-[8rem]
        drop-shadow-[1px_0px_35px_#383838] 
        text-white m-0 p-0 absolute 
        top-[30vh] left-4 
        font-bold
      '
        >
          Ai&rsquo;s Portfolio
        </h1>
      </div>

      <div id='hello' className='h-[1000] w-[1025px] m-auto relative'>
        <FadeInElement direction='up'>
          <div className='absolute right-40 top-0'>
            <Image
              src='/assets/images/top_1.jpg'
              alt='Image1'
              className='rounded-lg shadow-xl'
              width={300}
              height={400}
            />
          </div>
          <div className='absolute right-50 top-0'>
            <Image
              src='/assets/images/top_2.jpg'
              alt='Image2'
              className='rounded-lg shadow-xl'
              width={300}
              height={400}
            />
          </div>
          <div className='absolute right-20 top-0'>
            <Image
              src='/assets/images/top_3.jpg'
              alt='Image3'
              className='rounded-lg shadow-xl'
              width={300}
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
              left-[550px] transform-none
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
              left-[500px] transform-none
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
