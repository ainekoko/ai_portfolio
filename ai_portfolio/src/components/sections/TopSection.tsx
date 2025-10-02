import { SectionIdProps } from '@/types/component';
/**
 * TopSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const TopSection = (props: SectionIdProps) => {
  return (
    <section id='topSection' className='absolute top-0 w-screen h-screen'>
      {/* メインタイトル */}
      <h1
        className='
        text-8xl md:text-[8rem]
        drop-shadow-[1px_0px_35px_#383838] 
        w-full 
        text-white m-0 p-0 absolute 
        top-[30vh] left-4 
        font-bold
      '
      >
        Ai&rsquo;s Portfolio
      </h1>

      {/* Helloセクション - 875px以下で中央配置 */}
      <div
        id='hello'
        className='
          absolute top-[150vh] 
          left-0 right-0
          flex justify-center items-center
          w-full      
          '
      >
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
      </div>

      {/* サブテキスト - レスポンシブ対応 */}
      <p
        className='
        absolute top-[175vh] 
         transform -translate-x-1/2
        left-[50vw] transform-none
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
        absolute top-[180vh] md:top-[178vh] 
        transform -translate-x-1/2
        left-[45vw] transform-none
        text-left
        tetext-base 
        w-1 
        drop-shadow-[0_0_3px_white]
      '
      >
        このサイトで少しでも私の事を知って頂けたら幸いです
      </p>
    </section>
  );
};

export default TopSection;
