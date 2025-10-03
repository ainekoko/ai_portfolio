import React from 'react';

interface InputProps {
  label: string;
  type: string;
  id: string;
  name: string;
}

const Input = ({ label, type, id, name }: InputProps) => {
  return (
    <>
      <label htmlFor={id} className='text-[#348a58] text-sm'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required
        className='text-center m-auto w-full border border-[#bde7c4] rounded px-3 py-2 text-base'
      />
    </>
  );
};

export default Input;
