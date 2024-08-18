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
        secondary: 'f0f0f0',
        text: '#000000',
        border: '#414141'
      }
    },
  },
  plugins: [],
}