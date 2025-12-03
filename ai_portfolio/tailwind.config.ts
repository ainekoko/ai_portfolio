/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Italianaフォントを追加
        italiana: ['var(--font-italiana)', 'serif'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      screens: {
        // カスタムブレークポイント（必要に応じて）
        desktop: '875px',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'float-1': {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.6' },
          '50%': { transform: 'translate(10px, -15px)', opacity: '1' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.5' },
          '50%': { transform: 'translate(-15px, 10px)', opacity: '1' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.7' },
          '50%': { transform: 'translate(12px, 12px)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-delay': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gradient-text': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite',
        'float-1': 'float-1 3s ease-in-out infinite',
        'float-2': 'float-2 3.5s ease-in-out infinite',
        'float-3': 'float-3 2.8s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-in',
        'fade-in-delay': 'fade-in-delay 1.5s ease-in',
        'gradient-text': 'gradient-text 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
