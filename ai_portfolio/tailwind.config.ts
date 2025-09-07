/* tailwind.config.js の extend に追加 */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
      },
    },
  },
};
