'use client';
import { SectionProps } from '@/types/component';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionHeader from '@/components/common/SectionHeader';
import AnimatedWaveBackground from '@/components/contact/animatedWaveBackground/AnimatedWaveBackground';
import { ContactFormValues, ContactSchema } from '@/validations/contracts';
import Font from '@/components/common/Font';
import { postContactEmailApi } from '@/services/contactApi';

/**
 * フォーム送信状態の型定義
 */
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactSection = ({ isVisible }: SectionProps) => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onBlur',
  });

  /**
   * フォーム送信ハンドラー
   */
  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      await postContactEmailApi(data);
      setSubmitStatus('success');
      reset();

      // 3秒後にサクセスメッセージを消す
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'メールの送信に失敗しました'
      );
    }
  };

  return (
    <>
      <AnimatedWaveBackground />
      <section
        id='contact'
        className='relative w-screen pt-16 pb-16 bg-[#f5fffd]'
        aria-labelledby='contact-heading'
      >
        <SectionHeader
          isVisible={isVisible('contact')}
          title='Contact'
          subtitle='ご質問がありましたらお気軽にご連絡ください'
        />

        <div>
          <form
            className='md:max-w-[800px] flex flex-col gap-3 mx-auto py-4 px-4'
            onSubmit={handleSubmit(onSubmit)}
            aria-label='お問い合わせフォーム'
            noValidate
          >
            {/* Name Input */}
            <div>
              <label
                htmlFor='name'
                className='text-[#348a58] text-sm block mb-1'
              >
                Name <span className='text-red-500'>*</span>
              </label>
              {errors.name && (
                <span className='text-red-500 text-sm block mb-1'>
                  {errors.name.message}
                </span>
              )}
              <Font>
                <input
                  type='text'
                  id='name'
                  {...register('name')}
                  disabled={isSubmitting}
                  className='text-center m-auto w-full border border-[#bde7c4] rounded px-3 py-2 text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#348a58]'
                  aria-required='true'
                  {...(errors.name && {
                    'aria-invalid': 'true',
                    'aria-describedby': 'name-error',
                  })}
                />
              </Font>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor='email'
                className='text-[#348a58] text-sm block mb-1'
              >
                Mail Address <span className='text-red-500'>*</span>
              </label>
              {errors.email && (
                <span
                  className='text-red-500 text-sm block mb-1'
                  id='email-error'
                >
                  {errors.email.message}
                </span>
              )}
              <Font>
                <input
                  type='email'
                  id='email'
                  {...register('email')}
                  disabled={isSubmitting}
                  className='text-center m-auto w-full border border-[#bde7c4] rounded px-3 py-2 text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#348a58]'
                  aria-required='true'
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...(errors.email && {
                    'aria-invalid': 'true',
                    'aria-describedby': 'email-error',
                  })}
                />
              </Font>
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor='contactMessage'
                className='text-[#348a58] text-sm block mb-1'
              >
                Comment <span className='text-red-500'>*</span>
              </label>
              {errors.message && (
                <span
                  className='text-red-500 text-sm block mb-1'
                  id='message-error'
                >
                  {errors.message.message}
                </span>
              )}
              <Font>
                <textarea
                  id='contactMessage'
                  rows={4}
                  {...register('message')}
                  disabled={isSubmitting}
                  className='mb-7 border border-[#bde7c4] rounded px-3 py-2 text-base w-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#348a58]'
                  aria-required='true'
                  {...(errors.message && {
                    'aria-invalid': 'true',
                    'aria-describedby': 'message-error',
                  })}
                />
              </Font>
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div
                className='text-red-600 text-sm text-center bg-red-50 p-3 rounded'
                role='alert'
                aria-live='assertive'
              >
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div
                className='text-green-600 text-sm text-center bg-green-50 p-3 rounded'
                role='status'
                aria-live='polite'
              >
                送信が完了しました!
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-64 m-auto bg-green-700/50 hover:bg-green-700/20 text-white font-semibold py-3 px-6 rounded-xl backdrop-blur-md border border-white/30 transform transition-all duration-300 ease-out hover:scale-95 hover:translate-y-1 shadow-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0'
              {...(isSubmitting && { 'aria-busy': 'true' })}
            >
              {isSubmitting ? '送信中...' : '送信'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
