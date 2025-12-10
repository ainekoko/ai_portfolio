// src/components/profile/ContactButtons.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorType, Contact } from '@/types/profile';

export interface ContactButtonsProps {
  contacts: Contact[];
}

/**
 * 連絡先ボタンのコンポーネント
 * @param contacts - 連絡先情報の配列
 */
const ContactButtons: React.FC<ContactButtonsProps> = ({ contacts }) => {
  const colorClasses: Record<
    ColorType,
    { border: string; text: string; ring: string }
  > = {
    'rose-300': {
      border: 'border-rose-300',
      text: 'text-rose-300',
      ring: 'hover:ring-rose-300 focus:ring-rose-300',
    },
    'purple-400': {
      border: 'border-purple-400',
      text: 'text-purple-400',
      ring: 'hover:ring-purple-400 focus:ring-purple-400',
    },
    'pink-400': {
      border: 'border-pink-400',
      text: 'text-pink-400',
      ring: 'hover:ring-pink-400 focus:ring-pink-400',
    },
    'indigo-500': {
      border: 'border-indigo-500',
      text: 'text-indigo-500',
      ring: 'hover:ring-indigo-500 focus:ring-indigo-500',
    },
  };

  const handleClick = (href?: string) => {
    if (href && href !== '#') {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, href?: string) => {
    if ((e.key === 'Enter' || e.key === ' ') && href && href !== '#') {
      e.preventDefault();
      handleClick(href);
    }
  };

  return (
    <div className='flex flex-nowrap md:flex-wrap justify-center gap-5 md:my-15 mt-8 text-base font-medium'>
      {contacts.map((contact, index) => {
        const colors = colorClasses[contact.color];
        const isDisabled = !contact.href || contact.href === '#';

        return (
          <button
            key={index}
            className={`
              md:min-w-52
              lg:rounded-lg rounded-full relative h-12 overflow-hidden 
              border ${colors.border} solid bg-white 
              lg:px-5 lg:py-2.5 px-3.5 
              transition-all duration-300 
              hover:bg-white hover:ring-2 ${colors.ring} hover:ring-offset-2
              focus:outline-none focus:ring-2 ${colors.ring} focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            onClick={() => handleClick(contact.href)}
            onKeyDown={(e) => handleKeyDown(e, contact.href)}
            disabled={isDisabled}
            aria-label={contact.text}
            title={contact.fullText || contact.text}
            type='button'
          >
            <FontAwesomeIcon
              icon={contact.icon}
              className={`lg:mr-2 ${colors.text} text-xl`}
              aria-hidden='true'
            />
            <span className='hidden lg:inline relative'>{contact.text}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContactButtons;
