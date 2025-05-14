/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0fe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#36adf8',
          500: '#0c96ea',
          600: '#0077c8',
          700: '#0061a3',
          800: '#025286',
          900: '#064570',
        },
        secondary: {
          50: '#fcf5ff',
          100: '#f7e9fe',
          200: '#f0d2fd',
          300: '#e6affc',
          400: '#d87bf7',
          500: '#c648f0',
          600: '#b022df',
          700: '#921ebd',
          800: '#781c9a',
          900: '#641b7d',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },
      boxShadow: {
        'cartoon': '0 8px 0 0 rgba(0, 0, 0, 0.1)',
        'cartoon-sm': '0 4px 0 0 rgba(0, 0, 0, 0.1)',
        'cartoon-lg': '0 12px 0 0 rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
