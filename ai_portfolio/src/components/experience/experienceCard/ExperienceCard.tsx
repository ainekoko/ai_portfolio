import Link from 'next/link';
import React from 'react';

type ExperienceCardProps = {
  title: string;
  period: string;
  description: string;
  link: string;
};

const ExperienceCard = ({
  title,
  period,
  description,
  link,
}: ExperienceCardProps) => {
  return (
    <div className='mt-20 relative'>
      <div className='flex items-center relative z-0'>
        <h2 className='text-2xl font-light mr-12 whitespace-nowrap'>{title}</h2>
        <span className='text-sm mr-8 whitespace-nowrap'>{period}</span>
      </div>
      <p className='py-5 px-10 relative z-0'>{description}</p>
      {/* More */}
      <div className='flex justify-end relative z-0'>
        <Link href={link} className='inline-flex items-center gap-4 group'>
          <span className=' text-xl font-bold text-gray-600 group-hover:text-gray-900 transition-colors duration-300'>
            more
          </span>
          <div className='relative w-32'>
            <div className='absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-400 w-6 origin-left group-hover:w-28 group-hover:bg-gray-900 transition-all duration-600 ease-out'></div>
            <div className='absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-t border-gray-400 rotate-45 group-hover:border-gray-900 group-hover:scale-110 group-hover:left-28 transition-all duration-600 ease-out ml-[-1px]'></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExperienceCard;
