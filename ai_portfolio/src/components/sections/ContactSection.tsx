'use client';
import { SectionProps } from '@/types/component';
import React, { useState, FormEvent } from 'react';
import SectionHeader from '../common/SectionHeader';
import Input from '../contact/Input';
import Button_form from '../common/Button_form';
import AnimatedWaveBackground from '../contact/AnimatedWaveBackground ';
import { submitForm } from '@/action/action';
import { sendContactEmail } from '@/server/contact';

/**
 * フォームデータの型定義
 */
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * フォーム送信状態の型定義
 */
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactSection = ({ isVisible }: SectionProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  /**
   * フォーム送信ハンドラー
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  /**
   * 入力変更ハンドラー
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <AnimatedWaveBackground />
      <section
        id='contact'
        className='relative w-screen pt-16 pb-16 bg-[#f5fffd]'
        aria-labelledby='contact-heading'
      >
        {/* Section Title */}
        <SectionHeader
          isVisible={isVisible('contact')}
          title='Contact'
          subtitle='ご質問がありましたらお気軽にご連絡ください'
        />

        <div>
          <form
            className='md:max-w-[800px] flex flex-col gap-3 mx-auto py-4'
            onSubmit={handleSubmit}
            aria-label='お問い合わせフォーム'
          >
            {/* Name Input */}
            <div>
              <label htmlFor='name' className='text-[#348a58] text-sm'>
                Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                disabled={submitStatus === 'submitting'}
                className='text-center m-auto w-full border border-[#bde7c4] rounded px-3 py-2 text-base disabled:opacity-50 disabled:cursor-not-allowed'
                aria-required='true'
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor='email' className='text-[#348a58] text-sm'>
                Mail Address <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                disabled={submitStatus === 'submitting'}
                className='text-center m-auto w-full border border-[#bde7c4] rounded px-3 py-2 text-base disabled:opacity-50 disabled:cursor-not-allowed'
                aria-required='true'
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor='contactMessage'
                className='text-[#348a58] text-sm'
              >
                Comment <span className='text-red-500'>*</span>
              </label>
              <textarea
                id='contactMessage'
                name='message'
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={submitStatus === 'submitting'}
                className='mb-7 border border-[#bde7c4] rounded px-3 py-2 text-base w-full disabled:opacity-50 disabled:cursor-not-allowed'
                aria-required='true'
              />
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div
                className='text-red-600 text-sm text-center bg-red-50 p-3 rounded'
                role='alert'
              >
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div
                className='text-green-600 text-sm text-center bg-green-50 p-3 rounded'
                role='status'
              >
                送信が完了しました!
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={submitStatus === 'submitting'}
              className='w-64 m-auto bg-green-700/50 hover:bg-green-700/20 text-white font-semibold py-3 px-6 rounded-xl backdrop-blur-md border border-white/30 transform transition-all duration-300 ease-out hover:scale-95 hover:translate-y-1 shadow-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0'
            >
              {submitStatus === 'submitting' ? '送信中...' : '送信'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
