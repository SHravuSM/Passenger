/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Minimum width of 320px and maximum width of 430px
      'sm': { 'min': '320px', 'max': '431px' },

      // Minimum width of 431px and maximum width of 900px
      'md': { 'min': '431px', 'max': '900px' },

      // Minimum width of 901px
      // Maximum width of 1279px
      'lg': { 'min': '901px', },
    },

    // 'max': '1440px' 
    extend: {},
  },
  plugins: [],
}