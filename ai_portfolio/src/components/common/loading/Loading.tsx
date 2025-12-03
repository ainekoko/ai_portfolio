import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='fixed inset-0 z-[10001] bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center transition-opacity duration-500'>
      <div className='relative'>
        {/* Main loading animation */}
        <div className='relative w-32 h-32'>
          {/* Flower petals */}
          <div className='absolute inset-0 animate-spin-slow'>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 origin-center'
                style={{
                  transform: `rotate(${i * 60}deg) translateY(-24px)`,
                }}
              >
                <div className='w-12 h-12 bg-gradient-to-br from-rose-300 to-pink-200 rounded-full opacity-70'></div>
              </div>
            ))}
          </div>

          {/* Center circle */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-16 h-16 bg-gradient-to-br from-rose-400 via-pink-300 to-purple-300 rounded-full shadow-lg animate-pulse'></div>
          </div>

          {/* Inner white dot */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-6 h-6 bg-white rounded-full shadow-md'></div>
          </div>

          {/* Decorative floating dots */}
          <div className='absolute -top-2 left-1/2 w-3 h-3 bg-rose-400 rounded-full animate-float-1'></div>
          <div className='absolute top-1/2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-float-2'></div>
          <div className='absolute -bottom-2 left-1/4 w-2.5 h-2.5 bg-purple-300 rounded-full animate-float-3'></div>
        </div>

        {/* Portfolio title */}
        <div className='mt-8 text-center'>
          <h1 className='text-2xl font-light text-gray-700 tracking-wide mb-4 animate-fade-in'>
            Ai&apos;s portfolio
          </h1>

          {/* Loading text */}
          <p className='text-gray-500 text-xs font-light tracking-wider animate-fade-in-delay'>
            Loading...
          </p>

          {/* Progress bar */}
          <div className='mt-4 w-48 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto'>
            <div
              className='h-full bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 transition-all duration-300 ease-out rounded-full'
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Percentage */}
          <p className='mt-2 text-xs text-gray-400 font-light'>{progress}%</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.6;
          }
          50% {
            transform: translate(10px, -15px);
            opacity: 1;
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.5;
          }
          50% {
            transform: translate(-15px, 10px);
            opacity: 1;
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translate(0, 0);
            opacity: 0.7;
          }
          50% {
            transform: translate(12px, 12px);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-delay {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 3.5s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 2.8s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-in;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default Loading;
