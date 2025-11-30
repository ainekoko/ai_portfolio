import React from 'react';

const Loading = () => {
  return (
    <div className='fixed inset-0 z-[10001] bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center overflow-hidden'>
      {/* 背景の浮遊する円 */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-20 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-float'></div>
        <div className='absolute top-40 right-32 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-float-delay-1'></div>
        <div className='absolute bottom-32 left-40 w-28 h-28 bg-blue-200 rounded-full opacity-20 animate-float-delay-2'></div>
        <div className='absolute bottom-20 right-20 w-36 h-36 bg-teal-200 rounded-full opacity-20 animate-float-delay-3'></div>
      </div>

      <div className='relative text-center'>
        {/* キラキラエフェクト */}
        <div className='absolute -top-8 left-1/2 transform -translate-x-1/2'>
          <span className='text-4xl animate-sparkle'>✨</span>
        </div>

        {/* メインタイトル */}
        <h1 className='text-6xl font-bold mb-6 relative'>
          <span className='inline-block animate-bounce-slow text-pink-400'>
            A
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-100 text-purple-400'>
            i
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-200 text-pink-400'>
            &apos;
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-300 text-blue-400'>
            s
          </span>
          <span className='mx-2'></span>
          <span className='inline-block animate-bounce-slow animation-delay-400 text-purple-400'>
            p
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-500 text-teal-400'>
            o
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-600 text-pink-400'>
            r
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-700 text-purple-400'>
            t
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-800 text-blue-400'>
            f
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-900 text-teal-400'>
            o
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-1000 text-pink-400'>
            l
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-1100 text-purple-400'>
            i
          </span>
          <span className='inline-block animate-bounce-slow animation-delay-1200 text-blue-400'>
            o
          </span>
        </h1>

        {/* 可愛いローディングドット */}
        <div className='flex justify-center gap-2 mb-4'>
          <div className='w-3 h-3 bg-pink-400 rounded-full animate-bounce'></div>
          <div className='w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-200'></div>
          <div className='w-3 h-3 bg-blue-400 rounded-full animate-bounce animation-delay-400'></div>
        </div>

        <p className='text-gray-500 text-sm font-medium tracking-wider'>
          Loading...
        </p>

        {/* 下部のキラキラ */}
        <div className='absolute -bottom-8 right-0'>
          <span className='text-3xl animate-sparkle animation-delay-500'>
            💫
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes sparkle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay-1 {
          animation: float 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .animate-float-delay-2 {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-delay-3 {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1100 {
          animation-delay: 1.1s;
        }
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </div>
  );
};

export default Loading;
