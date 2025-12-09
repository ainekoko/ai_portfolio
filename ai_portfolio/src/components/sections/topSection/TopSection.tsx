import FadeInElement from '../../common/fadeIn/FadeIn';
import Image from 'next/image';
import { BACK_IMG } from '@/utils/TopData';
import FireflyBackground from '../../ui/FireflyBackground';

/**
 * @param isVisible - 指定id表示されているかどうか
 * @type boolean
 */
export type SectionIdProps = {
  isVisible: boolean;
};

/**
 * TopSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const TopSection = ({ isVisible }: SectionIdProps) => {
  return (
    <section
      id='topSection'
      className='w-full overflow-hidden bg-white relative'
      aria-label='トップセクション'
    >
      {/* 背景画像 */}
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
        <Image
          src='/assets/images/flowerLeaf.png'
          alt='Background'
          width={800}
          height={800}
          className='opacity-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      </div>

      <div className='relative h-[1500px]  max-sm:h-[calc(130vw*500/450+135vw*400/550)] w-auto lg:w-[1025px] m-auto'>
        <FireflyBackground />
        <FadeInElement direction='up' delay={0}>
          <div className='absolute left-0 sm:top-20 top-0   '>
            <Image
              src={BACK_IMG[0].src}
              alt={BACK_IMG[0].alt}
              width={BACK_IMG[0].width}
              height={BACK_IMG[0].height}
              className=' shadow-xl max-sm:w-[640px]'
            />
          </div>
        </FadeInElement>

        <FadeInElement direction='up' delay={0.5}>
          <div className='absolute left-0 sm:left-auto sm:right-0 top-[calc(100vw*680/450)] sm:top-[600px] w-full sm:w-auto'>
            <Image
              src={BACK_IMG[1].src}
              alt={BACK_IMG[1].alt}
              width={BACK_IMG[1].width}
              height={BACK_IMG[1].height}
              className='shadow-xl  max-sm:w-[640px]'
            />
          </div>
        </FadeInElement>
        {/* メインタイトル */}
        <FadeInElement direction='up' delay={0}>
          <h1
            className='
        mr-2.5 ml-2.5
        text-8xl md:text-[8rem]
        drop-shadow-[1px_0px_15px_#383838] 
        text-white m-0 p-0 absolute 
        top-[30vh] right-0 
        font-bold
      '
          >
            Ai&rsquo;s Portfolio
          </h1>
        </FadeInElement>
      </div>
      <div
        id='hello'
        className='h-[1200px] w-auto lg:w-[1025px] m-auto relative'
      >
        <FadeInElement direction='up'>
          <div className='absolute top-36 sm:top-0 '>
            <Image
              src={BACK_IMG[2].src}
              alt={BACK_IMG[2].alt}
              width={BACK_IMG[2].width}
              height={BACK_IMG[2].height}
              className='shadow-xl  max-sm:w-[640px]'
            />
          </div>
          <div className='absolute left-1/2 -translate-x-1/2  top-44 max-sm:hidden'>
            <Image
              src={BACK_IMG[3].src}
              alt={BACK_IMG[3].alt}
              width={BACK_IMG[3].width}
              height={BACK_IMG[3].height}
              className='shadow-xl'
            />
          </div>
          <div className='absolute right-0 top-0 max-sm:hidden'>
            <Image
              src={BACK_IMG[4].src}
              alt={BACK_IMG[4].alt}
              width={BACK_IMG[4].width}
              height={BACK_IMG[4].height}
              className='shadow-xl'
            />
          </div>
        </FadeInElement>

        <h2
          className={`
            text-center 
            text-8xl md:text-[8rem]
            drop-shadow-[1px_0px_15px_#383838] 
            w-full 
            text-white m-0 p-0 font-bold 
            transition-all duration-1000 ease-out 
            ${isVisible ? 'opacity-100' : 'opacity-0 -translate-y-20'}
          `}
        >
          - Hello -
        </h2>
        <p
          className='
              
              absolute top-[25vh] 
              transform -translate-x-1/2
              left-[52%]
              text-left
              text-sm  md:text-graduate
              w-1 
             drop-shadow-[0_0_15px_white]
            '
        >
          閲覧頂きありがとうございます
        </p>
        <p
          className='
              absolute top-[30vh] 
              transform -translate-x-1/2
              left-[48%] transform-none
              text-left
              text-base 
              w-1 
               drop-shadow-[0_0_15px_white]
          '
        >
          このサイトで少しでも私の事を知って頂けたら幸いです
        </p>
      </div>
    </section>
  );
};

export default TopSection;
