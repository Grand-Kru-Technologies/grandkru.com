/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3b5a7b',
        'white': '#fbfdfa',
        'dark-gray': '#464747',
        'medium-gray': '#818282',
        'black': '#060506',
        'light-gray': '#c3c4c4',
      },
    },
  },
  plugins: [],
}