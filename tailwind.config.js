/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './client/**/*.{html,js,jsx,ts,tsx}',
    './dist/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      scale: {
        1015: '1.015',
      },
      containers: {
        '2xs': '16rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/container-queries')],
};
