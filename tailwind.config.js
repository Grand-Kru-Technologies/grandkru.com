/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#6366f1', // Modern indigo
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        'accent': {
          DEFAULT: '#3b5a7b', // Logo blue
          50: '#e8edf2',
          100: '#c5d1dd',
          200: '#9fb3c5',
          300: '#7895ad',
          400: '#5a7d9b',
          500: '#3b5a7b',
          600: '#35526f',
          700: '#2d4861',
          800: '#253f53',
          900: '#1a2e3f',
        },
        'white': '#ffffff',
        'dark-gray': '#1f2937',
        'medium-gray': '#6b7280',
        'black': '#0f172a',
        'light-gray': '#f3f4f6',
        'surface': {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 20px 60px 0 rgba(31, 38, 135, 0.5)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    // Gradients for service cards and modals
    'bg-gradient-to-br',
    'bg-gradient-to-r',
    'bg-gradient-to-bl',
    'from-blue-600', 'to-blue-700',
    'from-emerald-600', 'to-teal-700',
    'from-green-600', 'to-emerald-700',
    'from-orange-600', 'to-red-600',
    'from-indigo-600',
    'from-primary-500', 'to-accent-500',
    'from-primary-600', 'to-accent-600',
    // Tag styling classes
    'bg-primary', 'text-primary', 'bg-opacity-10',
  ],
}