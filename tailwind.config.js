/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#3b5a7b',
        'primary-dark': '#2d4a6b',
        'white': '#fbfdfa',
        'dark-gray': '#464747',
        'medium-gray': '#818282',
        'black': '#060506',
        'light-gray': '#c3c4c4',
        // Dark mode colors
        'dark-bg': '#1a1a1a',
        'dark-surface': '#2d2d2d',
        'dark-card': '#3a3a3a',
        'dark-text': '#e5e5e5',
        'dark-text-secondary': '#a0a0a0',
        'dark-border': '#404040',
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
    // Tag styling classes
    'bg-primary', 'text-primary', 'bg-opacity-10',
    // Dark mode classes
    'dark', 'dark:bg-dark-bg', 'dark:text-dark-text',
  ],
}