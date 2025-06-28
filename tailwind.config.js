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
  safelist: [
    // Gradients for service cards and modals
    'bg-gradient-to-br',
    'from-blue-600', 'to-purple-700',
    'from-emerald-600', 'to-teal-700',
    'from-green-600', 'to-emerald-700',
    'from-orange-600', 'to-red-600',
    'from-indigo-600',
  ],
}