// src/components/contact/Input.tsx
import React from 'react';

interface InputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const Input = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className='text-[#348a58] text-sm'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className='text-center m-auto w-full border border-[#bde7c4] rounded px-3 py-2 text-base disabled:opacity-50 disabled:cursor-not-allowed'
        aria-required={required}
      />
    </div>
  );
};

export default Input;
