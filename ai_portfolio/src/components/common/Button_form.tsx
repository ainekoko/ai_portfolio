import React from 'react';

interface ButtonFormProps {
  text: string;
}

const Button_form = ({ text }: ButtonFormProps) => {
  return (
    <button className='w-64 m-auto bg-green-700/50 hover:bg-green-700/20 text-white font-semibold py-3 px-6  rounded-xl backdrop-blur-md border border-white/30 transform transition-all duration-300 ease-out hover:scale-95 hover:translate-y-1 shadow-lg hover:shadow-md'>
      {text}
    </button>
  );
};

export default Button_form;
