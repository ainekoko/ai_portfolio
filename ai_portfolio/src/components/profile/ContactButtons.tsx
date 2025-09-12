import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ContactButton {
  icon: IconDefinition;
  text: string;
  href?: string;
  color: string;
}

interface ContactButtonsProps {
  contacts: ContactButton[];
}

/**
 * 連絡先ボタンのコンポーネント
 * @param param0 - contacts: 連絡先情報の配列
 * @returns
 */
const ContactButtons: React.FC<ContactButtonsProps> = ({ contacts }) => {
  return (
    <div className='flex flex-wrap justify-center gap-5 my-15 text-base font-medium'>
      {contacts.map((contact, index) => (
        <button
          key={index}
          className={`relative h-12 overflow-hidden rounded border border-${contact.color} solid bg-white px-5 py-2.5 transition-all duration-300 hover:bg-white hover:ring-2 hover:ring-${contact.color} hover:ring-offset-2`}
          onClick={() => contact.href && window.open(contact.href)}
        >
          <FontAwesomeIcon
            icon={contact.icon}
            className={`mr-2 text-${contact.color} text-xl`}
          />
          <span className='relative'>{contact.text}</span>
        </button>
      ))}
    </div>
  );
};

export default ContactButtons;
