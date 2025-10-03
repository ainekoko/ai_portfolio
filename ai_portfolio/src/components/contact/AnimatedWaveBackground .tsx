import React from 'react';

const AnimatedWaveBackground = () => {
  return (
    <div className='top-[360vh] relative w-full h-[200px] overflow-hidden'>
      {/* 波アニメーション 1層目（背景の大きな波） */}
      <div className='absolute inset-0'>
        <svg
          className='absolute bottom-0 w-full h-64'
          viewBox='0 0 1200 250'
          preserveAspectRatio='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0,120 C150,180 250,180 400,140 C550,100 650,60 800,80 C950,100 1050,140 1200,100 L1200,250 L0,250 Z'
            fill='#7DFFE1'
            fillOpacity='0.8'
          >
            <animate
              attributeName='d'
              values='M0,120 C150,180 250,180 400,140 C550,100 650,60 800,80 C950,100 1050,140 1200,100 L1200,250 L0,250 Z;
                      M0,100 C150,60 250,60 400,120 C550,180 650,180 800,160 C950,140 1050,80 1200,120 L1200,250 L0,250 Z;
                      M0,140 C150,100 250,100 400,80 C550,60 650,120 800,140 C950,160 1050,160 1200,80 L1200,250 L0,250 Z;
                      M0,120 C150,180 250,180 400,140 C550,100 650,60 800,80 C950,100 1050,140 1200,100 L1200,250 L0,250 Z'
              dur='7s'
              repeatCount='indefinite'
            />
          </path>
        </svg>
      </div>

      {/* 波アニメーション 2層目（前景の波） */}
      <div className='absolute inset-0'>
        <svg
          className='absolute bottom-0 w-full h-48'
          viewBox='0 0 1200 180'
          preserveAspectRatio='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0,90 C120,130 180,130 300,100 C420,70 480,50 600,60 C720,70 780,110 900,120 C1020,130 1080,110 1200,80 L1200,180 L0,180 Z'
            fill='#ffffff'
            fillOpacity='0.9'
          >
            <animate
              attributeName='d'
              values='M0,90 C120,130 180,130 300,100 C420,70 480,50 600,60 C720,70 780,110 900,120 C1020,130 1080,110 1200,80 L1200,180 L0,180 Z;
                      M0,70 C120,50 180,50 300,80 C420,110 480,130 600,120 C720,110 780,70 900,60 C1020,50 1080,70 1200,100 L1200,180 L0,180 Z;
                      M0,110 C120,90 180,90 300,60 C420,30 480,70 600,90 C720,110 780,130 900,140 C1020,150 1080,130 1200,90 L1200,180 L0,180 Z;
                      M0,90 C120,130 180,130 300,100 C420,70 480,50 600,60 C720,70 780,110 900,120 C1020,130 1080,110 1200,80 L1200,180 L0,180 Z'
              dur='5s'
              repeatCount='indefinite'
            />
          </path>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedWaveBackground;
