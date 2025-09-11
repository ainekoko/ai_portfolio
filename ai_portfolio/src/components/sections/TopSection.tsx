import { TopSectionProps } from '@/types/component';
/**
 * TopSection.tsx
 * 最初のセクションを表示するコンポーネント
 * @param props - isVisible: boolean
 */
const TopSection = (props: TopSectionProps) => {
  return (
    <section id='topSection' className='absolute top-0 w-screen h-screen'>
      <h1 className='drop-shadow-[1px_0px_35px_#383838] text-[8rem] w-[55rem] text-white m-0 p-0 absolute top-[30vh] left-4 text-4xl font-bold'>
        Ai&rsquo;s Portfolio
      </h1>
      <div id='hello' className='absolute top-[150vh] left-[30vw]'>
        <h1
          className={`drop-shadow-[1px_0px_35px_#383838] text-[8rem] w-[55rem] text-white m-0 p-0 font-bold transition-all duration-1000 ease-out ${
            props.isVisible ? 'opacity-100' : 'opacity-20 -translate-y-20'
          }`}
        >
          - Hello -
        </h1>
      </div>
      <p className='absolute top-[175vh] left-[50vw] text-lg w-1 drop-shadow-[0_0_3px_white]'>
        閲覧頂きありがとうございます
      </p>
      <p className='absolute top-[175vh] left-[45vw] text-base w-1 drop-shadow-[0_0_3px_white]'>
        このサイトで少しでも私の事を知って頂けたら幸いです
      </p>
    </section>
  );
};

export default TopSection;
