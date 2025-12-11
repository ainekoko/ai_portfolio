import React from 'react';

interface ButtonFormProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button_form = ({
  text,
  type = 'button',
  disabled = false,
  isLoading = false,
  onClick,
}: ButtonFormProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className='w-64 m-auto bg-pink-200 hover:bg-pink-300 text-white font-semibold py-3 px-6 rounded-xl backdrop-blur-md border border-white/30 transform transition-all duration-300 ease-out hover:scale-95 hover:translate-y-1 shadow-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0'
    >
      {isLoading ? (
        <span className='flex items-center justify-center gap-2'>
          <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
              fill='none'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
          ログイン中...
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default Button_form;
