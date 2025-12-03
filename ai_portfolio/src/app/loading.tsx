import AnimatedTitle from '@/components/common/animatedTitle/AnimatedTitle';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className='fixed inset-0 z-[10001] bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center'>
      {/* 背景画像 */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <Image
          src='/assets/images/flowerLeaf.png'
          alt='Background'
          width={400}
          height={400}
          className='opacity-20'
        />
      </div>

      <div className='relative z-10'>
        {/* Main loading animation */}
        <div className='relative w-32 h-32 flex items-center justify-center'>
          <Image
            src='/assets/images/leaf1.gif'
            alt='Loading'
            width={128}
            height={128}
            unoptimized
          />
        </div>

        {/* Portfolio title */}
        <AnimatedTitle />
      </div>
    </div>
  );
}
