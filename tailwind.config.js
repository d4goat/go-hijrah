/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#0f1014',
        component: '#14171c',
        dropdown: '#26272e',
        text: '#000000',
        border: '#414141',
        palette: 'CBEDD5'
      },
      fontSize: {
        'md' : '1.10rem'
      },
      fontFamily: {
        poppins : ['Poppins', 'sans-serif'],
        monserrat: ['Montserrat', 'sans-serif']
      },
      screens: {
        '2xl': {'max': '1535px'},
        'xl': {'max': '1279px'},
        'lg': {'max': '1023px'},
        'md': {'max': '767px'},
        'sm': {'max': '639px'},
      },
      width: {
        '128' : '28rem',
        '84' : '23rem'
      },
      minWidth: {
        '128' : '28rem'
      },
      animation: {
        'fade': 'fade 0.35s ease-in-out',
        'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse-slower 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse-fast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'pulse-slower': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'pulse-fast': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        // Optional: More complex pulse with scale
        'pulse-scale': {
          '0%, 100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
          '50%': { 
            opacity: '0.8', 
            transform: 'scale(0.98)' 
          },
      },
      },
    },
  },
  plugins: [],
}