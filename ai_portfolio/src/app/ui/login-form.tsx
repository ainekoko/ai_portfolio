'use client';
import { useActionState, useState } from 'react';
import { login } from '@/lib/actions';
import Button_form from '@/components/common/buttonForm/Button_form';

/**
 * マイページログインフォームコンポーネント
 */
export default function LoginForm() {
  const [errorMessage, dispatch, isPending] = useActionState(login, undefined);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  /** フォーム検証 */
  const validateForm = (formData: FormData): boolean => {
    const newErrors = {
      email: '',
      password: '',
    };
    let isValid = true;

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // メールアドレスバリデーション
    if (!email) {
      newErrors.email = 'メールアドレスを入力してください';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
      isValid = false;
    }

    // パスワードバリデーション
    if (!password) {
      newErrors.password = 'パスワードを入力してください';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'パスワードは6文字以上で入力してください';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /** フォーム送信ハンドラー */
  const handleSubmit = (formData: FormData) => {
    if (validateForm(formData)) {
      dispatch(formData);
    }
  };

  return (
    <section className='min-h-screen bg-white'>
      <div className='w-screen min-h-screen relative'>
        {/* 背景画像 */}
        <div className="fixed inset-0 bg-[url('/assets/images/flowerLeaf.png')] bg-no-repeat bg-center bg-size-[700px_700px] opacity-20 pointer-events-none" />

        <div className='relative z-10 max-w-[500px] mx-auto px-6 py-16'>
          {/* タイトル */}
          <div className='text-center mb-12'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
              My Page
            </h1>
            <p className='text-gray-600'>マイページログイン</p>
          </div>

          {/* ログインフォーム */}
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100'>
            <form action={handleSubmit} className='space-y-6'>
              {/* メールアドレス */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-semibold text-gray-700 mb-2'
                >
                  メールアドレス
                </label>
                <div className='relative'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all text-gray-700 placeholder:text-gray-400'
                    placeholder='example@example.com'
                    disabled={isPending}
                    onChange={() =>
                      setErrors((prev) => ({ ...prev, email: '' }))
                    }
                  />
                  <svg
                    className='absolute left-3 top-3.5 w-5 h-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                {errors.email && (
                  <p className='mt-2 text-sm text-red-500 flex items-center gap-1'>
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* パスワード */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-semibold text-gray-700 mb-2'
                >
                  パスワード
                </label>
                <div className='relative'>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all text-gray-700 placeholder:text-gray-400'
                    placeholder='6文字以上'
                    disabled={isPending}
                    onChange={() =>
                      setErrors((prev) => ({ ...prev, password: '' }))
                    }
                  />
                  <svg
                    className='absolute left-3 top-3.5 w-5 h-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  </svg>
                </div>
                {errors.password && (
                  <p className='mt-2 text-sm text-red-500 flex items-center gap-1'>
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* エラーメッセージ */}
              {errorMessage && (
                <p className='text-sm text-red-500 text-center flex items-center justify-center gap-1'>
                  <svg
                    className='w-4 h-4'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {errorMessage}
                </p>
              )}

              {/* ログインボタン */}
              <div className='flex justify-center'>
                <Button_form
                  text='ログイン'
                  type='submit'
                  isLoading={isPending}
                  disabled={isPending}
                />
              </div>
            </form>

            {/* パスワード忘れリンク */}
            <div className='mt-6 text-center'>
              <a
                href='#'
                className='text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors'
              >
                パスワードをお忘れの方
              </a>
            </div>

            {/* 新規登録リンク */}
            <div className='mt-4 pt-6 border-t border-gray-200 text-center'>
              <p className='text-sm text-gray-600'>
                アカウントをお持ちでない方は
              </p>
              <a
                href='/register'
                className='inline-block mt-2 text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors'
              >
                新規登録はこちら
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
