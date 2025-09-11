interface TopSectionProps {
  isVisible: boolean;
}

const TopSection = (props: TopSectionProps) => {
  const { isVisible } = props;
  console.log('Hello', isVisible);
  return (
    <section id='topSection' className='absolute top-0 w-screen h-screen'>
      <h1 className='absolute top-[30vh] left-4 text-4xl font-bold'>
        Ai&rsquo;s Portfolio
      </h1>
      <div id='hello' className='absolute top-[150vh] left-[30vw]'>
        <h1 className='text-3xl font-bold transition-all duration-1000 ease-out'>
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
