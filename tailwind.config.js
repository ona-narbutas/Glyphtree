/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './client/**/*.{html,js,jsx,ts,tsx}',
    './dist/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
