'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button_form from '@/components/common/buttonForm/Button_form';

/**
 * マイページログインフォームコンポーネント
 */
export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // エラーをクリア
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      email: '',
      password: '',
    };
    let isValid = true;

    // メールアドレスバリデーション
    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
      isValid = false;
    }

    // パスワードバリデーション
    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'パスワードは6文字以上で入力してください';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          password: data.error || 'ログインに失敗しました',
        }));
        return;
      }

      // ログイン成功後、ダッシュボードへ遷移
      router.push('/mypage/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors((prev) => ({
        ...prev,
        password: 'ログインに失敗しました',
      }));
    } finally {
      setIsLoading(false);
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
            <form onSubmit={handleSubmit} className='space-y-6'>
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
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all text-gray-700 placeholder:text-gray-400'
                    placeholder='example@example.com'
                    disabled={isLoading}
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
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all text-gray-700 placeholder:text-gray-400'
                    placeholder='6文字以上'
                    disabled={isLoading}
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

              {/* ログインボタン */}
              <div className='flex justify-center'>
                <Button_form
                  text='ログイン'
                  type='submit'
                  isLoading={isLoading}
                />
              </div>
            </form>

            {/* パスワードを忘れた場合 */}
            <div className='mt-6 text-center'>
              <a
                href='#'
                className='text-sm text-purple-400 hover:text-purple-500 transition-colors'
              >
                パスワードを忘れた場合
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
