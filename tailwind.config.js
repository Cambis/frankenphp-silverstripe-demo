/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['themes/app/templates/**/*.ss'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
