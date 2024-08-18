/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#171717',
        text: '#000000',
        border: '#414141'
      },
      fontSize: {
        'md' : '1.10rem'
      },
      fontFamily: {
        libre : ['Libre Franklin', 'sans-serif']
      },
      screens: {
        '2xl': {'max': '1535px'},
        'xl': {'max': '1279px'},
        'lg': {'max': '1023px'},
        'md': {'max': '767px'},
        'sm': {'max': '639px'},
      },
      width: {
        '128' : '28rem'
      },
      animation: {
        'fade': 'fade 0.35s ease-in-out',
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
      }
    },
  },
  plugins: [],
}