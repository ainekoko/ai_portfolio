import { SectionProps } from '@/types/component';
import React from 'react';
import SectionHeader from '../common/SectionHeader';
import Input from '../contact/Input';
import Button_form from '../common/Button_form';
import AnimatedWaveBackground from '../contact/AnimatedWaveBackground ';

const ContactSection = ({ isVisible }: SectionProps) => {
  return (
    <>
      <AnimatedWaveBackground />
      <section
        id='contact'
        className='relative top-[380vh] w-screen h-screen p-8  mt-8 py-6 bg-[#ffffffe8]'
      >
        {/* Section Title */}
        <SectionHeader
          isVisible={isVisible('contact')}
          title='Contact'
          subtitle='ご質問がありましたらお気軽にご連絡ください'
        />

        <div className=' container px-80'>
          <form className='flex flex-col gap-3 mx-auto py-4'>
            <Input label={'Name'} type={'text'} id={'name'} name={'Name'} />
            <Input
              label={'Mail Address'}
              type={'email'}
              id={'email'}
              name={'email'}
            />
            <label htmlFor='message' className='text-[#348a58] text-sm'>
              comment
            </label>
            <textarea
              id='contactMessage'
              name='message'
              rows={4}
              required
              className='border border-[#bde7c4] rounded px-3 py-2 text-base'
            ></textarea>
            <Button_form text='送信' />
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
