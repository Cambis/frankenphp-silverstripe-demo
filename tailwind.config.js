/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['themes/app/src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
