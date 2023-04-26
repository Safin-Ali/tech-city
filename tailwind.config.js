/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        mincho: ['Sawarabi Mincho', 'serif'],
        lexend: ['Lexend', 'sans-serif'],
        DMsans: ['DM Sans', 'sans-serif'],
        baloo2: ["'Baloo 2'", 'cursive'],
      },
      colors:{
        'blue': {
          '800': '#3D84FF',
          '900': '#0058fb',
        },
        'white': {
          '50': '#ffffff',
          '100': '#FBFCFF',
          '200': '#ecedf1',
          '300': '#FDFEFF',
        },
      },
      boxShadow:{
        'default': `0px 0px 10px`
      }
    },
  },
  plugins: [],
}